import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@/test/test-utils';
import ReviewForm from '../ReviewForm';
import { trackGoogleReviewClick } from '@/lib/analytics';
import { SITE } from '@/lib/site-config';

jest.mock('@/lib/analytics', () => ({
  trackGoogleReviewClick: jest.fn(),
}));

const fetchMock = jest.fn();
const reviewTitle = 'Wonderful private tour';
const reviewBody = 'Our guide was friendly and made the whole day memorable.';

async function submitReview(rating: number) {
  const user = userEvent.setup();
  render(<ReviewForm isOpen onClose={jest.fn()} />);

  await user.click(screen.getByRole('button', { name: `Rate ${rating} stars` }));
  await user.type(screen.getByLabelText(/Your name/i), 'Alex Guest');
  await user.type(screen.getByLabelText(/Review title/i), reviewTitle);
  await user.type(screen.getByLabelText(/Your review/i), reviewBody);
  await user.click(screen.getByRole('button', { name: 'Post review' }));

  return user;
}

describe('ReviewForm Google review handoff', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, 'fetch', {
      configurable: true,
      writable: true,
      value: fetchMock,
    });
  });

  it('clearly discloses that a website submission is not posted to Google Maps', () => {
    render(<ReviewForm isOpen onClose={jest.fn()} />);

    expect(
      screen.getByText('Submitting here does not publish anything to Google Maps.'),
    ).toBeInTheDocument();
  });

  it.each([
    { rating: 5, published: true, outcome: 'published' },
    { rating: 1, published: false, outcome: 'pending moderation' },
  ])(
    'shows the same Google CTA after a $outcome review (rating $rating)',
    async ({ rating, published }) => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ success: true, published }),
      } as unknown as Response);

      await submitReview(rating);

      const googleCta = await screen.findByRole('link', { name: /Google Maps/i });
      expect(googleCta).toHaveAttribute('href', SITE.googleReviewUrl);
      expect(
        screen.getByText(/Website reviews cannot be sent to Google automatically/i),
      ).toBeInTheDocument();

      const request = fetchMock.mock.calls[0][1] as RequestInit;
      expect(JSON.parse(request.body as string)).toMatchObject({ rating });
    },
  );

  it('copies the submitted title and body and tracks the Google CTA click', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true, published: true }),
    } as unknown as Response);

    const user = await submitReview(5);
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    await user.click(await screen.findByRole('link', { name: /Google Maps/i }));

    expect(trackGoogleReviewClick).toHaveBeenCalledWith('review_form_success');
    expect(writeText).toHaveBeenCalledWith(`${reviewTitle}\n\n${reviewBody}`);
    await waitFor(() => {
      expect(
        screen.getByText('Review copied. Paste it into the Google review form.'),
      ).toBeInTheDocument();
    });
  });
});
