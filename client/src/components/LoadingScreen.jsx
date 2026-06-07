import React from 'react';
import { motion } from 'framer-motion';

/**
 * LoadingScreen — Football-inspired loading animation.
 * Shows a rotating football icon with pulsing stadium lights effect,
 * then fades out via `onComplete` callback.
 */
export default function LoadingScreen({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Stadium light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 w-1 origin-top"
            style={{
              height: '120%',
              background: `linear-gradient(180deg, rgba(196, 164, 74, ${0.08 + i * 0.02}), transparent 70%)`,
              transform: `rotate(${-30 + i * 12}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            transition={{ duration: 2, delay: i * 0.15, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Rotating football */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 relative">
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_30px_rgba(196,164,74,0.3)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke="#c4a44a" strokeWidth="1.5" opacity="0.3" />
            <circle cx="50" cy="50" r="44" fill="#1a1a2e" stroke="#e8d48b" strokeWidth="0.5" opacity="0.2" />
            {/* Pentagon pattern */}
            <polygon points="50,20 62,35 58,52 42,52 38,35" fill="#c4a44a" opacity="0.6" />
            <polygon points="72,42 80,58 72,72 60,65 62,50" fill="#c4a44a" opacity="0.4" />
            <polygon points="28,42 38,50 40,65 28,72 20,58" fill="#c4a44a" opacity="0.4" />
            <polygon points="38,70 50,80 62,70 58,56 42,56" fill="#c4a44a" opacity="0.5" />
            <circle cx="50" cy="50" r="48" fill="none" stroke="#e8d48b" strokeWidth="0.8" opacity="0.3" />
          </motion.svg>
        </div>
      </motion.div>

      {/* Title text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 
          className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #c4a44a, #e8d48b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          FIFA WORLD CUP
        </h1>
        <motion.p
          className="font-heading text-6xl md:text-7xl lg:text-8xl tracking-widest mt-1"
          style={{ color: '#e8d48b' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          2026
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative z-10 mt-12 w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #c4a44a, #e8d48b)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 2.5, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="relative z-10 mt-4 text-xs md:text-sm font-accent tracking-[0.3em] uppercase"
        style={{ color: 'var(--text-secondary)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
      >
        Loading Experience
      </motion.p>
    </motion.div>
  );
}
