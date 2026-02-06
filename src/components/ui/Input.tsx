import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, required, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3.5 rounded-lg border-2 bg-background-primary
              ${error 
                ? 'border-error focus:border-error focus:ring-error/10' 
                : 'border-neutral-300 focus:border-accent focus:ring-accent/10'
              }
              ${leftIcon ? 'pl-12' : ''}
              ${rightIcon ? 'pr-12' : ''}
              focus:outline-none focus:ring-2
              placeholder:text-neutral-500
              transition-all duration-base
              font-sans text-neutral-900
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
