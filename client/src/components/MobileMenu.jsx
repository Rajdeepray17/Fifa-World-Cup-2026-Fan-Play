import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * MobileMenu — Fullscreen overlay menu for mobile viewports.
 * Blurred background, staggered link animation, close button.
 */

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.15 } },
};

const menuVariants = {
  hidden: { x: '100%' },
  show: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.3, ease: 'easeIn' } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 40 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.06, type: 'spring', stiffness: 200, damping: 20 },
  }),
};

export default function MobileMenu({ isOpen, onClose, navItems }) {
  const { selectedNation } = useTheme();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70] mobile-menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-[80] w-full sm:w-80 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(10,10,15,0.98), rgba(10,10,15,0.95))',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
            }}
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M1 1L17 17M17 1L1 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nation badge */}
            {selectedNation && (
              <div className="px-8 mb-6">
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w80/${selectedNation.flagCode}.png`}
                    alt={selectedNation.name}
                    className="w-8 h-5 object-cover rounded shadow-sm"
                  />
                  <div>
                    <p className="font-accent text-xs tracking-widest uppercase text-white/50">Your Nation</p>
                    <p className="font-heading text-lg tracking-wider" style={{ color: 'var(--theme-primary)' }}>
                      {selectedNation.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div key={item.path} custom={i} variants={linkVariants} initial="hidden" animate="show">
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`block py-3 px-4 rounded-xl font-heading text-2xl tracking-wider transition-all duration-200
                        ${isActive
                          ? 'text-white bg-white/5'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: 'var(--theme-primary)' }}
                          />
                        )}
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer accent */}
            <div className="p-8">
              <div
                className="h-[1px] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, var(--theme-primary), transparent)' }}
              />
              <p className="text-center text-[10px] font-accent tracking-widest uppercase text-white/20 mt-3">
                FIFA World Cup 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
