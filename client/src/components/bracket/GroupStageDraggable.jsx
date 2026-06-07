import React from 'react';
import { Reorder } from 'framer-motion';

const GroupStageDraggable = ({ groupsData, onChange, onNext }) => {
  const groupLetters = Object.keys(groupsData).sort();

  const handleReorder = (letter, newOrder) => {
    onChange({
      ...groupsData,
      [letter]: newOrder
    });
  };

  return (
    <div className="flex flex-col space-y-8 pb-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white tracking-wide">
          RANK THE <span className="text-[#FFD700]">GROUPS</span>
        </h2>
        <p className="text-white/70 text-lg font-inter">
          Drag and drop the teams to predict their final standing in the group stage. 
          The top two teams advance automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groupLetters.map(letter => (
          <div key={letter} className="bg-white/5 rounded-2xl border border-white/10 p-4 shadow-lg backdrop-blur-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h3 className="text-xl font-outfit font-bold text-[#FFD700]">GROUP {letter}</h3>
            </div>
            
            <Reorder.Group 
              axis="y" 
              values={groupsData[letter]} 
              onReorder={(newOrder) => handleReorder(letter, newOrder)}
              className="space-y-2 flex-grow"
            >
              {groupsData[letter].map((team, index) => (
                <Reorder.Item 
                  key={team._id} 
                  value={team}
                  className="flex items-center p-3 rounded-lg border border-white/5 bg-black/40 hover:border-white/20 hover:bg-white/5 cursor-grab active:cursor-grabbing transition-colors duration-200"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 ${
                    index === 0 ? 'bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]' : index === 1 ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.5)]' : index === 2 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-white/10 text-white/50'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <img 
                    src={`https://flagcdn.com/w40/${team.flagCode}.png`} 
                    alt={team.name}
                    className="w-8 h-auto mr-3 rounded-sm shadow-sm flex-shrink-0"
                    onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate text-sm">{team.name}</p>
                    <p className="text-white/40 text-xs">Rank: {team.fifaRank}</p>
                  </div>
                  
                  <div className="text-white/20 ml-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onNext}
          className="bg-[#FFD700] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all uppercase tracking-wider"
        >
          Confirm Group Stage Standings
        </button>
      </div>
    </div>
  );
};

export default GroupStageDraggable;
