import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import anime from 'animejs';

export function SupportReward() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'completed'>('idle');
  const initialRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'idle' && initialRef.current) {
      anime({
        targets: initialRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
      });
    }
  }, [status]);

  useEffect(() => {
    if (status === 'completed' && successRef.current && badgeRef.current) {
      const tl = anime.timeline({ easing: 'easeOutExpo' });
      
      tl.add({
        targets: successRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(150)
      });
      
      tl.add({
        targets: badgeRef.current,
        scale: [0.8, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .5)'
      }, '-=600');
    }
  }, [status]);

  const handleWatchAd = () => {
    setStatus('loading');
    
    // Simulate rewarded ad flow
    // In production, this would trigger Google Ad Manager rewarded ad
    setTimeout(() => {
      setStatus('completed');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
      {status === 'idle' && (
        <div ref={initialRef} className="max-w-md w-full">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6 uppercase opacity-0">SUPPORT SPATIALFLOW</h1>
          <p className="text-zinc-400 mb-12 opacity-0">
            Your support helps us continue improving SpatialFlow.
          </p>
          
          <div className="bg-zinc-900 border border-white/5 rounded p-8 mb-8 opacity-0">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight flex items-center justify-center gap-2">
              <span className="text-2xl">🏅</span> SUPPORTER BADGE
            </h2>
            <p className="text-zinc-500 text-sm mb-8">
              Watch the available rewarded advertisement to receive your permanent badge.
            </p>
            
            <button 
              onClick={handleWatchAd}
              className="w-full py-4 px-6 bg-cyan-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors"
            >
              WATCH REWARDED AD
            </button>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-white/10 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-500 animate-pulse">Loading advertisement...</p>
        </div>
      )}

      {status === 'completed' && (
        <div ref={successRef} className="max-w-md w-full">
          <div className="text-green-500 mb-6 opacity-0 flex justify-center">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6 uppercase opacity-0">SUPPORT CONFIRMED</h1>
          <p className="text-zinc-400 mb-12 opacity-0">
            Thank you for supporting SpatialFlow.
          </p>
          
          <div 
            ref={badgeRef}
            className="bg-zinc-900 border border-cyan-500/50 rounded p-8 mb-8 opacity-0 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            <div className="text-6xl mb-4">🏅</div>
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight">SpatialFlow Supporter</h2>
            <p className="text-zinc-500 text-sm">
              Supported the development of SpatialFlow.
            </p>
          </div>
          
          <div className="opacity-0">
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("This would deep-link back to the SpatialFlow Android app.");
              }}
              className="inline-block w-full py-4 px-6 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
            >
              RETURN TO SPATIALFLOW
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
