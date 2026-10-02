import { useEffect, useRef } from 'react';

// Exact 8x8 Bayer Ordered Dither Matrix normalized to (0..1)
const BAYER_8X8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
].map((e) => (e + 0.5) / 64);

interface RailwayDitherBackgroundProps {
  cell?: number;
  baseDensity?: number;
  interactive?: boolean;
  className?: string;
}

export function RailwayDitherBackground({
  cell = 6,
  baseDensity = 0.22,
  interactive = true,
  className = ''
}: RailwayDitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect user's accessibility motion settings
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Pointer state with heat-map exponential decay
    const cursor = { x: -1, y: -1, heat: 0 };
    let isVisible = true;
    let animFrame = 0;
    let lastTime = 0;
    let width = 0;
    let height = 0;

    // Monochrome theme configuration (dim ambient & bright flare silver dots)
    const tones = {
      dim: 'rgba(255, 255, 255, 0.12)',
      bright: 'rgba(255, 255, 255, 0.75)'
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (timeMs: number) => {
      const seconds = timeMs / 1000;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const dotSize = Math.max(1.5, cell * 0.38);

      // Smooth pointer heat dissipation
      cursor.heat += ((cursor.x >= 0 ? 1 : 0) - cursor.heat) * 0.08;

      for (let r = 0; r < rows; r++) {
        const bayerRowOffset = (r % 8) * 8;

        for (let c = 0; c < cols; c++) {
          // Full-screen ambient baseline plus dual harmonic traveling waves
          let val = baseDensity;
          val += 0.14 * Math.sin(c * 0.08 + seconds * 0.7) * Math.sin(r * 0.09 - seconds * 0.5);
          val += 0.08 * Math.cos((c * 0.06 - r * 0.05) + seconds * 0.45);

          // Interactive cursor proximity flare
          if (interactive && cursor.heat > 0.01) {
            const dx = c * cell - cursor.x;
            const dy = r * cell - cursor.y;
            val += 0.65 * cursor.heat * Math.exp(-(dx * dx + dy * dy) / 22000);
          }

          // Bayer 8x8 threshold comparison
          const threshold = BAYER_8X8[bayerRowOffset + (c % 8)];
          if (val > threshold) {
            ctx.fillStyle = val - threshold > 0.26 ? tones.bright : tones.dim;
            ctx.fillRect(c * cell, r * cell, dotSize, dotSize);
          }
        }
      }
    };

    const loop = (timestamp: number) => {
      animFrame = requestAnimationFrame(loop);
      // Smooth frame-rate throttling (~30-36fps) for silky fluid motion and low power draw
      if (!isVisible || timestamp - lastTime < 28) return;
      lastTime = timestamp;
      render(timestamp);
    };

    handleResize();

    if (prefersReducedMotion) {
      render(0);
    } else {
      animFrame = requestAnimationFrame(loop);
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
      if (prefersReducedMotion) render(0);
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(canvas);

    // Track mouse globally for seamless window-wide interactivity
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      cursor.x = -1;
      cursor.y = -1;
    };

    if (interactive && !prefersReducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, [cell, baseDensity, interactive]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
