import { Music2, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { trackEvent } from '../../lib/analytics';

interface HeroSectionProps {
  onSupportClick: () => void;
}

export function HeroSection({ onSupportClick }: HeroSectionProps) {
  return (
    <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-transparent border-b border-white/10 overflow-hidden">
      
      {/* Subtle radial ambient vignette */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-radial from-transparent via-black/80 to-black pointer-events-none" 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Clean Monospaced Eyebrow without slashes or red dots */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">
          <span>PROJECT</span>
          <span className="text-zinc-600">·</span>
          <span>SPATIALFLOW {SPATIALFLOW_CONFIG.version}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">OPEN SOURCE AUDIO</span>
        </div>

        {/* Primary Headline in Dot Matrix */}
        <h1 className="font-ndot text-3xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase max-w-4xl leading-[1.08] mb-6">
          KEEP INDEPENDENT ANDROID AUDIO RUNNING
        </h1>

        {/* Clear, Trustworthy Subhead in Clean Grotesque */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10 font-sans">
          SpatialFlow is an independent Android music player engineered with native Jetpack Compose, dynamic Material 3 design, lossless playback, and real-time DSP effects. Built without corporate telemetry or invasive subscriptions.
        </p>

        {/* Action CTAs: Support SpatialFlow & Download Android App */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={() => {
              trackEvent('hero_support_click', { source: 'hero_primary' });
              onSupportClick();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Support SpatialFlow</span>
          </button>

          <a
            href={SPATIALFLOW_CONFIG.links.downloadApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('download_app_click', { source: 'hero_secondary' });
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-white/5 border border-dashed border-white/30 hover:border-white/60 text-white text-xs font-mono uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Download Android App</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Material 3 Expressive Geometric Spec Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          
          {/* Badge 1: M3 Asymmetric Squircle */}
          <div className="p-5 rounded-3xl bg-[#080808]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4">
            <div className="w-12 h-12 m3-asymmetric-1 bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <Cpu size={22} className="stroke-[1.75]" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                ENGINE ARCHITECTURE
              </div>
              <div className="text-sm font-bold text-white mb-0.5">
                Native Kotlin & Compose
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero legacy web wrappers. ExoPlayer 2 + MediaSession3 low-latency pipeline.
              </p>
            </div>
          </div>

          {/* Badge 2: M3 Symmetric Squircle */}
          <div className="p-5 rounded-3xl bg-[#080808]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4">
            <div className="w-12 h-12 m3-squircle bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <ShieldCheck size={22} className="stroke-[1.75]" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                PRIVACY GUARANTEE
              </div>
              <div className="text-sm font-bold text-white mb-0.5">
                100% Zero In-App Ads
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero telemetry, analytics trackers, or user profiling in your music player.
              </p>
            </div>
          </div>

          {/* Badge 3: M3 Inverted Asymmetric Capsule */}
          <div className="p-5 rounded-3xl bg-[#080808]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4">
            <div className="w-12 h-12 m3-asymmetric-2 bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <Music2 size={22} className="stroke-[1.75]" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                AUDIO FIDELITY
              </div>
              <div className="text-sm font-bold text-white mb-0.5">
                Lossless & Spatial DSP
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bit-perfect playback, dynamic equalizer, and parametric spatial audio filters.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
