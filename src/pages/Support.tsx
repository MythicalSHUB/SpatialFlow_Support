import { useEffect } from 'react';
import { HeroSection } from '../components/support/HeroSection';
import { SupportOptions } from '../components/support/SupportOptions';
import { TransparencySection } from '../components/support/TransparencySection';
import { CommunitySection } from '../components/support/CommunitySection';
import { AdSlot } from '../components/ads/AdSlot';
import { AdsterraNative } from '../components/ads/AdsterraNative';
import { trackEvent } from '../lib/analytics';

export function Support() {
  useEffect(() => {
    trackEvent('reward_page_view', { page: 'support_landing' });
  }, []);

  const scrollToSupport = () => {
    const el = document.getElementById('support-options');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col bg-transparent">
      {/* 1. Top Leaderboard Banner */}
      <div className="w-full pt-3 pb-1 px-4 flex flex-col items-center border-b border-white/10 bg-black/60 backdrop-blur-md">
        <AdSlot variant="leaderboard" />
      </div>

      {/* Hero Header */}
      <HeroSection onSupportClick={scrollToSupport} />

      {/* 2. Mid-Page In-Feed Ad Unit */}
      <div className="w-full py-4 px-4 flex flex-col items-center border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <AdSlot variant="rectangle" />
      </div>

      {/* Core Support & Payment Hub (PayPal, UPI, Ko-fi, GitHub, Free Badge) */}
      <SupportOptions />

      {/* 3. High-CTR Native Sponsored Feed Unit */}
      <div className="w-full py-4 px-4 flex justify-center border-t border-b border-white/10 bg-black/50 backdrop-blur-md">
        <AdsterraNative />
      </div>

      {/* Compact Trust & Impact Bar */}
      <TransparencySection />

      {/* 4. Pre-Community High-Visibility Leaderboard Ad */}
      <div className="w-full py-4 px-4 flex flex-col items-center border-t border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <AdSlot variant="leaderboard" />
      </div>

      {/* Community & Ecosystem Links */}
      <CommunitySection />
    </div>
  );
}
