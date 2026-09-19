import { AdsterraBanner, AdsterraBannerType } from './AdsterraBanner';

interface AdSlotProps {
  variant: 'leaderboard' | 'responsive' | 'rectangle' | 'in-content' | 'mobile' | 'footer' | 'skyscraper';
  className?: string;
}

export function AdSlot({ variant, className = '' }: AdSlotProps) {
  if (variant === 'rectangle') {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <AdsterraBanner type="300x250" />
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <AdsterraBanner type="320x50" />
      </div>
    );
  }

  if (variant === 'skyscraper') {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="hidden lg:block">
          <AdsterraBanner type="160x600" />
        </div>
        <div className="block lg:hidden">
          <AdsterraBanner type="160x300" />
        </div>
      </div>
    );
  }

  if (variant === 'in-content') {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <div className="hidden sm:block">
          <AdsterraBanner type="468x60" />
        </div>
        <div className="block sm:hidden">
          <AdsterraBanner type="320x50" />
        </div>
      </div>
    );
  }

  // Leaderboard / Responsive default
  return (
    <div className={`w-full flex justify-center ${className}`}>
      {/* Desktop Leaderboard 728x90 */}
      <div className="hidden md:block">
        <AdsterraBanner type="728x90" />
      </div>
      {/* Tablet 468x60 */}
      <div className="hidden sm:block md:hidden">
        <AdsterraBanner type="468x60" />
      </div>
      {/* Mobile 320x50 */}
      <div className="block sm:hidden">
        <AdsterraBanner type="320x50" />
      </div>
    </div>
  );
}

export { AdsterraBanner, type AdsterraBannerType };
