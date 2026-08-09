import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@/test/test-utils';
import Testimonials from '../Testimonials';
import { trackGoogleReviewClick } from '@/lib/analytics';

jest.mock('@/lib/analytics', () => ({
  trackGoogleReviewClick: jest.fn(),
}));

jest.mock('../GoogleReviewsPanel', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../ReviewForm', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div role="dialog" aria-label="Website review form" /> : null,
}));

const fetchMock = jest.fn();
const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJUwlc6Uhz0i0RUwOyEzu2e-Y';

describe('Testimonials review actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true, reviews: [] }),
    } as unknown as Response);
    Object.defineProperty(global, 'fetch', {
      configurable: true,
      writable: true,
      value: fetchMock,
    });
  });

  it('makes the exact Google review link primary in both English CTA groups', async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    const actionGroups = screen.getAllByRole('group', { name: 'Review options' });
    expect(actionGroups).toHaveLength(2);

    actionGroups.forEach((group) => {
      const google = within(group).getByRole('link', {
        name: 'Open NusaBeeTrip review page on Google Maps',
      });
      const website = within(group).getByRole('button', {
        name: 'Write on this website',
      });

      expect(google).toHaveAttribute('href', GOOGLE_REVIEW_URL);
      expect(google).toHaveAttribute('target', '_blank');
      expect(google).toHaveAttribute('rel', 'noopener noreferrer');
      expect(google).toHaveClass('bg-brand-blue-800', 'font-bold');
      expect(website).toHaveClass('border-gray-300', 'bg-white');
      expect(google.compareDocumentPosition(website)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
      expect(
        within(group).getByText(
          'Google reviews are submitted on Google; website reviews stay on this website.',
        ),
      ).toBeInTheDocument();
    });

    await user.click(
      within(actionGroups[0]).getByRole('link', {
        name: 'Open NusaBeeTrip review page on Google Maps',
      }),
    );
    expect(trackGoogleReviewClick).toHaveBeenCalledWith('testimonials_panel');

    await user.click(
      within(actionGroups[0]).getByRole('button', { name: 'Write on this website' }),
    );
    expect(screen.getByRole('dialog', { name: 'Website review form' })).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('/api/reviews?limit=50', {
      cache: 'no-store',
    }));
  });

  it('uses the same Google-first hierarchy and honest copy in Indonesian', () => {
    render(<Testimonials />, { language: 'id', route: '/id' });

    const actionGroups = screen.getAllByRole('group', { name: 'Pilihan ulasan' });
    expect(actionGroups).toHaveLength(2);

    actionGroups.forEach((group) => {
      const google = within(group).getByRole('link', {
        name: 'Buka halaman ulasan NusaBeeTrip di Google Maps',
      });
      const website = within(group).getByRole('button', { name: 'Tulis di website' });

      expect(within(group).getByText('Beri ulasan di Google')).toBeInTheDocument();
      expect(google).toHaveAttribute('href', GOOGLE_REVIEW_URL);
      expect(google).toHaveClass('bg-brand-blue-800', 'font-bold');
      expect(website).toHaveClass('border-gray-300', 'bg-white');
      expect(google.compareDocumentPosition(website)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
      expect(
        within(group).getByText(
          'Ulasan Google dikirim di Google; ulasan website tetap di website ini.',
        ),
      ).toBeInTheDocument();
    });
  });
});
