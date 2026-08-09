import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@/test/test-utils';
import GoogleReviewsPanel from '../GoogleReviewsPanel';
import { trackGoogleReviewClick } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackGoogleReviewClick: jest.fn(),
}));

const fetchMock = jest.fn();

const googleResponse = {
  success: true,
  configured: true,
  place: {
    id: 'places/test-place',
    displayName: 'NusaBeeTrip',
    rating: 4.8,
    userRatingCount: 127,
    googleMapsUri: 'https://maps.google.com/place/nusabeetrip',
    reviewsUri: 'https://maps.google.com/place/nusabeetrip/reviews',
    writeAReviewUri: 'https://search.google.com/local/writereview?placeid=test',
    attributions: [
      { provider: 'Google Places', providerUri: 'https://maps.google.com/' },
    ],
  },
  reviews: Array.from({ length: 6 }, (_, index) => ({
    id: `google-review-${index + 1}`,
    source: 'google' as const,
    authorName: `Google Guest ${index + 1}`,
    authorUri: `https://maps.google.com/profile/${index + 1}`,
    authorPhotoUri: `https://example.com/avatar-${index + 1}.jpg`,
    rating: 5 - (index % 2),
    body: `Google review body ${index + 1}`,
    publishedAt: `2026-08-0${index + 1}T10:00:00Z`,
    relativePublishedAt: `${index + 1} days ago`,
    googleMapsUri: `https://maps.google.com/review/${index + 1}`,
  })),
};

describe('GoogleReviewsPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, 'fetch', {
      configurable: true,
      writable: true,
      value: fetchMock,
    });
  });

  it('renders Google reviews as a separate, attributed source in API order', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(googleResponse),
    } as unknown as Response);

    render(<GoogleReviewsPanel language="en" />);

    const panel = await screen.findByRole('region', {
      name: 'NusaBeeTrip reviews from Google Maps',
    });
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/google-reviews?language=en',
      expect.objectContaining({ cache: 'no-store', signal: expect.any(AbortSignal) }),
    );
    expect(within(panel).getByText(/Google Maps rating: 4\.8/i)).toBeInTheDocument();
    expect(
      within(panel).getByText(/shown separately from reviews submitted on this website/i),
    ).toBeInTheDocument();

    const reviewCards = within(panel).getAllByRole('article');
    expect(reviewCards).toHaveLength(5);
    expect(
      reviewCards.map((card) => within(card).getByText(/Google Guest/).textContent),
    ).toEqual([
      'Google Guest 1',
      'Google Guest 2',
      'Google Guest 3',
      'Google Guest 4',
      'Google Guest 5',
    ]);
    expect(within(panel).queryByText('Google Guest 6')).not.toBeInTheDocument();

    const firstProfile = within(panel).getByRole('link', {
      name: "View Google Guest 1's Google Maps profile",
    });
    expect(firstProfile).toHaveAttribute('href', 'https://maps.google.com/profile/1');
    expect(firstProfile.querySelector('img')).toHaveAttribute(
      'src',
      'https://example.com/avatar-1.jpg',
    );
    expect(
      within(reviewCards[0]).getByRole('link', { name: 'Read this review on Google Maps' }),
    ).toHaveAttribute('href', 'https://maps.google.com/review/1');

    expect(
      within(panel).getByText(/Google selects and orders the reviews shown here by relevance/i),
    ).toBeInTheDocument();
    expect(within(panel).getByRole('link', { name: 'Google Places' })).toHaveAttribute(
      'href',
      'https://maps.google.com/',
    );
    const googleAttribution = within(panel).getByText('Google Maps');
    expect(googleAttribution).toHaveAttribute('translate', 'no');
    expect(googleAttribution.closest('a')).toHaveClass(
      'font-normal',
      'text-[#5E5E5E]',
      'whitespace-nowrap',
    );
  });

  it('uses the direct Google write-review URL and tracks the handoff', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(googleResponse),
    } as unknown as Response);
    const user = userEvent.setup();

    render(<GoogleReviewsPanel language="en" />);

    const reviewCta = await screen.findByRole('link', { name: 'Write a review on Google' });
    expect(reviewCta).toHaveAttribute('href', googleResponse.place.writeAReviewUri);

    await user.click(reviewCta);
    expect(trackGoogleReviewClick).toHaveBeenCalledWith('google_reviews_panel');
  });

  it('requests the localized reviews and renders Indonesian source labels', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(googleResponse),
    } as unknown as Response);

    render(<GoogleReviewsPanel language="id" />, { language: 'id', route: '/id' });

    const panel = await screen.findByRole('region', {
      name: 'Ulasan NusaBeeTrip dari Google Maps',
    });
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/google-reviews?language=id',
      expect.objectContaining({ cache: 'no-store' }),
    );
    expect(within(panel).getByText(/Rating Google Maps: 4\.8/i)).toBeInTheDocument();
  });

  it('renders nothing when Google reviews are not configured', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        success: false,
        configured: false,
        place: null,
        reviews: [],
      }),
    } as unknown as Response);

    const { container } = render(<GoogleReviewsPanel language="en" />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(container).toBeEmptyDOMElement();
  });

  it('fails silently when the Google reviews request errors', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network unavailable'));

    const { container } = render(<GoogleReviewsPanel language="en" />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(container).toBeEmptyDOMElement();
  });
});
