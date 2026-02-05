'use client';

import React from 'react';
import { Location } from '@/types';

interface LocationCardProps {
  location: Location;
  onClick?: () => void;
  className?: string;
}

export function LocationCard({ location, onClick, className = '' }: LocationCardProps) {
  return (
    <div
      className={`
        p-4 bg-white rounded-xl shadow-card
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{location.name}</h3>
          {location.description && (
            <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{location.description}</p>
          )}
        </div>
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

// Info card for general information display
interface InfoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
  onClick?: () => void;
  rightElement?: React.ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  description,
  icon,
  iconBgColor = 'bg-primary/10',
  onClick,
  rightElement,
  className = '',
}: InfoCardProps) {
  return (
    <div
      className={`
        p-4 bg-white rounded-xl shadow-card
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`w-10 h-10 rounded-full ${iconBgColor} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
        {rightElement || (onClick && (
          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ))}
      </div>
    </div>
  );
}

// Utility card for dashboard
interface UtilityCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  onClick?: () => void;
  badge?: string | number;
  className?: string;
}

export function UtilityCard({
  title,
  icon,
  iconBgColor = 'bg-gray-100',
  onClick,
  badge,
  className = '',
}: UtilityCardProps) {
  return (
    <div
      className={`
        relative p-4 bg-white rounded-xl shadow-card text-center
        ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow active:scale-95' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
      <div className={`w-12 h-12 mx-auto rounded-full ${iconBgColor} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  );
}
