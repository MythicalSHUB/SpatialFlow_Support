import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import anime from 'animejs';

interface AdSlotProps {
  variant: 'leaderboard' | 'responsive' | 'rectangle' | 'in-content' | 'mobile' | 'footer';
  className?: string;
}

export function AdSlot({ variant, className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED !== 'false';
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-2739324234981676';

  let slotId = '';
  let adFormat = 'auto';
  let adLayout = '';
  switch (variant) {
    case 'leaderboard':
    case 'responsive':
    case 'rectangle':
    case 'mobile':
    case 'footer':
      slotId = import.meta.env.VITE_AD_SLOT_HOME || '2970011325';
      break;
    case 'in-content':
      slotId = import.meta.env.VITE_AD_SLOT_ARTICLE || '2802224434';
      adLayout = 'in-article';
      adFormat = 'fluid';
      break;
  }

  useEffect(() => {
    if (!adsEnabled || !containerRef.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdLoaded(true);

      if (containerRef.current) {
        anime({
          targets: containerRef.current,
          opacity: [0, 1],
          translateY: [8, 0],
          easing: 'easeOutExpo',
          duration: 600,
        });
      }
    } catch (e) {
      console.warn('Ad network initializing...', e);
    }
  }, [adsEnabled]);

  // Dimensions based on standard IAB display specs
  let minHeight = '90px';
  switch (variant) {
    case 'leaderboard':
      minHeight = '90px';
      break;
    case 'responsive':
    case 'rectangle':
    case 'in-content':
      minHeight = '250px';
      break;
    case 'mobile':
      minHeight = '100px';
      break;
    case 'footer':
      minHeight = '80px';
      break;
  }

  return (
    <div className={`w-full max-w-full my-6 ${className}`}>
      <div className="flex items-center justify-between px-2 mb-1.5 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
          Sponsored
        </span>
        <span>SpatialFlow Partner</span>
      </div>

      <div
        ref={containerRef}
        style={{ minHeight }}
        className="w-full relative rounded-lg bg-zinc-900/70 border border-white/10 hover:border-cyan-500/30 transition-colors flex items-center justify-center overflow-hidden p-2 shadow-inner"
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: adLayout === 'in-article' ? 'center' : undefined,
            width: '100%',
            height: '100%',
            minHeight,
          }}
          data-ad-layout={adLayout || undefined}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />

        {/* Fallback & Monetag interaction zone when third-party display ads are awaiting fill */}
        <div className="absolute inset-0 -z-0 pointer-events-none flex flex-col items-center justify-center p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 text-zinc-400">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-zinc-300 tracking-wide">
            SpatialFlow Network Sponsor
          </span>
          <span className="text-[11px] text-zinc-500 mt-0.5 max-w-xs">
            MultiTag Zone 280125 Active
          </span>
        </div>
      </div>
    </div>
  );
}
