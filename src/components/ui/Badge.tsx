import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'md',
  icon,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide whitespace-nowrap';

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  const variantStyles = {
    amber: 'bg-[#00C9CE]/15 text-[#1E3063] border border-[#00C9CE]/30 font-bold',
    emerald: 'bg-[#15803D]/12 text-[#15803D] border border-[#15803D]/30 font-bold',
    blue: 'bg-[#1E3063]/10 text-[#1E3063] border border-[#1E3063]/20 font-bold',
    purple: 'bg-[#6C5CE7]/12 text-[#5B4BC4] border border-[#6C5CE7]/25 font-bold',
    rose: 'bg-[#B91C1C]/10 text-[#B91C1C] border border-[#B91C1C]/20 font-bold',
    slate: 'bg-[#F5EFE6] text-[#1E3063] border border-[#E2D8C7] font-semibold',
    outline: 'border border-[#1E3063] text-[#1E3063] font-semibold',
  };

  return (
    <span className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}>
      {icon}
      <span>{children}</span>
    </span>
  );
};
