'use client';

import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, options, value, onChange, className = '' }: RadioGroupProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-center gap-3 p-4 rounded-lg cursor-pointer
            border-2 transition-all duration-base
            ${value === option.value
              ? 'border-accent bg-accent-lighter'
              : 'border-neutral-300 bg-background-primary hover:border-accent-light'
            }
          `}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center
              transition-colors duration-base
              ${value === option.value
                ? 'border-accent'
                : 'border-neutral-300'
              }
            `}
          >
            {value === option.value && (
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            )}
          </div>
          <span className="text-sm text-neutral-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

// Single radio button
interface RadioProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  className?: string;
}

export function Radio({ name, value, label, checked, onChange, className = '' }: RadioProps) {
  return (
    <label
      className={`
        flex items-center gap-3 p-4 rounded-lg cursor-pointer
        border-2 transition-all duration-base
        ${checked
          ? 'border-accent bg-accent-lighter'
          : 'border-neutral-300 bg-background-primary hover:border-accent-light'
        }
        ${className}
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-colors duration-base
          ${checked ? 'border-accent' : 'border-neutral-300'}
        `}
      >
        {checked && (
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
        )}
      </div>
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
}
