import { Send, Github, Download, Star, ExternalLink } from 'lucide-react';
import { SPATIALFLOW_CONFIG } from '../../data/projectDetails';
import { trackEvent } from '../../lib/analytics';

export function CommunitySection() {
  const links = SPATIALFLOW_CONFIG.links;

  return (
    <section className="w-full py-20 bg-black/50 backdrop-blur-[2px] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-3">
            <span>04</span>
            <span className="text-zinc-600">·</span>
            <span>COMMUNITY & DISCUSSION</span>
          </div>

          <h2 className="font-ndot text-3xl sm:text-4xl md:text-5xl text-white tracking-widest uppercase mb-4">
            STAY CONNECTED WITH SPATIALFLOW
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Join the official discussion, report audio engine feedback, track new releases, or inspect the open-source codebase.
          </p>
        </div>

        {/* Community Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Telegram Channel */}
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('community_link_click', { destination: 'telegram' })}
            className="p-6 rounded-3xl bg-[#080808] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 m3-asymmetric-1 bg-white/5 border border-white/15 flex items-center justify-center text-white mb-4 group-hover:border-white/40 transition-colors">
                <Send size={20} className="stroke-[1.75]" />
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2 group-hover:text-neutral-200 transition-colors">
                TELEGRAM CHAT
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Direct community channel for announcements, feature discussions, bug reports, and audio presets.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
              <span>t.me/SpatialFlow</span>
              <ExternalLink size={14} />
            </div>
          </a>

          {/* GitHub Repository */}
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('community_link_click', { destination: 'github_repo' })}
            className="p-6 rounded-3xl bg-[#080808] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 m3-squircle bg-white/5 border border-white/15 flex items-center justify-center text-white mb-4 group-hover:border-white/40 transition-colors">
                <Github size={20} className="stroke-[1.75]" />
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2 group-hover:text-neutral-200 transition-colors">
                SOURCE CODE
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Review the Kotlin & Jetpack Compose codebase, submit pull requests, or star the project on GitHub.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
              <span className="flex items-center gap-1.5">
                <Star size={12} className="text-white fill-white" />
                STAR REPOSITORY
              </span>
              <ExternalLink size={14} />
            </div>
          </a>

          {/* Download App / Official Web Portal */}
          <a
            href={links.downloadApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('community_link_click', { destination: 'app_download' })}
            className="p-6 rounded-3xl bg-[#080808] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 m3-asymmetric-2 bg-white/5 border border-white/15 flex items-center justify-center text-white mb-4 group-hover:border-white/40 transition-colors">
                <Download size={20} className="stroke-[1.75]" />
              </div>

              <h3 className="font-ndot text-lg text-white tracking-wide uppercase mb-2 group-hover:text-neutral-200 transition-colors">
                DOWNLOAD APP
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Get the official SpatialFlow Android APK directly from the official portal with instant update checking.
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
              <span>spatialflow.vercel.app</span>
              <ExternalLink size={14} />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
}
