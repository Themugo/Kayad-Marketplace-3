import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Gauge,
  Fuel,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  MapPin,
  Eye
} from 'lucide-react';
import { Vehicle } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Skeleton } from '../ui/Skeleton';

interface VehicleCardProps {
  vehicle: Vehicle;
  viewMode?: 'grid' | 'list';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, viewMode = 'grid' }) => {
  const { savedVehicleIds, toggleSaveVehicle, navigateTo, initiateEscrow } = useMarketplace();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(true);

  const isSaved = savedVehicleIds.includes(vehicle.id);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!vehicle.images || vehicle.images.length === 0) return;
    setIsImgLoading(true);
    setCurrentImgIndex(prev => (prev + 1) % vehicle.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!vehicle.images || vehicle.images.length === 0) return;
    setIsImgLoading(true);
    setCurrentImgIndex(prev => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  // Format price in KES (Kenyan Shillings)
  const priceVal = vehicle.currentBid || vehicle.price;
  const formattedKESPrice = `KES ${priceVal.toLocaleString()}`;

  const isAuction = vehicle.listingType === 'auction' || vehicle.listingType === 'both';

  return (
    <div
      onClick={() => navigateTo('vehicle_detail', vehicle.id)}
      className={`group bg-white border border-[#E2D8C7] rounded-3xl p-5 sm:p-6 shadow-sm hover:border-[#1E3063] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 h-full ${
        viewMode === 'list' ? 'md:flex-row md:items-center md:space-y-0 md:gap-6' : ''
      }`}
    >
      {/* Image Container with Badges */}
      <div className={`relative rounded-2xl overflow-hidden bg-[#1E3063] border border-[#E2D8C7] group shrink-0 ${
        viewMode === 'list' ? 'md:w-72 h-52 md:h-48' : 'h-52 sm:h-56 w-full'
      }`}>
        {isImgLoading && (
          <Skeleton className="absolute inset-0 w-full h-full bg-[#1E3063]" />
        )}
        <img
          src={vehicle.images?.[currentImgIndex] || 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80'}
          alt={vehicle.title}
          onLoad={() => setIsImgLoading(false)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            isImgLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Carousel Arrow Controls */}
        {vehicle.images && vehicle.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImg}
              className="p-1.5 rounded-full bg-[#1E3063]/90 text-[#00C9CE] hover:bg-[#00C9CE] hover:text-[#1E3063] transition-colors shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImg}
              className="p-1.5 rounded-full bg-[#1E3063]/90 text-[#00C9CE] hover:bg-[#00C9CE] hover:text-[#1E3063] transition-colors shadow-md cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Left Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {isAuction ? (
            <span className="px-2.5 py-1 rounded-xl bg-[#1E3063]/95 backdrop-blur-md text-[#00C9CE] font-mono font-black text-[10px] uppercase shadow-md border border-[#00C9CE]/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00C9CE]" />
              LIVE AUCTION LOT
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-xl bg-[#1E3063]/95 backdrop-blur-md text-[#2ECC71] font-mono font-black text-[10px] uppercase shadow-md border border-[#2ECC71]/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#2ECC71]" />
              150-PT AUDITED
            </span>
          )}
        </div>

        {/* Top Right Year Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2.5 py-1 rounded-xl bg-[#1E3063]/90 backdrop-blur-md text-white font-mono font-black text-xs shadow-md border border-white/20">
            {vehicle.year}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveVehicle(vehicle.id);
          }}
          className={`absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isSaved
              ? 'bg-rose-600 text-white shadow-lg'
              : 'bg-[#1E3063]/80 text-[#00C9CE] hover:bg-rose-600 hover:text-white border border-[#00C9CE]/30'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Vehicle'}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Details */}
      <div className="flex-1 flex flex-col justify-between space-y-4 min-w-0">
        <div className="space-y-2.5">
          {/* Make / Brand & Location Header */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#6B7A99]">
            <span className="uppercase tracking-wider">{vehicle.make}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#00C9CE]" />
              {vehicle.location ? vehicle.location.split(',')[0] : 'Nairobi'}
            </span>
          </div>

          {/* Model Title & Year */}
          <h3 className="text-base sm:text-lg font-serif font-black text-[#1E3063] group-hover:text-[#00C9CE] transition-colors leading-tight line-clamp-1">
            {vehicle.year} {vehicle.title || vehicle.model}
          </h3>

          {/* Specs Row */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#6B7A99] pt-0.5">
            <span className="flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-[#1E3063]" />
              {vehicle.mileage ? vehicle.mileage.toLocaleString() : '18,000'} km
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-[#00C9CE]" />
              {vehicle.transmission || 'Automatic'}
            </span>
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-2xl bg-[#F6F1E8] border border-[#E2D8C7] space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B7A99] font-mono font-extrabold uppercase text-[10px] tracking-wider">
                {isAuction ? 'Current High Bid' : 'Verified Buy Price'}
              </span>
              <span className="text-base sm:text-lg font-serif font-black text-[#1E3063]">
                {formattedKESPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            onClick={() => navigateTo('vehicle_detail', vehicle.id)}
            className="w-full py-3 px-4 rounded-xl bg-[#1E3063] hover:bg-[#0B1628] text-white text-xs font-mono font-black uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>{isAuction ? 'Place Bid / View Lot' : 'Inspect & Buy'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00C9CE]" />
          </button>
        </div>
      </div>
    </div>
  );
};



