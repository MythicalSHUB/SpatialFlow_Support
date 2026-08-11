import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import anime from 'animejs';
import { AdSlot } from '../components/ads/AdSlot';

export function Support() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;
      anime({
        targets: elements,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
      });
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 text-center min-h-[80vh] flex flex-col justify-center">
      <div ref={containerRef} className="w-full">
        <div className="opacity-0 mb-12">
          <AdSlot variant="leaderboard" />
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.95] mb-6 uppercase opacity-0">SUPPORT SPATIALFLOW</h1>
        
        <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto opacity-0">
          SpatialFlow is developed independently. If you'd like to support its continued development, you can do so by visiting this page.
        </p>
        
        <div className="bg-zinc-900 border border-white/5 rounded p-8 mb-12 max-w-md mx-auto opacity-0">
          <div className="text-4xl mb-4">🏅</div>
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Supporter Reward</h2>
          <p className="text-zinc-500 text-sm mb-8">
            Complete the available rewarded advertisement experience to receive a permanent SpatialFlow Supporter badge.
          </p>
          
          <Link 
            to="/reward"
            className="inline-block w-full py-4 px-6 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            CONTINUE
          </Link>
        </div>

        <div className="opacity-0 mt-8">
          <AdSlot variant="responsive" />
        </div>
      </div>
    </div>
  );
}
