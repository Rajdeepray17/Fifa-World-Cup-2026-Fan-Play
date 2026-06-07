import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides } from '../data/slides';

/**
 * HeroSlideshow — Full viewport hero section with historical football moments.
 * - Auto-rotates every 7 seconds
 * - Manual next/prev navigation
 * - Touch/swipe support on mobile
 * - Expandable: just add entries to slides.js
 */

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function HeroSlideshow() {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [imageFailed, setImageFailed] = useState(false);
  const timerRef = useRef(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);
  const cacheBust = '20260605';

  const totalSlides = slides.length;
  const slide = slides[currentIndex];
  const slideImageSrc = slide.image ? `${slide.image}?v=${cacheBust}` : null;

  useEffect(() => {
    setImageFailed(false);
  }, [currentIndex]);

  /* Navigate */
  const goTo = useCallback(
    (newIndex, dir) => {
      const wrapped = ((newIndex % totalSlides) + totalSlides) % totalSlides;
      setSlide([wrapped, dir]);
    },
    [totalSlides]
  );

  const next = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  /* Auto-rotate */
  useEffect(() => {
    timerRef.current = setInterval(next, 7000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  /* Reset timer on manual nav */
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 7000);
  };

  /* Touch handling */
  const handleTouchStart = (e) => {
    touchStart.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { next(); } else { prev(); }
      resetTimer();
    }
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, var(--theme-primary-10), transparent 60%),
                       radial-gradient(ellipse at 70% 80%, var(--theme-secondary-10), transparent 50%),
                       var(--bg-deep)`,
        }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Slide content */}
      <div className="relative z-10 w-full section-pad">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full"
            >
            {/* Left: Text content */}
            <div className="flex-1 max-w-2xl">
              {/* Title */}
              <motion.h1
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider leading-none mb-2"
                style={{ color: 'var(--theme-primary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {slide.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-accent text-sm md:text-base text-white/60 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Did You Know */}
              <motion.div
                className="glass rounded-xl p-4 md:p-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="font-accent text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--theme-primary)' }}>
                  Did You Know?
                </p>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  {slide.didYouKnow}
                </p>
              </motion.div>

              {/* Quote */}
              <motion.blockquote
                className="border-l-2 pl-4 md:pl-6"
                style={{ borderColor: 'var(--theme-accent)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm md:text-base italic text-white/70 leading-relaxed">
                  {slide.quote}
                </p>
                {slide.quoteAuthor && (
                  <p className="mt-2 text-xs font-accent tracking-wider" style={{ color: 'var(--theme-secondary)' }}>
                    — {slide.quoteAuthor}
                  </p>
                )}
              </motion.blockquote>
            </div>

            {/* Right: Image (if available) */}
            <motion.div
              className="flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {slideImageSrc && !imageFailed ? (
                <div className="relative w-full h-full">
                  <img
                    src={slideImageSrc}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: slide.imagePosition || 'center center' }}
                    onError={() => setImageFailed(true)}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, var(--theme-primary-10), transparent)`,
                    }}
                  />
                </div>
              ) : (
                /* Decorative placeholder if no image */
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-primary-10), var(--theme-secondary-10))`,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="text-center">
                    <span className="text-6xl opacity-40">⚽</span>
                    <p className="font-accent text-xs tracking-widest uppercase mt-3 text-white/20">
                      Historic Moment
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={() => { prev(); resetTimer(); }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i, i > currentIndex ? 1 : -1); resetTimer(); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-8' : 'w-1.5'
              }`}
              style={{
                background: i === currentIndex ? 'var(--theme-primary)' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => { next(); resetTimer(); }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-[9px] font-accent tracking-[0.3em] uppercase text-white/20 mb-2">Scroll</p>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
