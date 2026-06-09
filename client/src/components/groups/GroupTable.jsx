import React from 'react';
import { motion } from 'framer-motion';

const GroupTable = ({ letter, teams, selectedNationCode, theme }) => {
  // Sort teams by rank just to have a deterministic order for now since all have 0 points
  const sortedTeams = [...teams].sort((a, b) => a.fifaRank - b.fifaRank);

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-full">
      {/* Header */}
      <div className="bg-black/50 py-3 px-4 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-xl font-outfit font-bold text-[#FFD700] tracking-wider uppercase">
          Group {letter}
        </h2>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-12 gap-1 py-2 px-4 bg-white/5 text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-wider">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5">Nation</div>
        <div className="col-span-1 text-center" title="Matches Played">MP</div>
        <div className="col-span-1 text-center" title="Wins">W</div>
        <div className="col-span-1 text-center" title="Draws">D</div>
        <div className="col-span-1 text-center" title="Losses">L</div>
        <div className="col-span-1 text-center" title="Goal Difference">GD</div>
        <div className="col-span-1 text-center text-[#FFD700]">Pts</div>
      </div>

      {/* Teams */}
      <div className="flex-1 flex flex-col">
        {sortedTeams.map((team, index) => {
          const isSelected = selectedNationCode === team.code;
          const isTopTwo = index < 2;
          
          return (
            <motion.div 
              key={team._id}
              className={`grid grid-cols-12 gap-1 py-3 px-4 items-center border-b border-white/5 last:border-b-0 transition-all ${
                isSelected 
                  ? 'bg-gradient-to-r from-[var(--theme-primary-10)] to-transparent border-l-4' 
                  : 'hover:bg-white/5 border-l-4 border-l-transparent'
              }`}
              style={{
                borderColor: isSelected ? theme?.primary : 'transparent',
                boxShadow: isSelected ? `inset 0 0 20px ${theme?.primary}20` : 'none'
              }}
              whileHover={{ x: 2 }}
            >
              {/* Rank */}
              <div className={`col-span-1 text-center text-sm font-bold ${isTopTwo ? 'text-white' : 'text-white/30'}`}>
                {index + 1}
              </div>
              
              {/* Nation */}
              <div className="col-span-5 flex items-center space-x-2 sm:space-x-3 overflow-hidden">
                <img 
                  src={`https://flagcdn.com/w40/${team.flagCode}.png`} 
                  alt={team.name}
                  className={`w-5 sm:w-6 h-auto rounded shadow-sm object-cover ${isSelected ? 'ring-2' : ''}`}
                  style={{ ringColor: isSelected ? theme?.primary : 'transparent' }}
                  onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
                />
                <span className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {team.name}
                </span>
              </div>
              
              {/* Stats (Mocked at 0 for now) */}
              <div className="col-span-1 text-center text-sm text-white/50">0</div>
              <div className="col-span-1 text-center text-sm text-white/50">0</div>
              <div className="col-span-1 text-center text-sm text-white/50">0</div>
              <div className="col-span-1 text-center text-sm text-white/50">0</div>
              <div className="col-span-1 text-center text-sm text-white/50">0</div>
              <div className="col-span-1 text-center text-sm font-bold text-white">0</div>
            </motion.div>
          );
        })}
        
        {/* Placeholder if less than 4 teams */}
        {Array.from({ length: Math.max(0, 4 - sortedTeams.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="grid grid-cols-12 gap-1 py-3 px-4 items-center border-b border-white/5 last:border-b-0 opacity-20">
             <div className="col-span-1 text-center text-sm font-bold text-white/30">-</div>
             <div className="col-span-5 flex items-center space-x-3">
               <div className="w-6 h-4 bg-white/20 rounded"></div>
               <span className="text-sm font-semibold text-white/50">TBD</span>
             </div>
             <div className="col-span-1 text-center text-sm text-white/30">-</div>
             <div className="col-span-1 text-center text-sm text-white/30">-</div>
             <div className="col-span-1 text-center text-sm text-white/30">-</div>
             <div className="col-span-1 text-center text-sm text-white/30">-</div>
             <div className="col-span-1 text-center text-sm text-white/30">-</div>
             <div className="col-span-1 text-center text-sm font-bold text-white/30">-</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupTable;
