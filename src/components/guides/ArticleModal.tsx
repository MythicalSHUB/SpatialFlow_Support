import { useEffect } from 'react';
import { X, Clock, Calendar, Bookmark } from 'lucide-react';
import { Article } from '../../data/articles';
import { marked } from 'marked';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && article) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  const htmlContent = marked.parse(article.content) as string;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-black/75 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-400">
            <Bookmark size={14} className="text-white" />
            <span>GUIDE</span>
            <span className="text-zinc-600">·</span>
            <span>{article.category}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Article"
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {/* Article Header */}
          <div className="mb-6">
            <h2 id="article-modal-title" className="font-ndot text-2xl sm:text-3xl text-white tracking-wide uppercase mb-3 leading-tight">
              {article.title}
            </h2>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Clock size={13} className="text-white" />
                {article.readTime}
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-500">
                <Calendar size={13} />
                {article.date}
              </span>
            </div>
          </div>

          {/* Article Markdown Body */}
          <div 
            className="prose prose-invert prose-zinc max-w-none text-zinc-300 text-sm leading-relaxed prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-p:my-3 font-sans"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Context Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 bg-black/40 backdrop-blur-sm border border-white/10 p-4 rounded-2xl flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400">
              SPATIALFLOW · AUDIO KNOWLEDGE BASE
            </span>
            <button
              onClick={onClose}
              className="text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 cursor-pointer transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
