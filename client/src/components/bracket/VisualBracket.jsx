import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateBracket } from '../../modules/bracket-engine/bracketGenerator';
import ChampionCelebration from './ChampionCelebration';
import html2canvas from 'html2canvas';

// Helper to determine the next match ID in a standard binary tree bracket
const getNextMatchId = (currentRound, matchIndex) => {
  const nextRoundMap = {
    'R32': 'R16',
    'R16': 'QF',
    'QF': 'SF',
    'SF': 'FINAL'
  };
  const nextRound = nextRoundMap[currentRound];
  if (!nextRound) return null;
  const nextIndex = Math.floor(matchIndex / 2);
  const isHome = matchIndex % 2 === 0;
  return { nextMatchId: `${nextRound}-${nextIndex}`, isHome };
};

// Flag-only match node for the exported poster image
const ExportMatchNode = ({ match }) => {
  if (!match) return null;

  const hasWinner = Boolean(match.winner);
  const isHomeWinner = hasWinner && match.homeTeam && match.winner._id === match.homeTeam._id;
  const isAwayWinner = hasWinner && match.awayTeam && match.winner._id === match.awayTeam._id;
  const isHomeLoser = hasWinner && match.homeTeam && match.winner._id !== match.homeTeam._id;
  const isAwayLoser = hasWinner && match.awayTeam && match.winner._id !== match.awayTeam._id;

  return (
    <div className="flex flex-col justify-center w-[60px] my-1">
      <div className="bg-[#111] border border-white/10 rounded-md overflow-hidden shadow">
        {/* Home Team */}
        <div className={`flex items-center justify-center p-1.5 border-b border-white/5 h-8 transition-all ${
          isHomeWinner ? 'bg-[#FFD700]/10 border-l-2 border-l-[#FFD700]' : 'border-l-2 border-l-transparent'
        } ${isHomeLoser ? 'opacity-30 grayscale' : ''}`}>
          {match.homeTeam ? (
            <img 
              src={`https://flagcdn.com/w40/${match.homeTeam.flagCode}.png`} 
              alt=""
              className="w-6 h-auto rounded-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-6 h-4 bg-white/5 rounded-sm flex items-center justify-center">
              <span className="text-white/10 text-[8px]">?</span>
            </div>
          )}
        </div>
        
        {/* Away Team */}
        <div className={`flex items-center justify-center p-1.5 h-8 transition-all ${
          isAwayWinner ? 'bg-[#FFD700]/10 border-l-2 border-l-[#FFD700]' : 'border-l-2 border-l-transparent'
        } ${isAwayLoser ? 'opacity-30 grayscale' : ''}`}>
          {match.awayTeam ? (
            <img 
              src={`https://flagcdn.com/w40/${match.awayTeam.flagCode}.png`} 
              alt=""
              className="w-6 h-auto rounded-sm"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-6 h-4 bg-white/5 rounded-sm flex items-center justify-center">
              <span className="text-white/10 text-[8px]">?</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BracketMatch = ({ match, onAdvance, isFinal, isThirdPlace }) => {
  if (!match) return null;

  const hasWinner = Boolean(match.winner);
  const isHomeWinner = hasWinner && match.homeTeam && match.winner._id === match.homeTeam._id;
  const isAwayWinner = hasWinner && match.awayTeam && match.winner._id === match.awayTeam._id;
  const isHomeLoser = hasWinner && match.homeTeam && match.winner._id !== match.homeTeam._id;
  const isAwayLoser = hasWinner && match.awayTeam && match.winner._id !== match.awayTeam._id;

  return (
    <div className="flex flex-col justify-center w-40 md:w-48 my-2">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden shadow-lg hover:border-[#FFD700]/30 transition-colors">
        {/* Home Team */}
        <div 
          onClick={() => match.homeTeam && match.awayTeam && onAdvance(match.id, match.homeTeam)}
          className={`flex items-center p-2 cursor-pointer border-b border-white/5 transition-colors ${
            isHomeWinner ? 'bg-[#FFD700]/20 border-l-4 border-l-[#FFD700]' : 'hover:bg-white/5 border-l-4 border-l-transparent'
          } ${isHomeLoser ? 'opacity-40 grayscale' : ''}`}
        >
          {match.homeTeam ? (
            <>
              <img 
                src={`https://flagcdn.com/w20/${match.homeTeam.flagCode}.png`} 
                alt={match.homeTeam.name}
                className="w-5 h-auto mr-2 rounded-sm"
                onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
              />
              <span className="text-white text-xs md:text-sm font-semibold truncate flex-1">{match.homeTeam.name}</span>
              {match.winner && match.winner._id === match.homeTeam._id && isFinal && <span className="ml-auto text-lg drop-shadow-md">🥇</span>}
              {match.winner && match.winner._id !== match.homeTeam._id && isFinal && <span className="ml-auto text-lg drop-shadow-md">🥈</span>}
              {match.winner && match.winner._id === match.homeTeam._id && isThirdPlace && <span className="ml-auto text-lg drop-shadow-md">🥉</span>}
            </>
          ) : (
            <span className="text-white/30 text-xs italic py-1">TBD</span>
          )}
        </div>
        
        {/* Away Team */}
        <div 
          onClick={() => match.homeTeam && match.awayTeam && onAdvance(match.id, match.awayTeam)}
          className={`flex items-center p-2 cursor-pointer transition-colors ${
            isAwayWinner ? 'bg-[#FFD700]/20 border-l-4 border-l-[#FFD700]' : 'hover:bg-white/5 border-l-4 border-l-transparent'
          } ${isAwayLoser ? 'opacity-40 grayscale' : ''}`}
        >
          {match.awayTeam ? (
            <>
              <img 
                src={`https://flagcdn.com/w20/${match.awayTeam.flagCode}.png`} 
                alt={match.awayTeam.name}
                className="w-5 h-auto mr-2 rounded-sm"
                onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
              />
              <span className="text-white text-xs md:text-sm font-semibold truncate flex-1">{match.awayTeam.name}</span>
              {match.winner && match.winner._id === match.awayTeam._id && isFinal && <span className="ml-auto text-lg drop-shadow-md">🥇</span>}
              {match.winner && match.winner._id !== match.awayTeam._id && isFinal && <span className="ml-auto text-lg drop-shadow-md">🥈</span>}
              {match.winner && match.winner._id === match.awayTeam._id && isThirdPlace && <span className="ml-auto text-lg drop-shadow-md">🥉</span>}
            </>
          ) : (
            <span className="text-white/30 text-xs italic py-1">TBD</span>
          )}
        </div>
      </div>
    </div>
  );
};

const VisualBracket = ({ groupsData, thirdPlaceQualifiers, onBack }) => {
  const [bracketState, setBracketState] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);

  const showWarning = (msg) => {
    setWarningMessage(msg);
    setTimeout(() => {
      setWarningMessage(null);
    }, 4000);
  };

  useEffect(() => {
    // Generate initial R32 bracket based on deterministic mapping
    const r32Matches = generateBracket(groupsData, thirdPlaceQualifiers);
    
    // Initialize the rest of the bracket as empty
    const initialState = {
      R32: r32Matches, // 16 matches
      R16: Array.from({ length: 8 }, (_, i) => ({ id: `R16-${i}`, homeTeam: null, awayTeam: null, winner: null })),
      QF: Array.from({ length: 4 }, (_, i) => ({ id: `QF-${i}`, homeTeam: null, awayTeam: null, winner: null })),
      SF: Array.from({ length: 2 }, (_, i) => ({ id: `SF-${i}`, homeTeam: null, awayTeam: null, winner: null })),
      FINAL: [{ id: `FINAL-0`, homeTeam: null, awayTeam: null, winner: null }],
      THIRD_PLACE: [{ id: `THIRD_PLACE-0`, homeTeam: null, awayTeam: null, winner: null }]
    };

    setBracketState(initialState);
  }, [groupsData, thirdPlaceQualifiers]);

  const handleAdvance = (matchId, winnerTeam) => {
    if (!winnerTeam) return;

    const [round, indexStr] = matchId.split('-');
    const matchIndex = parseInt(indexStr);

    if (round === 'FINAL') {
      const hasThirdPlaceWinner = Boolean(bracketState?.THIRD_PLACE?.[0]?.winner);
      if (!hasThirdPlaceWinner) {
        showWarning("Please select the winner of the Third Place Play-off first!");
        return;
      }
    }

    setBracketState(prevState => {
      const newState = { ...prevState };
      
      // Update winner of current match
      if (round === 'FINAL' || round === 'THIRD_PLACE') {
        newState[round][0].winner = winnerTeam;
        if (round === 'FINAL') {
          setShowCelebration(true);
        }
        return newState;
      }

      // Find current match and set winner
      const currentMatchList = [...newState[round]];
      currentMatchList[matchIndex].winner = winnerTeam;
      newState[round] = currentMatchList;

      // Progress to next round
      const nextInfo = getNextMatchId(round, matchIndex);
      if (nextInfo) {
        const nextRoundList = [...newState[nextInfo.nextMatchId.split('-')[0]]];
        const nextIndex = parseInt(nextInfo.nextMatchId.split('-')[1]);
        
        if (nextInfo.isHome) {
          nextRoundList[nextIndex].homeTeam = winnerTeam;
        } else {
          nextRoundList[nextIndex].awayTeam = winnerTeam;
        }
        
        // Cascade nullify if prediction changes (reset forward branch)
        if (nextRoundList[nextIndex].winner && nextRoundList[nextIndex].winner._id !== winnerTeam._id) {
            nextRoundList[nextIndex].winner = null;
        }

        newState[nextInfo.nextMatchId.split('-')[0]] = nextRoundList;

        // If it's a Semi-Final, also send the loser to the Third Place Play-off
        if (round === 'SF') {
          const loserTeam = winnerTeam._id === currentMatchList[matchIndex].homeTeam?._id 
                            ? currentMatchList[matchIndex].awayTeam 
                            : currentMatchList[matchIndex].homeTeam;
          
          if (loserTeam) {
            const thirdPlaceMatch = [...newState.THIRD_PLACE];
            if (matchIndex === 0) {
              thirdPlaceMatch[0].homeTeam = loserTeam;
            } else {
              thirdPlaceMatch[0].awayTeam = loserTeam;
            }
            // Cascade nullify third place winner if the participants change
            if (thirdPlaceMatch[0].winner && thirdPlaceMatch[0].winner._id !== loserTeam._id && thirdPlaceMatch[0].winner._id !== winnerTeam._id) {
               thirdPlaceMatch[0].winner = null;
            }
            newState.THIRD_PLACE = thirdPlaceMatch;
          }
        }
      }

      return newState;
    });
  };

  const handleExport = async () => {
    const element = document.getElementById('bracket-poster-export');
    if (element) {
      const canvas = await html2canvas(element, { 
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
        logging: false
      });
      const image = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = 'My_WorldCup2026_Prediction_Poster.jpg';
      link.href = image;
      link.click();
    }
  };

  if (!bracketState) return <div className="text-gold animate-pulse text-center pt-20">Generating Bracket...</div>;

  // Split matches into left and right branches (8 matches each in R32)
  const leftR32 = bracketState.R32.slice(0, 8);
  const rightR32 = bracketState.R32.slice(8, 16);
  
  const leftR16 = bracketState.R16.slice(0, 4);
  const rightR16 = bracketState.R16.slice(4, 8);
  
  const leftQF = bracketState.QF.slice(0, 2);
  const rightQF = bracketState.QF.slice(2, 4);
  
  const leftSF = bracketState.SF.slice(0, 1);
  const rightSF = bracketState.SF.slice(1, 2);

  const finalMatch = bracketState.FINAL[0];
  const champion = finalMatch?.winner;
  const runnerUp = finalMatch?.winner && finalMatch?.homeTeam && finalMatch?.awayTeam
    ? (finalMatch.winner._id === finalMatch.homeTeam._id ? finalMatch.awayTeam : finalMatch.homeTeam)
    : null;
  const thirdPlaceWinner = bracketState.THIRD_PLACE[0]?.winner;
  const isBracketComplete = champion && thirdPlaceWinner;

  return (
    <div className="flex flex-col space-y-4 pb-20 relative">
      
      {showCelebration && champion && <ChampionCelebration champion={champion} onClose={() => setShowCelebration(false)} />}

      <AnimatePresence>
        {warningMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-red-600 border border-red-500 text-white font-accent font-bold px-6 py-3.5 rounded-full shadow-2xl z-50 flex items-center gap-2"
          >
            <span>⚠️</span>
            <span>{warningMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20">
          Back
        </button>
        <div className="flex space-x-4">
          {isBracketComplete && (
            <button onClick={handleExport} className="bg-gold text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Prediction Poster
            </button>
          )}
        </div>
      </div>

      {/* Bracket Capture Area */}
      <div id="bracket-capture-area" className="relative bg-black/40 rounded-3xl p-4 overflow-x-auto min-h-[800px] border border-white/5">
        
        {/* Background Trophy / Details */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10 pointer-events-none z-0">
           <h1 className="text-[12rem] font-outfit font-bold text-gold">2026</h1>
        </div>

        <div className="relative z-10 flex justify-between min-w-[1200px] h-full gap-2">
          
          {/* LEFT BRANCH */}
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-around">
              {leftR32.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
            <div className="flex flex-col justify-around">
              {leftR16.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
            <div className="flex flex-col justify-around">
              {leftQF.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
            <div className="flex flex-col justify-around">
              {leftSF.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
          </div>

          {/* CENTER: FINAL & CHAMPION */}
          <div className="flex flex-col items-center justify-center flex-1 px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-outfit font-bold text-gold tracking-widest uppercase mb-2">Champion</h2>
              <div className="w-48 h-48 rounded-full border-4 border-gold bg-black/50 shadow-[0_0_40px_rgba(255,215,0,0.3)] flex items-center justify-center overflow-hidden transition-all">
                {champion ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={`https://flagcdn.com/w160/${champion.flagCode}.png`} 
                      alt={champion.name}
                      className="w-24 h-auto rounded shadow-lg mb-2 object-cover"
                      onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
                    />
                    <span className="text-white font-bold text-lg">{champion.name}</span>
                  </div>
                ) : (
                  <span className="text-white/20 text-4xl font-bold">?</span>
                )}
              </div>
            </div>

            <div className="text-center w-full max-w-xs">
              <h3 className="text-xl font-outfit font-bold text-white/50 mb-2 uppercase tracking-widest">Final</h3>
              <BracketMatch match={bracketState.FINAL[0]} onAdvance={handleAdvance} isFinal={true} />
            </div>

            <div className="text-center w-full max-w-xs mt-8">
              <h3 className="text-lg font-outfit font-bold text-white/40 mb-2 uppercase tracking-widest">3rd Place</h3>
              <BracketMatch match={bracketState.THIRD_PLACE[0]} onAdvance={handleAdvance} isThirdPlace={true} />
            </div>
          </div>

          {/* RIGHT BRANCH */}
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col justify-around">
              {rightSF.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
            <div className="flex flex-col justify-around">
              {rightQF.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
            <div className="flex flex-col justify-around">
              {rightR16.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
            <div className="flex flex-col justify-around">
              {rightR32.map((match, i) => <BracketMatch key={match.id} match={match} onAdvance={handleAdvance} />)}
            </div>
          </div>

        </div>
      </div>

      {/* ── HIDDEN EXPORT POSTER (FOR BRACKET IMAGE CAPTURE) ── */}
      <div
        id="bracket-poster-export"
        className="absolute"
        style={{
          left: '-9999px',
          top: '0',
          width: '1400px',
          height: '900px',
          padding: '30px 40px',
          background: 'linear-gradient(135deg, #10061e 0%, #05020a 100%)',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '8px solid #BF953F',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.95)',
        }}
      >
        {/* Decorative watermark background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #BF953F 0%, transparent 60%)'
        }} />
        
        {/* Header */}
        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="text-xs uppercase tracking-[0.4em] font-accent text-[#BF953F] font-bold mb-1">
            FIFA World Cup 2026
          </div>
          <h2
            className="text-4xl font-heading font-black tracking-[0.05em] uppercase mb-0.5"
            style={{
              color: '#FFD700',
            }}
          >
            MY TOURNAMENT BRACKET PREDICTION
          </h2>
          <div className="h-[1.5px] w-64 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent my-1" />
        </div>

        {/* Main Bracket Layout (Only flags, no country names) */}
        <div className="relative z-10 flex justify-between items-center w-full h-[680px] px-2">
          
          {/* LEFT BRANCH (R32 -> R16 -> QF -> SF) */}
          <div className="flex flex-row items-center justify-between w-[520px] h-full">
            {/* R32 */}
            <div className="flex flex-col justify-around h-full">
              {leftR32.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
            
            {/* R16 */}
            <div className="flex flex-col justify-around h-full py-4">
              {leftR16.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
            
            {/* QF */}
            <div className="flex flex-col justify-around h-full py-16">
              {leftQF.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
            
            {/* SF */}
            <div className="flex flex-col justify-around h-full py-32">
              {leftSF.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
          </div>

          {/* CENTER: PODIUM, FINAL MATCH & CHAMPION DISPLAY */}
          <div className="flex flex-col items-center justify-between w-[280px] h-full py-2 px-1 border-x border-white/5 bg-white/[0.01]">
            
            {/* Top: 1st, 2nd, 3rd placed nations podium */}
            {isBracketComplete ? (
              <div className="flex flex-col items-center w-full mt-2">
                <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-white/40 font-bold mb-3">
                  Tournament Podiums
                </div>
                
                {/* Podium Row */}
                <div className="flex items-end justify-center gap-2 w-full">
                  {/* 2nd Place (Silver) */}
                  {runnerUp && (
                    <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[80px] text-center">
                      <span className="text-sm">🥈</span>
                      <img
                        src={`https://flagcdn.com/w40/${runnerUp.flagCode}.png`}
                        alt=""
                        className="w-8 h-auto rounded border border-white/10 my-1.5"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <span className="font-accent font-black text-[9px] uppercase text-white/90 truncate w-full">
                        {runnerUp.name}
                      </span>
                    </div>
                  )}

                  {/* 1st Place (Champion Gold) */}
                  {champion && (
                    <div className="flex flex-col items-center p-2.5 rounded bg-yellow-500/10 border-2 border-yellow-500/30 w-[95px] text-center shadow-lg -translate-y-2">
                      <span className="text-base">🏆</span>
                      <img
                        src={`https://flagcdn.com/w80/${champion.flagCode}.png`}
                        alt=""
                        className="w-10 h-auto rounded border border-yellow-500/30 my-1.5"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <span className="font-accent font-black text-[10px] uppercase text-yellow-400 truncate w-full">
                        {champion.name}
                      </span>
                    </div>
                  )}

                  {/* 3rd Place (Bronze) */}
                  {thirdPlaceWinner && (
                    <div className="flex flex-col items-center p-2 rounded bg-white/5 border border-white/10 w-[80px] text-center">
                      <span className="text-sm">🥉</span>
                      <img
                        src={`https://flagcdn.com/w40/${thirdPlaceWinner.flagCode}.png`}
                        alt=""
                        className="w-8 h-auto rounded border border-white/10 my-1.5"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                      <span className="font-accent font-black text-[9px] uppercase text-white/90 truncate w-full">
                        {thirdPlaceWinner.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-white/20 uppercase tracking-widest mt-10">
                Simulate Bracket to View Podium
              </div>
            )}

            {/* Middle: Final Match & Winner Display */}
            <div className="flex flex-col items-center w-full my-4">
              <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-[#BF953F] font-bold mb-1">
                World Cup Final
              </div>
              <ExportMatchNode match={bracketState.FINAL[0]} />
              
              {/* Champion text block */}
              {champion && (
                <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                  <span className="text-xs">🏆</span>
                  <span className="font-accent font-black text-[11px] uppercase text-yellow-400 tracking-wider">
                    {champion.name}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom: Third Place Play-off */}
            <div className="flex flex-col items-center w-full mb-2">
              <div className="text-[10px] uppercase tracking-[0.2em] font-accent text-white/30 font-bold mb-1">
                Third Place Play-off
              </div>
              <ExportMatchNode match={bracketState.THIRD_PLACE[0]} />
              
              {/* 3rd Place text block */}
              {thirdPlaceWinner && (
                <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <span className="text-xs">🥉</span>
                  <span className="font-accent font-bold text-[10px] uppercase text-white/80 tracking-wider">
                    {thirdPlaceWinner.name}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT BRANCH (SF -> QF -> R16 -> R32) */}
          <div className="flex flex-row items-center justify-between w-[520px] h-full">
            {/* SF */}
            <div className="flex flex-col justify-around h-full py-32">
              {rightSF.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
            
            {/* QF */}
            <div className="flex flex-col justify-around h-full py-16">
              {rightQF.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
            
            {/* R16 */}
            <div className="flex flex-col justify-around h-full py-4">
              {rightR16.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
            
            {/* R32 */}
            <div className="flex flex-col justify-around h-full">
              {rightR32.map(match => <ExportMatchNode key={match.id} match={match} />)}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center relative z-10 flex flex-col items-center">
          <div className="h-[1px] w-full bg-white/10 mb-2" />
          <div className="text-[9px] font-accent text-[#BF953F] tracking-[0.3em] uppercase font-bold">
            United 2026 • Canada • Mexico • USA
          </div>
          <div className="text-[9px] text-white/40 font-accent mt-1">
            fifawc2026dh.netlify.app • Fan Play Predictor
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualBracket;
