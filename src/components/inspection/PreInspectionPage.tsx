import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Search, 
  Calendar, 
  Phone, 
  User, 
  Car, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Gauge, 
  Fuel, 
  AlertCircle, 
  X, 
  Check, 
  ChevronRight,
  Cpu,
  Shield,
  Activity
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Button } from '../ui/Button';
import { NavigationBar } from '../common/NavigationBar';

interface VehicleCardItem {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: string;
  fuel: string;
  city: string;
  category: string;
  imageUrl: string;
  badges: string[];
}

const INSPECTED_VEHICLES: VehicleCardItem[] = [
  {
    id: 'veh_3',
    title: 'Land Cruiser 300',
    brand: 'TOYOTA',
    model: 'Land Cruiser 300',
    price: 18500000,
    year: 2022,
    mileage: '8k km',
    fuel: 'Diesel',
    city: 'Nairobi',
    category: 'SUV',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    badges: ['ESCROW', 'AUCTION', 'SUV']
  },
  {
    id: 'veh_rr_sport',
    title: 'Range Rover Sport',
    brand: 'LAND ROVER',
    model: 'Range Rover Sport',
    price: 15000000,
    year: 2020,
    mileage: '35k km',
    fuel: 'Petrol',
    city: 'Mombasa',
    category: 'SUV',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    badges: ['ESCROW', 'SUV']
  },
  {
    id: 'veh_1',
    title: 'Cayenne S',
    brand: 'PORSCHE',
    model: 'Cayenne S',
    price: 13200000,
    year: 2020,
    mileage: '48k km',
    fuel: 'Petrol',
    city: 'Nairobi',
    category: 'SUV',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
    badges: ['ESCROW', 'AUCTION', 'SUV']
  },
  {
    id: 'veh_hilux',
    title: 'Hilux Double Cabin',
    brand: 'TOYOTA',
    model: 'Hilux Double Cabin',
    price: 4200000,
    year: 2021,
    mileage: '40k km',
    fuel: 'Diesel',
    city: 'Kisumu',
    category: 'Pickup',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    badges: ['ESCROW', 'Pickup']
  }
];

interface BreakdownCategory {
  id: string;
  name: string;
  ptsCount: number;
  checks: string[];
  moreChecksCount: number;
}

const BREAKDOWN_CATEGORIES: BreakdownCategory[] = [
  {
    id: 'engine',
    name: 'Engine & Drivetrain',
    ptsCount: 38,
    checks: [
      'Engine compression test',
      'Oil leaks & pressure',
      'Transmission condition',
      'Driveshaft & CV joints',
      'Exhaust system'
    ],
    moreChecksCount: 33
  },
  {
    id: 'exterior',
    name: 'Exterior & Body',
    ptsCount: 32,
    checks: [
      'Frame alignment & structural integrity',
      'Paint depth & panel consistency',
      'Rust & corrosion audit',
      'Glass, mirrors & lighting',
      'Wheel & tire tread depth'
    ],
    moreChecksCount: 27
  },
  {
    id: 'electrical',
    name: 'Electrical Systems',
    ptsCount: 28,
    checks: [
      'ECU diagnostic fault code scan',
      'Battery health & alternator output',
      'Infotainment & navigation',
      'Sensors, cameras & ADAS',
      'Wiring harness & fuses'
    ],
    moreChecksCount: 23
  },
  {
    id: 'interior',
    name: 'Interior & Safety',
    ptsCount: 22,
    checks: [
      'Airbag systems & seatbelts',
      'HVAC heating & AC performance',
      'Upholstery & dashboard condition',
      'Power windows & door locks',
      'Instrument cluster operational audit'
    ],
    moreChecksCount: 17
  },
  {
    id: 'documentation',
    name: 'Documentation',
    ptsCount: 18,
    checks: [
      'KRA logbook authenticity & VIN match',
      'NTSA registration audit',
      'Insurance history & claim records',
      'Maintenance & service history',
      'Title lien & debt clearance'
    ],
    moreChecksCount: 13
  },
  {
    id: 'roadtest',
    name: 'Road Test',
    ptsCount: 12,
    checks: [
      'Acceleration & shift smoothness',
      'Braking distance & ABS response',
      'Steering alignment & noise',
      'Suspension response over bumps',
      'Highway stability & cruise control'
    ],
    moreChecksCount: 7
  }
];

export const PreInspectionPage: React.FC = () => {
  const { navigateTo, selectedVehicle } = useMarketplace();

  // Active Breakdown Category
  const [activeCategory, setActiveCategory] = useState<BreakdownCategory>(BREAKDOWN_CATEGORIES[0]);

  // Inspection Tier state
  const [selectedTier, setSelectedTier] = useState<'standard' | 'certified' | 'executive'>('certified');

  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: 'John Mwangi',
    phone: '+254 700 000 000',
    makeModel: selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.title} (VIN: ${selectedVehicle.vin})` : 'Toyota Land Cruiser 300',
    date: '2026-08-01',
    timeSlot: '10:00 AM',
    notes: 'Please check transmission fluid, frame alignment and OBD fault codes.'
  });

  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccessMsg(`Pre-Purchase Inspection booked for ${formData.makeModel}! M-Pesa prompt sent to ${formData.phone}. Our mechanics will inspect the car on ${formData.date} at ${formData.timeSlot}.`);
      setTimeout(() => setBookingSuccessMsg(''), 5000);
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FCF9F4] text-[#1E3063] font-sans">
      <NavigationBar currentTitle={selectedVehicle ? `Inspection: ${selectedVehicle.title}` : "Pre-Purchase Inspection"} />
      
      {/* 1. Header / Hero Section */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#1E3063] text-white border border-white/10 shadow-xl relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C9CE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-extrabold uppercase tracking-wider border border-[#00C9CE]/30">
            <Wrench className="w-4 h-4 text-[#00C9CE]" />
            <span>CERTIFIED MECHANICS · 150 POINTS · FULL REPORT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
            Pre-Inspection
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
            Every vehicle is checked by certified mechanics across 150 points before you commit. Know exactly what you're buying — no surprises after the sale.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              onClick={() => scrollToSection('inspected_cars')}
              className="w-full sm:w-auto bg-[#00C9CE] hover:bg-[#00b8bc] text-[#1E3063] font-black text-xs py-3.5 px-7 uppercase tracking-wider shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#1E3063]" />}
            >
              View Inspected Cars
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollToSection('book_inspection')}
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 font-bold text-xs py-3.5 px-7"
            >
              Book an Inspection
            </Button>
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00C9CE]/20 flex items-center justify-center text-[#00C9CE] shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white font-serif block">150 Audit Points</span>
              <span className="text-[11px] text-slate-300 font-medium block">Complete physical & OBD check</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2ECC71]/20 flex items-center justify-center text-[#2ECC71] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white font-serif block">Certified Mechanics</span>
              <span className="text-[11px] text-slate-300 font-medium block">Master engineers with diagnostic gear</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00C9CE]/20 flex items-center justify-center text-[#00C9CE] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white font-serif block">24-Hour Turnaround</span>
              <span className="text-[11px] text-slate-300 font-medium block">Digital report delivered direct</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 150-Point Inspection Breakdown Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6">
        <div className="space-y-1 pb-4 border-b border-[#E8E1D5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3063]/10 text-[#1E3063] text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#00C9CE]" />
            <span>Comprehensive Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E3063] font-serif tracking-tight">
            150-Point Inspection Breakdown
          </h2>
          <p className="text-xs text-[#6B7A99] font-medium">
            Select a component module to review detailed diagnostic checklist criteria.
          </p>
        </div>

        {/* Category Tabs & Interactive Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Category Pills */}
          <div className="lg:col-span-5 space-y-2.5">
            {BREAKDOWN_CATEGORIES.map(cat => {
              const isSelected = activeCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-[#1E3063] text-white border-[#1E3063] shadow-md'
                      : 'bg-[#F6F1E8]/70 hover:bg-[#F6F1E8] text-[#1E3063] border-[#E2D8C7]'
                  }`}
                >
                  <span className="font-extrabold text-sm font-serif">{cat.name}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-black ${
                      isSelected
                        ? 'bg-[#00C9CE] text-[#1E3063]'
                        : 'bg-white border border-[#E2D8C7] text-[#1E3063]'
                    }`}
                  >
                    {cat.ptsCount} pts
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Checklist Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#121D33] text-white border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono font-extrabold uppercase text-[#00C9CE] tracking-widest block">
                  INSPECTION MODULE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                  {activeCategory.name}
                </h3>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-mono font-bold border border-[#00C9CE]/40">
                {activeCategory.ptsCount} inspection points
              </span>
            </div>

            {/* Checklist Items */}
            <ul className="space-y-3">
              {activeCategory.checks.map((checkItem, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-5 h-5 rounded-full bg-[#2ECC71]/20 text-[#2ECC71] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{checkItem}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-xl bg-[#00C9CE]/10 border border-[#00C9CE]/20 text-xs text-[#00C9CE] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00C9CE] shrink-0" />
              <span>+{activeCategory.moreChecksCount} more checks included in full 150-point report…</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Inspected & Certified Vehicles Section */}
      <div id="inspected_cars" className="space-y-6 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E8E1D5]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ECC71]/15 text-[#1E3063] text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2ECC71]" />
              <span>Ready to Buy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3063] font-serif tracking-tight">
              Inspected & Certified Vehicles
            </h2>
          </div>

          <Button
            variant="outline"
            onClick={() => navigateTo('gallery')}
            className="border-[#E2D8C7] text-[#1E3063] font-bold text-xs hover:bg-[#F6F1E8] shrink-0"
          >
            Browse All Certified Inventory
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSPECTED_VEHICLES.map(car => (
            <div
              key={car.id}
              className="p-4 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Vehicle Image with Badges */}
                <div className="relative h-48 rounded-2xl overflow-hidden border border-[#E2D8C7]">
                  <img
                    src={car.imageUrl}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {car.badges.map((b, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                          b === 'ESCROW'
                            ? 'bg-[#1E3063] text-[#00C9CE]'
                            : b === 'AUCTION'
                            ? 'bg-[#2ECC71] text-[#1E3063]'
                            : 'bg-white/90 text-[#1E3063]'
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#00C9CE] block">
                    {car.brand}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#1E3063] font-serif truncate">
                    {car.title}
                  </h3>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-2xl bg-[#F6F1E8] border border-[#E2D8C7]">
                  <div>
                    <span className="text-[10px] text-[#6B7A99] font-bold block uppercase">Price</span>
                    <span className="font-extrabold text-[#1E3063]">KES {(car.price / 1000000).toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7A99] font-bold block uppercase">Year</span>
                    <span className="font-extrabold text-[#1E3063]">{car.year}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7A99] font-bold block uppercase">Mileage</span>
                    <span className="font-semibold text-[#3D4F6F]">{car.mileage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6B7A99] font-bold block uppercase">Fuel / City</span>
                    <span className="font-semibold text-[#3D4F6F]">{car.fuel} · {car.city}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => navigateTo('gallery')}
                className="w-full bg-[#1E3063] hover:bg-[#0B1628] text-white font-bold text-xs py-2.5 uppercase tracking-wider"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Own a Car to Sell? Book a Pre-Inspection Form */}
      <div id="book_inspection" className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6 scroll-mt-20">
        <div className="space-y-1 pb-4 border-b border-[#E8E1D5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3063]/10 text-[#1E3063] text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5 text-[#00C9CE]" />
            <span>Own a Car to Sell?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E3063] font-serif tracking-tight">
            Book a Pre-Inspection
          </h2>
          <p className="text-xs sm:text-sm text-[#3D4F6F] font-medium">
            Get your vehicle certified by our mechanics. Certified cars sell 3x faster on KAYAD.
          </p>
        </div>

        {bookingSuccessMsg ? (
          <div className="p-8 rounded-2xl bg-[#2ECC71]/20 text-[#1E3063] border border-[#2ECC71]/40 text-sm font-bold text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#2ECC71] mx-auto" />
            <h3 className="text-xl font-extrabold font-serif text-[#1E3063]">Booking Confirmed!</h3>
            <p className="max-w-xl mx-auto">{bookingSuccessMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Inspection Tier Selection Cards */}
            <div>
              <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-2.5">
                Select Inspection Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTier('standard')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedTier === 'standard'
                      ? 'bg-[#1E3063] text-white border-[#1E3063] shadow-md'
                      : 'bg-[#F6F1E8]/70 hover:bg-[#F6F1E8] text-[#1E3063] border-[#E2D8C7]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-sm font-serif">Standard 100-Pt</span>
                    <span className={`text-xs font-mono font-black ${selectedTier === 'standard' ? 'text-[#00C9CE]' : 'text-[#1E3063]'}`}>KSh 4,500</span>
                  </div>
                  <p className={`text-[11px] leading-tight ${selectedTier === 'standard' ? 'text-slate-300' : 'text-slate-600'}`}>
                    100 physical points, paint gauge & tires check.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('certified')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    selectedTier === 'certified'
                      ? 'bg-[#1E3063] text-white border-[#1E3063] shadow-md ring-2 ring-[#00C9CE]'
                      : 'bg-[#F6F1E8]/70 hover:bg-[#F6F1E8] text-[#1E3063] border-[#E2D8C7]'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 bg-[#00C9CE] text-[#1E3063] text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">Most Popular</span>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-sm font-serif">Certified 150-Pt</span>
                    <span className={`text-xs font-mono font-black ${selectedTier === 'certified' ? 'text-[#00C9CE]' : 'text-[#1E3063]'}`}>KSh 7,500</span>
                  </div>
                  <p className={`text-[11px] leading-tight ${selectedTier === 'certified' ? 'text-slate-300' : 'text-slate-600'}`}>
                    150 points + ECU fault scan & KRA logbook audit.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('executive')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedTier === 'executive'
                      ? 'bg-[#1E3063] text-white border-[#1E3063] shadow-md'
                      : 'bg-[#F6F1E8]/70 hover:bg-[#F6F1E8] text-[#1E3063] border-[#E2D8C7]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-sm font-serif">Executive 200-Pt</span>
                    <span className={`text-xs font-mono font-black ${selectedTier === 'executive' ? 'text-[#00C9CE]' : 'text-[#1E3063]'}`}>KSh 12,500</span>
                  </div>
                  <p className={`text-[11px] leading-tight ${selectedTier === 'executive' ? 'text-slate-300' : 'text-slate-600'}`}>
                    200 points + chassis dyno, frame alignment & legal check.
                  </p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6B7A99] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Mwangi"
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  M-Pesa Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#6B7A99] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  Vehicle Details / VIN
                </label>
                <div className="relative">
                  <Car className="w-4 h-4 text-[#6B7A99] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.makeModel}
                    onChange={e => setFormData({ ...formData, makeModel: e.target.value })}
                    placeholder="e.g. Toyota Land Cruiser 300"
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  Inspection Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#6B7A99] absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                Specific Concerns or Notes for Engineer
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any specific concerns, engine noise, suspension or history to check..."
                className="w-full px-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-semibold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E8E1D5]">
              <div className="text-xs text-[#6B7A99] font-semibold">
                Selected Tier Fee: <strong className="text-[#1E3063] text-sm">
                  {selectedTier === 'standard' ? 'KES 4,500' : selectedTier === 'certified' ? 'KES 7,500' : 'KES 12,500'}
                </strong> · M-Pesa Express Payment
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full sm:w-auto bg-[#1E3063] hover:bg-[#0B1628] text-white font-extrabold text-xs py-3.5 px-8 uppercase tracking-wider shadow-md cursor-pointer"
              >
                {isSubmitting ? 'Sending M-Pesa STK Push...' : 'Confirm & Pay via M-Pesa'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
