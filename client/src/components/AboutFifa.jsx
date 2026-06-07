import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutFifa — Split 50/50 section highlighting World Cup history
 * and the landmark 2026 expansion.
 */
export default function AboutFifa() {
  return (
    <section className="section-pad py-16 md:py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full filter blur-[120px] pointer-events-none opacity-20"
        style={{ background: 'var(--theme-primary)' }}
      />

      <div className="max-w-6xl mx-auto glass rounded-3xl p-6 md:p-12 relative z-10 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Logo Column */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group w-full max-w-sm">
              {/* Outer glow overlay */}
              <div 
                className="absolute inset-0 rounded-2xl filter blur-xl opacity-15 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-accent))' }}
              />
              {/* Card content container */}
              <div className="relative bg-[#0b0b10]/60 border border-white/10 rounded-2xl p-10 md:p-14 backdrop-blur-md shadow-xl flex items-center justify-center">
                <img 
                  src="/assets/images/FIFA Logo.png" 
                  alt="FIFA World Cup Logo" 
                  className="w-44 md:w-56 h-auto drop-shadow-[0_0_30px_rgba(196,164,74,0.35)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Description Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-5 md:gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tagline */}
            <span 
              className="font-accent text-xs md:text-sm tracking-[0.25em] uppercase font-semibold block"
              style={{ color: 'var(--theme-secondary)' }}
            >
              Governing the Beautiful Game
            </span>

            {/* Title */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-wider text-gradient font-bold leading-tight uppercase">
              About FIFA
            </h2>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4 text-white/70 font-sans text-sm md:text-base leading-relaxed">
              <p>
                <strong className="text-white font-medium">FIFA</strong> (Fédération Internationale de Football Association) is the international governing body of association football, beach soccer, and futsal. Founded in 1904, it oversees major international tournaments and manages the global rules of the game.
              </p>
              <p>
                The <strong className="text-white font-medium">FIFA World Cup</strong> is the most prestigious association football tournament in the world, held every four years. It brings together national teams from across the globe in a month-long celebration of sport, culture, and competition.
              </p>
              <p 
                className="border-l-[3px] pl-4 py-1.5" 
                style={{ borderColor: 'var(--theme-primary)' }}
              >
                The <strong className="text-white font-medium">FIFA World Cup 2026</strong> will be a historic edition, hosted across three North American nations: Canada, Mexico, and the United States. For the first time, the tournament will feature <strong className="text-white font-medium">48 teams</strong>, expanding the global reach of the "beautiful game."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
