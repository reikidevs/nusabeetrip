'use client';

import React, { useState } from 'react';
import { TourPackage } from '@/types';
import WhatsAppBookingButton from './WhatsAppBookingButton';
import TourImage from './TourImage';

interface TourPackageDetailProps {
  tourPackage: TourPackage;
  onBookingClick?: (packageName: string, price: number) => void;
  className?: string;
  images?: string[]; // Additional images for gallery
}

const TourPackageDetail: React.FC<TourPackageDetailProps> = ({
  tourPackage,
  onBookingClick,
  className = '',
  images = []
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const {
    name,
    description,
    price,
    currency,
    duration,
    includesSnorkeling,
    features,
    image
  } = tourPackage;

  // Combine main image with additional images
  const allImages = [image, ...images].filter(Boolean);

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick(name, price);
    }
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <TourImage
              src={allImages[selectedImageIndex] || '/images/placeholder-tour.svg'}
              alt={`${name} - Image ${selectedImageIndex + 1}`}
              fill
              className="rounded-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {includesSnorkeling && (
              <div className="absolute top-4 right-4 bg-brand-teal-500 text-white px-3 py-2 rounded-full text-sm font-semibold">
                + Snorkeling Included
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-brand-teal-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <TourImage
                    src={img}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="rounded-lg"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Package Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-800 mb-2">
              {name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration} hours
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Nusa Penida, Bali
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-brand-orange-800">
                {price.toLocaleString('id-ID')} {currency}
              </span>
              <span className="text-gray-600">per person</span>
            </div>
            <p className="text-sm text-gray-600">
              Best price guaranteed • No hidden fees
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="border-t pt-6">
            <WhatsAppBookingButton
              phoneNumber="+62 896-3128-1234"
              serviceType="tour"
              serviceName={name}
              price={price}
              currency={currency}
              className="w-full text-lg py-4"
              onClick={handleBookingClick}
            />
            <p className="text-sm text-gray-600 text-center mt-3">
              Get instant response • Available 24/7 • Free consultation
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-blue-800 mb-2">
              Important Information
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Pickup available from your accommodation</li>
              <li>• Comfortable transportation included</li>
              <li>• Professional local guide</li>
              <li>• Flexible departure times</li>
              <li>• Weather-dependent activities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPackageDetail;