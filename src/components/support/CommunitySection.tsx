import { Send, Github, Download, Star, ExternalLink } from 'lucide-react';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { trackEvent } from '../../lib/analytics';

export function CommunitySection() {
  const links = SPATIALFLOW_CONFIG.links;

  return (
    <section className="w-full py-16 bg-black/50 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
            <span>03</span>
            <span className="text-zinc-600">·</span>
            <span>ECOSYSTEM</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl text-white tracking-widest uppercase mb-2">
            COMMUNITY & CODE
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Connect with audio engineers, track releases, and inspect source code.
          </p>
        </div>

        {/* 3 Streamlined Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Telegram Channel */}
          <a
            data-no-ad="true"
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('community_link_click', { destination: 'telegram' });
            }}
            className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white mb-3 group-hover:border-white/40 transition-colors">
                <Send size={18} />
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                TELEGRAM CHAT
              </h3>

              <p className="text-xs text-zinc-400 font-sans mb-4">
                Chat with the developer, report issues, and test beta builds.
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
              <span>t.me/SpatialFlow</span>
              <ExternalLink size={13} />
            </div>
          </a>

          {/* GitHub Repository */}
          <a
            data-no-ad="true"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('community_link_click', { destination: 'github_repo' });
            }}
            className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white mb-3 group-hover:border-white/40 transition-colors">
                <Github size={18} />
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                OPEN SOURCE
              </h3>

              <p className="text-xs text-zinc-400 font-sans mb-4">
                Kotlin & Jetpack Compose architecture. Star or fork on GitHub.
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Star size={12} className="fill-amber-400" />
                STAR REPO
              </span>
              <ExternalLink size={13} />
            </div>
          </a>

          {/* Download App / Official Web Portal */}
          <a
            data-no-ad="true"
            href={links.downloadApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('community_link_click', { destination: 'app_download' });
            }}
            className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-white mb-3 group-hover:border-white/40 transition-colors">
                <Download size={18} />
              </div>

              <h3 className="font-ndot text-base text-white tracking-wide uppercase mb-1">
                GET APK
              </h3>

              <p className="text-xs text-zinc-400 font-sans mb-4">
                Download the latest verified APK with automatic updates.
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
              <span>spatialflow.vercel.app</span>
              <ExternalLink size={13} />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
