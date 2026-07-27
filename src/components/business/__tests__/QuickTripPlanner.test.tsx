import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { render, screen, waitFor } from '@/test/test-utils';
import QuickTripPlanner from '../QuickTripPlanner';
import { trackWhatsAppClick } from '@/lib/analytics';
import { LanguageProvider } from '@/lib/LanguageContext';

jest.mock('@/lib/analytics', () => ({ trackWhatsAppClick: jest.fn() }));

const openSpy = jest.fn();

describe('QuickTripPlanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'open', { writable: true, value: openSpy });
  });

  it('hydrates its server markup and remains interactive', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/');
    const container = document.createElement('div');
    container.innerHTML = renderToString(
      <LanguageProvider initialLanguage='en'><QuickTripPlanner /></LanguageProvider>,
    );
    document.body.appendChild(container);
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(<QuickTripPlanner />, { container, hydrate: true, language: 'en', route: '/' });
    await user.click(screen.getByRole('button', { name: 'Driver today / tomorrow' }));

    expect(screen.getByRole('button', { name: 'Driver today / tomorrow' })).toHaveAttribute('aria-pressed', 'true');
    const hydrationErrors = consoleError.mock.calls.filter(([message]) =>
      typeof message === 'string' && /hydration|did not match|server html/i.test(message),
    );
    expect(hydrationErrors).toHaveLength(0);
    consoleError.mockRestore();
  });

  it('selects a trip intent and updates the live brief', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />);

    await user.click(screen.getByRole('radio', { name: /One-day famous highlights/i }));

    expect(screen.queryByRole('radio', { name: /One-day famous highlights/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change need' })).toBeInTheDocument();
    expect(screen.getByText('One-day famous highlights', { selector: 'dd' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Change need' }));
    expect(screen.getByRole('radio', { name: /One-day famous highlights/i })).toBeChecked();
  });

  it('uses a compact in-form intent picker on mobile while retaining desktop radio cards', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />);

    const mobilePicker = screen.getByRole('combobox', { name: 'What do you need?' });
    const desktopRadioGrid = screen.getByRole('radio', { name: /Two days: West \+ East/i }).closest('div');

    expect(mobilePicker.closest('label')).toHaveClass('sm:hidden');
    expect(desktopRadioGrid).toHaveClass('hidden', 'sm:grid');

    await user.selectOptions(mobilePicker, 'twoDays');

    expect(screen.queryByRole('combobox', { name: 'What do you need?' })).not.toBeInTheDocument();
    expect(screen.getByText('Two days: West + East', { selector: 'dd' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change need' })).toBeInTheDocument();
  });

  it('labels the urgent shortcut as a driver need and moves to the date field', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />);

    const urgentShortcut = screen.getByRole('button', { name: 'Driver today / tomorrow' });
    await user.click(urgentShortcut);

    expect(urgentShortcut).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('radio', { name: 'Driver today or tomorrow' })).not.toBeInTheDocument();
    expect(screen.getByText('Driver today or tomorrow', { selector: 'dd' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('radio', { name: 'Today' })).toHaveFocus());
  });

  it('does not show the error summary when a shortcut selects a valid intent', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />);

    await user.click(screen.getByRole('button', { name: 'Driver today / tomorrow' }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows only genuinely required fields when submitted empty', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />);

    await user.click(screen.getByRole('button', { name: /Send trip brief on WhatsApp/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Please complete the highlighted details.');
    expect(screen.getByText('Choose what you need.')).toBeInTheDocument();
    expect(screen.getByText('Choose today, tomorrow, or a date.')).toBeInTheDocument();
    expect(screen.getByText('Enter your hotel, harbour, or pickup point.')).toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('opens an encoded English WhatsApp brief and tracks the click', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />);

    await user.click(screen.getByRole('radio', { name: /Snorkeling \+ land tour/i }));
    await user.click(screen.getByRole('radio', { name: 'Today' }));
    await user.clear(screen.getByLabelText(/Number of guests/i));
    await user.type(screen.getByLabelText(/Number of guests/i), '3');
    await user.type(screen.getByLabelText(/Hotel, harbour, or pickup point/i), 'Lushy Hostel');
    await user.type(screen.getByLabelText(/Available until/i), 'Fast boat at 16:30');
    await user.type(screen.getByLabelText(/Anything else/i), 'One infant; vegetarian lunch');
    await user.click(screen.getByRole('button', { name: /Send trip brief on WhatsApp/i }));

    expect(trackWhatsAppClick).toHaveBeenCalledWith('homepage_trip_planner');
    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target, features] = openSpy.mock.calls[0];
    expect(url).toContain('https://wa.me/6289631281234?text=');
    expect(url).toContain('%0A');
    expect(target).toBe('_blank');
    expect(features).toBe('noopener,noreferrer');

    const message = new URL(url).searchParams.get('text');
    expect(message).toContain('Need: Snorkeling + land tour');
    expect(message).toContain('Date: Today');
    expect(message).toContain('Guests: 3');
    expect(message).toContain('Pickup: Lushy Hostel');
    expect(message).toContain('Available until / return boat: Fast boat at 16:30');
    expect(message).toContain('Notes: One infant; vegetarian lunch');
    expect(message).toContain('exact total price');
  });

  it('creates a natural Indonesian brief on the localized route', async () => {
    const user = userEvent.setup();
    render(<QuickTripPlanner />, { language: 'id', route: '/id' });

    await user.click(screen.getByRole('radio', { name: /Private driver saja/i }));
    await user.click(screen.getByRole('radio', { name: 'Besok' }));
    await user.type(screen.getByLabelText(/Hotel, pelabuhan, atau titik jemput/i), 'Pelabuhan Banjar Nyuh');
    await user.click(screen.getByRole('button', { name: /Kirim ringkasan lewat WhatsApp/i }));

    const message = new URL(openSpy.mock.calls[0][0]).searchParams.get('text');
    expect(message).toContain('Halo Sidiq');
    expect(message).toContain('Kebutuhan: Private driver saja');
    expect(message).toContain('Tanggal: Besok');
    expect(message).toContain('Lokasi jemput: Pelabuhan Banjar Nyuh');
    expect(message).toContain('total harga pastinya');
  });
});
