import { useId } from 'react';

export type AdsterraBannerType = 
  | '468x60' 
  | '160x300' 
  | '320x50' 
  | '728x90' 
  | '160x600' 
  | '300x250';

interface BannerConfig {
  key: string;
  width: number;
  height: number;
}

const BANNER_CONFIGS: Record<AdsterraBannerType, BannerConfig> = {
  '468x60': {
    key: '21f00c26a69b3722a31a26884c893694',
    width: 468,
    height: 60,
  },
  '160x300': {
    key: '57a6de8f90e344dba5de715e724149bc',
    width: 160,
    height: 300,
  },
  '320x50': {
    key: '57bb4d2b969b4c245597731edb2c607a',
    width: 320,
    height: 50,
  },
  '728x90': {
    key: '5443c39df5d0826041a06f70bd7b4589',
    width: 728,
    height: 90,
  },
  '160x600': {
    key: '628cfbc698c30c378d89fb43272eb5a4',
    width: 160,
    height: 600,
  },
  '300x250': {
    key: 'a189752476f51acc4369edade741ffac',
    width: 300,
    height: 250,
  },
};

export const ADSTERRA_SMARTLINK = 'https://www.profitableratecpmnetwork.com/y9cah0tqk?key=b559547a5a85b554c39795fb355a033f';

interface AdsterraBannerProps {
  type: AdsterraBannerType;
  className?: string;
  showBadge?: boolean;
}

export function AdsterraBanner({ type, className = '', showBadge = true }: AdsterraBannerProps) {
  const config = BANNER_CONFIGS[type];
  const uniqueId = useId();

  if (!config) return null;

  // Render isolated iframe document so Adsterra atOptions never collide in single page app
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${config.key}',
            'format' : 'iframe',
            'height' : ${config.height},
            'width' : ${config.width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highrevenueformat.com/${config.key}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className={`flex flex-col items-center justify-center my-4 ${className}`}>
      {showBadge && (
        <div className="flex items-center justify-between w-full max-w-full px-1 mb-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider" style={{ maxWidth: `${config.width}px` }}>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Sponsored
          </span>
          <a 
            href={ADSTERRA_SMARTLINK} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-cyan-400 transition-colors"
          >
            Adsterra Network
          </a>
        </div>
      )}

      <div 
        className="relative overflow-hidden rounded-md bg-zinc-900/60 border border-white/10 shadow-lg flex items-center justify-center"
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          maxWidth: '100%',
        }}
      >
        <iframe
          id={`adsterra-frame-${uniqueId}`}
          title={`Adsterra Ad ${type}`}
          srcDoc={srcDoc}
          width={config.width}
          height={config.height}
          style={{
            border: 'none',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
          scrolling="no"
        />
      </div>
    </div>
  );
}
