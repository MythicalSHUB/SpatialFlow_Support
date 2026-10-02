# Frosted Glass Backdrop Blur Migration

This plan replaces solid opaque container backgrounds across the entire application with frosted glass styling (`backdrop-blur-md` and `bg-black/40` or `bg-white/[0.03]`), allowing the full-screen Railway dither matrix animation to drift organically behind all cards, contribution tiers, modals, and drawers.

---

## User Decisions & Confirmed Architecture

> [!IMPORTANT]
> The following parameters have been confirmed:
> - **Visual Blur Intensity**: Frosted glass (`backdrop-blur-md` with subtle dark tint `bg-black/40` and refined micro-borders `border-white/10`).
> - **Scope of Elements**: All cards, support tiers, modals, slide-over knowledge drawer, ad slots, and statistical pill containers.

---

## 1. Technical Implementation Details

### A. Transparency & Cost Breakdown Cards (`src/components/support/TransparencySection.tsx`)
- Replace solid `bg-[#080808]` cards with `bg-black/40 backdrop-blur-md border border-white/10`.
- Update inner cost table and progress bars with translucent frosted backings (`bg-white/[0.04]`).

### B. Contribution Tiers & Payment Cards (`src/components/support/SupportOptions.tsx`)
- Transform tier cards from solid `bg-[#080808]` into frosted glass surfaces:
  - Default: `bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-black/55`
  - Featured/Popular tier: `bg-white/[0.06] backdrop-blur-md border border-white/20`
- Convert quick crypto contribution boxes and bank transfer callouts to frosted glass.

### C. Community & Discussion Panels (`src/components/support/CommunitySection.tsx`)
- Replace `bg-[#080808]` grid cards with `bg-black/40 backdrop-blur-md border border-white/10`.

### D. Dialogs & Slide-Over Knowledge Drawer (`src/components/support/CryptoModal.tsx` & `src/components/guides/AudioGuidesDrawer.tsx`)
- **Crypto Modal**: Replace solid card background with `bg-black/70 backdrop-blur-xl border border-white/15` and clean backdrop blur on modal backdrop.
- **Audio Guides Drawer**: Replace solid drawer body with `bg-black/70 backdrop-blur-xl border-l border-white/10` with frosted guide cards.

### E. Ad Containers & Hero Badges (`src/components/ads/AdSlot.tsx`, `HeroSection.tsx`)
- Apply `bg-black/40 backdrop-blur-md` to ad bounding frames and stats containers to maintain aesthetic consistency.

---

## 2. Verification Plan

1. **Lint & Type Safety**: Run `lint_applet` to verify no broken JSX or class name issues.
2. **Build Verification**: Run `compile_applet` to confirm zero compilation warnings or errors.
3. **Visual Inspection**: Confirm high readability for all text, numbers, and CTA buttons while dither matrix movement shines through the glass cards.
