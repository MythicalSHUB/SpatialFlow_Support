import { useEffect } from 'react';
import { HeroSection } from '../components/support/HeroSection';
import { TransparencySection } from '../components/support/TransparencySection';
import { SupportOptions } from '../components/support/SupportOptions';
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
      {/* Top Leaderboard Ad Slot */}
      <div className="w-full pt-4 pb-2 px-4 flex flex-col items-center border-b border-white/10 bg-black/60 backdrop-blur-sm">
        <AdSlot variant="leaderboard" />
      </div>

      {/* Hero Section */}
      <HeroSection onSupportClick={scrollToSupport} />

      {/* Trust & Transparency Section (4 Pillars + Philosophy) */}
      <TransparencySection />

      {/* In-Content Native Ad Placement */}
      <div className="w-full py-6 px-4 flex justify-center border-t border-b border-white/10 bg-black/60 backdrop-blur-sm">
        <AdsterraNative />
      </div>

      {/* Multi-Tier Contribution & Support Options */}
      <SupportOptions />

      {/* Community, Discussion & GitHub Repository */}
      <CommunitySection />
    </div>
  );
}
