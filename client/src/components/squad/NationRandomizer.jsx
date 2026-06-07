import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NationRandomizer — Flag roll roulette.
 * Rapidly cycles through all 48 nation flags, slowing down before
 * landing on a random nation. After landing, shows "Show Squad" button.
 */
const NationRandomizer = ({ nations, onNationReady }) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'rolling' | 'landed'
  const [finalNation, setFinalNation] = useState(null);
  const intervalRef = useRef(null);

  const startRoll = () => {
    if (phase === 'rolling') return;
    setPhase('rolling');
    setFinalNation(null);

    const winnerIndex = Math.floor(Math.random() * nations.length);
    let tick = 0;
    const totalTicks = 50;

    const roll = () => {
      tick++;
      setDisplayIndex(Math.floor(Math.random() * nations.length));

      if (tick >= totalTicks) {
        setDisplayIndex(winnerIndex);
        setFinalNation(nations[winnerIndex]);
        setPhase('landed');
        return;
      }

      // Exponential slow-down
      const delay = 30 + Math.pow(tick / totalTicks, 3) * 350;
      intervalRef.current = setTimeout(roll, delay);
    };

    roll();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  const currentNation = nations[displayIndex];

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      {/* Flag Display */}
      <div className="relative">
        <div
          className={`w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 shadow-lg transition-all duration-300 ${
            phase === 'landed'
              ? 'border-[#FFD700] shadow-[0_0_60px_rgba(255,215,0,0.4)]'
              : phase === 'rolling'
              ? 'border-white/30'
              : 'border-white/10'
          }`}
        >
          {currentNation && (
            <img
              src={`https://flagcdn.com/w320/${currentNation.flagCode}.png`}
              alt={currentNation.name}
              className={`w-full h-full object-cover transition-all ${
                phase === 'rolling' ? 'blur-[2px] scale-110' : 'blur-0 scale-100'
              }`}
              onError={(e) => {
                e.target.src =
                  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg';
              }}
            />
          )}
        </div>
      </div>

      {/* Nation Name */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentNation?.name || 'blank'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`text-3xl md:text-5xl font-heading font-bold text-center tracking-wider ${
            phase === 'landed' ? 'text-white' : 'text-white/40'
          }`}
        >
          {currentNation?.name || '?'}
        </motion.h2>
      </AnimatePresence>

      {/* Buttons */}
      {phase === 'idle' && (
        <button
          onClick={startRoll}
          className="px-10 py-4 rounded-full font-bold text-xl uppercase tracking-wider transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)',
            color: '#000',
          }}
        >
          🎰 Spin the Wheel
        </button>
      )}

      {phase === 'rolling' && (
        <p className="text-white/50 text-lg font-accent animate-pulse tracking-widest uppercase">
          Rolling...
        </p>
      )}

      {phase === 'landed' && finalNation && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          onClick={() => onNationReady(finalNation)}
          className="px-10 py-4 rounded-full font-bold text-xl uppercase tracking-wider transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)',
            color: '#000',
          }}
        >
          Show Squad →
        </motion.button>
      )}
    </div>
  );
};

export default NationRandomizer;
