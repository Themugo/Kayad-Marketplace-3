import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { VehicleCard } from '../gallery/VehicleCard';

export const FeaturedVehicles: React.FC = () => {
  const { vehicles, navigateTo } = useMarketplace();
  const [activeFilter, setActiveFilter] = useState<'All' | 'SUV' | 'Pickup' | 'Auctions'>('All');

  const filteredVehicles = vehicles.filter(v => {
    if (activeFilter === 'SUV') return v.bodyStyle === 'SUV' || v.model?.includes('Cruiser') || v.model?.includes('Rover') || v.model?.includes('Cayenne');
    if (activeFilter === 'Pickup') return v.bodyStyle === 'Truck' || v.model?.includes('Hilux') || v.bodyStyle === 'Pickup';
    if (activeFilter === 'Auctions') return v.listingType === 'auction' || v.listingType === 'both';
    return true;
  });

  return (
    <section className="bg-[#FCF9F4] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3063]/10 border border-[#1E3063]/20 text-[#1E3063] font-mono font-black text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#00C9CE]" />
            <span>PREMIUM SELECTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1E3063] font-serif tracking-tight">
            Featured Vehicles
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7A99] font-sans font-medium">
            Handpicked quality luxury & utility vehicles across Kenya, verified by 150-point inspection.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {(['All', 'SUV', 'Pickup', 'Auctions'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#1E3063] text-white shadow-md border border-[#1E3063]'
                  : 'bg-white border border-[#E2D8C7] text-[#1E3063] hover:bg-[#F6F1E8]'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 4-Column Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredVehicles.slice(0, 8).map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Browse All CTA Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('gallery')}
            className="px-8 py-3.5 rounded-2xl bg-[#1E3063] hover:bg-[#121D33] text-white font-mono font-black text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer hover:scale-[1.02]"
          >
            <span>Browse Full Marketplace Inventory</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </button>
        </div>

      </div>
    </section>
  );
};


