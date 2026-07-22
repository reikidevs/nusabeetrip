import React, { type ReactElement, type ReactNode } from 'react';
import {
  render as testingLibraryRender,
  type RenderOptions,
} from '@testing-library/react';
import { LanguageProvider } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';

type AppRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  language?: Language;
  route?: string;
};

function render(
  ui: ReactElement,
  { language = 'en', route, ...renderOptions }: AppRenderOptions = {},
) {
  const pathname = route ?? (language === 'id' ? '/id' : '/');
  window.history.replaceState({}, '', pathname);

  function TestProviders({ children }: { children: ReactNode }) {
    return (
      <LanguageProvider initialLanguage={language}>
        {children}
      </LanguageProvider>
    );
  }

  return testingLibraryRender(ui, {
    wrapper: TestProviders,
    ...renderOptions,
  });
}

export * from '@testing-library/react';
export { render };
