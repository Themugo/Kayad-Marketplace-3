import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  DollarSign,
  Shield,
  Zap,
  HelpCircle,
  User,
  Car,
  Building2,
  Check,
  AlertCircle,
  X
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Button } from '../ui/Button';
import { NavigationBar } from '../common/NavigationBar';

export const EscrowPage: React.FC = () => {
  const { escrowContracts, updateEscrowStep, navigateTo } = useMarketplace();

  // Active contract selection or default Land Cruiser 300
  const [selectedContractId, setSelectedContractId] = useState(escrowContracts[0]?.id || 'escrow_KYD_99812');
  const activeContract = escrowContracts.find(c => c.id === selectedContractId) || escrowContracts[0];

  // Confirmation modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmedSuccess, setIsConfirmedSuccess] = useState(false);

  // FAQ Accordion Toggle State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleConfirmReceipt = () => {
    if (activeContract) {
      updateEscrowStep(activeContract.id, 6); // Advance to final step 6 (Funds Disbursed)
      setIsConfirmedSuccess(true);
      setTimeout(() => {
        setIsConfirmModalOpen(false);
        setIsConfirmedSuccess(false);
      }, 2500);
    }
  };

  const faqs = [
    {
      q: 'How long are funds held in escrow?',
      a: 'Funds are held until the buyer confirms receipt of the vehicle, typically 24–48 hours after the agreed handover date.'
    },
    {
      q: 'What happens if there is a dispute?',
      a: 'Our dispute team reviews the case within 2 business days. Evidence such as inspection reports and communication logs is used to resolve the matter fairly.'
    },
    {
      q: 'Is there a fee for using Escrow Vault?',
      a: 'KAYAD Escrow is completely free for buyers. Sellers pay a 1% transaction fee, capped at KES 50,000.'
    },
    {
      q: 'Which payment methods are accepted?',
      a: 'M-Pesa, bank transfers (RTGS/EFT), and major debit cards are all supported.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FCF9F4] text-[#1E3063] font-sans">
      <NavigationBar currentTitle="M-Pesa Escrow Vault" />
      
      {/* 1. Top Hero Section */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#1E3063] text-white border border-white/10 shadow-xl relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C9CE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-extrabold uppercase tracking-wider border border-[#00C9CE]/30">
            <ShieldCheck className="w-4 h-4 text-[#00C9CE]" />
            <span>Zero Risk Transactions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
            Escrow Vault
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
            Your money never goes directly to the seller. It sits safely in our licensed escrow account until you confirm you have received exactly what you paid for.
          </p>
        </div>

        {/* Hero Stats Row */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-[#00C9CE] font-serif block">
              KES 2.4B+
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider mt-0.5 block">
              Total Protected
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-white font-serif block">
              4,800+
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider mt-0.5 block">
              Transactions
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-[#2ECC71] font-serif block">
              99.8%
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider mt-0.5 block">
              Success Rate
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl sm:text-3xl font-black text-[#00C9CE] font-serif block">
              18 hrs
            </span>
            <span className="text-xs text-slate-300 font-bold uppercase tracking-wider mt-0.5 block">
              Avg. Release Time
            </span>
          </div>
        </div>
      </div>

      {/* 2. Step-by-Step "How Escrow Vault Works" */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6">
        <div className="space-y-1 pb-4 border-b border-[#E8E1D5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3063]/10 text-[#1E3063] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#00C9CE]" />
            <span>Step-by-Step</span>
          </div>
          <h2 className="text-2xl font-black text-[#1E3063] font-serif tracking-tight">
            How Escrow Vault Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-[#F6F1E8]/70 border border-[#E2D8C7] space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E3063] text-[#00C9CE] font-black font-mono text-sm flex items-center justify-center">
                01
              </div>
              <h3 className="text-base font-extrabold text-[#1E3063] font-serif">
                Buyer Deposits Funds
              </h3>
              <p className="text-xs text-[#3D4F6F] leading-relaxed font-medium">
                The buyer deposits the agreed amount into the KAYAD Escrow Vault — a ring-fenced account held by a licensed custodian.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[#00C9CE]">
              <span>M-Pesa / RTGS Bank Deposit</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-[#F6F1E8]/70 border border-[#E2D8C7] space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E3063] text-[#00C9CE] font-black font-mono text-sm flex items-center justify-center">
                02
              </div>
              <h3 className="text-base font-extrabold text-[#1E3063] font-serif">
                Vehicle Handover
              </h3>
              <p className="text-xs text-[#3D4F6F] leading-relaxed font-medium">
                The seller transfers the vehicle to the buyer as agreed. Both parties sign the digital handover certificate.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[#00C9CE]">
              <span>Physical Inspection & VIN Verification</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-[#F6F1E8]/70 border border-[#E2D8C7] space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E3063] text-[#00C9CE] font-black font-mono text-sm flex items-center justify-center">
                03
              </div>
              <h3 className="text-base font-extrabold text-[#1E3063] font-serif">
                Buyer Confirms
              </h3>
              <p className="text-xs text-[#3D4F6F] leading-relaxed font-medium">
                The buyer inspects the vehicle and confirms it matches the listing. Confirmation triggers fund release.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[#00C9CE]">
              <span>48-Hour Inspection Window</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-[#F6F1E8]/70 border border-[#E2D8C7] space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E3063] text-[#2ECC71] font-black font-mono text-sm flex items-center justify-center">
                04
              </div>
              <h3 className="text-base font-extrabold text-[#1E3063] font-serif">
                Funds Released
              </h3>
              <p className="text-xs text-[#3D4F6F] leading-relaxed font-medium">
                Payment is instantly released to the seller's account. The entire cycle completes within 48 hours.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[#2ECC71]">
              <span>Instant Bank Disbursal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bank-Grade Security Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#1E3063] text-white border border-white/10 shadow-lg space-y-6">
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-[#00C9CE]" />
            <span>Bank-Grade Security</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
            Your Money Is Protected
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-3xl">
            KAYAD Escrow Vault is regulated by the Central Bank of Kenya and operates under a licensed money transfer framework. Your funds are held in a segregated trust account — completely separate from our operating capital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#00C9CE] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-white">256-bit SSL Encryption</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">Encrypted transactions end-to-end</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Building2 className="w-5 h-5 text-[#00C9CE] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-white">CBK-Regulated Custodian</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">Licensed trust bank account</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#00C9CE] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-white">2-Factor Authentication</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">Dual-approval on all releases</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#2ECC71] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-extrabold text-white">Instant Dispute Resolution</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">With full evidence tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. KAYAD Escrow Vault - Active Transaction Card Widget */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E1D5]">
          <div>
            <span className="text-[10px] font-black uppercase text-[#00C9CE] tracking-widest block">
              LIVE ESCROW CONTROLLER
            </span>
            <h2 className="text-2xl font-black text-[#1E3063] font-serif tracking-tight">
              KAYAD Escrow Vault · Active Transaction
            </h2>
            <p className="text-xs text-[#6B7A99] font-medium">
              Manage live active vehicle escrow agreements. Review milestones or confirm receipt to trigger payout.
            </p>
          </div>

          {/* Selector for active contracts if multiple exist */}
          {escrowContracts.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B7A99]">Select Deal:</span>
              <select
                value={selectedContractId}
                onChange={e => setSelectedContractId(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-[#E2D8C7] bg-[#F6F1E8] text-xs font-bold text-[#1E3063]"
              >
                {escrowContracts.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.vehicleTitle} ({c.id})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Active Deal Card */}
        {activeContract ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1628] text-white border border-white/10 shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#2ECC71]/20 text-[#2ECC71] text-xs font-black uppercase tracking-wider border border-[#2ECC71]/40 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
                  Protected
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  ID: {activeContract.id}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-300 font-bold uppercase block">Amount Held</span>
                <span className="text-2xl sm:text-3xl font-black text-[#00C9CE] font-serif">
                  KES {(activeContract.agreedPrice * (activeContract.agreedPrice < 1000000 ? 100 : 1)).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                  Vehicle
                </span>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#00C9CE]" />
                  <span className="text-base font-extrabold text-white font-serif">
                    {activeContract.vehicleTitle}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                  Buyer
                </span>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00C9CE]" />
                  <span className="text-sm font-bold text-white">
                    {activeContract.buyerName || 'J. Mwangi'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                  Seller
                </span>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00C9CE]" />
                  <span className="text-sm font-bold text-white">
                    {activeContract.sellerName || 'Premium Motors Ltd'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                  Status
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F0A500]" />
                  <span className="text-sm font-bold text-amber-300">
                    {activeContract.currentStep === 6 ? 'Funds Disbursed to Seller' : 'Awaiting Confirmation'}
                  </span>
                </div>
              </div>
            </div>

            {/* Milestones Stepper Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Milestone Progress ({activeContract.currentStep} of 6 Completed)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {activeContract.milestones.map(m => (
                  <div
                    key={m.step}
                    className={`p-2.5 rounded-xl border text-center space-y-1 ${
                      m.status === 'completed'
                        ? 'border-[#2ECC71]/50 bg-[#2ECC71]/15 text-white'
                        : m.status === 'current'
                        ? 'border-[#00C9CE] bg-[#00C9CE]/20 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block">STEP 0{m.step}</span>
                    <span className="text-[11px] font-extrabold truncate block">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-300 font-medium">
                Clicking confirm receipt verifies that you have received and inspected the vehicle. Funds will be released to {activeContract.sellerName}.
              </p>

              {activeContract.currentStep === 6 ? (
                <div className="px-6 py-3 rounded-2xl bg-[#2ECC71] text-[#0B1628] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#0B1628]" />
                  <span>Funds Released Successfully</span>
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="w-full sm:w-auto bg-[#2ECC71] hover:bg-[#25b862] text-[#0B1628] font-black text-xs py-3.5 px-8 uppercase tracking-wider shadow-lg shrink-0"
                  leftIcon={<CheckCircle2 className="w-4 h-4 text-[#0B1628]" />}
                >
                  Confirm Receipt
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-[#6B7A99]">
            No active escrow deals found. Initiate a purchase from certified inventory to lock funds in Escrow.
          </div>
        )}
      </div>

      {/* 5. Got Questions? Escrow FAQ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6">
        <div className="space-y-1 pb-4 border-b border-[#E8E1D5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3063]/10 text-[#1E3063] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#00C9CE]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl font-black text-[#1E3063] font-serif tracking-tight">
            Escrow FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E2D8C7] bg-[#F6F1E8]/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1E3063] hover:bg-[#F6F1E8]"
                >
                  <span className="font-serif">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#00C9CE] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6B7A99] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-[#3D4F6F] font-medium leading-relaxed border-t border-[#E8E1D5] bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm Receipt Modal Dialog */}
      {isConfirmModalOpen && activeContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md p-6 sm:p-8 bg-white rounded-3xl shadow-2xl border border-[#E2D8C7] space-y-6">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6B7A99] hover:text-[#1E3063] rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#2ECC71]/20 text-[#2ECC71] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-[#2ECC71]" />
              </div>

              <h3 className="text-xl font-extrabold text-[#1E3063] font-serif">
                Confirm Vehicle Handover
              </h3>

              <p className="text-xs text-[#6B7A99] font-medium">
                Are you sure you want to release <strong className="text-[#1E3063]">KES {(activeContract.agreedPrice * (activeContract.agreedPrice < 1000000 ? 100 : 1)).toLocaleString()}</strong> from KAYAD Escrow Vault to <strong className="text-[#1E3063]">{activeContract.sellerName}</strong>?
              </p>
            </div>

            {isConfirmedSuccess ? (
              <div className="p-4 rounded-2xl bg-[#2ECC71]/20 border border-[#2ECC71]/40 text-[#0B1628] text-xs font-bold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#2ECC71] mx-auto" />
                <p>Funds successfully disbursed to {activeContract.sellerName}! Transaction complete.</p>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <Button
                  onClick={handleConfirmReceipt}
                  variant="primary"
                  className="w-full bg-[#2ECC71] hover:bg-[#25b862] text-[#0B1628] font-black text-xs py-3.5 uppercase tracking-wider"
                >
                  Yes, Release Funds to Seller
                </Button>

                <Button
                  onClick={() => setIsConfirmModalOpen(false)}
                  variant="outline"
                  className="w-full border-[#E2D8C7] text-[#1E3063] font-bold text-xs"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
