import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AdsterraBanner } from '../ads/AdsterraBanner';

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
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <ScrollToTop />

      {/* Responsive Grid Layout Container:
          - Stacks vertically in a single column on mobile/tablet (grid-cols-1)
          - Side-aligns banners on wide displays (xl:grid-cols-[200px_minmax(0,1fr)_200px])
          - Prevents any overlap or breaking of main content flow */}
      <div className="w-full max-w-[1560px] mx-auto flex-grow px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-[180px_minmax(0,1fr)_180px] gap-6 xl:gap-8 items-start">
        
        {/* Left Ad Container: Side-aligned on wide screens */}
        <aside 
          aria-label="Sidebar advertisement left" 
          className="hidden xl:flex flex-col items-center justify-start sticky top-8 w-full shrink-0"
        >
          <div className="w-full flex justify-center">
            <AdsterraBanner type="160x600" />
          </div>
        </aside>

        {/* Main Content Flow */}
        <main className="w-full min-w-0 flex flex-col items-center justify-center my-auto">
          {children}
        </main>

        {/* Right Ad Container: Side-aligned on wide screens, cleanly stacked at the bottom on smaller viewports */}
        <aside 
          aria-label="Responsive advertisement right or footer" 
          className="w-full flex flex-col items-center justify-start xl:sticky xl:top-8 shrink-0"
        >
          {/* Side-aligned banner on desktop (xl+) */}
          <div className="hidden xl:flex flex-col items-center w-full">
            <AdsterraBanner type="160x300" />
          </div>

          {/* Stacked banner below content on mobile/tablet without breaking content flow */}
          <div className="flex xl:hidden flex-col items-center w-full mt-4 pt-4 border-t border-white/5">
            <div className="hidden sm:block">
              <AdsterraBanner type="468x60" />
            </div>
            <div className="block sm:hidden">
              <AdsterraBanner type="320x50" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


