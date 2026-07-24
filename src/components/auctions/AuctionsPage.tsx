import React, { useState, useEffect } from 'react';
import { Gavel, Clock, ShieldCheck, Flame, User, ArrowUpRight, Check, Lock, AlertCircle, X, Sparkles, Building2, Phone, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { NavigationBar } from '../common/NavigationBar';
import { SearchBar } from '../ui/SearchBar';

interface AuctionLot {
  id: string;
  vehicleId: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  featured?: boolean;
  startingBid: number;
  currentBid: number;
  bidsCount: number;
  endsInSeconds: number;
  imageUrl: string;
  vin: string;
  location: string;
  inspectionScore: number;
}

const INITIAL_AUCTION_LOTS: AuctionLot[] = [
  {
    id: 'lot_1',
    vehicleId: 'veh_3',
    title: 'TOYOTA Land Cruiser 300',
    brand: 'TOYOTA',
    model: 'Land Cruiser 300',
    year: 2022,
    featured: true,
    startingBid: 14800000,
    currentBid: 16835000,
    bidsCount: 7,
    endsInSeconds: 3570, // 00:59:30
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    vin: 'JT3AA2E88RB008291',
    location: 'Nairobi Vault (Karen)',
    inspectionScore: 100,
  },
  {
    id: 'lot_2',
    vehicleId: 'veh_1',
    title: 'PORSCHE Cayenne S',
    brand: 'PORSCHE',
    model: 'Cayenne S',
    year: 2020,
    featured: false,
    startingBid: 10560000,
    currentBid: 12212000,
    bidsCount: 10,
    endsInSeconds: 8370, // 02:19:30
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    vin: 'WP0AF2A97PS289102',
    location: 'Nairobi Vault (Westlands)',
    inspectionScore: 99,
  },
  {
    id: 'lot_3',
    vehicleId: 'veh_2',
    title: 'MERCEDES-BENZ GLE 450',
    brand: 'MERCEDES-BENZ',
    model: 'GLE 450',
    year: 2021,
    featured: false,
    startingBid: 10240000,
    currentBid: 12048000,
    bidsCount: 13,
    endsInSeconds: 13170, // 03:39:30
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    vin: 'WDD1903791A082914',
    location: 'Mombasa Vault',
    inspectionScore: 98,
  },
  {
    id: 'lot_4',
    vehicleId: 'veh_4',
    title: 'FORD Ranger Raptor',
    brand: 'FORD',
    model: 'Ranger Raptor',
    year: 2022,
    featured: false,
    startingBid: 4480000,
    currentBid: 5696000,
    bidsCount: 16,
    endsInSeconds: 17970, // 04:59:30
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    vin: '1FTFW1E84MK102941',
    location: 'Nakuru Hub',
    inspectionScore: 100,
  },
];

export const AuctionsPage: React.FC = () => {
  const { placeBid, navigateTo } = useMarketplace();
  const { user, openAuthModal } = useAuth();

  const [lots, setLots] = useState<AuctionLot[]>(INITIAL_AUCTION_LOTS);
  const [userDepositTier, setUserDepositTier] = useState<'none' | 'standard' | 'premium'>('none');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Filtered Auction Lots
  const filteredLots = lots.filter(lot => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = lot.title.toLowerCase().includes(q);
      const matchesBrand = lot.brand.toLowerCase().includes(q);
      const matchesVin = lot.vin.toLowerCase().includes(q);
      const matchesLocation = lot.location.toLowerCase().includes(q);
      if (!matchesTitle && !matchesBrand && !matchesVin && !matchesLocation) return false;
    }
    if (filterCategory === 'featured' && !lot.featured) return false;
    if (filterCategory === 'ending_soon' && lot.endsInSeconds > 7200) return false;
    return true;
  });
  
  // Modals state
  const [activeBidLot, setActiveBidLot] = useState<AuctionLot | null>(null);
  const [bidAmountInput, setBidAmountInput] = useState<number>(0);
  const [bidSuccessMessage, setBidSuccessMessage] = useState<string>('');
  const [bidErrorMessage, setBidErrorMessage] = useState<string>('');

  const [depositModalTier, setDepositModalTier] = useState<'standard' | 'premium' | null>(null);
  const [depositPaymentMethod, setDepositPaymentMethod] = useState<'mpesa' | 'rtgs'>('mpesa');
  const [depositPhone, setDepositPhone] = useState<string>('+254 712 345 678');
  const [isProcessingDeposit, setIsProcessingDeposit] = useState<boolean>(false);
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string>('');

  // Ticking Countdown Timers Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLots(prevLots =>
        prevLots.map(lot => ({
          ...lot,
          endsInSeconds: Math.max(0, lot.endsInSeconds - 1)
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return {
      hh: pad(hours),
      mm: pad(minutes),
      ss: pad(seconds)
    };
  };

  const handleOpenBidModal = (lot: AuctionLot) => {
    setActiveBidLot(lot);
    setBidAmountInput(lot.currentBid + 50000);
    setBidSuccessMessage('');
    setBidErrorMessage('');
  };

  const handlePlaceBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBidLot) return;

    const minAllowed = activeBidLot.currentBid + 50000;
    if (bidAmountInput < minAllowed) {
      setBidErrorMessage(`Minimum bid increment is KES 50,000. Your bid must be at least KES ${minAllowed.toLocaleString()}`);
      return;
    }

    if (userDepositTier === 'none') {
      setBidErrorMessage('Security deposit required to place binding bids. Please complete Trust Gate deposit below.');
      return;
    }

    // Update lot state
    setLots(prev =>
      prev.map(l =>
        l.id === activeBidLot.id
          ? {
              ...l,
              currentBid: bidAmountInput,
              bidsCount: l.bidsCount + 1
            }
          : l
      )
    );

    // Call context
    placeBid(activeBidLot.vehicleId, bidAmountInput, user?.name || 'Verified Bidder', user?.id || 'usr_guest');

    setBidSuccessMessage(`Bid of KES ${bidAmountInput.toLocaleString()} placed successfully! You are now highest bidder.`);
    setTimeout(() => {
      setActiveBidLot(null);
      setBidSuccessMessage('');
    }, 2200);
  };

  const handleProcessDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingDeposit(true);

    setTimeout(() => {
      setIsProcessingDeposit(false);
      if (depositModalTier) {
        setUserDepositTier(depositModalTier);
        setDepositSuccessMsg(`Security Deposit of KES ${depositModalTier === 'standard' ? '500,000' : '1,000,000'} Locked in Escrow! Bidding privileges unlocked.`);
        setTimeout(() => {
          setDepositModalTier(null);
          setDepositSuccessMsg('');
        }, 2200);
      }
    }, 1500);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FCF9F4] text-[#1E3063] font-sans">
      <NavigationBar currentTitle="Live Vehicle Auctions" />
      
      {/* Top Hero / Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#1E3063] text-white border border-white/10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00C9CE]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-1.5 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-[10px] font-mono font-black uppercase tracking-[0.2em] border border-[#00C9CE]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] animate-pulse" />
            <span>LIVE COMPETITIVE BIDDING</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight uppercase leading-snug">
            KAYAD Auction House
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-sans font-medium max-w-xl">
            Bid on verified luxury vehicles in real time. Pre-inspected & 100% escrow-protected.
          </p>
        </div>

        {/* Live Stats Chips */}
        <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 shrink-0 w-full md:w-auto">
          <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs text-white">
            <Gavel className="w-4 h-4 text-[#00C9CE] shrink-0" />
            <div>
              <p className="font-mono font-black text-[9px] uppercase text-[#00C9CE] leading-none">Active Lots</p>
              <p className="text-[11px] font-medium text-slate-200">{lots.length} Live</p>
            </div>
          </div>

          <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs text-white">
            <User className="w-4 h-4 text-[#2ECC71] shrink-0" />
            <div>
              <p className="font-mono font-black text-[9px] uppercase text-[#2ECC71] leading-none">Bidders</p>
              <p className="text-[11px] font-medium text-slate-200">340+ Verified</p>
            </div>
          </div>

          <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2 text-xs text-white">
            <ShieldCheck className="w-4 h-4 text-[#00C9CE] shrink-0" />
            <div>
              <p className="font-mono font-black text-[9px] uppercase text-[#00C9CE] leading-none">Escrow Vault</p>
              <p className="text-[11px] font-medium text-slate-200">100% Secured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Gate · Compact Security Deposit Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2D8C7] shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E1D5]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1E3063] flex items-center justify-center text-[#00C9CE] shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-black text-[#1E3063] tracking-tight">
                  Trust Gate · Security Hold
                </h2>
                <span className="text-[10px] font-mono font-bold text-[#6B7A99] uppercase">
                  (100% Refundable)
                </span>
              </div>
              <p className="text-[11px] text-[#6B7A99] font-medium">
                Deposit required to eliminate ghost bids & unlock real-time bidding.
              </p>
            </div>
          </div>

          {userDepositTier !== 'none' && (
            <div className="px-3 py-1 rounded-full bg-[#2ECC71]/15 border border-[#2ECC71]/40 text-[#1E3063] text-[11px] font-mono font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>
                {userDepositTier === 'standard' ? 'Standard Tier Active (Up to 5M)' : 'Premium Tier Active (Unlimited)'}
              </span>
            </div>
          )}
        </div>

        {/* Tier Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Standard Tier */}
          <div className="p-3.5 rounded-xl bg-[#F6F1E8] border border-[#E2D8C7] flex items-center justify-between gap-3 hover:border-[#1E3063] transition-all">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif font-black text-[#1E3063]">Standard Tier</span>
                <span className="text-[10px] font-mono font-bold text-[#6B7A99] uppercase">Up to KES 5M</span>
              </div>
              <div className="text-sm font-mono font-black text-[#1E3063] mt-0.5">
                KES 500,000 <span className="text-[10px] text-[#6B7A99] font-normal font-sans">hold</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => setDepositModalTier('standard')}
              className="px-3.5 py-2 bg-[#1E3063] hover:bg-[#0B1628] text-white text-[11px] font-mono font-black uppercase tracking-wider shrink-0"
              leftIcon={<Lock className="w-3 h-3 text-[#00C9CE]" />}
            >
              {userDepositTier === 'standard' || userDepositTier === 'premium' ? 'Unlocked' : 'Deposit 500k'}
            </Button>
          </div>

          {/* Premium Tier */}
          <div className="p-3.5 rounded-xl bg-[#1E3063] text-white border border-[#1E3063] flex items-center justify-between gap-3 shadow-2xs">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-serif font-black text-white">Premium Tier</span>
                <span className="text-[10px] font-mono font-bold text-[#00C9CE] uppercase">Unlimited</span>
              </div>
              <div className="text-sm font-mono font-black text-[#00C9CE] mt-0.5">
                KES 1,000,000 <span className="text-[10px] text-slate-300 font-normal font-sans">hold</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => setDepositModalTier('premium')}
              className="px-3.5 py-2 bg-[#00C9CE] hover:bg-[#00b8bc] text-[#1E3063] text-[11px] font-mono font-black uppercase tracking-wider shrink-0"
              leftIcon={<Lock className="w-3 h-3 text-[#1E3063]" />}
            >
              {userDepositTier === 'premium' ? 'Unlocked' : 'Deposit 1M'}
            </Button>
          </div>
        </div>
      </div>

      {/* Live Active Lots Directory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E8E1D5] gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#1E3063] font-serif tracking-tight">
              Live Auction Lots
            </h2>
            <p className="text-xs text-[#6B7A99] font-medium">
              Verified luxury vehicles currently under the hammer. Bids updated live.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#2ECC71]/15 text-[#1E3063] text-xs font-bold uppercase tracking-wider border border-[#2ECC71]/30 flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
            Live Auction Engine Active
          </span>
        </div>

        {/* Standardized KAYAD Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search lot by make, model, VIN, or hub..."
          resultCount={filteredLots.length}
          badgeLabel="LIVE AUCTION DIRECTORY"
          filterOptions={[
            { id: 'all', label: 'All Lots' },
            { id: 'featured', label: 'Featured Only' },
            { id: 'ending_soon', label: 'Ending Soon' },
          ]}
          activeFilter={filterCategory}
          onFilterChange={setFilterCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredLots.map(lot => {
            const timer = formatTimer(lot.endsInSeconds);
            return (
              <div
                key={lot.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Image Box */}
                  <div className="relative h-60 rounded-2xl overflow-hidden border border-[#E2D8C7] group">
                    <img
                      src={lot.imageUrl}
                      alt={lot.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {lot.featured && (
                        <span className="px-3 py-1 rounded-full bg-[#1E3063] text-[#00C9CE] text-[10px] font-black uppercase tracking-wider shadow-md">
                          FEATURED LOT
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-[#2ECC71] text-[#1E3063] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3063] animate-pulse" />
                        AUCTION
                      </span>
                    </div>

                    {/* Countdown Overlay Box */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#1E3063]/90 text-white border border-white/20 backdrop-blur-md text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                      <Clock className="w-3.5 h-3.5 text-[#00C9CE]" />
                      <span>Ends in</span>
                      <span className="text-[#00C9CE] font-black">
                        {timer.hh} : {timer.mm} : {timer.ss}
                      </span>
                    </div>
                  </div>

                  {/* Brand & Title Info */}
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#00C9CE] block">
                      {lot.brand}
                    </span>
                    <h3 className="text-xl font-extrabold text-[#1E3063] font-serif">
                      {lot.title} {lot.year}
                    </h3>
                    <p className="text-xs text-[#6B7A99] font-medium mt-0.5">
                      VIN: {lot.vin} · {lot.location}
                    </p>
                  </div>

                  {/* Pricing Comparison Bar */}
                  <div className="p-4 rounded-2xl bg-[#F6F1E8] border border-[#E2D8C7] grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#6B7A99] uppercase tracking-wider block">
                        Starting Bid
                      </span>
                      <span className="text-sm font-extrabold text-[#1E3063] font-serif">
                        KES {lot.startingBid.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-l border-[#E2D8C7] pl-4">
                      <span className="text-[10px] font-bold text-[#00C9CE] uppercase tracking-wider block">
                        Current High Bid
                      </span>
                      <span className="text-lg font-black text-[#1E3063] font-serif block">
                        KES {lot.currentBid.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#2ECC71] font-extrabold">
                        {lot.bidsCount} bids placed · Live
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleOpenBidModal(lot)}
                    className="flex-1 bg-[#1E3063] hover:bg-[#0B1628] text-white font-extrabold text-xs py-3 uppercase tracking-wider shadow-sm"
                    leftIcon={<Gavel className="w-4 h-4 text-[#00C9CE]" />}
                  >
                    Place Bid
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigateTo('gallery')}
                    className="px-4 py-3 border-[#E2D8C7] text-[#1E3063] font-bold text-xs hover:bg-[#F6F1E8]"
                  >
                    View Lot
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auction Rules & Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#E8E1D5]">
          <ShieldCheck className="w-5 h-5 text-[#00C9CE]" />
          <h3 className="text-lg font-extrabold text-[#1E3063] font-serif">
            Auction Rules & Guidelines
          </h3>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-[#3D4F6F] font-medium">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F1E8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9CE] mt-1.5 shrink-0" />
            <span>Minimum bid increment is KES 50,000</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F1E8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9CE] mt-1.5 shrink-0" />
            <span>All bids are binding and legally enforceable</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F1E8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9CE] mt-1.5 shrink-0" />
            <span>Payment must be completed within 24 hours of winning</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F1E8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9CE] mt-1.5 shrink-0" />
            <span>Escrow holds your funds securely until vehicle transfer</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F1E8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9CE] mt-1.5 shrink-0" />
            <span>All auction vehicles have been pre-inspected (150-Point Audit)</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F1E8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C9CE] mt-1.5 shrink-0" />
            <span>Seller pays 2.5% commission; buyer pays 0% fee</span>
          </li>
        </ul>
      </div>

      {/* Bidding HUD Modal */}
      {activeBidLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg p-6 sm:p-8 bg-white rounded-3xl shadow-2xl border border-[#E2D8C7] space-y-6">
            <button
              onClick={() => setActiveBidLot(null)}
              className="absolute top-4 right-4 p-2 text-[#6B7A99] hover:text-[#1E3063] rounded-full hover:bg-[#F6F1E8]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#00C9CE] tracking-wider">
                LIVE BID HUD · LOT #{activeBidLot.id}
              </span>
              <h3 className="text-xl font-extrabold text-[#1E3063] font-serif">
                {activeBidLot.title} {activeBidLot.year}
              </h3>
              <p className="text-xs text-[#6B7A99] font-medium">
                Current High Bid: <strong className="text-[#1E3063]">KES {activeBidLot.currentBid.toLocaleString()}</strong>
              </p>
            </div>

            {bidSuccessMessage && (
              <div className="p-3 rounded-xl bg-[#2ECC71]/15 text-[#1E3063] border border-[#2ECC71]/40 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2ECC71]" />
                <span>{bidSuccessMessage}</span>
              </div>
            )}

            {bidErrorMessage && (
              <div className="p-3 rounded-xl bg-[#DC3545]/12 text-[#DC3545] border border-[#DC3545]/25 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#DC3545] shrink-0" />
                <span>{bidErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handlePlaceBidSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  Enter Your Bid Amount (KES)
                </label>
                <input
                  type="number"
                  required
                  value={bidAmountInput}
                  onChange={e => setBidAmountInput(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-base font-black text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                />
              </div>

              {/* Quick Increment Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBidAmountInput(prev => prev + 50000)}
                  className="flex-1 py-2 bg-[#F6F1E8] hover:bg-[#E2D8C7] text-[#1E3063] text-xs font-extrabold rounded-xl border border-[#E2D8C7]"
                >
                  + KES 50k
                </button>
                <button
                  type="button"
                  onClick={() => setBidAmountInput(prev => prev + 100000)}
                  className="flex-1 py-2 bg-[#F6F1E8] hover:bg-[#E2D8C7] text-[#1E3063] text-xs font-extrabold rounded-xl border border-[#E2D8C7]"
                >
                  + KES 100k
                </button>
                <button
                  type="button"
                  onClick={() => setBidAmountInput(prev => prev + 250000)}
                  className="flex-1 py-2 bg-[#F6F1E8] hover:bg-[#E2D8C7] text-[#1E3063] text-xs font-extrabold rounded-xl border border-[#E2D8C7]"
                >
                  + KES 250k
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#FCF9F4] border border-[#E2D8C7] text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-[#1E3063]">
                  Escrow Guarantee:
                </p>
                <p>
                  If you win this lot, your funds will be transferred safely through KAYAD M-Pesa/Bank Escrow vault upon inspection.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full bg-[#1E3063] hover:bg-[#0B1628] text-white font-black text-xs py-3.5 uppercase tracking-wider"
              >
                Confirm Binding Bid of KES {bidAmountInput.toLocaleString()}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Security Deposit Unlock Modal */}
      {depositModalTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg p-6 sm:p-8 bg-white rounded-3xl shadow-2xl border border-[#E2D8C7] space-y-6">
            <button
              onClick={() => setDepositModalTier(null)}
              className="absolute top-4 right-4 p-2 text-[#6B7A99] hover:text-[#1E3063] rounded-full hover:bg-[#F6F1E8]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#00C9CE] tracking-wider">
                TRUST GATE DEPOSIT UNLOCK
              </span>
              <h3 className="text-xl font-extrabold text-[#1E3063] font-serif">
                {depositModalTier === 'standard' ? 'Standard Tier (KES 500,000)' : 'Premium Tier (KES 1,000,000)'}
              </h3>
              <p className="text-xs text-[#6B7A99] font-medium">
                100% Refundable Security Deposit held safely in KAYAD Escrow bank account.
              </p>
            </div>

            {depositSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-[#2ECC71]/15 text-[#1E3063] border border-[#2ECC71]/40 text-xs font-bold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#2ECC71] mx-auto" />
                <p>{depositSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleProcessDeposit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-2">
                    Payment Gateway
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDepositPaymentMethod('mpesa')}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        depositPaymentMethod === 'mpesa'
                          ? 'border-[#2ECC71] bg-[#2ECC71]/15 text-[#1E3063]'
                          : 'border-[#E2D8C7] text-[#6B7A99]'
                      }`}
                    >
                      <Phone className="w-4 h-4 text-[#2ECC71]" />
                      M-Pesa Express
                    </button>

                    <button
                      type="button"
                      onClick={() => setDepositPaymentMethod('rtgs')}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                        depositPaymentMethod === 'rtgs'
                          ? 'border-[#00C9CE] bg-[#00C9CE]/15 text-[#1E3063]'
                          : 'border-[#E2D8C7] text-[#6B7A99]'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#00C9CE]" />
                      RTGS Bank Wire
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1">
                    {depositPaymentMethod === 'mpesa' ? 'M-Pesa Mobile Number' : 'Sender Bank Account'}
                  </label>
                  <input
                    type="text"
                    required
                    value={depositPhone}
                    onChange={e => setDepositPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-semibold text-[#1E3063]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isProcessingDeposit}
                  variant="primary"
                  className="w-full bg-[#1E3063] hover:bg-[#0B1628] text-white font-extrabold text-xs py-3.5 uppercase tracking-wider"
                >
                  {isProcessingDeposit ? 'Processing Escrow Hold...' : `Confirm Deposit of KES ${depositModalTier === 'standard' ? '500,000' : '1,000,000'}`}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
