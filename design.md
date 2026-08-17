---
version: 1.0.0
name: Casa Flow Visual Language
description: A sophisticated architectural design system balancing neutral stone tones, premium typography, and fluid 3D transformations for interior design storytelling.

colors:
  background: "#FAFAFA"
  foreground: "#57534E"
  accent-primary: "#817872"
  accent-muted: "#C1B6A9"
  accent-deep: "#2C2B29"
  stone-100: "#F5F5F4"
  stone-200: "#E7E5E4"
  stone-300: "#D6D3D1"
  text-main: "#44403C"
  text-heading: "#2C2B29"

typography:
  base:
    family: "Inter, sans-serif"
    weight: "300"
    size: "20px"
  serif-heading:
    family: "Playfair Display, serif"
    weight: "400"
  accent-heading:
    family: "Instrument Serif, serif"
    style: "italic"
  sans-display:
    family: "Montserrat, sans-serif"
    weight: "500"
    tracking: "0.15em"

spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  gutter: "1.5rem"

rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
  card: "2rem"

components:
  nav:
    position: "fixed"
    blur: "8px"
    height: "80px"
    border: "stone-200/50"
  hero:
    layout: "flex-row-responsive"
    heading-size: "8xl"
    visual: "svg-architectural-lineart"
  buttons:
    primary: "rounded-full bg-accent-primary text-white px-8 py-4 shadow-xl"
    outline: "rounded-full border-stone-200 text-text-main px-8 py-4"
  cards:
    stack: "perspective-normal with depth-based z-index"
    glass: "backdrop-blur-2xl bg-white/80 border-stone-200"
  finance-slider:
    track: "stone-200 6px height"
    thumb: "accent-deep 18px circle with white border"
  faq-carousel:
    mechanism: "3D rotateY wheel"
    perspective: "1500px"
    card-flip: "rotateY(180deg)"

motion:
  speed:
    slow: "0.8s"
    standard: "0.5s"
    fast: "0.15s"
  easing:
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    fluid: "cubic-bezier(0.25, 1, 0.5, 1)"
---
## Overview
Casa Flow is designed to evoke a sense of "effortless luxury." It uses a muted, earth-toned palette inspired by stone and linen to create a high-trust environment for premium transactions. The system utilizes depth and 3D space to guide the user through complex financing processes without overwhelming the visual flow.

## Colors
The palette is dominated by Stone and Taupe. Use `#817872` for primary calls-to-action and `#2C2B29` for depth or secondary background layers. Use `#C1B6A9` (Accent Muted) for decorative elements like logo accents or status dots.

## Typography
- **Serif Display**: Use Playfair Display for primary headings to convey heritage and luxury.
- **Sans-Serif Body**: Use Inter (light weight) for body copy to maintain readability and a modern aesthetic.
- **Secondary Accents**: Use Montserrat (all-caps, high tracking) for badges, labels, and small UI metadata.

## Spacing
Follow an 8px grid system. Use large section padding (80px to 128px) to maintain a premium, editorial feel with significant whitespace.

## Layout
- Use **Sticky Stacks** for complex interactive sections like financing and galleries.
- Implement **Z-Index Layering** for foreground cards to ensure they pop against blurred or gradient-rich backgrounds.
- **Maximum Width**: Limit content to 7xl (1280px) for optimal readability on ultra-wide displays.

## Elevation & Depth
- **Base Elevation**: Subtle shadows using `rgba(0,0,0,0.05)` for cards.
- **Interactive Depth**: Use CSS `perspective` (500px to 1500px) and `rotateY` for carousel components.
- **Glassmorphism**: Combine `backdrop-blur-md` with semi-transparent white (`/80`) for floating navigation and overlays.

## Shapes
- **Primary Shape**: High-radius corners (`2rem` or `rounded-full`) are standard for all interactive components.
- **Architectural Motifs**: Use 1px line-art and isometric polygons to represent structure and design precision.

## Components
- **Navigation**: Fixed-top, semi-transparent bar with a subtle bottom border.
- **Feature Deck**: A three-card stack that spreads horizontally on desktop and cascades vertically on mobile using 3D transforms.
- **Live Quotation Mockup**: A glass container that mimics a mobile UI, using vertical scroll progress to trigger milestone animations.
- **FAQ 3D Wheel**: An interactive carousel where cards rotate around a central Y-axis, allowing users to flip cards for details.

## Motion
- **Parallax**: Background items should move at varied speeds (`0.5` to `1.5`) relative to scroll to create spatial depth.
- **Draw-in Animations**: Use `stroke-dashoffset` for SVG line art to simulate a "drafting" effect on load.
- **Milestone Tracking**: Animate a vertical progress line height from 0% to 100% based on scroll position in the process section.

## Do's and Don'ts
- **Do**: Use italics for emphasis in serif headings to add personality.
- **Do**: Use high-quality architectural photography with warm, neutral lighting.
- **Don't**: Use vibrant or saturated colors (e.g., pure red, blue, or green) for any primary UI element.
- **Don't**: Use sharp corners; always apply at least a 16px radius to cards and buttons.

## Accessibility
- Ensure a minimum contrast ratio of 4.5:1 for body text against the stone-50 background.
- Provide visual hover and focus states for all interactive 3D elements to ensure keyboard navigability.
- Maintain large tap targets (44px minimum) for mobile buttons and carousel controls.