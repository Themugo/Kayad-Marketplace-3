import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TabOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'underline';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  options,
  activeId,
  onChange,
  variant = 'pills',
  className,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex items-center gap-1 overflow-x-auto no-scrollbar',
          variant === 'pills' &&
            'p-1 bg-[#F6F1E8] dark:bg-[#1A2A4E]/80 rounded-2xl border border-[#E2D8C7] dark:border-[#1A2A4E]/60',
          variant === 'underline' && 'border-b border-slate-200 dark:border-slate-800 gap-6',
          className
        )
      )}
    >
      {options.map(tab => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={twMerge(
              clsx(
                'inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 whitespace-nowrap focus:outline-none',
                variant === 'pills' && [
                  'px-4 py-2 rounded-xl',
                  isActive
                    ? 'bg-gradient-to-r from-[#00C9CE] to-[#00E5A0] text-[#1E3063] font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-[#6B7A99] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#1A2A4E]/50',
                ],
                variant === 'underline' && [
                  'pb-3 pt-1 border-b-2 font-medium',
                  isActive
                    ? 'border-[#00C9CE] text-[#00C9CE] font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white',
                ]
              )
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={clsx(
                  'px-1.5 py-0.5 text-[10px] font-bold rounded-full',
                  isActive
                    ? 'bg-[#1E3063]/20 text-[#1E3063]'
                    : 'bg-slate-200 dark:bg-[#1A2A4E] text-slate-700 dark:text-[#94A3B8]'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
