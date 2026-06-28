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
  const [fixturesDropdownOpen, setFixturesDropdownOpen] = useState(false);
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
  const TBD_ROUNDS = ['Round of 16', 'Quarter Final', 'Semi Final', 'Third Place', 'Final'];
  const isTbdRound = nextMatch && TBD_ROUNDS.includes(nextMatch.round);

  const isHidden = scrollDir === 'down';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[60] section-pad"
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="glass-strong rounded-2xl mt-3 px-4 md:px-6 py-2.5 flex items-center justify-between relative">           {/* Brand Block (Left side) */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            {/* FIFA Logo Box */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden border border-white/10 flex-shrink-0"
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

            <div className="hidden sm:flex flex-col justify-center text-left flex-shrink-0">
              <p 
                className="font-heading text-xs sm:text-sm md:text-base font-bold tracking-wider leading-none whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                FIFA World Cup 2026
              </p>
              <p className="text-[9px] sm:text-[10px] font-accent tracking-widest uppercase mt-1 select-none leading-none whitespace-nowrap">
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
            <div className="flex md:hidden lg:flex flex-1 justify-center mx-2 sm:mx-4 flex-shrink-0">
              <div 
                className="flex items-center gap-1.5 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 bg-black/60 backdrop-blur-md flex-shrink-0"
              >
                {/* Live Pulse Dot */}
                <div className="flex items-center justify-center flex-shrink-0 ml-0.5">
                  <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full animate-pulse flex-shrink-0"></span>
                </div>

                {/* Matchup Details */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  {/* Home Team */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {nextMatch.homeTeam ? (
                      <>
                        <img 
                          src={`https://flagcdn.com/w40/${nextMatch.homeTeam.flagCode.toLowerCase()}.png`} 
                          alt={nextMatch.homeTeam.name} 
                          className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full object-cover border border-white/20 shadow-sm flex-shrink-0" 
                        />
                        <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider font-outfit whitespace-nowrap flex-shrink-0">
                          {nextMatch.homeTeam.code}
                        </span>
                      </>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] font-bold text-white/60 tracking-wider whitespace-nowrap flex-shrink-0">
                        {isTbdRound ? 'TBD' : (nextMatch.homeTeamPlaceholder || nextMatch.homePlaceholder || 'TBD')}
                      </span>
                    )}
                  </div>

                  {/* VS Divider */}
                  <span className="font-outfit font-black italic text-[9px] sm:text-[10px] text-white/30 tracking-widest px-0.5 flex-shrink-0 select-none">
                    VS
                  </span>

                  {/* Away Team */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {nextMatch.awayTeam ? (
                      <>
                        <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider font-outfit whitespace-nowrap flex-shrink-0">
                          {nextMatch.awayTeam.code}
                        </span>
                        <img 
                          src={`https://flagcdn.com/w40/${nextMatch.awayTeam.flagCode.toLowerCase()}.png`} 
                          alt={nextMatch.awayTeam.name} 
                          className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full object-cover border border-white/20 shadow-sm flex-shrink-0" 
                        />
                      </>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] font-bold text-white/60 tracking-wider whitespace-nowrap flex-shrink-0">
                        {isTbdRound ? 'TBD' : (nextMatch.awayTeamPlaceholder || nextMatch.awayPlaceholder || 'TBD')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Separator line */}
                <div className="w-px h-3.5 bg-white/20 flex-shrink-0"></div>

                {/* Date / Kickoff Time */}
                <div className="text-[8px] sm:text-[10.5px] font-bold tracking-wider text-[#FFD700] font-outfit uppercase whitespace-nowrap flex-shrink-0">
                  {new Date(nextMatch.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase()} • {nextMatch.kickoffIST}
                </div>
              </div>
            </div>
          )}

          {/* Desktop nav links (Right side on desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.label === 'Fixtures') {
                const isFixturesActive = location.pathname === '/fixtures' || location.pathname === '/bracket';
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setFixturesDropdownOpen(true)}
                    onMouseLeave={() => setFixturesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={`relative px-3 py-2 text-sm font-accent tracking-wide transition-colors duration-200 rounded-lg flex items-center gap-1 cursor-default
                        ${isFixturesActive ? 'text-white' : 'text-white/60 hover:text-white/90'}
                      `}
                    >
                      {item.label}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform duration-200 ${fixturesDropdownOpen ? 'rotate-180 text-white' : 'text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                      {isFixturesActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                          style={{ background: 'var(--theme-primary)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {fixturesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-40 bg-[#151515]/95 border border-white/10 rounded-xl shadow-2xl py-2 backdrop-blur-md z-[70] overflow-hidden"
                        >
                          <Link
                            to="/fixtures"
                            className={`block px-4 py-2 text-xs font-accent tracking-wider uppercase hover:bg-white/5 hover:text-white transition-colors text-left
                              ${location.pathname === '/fixtures' ? 'text-white bg-white/5 font-bold' : 'text-white/60'}
                            `}
                          >
                            Fixtures
                          </Link>
                          <Link
                            to="/bracket"
                            className={`block px-4 py-2 text-xs font-accent tracking-wider uppercase hover:bg-white/5 hover:text-white transition-colors text-left
                              ${location.pathname === '/bracket' ? 'text-white bg-white/5 font-bold' : 'text-white/60'}
                            `}
                          >
                            Bracket
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

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
        navItems={(() => {
          const mobileNavItems = [];
          navItems.forEach(item => {
            mobileNavItems.push(item);
            if (item.label === 'Fixtures') {
              mobileNavItems.push({ label: 'Bracket', path: '/bracket' });
            }
          });
          return mobileNavItems;
        })()}
      />
    </>
  );
}
