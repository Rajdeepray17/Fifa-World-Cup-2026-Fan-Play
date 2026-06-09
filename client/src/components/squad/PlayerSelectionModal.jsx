import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../../config';

// Map pitch positions to database positions
const getDbPosition = (pitchPos) => {
  if (pitchPos.startsWith('CB')) return 'CB';
  if (pitchPos.startsWith('CM')) return 'CM';
  return pitchPos;
};

const PlayerSelectionModal = ({ nation, position, onSelect, onCancel }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${API_URL}/players?nation=${nation._id}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          const dbPos = getDbPosition(position);
          // Filter by position
          const positionalPlayers = data.data.filter(p => p.position === dbPos);
          setPlayers(positionalPlayers);
        }
      } catch (err) {
        console.error("Failed to fetch players:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayers();
  }, [nation, position]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-[#111] border border-white/10 rounded-3xl p-6 md:p-10 w-full max-w-5xl shadow-2xl relative">
        
        <button 
          onClick={onCancel}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img 
              src={`https://flagcdn.com/w80/${nation.flagCode}.png`} 
              alt={nation.name}
              className="w-12 h-auto rounded shadow-lg"
            />
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white uppercase tracking-wider">
              {nation.name} <span className="text-gold">| {position}</span>
            </h2>
          </div>
          <p className="text-white/60 font-inter">Select a player to fill the {position} position</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gold animate-pulse text-2xl font-outfit">Loading Players...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.length > 0 ? players.map(player => (
              <motion.div
                key={player._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(player)}
                className="cursor-pointer bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all group"
              >
                {/* Premium Card Header */}
                <div 
                  className="h-20 p-4 relative"
                  style={{ background: `linear-gradient(135deg, ${nation.theme?.primary || '#111'} 0%, ${nation.theme?.secondary || '#000'} 100%)` }}
                >
                  <div className="absolute top-2 right-2 text-white/50 text-4xl font-outfit font-black opacity-20">
                    {player.shirtNumber}
                  </div>
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="bg-black/50 text-gold px-2 py-1 rounded text-xs font-bold uppercase backdrop-blur-sm">
                      {player.position}
                    </span>
                    {player.isCaptain && (
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-md">
                        C
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-5 flex flex-col items-center relative -mt-8">
                  <div className="w-16 h-16 bg-black rounded-full border-4 border-[#1a1a1a] mb-3 flex items-center justify-center overflow-hidden">
                    <span className="text-white/20 text-2xl font-bold font-outfit">{player.shirtNumber}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white text-center leading-tight mb-1 group-hover:text-gold transition-colors">
                    {player.name}
                  </h3>
                  <p className="text-white/50 text-sm mb-4">{player.club}</p>
                  
                  <div className="w-full grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white/5 rounded p-2 border border-white/5">
                      <div className="text-white/40 mb-1">AGE</div>
                      <div className="text-white font-bold">{player.age}</div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/5">
                      <div className="text-white/40 mb-1">CAPS</div>
                      <div className="text-white font-bold">{player.caps}</div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/5">
                      <div className="text-white/40 mb-1">GOALS</div>
                      <div className="text-white font-bold">{player.goals}</div>
                    </div>
                    <div className="bg-white/5 rounded p-2 border border-white/5">
                      <div className="text-white/40 mb-1">FOOT</div>
                      <div className="text-white font-bold uppercase">{player.preferredFoot?.charAt(0) || '?'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-white/50">
                <p className="mb-4">No players found for position {position}.</p>
                <button 
                  onClick={onCancel}
                  className="text-gold underline hover:text-white"
                >
                  Spin again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerSelectionModal;
