import React, { useState, useMemo } from 'react';
import { 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  X,
  CheckCircle2,
  Lock,
  Car,
  ChevronDown
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FilterSidebar } from './FilterSidebar';
import { VehicleCard } from './VehicleCard';
import { SearchBar } from '../ui/SearchBar';

export const GalleryPage: React.FC = () => {
  const { vehicles, filters, setFilters, resetFilters } = useMarketplace();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = vehicle.title?.toLowerCase().includes(q);
        const matchesMake = vehicle.make?.toLowerCase().includes(q);
        const matchesModel = vehicle.model?.toLowerCase().includes(q);
        const matchesVin = vehicle.vin?.toLowerCase().includes(q);
        const matchesLocation = vehicle.location?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMake && !matchesModel && !matchesVin && !matchesLocation) {
          return false;
        }
      }

      // Makes / Brands
      if (filters.makes.length > 0 && !filters.makes.includes(vehicle.make)) {
        return false;
      }

      // Body Styles
      if (filters.bodyStyles.length > 0 && !filters.bodyStyles.includes(vehicle.bodyStyle)) {
        return false;
      }

      // Price Filter
      const vehiclePrice = vehicle.currentBid || vehicle.price;
      if (vehiclePrice > filters.maxPrice) {
        return false;
      }

      // Fuel Type Filter
      if (filters.fuelType && filters.fuelType.length > 0) {
        if (!filters.fuelType.includes(vehicle.fuelType)) {
          return false;
        }
      }

      // Transmission Filter
      if (filters.transmission && filters.transmission.length > 0) {
        if (!filters.transmission.includes(vehicle.transmission)) {
          return false;
        }
      }

      // Listing Format
      if (filters.listingType === 'auction' && vehicle.listingType === 'fixed') return false;
      if (filters.listingType === 'fixed' && vehicle.listingType === 'auction') return false;

      // Certified Only
      if (filters.certifiedOnly && (!vehicle.inspection || vehicle.inspection.score < 80)) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.currentBid || a.price;
      const priceB = b.currentBid || b.price;

      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (filters.sortBy === 'price_desc') return priceB - priceA;
      if (filters.sortBy === 'price_asc') return priceA - priceB;
      if (filters.sortBy === 'year_desc') return b.year - a.year;
      if (filters.sortBy === 'mileage_asc') return a.mileage - b.mileage;
      return 0;
    });
  }, [vehicles, filters]);

  const activeFiltersCount = 
    (filters.searchQuery ? 1 : 0) +
    filters.makes.length +
    filters.bodyStyles.length +
    (filters.certifiedOnly ? 1 : 0) +
    (filters.listingType !== 'all' ? 1 : 0) +
    (filters.fuelType?.length || 0);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 bg-[#FCF9F4] text-[#1E3063] font-sans min-h-screen">
      
      {/* KAYAD Premium Showroom Hero Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#1E3063] text-white border border-white/10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C9CE]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-[10px] font-mono font-black uppercase tracking-[0.2em] border border-[#00C9CE]/30">
            <Sparkles className="w-3 h-3 text-[#00C9CE]" />
            <span>KENYA'S EXCLUSIVE AUTOMOTIVE MARKETPLACE</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight uppercase leading-snug">
            KAYAD Premium Showroom
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-sans font-medium max-w-xl leading-relaxed">
            Curated luxury stock, transparent pricing, M-Pesa escrow protected transactions.
          </p>
        </div>

        {/* Right side trust badges */}
        <div className="relative z-10 flex sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
          <div className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2.5 text-xs text-white">
            <ShieldCheck className="w-4 h-4 text-[#00C9CE] shrink-0" />
            <div>
              <p className="font-mono font-black text-[9px] uppercase text-[#00C9CE] leading-none">M-Pesa Escrow</p>
              <p className="text-[11px] font-medium text-slate-200">100% Guaranteed</p>
            </div>
          </div>

          <div className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2.5 text-xs text-white">
            <Car className="w-4 h-4 text-[#2ECC71] shrink-0" />
            <div>
              <p className="font-mono font-black text-[9px] uppercase text-[#2ECC71] leading-none">150-Pt Audited</p>
              <p className="text-[11px] font-medium text-slate-200">Verified Condition</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search & Control Toolbar */}
      <SearchBar
        value={filters.searchQuery}
        onChange={q => setFilters(prev => ({ ...prev, searchQuery: q }))}
        placeholder="Search make, model, VIN, or city..."
        resultCount={filteredVehicles.length}
        badgeLabel="KAYAD SHOWROOM INVENTORY"
        filterOptions={[
          { id: 'all', label: 'All Stock' },
          { id: 'fixed', label: 'Direct Buy' },
          { id: 'auction', label: 'Live Auctions' },
        ]}
        activeFilter={filters.listingType}
        onFilterChange={type => setFilters(prev => ({ ...prev, listingType: type as any }))}
        sortOptions={[
          { id: 'newest', label: 'Newest Arrivals' },
          { id: 'price_desc', label: 'Price: High to Low' },
          { id: 'price_asc', label: 'Price: Low to High' },
          { id: 'year_desc', label: 'Newest Model Year' },
          { id: 'mileage_asc', label: 'Lowest Mileage' },
        ]}
        activeSort={filters.sortBy === 'featured' ? 'newest' : filters.sortBy}
        onSortChange={sort => setFilters(prev => ({ ...prev, sortBy: sort as any }))}
        viewMode={viewMode}
        onViewModeChange={mode => setViewMode(mode)}
        onMobileFilterToggle={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
      />

      {/* Main Showroom Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar ("REFINE") */}
        <div className="hidden lg:block shrink-0">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="lg:hidden mb-6">
            <FilterSidebar />
          </div>
        )}

        {/* Showroom Vehicle Grid */}
        <div className="flex-1 min-w-0 space-y-4">
          
          {/* Results Count Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-serif font-black text-[#1E3063]">
                {filteredVehicles.length} vehicles available
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#00C9CE] hover:underline flex items-center gap-1"
                >
                  Clear filters ({activeFiltersCount})
                </button>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 font-bold">
              <span className="flex items-center gap-1 text-[#1E3063]">
                <ShieldCheck className="w-4 h-4 text-[#00C9CE]" />
                100% Escrow Protected
              </span>
            </div>
          </div>

          {/* 4-Column Grid Layout */}
          {filteredVehicles.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E2D8C7] rounded-3xl space-y-4 shadow-sm my-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#1E3063]/10 flex items-center justify-center text-[#1E3063]">
                <Car className="w-8 h-8 text-[#00C9CE]" />
              </div>
              <h3 className="text-xl font-black text-[#1E3063] font-serif">
                No matching vehicles were found. Adjust your filters or explore our latest certified arrivals.
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Try clearing active filters or adjusting your budget slider to view all verified stock in our vault.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3063] text-white font-extrabold text-xs shadow-md hover:bg-[#121D33] transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-stretch'
                  : 'space-y-4'
              }
            >
              {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


