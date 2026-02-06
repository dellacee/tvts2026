'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@/types';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  showLogo?: boolean;
  className?: string;
}

export function Header({ title, showBack = true, onBack, rightAction, showLogo = false, className = '' }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-gradient-to-r from-primary to-accent-dark ${className}`}>
      {/* Full width gradient background */}
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side: Back button + Title */}
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={handleBack}
                className="p-1 -ml-1 text-white hover:bg-white/10 rounded-lg transition-colors duration-base"
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
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <h1 className="text-white font-bold text-lg tracking-wide font-heading">
              {title}
            </h1>
          </div>

          {/* Right side: Logo or action */}
          <div className="flex items-center">
            {rightAction ? (
              rightAction
            ) : showLogo ? (
              <Image 
                src="/logo-tvts.png" 
                alt="TVTS Logo" 
                width={36} 
                height={36} 
                className="object-contain"
              />
            ) : null}
          </div>
        </div>
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
    <header className="sticky top-0 z-50 bg-background-primary shadow-sm border-b border-neutral-100">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image 
              src="/logo-tvts.png" 
              alt="TVTS Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-primary text-[10px] font-medium leading-tight">TƯ VẤN TUYỂN SINH QUẢNG TRỊ</span>
              <span className="text-primary font-bold text-sm italic leading-tight font-heading">CHUYẾN BAY ĐẦU TIÊN</span>
            </div>
          </div>
          {/* User icon */}
          <button 
            className="p-2 text-primary hover:bg-primary-lighter rounded-full transition-colors duration-base" 
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
      </div>
    </header>
  );
}
