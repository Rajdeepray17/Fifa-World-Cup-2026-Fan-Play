import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * NationSelectModal — Full-screen overlay to pick a nation.
 * Each nation is a glassmorphic card with flag, name, and hover effects.
 * On selection → triggers theme change via context.
 */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

export default function NationSelectModal({ isOpen, onClose }) {
  const { nations, selectNation } = useTheme();

  const handleSelect = (nationId) => {
    selectNation(nationId);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full max-w-4xl mx-4 sm:mx-6"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <motion.p
                className="font-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-2"
                style={{ color: 'var(--theme-secondary)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Choose Your Identity
              </motion.p>
              <motion.h2
                className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider text-gradient"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                SELECT YOUR NATION
              </motion.h2>
            </div>

            {/* Nation cards grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scroll"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {nations.map((nation) => (
                <motion.button
                  key={nation.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelect(nation.id)}
                  className="group relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl glass cursor-pointer transition-all duration-300 overflow-hidden"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${nation.primary}15, transparent 70%)`,
                    }}
                  />

                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${nation.primary}, ${nation.secondary})` }}
                  />

                  {/* Flag image */}
                  <img
                    src={`https://flagcdn.com/w160/${nation.flagCode}.png`}
                    alt={nation.name}
                    className="w-16 h-10 object-cover rounded shadow mb-3 transition-transform duration-300 group-hover:scale-110 relative z-10"
                  />

                  {/* Nation name */}
                  <span className="font-accent text-sm md:text-base font-medium tracking-wider relative z-10 text-white/90 group-hover:text-white transition-colors">
                    {nation.name}
                  </span>

                  {/* Color preview dots */}
                  <div className="flex gap-1.5 mt-2 relative z-10">
                    <span
                      className="w-2 h-2 rounded-full border border-white/20"
                      style={{ background: nation.primary }}
                    />
                    <span
                      className="w-2 h-2 rounded-full border border-white/20"
                      style={{ background: nation.secondary }}
                    />
                    <span
                      className="w-2 h-2 rounded-full border border-white/20"
                      style={{ background: nation.accent }}
                    />
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Skip Option */}
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => handleSelect('default')}
                className="font-accent text-xs md:text-sm tracking-[0.2em] text-white/40 hover:text-white/90 transition-colors uppercase"
              >
                Skip / Use Default Theme
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
