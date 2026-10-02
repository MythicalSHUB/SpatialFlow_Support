import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { AudioGuidesDrawer } from '../guides/AudioGuidesDrawer';
import { RailwayDitherBackground } from '../ui/RailwayDitherBackground';

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

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-zinc-300 font-sans selection:bg-white selection:text-black overflow-x-hidden antialiased">
      {/* Full-Page Edge-to-Edge Railway-style Bayer Dither Canvas Animation */}
      <RailwayDitherBackground
        cell={6}
        baseDensity={0.24}
        interactive={true}
        className="z-0 opacity-80"
      />

      <ScrollToTop />

      {/* 3-Zone Top Navigation */}
      <TopBar onOpenGuides={() => setGuidesOpen(true)} />

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex-grow flex flex-col">
        {children}
      </main>

      {/* Secondary Quiet Footer */}
      <Footer onOpenGuides={() => setGuidesOpen(true)} />

      {/* Slide-over Audio Engineering Knowledge Base */}
      <AudioGuidesDrawer
        isOpen={guidesOpen}
        onClose={() => setGuidesOpen(false)}
      />
    </div>
  );
}
