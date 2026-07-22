import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';

let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

function LanguageProbe() {
  const { language } = useLanguage();
  return <span data-testid="language">{language}</span>;
}

describe('LanguageProvider route synchronization', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPathname = '/';
    document.documentElement.lang = '';
  });

  it('keeps an English URL English even after an Indonesian preference was saved', async () => {
    localStorage.setItem('nusabeetrip-lang', 'id');

    render(
      <LanguageProvider initialLanguage="en">
        <LanguageProbe />
      </LanguageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('language')).toHaveTextContent('en');
      expect(document.documentElement).toHaveAttribute('lang', 'en');
    });
  });

  it('keeps an Indonesian URL Indonesian even after an English preference was saved', async () => {
    mockPathname = '/id/guides';
    localStorage.setItem('nusabeetrip-lang', 'en');

    render(
      <LanguageProvider initialLanguage="id">
        <LanguageProbe />
      </LanguageProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('language')).toHaveTextContent('id');
      expect(document.documentElement).toHaveAttribute('lang', 'id');
    });
  });
});
