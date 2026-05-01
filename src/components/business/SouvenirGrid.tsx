'use client';

import React from 'react';
import { Souvenir } from '@/types';
import { SouvenirCard } from './SouvenirCard';
import { useLanguage } from '@/lib/LanguageContext';

export interface SouvenirGridProps {
  souvenirs: Souvenir[];
  onBookingClick?: (souvenirName: string, price: number) => void;
  className?: string;
}

export const SouvenirGrid: React.FC<SouvenirGridProps> = ({
  souvenirs,
  onBookingClick,
  className = '',
}) => {
  const { language } = useLanguage();

  if (souvenirs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {language === 'id' ? 'Tidak ada souvenir tersedia saat ini.' : 'No souvenirs available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {souvenirs.map((souvenir) => (
        <SouvenirCard
          key={souvenir.id}
          souvenir={souvenir}
          onBookingClick={onBookingClick}
        />
      ))}
    </div>
  );
};

export default SouvenirGrid;
