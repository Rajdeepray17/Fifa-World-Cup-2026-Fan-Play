import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const JourneyModal = ({ champion, onClose }) => {
  if (!champion) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#111] border border-[#BF953F]/50 w-full max-w-3xl rounded-xl shadow-[0_0_50px_rgba(191,149,63,0.15)] overflow-hidden relative flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black rounded-full border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>

          {/* Left: Image side */}
          <div className="w-full md:w-5/12 h-64 md:h-auto relative">
            <img 
              src={champion.image} 
              alt={`${champion.winner} ${champion.year}`}
              className="w-full h-full object-cover filter grayscale opacity-80"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518605368461-1ee7c93608ce?q=80&w=600&auto=format&fit=crop' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r" />
          </div>

          {/* Right: Content side */}
          <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-center relative">
             <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <span className="font-outfit font-black text-8xl italic">{champion.year}</span>
             </div>

             <h4 className="text-[#BF953F] font-accent tracking-[0.3em] uppercase text-sm mb-2">
               {champion.year} Champions
             </h4>
             <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white uppercase mb-6 leading-none">
               {champion.winner}
             </h2>

             <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                   <span className="text-white/40 uppercase text-xs font-accent tracking-widest">Host Nation</span>
                   <span className="text-white/90 font-semibold">{champion.host}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                   <span className="text-white/40 uppercase text-xs font-accent tracking-widest">Runner-Up</span>
                   <span className="text-white/90 font-semibold">{champion.runnerUp}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                   <span className="text-white/40 uppercase text-xs font-accent tracking-widest">Final Score</span>
                   <span className="text-[#FFD700] font-bold">{champion.score}</span>
                </div>
             </div>

             <div className="relative">
                <span className="absolute -top-4 -left-4 text-4xl text-white/10 font-serif">"</span>
                <p className="text-white/70 leading-relaxed font-light text-sm md:text-base relative z-10 italic">
                   {champion.story}
                </p>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JourneyModal;
