interface AudioVisualizerWaveProps {
  className?: string;
  bars?: number;
}

export function AudioVisualizerWave({ className = '', bars = 24 }: AudioVisualizerWaveProps) {
  // Pre-calculated aesthetic bar heights to avoid random hydration mismatch
  const heights = [
    28, 45, 70, 35, 85, 60, 40, 95, 65, 30, 80, 50,
    75, 40, 90, 60, 35, 70, 45, 85, 55, 30, 65, 40
  ];

  return (
    <div 
      aria-hidden="true"
      className={`flex items-end gap-1 select-none pointer-events-none ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const height = heights[i % heights.length];
        return (
          <div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-cyan-500/20 via-cyan-400/40 to-cyan-300/60"
            style={{
              height: `${height}%`,
              minHeight: '4px',
              animationDuration: `${1.2 + (i % 5) * 0.25}s`,
              animationDelay: `${(i % 6) * 0.15}s`
            }}
          />
        );
      })}
    </div>
  );
}
