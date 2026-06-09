import React from 'react';
import { motion } from 'framer-motion';

const MatchCard = ({ fixture, selectedNationCode, theme }) => {
  // Timezone logic: Convert to IST natively
  const matchDate = new Date(fixture.date);
  const formattedTime = matchDate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const formattedDate = matchDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', month: 'long', day: 'numeric' });

  // Resolve teams or placeholders
  const home = fixture.homeTeam || { name: fixture.homeTeamPlaceholder || 'TBD', flagCode: 'un', code: 'TBD' };
  const away = fixture.awayTeam || { name: fixture.awayTeamPlaceholder || 'TBD', flagCode: 'un', code: 'TBD' };

  // Theme highlighting
  const isHomeSelected = selectedNationCode === home.code;
  const isAwaySelected = selectedNationCode === away.code;
  const isMatchSelected = isHomeSelected || isAwaySelected;

  return (
    <div 
      className={`relative bg-[#1a1a1a] rounded-xl overflow-hidden border transition-all ${
        isMatchSelected ? 'border-transparent shadow-lg' : 'border-white/10 hover:border-white/20'
      }`}
      style={{
        boxShadow: isMatchSelected ? `0 0 20px ${theme?.primary}40` : '',
        borderColor: isMatchSelected ? theme?.primary : ''
      }}
    >
      {/* Top Bar */}
      <div className="bg-black/40 px-4 py-2 border-b border-white/5 flex justify-between items-center text-xs md:text-sm text-white/50 font-semibold tracking-wide">
        <div className="flex space-x-2 items-center">
          <span className="text-[#FFD700]">{fixture.round}</span>
          {fixture.group && <span>• Group {fixture.group}</span>}
          <span>• Match {fixture.matchNumber}</span>
        </div>
        <div className="flex space-x-2 items-center">
          <span>{formattedDate}</span>
          <span className="bg-white/10 text-white px-2 py-0.5 rounded text-[10px] font-bold">IST</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 md:p-6 grid grid-cols-3 items-center gap-4">
        
        {/* Home Team */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className={`w-16 h-12 md:w-24 md:h-16 flex items-center justify-center overflow-hidden rounded shadow-lg ${isHomeSelected ? 'ring-2 ring-offset-2 ring-offset-[#1a1a1a]' : ''}`} style={{ ringColor: isHomeSelected ? theme?.primary : '' }}>
            {home.flagCode === 'un' ? (
               <div className="w-full h-full bg-white/5 flex items-center justify-center">
                 <span className="text-white/20 font-bold text-xl">?</span>
               </div>
            ) : (
              <img 
                src={`https://flagcdn.com/w160/${home.flagCode}.png`} 
                alt={home.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
              />
            )}
          </div>
          <span className={`font-outfit font-bold text-sm md:text-lg ${isHomeSelected ? 'text-white' : 'text-white/80'}`}>
            {home.name}
          </span>
        </div>

        {/* Center VS & Time */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-2xl md:text-3xl font-bold font-outfit text-white mb-1">
             {formattedTime}
          </div>
          {fixture.status === 'Scheduled' && (
            <span className="text-xs font-semibold text-white/40 tracking-widest uppercase">
              VS
            </span>
          )}
          {fixture.status !== 'Scheduled' && (
            <div className="flex items-center space-x-2 text-[#FFD700] font-bold text-xl">
               <span>{fixture.score.home}</span>
               <span className="text-white/30">-</span>
               <span>{fixture.score.away}</span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className={`w-16 h-12 md:w-24 md:h-16 flex items-center justify-center overflow-hidden rounded shadow-lg ${isAwaySelected ? 'ring-2 ring-offset-2 ring-offset-[#1a1a1a]' : ''}`} style={{ ringColor: isAwaySelected ? theme?.primary : '' }}>
            {away.flagCode === 'un' ? (
               <div className="w-full h-full bg-white/5 flex items-center justify-center">
                 <span className="text-white/20 font-bold text-xl">?</span>
               </div>
            ) : (
              <img 
                src={`https://flagcdn.com/w160/${away.flagCode}.png`} 
                alt={away.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
              />
            )}
          </div>
          <span className={`font-outfit font-bold text-sm md:text-lg ${isAwaySelected ? 'text-white' : 'text-white/80'}`}>
            {away.name}
          </span>
        </div>

      </div>

      {/* Bottom Bar: Stadium */}
      <div className="bg-black/20 px-4 py-2 border-t border-white/5 text-center text-xs text-white/40 flex justify-center items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>
          {fixture.stadium ? `${fixture.stadium.name}, ${fixture.stadium.city}` : 'Stadium TBD'}
        </span>
      </div>
    </div>
  );
};

export default MatchCard;
