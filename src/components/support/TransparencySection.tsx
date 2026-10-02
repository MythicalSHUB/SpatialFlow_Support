import { Code2, Server, Sliders, Smartphone, CheckCircle2 } from 'lucide-react';
import { TRANSPARENCY_PILLARS } from '../../data/projectDetails';

const PHILOSOPHY_POINTS = [
  'Zero in-app advertisements or commercial telemetry',
  '100% open source under Apache-2.0 license',
  'No features locked behind monthly paywalls',
  'Native Android Kotlin architecture built for longevity'
];

export function TransparencySection() {
  const getPillarM3Shape = (index: number) => {
    switch (index % 4) {
      case 0:
        return 'm3-asymmetric-1';
      case 1:
        return 'm3-squircle';
      case 2:
        return 'm3-asymmetric-2';
      default:
        return 'm3-faceted';
    }
  };

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Code2 size={20} className="stroke-[1.75]" />;
      case 1:
        return <Server size={20} className="stroke-[1.75]" />;
      case 2:
        return <Sliders size={20} className="stroke-[1.75]" />;
      default:
        return <Smartphone size={20} className="stroke-[1.75]" />;
    }
  };

  return (
    <section id="transparency" className="w-full py-20 bg-black/50 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
            <span>01</span>
            <span className="text-zinc-600">·</span>
            <span>TRANSPARENCY & COSTS</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl md:text-5xl text-white tracking-widest uppercase mb-4">
            WHERE YOUR SUPPORT GOES
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Every contribution directly funds the infrastructure, ongoing research, and device testing required to maintain a high-performance Android player.
          </p>
        </div>

        {/* 4 Concrete Pillars with M3 Expressive Icon Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {TRANSPARENCY_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-black/55 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* M3 Expressive Geometric Container */}
                  <div className={`w-12 h-12 ${getPillarM3Shape(idx)} bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-white/40 transition-colors`}>
                    {getPillarIcon(idx)}
                  </div>
                  <span className="font-mono text-xs text-zinc-500 tracking-wider">
                    MODULE 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-4">
                  {pillar.description}
                </p>
              </div>

              {/* Allocation Detail Tag */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="text-zinc-500">COVERAGE</span>
                <span className="text-white font-medium">{pillar.tagline}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Why Support SpatialFlow Callout Banner */}
        <div id="mission" className="p-8 sm:p-10 rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              <span>PROJECT PRINCIPLES</span>
              <span className="text-zinc-600">·</span>
              <span>ZERO COMPROMISE</span>
            </div>

            <h3 className="font-ndot text-2xl sm:text-3xl text-white tracking-widest uppercase mb-4">
              WHY SUPPORT SPATIALFLOW?
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-sans">
              Mainstream music apps monetize by locking essential features behind subscriptions, selling user listening telemetry to third parties, and injecting ads into local playback. SpatialFlow exists to provide an uncompromising, open-source alternative.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {PHILOSOPHY_POINTS.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans">
                  <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5" />
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
