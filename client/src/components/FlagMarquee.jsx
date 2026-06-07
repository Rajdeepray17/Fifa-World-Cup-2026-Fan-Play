import React from 'react';

/**
 * FlagMarquee — Premium sliding flag marquee.
 * Double-row layout scrolling in opposite directions.
 * Displays only the 47 officially qualified nations for the 2026 World Cup.
 * Uses FlagCDN for rendering actual flag images on Windows systems.
 */

const marqueeNations = [
  { code: 'ar', name: 'Argentina' },
  { code: 'au', name: 'Australia' },
  { code: 'at', name: 'Austria' },
  { code: 'be', name: 'Belgium' },
  { code: 'ba', name: 'Bosnia & Herzegovina' },
  { code: 'br', name: 'Brazil' },
  { code: 'ca', name: 'Canada' },
  { code: 'cv', name: 'Cape Verde' },
  { code: 'co', name: 'Colombia' },
  { code: 'hr', name: 'Croatia' },
  { code: 'cw', name: 'Curaçao' },
  { code: 'cz', name: 'Czechia' },
  { code: 'cd', name: 'DR Congo' },
  { code: 'ec', name: 'Ecuador' },
  { code: 'eg', name: 'Egypt' },
  { code: 'gb-eng', name: 'England' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'gh', name: 'Ghana' },
  { code: 'ht', name: 'Haiti' },
  { code: 'ir', name: 'Iran' },
  { code: 'iq', name: 'Iraq' },
  { code: 'ci', name: 'Ivory Coast' },
  { code: 'jp', name: 'Japan' },
  { code: 'jo', name: 'Jordan' },
  { code: 'mx', name: 'Mexico' },
  { code: 'ma', name: 'Morocco' },
  { code: 'nl', name: 'Netherlands' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'no', name: 'Norway' },
  { code: 'pa', name: 'Panama' },
  { code: 'py', name: 'Paraguay' },
  { code: 'pt', name: 'Portugal' },
  { code: 'qa', name: 'Qatar' },
  { code: 'sa', name: 'Saudi Arabia' },
  { code: 'gb-sct', name: 'Scotland' },
  { code: 'sn', name: 'Senegal' },
  { code: 'za', name: 'South Africa' },
  { code: 'kr', name: 'South Korea' },
  { code: 'es', name: 'Spain' },
  { code: 'se', name: 'Sweden' },
  { code: 'ch', name: 'Switzerland' },
  { code: 'tn', name: 'Tunisia' },
  { code: 'tr', name: 'Türkiye' },
  { code: 'us', name: 'United States' },
  { code: 'uy', name: 'Uruguay' },
  { code: 'uz', name: 'Uzbekistan' },
];

const row1Nations = marqueeNations.slice(0, 24);
const row2Nations = marqueeNations.slice(24);

export default function FlagMarquee() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--bg-deep) 0%, transparent 100%)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, var(--bg-deep) 0%, transparent 100%)' }}
      />

      {/* Top separator */}
      <div
        className="w-full h-[1px] mb-8"
        style={{ background: 'linear-gradient(90deg, transparent, var(--theme-primary-10), transparent)' }}
      />

      {/* Label */}
      <div className="text-center mb-8">
        <p className="font-accent text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/25">
          48 Nations — One Dream
        </p>
        <h3 className="font-heading text-xl md:text-2xl lg:text-3xl tracking-wider text-gradient mt-2 select-none uppercase font-bold">
          Qualified Teams
        </h3>
      </div>

      {/* Row 1 scrolling left-to-right (reverse) */}
      <div className="relative overflow-hidden mb-5">
        <div className="marquee-track-reverse gap-4">
          {[...row1Nations, ...row1Nations].map((nation, i) => (
            <div
              key={`row1-${i}`}
              className="flex items-center gap-3 px-5 py-3 mx-2 rounded-xl glass border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 select-none cursor-default"
            >
              <img
                src={`https://flagcdn.com/w80/${nation.code}.png`}
                alt={nation.name}
                className="w-8 sm:w-9 h-5 sm:h-5.5 object-cover rounded shadow-sm"
                loading="lazy"
              />
              <span className="font-accent text-xs tracking-wider font-semibold text-white/70">
                {nation.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 scrolling right-to-left */}
      <div className="relative overflow-hidden">
        <div className="marquee-track gap-4">
          {[...row2Nations, ...row2Nations].map((nation, i) => (
            <div
              key={`row2-${i}`}
              className="flex items-center gap-3 px-5 py-3 mx-2 rounded-xl glass border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 select-none cursor-default"
            >
              <img
                src={`https://flagcdn.com/w80/${nation.code}.png`}
                alt={nation.name}
                className="w-8 sm:w-9 h-5 sm:h-5.5 object-cover rounded shadow-sm"
                loading="lazy"
              />
              <span className="font-accent text-xs tracking-wider font-semibold text-white/70">
                {nation.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="w-full h-[1px] mt-8"
        style={{ background: 'linear-gradient(90deg, transparent, var(--theme-primary-10), transparent)' }}
      />
    </section>
  );
}
