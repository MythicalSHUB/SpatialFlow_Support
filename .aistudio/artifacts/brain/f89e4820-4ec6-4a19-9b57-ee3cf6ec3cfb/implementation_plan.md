# Full-Screen Edge-to-Edge Railway Dither Matrix Animation

This plan upgrades the Railway dither background animation to span the entire screen edge-to-edge (covering header, body, cards, and footer) as a subtle uniform matrix with continuous organic moving waves and reactive cursor luminescence.

---

## User Decisions & Confirmed Architecture

> [!IMPORTANT]
> The following parameters have been confirmed:
> - **Pattern Density**: Subtle uniform matrix with continuous organic moving waves covering all coordinates $(x, y)$.
> - **Page Coverage**: Full edge-to-edge covering the entire viewport, including behind the top navigation bar, main content, and footer.

---

## 1. Technical Implementation Details

### A. Full-Screen Procedural Dither Field (`src/components/ui/RailwayDitherBackground.tsx`)
- **Full Viewport Coverage**:
  - Remove isolated center band restriction. Introduce an ambient baseline value across every $(x, y)$ coordinate:
    $$\text{Base} \approx 0.22$$
  - Layer multi-frequency compound trigonometric harmonic waves:
    $$\Delta_{\text{wave}} = 0.14 \cdot \sin(c \cdot 0.08 + t \cdot 0.7) \cdot \sin(r \cdot 0.09 - t \cdot 0.5) + 0.08 \cdot \cos((c + r) \cdot 0.06 + t \cdot 0.4)$$
  - This ensures a uniform, living field of subtle dither dots drifting across 100% of the screen.
- **Enhanced Interactive Cursor Luminescence**:
  - Cursor tracking flaring up to $\Delta_{\text{cursor}} \approx 0.65 \cdot \text{heat} \cdot \exp\left(-\frac{dx^2 + dy^2}{22000}\right)$.
  - Responsive anywhere the user moves their cursor across the window.
- **Unrestricted Masking**:
  - Remove confining vertical gradient masks so the pattern seamlessly reaches all four screen corners.

### B. Translucent Header & Footer Pass-Through (`src/components/layout/TopBar.tsx` & `src/components/layout/Footer.tsx`)
- Set `TopBar.tsx` to `bg-black/50 backdrop-blur-md` so the top edge reveals the animated dither matrix under the sticky header.
- Set `Footer.tsx` to `bg-black/40 backdrop-blur-sm` for continuous edge-to-edge continuity down to the very bottom edge.

---

## 2. Verification Plan

1. **Lint & Type Safety**: Run `lint_applet` to verify TypeScript types and props.
2. **Build Verification**: Run `compile_applet` to guarantee error-free production build.
3. **Visual & Performance Inspection**: Confirm uniform dither density at top, center, and bottom without obstructing text legibility or click targets.
