import { useState, useEffect } from 'react';
import { Copy, Check, X, Smartphone, QrCode, ExternalLink } from 'lucide-react';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { trackEvent } from '../../lib/analytics';

interface UpiQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpiQrModal({ isOpen, onClose }: UpiQrModalProps) {
  const [copied, setCopied] = useState(false);
  const upi = SPATIALFLOW_CONFIG.links.upi;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upi.id);
      setCopied(true);
      trackEvent('upi_id_copied', { id: upi.id });
      setTimeout(() => setCopied(false), 2500);
    } catch (_) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDeepLink = () => {
    trackEvent('upi_deep_link_clicked', { uri: upi.uri });
  };

  // Standard encoded QR URI for UPI
  const encodedUpiUrl = encodeURIComponent(upi.uri);
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&format=svg&data=${encodedUpiUrl}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upi-modal-title"
    >
      <div 
        className="relative w-full max-w-md bg-black/75 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close UPI Modal"
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 m3-squircle bg-white/5 border border-white/20 flex items-center justify-center text-white shrink-0">
            <QrCode size={22} className="stroke-[1.75]" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-0.5">
              <span>DIRECT TRANSFER</span>
            </div>
            <h3 id="upi-modal-title" className="font-ndot text-xl text-white tracking-widest uppercase">
              SCAN TO SUPPORT
            </h3>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center bg-white p-5 rounded-2xl mb-6 shadow-inner mx-auto max-w-[280px]">
          <img
            src={qrSvgUrl}
            alt="SpatialFlow UPI QR Code"
            className="w-56 h-56 object-contain"
            loading="eager"
          />
          <div className="mt-2 text-center">
            <span className="text-[11px] font-mono font-bold text-black tracking-wider uppercase">
              Scan with Any UPI App
            </span>
            <p className="text-[10px] text-zinc-600 font-sans">
              Google Pay · PhonePe · Paytm · BHIM · CRED
            </p>
          </div>
        </div>

        {/* UPI ID Copy Field */}
        <div className="mb-5">
          <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
            UPI Virtual Payment Address
          </label>
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/15 rounded-xl p-2.5">
            <code className="text-xs font-mono text-white flex-1 truncate px-1">
              {upi.id}
            </code>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                copied
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {copied ? (
                <>
                  <Check size={12} />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Open App Action */}
        <div className="space-y-3">
          <a
            href={upi.uri}
            onClick={handleDeepLink}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
          >
            <Smartphone size={15} />
            <span>Open in Phone UPI App</span>
            <ExternalLink size={13} />
          </a>

          <p className="text-[10px] font-mono text-zinc-500 text-center leading-relaxed">
            Beneficiary: {upi.name} · 100% direct developer funding
          </p>
        </div>
      </div>
    </div>
  );
}
