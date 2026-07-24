import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glass = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-2xl border transition-all duration-300 overflow-hidden',
          glass
            ? 'bg-white/80 dark:bg-[#0B1628]/80 backdrop-blur-md border-slate-200/80 dark:border-[#1A2A4E]/80 shadow-xl'
            : 'bg-white dark:bg-[#0B1628] border-slate-200 dark:border-[#1A2A4E] shadow-md',
          hoverEffect &&
            'hover:-translate-y-1 hover:shadow-2xl hover:border-[#00C9CE]/40 dark:hover:border-[#00C9CE]/40',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
