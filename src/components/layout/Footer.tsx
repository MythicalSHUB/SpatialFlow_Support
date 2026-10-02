import { Link } from 'react-router-dom';
import { Github, Send, Heart, BookOpen } from 'lucide-react';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { AdSlot } from '../ads/AdSlot';

interface FooterProps {
  onOpenGuides?: () => void;
}

export function Footer({ onOpenGuides }: FooterProps) {
  const links = SPATIALFLOW_CONFIG.links;

  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-md pt-12 pb-16 text-zinc-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Secondary Non-Intrusive Sponsored Banner Unit */}
        <div className="mb-12 pt-4 pb-8 border-b border-white/5 flex flex-col items-center">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span>COMMUNITY SPONSOR NETWORK</span>
          </div>
          <div className="w-full flex justify-center overflow-hidden">
            <AdSlot variant="leaderboard" />
          </div>
        </div>

        {/* Footer Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="font-ndot text-xl text-white tracking-widest uppercase">
                SPATIALFLOW
              </div>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-sans">
              An independent, open-source Android music experience engineered for high-fidelity audio, lossless playback, dynamic Material 3 design, and real-time DSP.
            </p>
            <div className="text-[11px] font-mono text-zinc-500 pt-1">
              LICENSED UNDER APACHE-2.0 · DEVELOPED BY MYTHICALSHUB
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-white mb-3">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#transparency" className="hover:text-white transition-colors">
                  Where Funds Go
                </a>
              </li>
              <li>
                <a 
                  href="https://spatialflow.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Download App ↗
                </a>
              </li>
              <li>
                <a href="#support-options" className="hover:text-white transition-colors">
                  Ways to Support
                </a>
              </li>
              <li>
                <Link to="/reward" className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-300">
                  <span>Free Supporter Badge</span>
                </Link>
              </li>
              {onOpenGuides && (
                <li>
                  <button 
                    onClick={onOpenGuides}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer text-zinc-400"
                  >
                    <BookOpen size={12} />
                    <span>20 Audio Guides</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-white mb-3">
              COMMUNITY
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a 
                  href={links.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Send size={12} />
                  <span>Telegram Chat</span>
                </a>
              </li>
              <li>
                <a 
                  href={links.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github size={12} />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a 
                  href={links.kofi} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Heart size={12} />
                  <span>Ko-fi Tip Jar</span>
                </a>
              </li>
              <li>
                <a 
                  href={links.githubSponsors} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  GitHub Sponsors
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} SPATIALFLOW · NATIVE ANDROID AUDIO
          </div>
          <div className="flex items-center gap-2">
            <span>VERSION {SPATIALFLOW_CONFIG.version}</span>
            <span className="text-zinc-600">·</span>
            <span>ZERO IN-APP TELEMETRY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
