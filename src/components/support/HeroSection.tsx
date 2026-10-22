import { Music2, ShieldCheck, Cpu, ArrowUpRight, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { trackEvent } from '../../lib/analytics';
import { triggerDirectSmartlink } from '../../lib/adsterraClickTrigger';

interface HeroSectionProps {
  onSupportClick: () => void;
}

export function HeroSection({ onSupportClick }: HeroSectionProps) {
  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 bg-transparent border-b border-white/10 overflow-hidden">
      
      {/* Subtle radial ambient vignette */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-radial from-transparent via-black/80 to-black pointer-events-none" 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Clean Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 mb-5 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SPATIALFLOW {SPATIALFLOW_CONFIG.version}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">OPEN AUDIO</span>
        </div>

        {/* Primary Headline in Dot Matrix */}
        <h1 className="font-ndot text-3xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase max-w-4xl leading-[1.05] mb-4">
          LOSSLESS AUDIO. ZERO IN-APP ADS.
        </h1>

        {/* Concise, Clear Subhead (Less Typo) */}
        <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed mb-8 font-sans">
          Independent, high-fidelity Android player with bit-perfect DSP and dynamic Material 3 design. 100% free and private.
        </p>

        {/* High-Converting Action CTAs */}
        <div className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <button
            data-no-ad="true"
            onClick={() => {
              trackEvent('hero_support_click', { source: 'hero_primary' });
              onSupportClick();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Heart size={15} className="fill-black" />
            <span>SUPPORT PROJECT</span>
          </button>

          <Link
            data-no-ad="true"
            to="/reward"
            onClick={() => {
              trackEvent('hero_badge_click', { source: 'hero_badge' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Award size={15} />
            <span>FREE SUPPORTER BADGE</span>
          </Link>

          <a
            data-no-ad="true"
            href={SPATIALFLOW_CONFIG.links.downloadApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('download_app_click', { source: 'hero_secondary' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black/60 hover:bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>GET ANDROID APK</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 3 Clear, Streamlined Feature Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          
          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex items-center gap-3.5">
            <div className="w-10 h-10 m3-asymmetric-1 bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <Cpu size={18} className="stroke-[1.75]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Native Kotlin & Compose
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                ExoPlayer 2 low-latency audio engine
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex items-center gap-3.5">
            <div className="w-10 h-10 m3-squircle bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <ShieldCheck size={18} className="stroke-[1.75]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                100% In-App Ad-Free
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Zero tracking, analytics, or user profiling
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex items-center gap-3.5">
            <div className="w-10 h-10 m3-asymmetric-2 bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <Music2 size={18} className="stroke-[1.75]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Bit-Perfect Lossless
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Equalizer, spatial DSP, and FLAC engine
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
