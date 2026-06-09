import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/LoadingScreen';
import IntroVideo from '../components/IntroVideo';
import NationSelectModal from '../components/NationSelectModal';
import { useTheme } from '../context/ThemeContext';

/**
 * EntryExperience — The complete onboarding flow:
 * 1. Loading screen with football animation
 * 2. "Tap to Begin" prompt (provides user gesture for audio unlock)
 * 3. FIFA Intro video (fullscreen with audio)
 * 4. Freeze on final frame → show CTA
 * 5. CTA opens Nation Selection Modal
 * 6. On nation selection → navigates to Home
 *
 * This component is only rendered when no nation is selected.
 */

const PHASE = {
  LOADING: 'loading',
  TAP_TO_BEGIN: 'tap_to_begin',
  VIDEO: 'video',
  CTA: 'cta',
  MODAL: 'modal',
};

export default function EntryExperience() {
  const [phase, setPhase] = useState(PHASE.LOADING);
  const { selectNation } = useTheme();
  const videoRef = useRef(null);

  /* Loading complete → show tap-to-begin prompt */
  const handleLoadingComplete = useCallback(() => {
    setPhase(PHASE.TAP_TO_BEGIN);
  }, []);

  /* User taps → this click IS the user gesture that unlocks audio */
  const handleTapToBegin = useCallback(() => {
    setPhase(PHASE.VIDEO);
    // Small delay so the video component mounts first
    setTimeout(() => {
      if (videoRef.current) videoRef.current.play();
    }, 100);
  }, []);

  /* Video ended → show CTA over frozen frame */
  const handleVideoEnd = useCallback(() => {
    setPhase(PHASE.CTA);
  }, []);

  /* Skip intro → trigger fast-forward on video ref */
  const handleSkipIntro = useCallback(() => {
    if (videoRef.current && typeof videoRef.current.skip === 'function') {
      videoRef.current.skip();
    } else {
      setPhase(PHASE.CTA);
    }
  }, []);

  /* CTA clicked → open modal */
  const handleCTAClick = useCallback(() => {
    setPhase(PHASE.MODAL);
  }, []);

  /* Modal close (nation was selected via context) */
  const handleModalClose = useCallback(() => {
    /* The ThemeContext handles persistence.
       App.jsx will detect isNationSelected and unmount this page. */
  }, []);

  return (
    <div className="fixed inset-0 z-[50] bg-black">
      <AnimatePresence mode="wait">
        {/* Phase 1: Loading */}
        {phase === PHASE.LOADING && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {/* Phase 2: Tap to Begin (user gesture to unlock audio) */}
        {phase === PHASE.TAP_TO_BEGIN && (
          <motion.div
            key="tap-to-begin"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f] cursor-pointer"
            onClick={handleTapToBegin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background subtle radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(196,164,74,0.06) 0%, transparent 60%)',
              }}
            />

            {/* FIFA Logo */}
            <motion.img
              src="/assets/images/FIFA Logo.png"
              alt="FIFA World Cup 2026"
              className="w-28 md:w-36 lg:w-44 h-auto mb-8 drop-shadow-[0_0_40px_rgba(196,164,74,0.25)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Title */}
            <motion.h2
              className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-[0.15em] text-white text-center mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              WORLD CUP{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #c4a44a, #e8d48b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                2026
              </span>
            </motion.h2>

            {/* Tap prompt */}
            <motion.div
              className="flex flex-col items-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {/* Play icon ring */}
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center animate-pulse-glow"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M22 14L2 26V2L22 14Z"
                    fill="#c4a44a"
                    fillOpacity="0.9"
                  />
                </svg>
              </motion.div>

              {/* Text */}
              <motion.p
                className="font-accent text-xs md:text-sm tracking-[0.35em] uppercase text-white/40"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Tap Anywhere to Begin
              </motion.p>
            </motion.div>

            {/* Sound note */}
            <motion.p
              className="absolute bottom-8 font-accent text-[10px] tracking-widest uppercase text-white/20 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              Sound On for Best Experience
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Video (rendered constantly to preload in background, plays on TAP_TO_BEGIN) */}
      <IntroVideo ref={videoRef} onVideoEnd={handleVideoEnd} />

      {/* Skip Intro button (rendered in low opacity in the bottom right corner) */}
      <AnimatePresence>
        {phase === PHASE.VIDEO && (
          <motion.button
            key="skip-intro"
            className="fixed bottom-6 right-6 z-[75] font-accent text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/35 hover:text-white/90 bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 px-4 py-2 rounded-full backdrop-blur-sm cursor-pointer select-none transition-all duration-300"
            onClick={handleSkipIntro}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip Intro
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phase 4: CTA overlay on frozen video frame */}
      <AnimatePresence>
        {(phase === PHASE.CTA || phase === PHASE.MODAL) && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Dark overlay to make CTA readable over frozen frame */}
            <div className="absolute inset-0 bg-black/50" />

            {/* FIFA Logo (hidden to keep layout position) */}
            <div className="relative z-10 mb-8 invisible pointer-events-none">
              <img
                src="/assets/images/FIFA Logo.png"
                alt="FIFA World Cup 2026"
                className="w-32 md:w-40 lg:w-48 h-auto"
              />
            </div>

            {/* Title (hidden to keep layout position) */}
            <h1 className="relative z-10 font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.15em] text-transparent text-center mb-4 invisible pointer-events-none">
              WORLD CUP 2026
            </h1>

            {/* Subtitle (hidden to keep layout position) */}
            <p className="relative z-10 font-accent text-sm md:text-base text-transparent tracking-wider mb-10 text-center px-4 invisible pointer-events-none">
              The Ultimate Digital Experience
            </p>

            {/* CTA Button */}
            <motion.button
              className="relative z-10 btn-primary text-base md:text-lg px-8 md:px-12 py-4"
              style={{ background: 'linear-gradient(135deg, #c4a44a, #8b6914)' }}
              onClick={handleCTAClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(196, 164, 74, 0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Journey
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.button>

            {/* Decorative line */}
            <motion.div
              className="relative z-10 mt-12 w-24 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, #c4a44a, transparent)' }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 5: Nation Selection Modal */}
      <NationSelectModal
        isOpen={phase === PHASE.MODAL}
        onClose={handleModalClose}
      />
    </div>
  );
}
