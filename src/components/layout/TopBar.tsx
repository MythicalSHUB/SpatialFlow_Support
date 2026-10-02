import { Link } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';

interface TopBarProps {
  onOpenGuides?: () => void;
}

export function TopBar({ onOpenGuides }: TopBarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Nothing OS Dot-Matrix Brand Wordmark */}
        <Link 
          to="/" 
          className="flex items-center group cursor-pointer"
        >
          <span className="font-ndot text-lg sm:text-xl text-white tracking-widest group-hover:text-neutral-300 transition-colors uppercase">
            SPATIALFLOW
          </span>
        </Link>

        {/* Zone 2: Monospaced Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-400">
          <button 
            onClick={() => scrollToSection('mission')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Mission
          </button>
          <button 
            onClick={() => scrollToSection('transparency')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Costs & Allocation
          </button>
          <button 
            onClick={() => scrollToSection('support-options')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ways to Support
          </button>
          <a
            href="https://spatialflow.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('download_app_click', { source: 'topbar_nav' })}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Get App ↗
          </a>
          {onOpenGuides && (
            <button 
              onClick={() => {
                trackEvent('audio_guide_drawer_toggle');
                onOpenGuides();
              }}
              className="text-white hover:text-neutral-300 transition-colors cursor-pointer border border-white/20 px-3 py-1 rounded-full"
            >
              Audio Guides
            </button>
          )}
        </nav>

        {/* Zone 3: Nothing OS Pill Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              trackEvent('hero_support_click', { source: 'topbar' });
              scrollToSection('support-options');
            }}
            className="px-5 py-2 rounded-full bg-white hover:bg-neutral-200 text-black text-[11px] font-mono font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer whitespace-nowrap active:scale-95"
          >
            Support
          </button>
        </div>

      </div>
    </header>
  );
}
