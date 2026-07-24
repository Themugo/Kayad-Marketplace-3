import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rounded',
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'animate-pulse bg-[#EFE8DA]/80 border border-[#E2D8C7]/50',
          variant === 'circular' && 'rounded-full',
          variant === 'rounded' && 'rounded-2xl',
          variant === 'rectangular' && 'rounded-none',
          className
        )
      )}
      {...props}
    />
  );
};

export const VehicleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#E2D8C7] rounded-3xl overflow-hidden shadow-xs flex flex-col space-y-0">
      {/* Image Skeleton */}
      <div className="relative h-52 sm:h-56 bg-[#0B1628]/90 overflow-hidden">
        <Skeleton className="w-full h-full rounded-none bg-[#1E3063]/30" />
        <div className="absolute top-2.5 left-2.5">
          <Skeleton className="h-6 w-28 rounded-xl bg-[#00C9CE]/20" />
        </div>
        <div className="absolute top-2.5 right-2.5">
          <Skeleton className="h-6 w-14 rounded-xl bg-white/20" />
        </div>
      </div>
      
      {/* Details Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20 rounded-md bg-[#F6F1E8]" />
            <Skeleton className="h-4 w-16 rounded-md bg-[#F6F1E8]" />
          </div>
          
          <Skeleton className="h-6 w-3/4 rounded-xl bg-[#EFE8DA]" />
          
          <div className="flex justify-between items-center pt-1">
            <Skeleton className="h-4 w-24 rounded-md bg-[#F6F1E8]" />
            <Skeleton className="h-4 w-20 rounded-md bg-[#F6F1E8]" />
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-[#E2D8C7] flex justify-between items-center">
            <Skeleton className="h-4 w-28 rounded-md bg-[#EFE8DA]" />
            <Skeleton className="h-6 w-24 rounded-md bg-[#1E3063]/20" />
          </div>
        </div>

        <Skeleton className="w-full h-10 rounded-xl bg-[#1E3063]/80" />
      </div>
    </div>
  );
};

export const GallerySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <VehicleCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const VehicleDetailSkeleton: React.FC = () => {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Title Skeleton */}
      <div className="flex justify-between items-center pb-6 border-b border-[#E8E1D5]">
        <div className="space-y-2 w-1/2">
          <Skeleton className="h-4 w-1/3 rounded-lg" />
          <Skeleton className="h-8 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="w-full h-[450px] rounded-3xl" />
          <div className="flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-24 h-18 rounded-2xl shrink-0" />
            ))}
          </div>
          <Skeleton className="w-full h-48 rounded-3xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="w-full h-64 rounded-3xl" />
          <Skeleton className="w-full h-48 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};
