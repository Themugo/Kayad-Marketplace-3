import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Gavel, 
  ShieldCheck, 
  Heart, 
  Plus, 
  Car, 
  User, 
  Building2, 
  DollarSign, 
  ArrowUpRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { VehicleCard } from '../gallery/VehicleCard';
import { SearchBar } from '../ui/SearchBar';

export const DashboardPage: React.FC = () => {
  const { vehicles, savedVehicleIds, bids, escrowContracts, navigateTo, addNewVehicle } = useMarketplace();
  const { user, role, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'bids' | 'escrow' | 'saved'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Listing Form state
  const [newTitle, setNewTitle] = useState('');
  const [newMake, setNewMake] = useState('Porsche');
  const [newPrice, setNewPrice] = useState('125000');
  const [newYear, setNewYear] = useState('2023');
  const [newVin, setNewVin] = useState('');

  const savedVehicles = vehicles.filter(v => savedVehicleIds.includes(v.id));
  const myBids = bids.filter(b => b.bidderId === user?.id || b.bidderName === user?.name);

  const filteredSavedVehicles = savedVehicles.filter(v => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return v.title?.toLowerCase().includes(q) || v.make?.toLowerCase().includes(q) || v.vin?.toLowerCase().includes(q);
  });

  const filteredBids = myBids.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return b.vehicleId?.toLowerCase().includes(q) || b.amount?.toString().includes(q);
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    addNewVehicle({
      title: newTitle || `${newYear} ${newMake} Performance Edition`,
      make: newMake,
      price: parseFloat(newPrice) || 100000,
      buyNowPrice: parseFloat(newPrice) || 100000,
      year: parseInt(newYear) || 2023,
      vin: newVin || 'VIN' + Math.floor(Math.random() * 90000000)
    });
    setIsAddModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#FCF9F4]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D5]">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="blue" icon={<LayoutDashboard className="w-3.5 h-3.5" />}>
              KAYAD Workspace
            </Badge>
            <span className="text-xs text-[#6B7A99] capitalize font-bold">Role: {role}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E3063] font-serif tracking-tight mt-1">
            Welcome back, {user?.name || 'Member'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {(role === 'dealer' || role === 'seller') && (
            <Button
              variant="primary"
              className="bg-[#1E3063] hover:bg-[#0B1628] text-white font-bold"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              List New Vehicle
            </Button>
          )}
        </div>
      </div>

      {/* Workspace Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#E2D8C7] shadow-xs">
          <span className="text-xs font-bold text-[#6B7A99] uppercase tracking-wider block">Active Bids</span>
          <span className="text-2xl font-black text-[#1E3063] font-serif">{myBids.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E2D8C7] shadow-xs">
          <span className="text-xs font-bold text-[#6B7A99] uppercase tracking-wider block">Saved Vehicles</span>
          <span className="text-2xl font-black text-[#DC3545] font-serif">{savedVehicles.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E2D8C7] shadow-xs">
          <span className="text-xs font-bold text-[#6B7A99] uppercase tracking-wider block">Escrow Deals</span>
          <span className="text-2xl font-black text-[#2ECC71] font-serif">{escrowContracts.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#E2D8C7] shadow-xs">
          <span className="text-xs font-bold text-[#6B7A99] uppercase tracking-wider block">Total Inventory</span>
          <span className="text-2xl font-black text-[#1E3063] font-serif">{vehicles.length}</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-[#E8E1D5] pb-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'bids', label: 'Bidding History' },
          { id: 'escrow', label: 'Escrow Contracts' },
          { id: 'saved', label: 'Saved Vehicles' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-[#1E3063] text-white font-bold shadow-xs'
                : 'text-[#6B7A99] hover:text-[#1E3063]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Standardized KAYAD Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search workspace records by vehicle title, make, VIN, or bid..."
        resultCount={
          activeTab === 'saved' || activeTab === 'overview'
            ? filteredSavedVehicles.length
            : activeTab === 'bids'
            ? filteredBids.length
            : escrowContracts.length
        }
        badgeLabel={`WORKSPACE · ${activeTab.toUpperCase()}`}
      />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <h3 className="text-base font-extrabold text-[#1E3063] font-serif">Your Saved Favorites ({filteredSavedVehicles.length})</h3>
          {filteredSavedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSavedVehicles.map(v => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E2D8C7] text-[#6B7A99] font-mono text-xs">
              No matching saved vehicles found in workspace.
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-6">
          <h3 className="text-base font-extrabold text-[#1E3063] font-serif">Saved Favorites ({filteredSavedVehicles.length})</h3>
          {filteredSavedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSavedVehicles.map(v => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E2D8C7] text-[#6B7A99] font-mono text-xs">
              No matching saved vehicles found.
            </div>
          )}
        </div>
      )}

      {activeTab === 'bids' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1E3063] font-serif">Active Bidding Activity ({filteredBids.length})</h3>
          {filteredBids.length > 0 ? (
            <div className="bg-white border border-[#E2D8C7] rounded-2xl divide-y divide-[#E8E1D5] shadow-xs">
              {filteredBids.map((bid, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs font-mono font-bold">
                  <div>
                    <span className="text-[#1E3063] font-extrabold block">Vehicle ID: {bid.vehicleId}</span>
                    <span className="text-[#6B7A99]">Placed by: {bid.bidderName}</span>
                  </div>
                  <span className="text-[#00C9CE] bg-[#1E3063] px-3 py-1 rounded-xl font-mono font-black">
                    KES {bid.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E2D8C7] text-[#6B7A99] font-mono text-xs">
              No active bid records matching query.
            </div>
          )}
        </div>
      )}

      {activeTab === 'escrow' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-[#1E3063] font-serif">Active Escrow Contracts ({escrowContracts.length})</h3>
          {escrowContracts.length > 0 ? (
            <div className="bg-white border border-[#E2D8C7] rounded-2xl divide-y divide-[#E8E1D5] shadow-xs">
              {escrowContracts.map(contract => (
                <div key={contract.id} className="p-4 flex items-center justify-between text-xs font-mono font-bold">
                  <div>
                    <span className="text-[#1E3063] font-extrabold block">Contract ID: {contract.id}</span>
                    <span className="text-[#6B7A99]">Status: {contract.status}</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    KES {contract.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E2D8C7] text-[#6B7A99] font-mono text-xs">
              No active escrow contracts found.
            </div>
          )}
        </div>
      )}

      {/* Add New Listing Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="List New Vehicle on KAYAD"
        subtitle="Your listing will undergo 150-point inspection verification & Escrow integration"
      >
        <form onSubmit={handleCreateListing} className="space-y-4">
          <Input label="Vehicle Title" placeholder="e.g. 2023 Porsche 911 Carrera S" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Make" value={newMake} onChange={e => setNewMake(e.target.value)} />
            <Input label="Year" value={newYear} onChange={e => setNewYear(e.target.value)} />
          </div>
          <Input label="Asking Price ($)" type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
          <Input label="VIN Number" placeholder="WP0AF2..." value={newVin} onChange={e => setNewVin(e.target.value)} />
          <Button type="submit" variant="primary" className="w-full">Publish Verified Listing</Button>
        </form>
      </Modal>
    </div>
  );
};
