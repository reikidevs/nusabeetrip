'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  className = '',
  showHeader = true,
  showFooter = true
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {showHeader && <Header />}
      
      <main className="flex-1">
        {children}
      </main>

      {/* Extra bottom space on mobile so content isn't hidden behind the bottom tab bar */}
      <div className="md:hidden h-20" />
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;