'use client';

import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder = '-- Chọn --', required, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-5 py-3.5 rounded-lg border-2 appearance-none
              ${error 
                ? 'border-error focus:border-error focus:ring-error/10' 
                : 'border-neutral-300 focus:border-accent focus:ring-accent/10'
              }
              focus:outline-none focus:ring-2
              bg-background-primary
              text-neutral-900 font-sans
              transition-all duration-base
              ${className}
            `}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                className="text-neutral-700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-error">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
