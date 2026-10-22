# Performance Optimization & Lag Elimination Plan

This plan resolves browser stutter and frame drops by re-engineering the background dither animation with direct `ImageData` 32-bit pixel buffer rendering, isolating GPU composition layers for backdrop blur, and lazy-loading ad banners to prevent main-thread contention.

---

## Root Causes of Lag Identified

1. **CPU Draw-Call Bottleneck in Canvas**:
   - `RailwayDitherBackground.tsx` previously executed up to **57,600 individual `ctx.fillRect()` and `ctx.fillStyle` state changes** and thousands of `Math.sin`/`Math.cos`/`Math.exp` trigonometric calculations every frame on the main thread.
2. **GPU Re-rasterization Bottleneck from Backdrop Blur**:
   - Applying `backdrop-blur-md` across multiple large containers over an active, re-drawing canvas forces the GPU to constantly re-sample and blur tens of thousands of animating pixels per frame across multiple composite layers.
3. **Simultaneous Ad Iframe Spawning**:
   - Multiple Adsterra iframes and script invocations loading in parallel without throttling competed for CPU resources during initial rendering.

---

## 1. Technical Implementation Details

### A. Direct 32-bit `ImageData` Pixel Buffer Engine (`src/components/ui/RailwayDitherBackground.tsx`)
- Replace 57,600 `ctx.fillRect()` canvas calls with a single low-overhead offscreen `ImageData` buffer:
  - Operate on a `Uint32Array` view (`buf32`) where writing a pixel is a single memory write: `data32[idx] = 0xbfd4d4d4` (bright) or `0x1fd4d4d4` (dim).
  - Use an internal low-resolution grid (scaled by CSS `image-rendering: pixelated`) so the canvas only updates $\approx 180 \times 100$ cells ($18,000$ operations instead of 60,000+), executing in $< 0.8\text{ ms}$ per frame.
  - Pre-compute a sine lookup table (LUT) to eliminate repeated `Math.sin`/`Math.cos` calls in inner loops.
  - Pause animation when the tab is blurred or when the canvas is scrolled out of viewport.

### B. GPU Layer Isolation & Composite Optimization (`index.css` & Card Containers)
- Add hardware acceleration hints (`transform: translateZ(0)`, `contain: paint`) to the background canvas container to separate it from the DOM layout tree.
- Optimize backdrop filters with `will-change: backdrop-filter, transform` so GPU caches glass surfaces rather than continuously re-rasterizing the entire layout tree.

### C. Lazy-Loaded Non-Blocking Ad Iframes (`src/components/ads/AdsterraBanner.tsx` & `AdSlot.tsx`)
- Add `loading="lazy"` and an `IntersectionObserver` to only mount and execute Adsterra iframes when scrolled near the viewport.
- Stagger ad script execution so the initial page paint completes instantly without main thread blocking.

---

## 2. Verification Plan

1. **Performance Profiling**:
   - Confirm animation loop completes in $< 1.5\text{ ms}$ (comfortably under the 16.6ms budget for 60fps).
   - Ensure zero dropped frames during fast scrolling.
2. **Quality & Visual Fidelity**:
   - Verify dither dots and interactive mouse flares retain their aesthetic Nothing OS / Railway style.
   - Confirm all ad slots render cleanly without overlapping or layout shift.
3. **Build & Lint Verification**:
   - Run `lint_applet` and `compile_applet` to ensure pristine compilation.
