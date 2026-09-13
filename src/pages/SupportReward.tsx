import { useEffect, useRef, useState, MouseEvent } from 'react';
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

  const [deepLinkStatus, setDeepLinkStatus] = useState<string | null>(null);

  const monetagDirectLink = import.meta.env.VITE_MONETAG_DIRECT_LINK || 'https://omg10.com/4/11793582';

  const handleWatchAd = () => {
    setStatus('watching');
    setTimeLeft(10); // 10 seconds mandatory wait
  };

  const handleClaimReward = () => {
    setStatus('completed');
  };

  const handleReturnToApp = (e: MouseEvent) => {
    e.preventDefault();
    setDeepLinkStatus('Launching SpatialFlow (com.codetrio.spatialflow)...');

    // Android Intent URL targeting package com.codetrio.spatialflow
    const androidPackageIntent = 'intent:#Intent;package=com.codetrio.spatialflow;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end';
    const customSchemeIntent = 'intent://reward?badge=supporter#Intent;scheme=spatialflow;package=com.codetrio.spatialflow;end';
    const directScheme = 'spatialflow://reward?badge=supporter';

    try {
      // First attempt Android package intent
      window.location.href = androidPackageIntent;
    } catch (err) {
      console.warn('Primary package intent failed, trying custom scheme intent', err);
      try {
        window.location.href = customSchemeIntent;
      } catch (e2) {
        window.location.href = directScheme;
      }
    }

    setTimeout(() => {
      setDeepLinkStatus('Launch command sent to package com.codetrio.spatialflow. If it did not open automatically, tap the button or switch to SpatialFlow on your device.');
    }, 1200);
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
            
            <a 
              href={monetagDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWatchAd}
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-cyan-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span>WATCH ADVERTISEMENT</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      )}

      {status === 'watching' && (
        <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in zoom-in duration-500">
          <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">Advertisement</h2>
          <p className="text-zinc-500 text-sm mb-4">
            Please view the sponsored offer below to support SpatialFlow.
          </p>
          
          {/* We show an actual ad slot here */}
          <div className="w-full mb-6">
            <AdSlot variant="rectangle" />
          </div>

          <div className="flex flex-col items-center gap-4 mb-4">
            <a
              href={monetagDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <span>Offer didn't open? Click here to view sponsored link</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
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
                className="py-4 px-8 bg-green-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-green-400 transition-colors animate-in fade-in slide-in-from-bottom-4 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
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
            Thank you for supporting SpatialFlow!
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
          
          <div className="opacity-0 space-y-4">
            <div className="bg-zinc-900 border border-white/5 rounded p-6 mb-4">
              <p className="text-zinc-300 text-sm mb-4">
                Please consider starring the repository to help the project grow!
              </p>
              <a 
                href="https://github.com/MythicalShub/SpatialFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 py-4 px-6 bg-[#24292e] text-white border border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-[#2f363d] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                STAR ON GITHUB
              </a>
            </div>

            <a 
              href="intent:#Intent;package=com.codetrio.spatialflow;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end"
              onClick={handleReturnToApp}
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg"
            >
              <span>RETURN TO SPATIALFLOW APP</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {deepLinkStatus && (
              <div className="p-3 bg-zinc-800/80 border border-cyan-500/30 rounded text-xs text-cyan-300 animate-in fade-in">
                {deepLinkStatus}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
