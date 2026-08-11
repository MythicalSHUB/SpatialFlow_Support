import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { Article } from '../../data/articles';
// @ts-ignore
import anime from 'animejs';
import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  className?: string;
  index?: number;
}

export function ArticleCard({ article, className = '', index = 0 }: ArticleCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (imageRef.current) {
      anime({
        targets: imageRef.current,
        scale: 1.05,
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        color: '#06b6d4',
        translateX: 4,
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        opacity: 1,
        translateX: 4,
        translateY: -4,
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      anime({
        targets: imageRef.current,
        scale: 1,
        duration: 800,
        easing: 'easeOutExpo'
      });
    }
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        color: '#FFFFFF',
        translateX: 0,
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
    if (iconRef.current) {
      anime({
        targets: iconRef.current,
        opacity: 0,
        translateX: 0,
        translateY: 0,
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
  };

  return (
    <Link
      to={`/${article.category}/${article.slug}`}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group flex flex-col gap-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${className}`}
    >
      <div className="relative aspect-video bg-zinc-900 overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors duration-500">
        <img
          ref={imageRef}
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 text-[10px] font-bold bg-cyan-500 text-black px-2 py-1 uppercase">
          {article.category}
        </div>
      </div>
      
      <div className="flex items-start justify-between gap-4">
        <h3 ref={titleRef} className="text-lg font-bold leading-tight group-hover:text-cyan-400 transition-colors">
          {article.title}
        </h3>
        <span ref={iconRef} className="opacity-0 shrink-0 text-cyan-500 mt-1">
          <ArrowUpRight size={20} />
        </span>
      </div>
      
      <div className="flex items-center gap-3 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">
        <span>{article.readTime}</span>
        <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
        <span>{article.date}</span>
      </div>
    </Link>
  );
}
