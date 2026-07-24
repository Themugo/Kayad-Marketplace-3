import React, { useState, useEffect } from 'react';
import { Gavel, Clock, ArrowRight, ShieldCheck, MapPin, Eye, Flame, ChevronRight } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const LiveAuctionsSection: React.FC = () => {
  const { vehicles, navigateTo } = useMarketplace();

  const auctionVehicles = vehicles.filter(v => v.listingType === 'auction' || v.listingType === 'both');

  // Countdown timer hook
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 59, seconds: 14 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 sm:py-14 bg-[#F6F1E8] text-[#1E3063] border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header matching Auctions Page */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[#E2D8C7]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3063]/10 border border-[#1E3063]/20 text-[#1E3063] font-mono font-black text-xs uppercase tracking-wider">
              <Gavel className="w-4 h-4 text-[#1E3063]" />
              <span>LIVE AUCTION ENGINE ACTIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1E3063] font-serif tracking-tight">
              Active Premium Auctions
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7A99] font-sans font-medium">
              Verified luxury vehicles currently under the hammer with real-time bid updates.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#E2D8C7] shadow-sm">
            <div className="flex items-center gap-2 text-xs text-[#6B7A99] font-bold">
              <Clock className="w-4 h-4 text-[#00C9CE] animate-spin" />
              <span>FEATURED LOT ENDS:</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-mono font-black text-[#1E3063]">
              <span className="px-2 py-0.5 bg-[#F6F1E8] rounded-md border border-[#E2D8C7]">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="px-2 py-0.5 bg-[#F6F1E8] rounded-md border border-[#E2D8C7]">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="px-2 py-0.5 bg-[#F6F1E8] rounded-md border border-[#E2D8C7]">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* Auction Cards Grid mirroring AuctionsPage lot card look */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {auctionVehicles.slice(0, 2).map((vehicle, idx) => (
            <div
              key={vehicle.id}
              onClick={() => navigateTo('vehicle_detail', vehicle.id)}
              className="group bg-white border border-[#E2D8C7] rounded-3xl overflow-hidden hover:border-[#1E3063] hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 md:grid-cols-2 shadow-xs"
            >
              {/* Image Frame */}
              <div className="relative h-64 md:h-auto overflow-hidden bg-slate-900">
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {idx === 0 && (
                    <span className="px-2.5 py-1 rounded-xl bg-[#1E3063]/90 backdrop-blur-md text-[#00C9CE] font-mono font-black text-[11px] shadow-md border border-[#00C9CE]/30 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#00C9CE]" />
                      FEATURED LOT
                    </span>
                  )}
                  <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white font-mono font-extrabold text-[11px] shadow-md border border-white/20 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#00C9CE]" />
                    Ends in {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-xl bg-[#1E3063]/90 backdrop-blur-md text-white font-mono font-bold text-[10px] border border-white/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Reserve Met
                  </span>
                </div>
              </div>

              {/* Details & Bidding Info */}
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#6B7A99]">
                    <span className="uppercase tracking-wider">{vehicle.make}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00C9CE]" />
                      {vehicle.location.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1E3063] font-serif group-hover:text-[#121D33] transition-colors line-clamp-1">
                    {vehicle.year} {vehicle.title}
                  </h3>

                  <div className="text-[11px] text-[#6B7A99] font-mono truncate">
                    VIN: <code className="bg-[#F6F1E8] px-1.5 py-0.5 rounded text-[#1E3063] font-bold">{vehicle.vin}</code>
                  </div>
                </div>

                {/* Pricing & High Bid */}
                <div className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-[#E2D8C7] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#6B7A99] font-bold uppercase text-[10px] tracking-wider">Starting Bid</span>
                    <span className="font-mono font-bold text-[#1E3063]">KES {(vehicle.price * 0.85).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-[#E2D8C7]">
                    <span className="text-[#1E3063] font-extrabold uppercase text-[10px] tracking-wider">Current High Bid</span>
                    <span className="text-lg font-mono font-black text-[#1E3063]">
                      KES {(vehicle.currentBid || vehicle.price).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono font-semibold text-emerald-700 text-right">
                    {vehicle.bidsCount || 12} bids placed • Live
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('vehicle_detail', vehicle.id);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#1E3063] hover:bg-[#121D33] text-white text-xs font-black transition-all text-center flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  >
                    <span>Place Bid</span>
                    <Gavel className="w-3 h-3 text-[#00C9CE]" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('vehicle_detail', vehicle.id);
                    }}
                    className="py-2.5 px-3 rounded-xl border-2 border-[#1E3063] text-[#1E3063] hover:bg-[#1E3063] hover:text-white text-xs font-black transition-all text-center cursor-pointer"
                  >
                    View Lot
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('auctions')}
            className="px-8 py-3.5 rounded-2xl bg-[#1E3063] hover:bg-[#121D33] text-white font-extrabold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Explore All Live Auction Lots ({auctionVehicles.length})</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </button>
        </div>

      </div>
    </section>
  );
};

