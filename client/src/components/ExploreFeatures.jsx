import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * ExploreFeatures — Interactive card grid showcasing the 7 pages of the app.
 * Cards feature custom World Cup background images with subtle hover reveal effects.
 */

const features = [
  {
    title: 'Home',
    path: '/',
    description: 'The central dashboard of your World Cup experience. View personalized news, stats, and custom highlights.',
    tagline: 'Tournament Gateway',
    image: '/assets/images/Home.jpeg',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Activity',
    path: '/activity',
    description: 'Interactive play area featuring the Bracket Predictor, customizable Squad Builder, and Trivia challenges.',
    tagline: 'Predict & Play',
    image: '/assets/images/Activity.jpeg',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'Groups',
    path: '/groups',
    description: 'Real-time standings, goals scored, and progress updates for all 12 groups (A to L) in the tournament.',
    tagline: 'Table Standings',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" />
        <path d="M21 9H3M21 15H3M12 3v18" />
      </svg>
    ),
  },
  {
    title: 'Fixtures',
    path: '/fixtures',
    description: 'Full match schedules localized in IST. Follow teams from the group stage through the knockout brackets.',
    tagline: 'Match Schedules',
    image: '/assets/images/Fixtures.jpeg',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Memories',
    path: '/memories',
    description: 'A nostalgic scroll through historic World Cup moments, iconic goals, legends, and memorable highlights.',
    tagline: 'Football Heritage',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Your Team',
    path: '/your-team',
    description: 'Deep dive into your selected team\'s statistics, roster, manager info, tactical analysis, and custom hub theme.',
    tagline: 'Personalized Hub',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=600&auto=format&fit=crop',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Contact',
    path: '/contact',
    description: 'Learn more about the developer behind this World Cup Hub, their football passion, and connect on socials.',
    tagline: 'Developer Space',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    icon: (color) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 120, damping: 14 } 
  },
};

export default function ExploreFeatures() {
  return (
    <section className="section-pad py-16 md:py-24 relative overflow-hidden bg-gradient-to-t from-transparent to-[#07070a]/20">
      {/* Background Glow */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[350px] h-[250px] md:h-[350px] rounded-full filter blur-[100px] pointer-events-none opacity-10"
        style={{ background: 'var(--theme-accent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p 
            className="font-accent text-xs md:text-sm tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: 'var(--theme-secondary)' }}
          >
            Digital Ecosystem
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-wider text-gradient font-bold uppercase">
            Explore More Features
          </h2>
          <p className="font-sans text-white/50 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Navigate through all tournament modules. Hover over each card to preview what lies ahead in your ultimate World Cup companion experience.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <Link key={feature.title} to={feature.path} className="group block w-full h-full">
              <motion.div 
                className="relative h-60 rounded-2xl glass p-6 md:p-8 flex flex-col justify-between overflow-hidden border border-white/5 hover:border-theme-primary/30 hover:shadow-2xl transition-all duration-500 cursor-pointer shadow-lg"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
                }}
              >
                {/* Background Image Card Cover */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover opacity-[0.08] group-hover:opacity-20 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
                </div>

                {/* Background gradient card hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(circle at 10% 20%, var(--theme-primary) 0%, transparent 60%)`
                  }}
                />

                {/* Top: Icon + Tagline */}
                <div className="flex items-start justify-between relative z-20">
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-theme-primary/30 bg-[#0d0d12]/80 transition-all duration-300"
                  >
                    {feature.icon('var(--theme-primary)')}
                  </div>
                  <span className="text-[10px] font-accent tracking-widest text-white/40 uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {feature.tagline}
                  </span>
                </div>

                {/* Bottom content with animation */}
                <div className="relative z-20">
                  
                  {/* Default State: Title */}
                  <div className="group-hover:-translate-y-1.5 transition-transform duration-300 ease-out">
                    <h3 className="font-heading text-xl md:text-2xl tracking-wider text-white group-hover:text-gradient font-bold transition-all duration-300 uppercase">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Hover Description (fades/slides in) */}
                  <p className="text-white/60 font-sans text-xs md:text-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500 ease-out">
                    {feature.description}
                  </p>
                </div>

                {/* Dynamic corner border details */}
                <div 
                  className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                  style={{
                    borderRight: '2px solid var(--theme-primary)',
                    borderBottom: '2px solid var(--theme-primary)',
                    borderBottomRightRadius: '1rem'
                  }}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
