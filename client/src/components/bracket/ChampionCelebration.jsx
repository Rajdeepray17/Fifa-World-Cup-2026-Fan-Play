import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ChampionCelebration = ({ champion, onClose }) => {
  useEffect(() => {
    // Trigger confetti explosion
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: [champion.theme.primary, champion.theme.secondary, '#FFD700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: [champion.theme.primary, champion.theme.secondary, '#FFD700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [champion]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.5, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="relative bg-[#1a1a1a] border-4 border-gold p-12 rounded-3xl text-center shadow-[0_0_100px_rgba(255,215,0,0.5)] max-w-2xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl md:text-3xl font-inter font-semibold text-white/70 tracking-widest uppercase mb-4">
            WORLD CHAMPIONS 2026
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-outfit font-bold text-gold tracking-wider mb-8">
            {champion.name}
          </h1>

          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Glowing background */}
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-50 animate-pulse"
              style={{ backgroundColor: champion.theme.primary }}
            />
            
            <img 
              src={`https://flagcdn.com/w320/${champion.flagCode}.png`} 
              alt={champion.name}
              className="relative z-10 w-full h-full object-cover rounded-full border-8 border-gold shadow-2xl"
              onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
            />
          </div>

          <button 
            onClick={onClose}
            className="bg-gold text-black px-10 py-4 rounded-full font-bold text-xl uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Return to Bracket
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChampionCelebration;
