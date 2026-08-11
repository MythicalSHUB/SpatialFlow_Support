import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import anime from 'animejs';
import { AdSlot } from '../components/ads/AdSlot';

export function SupportReward() {
  const [status, setStatus] = useState<'idle' | 'watching' | 'completed'>('idle');
  const [timeLeft, setTimeLeft] = useState(10);
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
    let timer: number;
    if (status === 'watching' && timeLeft > 0) {
      timer = window.setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [status, timeLeft]);

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
    setStatus('watching');
    setTimeLeft(10); // 10 seconds mandatory wait
  };

  const handleClaimReward = () => {
    setStatus('completed');
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
              Watch the available sponsored advertisement to receive your permanent badge.
            </p>
            
            <button 
              onClick={handleWatchAd}
              className="w-full py-4 px-6 bg-cyan-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors"
            >
              WATCH ADVERTISEMENT
            </button>
          </div>
        </div>
      )}

      {status === 'watching' && (
        <div className="flex flex-col items-center w-full max-w-2xl transition-all duration-500">
          <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Advertisement</h2>
          <p className="text-zinc-500 text-sm mb-6">
            Please view the ad below to support SpatialFlow.
          </p>
          
          {/* We show an actual ad slot here */}
          <div className="w-full mb-8">
            <AdSlot variant="rectangle" />
          </div>

          <div className="h-16 flex items-center justify-center">
            {timeLeft > 0 ? (
              <div className="flex items-center gap-3 text-zinc-400 font-mono">
                <div className="w-5 h-5 border-2 border-white/10 border-t-cyan-500 rounded-full animate-spin"></div>
                Reward unlocks in {timeLeft}s...
              </div>
            ) : (
              <button 
                onClick={handleClaimReward}
                className="py-4 px-8 bg-green-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-green-400 transition-colors"
              >
                CLAIM REWARD
              </button>
            )}
          </div>
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
