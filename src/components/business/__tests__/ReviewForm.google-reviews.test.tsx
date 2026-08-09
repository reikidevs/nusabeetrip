import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@/test/test-utils';
import ReviewForm from '../ReviewForm';
import { trackGoogleReviewClick } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackGoogleReviewClick: jest.fn(),
}));

const fetchMock = jest.fn();
const reviewTitle = 'Wonderful private tour';
const reviewBody = 'Our guide was friendly and made the whole day memorable.';
const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJUwlc6Uhz0i0RUwOyEzu2e-Y';

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

  it('briefly explains where an English website review stays', () => {
    render(<ReviewForm isOpen onClose={jest.fn()} />);

    expect(
      screen.getByText('This review stays on this website and may be shown publicly.'),
    ).toBeInTheDocument();
  });

  it('briefly explains where an Indonesian website review stays', () => {
    render(<ReviewForm isOpen onClose={jest.fn()} />, {
      language: 'id',
      route: '/id',
    });

    expect(
      screen.getByText('Ulasan ini tetap di website dan dapat ditampilkan publik.'),
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

      const googleCta = await screen.findByRole('link', {
        name: 'Copy text & continue to Google',
      });
      expect(googleCta).toHaveAttribute('href', GOOGLE_REVIEW_URL);
      expect(googleCta).toHaveAttribute('target', '_blank');
      expect(googleCta).toHaveAttribute('rel', 'noopener noreferrer');
      expect(googleCta).toHaveClass('bg-brand-blue-800');
      expect(
        screen.getByText(/Your website review stays here/i),
      ).toBeInTheDocument();

      const done = screen.getByRole('button', { name: 'Done' });
      expect(done).toHaveClass('border-gray-300', 'bg-white');

      const request = fetchMock.mock.calls[0][1] as RequestInit;
      expect(JSON.parse(request.body as string)).toMatchObject({ rating });
    },
  );

  it('uses the same clear Google-first success action in Indonesian', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true, published: true }),
    } as unknown as Response);
    const user = userEvent.setup();

    render(<ReviewForm isOpen onClose={jest.fn()} />, {
      language: 'id',
      route: '/id',
    });

    await user.click(screen.getByRole('button', { name: 'Rate 4 stars' }));
    await user.type(screen.getByLabelText(/Nama Anda/i), 'Tamu Bali');
    await user.type(screen.getByLabelText(/Judul ulasan/i), 'Tur yang menyenangkan');
    await user.type(
      screen.getByLabelText(/Ulasan Anda/i),
      'Pemandu ramah dan perjalanan kami sangat menyenangkan.',
    );
    await user.click(screen.getByRole('button', { name: 'Kirim ulasan' }));

    const googleCta = await screen.findByRole('link', {
      name: 'Salin teks & lanjut ke Google',
    });
    expect(googleCta).toHaveAttribute('href', GOOGLE_REVIEW_URL);
    expect(googleCta).toHaveClass('bg-brand-blue-800');
    expect(screen.getByRole('button', { name: 'Selesai' })).toHaveClass(
      'border-gray-300',
      'bg-white',
    );
  });

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

    await user.click(
      await screen.findByRole('link', { name: 'Copy text & continue to Google' }),
    );

    expect(trackGoogleReviewClick).toHaveBeenCalledWith('review_form_success');
    expect(writeText).toHaveBeenCalledWith(`${reviewTitle}\n\n${reviewBody}`);
    await waitFor(() => {
      expect(
        screen.getByText('Review copied. Paste it into the Google review form.'),
      ).toBeInTheDocument();
    });
  });
});
