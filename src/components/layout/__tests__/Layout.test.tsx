import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../Layout';

// Mock the Header and Footer components
jest.mock('../Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Mock Header</header>;
  };
});

jest.mock('../Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Mock Footer</footer>;
  };
});

describe('Layout Component', () => {
  it('renders children content', () => {
    render(
      <Layout>
        <div data-testid="main-content">Test Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header and footer by default', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('hides header when showHeader is false', () => {
    render(
      <Layout showHeader={false}>
        <div>Content</div>
      </Layout>
    );
    
    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('hides footer when showFooter is false', () => {
    render(
      <Layout showFooter={false}>
        <div>Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('hides both header and footer when both props are false', () => {
    render(
      <Layout showHeader={false} showFooter={false}>
        <div>Content</div>
      </Layout>
    );
    
    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Layout className="custom-class">
        <div>Content</div>
      </Layout>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct structure with flex layout', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    
    expect(container.firstChild).toHaveClass('min-h-screen', 'flex', 'flex-col');
  });

  it('main content has flex-1 class for proper layout', () => {
    render(
      <Layout>
        <div data-testid="test-content">Content</div>
      </Layout>
    );
    
    const mainElement = screen.getByTestId('test-content').parentElement;
    expect(mainElement).toHaveClass('flex-1');
    expect(mainElement?.tagName.toLowerCase()).toBe('main');
  });
});