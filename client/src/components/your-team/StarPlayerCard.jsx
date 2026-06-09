import React from 'react';
import { motion } from 'framer-motion';

const StarPlayerCard = ({ player, theme }) => {
  return (
    <motion.div 
      className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-lg relative group cursor-pointer"
      whileHover={{ y: -5 }}
      style={{
        boxShadow: `inset 0 0 0 1px transparent`,
      }}
    >
      {/* Background Gradient on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${theme?.primary}, transparent)` }}
      />
      
      {/* Top Banner / Image Area */}
      <div className="h-32 bg-black/50 flex flex-col items-center justify-center relative border-b border-white/5">
         <div 
           className="absolute top-0 left-0 w-full h-1"
           style={{ backgroundColor: theme?.primary }}
         />
         <div className="w-16 h-16 rounded-full border-2 border-white/20 bg-black flex items-center justify-center text-2xl font-bold overflow-hidden">
            {player.image ? (
               <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
            ) : (
               <span className="text-white/30">{player.shirtNumber}</span>
            )}
         </div>
      </div>

      {/* Content */}
      <div className="p-5 text-center relative z-10">
         <h3 className="text-xl font-outfit font-bold text-white truncate mb-1" title={player.name}>
            {player.name}
         </h3>
         <p className="text-[#FFD700] text-sm font-semibold tracking-widest uppercase mb-4">
            {player.position}
         </p>

         <div className="grid grid-cols-2 gap-2 text-xs text-white/50 mb-4">
            <div className="bg-white/5 py-2 rounded flex flex-col items-center">
               <span className="block font-bold text-white/80">{player.caps}</span>
               <span>Caps</span>
            </div>
            <div className="bg-white/5 py-2 rounded flex flex-col items-center">
               <span className="block font-bold text-white/80">{player.goals}</span>
               <span>Goals</span>
            </div>
         </div>

         <div className="text-sm font-semibold text-white/60 truncate bg-black/40 py-1.5 rounded" title={player.club}>
            {player.club}
         </div>
      </div>
    </motion.div>
  );
};

export default StarPlayerCard;
