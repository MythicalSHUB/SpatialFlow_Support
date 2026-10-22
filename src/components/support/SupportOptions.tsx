import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Github, QrCode, Award, ArrowUpRight, Sparkles, CreditCard } from 'lucide-react';
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
    <section id="support-options" className="w-full py-16 bg-black/50 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
            <span>02</span>
            <span className="text-zinc-600">·</span>
            <span>CONTRIBUTION WAYS</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl text-white tracking-widest uppercase mb-2">
            SUPPORT SPATIALFLOW
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Choose free sponsored recognition or direct zero-fee open developer funding.
          </p>
        </div>

        {/* Support Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Featured Card: Free Supporter Badge (Rewarded Flow) */}
          <div className="col-span-full p-6 sm:p-7 rounded-3xl bg-black/45 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                <Award size={26} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1 font-mono text-[10px] tracking-[0.2em] uppercase text-cyan-400 font-bold">
                  <span>100% FREE</span>
                  <span className="text-zinc-600">·</span>
                  <span>PERMANENT IN-APP BADGE</span>
                </div>

                <h3 className="font-ndot text-xl sm:text-2xl text-white tracking-wide uppercase mb-1">
                  FREE REWARDED SUPPORTER BADGE
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-sans">
                  Support development at zero cost. Complete a 10s sponsored experience to unlock your permanent in-app badge.
                </p>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-auto shrink-0">
              <Link
                data-no-ad="true"
                to="/reward"
                onClick={() => {
                  trackEvent('support_method_click', { method: 'reward_badge_top' });
                }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono uppercase tracking-widest text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles size={14} />
                <span>UNLOCK BADGE</span>
              </Link>
            </div>
          </div>

          {/* Card 1: Direct PayPal (International) - STRICTLY NO SMARTLINKS */}
          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-sky-400/30 hover:border-sky-400/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                  <CreditCard size={18} />
                </div>
                <span className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded-full bg-sky-950/40 border border-sky-400/30 uppercase tracking-wider font-semibold">
                  WORLDWIDE
                </span>
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                PAYPAL DIRECT
              </h3>
              
              <p className="text-xs text-zinc-400 mb-3 font-sans">
                Cards, balance, or international currencies directly.
              </p>

              <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-2 mb-4">
                <code className="text-[11px] font-mono text-zinc-300 truncate block">
                  paypal.me/ShubhamKarande787
                </code>
              </div>
            </div>

            <a
              data-no-ad="true"
              href={links.paypal}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('support_method_click', { method: 'paypal' });
              }}
              className="w-full py-2.5 px-4 rounded-full bg-sky-500 hover:bg-sky-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>PAY WITH PAYPAL</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Card 2: UPI Direct & QR Code - STRICTLY NO SMARTLINKS */}
          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center text-white">
                  <QrCode size={18} />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-400/30 uppercase tracking-wider font-semibold">
                  0% FEE
                </span>
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                UPI DIRECT & QR
              </h3>
              
              <p className="text-xs text-zinc-400 mb-3 font-sans">
                Google Pay, PhonePe, Paytm, BHIM instant transfer.
              </p>

              <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-2 mb-4 flex items-center justify-between">
                <code className="text-[11px] font-mono text-zinc-300 truncate">
                  {links.upi.id}
                </code>
                <button
                  data-no-ad="true"
                  onClick={handleCopyUpiDirect}
                  className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                    copiedUpi ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {copiedUpi ? 'COPIED' : 'COPY'}
                </button>
              </div>
            </div>

            <button
              data-no-ad="true"
              onClick={() => {
                trackEvent('upi_modal_open');
                setUpiModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <QrCode size={14} />
              <span>SHOW QR CODE</span>
            </button>
          </div>

          {/* Card 3: Ko-fi - STRICTLY NO SMARTLINKS */}
          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white">
                  <Coffee size={18} />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  KO-FI
                </span>
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                KO-FI TIP
              </h3>
              
              <p className="text-xs text-zinc-400 mb-6 font-sans">
                Single or monthly support via Ko-fi platform.
              </p>
            </div>

            <a
              data-no-ad="true"
              href={links.kofi}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('support_method_click', { method: 'kofi' });
              }}
              className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>OPEN KO-FI</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Card 4: GitHub Sponsors - STRICTLY NO SMARTLINKS */}
          <div className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white">
                  <Github size={18} />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 tracking-wider">
                  GITHUB
                </span>
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                SPONSORS
              </h3>
              
              <p className="text-xs text-zinc-400 mb-6 font-sans">
                Official GitHub open source sponsorship.
              </p>
            </div>

            <a
              data-no-ad="true"
              href={links.githubSponsors}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('support_method_click', { method: 'github_sponsors' });
              }}
              className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <span>GITHUB SPONSOR</span>
              <ArrowUpRight size={14} />
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
