import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Placeholder — Stub page for future sections.
 * Shows a "coming soon" message with the page name.
 */
export default function Placeholder() {
  const location = useLocation();

  /* Extract page name from path */
  const pageName = location.pathname
    .replace('/', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Page';

  return (
    <main className="min-h-screen flex items-center justify-center section-pad pt-24">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl glass flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <span className="text-4xl">🏗️</span>
        </motion.div>

        {/* Page title */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider mb-3 text-gradient">
          {pageName}
        </h1>

        {/* Status */}
        <p className="font-accent text-sm md:text-base text-white/50 tracking-wider mb-8">
          This section is coming in a future phase.
        </p>

        {/* Decorative line */}
        <div
          className="w-16 h-[2px] mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }}
        />
      </motion.div>
    </main>
  );
}
