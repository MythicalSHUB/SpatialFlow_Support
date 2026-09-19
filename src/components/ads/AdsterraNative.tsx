import { useEffect, useRef } from 'react';
import { ADSTERRA_SMARTLINK } from './AdsterraBanner';

interface AdsterraNativeProps {
  className?: string;
}

export function AdsterraNative({ className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script already appended in container
    const existingScript = containerRef.current.querySelector('script[src*="19ca1d833804d3fe9b15468aa153248d"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://pl31417542.profitableratecpmnetwork.com/19ca1d833804d3fe9b15468aa153248d/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    containerRef.current.appendChild(script);

    return () => {
      // Clean up script on unmount if needed
      try {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      } catch (_) {}
    };
  }, []);

  return (
    <div className={`w-full max-w-2xl mx-auto my-6 ${className}`} ref={containerRef}>
      <div className="flex items-center justify-between px-2 mb-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Recommended For You
        </span>
        <a 
          href={ADSTERRA_SMARTLINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-cyan-400 transition-colors"
        >
          Sponsored
        </a>
      </div>

      <div className="min-h-[120px] w-full rounded-lg bg-zinc-900/60 border border-white/10 p-2 flex items-center justify-center shadow-lg overflow-hidden">
        {/* Adsterra Native Container */}
        <div id="container-19ca1d833804d3fe9b15468aa153248d" className="w-full flex justify-center items-center" />
      </div>
    </div>
  );
}
