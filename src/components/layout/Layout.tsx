import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { AudioGuidesDrawer } from '../guides/AudioGuidesDrawer';
import { RailwayDitherBackground } from '../ui/RailwayDitherBackground';
import { StickyBottomAd } from '../ads/StickyBottomAd';
import { initAdsterraClickTrigger } from '../../lib/adsterraClickTrigger';

interface LayoutProps {
  children: ReactNode;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export function Layout({ children }: LayoutProps) {
  const [guidesOpen, setGuidesOpen] = useState(false);

  // Initialize on-click Smartlink popunder trigger
  useEffect(() => {
    const cleanup = initAdsterraClickTrigger();
    return cleanup;
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-zinc-300 font-sans selection:bg-white selection:text-black overflow-x-hidden antialiased">
      {/* Full-Page Edge-to-Edge Railway-style Bayer Dither Canvas Animation */}
      <RailwayDitherBackground
        cell={7}
        baseDensity={0.22}
        interactive={true}
        className="z-0 opacity-80"
      />

      <ScrollToTop />

      {/* 3-Zone Top Navigation */}
      <TopBar onOpenGuides={() => setGuidesOpen(true)} />

      {/* Main Content Area with padding for bottom sticky ad */}
      <main className="relative z-10 w-full flex-grow flex flex-col pb-28 md:pb-32">
        {children}
      </main>

      {/* Secondary Footer */}
      <Footer onOpenGuides={() => setGuidesOpen(true)} />

      {/* Persistent Floating Sticky Bottom Banner */}
      <StickyBottomAd />

      {/* Slide-over Audio Engineering Knowledge Base */}
      <AudioGuidesDrawer
        isOpen={guidesOpen}
        onClose={() => setGuidesOpen(false)}
      />
    </div>
  );
}
