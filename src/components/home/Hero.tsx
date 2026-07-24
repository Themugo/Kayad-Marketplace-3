import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Search, CheckCircle, Tag, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Hero: React.FC = () => {
  const { navigateTo, vehicles } = useMarketplace();

  // Extract images directly from featured vehicles dataset
  const sliderVehicles = React.useMemo(() => {
    return vehicles.filter(v => v.images && v.images.length > 0).slice(0, 6);
  }, [vehicles]);

  const sliderImages = React.useMemo(() => {
    if (sliderVehicles.length > 0) {
      return sliderVehicles.map(v => v.images[0]);
    }
    return [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80'
    ];
  }, [sliderVehicles]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto advance background dissolve slider
  useEffect(() => {
    if (sliderImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages]);

  const handlePrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlideIndex(prev => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlideIndex(prev => (prev + 1) % sliderImages.length);
  };

  return (
    <div className="relative bg-[#0B1628] text-white overflow-hidden border-b border-white/10 flex flex-col justify-between min-h-[460px] sm:min-h-[500px]">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {sliderImages.map((imgUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img 
              src={imgUrl} 
              alt="Featured Vehicle background" 
              className="w-full h-full object-cover object-[center_55%] select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Minimal edge vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/95 via-[#0B1628]/40 to-[#0B1628]/70" />
      </div>

      {/* Main Hero Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Container in Light Navy (#1E3063) mirroring AuctionsPage hero card */}
        <div className="bg-[#1E3063]/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-xl max-w-3xl mx-auto space-y-6">
          
          {/* Badge Pill matching Auctions Page */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-mono font-black uppercase tracking-wider border border-[#00C9CE]/30">
            <Shield className="w-4 h-4 text-[#00C9CE]" />
            <span>MULTI-SIGNATURE ESCROW • VERIFIED MARKETPLACE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Drive Your Dream Today
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto">
            Buy, sell, and auction luxury & verified vehicles with total confidence. Regulated M-Pesa & bank escrow enforcement.
          </p>

          {/* Action Buttons matching Auctions Page */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('gallery')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-100 text-[#1E3063] font-mono font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Browse Marketplace</span>
              <ArrowRight className="w-4 h-4 text-[#1E3063]" />
            </button>

            <button
              onClick={() => navigateTo('sell')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-mono font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-lg"
            >
              Sell a Vehicle
            </button>
          </div>

        </div>

        {/* Background Image Slider Controls */}
        <div className="flex items-center justify-center gap-3.5 pt-6">
          <button
            onClick={handlePrevSlide}
            className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlideIndex ? 'w-5 bg-[#00C9CE]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white backdrop-blur-md transition-all shadow-md cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4-Column Feature Bar mirroring Auctions Page stat boxes */}
      <div className="relative z-10 bg-[#0B1628]/95 border-t border-white/10 backdrop-blur-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Col 1 */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00C9CE]/20 flex items-center justify-center text-[#00C9CE] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider block">Escrow Vault</span>
              <span className="text-xs font-mono font-black text-white truncate block">CBK Regulated</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00C9CE]/20 flex items-center justify-center text-[#00C9CE] shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider block">150-Pt Audit</span>
              <span className="text-xs font-mono font-black text-white truncate block">KRA Verified</span>
            </div>
          </div>

          {/* Col 3 */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/20 flex items-center justify-center text-[#2ECC71] shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider block">Verified Vetting</span>
              <span className="text-xs font-mono font-black text-white truncate block">100% Vetted</span>
            </div>
          </div>

          {/* Col 4 */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00C9CE]/20 flex items-center justify-center text-[#00C9CE] shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider block">Live Auctions</span>
              <span className="text-xs font-mono font-black text-white truncate block">Zero Ghost Bids</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};



