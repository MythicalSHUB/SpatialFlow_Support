import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AdSenseLoader() {
  useEffect(() => {
    const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true';
    const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
    
    if (adsEnabled && clientId) {
      const scriptId = 'adsbygoogle-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }
  }, []);
  
  return null;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-zinc-300 font-sans selection:bg-cyan-500 selection:text-black">
      <ScrollToTop />
      <AdSenseLoader />
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
