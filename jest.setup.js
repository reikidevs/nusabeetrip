import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// App components are tested inside the real LanguageProvider. These light
// navigation shims give that provider (and client layout components) the same
// pathname/router surface Next.js supplies at runtime.
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => window.location.pathname),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams(window.location.search)),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, priority, ...props }) => {
    const React = require('react')
    return React.createElement('img', props)
  },
}))

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
