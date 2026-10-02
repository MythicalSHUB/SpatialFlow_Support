import { useEffect, useRef, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import anime from 'animejs';
import { ArrowLeft, Award, Play, CheckCircle2, Star, Smartphone, ExternalLink } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { ADSTERRA_SMARTLINK } from '../components/ads/AdsterraBanner';
import { trackEvent } from '../lib/analytics';

export function SupportReward() {
  const [status, setStatus] = useState<'idle' | 'watching' | 'completed'>('idle');
  const [timeLeft, setTimeLeft] = useState(10);
  const initialRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent('reward_page_view', { status });
  }, [status]);

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

  const handleWatchAd = () => {
    trackEvent('support_method_click', { method: 'watch_reward_ad' });
    try {
      window.open(ADSTERRA_SMARTLINK, '_blank', 'noopener,noreferrer');
    } catch (_) {}

    setStatus('watching');
    setTimeLeft(10); // 10 seconds wait
  };

  const handleClaimReward = () => {
    trackEvent('reward_claimed');
    setStatus('completed');
  };

  const handleReturnToApp = (e: MouseEvent) => {
    e.preventDefault();
    trackEvent('return_to_app_click');
    setDeepLinkStatus('Returning to SpatialFlow app...');

    // 1. Close tab/window (returns to app immediately if opened in Chrome Custom Tab or WebView)
    try {
      window.close();
    } catch (_) {}

    // 2. Pure package launcher intent with S.browser_fallback_url to strictly PREVENT Play Store redirect
    const fallbackUrl = window.location.href;
    const packageIntent = `intent:#Intent;package=com.codetrio.spatialflow;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;

    try {
      window.location.href = packageIntent;
    } catch (err) {
      console.warn('Launch intent error:', err);
    }

    setTimeout(() => {
      setDeepLinkStatus('Return signal sent to com.codetrio.spatialflow. You can also switch directly back to SpatialFlow.');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center min-h-[75vh] flex flex-col items-center justify-center">
      
      {/* Back to main support portal */}
      <div className="w-full max-w-md text-left mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All Support Options</span>
        </Link>
      </div>

      {status === 'idle' && (
        <div ref={initialRef} className="max-w-md w-full">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-2 opacity-0">
            <span>NOTHING TO PAY</span>
            <span className="text-zinc-600">·</span>
            <span>SUPPORTER PROGRAM</span>
          </div>
          <h1 className="font-ndot text-4xl sm:text-5xl text-white tracking-widest mb-4 uppercase opacity-0">
            SUPPORTER BADGE
          </h1>
          <p className="text-sm text-zinc-400 mb-8 opacity-0 leading-relaxed">
            Support the ongoing development of SpatialFlow without spending money. Complete a short sponsored experience to receive a permanent badge in your Android app.
          </p>
          
          <div className="bg-[#080808] bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px] border border-white/15 hover:border-white/30 rounded-3xl p-6 sm:p-8 mb-8 opacity-0 text-left shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-black border border-white/20 flex flex-col items-center justify-center relative shrink-0">
                <div className="w-8 h-8 rounded-full border border-dashed border-white/40 flex items-center justify-center">
                  <Award size={18} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-ndot text-lg sm:text-xl uppercase tracking-wider text-white">
                  SpatialFlow Supporter
                </h2>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                  Permanent In-App Recognition
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
              Viewing this sponsored message helps offset server costs and audio API infrastructure while keeping SpatialFlow 100% free and in-app ad-free.
            </p>
            
            <button 
              type="button"
              onClick={handleWatchAd}
              className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-[0_0_24px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              <span>Watch Sponsored Experience</span>
            </button>
          </div>
        </div>
      )}

      {status === 'watching' && (
        <div className="flex flex-col items-center w-full max-w-2xl animate-in fade-in duration-300">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
            Sponsored Partner
          </div>
          <h2 className="text-2xl font-bold mb-2 uppercase tracking-tight text-white">
            Supporting SpatialFlow
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mb-6 max-w-md">
            Please view the sponsored advertisement below. Your reward will unlock automatically once the timer expires.
          </p>
          
          {/* Ad slot */}
          <div className="w-full mb-4 flex justify-center">
            <AdSlot variant="rectangle" />
          </div>

          <div className="flex flex-col items-center gap-2 mb-6">
            <a
              href={ADSTERRA_SMARTLINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <span>Sponsored link did not open? Click here to view</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="h-16 flex items-center justify-center">
            {timeLeft > 0 ? (
              <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm bg-zinc-900 px-5 py-2.5 rounded-full border border-white/10">
                <div className="w-4 h-4 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                <span>Reward unlocks in <strong className="text-white">{timeLeft}s</strong>...</span>
              </div>
            ) : (
              <button 
                onClick={handleClaimReward}
                className="py-4 px-8 bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest hover:bg-emerald-300 transition-colors animate-in fade-in slide-in-from-bottom-2 shadow-[0_0_24px_rgba(16,185,129,0.4)] rounded-lg cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>Claim Supporter Badge</span>
              </button>
            )}
          </div>
        </div>
      )}

      {status === 'completed' && (
        <div ref={successRef} className="max-w-md w-full">
          <div className="text-emerald-400 mb-4 opacity-0 flex justify-center">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-2 uppercase text-white opacity-0">
            Support Confirmed
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mb-8 opacity-0">
            Thank you for supporting SpatialFlow development!
          </p>
          
          <div 
            ref={badgeRef}
            className="bg-zinc-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 mb-8 opacity-0 shadow-[0_0_30px_rgba(6,182,212,0.15)] text-center"
          >
            <div className="text-5xl mb-3">🏅</div>
            <h2 className="text-xl font-bold mb-1 uppercase tracking-tight text-white">
              SpatialFlow Supporter
            </h2>
            <p className="text-zinc-400 text-xs">
              Officially recognized supporter of SpatialFlow.
            </p>
          </div>
          
          <div className="opacity-0 space-y-4">
            <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-5 mb-4 text-left">
              <p className="text-zinc-300 text-xs mb-3">
                Help the project reach more music enthusiasts by starring the repository on GitHub!
              </p>
              <a 
                href="https://github.com/MythicalShub/SpatialFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 py-3 px-4 bg-[#24292e] text-white border border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-[#2f363d] transition-colors rounded-lg cursor-pointer"
              >
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>Star on GitHub</span>
              </a>
            </div>

            <button 
              type="button"
              onClick={handleReturnToApp}
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-lg rounded-lg cursor-pointer font-sans"
            >
              <Smartphone size={16} />
              <span>Return to SpatialFlow App</span>
            </button>

            {deepLinkStatus && (
              <div className="p-3 bg-zinc-900 border border-cyan-500/30 rounded-lg text-xs text-cyan-300 animate-in fade-in">
                {deepLinkStatus}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
