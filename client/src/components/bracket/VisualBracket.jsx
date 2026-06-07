import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [champion, setChampion] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

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

    setBracketState(prevState => {
      const newState = { ...prevState };
      
      // Update winner of current match
      if (round === 'FINAL' || round === 'THIRD_PLACE') {
        newState[round][0].winner = winnerTeam;
        if (round === 'FINAL') {
          setChampion(winnerTeam);
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
    const element = document.getElementById('bracket-capture-area');
    if (element) {
      const canvas = await html2canvas(element, { backgroundColor: '#000000' });
      const image = canvas.toDataURL('image/jpeg', 1.0);
      const link = document.createElement('a');
      link.download = 'My_WorldCup2026_Prediction.jpg';
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

  return (
    <div className="flex flex-col space-y-4 pb-20">
      
      {showCelebration && champion && <ChampionCelebration champion={champion} onClose={() => setShowCelebration(false)} />}

      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20">
          Back
        </button>
        <div className="flex space-x-4">
          <button onClick={handleExport} className="bg-gold text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Image
          </button>
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
    </div>
  );
};

export default VisualBracket;
