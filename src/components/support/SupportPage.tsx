import React, { useState } from 'react';
import { 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Button } from '../ui/Button';

export const SupportPage: React.FC = () => {
  const { openChat } = useMarketplace();

  // FAQ Toggle State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccessMsg, setFormSuccessMsg] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccessMsg('Thank you for contacting KAYAD Support! Our team has received your message and will respond within 4 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSuccessMsg(''), 5000);
    }, 1000);
  };

  const faqs = [
    {
      q: 'How do I buy a car on KAYAD?',
      a: 'Browse our certified inventory or active auctions, select your vehicle, and initiate a purchase using KAYAD Escrow Vault. Deposit your funds safely into our CBK-regulated escrow account, inspect the car in person, and confirm receipt to complete the deal.'
    },
    {
      q: 'How does the Escrow Vault protect me?',
      a: 'Your money never goes directly to the seller. It sits in a ring-fenced trust account held by a licensed custodian. Funds are only released to the seller once you have received and physically verified the car during your 48-hour inspection window.'
    },
    {
      q: 'Can I inspect a vehicle before buying?',
      a: 'Yes! Every vehicle listed on KAYAD includes a 150-Point Master Mechanic Inspection Report. Furthermore, you have a 48-hour physical inspection window after handover before releasing escrow funds.'
    },
    {
      q: 'How do I list a car for sale?',
      a: 'Click "Sell Your Car" in the top navigation, enter your vehicle details, and schedule a 150-point Pre-Inspection. Once certified by our mechanics, your listing goes live to thousands of verified buyers with built-in Escrow protection.'
    },
    {
      q: 'What happens if I win an auction and change my mind?',
      a: 'Auction bids on KAYAD are legally binding commitments. However, if the vehicle fails physical handover inspection or differs materially from the 150-point inspection report, you are protected by escrow and can decline handover for a 100% refund.'
    },
    {
      q: 'How long does the buying process take?',
      a: 'Once your funds are deposited into Escrow Vault, vehicle handover typically completes within 24–48 hours, including digital title sign-off and key delivery.'
    },
    {
      q: 'Is KAYAD available outside Nairobi?',
      a: 'Yes! KAYAD operates across all major hubs in Kenya, including Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. We also coordinate nationwide insured vehicle transport.'
    },
    {
      q: 'What fees does KAYAD charge?',
      a: 'KAYAD Escrow is completely free for buyers! Sellers pay a small 1% transaction fee upon successful release of funds, capped at KES 50,000.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-[#FCF9F4] text-[#1E3063] font-sans">
      
      {/* 1. Header Hero */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#1E3063] text-white border border-white/10 shadow-xl relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-[#00C9CE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-extrabold uppercase tracking-wider border border-[#00C9CE]/30">
            <HelpCircle className="w-4 h-4 text-[#00C9CE]" />
            <span>We're Here to Help</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
            Support Centre
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto">
            Have a question about buying, selling, escrow, or auctions? Our team is available 7 days a week.
          </p>
        </div>
      </div>

      {/* 2. Contact Options Row (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Call Us */}
        <div className="p-6 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1E3063] text-[#00C9CE] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#1E3063] font-serif">
              Call Us
            </h3>
            <p className="text-xl font-black font-mono text-[#1E3063]">
              +254 700 000 000
            </p>
            <p className="text-xs text-[#6B7A99] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00C9CE]" />
              Mon–Sun, 8am – 8pm
            </p>
          </div>

          <a
            href="tel:+254700000000"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F6F1E8] hover:bg-[#E2D8C7] text-[#1E3063] font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Call Now</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </a>
        </div>

        {/* Live Chat */}
        <div className="p-6 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1E3063] text-[#2ECC71] flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#1E3063] font-serif">
              Live Chat
            </h3>
            <p className="text-sm font-bold text-[#1E3063]">
              Available on website
            </p>
            <p className="text-xs text-[#6B7A99] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
              Typical response: 2 min
            </p>
          </div>

          <button
            onClick={() => openChat()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1E3063] hover:bg-[#0B1628] text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Start Chat</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </button>
        </div>

        {/* Email Us */}
        <div className="p-6 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1E3063] text-[#00C9CE] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#1E3063] font-serif">
              Email Us
            </h3>
            <p className="text-base font-bold font-mono text-[#1E3063]">
              hello@kayad.co.ke
            </p>
            <p className="text-xs text-[#6B7A99] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00C9CE]" />
              Response within 4 hours
            </p>
          </div>

          <a
            href="mailto:hello@kayad.co.ke"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F6F1E8] hover:bg-[#E2D8C7] text-[#1E3063] font-extrabold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Send Email</span>
            <ArrowRight className="w-4 h-4 text-[#00C9CE]" />
          </a>
        </div>
      </div>

      {/* 3. Common Questions / Frequently Asked Questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6">
        <div className="space-y-1 pb-4 border-b border-[#E8E1D5]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3063]/10 text-[#1E3063] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#00C9CE]" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl font-black text-[#1E3063] font-serif tracking-tight">
            Frequently Asked Questions
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

      {/* 4. Direct Message / Send Us a Message Form & Office Location Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Direct Message Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#E2D8C7] shadow-sm space-y-6">
          <div className="space-y-1 pb-4 border-b border-[#E8E1D5]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3063]/10 text-[#1E3063] text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-[#00C9CE]" />
              <span>Direct Message</span>
            </div>
            <h2 className="text-2xl font-black text-[#1E3063] font-serif tracking-tight">
              Send Us a Message
            </h2>
          </div>

          {formSuccessMsg ? (
            <div className="p-6 rounded-2xl bg-[#2ECC71]/20 text-[#1E3063] border border-[#2ECC71]/40 text-sm font-bold text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#2ECC71] mx-auto" />
              <p>{formSuccessMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-bold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                >
                  <option value="" disabled>Select a topic…</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Escrow Vault Support">Escrow Vault Support</option>
                  <option value="Pre-Inspection">Pre-Inspection Request</option>
                  <option value="Auction Bidding">Auction Bidding</option>
                  <option value="Selling a Car">Selling a Car</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E3063] uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question or issue…"
                  className="w-full px-4 py-3 bg-[#F6F1E8] border border-[#E2D8C7] rounded-xl text-xs font-semibold text-[#1E3063] focus:outline-none focus:ring-2 focus:ring-[#00C9CE]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full sm:w-auto bg-[#1E3063] hover:bg-[#0B1628] text-white font-black text-xs py-3.5 px-8 uppercase tracking-wider shadow-md"
                leftIcon={<Send className="w-4 h-4 text-[#00C9CE]" />}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>

        {/* Visit Our Office Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#121D33] text-white border border-white/10 shadow-xl space-y-6">
          <div className="space-y-1 pb-4 border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C9CE]/20 text-[#00C9CE] text-xs font-extrabold uppercase tracking-wider border border-[#00C9CE]/30">
              <Building2 className="w-4 h-4 text-[#00C9CE]" />
              <span>Headquarters</span>
            </div>
            <h2 className="text-2xl font-black font-serif text-white">
              Visit Our Office
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00C9CE] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-slate-300 uppercase block">Address</span>
                <p className="text-sm font-bold text-white leading-relaxed">
                  Westgate Mall, Westlands, Nairobi — Ground Floor, Suite 12
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#2ECC71] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-slate-300 uppercase block">Hours</span>
                <p className="text-sm font-bold text-white">
                  Open Mon–Sat, 9am–5pm
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Westgate+Mall+Nairobi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl bg-[#00C9CE] hover:bg-[#00b8bc] text-[#121D33] font-black text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            <span>Get Directions</span>
            <ArrowRight className="w-4 h-4 text-[#121D33]" />
          </a>
        </div>
      </div>

    </div>
  );
};
