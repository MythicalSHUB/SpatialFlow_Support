import { ShieldCheck, HeartHandshake, Code2 } from 'lucide-react';

export function TransparencySection() {
  return (
    <section id="transparency" className="w-full py-10 bg-black/40 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Compact 3-Column Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/40 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                100% IN-APP AD-FREE
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Zero telemetry, analytics, or profiling
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
              <HeartHandshake size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                DIRECT FUNDING
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Funds infrastructure, devices & DSP research
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0">
              <Code2 size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                OPEN SOURCE
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Apache 2.0 licensed Kotlin & Compose
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
