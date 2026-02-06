'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'elevated' | 'warm';
}

export function Card({
  children,
  className = '',
  onClick,
  padding = 'md',
  variant = 'default',
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  const variants = {
    default: 'bg-background-primary shadow-card border border-neutral-100',
    outline: 'bg-background-primary border border-neutral-300',
    elevated: 'bg-background-primary shadow-lg',
    warm: 'bg-background-secondary border border-accent-lighter border-l-4 border-l-accent',
  };

  return (
    <div
      className={`
        rounded-lg overflow-hidden transition-all duration-base
        ${paddings[padding]}
        ${variants[variant]}
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Card header component
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

// Card content component
export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Card footer component
export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
}
