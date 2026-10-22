import { ArrowDown, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../lib/analytics';
import { useGitHubRelease } from '../../lib/useGitHubRelease';

interface HeroSectionProps {
  onSupportClick: () => void;
}

export function HeroSection({ onSupportClick }: HeroSectionProps) {
  const release = useGitHubRelease();

  return (
    <section className="relative w-full pt-10 pb-12 md:pt-16 md:pb-16 bg-transparent border-b border-white/10 overflow-hidden">
      
      {/* Subtle radial ambient vignette */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-radial from-transparent via-black/80 to-black pointer-events-none" 
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Dynamic GitHub Release Eyebrow Badge */}
        <a 
          href={release.releaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-no-ad="true"
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 hover:border-white/30 mb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300 transition-colors cursor-pointer group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SPATIALFLOW {release.version}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400 group-hover:text-white transition-colors">LATEST GITHUB RELEASE ↗</span>
        </a>

        {/* Primary Headline in Dot Matrix */}
        <h1 className="font-ndot text-3xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase max-w-3xl leading-[1.05] mb-3">
          SUPPORT SPATIALFLOW
        </h1>

        {/* Concise, Clear Subhead */}
        <p className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed mb-8 font-sans">
          Keep independent Android audio alive. 100% open-source, bit-perfect DSP, and zero in-app ads.
        </p>

        {/* Direct Action CTAs */}
        <div className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-3">
          <button
            data-no-ad="true"
            onClick={() => {
              trackEvent('hero_support_click', { source: 'hero_primary' });
              onSupportClick();
            }}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart size={14} className="fill-black" />
            <span>CHOOSE PAYMENT METHOD</span>
            <ArrowDown size={14} />
          </button>

          <Link
            data-no-ad="true"
            to="/reward"
            onClick={() => {
              trackEvent('hero_badge_click', { source: 'hero_badge' });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Award size={14} />
            <span>FREE SUPPORTER BADGE</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
