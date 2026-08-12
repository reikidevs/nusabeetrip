import type { NextRequest } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number; headers?: HeadersInit }) => ({
      status: init?.status ?? 200,
      headers: new Headers(init?.headers),
      json: async () => body,
    }),
  },
}));

jest.mock('@/lib/db/queries', () => ({
  createReview: jest.fn(),
  getApprovedReviews: jest.fn(),
}));

import { POST } from '../route';
import { createReview } from '@/lib/db/queries';

const createReviewMock = jest.mocked(createReview);

function postRequest(body: Record<string, unknown>): NextRequest {
  return {
    json: async () => body,
    headers: new Headers({
      'user-agent': 'jest',
      'x-forwarded-for': '203.0.113.10',
    }),
  } as unknown as NextRequest;
}

describe('POST /api/reviews moderation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createReviewMock.mockImplementation(async (review) => ({
      id: 501,
      ...review,
    }) as any);
  });

  it.each([1, 5])(
    'sends a %i-star submission to moderation instead of publishing it',
    async (rating) => {
      const response = await POST(postRequest({
        authorName: 'Guest Name',
        rating,
        body: 'This is a sufficiently detailed account of the guest experience.',
        language: 'en',
      }));

      expect(response.status).toBe(201);
      await expect(response.json()).resolves.toMatchObject({
        success: true,
        reviewId: 501,
        published: false,
      });
      expect(createReviewMock).toHaveBeenCalledWith(expect.objectContaining({
        rating,
        status: 'pending',
        source: 'website',
        isVerified: false,
      }));
    },
  );

  it('marks obvious link spam as spam and never publishes it', async () => {
    const response = await POST(postRequest({
      authorName: 'Link Spammer',
      rating: 5,
      body: 'Visit https://spam.example for a completely unrelated promotion.',
      language: 'en',
    }));

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({ published: false });
    expect(createReviewMock).toHaveBeenCalledWith(expect.objectContaining({
      status: 'spam',
    }));
  });
});
