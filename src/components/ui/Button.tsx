import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-black uppercase tracking-wider transition-all duration-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#00C9CE]/40 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3.5 text-xs gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#1E3063] hover:bg-[#121D33] text-white shadow-md hover:scale-[1.02]',
    secondary: 'bg-white hover:bg-[#F6F1E8] text-[#1E3063] border border-[#E2D8C7] shadow-2xs',
    accent: 'bg-[#00C9CE] hover:bg-[#00b5b9] text-[#1E3063] shadow-md hover:scale-[1.02]',
    outline: 'bg-white border border-[#E2D8C7] hover:bg-[#F6F1E8] text-[#1E3063]',
    ghost: 'hover:bg-[#F6F1E8] text-[#1E3063]',
    danger: 'bg-[#991B1B] hover:bg-[#7f1717] text-white shadow-sm',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
