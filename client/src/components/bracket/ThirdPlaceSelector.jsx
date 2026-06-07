import React from 'react';
import { motion } from 'framer-motion';

const ThirdPlaceSelector = ({ groupsData, selected, onSelect, onNext, onBack }) => {
  const groupLetters = Object.keys(groupsData).sort();
  
  // Extract all 3rd placed teams (index 2)
  const thirdPlacedTeams = groupLetters.map(letter => {
    const team = groupsData[letter][2]; // 3rd place
    return {
      ...team,
      originGroup: letter
    };
  });

  const toggleSelection = (groupLetter) => {
    if (selected.includes(groupLetter)) {
      onSelect(selected.filter(g => g !== groupLetter));
    } else {
      if (selected.length < 8) {
        onSelect([...selected, groupLetter]);
      }
    }
  };

  const isSelected = (groupLetter) => selected.includes(groupLetter);

  return (
    <div className="flex flex-col space-y-8 pb-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white tracking-wide">
          SELECT THE <span className="text-[#FFD700]">BEST 8</span>
        </h2>
        <p className="text-white/70 text-lg font-inter">
          Only the 8 best third-placed teams will advance to the Round of 32. 
          Select which 8 nations will continue their journey.
        </p>
        <div className="pt-4">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/20 shadow-lg">
            <span className="text-xl font-bold text-white mr-2">Selected:</span>
            <span className={`text-2xl font-bold ${selected.length === 8 ? 'text-green-400' : 'text-[#FFD700]'}`}>
              {selected.length} <span className="text-white/40 text-lg">/ 8</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-4">
        {thirdPlacedTeams.map((team, idx) => {
          const selectedState = isSelected(team.originGroup);
          
          return (
            <motion.div
              key={team._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleSelection(team.originGroup)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedState 
                  ? 'border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                  : selected.length === 8 
                    ? 'border border-red-500/50 opacity-50 grayscale hover:grayscale-0' 
                    : 'border border-white/10 hover:border-[#FFD700]/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]'
              }`}
            >
              {/* Background gradient based on theme */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${team.theme.primary}, ${team.theme.secondary})`
                }}
              />
              
              <div className="relative p-6 flex flex-col items-center text-center space-y-4 bg-black/60 backdrop-blur-sm h-full">
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {selectedState ? (
                    <div className="bg-green-500 text-white rounded-full p-1 shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : selected.length === 8 ? (
                    <div className="bg-red-500 text-white rounded-full p-1 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-white/20" />
                  )}
                </div>

                <div className="text-xs font-bold text-white/50 uppercase tracking-widest">
                  Group {team.originGroup}
                </div>
                
                <img 
                  src={`https://flagcdn.com/w80/${team.flagCode}.png`} 
                  alt={team.name}
                  className="w-16 h-auto rounded shadow-lg"
                  onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
                />
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                  <p className="text-[#FFD700] text-sm font-semibold">Rank: {team.fifaRank}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center space-x-4 pt-8">
        <button 
          onClick={onBack}
          className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all uppercase tracking-wider"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={selected.length !== 8}
          className={`px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all duration-300 ${
            selected.length === 8 
              ? 'bg-[#FFD700] text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
              : 'bg-white/5 text-white/30 cursor-not-allowed'
          }`}
        >
          Generate Bracket
        </button>
      </div>
    </div>
  );
};

export default ThirdPlaceSelector;
