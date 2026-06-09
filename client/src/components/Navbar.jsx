import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useTheme } from '../context/ThemeContext';
import MobileMenu from './MobileMenu';
import { API_URL } from '../config';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Activity', path: '/activity' },
  { label: 'Groups', path: '/groups' },
  { label: 'Fixtures', path: '/fixtures' },
  { label: 'Memories', path: '/memories' },
  { label: 'Icons', path: '/icons' },
  { label: 'Champions', path: '/wall-of-champions' },
  // { label: 'Your Team', path: '/your-team' },
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
  const [fixtures, setFixtures] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const response = await fetch(`${API_URL}/fixtures?limit=104&sort=date`);
        const data = await response.json();
        if (data.success) {
          setFixtures(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch fixtures:", err);
      }
    };
    fetchFixtures();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const nextMatch = fixtures.find(f => new Date(f.date) > currentTime);

  const isHidden = scrollDir === 'down';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[60] section-pad"
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="glass-strong rounded-2xl mt-3 px-4 md:px-6 py-2.5 flex items-center justify-between relative">
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

            <div className="hidden sm:flex flex-col justify-center text-left">
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

          {/* Next Match Widget (Center) */}
          {nextMatch && (
            <div className="flex-1 flex justify-center mx-2 sm:mx-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 px-3 py-1 sm:py-1.5 rounded-full border border-white/10" style={{ background: 'rgba(0,0,0,0.5)' }}>
                <div className="flex items-center gap-2">
                {nextMatch.homeTeam ? (
                  <img src={`https://flagcdn.com/w40/${nextMatch.homeTeam.flagCode.toLowerCase()}.png`} alt={nextMatch.homeTeam.code} className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-white/20" />
                ) : (
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/50">{nextMatch.homePlaceholder}</span>
                )}
                <span className="text-[9px] sm:text-[10px] font-black text-white/40 italic">VS</span>
                {nextMatch.awayTeam ? (
                  <img src={`https://flagcdn.com/w40/${nextMatch.awayTeam.flagCode.toLowerCase()}.png`} alt={nextMatch.awayTeam.code} className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-white/20" />
                ) : (
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/50">{nextMatch.awayPlaceholder}</span>
                )}
              </div>
              <div className="hidden sm:block w-px h-3 bg-white/20"></div>
              <div className="text-[8px] sm:text-[10px] font-accent tracking-wider text-[#FFD700] whitespace-nowrap">
                {new Date(nextMatch.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase()} • {nextMatch.kickoffIST}
              </div>
            </div>
            </div>
          )}

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
