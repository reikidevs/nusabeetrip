'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  showActiveState?: boolean;
  onItemClick?: (item: NavigationItem) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  className = '',
  orientation = 'horizontal',
  showActiveState = true,
  onItemClick
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const baseClasses = orientation === 'horizontal' 
    ? 'flex items-center space-x-8' 
    : 'flex flex-col space-y-4';

  const linkClasses = (href: string) => {
    const baseLink = 'font-medium transition-colors duration-200';
    const activeClasses = showActiveState && isActive(href)
      ? 'text-brand-blue-800 border-b-2 border-brand-blue-800'
      : 'text-gray-700 hover:text-brand-blue-800';
    
    return `${baseLink} ${activeClasses}`;
  };

  return (
    <nav className={`${baseClasses} ${className}`} data-testid="desktop-navigation">
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={linkClasses(item.href)}
          onClick={() => onItemClick?.(item)}
          title={item.description}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;