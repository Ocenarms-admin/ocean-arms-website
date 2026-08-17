"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
  quoteAccent?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

function ArrowLeft({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  const colorName        = colors.name             ?? "var(--c-deep)";
  const colorDesignation = colors.designation      ?? "var(--c-primary)";
  const colorTestimony   = colors.testimony        ?? "var(--c-fg)";
  const colorArrowBg     = colors.arrowBackground  ?? "var(--c-deep)";
  const colorArrowFg     = colors.arrowForeground  ?? "#F7FBFF";
  const colorArrowHover  = colors.arrowHoverBackground ?? "var(--c-primary)";
  const colorQuoteAccent = colors.quoteAccent      ?? "var(--c-s200)";

  const fontSizeName        = fontSizes.name        ?? "1.45rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.7rem";
  const fontSizeQuote       = fontSizes.quote       ?? "1.05rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef  = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength  = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial   = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => { if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current); };
  }, [autoplay, testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap       = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive  = index === activeIndex;
    const isLeft    = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight   = (activeIndex + 1) % testimonialsLength === index;
    if (isActive)  return { zIndex: 3, opacity: 1, pointerEvents: "auto", transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    if (isLeft)    return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    if (isRight)   return { zIndex: 2, opacity: 1, pointerEvents: "auto", transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`, transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  };

  return (
    <div style={{ width: "100%", maxWidth: "72rem" }}>
      <div style={{ display: "grid", gap: "5rem", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>

        {/* Images */}
        <div ref={imageContainerRef} style={{ position: "relative", width: "100%", height: "26rem", perspective: "1000px" }}>
          {testimonials.map((testimonial, index) => (
            <img
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              style={{
                position: "absolute", width: "100%", height: "100%",
                objectFit: "cover", borderRadius: "1.5rem",
                boxShadow: "0 16px 48px rgba(12,35,64,0.14)",
                ...getImageStyle(index),
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "22rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", gap: 0 }}
            >
              {/* Name + designation */}
              <h3 style={{
                fontFamily: "var(--font-serif)", fontWeight: 500,
                margin: "0 0 0.3rem", color: colorName, fontSize: fontSizeName,
              }}>
                {activeTestimonial.name}
              </h3>
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: fontSizeDesignation, letterSpacing: "0.12em",
                textTransform: "uppercase", color: colorDesignation, margin: 0,
              }}>
                {activeTestimonial.designation}
              </p>

              {/* Divider */}
              <div style={{ width: 40, height: 2, background: colorQuoteAccent, borderRadius: 9999, margin: "1.25rem 0" }} />

              {/* Quote body */}
              <motion.p style={{
                fontFamily: "var(--font-sans)", fontWeight: 300,
                lineHeight: 1.85, color: colorTestimony,
                fontSize: fontSizeQuote, margin: 0,
              }}>
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(8px)", opacity: 0, y: 4 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.02 * i }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots + arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "2.5rem" }}>
            {/* Dot indicators */}
            <div style={{ display: "flex", gap: "0.45rem", flex: 1 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(i); if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === activeIndex ? 24 : 8, height: 8, borderRadius: 9999, border: "none",
                    background: i === activeIndex ? colorArrowBg : colorQuoteAccent,
                    cursor: "pointer", padding: 0,
                    transform: i === activeIndex ? "scaleX(1)" : "scaleX(1)",
                    transition: "width 0.35s cubic-bezier(0.25,1,0.5,1), background 0.35s",
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <button
              onClick={handlePrev}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous testimonial"
              style={{
                width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", border: "1px solid var(--c-s200)",
                backgroundColor: hoverPrev ? colorArrowHover : "transparent",
                transition: "background-color 0.25s, border-color 0.25s",
              }}
            >
              <ArrowLeft size={18} color={hoverPrev ? colorArrowFg : colorArrowBg} />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next testimonial"
              style={{
                width: "2.5rem", height: "2.5rem", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", border: "none",
                backgroundColor: hoverNext ? colorArrowHover : colorArrowBg,
                transition: "background-color 0.25s",
              }}
            >
              <ArrowRight size={18} color={colorArrowFg} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CircularTestimonials;
