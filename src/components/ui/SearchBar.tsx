import React from 'react';
import { Search, X, Sparkles, SlidersHorizontal, ArrowUpDown, LayoutGrid, List, CheckCircle2 } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
  filterOptions?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  sortOptions?: SortOption[];
  activeSort?: string;
  onSortChange?: (sortId: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onMobileFilterToggle?: () => void;
  badgeLabel?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search make, model, VIN, or city...',
  resultCount,
  filterOptions,
  activeFilter,
  onFilterChange,
  sortOptions,
  activeSort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onMobileFilterToggle,
  badgeLabel,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-[#E2D8C7] rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3 ${className}`}>
      {/* Primary Search Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Main Search Input */}
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3063]" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full h-11 pl-10 pr-9 bg-[#FCF9F4] border border-[#E2D8C7] focus:border-[#1E3063] focus:ring-2 focus:ring-[#00C9CE]/30 rounded-xl text-xs sm:text-sm text-[#1E3063] font-mono font-bold placeholder:text-[#6B7A99] focus:outline-none transition-all shadow-2xs"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#6B7A99] hover:text-[#1E3063] hover:bg-[#E2D8C7]/50 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action Controls Group */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 justify-between lg:justify-end">
          
          {/* Quick Format Pills */}
          {filterOptions && filterOptions.length > 0 && onFilterChange && (
            <div className="flex items-center gap-1 bg-[#F6F1E8] border border-[#E2D8C7] p-1 rounded-xl h-11 shrink-0 overflow-x-auto">
              {filterOptions.map(fmt => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => onFilterChange(fmt.id)}
                  className={`h-9 px-3 text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${
                    activeFilter === fmt.id
                      ? 'bg-[#1E3063] text-white shadow-xs'
                      : 'text-[#6B7A99] hover:text-[#1E3063] hover:bg-[#E2D8C7]/40'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Filter Trigger */}
          {onMobileFilterToggle && (
            <button
              type="button"
              onClick={onMobileFilterToggle}
              className="lg:hidden h-11 px-3.5 rounded-xl border border-[#E2D8C7] text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 bg-[#F6F1E8] text-[#1E3063] cursor-pointer hover:bg-[#EFE8DA]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#00C9CE]" />
              <span>Refine</span>
            </button>
          )}

          {/* Sort Dropdown */}
          {sortOptions && sortOptions.length > 0 && onSortChange && (
            <div className="relative flex items-center h-11 bg-[#F6F1E8] border border-[#E2D8C7] hover:border-[#1E3063] rounded-xl px-3 text-xs font-mono font-black uppercase tracking-wider transition-all shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#00C9CE] shrink-0 mr-1.5" />
              <span className="text-[#6B7A99] hidden sm:inline mr-1">Sort:</span>
              <select
                value={activeSort}
                onChange={e => onSortChange(e.target.value)}
                className="bg-transparent focus:outline-none text-[#1E3063] font-mono font-black cursor-pointer pr-4 appearance-none text-xs"
              >
                {sortOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Grid/List View Switcher */}
          {viewMode && onViewModeChange && (
            <div className="flex items-center bg-[#F6F1E8] border border-[#E2D8C7] p-1 rounded-xl h-11 shrink-0 gap-0.5">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                title="Grid View"
                className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#1E3063] text-white shadow-xs'
                    : 'text-[#6B7A99] hover:text-[#1E3063]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                title="List View"
                className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#1E3063] text-white shadow-xs'
                    : 'text-[#6B7A99] hover:text-[#1E3063]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Badge-Style Feedback Mechanism Bar */}
      {(value || resultCount !== undefined || badgeLabel) && (
        <div className="pt-2 border-t border-[#E8E1D5] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {badgeLabel && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1E3063]/10 border border-[#1E3063]/20 text-[#1E3063] font-mono font-black text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#00C9CE]" />
                <span>{badgeLabel}</span>
              </div>
            )}

            {value && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00C9CE]/15 border border-[#00C9CE]/40 text-[#1E3063] font-mono font-black text-[11px] uppercase tracking-wider">
                <span>Keyword: "{value}"</span>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="hover:text-red-700 cursor-pointer ml-1 p-0.5"
                  title="Remove search query"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {resultCount !== undefined && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2ECC71]/15 border border-[#2ECC71]/40 text-[#1E3063] font-mono font-black text-[11px] uppercase tracking-wider ml-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{resultCount} {resultCount === 1 ? 'Vehicle Found' : 'Vehicles Found'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
