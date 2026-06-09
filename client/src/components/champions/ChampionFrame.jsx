import React from 'react';
import { motion } from 'framer-motion';

const ChampionFrame = ({ champion, onClick }) => {
  return (
    <motion.div 
      className="relative group cursor-pointer w-full aspect-[4/3] rounded-sm bg-[#111] overflow-hidden"
      onClick={() => onClick(champion)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* The Frame Border */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[12px] border-[#2a2a2a] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
      <div className="absolute inset-0 z-20 pointer-events-none border-[16px] border-[#111]" />
      
      {/* Inner Gold Matting */}
      <div className="absolute inset-[16px] z-10 pointer-events-none border-[2px] border-[#BF953F]/30" />

      {/* The Image */}
      <img 
        src={champion.image} 
        alt={`${champion.winner} ${champion.year}`}
        className="absolute inset-0 w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-90 group-hover:blur-[2px] group-hover:brightness-50 transition-all duration-500"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518605368461-1ee7c93608ce?q=80&w=600&auto=format&fit=crop' }}
      />

      {/* Hover Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 text-center bg-black/40">
         <h3 className="text-[#BF953F] font-outfit font-black text-3xl mb-1 tracking-wider drop-shadow-lg">
           {champion.winner}
         </h3>
         <p className="text-white/90 font-accent tracking-[0.2em] uppercase text-xs mb-4">
           {champion.year}
         </p>
         
         <p className="text-white/80 font-light text-sm italic mb-6 line-clamp-3">
           {champion.description}
         </p>

         <button className="px-6 py-2 border border-[#BF953F] text-[#BF953F] hover:bg-[#BF953F] hover:text-black transition-colors font-semibold text-xs tracking-widest uppercase rounded-sm backdrop-blur-sm">
           Read Journey
         </button>
      </div>

      {/* Small Plaque at the bottom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-b from-[#D4AF37] to-[#AA771C] px-4 py-1 rounded-sm shadow-xl border border-[#FFE55C]/30 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
         <span className="text-black font-serif text-[10px] font-bold uppercase tracking-widest">
           {champion.year}
         </span>
      </div>
    </motion.div>
  );
};

export default ChampionFrame;
