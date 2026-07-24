import React from 'react';
import { Car, ShieldCheck, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useMarketplace();

  return (
    <footer className="bg-[#0B1628] text-slate-200 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1E3063] flex items-center justify-center text-[#00C9CE] shadow-md border border-[#00C9CE]/30">
                <Car className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-wider text-white font-serif uppercase">
                  KAYAD
                </span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#00C9CE] leading-none">
                  Automotive Escrow
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-xs">
              Kenya's premier certified car marketplace. Buy, sell, and auction luxury vehicles with CBK-regulated bank escrow protection.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C9CE]/15 text-[#00C9CE] text-[11px] font-mono font-black uppercase tracking-wider border border-[#00C9CE]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00C9CE]" />
                Escrow Verified
              </span>
            </div>
          </div>

          {/* Col 2: Marketplace Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-black uppercase tracking-wider text-[#00C9CE]">
              Marketplace
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Browse Inventory
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('auctions')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Live Auctions
                </button>
              </li>
              <li>
                <button onClick={() => {
                  navigateTo('auctions');
                  setTimeout(() => {
                    const el = document.getElementById('trust-gate');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} className="hover:text-[#00C9CE] text-[#00C9CE] font-mono font-bold transition-colors cursor-pointer inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C9CE]" />
                  Trust Gate & Rules
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sell')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Sell Your Car
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('escrow')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Escrow Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-black uppercase tracking-wider text-[#00C9CE]">
              Services & Audits
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => navigateTo('ghost_check')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  150-Point Audit
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('support')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Financing Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('support')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Vehicle Insurance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dealer_profile')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">
                  Verified Dealerships
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-black uppercase tracking-wider text-[#00C9CE]">
              Platform & Company
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <button onClick={() => navigateTo('how_it_works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About KAYAD
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('support')} className="hover:text-white transition-colors cursor-pointer">
                  Concierge Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00C9CE]" />
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-[#0B1628] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} KAYAD Kenya. All rights reserved. Regulated Escrow Verified.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('support')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => navigateTo('support')} className="hover:text-[#00C9CE] transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};




