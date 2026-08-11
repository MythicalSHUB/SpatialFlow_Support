import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import anime from 'animejs';

interface AdSlotProps {
  variant: 'leaderboard' | 'responsive' | 'rectangle' | 'in-content' | 'mobile' | 'footer';
  className?: string;
}

export function AdSlot({ variant, className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  let slotId = '';
  let adFormat = 'auto';
  let adLayout = '';
  switch (variant) {
    case 'leaderboard':
    case 'responsive':
      slotId = import.meta.env.VITE_AD_SLOT_HOME || '2970011325';
      break;
    case 'rectangle':
    case 'mobile':
      slotId = import.meta.env.VITE_AD_SLOT_SIDEBAR || '1122334455';
      break;
    case 'in-content':
      slotId = import.meta.env.VITE_AD_SLOT_ARTICLE || '2802224434';
      adLayout = 'in-article';
      adFormat = 'fluid';
      break;
    case 'footer':
      slotId = import.meta.env.VITE_AD_SLOT_FOOTER || '5544332211';
      break;
  }

  useEffect(() => {
    if (!adsEnabled || !containerRef.current) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      
      if (containerRef.current) {
        anime({
          targets: containerRef.current,
          opacity: [0, 1],
          translateY: [12, 0],
          easing: 'easeOutExpo',
          duration: 800,
        });
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [adsEnabled]);

  // Determine fixed minimum dimensions based on variant to prevent CLS
  let minHeight = 'auto';
  let minWidth = '100%';
  switch (variant) {
    case 'leaderboard':
      minHeight = '90px';
      break;
    case 'responsive':
      minHeight = '250px';
      break;
    case 'rectangle':
      minHeight = '250px';
      minWidth = '300px';
      break;
    case 'in-content':
      minHeight = '250px';
      break;
    case 'mobile':
      minHeight = '100px';
      break;
    case 'footer':
      minHeight = '90px';
      break;
  }

  if (!adsEnabled) {
    return null;
  }

  return (
    <div className={`w-full bg-[#0A0A0A] border border-white/5 p-2 rounded my-8 ${className}`}>
      <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center mb-1">
        ADVERTISEMENT
      </div>
      <div
        ref={containerRef}
        style={{ minHeight, minWidth }}
        className="w-full max-w-full bg-zinc-900/30 border border-dashed border-white/10 flex items-center justify-center overflow-hidden opacity-0"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: adLayout === 'in-article' ? 'center' : undefined, width: '100%', height: '100%' }}
          data-ad-layout={adLayout || undefined}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
