import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Footer — Persistent bottom anchor containing legal copy,
 * social links, navigation placeholders, and team customizations.
 */
export default function Footer() {
  const { selectedNation } = useTheme();

  return (
    <footer 
      className="border-t relative overflow-hidden bg-[#07070a]"
      style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
    >
      {/* Subtle dynamic glow */}
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full filter blur-[150px] pointer-events-none opacity-[0.08]"
        style={{ background: 'var(--theme-primary)' }}
      />
      <div 
        className="absolute top-0 left-0 w-60 h-60 rounded-full filter blur-[120px] pointer-events-none opacity-[0.05]"
        style={{ background: 'var(--theme-accent)' }}
      />

      <div className="section-pad py-12 md:py-16 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden border border-white/10"
                style={{
                  background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`,
                }}
              >
                <img
                  src="/assets/images/FIFA Logo.png"
                  alt="FIFA"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="font-heading text-lg font-bold tracking-wider text-white">
                FIFA World Cup 2026
              </span>
            </div>
            <p className="font-sans text-xs md:text-sm text-white/50 leading-relaxed max-w-sm">
              The premium, highly immersive digital experience companion for the historic 2026 FIFA World Cup. Follow the expansion to 48 nations across USA, Canada, and Mexico.
            </p>
          </div>

          {/* Column 2: Navigation links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs tracking-[0.2em] uppercase font-bold text-white/90">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-accent">
              <Link to="/" className="text-white/60 hover:text-white transition-colors py-1">Home</Link>
              <Link to="/activity" className="text-white/60 hover:text-white transition-colors py-1">Activity</Link>
              <Link to="/groups" className="text-white/60 hover:text-white transition-colors py-1">Groups</Link>
              <Link to="/fixtures" className="text-white/60 hover:text-white transition-colors py-1">Fixtures</Link>
              <Link to="/memories" className="text-white/60 hover:text-white transition-colors py-1">Memories</Link>
              {/* <Link to="/your-team" className="text-white/60 hover:text-white transition-colors py-1">Your Team</Link> */}
            </div>
          </div>

          {/* Column 3: Social details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading text-xs tracking-[0.2em] uppercase font-bold text-white/90">
              Connect With Me
            </h4>
            
            <div className="flex items-center gap-3">
              {/* Email */}
              <a 
                href="mailto:rajdeepray@example.com" 
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 shadow-sm"
                title="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 shadow-sm"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 shadow-sm"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 shadow-sm"
                title="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>

            {selectedNation && (
              <p className="text-[10px] font-accent tracking-widest text-white/40 uppercase mt-2">
                Supporting: <span style={{ color: 'var(--theme-primary)' }} className="font-bold">{selectedNation.name}</span>
              </p>
            )}
          </div>

        </div>

        {/* Copyright & Legal */}
        <div 
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-white/35 font-sans"
          style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <p>© 2026 FIFA World Cup Digital Hub. All rights reserved by Rajdeep Ray.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">FIFA Rules</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
