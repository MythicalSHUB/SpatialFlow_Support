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

// Pre-computed Sine Lookup Table for ultra-fast trigonometry (0 CPU overhead)
const LUT_SIZE = 1024;
const SIN_LUT = new Float32Array(LUT_SIZE);
const TWO_PI = Math.PI * 2;
for (let i = 0; i < LUT_SIZE; i++) {
  SIN_LUT[i] = Math.sin((i / LUT_SIZE) * TWO_PI);
}

function fastSin(val: number): number {
  let idx = Math.floor(((val % TWO_PI) / TWO_PI) * LUT_SIZE);
  if (idx < 0) idx += LUT_SIZE;
  return SIN_LUT[idx % LUT_SIZE];
}

function fastCos(val: number): number {
  return fastSin(val + Math.PI * 0.5);
}

// 32-bit Little-Endian RGBA pixel values
// 0xAABBGGRR
const COLOR_TRANSPARENT = 0x00000000;
const COLOR_DIM = 0x24e0e0e0;     // ~14% opacity silver
const COLOR_BRIGHT = 0xc0ffffff;  // ~75% opacity brilliant white

interface RailwayDitherBackgroundProps {
  cell?: number;
  baseDensity?: number;
  interactive?: boolean;
  className?: string;
}

export function RailwayDitherBackground({
  cell = 7,
  baseDensity = 0.22,
  interactive = true,
  className = ''
}: RailwayDitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Offscreen canvas buffer for single GPU-blit scaling
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    let animFrame = 0;
    let lastTime = 0;
    let isVisible = true;
    let isTabFocused = true;

    // Grid dimensions
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let imgData: ImageData | null = null;
    let buf32: Uint32Array | null = null;

    // Pointer state with smooth exponential decay
    const cursor = { gridX: -100, gridY: -100, heat: 0 };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);

      if (width <= 0 || height <= 0) return;

      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);

      offscreen.width = cols;
      offscreen.height = rows;

      imgData = offCtx.createImageData(cols, rows);
      buf32 = new Uint32Array(imgData.data.buffer);

      // Disable smoothing for authentic crisp dither square pixels
      ctx.imageSmoothingEnabled = false;
    };

    const render = (timeMs: number) => {
      if (!imgData || !buf32 || cols <= 0 || rows <= 0) return;

      const seconds = timeMs * 0.001;

      // Exponential cursor heat relaxation
      cursor.heat += ((cursor.gridX >= 0 ? 1 : 0) - cursor.heat) * 0.1;

      const cursorGridX = cursor.gridX;
      const cursorGridY = cursor.gridY;
      const heat = cursor.heat;
      const checkCursor = interactive && heat > 0.02;

      let ptr = 0;
      for (let r = 0; r < rows; r++) {
        const bayerRowOffset = (r & 7) * 8;
        const dy = r - cursorGridY;
        const dy2 = dy * dy;

        for (let c = 0; c < cols; c++) {
          // Ambient traveling waves using lookup table
          let val = baseDensity;
          val += 0.13 * fastSin(c * 0.08 + seconds * 0.7) * fastSin(r * 0.09 - seconds * 0.5);
          val += 0.07 * fastCos((c * 0.06 - r * 0.05) + seconds * 0.45);

          // Fast mouse proximity flare
          if (checkCursor) {
            const dx = c - cursorGridX;
            const distSq = dx * dx + dy2;
            if (distSq < 450) { // within radius
              val += 0.65 * heat * Math.exp(-distSq * 0.005);
            }
          }

          // Bayer 8x8 threshold test
          const threshold = BAYER_8X8[bayerRowOffset + (c & 7)];
          if (val > threshold) {
            buf32[ptr++] = val - threshold > 0.25 ? COLOR_BRIGHT : COLOR_DIM;
          } else {
            buf32[ptr++] = COLOR_TRANSPARENT;
          }
        }
      }

      // Write pixel buffer into offscreen canvas
      offCtx.putImageData(imgData, 0, 0);

      // 1 single GPU draw call stretches offscreen buffer across main canvas
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offscreen, 0, 0, cols, rows, 0, 0, width, height);
    };

    const loop = (timestamp: number) => {
      animFrame = requestAnimationFrame(loop);

      // Throttle to 33ms (~30fps) for fluid visual motion with zero dropped frames or CPU spikes
      if (!isVisible || !isTabFocused || timestamp - lastTime < 32) return;
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

    const handleVisibilityChange = () => {
      isTabFocused = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track pointer in grid coordinates for instant proximity calculation
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.gridX = Math.floor((e.clientX - rect.left) / cell);
      cursor.gridY = Math.floor((e.clientY - rect.top) / cell);
    };

    const onPointerLeave = () => {
      cursor.gridX = -100;
      cursor.gridY = -100;
    };

    if (interactive && !prefersReducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (interactive) {
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerleave', onPointerLeave);
      }
    };
  }, [cell, baseDensity, interactive]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden will-change-transform ${className}`}
      style={{
        transform: 'translateZ(0)',
        contain: 'strict',
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          imageRendering: 'pixelated',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}
