import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-extrabold text-[#1E3063] uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#6B7A99] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={twMerge(
            clsx(
              'w-full rounded-xl bg-[#F6F1E8] border text-[#1E3063] font-semibold placeholder-[#6B7A99] text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00C9CE]/50 focus:border-[#00C9CE]',
              leftIcon ? 'pl-10' : 'pl-3.5',
              rightIcon ? 'pr-10' : 'pr-3.5',
              'py-2.5',
              error
                ? 'border-[#DC3545] focus:ring-[#DC3545]/40'
                : 'border-[#E2D8C7]',
              className
            )
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-[#6B7A99]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-[#DC3545] dark:text-[#DC3545]">{error}</p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500 dark:text-[#94A3B8]">{helperText}</p>
      )}
    </div>
  );
};
