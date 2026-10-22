import { useState } from 'react';
import { X, ChevronUp, Sparkles, ExternalLink } from 'lucide-react';
import { AdSlot } from './AdSlot';
import { ADSTERRA_SMARTLINK } from './AdsterraBanner';
import { trackEvent } from '../../lib/analytics';

export function StickyBottomAd() {
  const [minimized, setMinimized] = useState(false);

  return (
    <aside 
      aria-label="Sponsored Partner Banner"
      className="fixed bottom-0 inset-x-0 z-40 pointer-events-auto transition-transform duration-300"
    >
      {minimized ? (
        <div className="flex justify-center pb-2">
          <button
            onClick={() => {
              setMinimized(false);
              trackEvent('sticky_ad_expanded');
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono uppercase tracking-wider hover:bg-black/95 transition-all shadow-xl cursor-pointer"
          >
            <Sparkles size={12} className="text-cyan-400" />
            <span>Show Sponsor Banner</span>
            <ChevronUp size={14} />
          </button>
        </div>
      ) : (
        <div className="w-full bg-black/85 backdrop-blur-xl border-t border-white/20 px-4 py-2 flex flex-col items-center shadow-[0_-10px_35px_rgba(0,0,0,0.8)] relative">
          
          {/* Header strip with label, direct smartlink, and close button */}
          <div className="w-full max-w-4xl flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white font-semibold">Featured Sponsor</span>
              <span className="text-zinc-600">·</span>
              <a
                href={ADSTERRA_SMARTLINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('sticky_ad_smartlink_click')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 underline underline-offset-2"
              >
                <span>Visit Sponsor Offer</span>
                <ExternalLink size={10} />
              </a>
            </div>

            <button
              onClick={() => {
                setMinimized(true);
                trackEvent('sticky_ad_minimized');
              }}
              aria-label="Hide Sponsor Banner"
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Responsive Banner Unit */}
          <div className="w-full flex justify-center overflow-hidden">
            <AdSlot variant="leaderboard" />
          </div>
        </div>
      )}
    </aside>
  );
}
