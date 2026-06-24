import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import NationStatusModal from './NationStatusModal';

const GroupTable = ({ letter, teams, selectedNationCode, theme }) => {
  const { globalFixtures } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedNationForStatus, setSelectedNationForStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('fifa-wc2026-admin-pin') === 'BRAZIL0407');
  }, []);

  // Helper to compare IDs safely (handles populate object vs string ID)
  const sameId = (id1, id2) => {
    if (!id1 || !id2) return false;
    const s1 = typeof id1 === 'object' ? (id1._id || id1) : id1;
    const s2 = typeof id2 === 'object' ? (id2._id || id2) : id2;
    return s1.toString() === s2.toString();
  };

  // Helper to find H2H winner between teamA and teamB in Group Stage
  const getH2HWinner = (teamA, teamB) => {
    if (!globalFixtures) return null;
    const match = globalFixtures.find(f => 
      f.round === 'Group Stage' &&
      f.status === 'Completed' &&
      ((sameId(f.homeTeam, teamA) && sameId(f.awayTeam, teamB)) ||
       (sameId(f.homeTeam, teamB) && sameId(f.awayTeam, teamA)))
    );

    if (!match) return null;

    const winnerId = match.winner?._id || match.winner;
    if (!winnerId) return 'draw';

    if (sameId(winnerId, teamA)) {
      return teamA._id;
    }
    return teamB._id;
  };

  // Sort teams: Points -> H2H -> Goal Difference -> Goals For -> Goals Against (Ascending) -> FIFA Rank
  const sortedTeams = [...teams].sort((a, b) => {
    if ((b.points || 0) !== (a.points || 0)) {
      return (b.points || 0) - (a.points || 0);
    }
    
    // Head-to-Head (H2H)
    const h2hWinner = getH2HWinner(a, b);
    if (h2hWinner && h2hWinner !== 'draw') {
      return sameId(h2hWinner, a) ? -1 : 1;
    }

    if ((b.goalDifference || 0) !== (a.goalDifference || 0)) {
      return (b.goalDifference || 0) - (a.goalDifference || 0);
    }
    if ((b.goalsFor || 0) !== (a.goalsFor || 0)) {
      return (b.goalsFor || 0) - (a.goalsFor || 0);
    }
    if ((b.goalsAgainst || 0) !== (a.goalsAgainst || 0)) {
      return (a.goalsAgainst || 0) - (b.goalsAgainst || 0); // smaller GA is better
    }
    return (a.fifaRank || 999) - (b.fifaRank || 999);
  });

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-full">
        {/* Header */}
        <div className="bg-black/50 py-3 px-4 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-outfit font-bold text-[#FFD700] tracking-wider uppercase">
            Group {letter}
          </h2>
          {isAdmin && (
            <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded font-mono uppercase tracking-widest">
              Admin Mode
            </span>
          )}
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
            const isQualified = team.status === 'Qualified';
            const isEliminated = team.status === 'Eliminated';
            const isThirdPlaceQualified = isQualified && index === 2;

            // Custom border styles
            let borderLeftClass = 'border-l-4 border-l-transparent';
            let customBorderColor = 'transparent';
            if (isSelected) {
              borderLeftClass = 'border-l-4';
              customBorderColor = theme?.primary || '#FFD700';
            } else if (isThirdPlaceQualified) {
              borderLeftClass = 'border-l-4';
              customBorderColor = '#10B981'; // Green
            } else if (isQualified) {
              borderLeftClass = 'border-l-4';
              customBorderColor = '#D4AF37'; // Gold
            } else if (isEliminated) {
              borderLeftClass = 'border-l-4';
              customBorderColor = 'rgba(239, 68, 68, 0.2)'; // Faint red
            }

            // Custom row background
            let rowBgClass = 'hover:bg-white/5';
            let customBoxShadow = 'none';
            if (isSelected) {
              rowBgClass = 'bg-gradient-to-r from-[var(--theme-primary-10)] to-transparent';
              customBoxShadow = `inset 0 0 20px ${theme?.primary}20`;
            } else if (isThirdPlaceQualified) {
              rowBgClass = 'bg-gradient-to-r from-[#10B981]/5 via-transparent to-transparent hover:from-[#10B981]/10';
              customBoxShadow = `inset 0 0 15px rgba(16, 185, 129, 0.05)`;
            } else if (isQualified) {
              rowBgClass = 'bg-gradient-to-r from-[#FFD700]/5 via-transparent to-transparent hover:from-[#FFD700]/10';
              customBoxShadow = `inset 0 0 15px rgba(255, 215, 0, 0.05)`;
            } else if (isEliminated) {
              rowBgClass = 'opacity-35 hover:bg-white/10 grayscale-[30%]';
            }

            return (
              <motion.div 
                key={team._id}
                onClick={isAdmin ? () => {
                  setSelectedNationForStatus(team);
                  setIsModalOpen(true);
                } : null}
                title={isAdmin ? "Click to manage team status (Admin)" : ""}
                className={`grid grid-cols-12 gap-1 py-3 px-4 items-center border-b border-white/5 last:border-b-0 transition-all ${
                  isAdmin ? 'cursor-pointer hover:border-white/20' : ''
                } ${borderLeftClass} ${rowBgClass}`}
                style={{
                  borderColor: customBorderColor,
                  boxShadow: customBoxShadow
                }}
                whileHover={{ x: 2 }}
              >
                {/* Rank */}
                <div className={`col-span-1 text-center text-sm font-bold ${
                  isThirdPlaceQualified ? 'text-[#10B981]' : (isQualified ? 'text-[#FFD700]' : (isTopTwo ? 'text-white' : 'text-white/30'))
                }`}>
                  {index + 1}
                </div>
                
                {/* Nation */}
                <div className="col-span-5 flex items-center space-x-2 sm:space-x-3 overflow-hidden">
                  <img 
                    src={`https://flagcdn.com/w40/${team.flagCode}.png`} 
                    alt={team.name}
                    className={`w-5 sm:w-6 h-auto rounded shadow-sm object-cover ${
                      isSelected ? 'ring-2' : (isThirdPlaceQualified ? 'ring-2 ring-[#10B981]/40' : (isQualified ? 'ring-2 ring-[#FFD700]/40' : ''))
                    }`}
                    style={{ ringColor: isSelected ? theme?.primary : (isThirdPlaceQualified ? '#10B981' : (isQualified ? '#FFD700' : 'transparent')) }}
                    onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
                  />
                  <span className={`text-sm font-semibold truncate ${
                    isThirdPlaceQualified ? 'text-[#10B981] font-black' : (isQualified ? 'text-[#FFD700] font-black' : (isSelected ? 'text-white' : 'text-white/80'))
                  }`}>
                    {team.name}
                  </span>
                  
                  {/* Qualification Badges */}
                  {isThirdPlaceQualified && (
                    <span 
                      className="bg-gradient-to-r from-[#10B981] to-[#059669] text-black font-black text-[8px] sm:text-[9px] px-1 rounded shadow-md tracking-wider uppercase flex-shrink-0"
                      title="Qualified (Third Place)"
                    >
                      Q
                    </span>
                  )}
                  {!isThirdPlaceQualified && isQualified && (
                    <span 
                      className="bg-gradient-to-r from-[#BF953F] to-[#B38728] text-black font-black text-[8px] sm:text-[9px] px-1 rounded shadow-md tracking-wider uppercase flex-shrink-0"
                      title="Qualified"
                    >
                      Q
                    </span>
                  )}
                  {isEliminated && (
                    <span 
                      className="bg-red-500/10 text-red-400 font-bold border border-red-500/30 text-[8px] sm:text-[9px] px-1 rounded tracking-wide uppercase flex-shrink-0"
                      title="Eliminated"
                    >
                      E
                    </span>
                  )}
                </div>
                
                {/* Stats */}
                <div className="col-span-1 text-center text-sm text-white/50">{team.played || 0}</div>
                <div className="col-span-1 text-center text-sm text-white/50">{team.wins || 0}</div>
                <div className="col-span-1 text-center text-sm text-white/50">{team.draws || 0}</div>
                <div className="col-span-1 text-center text-sm text-white/50">{team.losses || 0}</div>
                <div className="col-span-1 text-center text-sm text-white/50">
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference || 0}
                </div>
                <div className="col-span-1 text-center text-sm font-bold text-white">{team.points || 0}</div>
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

      <NationStatusModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedNationForStatus(null);
        }}
        nation={selectedNationForStatus}
      />
    </>
  );
};

export default GroupTable;
