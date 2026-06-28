import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ScoreUpdateModal from '../components/fixtures/ScoreUpdateModal';

// Helper to format score & penalties
const getTeamScoreText = (fixture, isHome) => {
  if (fixture.status === 'Scheduled') return '';
  const score = isHome ? fixture.score?.home : fixture.score?.away;
  const penalties = isHome ? fixture.score?.penalties?.home : fixture.score?.penalties?.away;
  if (penalties !== null && penalties !== undefined) {
    return `${score} (${penalties})`;
  }
  return `${score}`;
};

// Parallelogram Card for a Team in the Bracket
const BracketTeamCard = ({ team, fixture, isHome, isWinner, isLoser, isAdmin }) => {
  const hasScore = fixture && fixture.status !== 'Scheduled';
  const scoreText = fixture ? getTeamScoreText(fixture, isHome) : '';

  let borderStyle = 'border-white/10 bg-[#16161a]';
  let textStyle = 'text-white/80';
  let scoreBg = 'bg-white/5 text-white/90';

  if (fixture && fixture.status !== 'Scheduled') {
    if (isWinner) {
      borderStyle = 'border-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_15px_rgba(255,215,0,0.1)]';
      textStyle = 'text-[#FFD700] font-bold';
      scoreBg = 'bg-[#FFD700]/20 text-[#FFD700]';
    } else if (isLoser) {
      borderStyle = 'border-white/5 bg-[#121215] opacity-50';
      textStyle = 'text-white/40 font-medium';
      scoreBg = 'bg-white/5 text-white/30';
    }
  }

  return (
    <div
      className={`skew-x-[-12deg] border rounded-lg px-3 py-2 flex items-center justify-between transition-all duration-300 ${borderStyle} ${
        isAdmin && fixture ? 'cursor-pointer hover:border-[#FFD700]/40' : ''
      }`}
    >
      <div className="skew-x-[12deg] flex items-center space-x-2.5 overflow-hidden flex-1">
        {team ? (
          <>
            <img
              src={`https://flagcdn.com/w40/${team.flagCode.toLowerCase()}.png`}
              alt={team.name}
              className={`w-5.5 h-3.5 object-cover rounded shadow-sm flex-shrink-0 ${isLoser ? 'grayscale opacity-60' : ''}`}
              onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg'; }}
            />
            <span className={`text-xs md:text-sm truncate select-none tracking-wide uppercase font-accent ${textStyle}`}>
              {team.name}
            </span>
          </>
        ) : (
          <span className="text-xs md:text-sm text-white/20 italic tracking-wider">
            {fixture ? (isHome ? fixture.homeTeamPlaceholder : fixture.awayTeamPlaceholder) || 'TBD' : 'TBD'}
          </span>
        )}
      </div>

      {hasScore && (
        <div className={`skew-x-[12deg] font-outfit text-xs md:text-sm font-black px-2.5 py-0.5 rounded shadow-inner ml-2 flex-shrink-0 ${scoreBg}`}>
          {scoreText}
        </div>
      )}
    </div>
  );
};

// Bracket Match Container encapsulating the Home and Away cards
const BracketMatchCard = ({ match, onMatchClick, isAdmin }) => {
  if (!match) return null;

  const hasWinner = Boolean(match.winner);
  const isHomeWinner = hasWinner && match.homeTeam && (match.winner._id === match.homeTeam._id || match.winner === match.homeTeam._id);
  const isAwayWinner = hasWinner && match.awayTeam && (match.winner._id === match.awayTeam._id || match.winner === match.awayTeam._id);
  const isHomeLoser = hasWinner && match.homeTeam && !isHomeWinner;
  const isAwayLoser = hasWinner && match.awayTeam && !isAwayWinner;

  return (
    <div
      onClick={isAdmin ? () => onMatchClick(match) : null}
      className={`relative w-44 md:w-56 my-3 p-1.5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
        isAdmin ? 'cursor-pointer hover:bg-white/5 hover:border-white/10 hover:shadow-lg' : ''
      }`}
    >
      <div className="absolute -top-2.5 left-4 bg-[#111] border border-white/5 text-[9px] font-bold text-white/40 px-2 py-0.5 rounded-full select-none">
        M {match.matchNumber} {match.group ? `• G ${match.group}` : ''}
      </div>

      <div className="flex flex-col gap-1.5 pt-2">
        <BracketTeamCard
          team={match.homeTeam}
          fixture={match}
          isHome={true}
          isWinner={isHomeWinner}
          isLoser={isHomeLoser}
          isAdmin={isAdmin}
        />
        <BracketTeamCard
          team={match.awayTeam}
          fixture={match}
          isHome={false}
          isWinner={isAwayWinner}
          isLoser={isAwayLoser}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

const Bracket = () => {
  const { globalFixtures } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('fifa-wc2026-admin-pin') === 'BRAZIL0407');
  }, []);

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  if (!globalFixtures) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="loading-ring w-12 h-12"></div>
      </div>
    );
  }

  // Filter matches into official bracket positions
  const getMatchByPosition = (pos) => globalFixtures.find(f => f.bracketPosition === pos);

  // Left side branch
  const leftR32 = ['R32-3', 'R32-6', 'R32-1', 'R32-4', 'R32-12', 'R32-11', 'R32-10', 'R32-9'].map(getMatchByPosition);
  const leftR16 = ['R16-2', 'R16-1', 'R16-3', 'R16-4'].map(getMatchByPosition);
  const leftQF = ['QF-1', 'QF-2'].map(getMatchByPosition);
  const leftSF = ['SF-1'].map(getMatchByPosition);

  // Right side branch
  const rightSF = ['SF-2'].map(getMatchByPosition);
  const rightQF = ['QF-3', 'QF-4'].map(getMatchByPosition);
  const rightR16 = ['R16-5', 'R16-6', 'R16-7', 'R16-8'].map(getMatchByPosition);
  const rightR32 = ['R32-2', 'R32-5', 'R32-7', 'R32-8', 'R32-15', 'R32-14', 'R32-13', 'R32-16'].map(getMatchByPosition);

  // Center pieces
  const finalMatch = getMatchByPosition('FINAL');
  const thirdPlaceMatch = getMatchByPosition('3RD');

  // Resolve podium winners
  const champion = finalMatch?.winner;
  const runnerUp = finalMatch?.winner && finalMatch?.homeTeam && finalMatch?.awayTeam
    ? (finalMatch.winner._id === finalMatch.homeTeam._id ? finalMatch.awayTeam : finalMatch.homeTeam)
    : null;
  const thirdPlaceWinner = thirdPlaceMatch?.winner;

  return (
    <div className="min-h-screen bg-black text-white font-inter pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-[180px] pointer-events-none opacity-[0.07] bg-gradient-to-tr from-[#BF953F] to-[#B38728] z-0" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-outfit font-black tracking-widest uppercase mb-4 text-[#FFD700]">
            OFFICIAL KNOCKOUT BRACKET
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base font-accent tracking-wide">
            Follow the path to glory. Dynamic progression, official mappings, and live updates directly from the Match Centre.
          </p>
          {isAdmin && (
            <span className="inline-block mt-4 text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full font-mono uppercase tracking-widest animate-pulse">
              Admin Edit Mode Enabled
            </span>
          )}
        </motion.div>

        {/* Bracket Scrollable Container */}
        <div className="overflow-x-auto pb-8 rounded-3xl border border-white/5 bg-[#08080a]/60 backdrop-blur-md shadow-3xl min-h-[900px] p-6">
          <div className="flex justify-between items-center min-w-[1400px] h-full gap-2">
            
            {/* LEFT BRANCH (R32 -> R16 -> QF -> SF) */}
            <div className="flex flex-row space-x-6 items-center">
              {/* R32 */}
              <div className="flex flex-col justify-around h-[820px]">
                {leftR32.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>

              {/* R16 */}
              <div className="flex flex-col justify-around h-[820px] py-8">
                {leftR16.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>

              {/* QF */}
              <div className="flex flex-col justify-around h-[820px] py-24">
                {leftQF.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>

              {/* SF */}
              <div className="flex flex-col justify-around h-[820px] py-48">
                {leftSF.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>
            </div>

            {/* CENTER PIECE (Podium + Cup + Final + 3rd Place) */}
            <div className="flex flex-col items-center justify-between w-[320px] h-[820px] py-4 bg-white/[0.01] rounded-2xl border border-white/5 relative">
              
              {/* Trophy Podium Row */}
              <div className="flex flex-col items-center w-full">
                {champion || runnerUp || thirdPlaceWinner ? (
                  <div className="flex flex-col items-center mt-2 w-full px-4">
                    <span className="text-[10px] tracking-[0.25em] font-accent uppercase text-white/30 font-black mb-4">
                      Tournament Podium
                    </span>
                    
                    <div className="flex items-end justify-center gap-2 w-full">
                      {/* 2nd Place */}
                      {runnerUp && (
                        <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[85px] text-center shadow">
                          <span className="text-base">🥈</span>
                          <img
                            src={`https://flagcdn.com/w40/${runnerUp.flagCode.toLowerCase()}.png`}
                            alt=""
                            className="w-8 h-auto rounded border border-white/10 my-1"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                          <span className="font-accent font-black text-[9px] uppercase text-white/80 truncate w-full">
                            {runnerUp.name}
                          </span>
                        </div>
                      )}

                      {/* 1st Place */}
                      {champion && (
                        <div className="flex flex-col items-center p-3 rounded bg-[#FFD700]/5 border-2 border-[#FFD700]/30 w-[100px] text-center shadow-lg -translate-y-2.5">
                          <span className="text-xl">🏆</span>
                          <img
                            src={`https://flagcdn.com/w80/${champion.flagCode.toLowerCase()}.png`}
                            alt=""
                            className="w-10 h-auto rounded border border-[#FFD700]/30 my-1"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                          <span className="font-accent font-black text-[10px] uppercase text-[#FFD700] tracking-wide truncate w-full">
                            {champion.name}
                          </span>
                        </div>
                      )}

                      {/* 3rd Place */}
                      {thirdPlaceWinner && (
                        <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[85px] text-center shadow">
                          <span className="text-base">🥉</span>
                          <img
                            src={`https://flagcdn.com/w40/${thirdPlaceWinner.flagCode.toLowerCase()}.png`}
                            alt=""
                            className="w-8 h-auto rounded border border-white/10 my-1"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                          <span className="font-accent font-black text-[9px] uppercase text-white/80 truncate w-full">
                            {thirdPlaceWinner.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <span className="text-[10px] tracking-[0.25em] font-accent uppercase text-white/20 font-black block">
                      Champion Showcase
                    </span>
                  </div>
                )}
              </div>

              {/* Big Trophy Image & Final Match */}
              <div className="flex flex-col items-center w-full my-6">
                <motion.img
                  src="/assets/images/Trophy.png"
                  alt="FIFA World Cup Trophy"
                  className="w-32 md:w-36 h-auto drop-shadow-[0_0_35px_rgba(255,215,0,0.35)] select-none pointer-events-none mb-6"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                />

                <div className="w-full px-4 flex flex-col items-center">
                  <span className="text-[10px] tracking-[0.25em] font-accent uppercase text-[#FFD700] font-black mb-1 select-none">
                    World Cup Final
                  </span>
                  <BracketMatchCard match={finalMatch} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                </div>
              </div>

              {/* Third Place Match */}
              <div className="w-full px-4 flex flex-col items-center mb-4">
                <span className="text-[10px] tracking-[0.25em] font-accent uppercase text-white/30 font-black mb-1 select-none">
                  Third Place Play-off
                </span>
                <BracketMatchCard match={thirdPlaceMatch} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
              </div>

            </div>

            {/* RIGHT BRANCH (SF <- QF <- R16 <- R32) */}
            <div className="flex flex-row space-x-6 items-center">
              {/* SF */}
              <div className="flex flex-col justify-around h-[820px] py-48">
                {rightSF.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>

              {/* QF */}
              <div className="flex flex-col justify-around h-[820px] py-24">
                {rightQF.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>

              {/* R16 */}
              <div className="flex flex-col justify-around h-[820px] py-8">
                {rightR16.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>

              {/* R32 */}
              <div className="flex flex-col justify-around h-[820px]">
                {rightR32.map((match, i) => (
                  <BracketMatchCard key={match?.id || i} match={match} onMatchClick={handleMatchClick} isAdmin={isAdmin} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-white/30 text-xs mt-8 select-none font-accent tracking-widest uppercase">
          United 2026 • Canada • Mexico • USA
        </div>
      </div>

      {/* Admin Score Update Modal */}
      <ScoreUpdateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMatch(null);
        }}
        fixture={selectedMatch}
      />
    </div>
  );
};

export default Bracket;
