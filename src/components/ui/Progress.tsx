'use client';

import React from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressIndicator({ current, total, className = '' }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-xs text-neutral-500">
        <span>{current}/{total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Step progress for multi-step flows
interface StepProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className = '' }: StepProgressProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                text-xs font-medium transition-colors duration-base
                ${index < currentStep
                  ? 'bg-gradient-to-r from-primary to-accent text-white'
                  : index === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-500'
                }
              `}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs text-neutral-500 mt-1 text-center max-w-[60px]">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
                flex-1 h-0.5 mx-2
                ${index < currentStep ? 'bg-gradient-to-r from-primary to-accent' : 'bg-neutral-100'}
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Progress card shown on dashboard
interface ProgressCardProps {
  title: string;
  description?: string;
  progress: number;
  total: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  completed?: boolean;
  className?: string;
}

export function ProgressCard({
  title,
  description,
  progress,
  total,
  icon,
  onClick,
  completed,
  className = '',
}: ProgressCardProps) {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <div
      className={`
        p-4 bg-background-primary rounded-lg shadow-card border border-neutral-100
        ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-base' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-lighter to-accent-lighter flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-neutral-900 truncate">{title}</h3>
            {completed && (
              <span className="flex-shrink-0 text-xs text-success font-semibold px-2 py-0.5 bg-success-light rounded-full">
                Hoàn thành
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-neutral-500 mt-0.5">{description}</p>
          )}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-neutral-500 mb-1">
              <span>{progress}/{total}</span>
              <span>{percentage}%</span>
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  completed ? 'bg-success' : 'bg-gradient-to-r from-primary to-accent'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
