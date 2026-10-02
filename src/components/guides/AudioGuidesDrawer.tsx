import { useState } from 'react';
import { X, BookOpen, ChevronRight, Clock } from 'lucide-react';
import { articles, Article, Category } from '../../data/articles';
import { trackEvent } from '../../lib/analytics';
import { ArticleModal } from './ArticleModal';

interface AudioGuidesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AudioGuidesDrawer({ isOpen, onClose }: AudioGuidesDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  if (!isOpen) return null;

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const categories: Array<{ id: Category | 'all'; label: string }> = [
    { id: 'all', label: 'All Articles' },
    { id: 'audio', label: 'Audio DSP' },
    { id: 'android', label: 'Android' },
    { id: 'technology', label: 'Tech' },
    { id: 'guides', label: 'Guides' },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md animate-in fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div 
          className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-black/75 backdrop-blur-2xl border-l border-white/15 shadow-2xl flex flex-col text-left overflow-hidden animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 m3-squircle bg-white/5 border border-white/20 flex items-center justify-center text-white">
                <BookOpen size={20} className="stroke-[1.75]" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-0.5">
                  <span>KNOWLEDGE BASE</span>
                </div>
                <h2 id="drawer-title" className="font-ndot text-lg text-white tracking-widest uppercase">
                  AUDIO KNOWLEDGE BASE
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Knowledge Base"
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Category Filter Pills (Material 3 Expressive Pills) */}
          <div className="px-6 py-3 border-b border-white/5 bg-black/40 backdrop-blur-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {filteredArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => {
                  trackEvent('audio_guide_view', { articleId: article.id, category: article.category });
                  setActiveArticle(article);
                }}
                className="w-full text-left p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 hover:bg-black/60 transition-all flex items-start justify-between gap-3 group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 font-semibold">
                    <span className="text-white">{article.category}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-ndot text-sm text-white group-hover:text-neutral-200 transition-colors leading-snug mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>

                <ChevronRight size={18} className="text-zinc-600 group-hover:text-white shrink-0 mt-2 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            SPATIALFLOW · OPEN AUDIO ENGINEERING
          </div>
        </div>
      </div>

      {/* Selected Article Reading Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </>
  );
}
