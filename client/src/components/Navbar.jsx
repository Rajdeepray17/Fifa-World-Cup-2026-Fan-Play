import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useTheme } from '../context/ThemeContext';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Activity', path: '/activity' },
  { label: 'Groups', path: '/groups' },
  { label: 'Fixtures', path: '/fixtures' },
  { label: 'Memories', path: '/memories' },
  { label: 'Icons', path: '/icons' },
  { label: 'Champions', path: '/wall-of-champions' },
  { label: 'Your Team', path: '/your-team' },
  { label: 'Contact', path: '/contact' },
];

/**
 * Navbar — Premium sticky navigation.
 * Desktop: hides on scroll down, reappears on scroll up.
 * Mobile (<768px): collapses into hamburger with fullscreen overlay.
 */
export default function Navbar() {
  const scrollDir = useScrollDirection(15);
  const { selectedNation } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHidden = scrollDir === 'down';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[60] section-pad"
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="glass-strong rounded-2xl mt-3 px-4 md:px-6 py-2.5 flex items-center justify-between">
          {/* Brand Block (Left side) */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* FIFA Logo Box */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden border border-white/10"
              style={{
                background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`,
              }}
            >
              <img
                src="/assets/images/FIFA Logo.png"
                alt="FIFA"
                className="w-7 h-7 object-contain"
              />
            </div>

            <div className="text-left flex flex-col justify-center">
              <p 
                className="font-heading text-xs sm:text-sm md:text-base font-bold tracking-wider leading-none"
                style={{
                  background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                FIFA World Cup 2026
              </p>
              <p className="text-[9px] sm:text-[10px] font-accent tracking-widest uppercase mt-1 select-none leading-none">
                <span className="font-bold" style={{ color: '#60A5FA' }}>USA</span>{' '}
                <span className="text-white/40">-</span>{' '}
                <span className="font-bold" style={{ color: '#F87171' }}>CANADA</span>{' '}
                <span className="text-white/40">-</span>{' '}
                <span className="font-bold" style={{ color: '#34D399' }}>MEXICO</span>
              </p>
            </div>
          </Link>

          {/* Desktop nav links (Right side on desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-accent tracking-wide transition-colors duration-200 rounded-lg
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white/90'}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                      style={{ background: 'var(--theme-primary)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger (Right side on mobile) */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] group"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-[2px] bg-white/80 group-hover:bg-white transition-colors rounded-full" />
            <span className="block w-4 h-[2px] bg-white/60 group-hover:bg-white transition-colors rounded-full" />
            <span className="block w-3 h-[2px] bg-white/40 group-hover:bg-white transition-colors rounded-full" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
