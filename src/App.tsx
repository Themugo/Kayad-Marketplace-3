import React from 'react';
import { ThemeProvider as LegacyThemeProvider } from './context/ThemeContext';
import { ThemeProvider as DesignThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/home/Hero';
import { FeaturedVehicles } from './components/home/FeaturedVehicles';
import { LiveAuctionsSection } from './components/home/LiveAuctionsSection';
import { EscrowTrustBanner } from './components/home/EscrowTrustBanner';
import { SellCarBanner } from './components/home/SellCarBanner';

import { GalleryPage } from './components/gallery/GalleryPage';
import { VehicleDetailPage } from './components/detail/VehicleDetailPage';
import { AuctionsPage } from './components/auctions/AuctionsPage';
import { EscrowPage } from './components/escrow/EscrowPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { DealerProfilePage } from './components/dealer/DealerProfilePage';
import { AdminPage } from './components/admin/AdminPage';
import { PreInspectionPage } from './components/inspection/PreInspectionPage';
import { SupportPage } from './components/support/SupportPage';
import { SellPage } from './components/sell/SellPage';

import { ChatDrawer } from './components/chat/ChatDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { ArchitectureReportModal } from './components/reports/ArchitectureReportModal';

const AppContent: React.FC = () => {
  const { activePage, isReportModalOpen, closeReportModal, navigateTo } = useMarketplace();

  return (
    <div className="min-h-screen bg-[#FCF9F4] text-[#1E3063] font-sans flex flex-col justify-between antialiased">
      <div>
        <Navbar />

        <main>
          {activePage === 'home' && (
            <>
              <Hero />
              <FeaturedVehicles />
              <LiveAuctionsSection />
              <EscrowTrustBanner />
              <SellCarBanner />
            </>
          )}

          {activePage === 'gallery' && <GalleryPage />}
          {activePage === 'vehicle_detail' && <VehicleDetailPage />}
          {activePage === 'auctions' && <AuctionsPage />}
          {activePage === 'escrow' && <EscrowPage />}
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'dealer_profile' && <DealerProfilePage />}
          {activePage === 'admin' && <AdminPage />}
          {activePage === 'support' && <SupportPage />}

          {/* New Page Routes */}
          {activePage === 'ghost_check' && <PreInspectionPage />}
          {activePage === 'sell' && <SellPage />}

          {activePage === 'how_it_works' && <EscrowPage />}
          {activePage === 'about' && <SupportPage />}
        </main>
      </div>

      <Footer />

      {/* Overlays & Modals */}
      <ChatDrawer />
      <AuthModal />
      <ArchitectureReportModal isOpen={isReportModalOpen} onClose={closeReportModal} />
    </div>
  );
};

export default function App() {
  return (
    <DesignThemeProvider>
      <LegacyThemeProvider>
        <AuthProvider>
          <MarketplaceProvider>
            <AppContent />
          </MarketplaceProvider>
        </AuthProvider>
      </LegacyThemeProvider>
    </DesignThemeProvider>
  );
}

