'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Header({ title, showBack = true, onBack, rightAction, className = '' }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-[#E7000B] shadow-card px-4 py-4 ${className}`}>
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-1 mr-4 text-white"
            aria-label="Quay lại"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <h1 className="text-white font-semibold text-lg leading-7 flex-1">
          {title}
        </h1>
        {rightAction && (
          <div className="ml-auto">
            {rightAction}
          </div>
        )}
      </div>
    </header>
  );
}

interface HomeHeaderProps {
  user?: User | null;
}

// Home header variant with logo
export function HomeHeader({ user }: HomeHeaderProps) {
  const router = useRouter();
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-card px-4 py-5">
      <div className="flex items-center justify-between">
        {/* Logo placeholder */}
        <div className="h-8 w-44 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
          Logo TVTS Quảng Trị
        </div>
        {/* User icon */}
        <button 
          className="text-[#E7000B]" 
          aria-label="Tài khoản"
          onClick={() => router.push('/profile')}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M4 20C4 17 8 14 12 14C16 14 20 17 20 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
