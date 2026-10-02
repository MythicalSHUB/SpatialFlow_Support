import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Github, QrCode, Award, ArrowUpRight, Heart } from 'lucide-react';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { trackEvent } from '../../lib/analytics';
import { UpiQrModal } from '../ui/UpiQrModal';

export function SupportOptions() {
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const links = SPATIALFLOW_CONFIG.links;

  const handleCopyUpiDirect = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(links.upi.id);
      setCopiedUpi(true);
      trackEvent('upi_id_copied', { id: links.upi.id, source: 'card_button' });
      setTimeout(() => setCopiedUpi(false), 2200);
    } catch (_) {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    }
  };

  return (
    <section id="support-options" className="w-full py-20 bg-black/50 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
            <span>03</span>
            <span className="text-zinc-600">·</span>
            <span>SUPPORT WAYS</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl md:text-5xl text-white tracking-widest uppercase mb-4">
            CHOOSE HOW TO SUPPORT
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Whether through direct contributions or free rewarded support, every action helps keep SpatialFlow running and evolving.
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card: Free Supporter Badge (Rewarded Ad Flow) - Nothing OS Themed Marquee on Top */}
          <div className="col-span-full p-6 sm:p-8 rounded-3xl bg-[#080808] bg-nothing-grid border border-white/15 hover:border-white/30 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Material 3 Expressive Asymmetric Hardware Glyph Badge */}
              <div className="w-16 h-16 m3-asymmetric-1 bg-black border border-white/20 flex flex-col items-center justify-center relative shrink-0 shadow-inner group-hover:border-white/40 transition-colors">
                <div className="w-9 h-9 rounded-full border border-dashed border-white/40 flex items-center justify-center">
                  <Award size={20} className="text-white" />
                </div>
              </div>

              <div>
                {/* Clean label hierarchy without slashes or dots */}
                <div className="flex items-center gap-2.5 mb-2 font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white">
                    NOTHING TO PAY
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span>IN-APP RECOGNITION</span>
                </div>

                {/* Nothing OS Dot Matrix Title */}
                <h3 className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase mb-2">
                  REWARDED SUPPORTER BADGE
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed font-sans">
                  Support SpatialFlow development at zero monetary cost. Complete a 10-second sponsored experience to unlock the permanent Supporter Badge inside your Android app.
                </p>
              </div>
            </div>

            {/* Nothing OS Pill Button */}
            <div className="relative z-10 w-full md:w-auto shrink-0 pt-2 md:pt-0">
              <Link
                to="/reward"
                onClick={() => trackEvent('support_method_click', { method: 'reward_badge_top' })}
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 transition-all font-mono uppercase tracking-widest text-xs font-bold shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>UNLOCK BADGE</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Card 1: UPI Direct & QR Code (Zero Fees) */}
          <div className="p-6 rounded-3xl bg-[#080808] border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* M3 Expressive Squircle Container */}
                <div className="w-12 h-12 m3-squircle bg-white/5 border border-white/20 flex items-center justify-center text-white group-hover:border-white/40 transition-colors">
                  <QrCode size={22} className="stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono text-white px-2 py-0.5 rounded-full bg-white/10 border border-white/15 uppercase tracking-wider">
                  ZERO FEES
                </span>
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2">
                UPI DIRECT & QR CODE
              </h3>
              
              <p className="text-xs sm:text-sm text-zinc-400 mb-4 leading-relaxed font-sans">
                Direct transfer via Google Pay, PhonePe, Paytm, or BHIM with zero intermediary platform fees.
              </p>

              {/* Monospaced ID Box */}
              <div className="bg-black border border-white/10 rounded-xl p-3 mb-5 flex items-center justify-between">
                <code className="text-xs font-mono text-zinc-300 truncate">
                  {links.upi.id}
                </code>
                <button
                  onClick={handleCopyUpiDirect}
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    copiedUpi ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {copiedUpi ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                trackEvent('upi_modal_open');
                setUpiModalOpen(true);
              }}
              className="w-full py-3.5 px-4 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <QrCode size={15} />
              <span>SHOW UPI QR CODE</span>
            </button>
          </div>

          {/* Card 2: Ko-fi */}
          <div className="p-6 rounded-3xl bg-[#080808] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* M3 Expressive Asymmetric Container */}
                <div className="w-12 h-12 m3-asymmetric-1 bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-white/40 transition-colors">
                  <Coffee size={22} className="stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  WORLDWIDE
                </span>
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2">
                SUPPORT ON KO-FI
              </h3>
              
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed font-sans">
                Simple one-off or recurring contributions via card or PayPal. 100% goes toward active development.
              </p>
            </div>

            <a
              href={links.kofi}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('support_method_click', { method: 'kofi' })}
              className="w-full py-3.5 px-4 rounded-full bg-transparent hover:bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>CONTRIBUTE VIA KO-FI</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Card 3: GitHub Sponsors */}
          <div className="p-6 rounded-3xl bg-[#080808] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* M3 Expressive Asymmetric Container */}
                <div className="w-12 h-12 m3-asymmetric-2 bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-white/40 transition-colors">
                  <Github size={22} className="stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  DEVELOPERS
                </span>
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2">
                GITHUB SPONSORS
              </h3>
              
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed font-sans">
                Support via GitHub's official sponsorship program. Tiered monthly or one-time open source sponsorship.
              </p>
            </div>

            <a
              href={links.githubSponsors}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('support_method_click', { method: 'github_sponsors' })}
              className="w-full py-3.5 px-4 rounded-full bg-transparent hover:bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>SPONSOR ON GITHUB</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Card 4: Buy Me a Coffee */}
          <div className="p-6 rounded-3xl bg-[#080808] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                {/* M3 Expressive Faceted Container */}
                <div className="w-12 h-12 m3-faceted bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:border-white/40 transition-colors">
                  <Heart size={22} className="stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  INSTANT TIP
                </span>
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2">
                BUY ME A COFFEE
              </h3>
              
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed font-sans">
                Frictionless single contribution supporting server costs and ongoing maintenance without accounts.
              </p>
            </div>

            <a
              href={links.buyMeACoffee}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('support_method_click', { method: 'buymeacoffee' })}
              className="w-full py-3.5 px-4 rounded-full bg-transparent hover:bg-white/10 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>BUY ME A COFFEE</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

        </div>

      </div>

      {/* UPI QR Modal */}
      <UpiQrModal
        isOpen={upiModalOpen}
        onClose={() => setUpiModalOpen(false)}
      />
    </section>
  );
}
