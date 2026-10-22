import { Code2, Server, Sliders, Smartphone, Check } from 'lucide-react';
import { TRANSPARENCY_PILLARS } from '../../data/projectDetails';

const PRINCIPLES = [
  '100% In-app ad-free',
  'Zero user tracking or telemetry',
  'No monthly feature paywalls',
  'Full open source under Apache-2.0'
];

export function TransparencySection() {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 size={18} className="stroke-[1.75]" />;
      case 1:
        return <Server size={18} className="stroke-[1.75]" />;
      case 2:
        return <Sliders size={18} className="stroke-[1.75]" />;
      default:
        return <Smartphone size={18} className="stroke-[1.75]" />;
    }
  };

  return (
    <section id="transparency" className="w-full py-16 bg-black/50 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header - Clean & Minimal */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
            <span>01</span>
            <span className="text-zinc-600">·</span>
            <span>FUND ALLOCATION</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl text-white tracking-widest uppercase mb-2">
            WHERE SUPPORT GOES
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            100% of user contributions fund infrastructure, testing devices, and core DSP research.
          </p>
        </div>

        {/* 4 Clean Minimal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {TRANSPARENCY_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white">
                    {getPillarIcon(idx)}
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-ndot text-sm text-white tracking-wide uppercase mb-1.5">
                  {pillar.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-3 line-clamp-3">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[10px] font-mono text-zinc-300 flex justify-between">
                <span className="text-zinc-500">COVERAGE</span>
                <span className="font-semibold">{pillar.tagline}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Principles Strip */}
        <div id="mission" className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-1">
                PROJECT VALUES
              </div>
              <h3 className="font-ndot text-xl text-white tracking-wider uppercase">
                COMMITTED TO INTEGRITY
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
              {PRINCIPLES.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
