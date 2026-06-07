import React from 'react';

const positionsMap = {
  GK: { bottom: '5%', left: '50%', transform: 'translateX(-50%)' },
  LB: { bottom: '20%', left: '15%' },
  CB1: { bottom: '15%', left: '35%' },
  CB2: { bottom: '15%', right: '35%' },
  RB: { bottom: '20%', right: '15%' },
  CDM: { bottom: '40%', left: '50%', transform: 'translateX(-50%)' },
  CM1: { bottom: '50%', left: '25%' },
  CM2: { bottom: '50%', right: '25%' },
  LW: { top: '20%', left: '15%' },
  ST: { top: '15%', left: '50%', transform: 'translateX(-50%)' },
  RW: { top: '20%', right: '15%' }
};

const PitchView = ({ squad, activePosition, onPositionClick, highlightEmpty = false }) => {
  return (
    <div className="relative w-full aspect-[2/3] md:aspect-[3/4] max-h-[800px] bg-[#2E8B57] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 mx-auto">
      
      {/* Pitch Markings */}
      <div className="absolute inset-0 border-[6px] border-white/40 m-4 md:m-8 rounded" />
      <div className="absolute inset-x-0 top-1/2 h-[6px] bg-white/40 -mt-[3px]" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full border-[6px] border-white/40 -ml-16 -mt-16 md:-ml-24 md:-mt-24" />
      <div className="absolute top-1/2 left-1/2 w-[6px] h-[6px] bg-white/40 rounded-full -ml-[3px] -mt-[3px]" />
      
      {/* Penalty Areas */}
      <div className="absolute top-4 left-1/2 w-64 md:w-96 h-32 md:h-48 border-[6px] border-t-0 border-white/40 -ml-32 md:-ml-48" />
      <div className="absolute bottom-4 left-1/2 w-64 md:w-96 h-32 md:h-48 border-[6px] border-b-0 border-white/40 -ml-32 md:-ml-48" />

      {/* Goal Areas */}
      <div className="absolute top-4 left-1/2 w-32 md:w-48 h-12 md:h-16 border-[6px] border-t-0 border-white/40 -ml-16 md:-ml-24" />
      <div className="absolute bottom-4 left-1/2 w-32 md:w-48 h-12 md:h-16 border-[6px] border-b-0 border-white/40 -ml-16 md:-ml-24" />

      {/* Penalty Spots */}
      <div className="absolute top-24 md:top-36 left-1/2 w-[6px] h-[6px] bg-white/40 rounded-full -ml-[3px]" />
      <div className="absolute bottom-24 md:bottom-36 left-1/2 w-[6px] h-[6px] bg-white/40 rounded-full -ml-[3px]" />

      {/* Players */}
      {Object.entries(squad).map(([posId, player]) => {
        const isFilled = player !== null;
        const isActive = activePosition === posId;

        return (
          <div
            key={posId}
            className="absolute flex flex-col items-center justify-center z-10 transition-all"
            style={positionsMap[posId]}
          >
            {isFilled ? (
              <div 
                className="group relative flex flex-col items-center"
              >
                {/* Premium Player Node */}
                <div 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${player.draftedNation?.theme?.primary || '#111'}, ${player.draftedNation?.theme?.secondary || '#000'})`,
                    borderColor: player.draftedNation?.theme?.accent || '#FFD700'
                  }}
                >
                  {/* Flag overlay background */}
                  <img 
                    src={`https://flagcdn.com/w80/${player.draftedNation?.flagCode}.png`} 
                    alt={player.draftedNation?.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="relative z-10 text-white font-outfit font-bold text-lg drop-shadow-md">
                    {player.shirtNumber}
                  </span>
                </div>
                
                {/* Label */}
                <div className="mt-1 px-2 py-0.5 bg-black/80 rounded text-center whitespace-nowrap border border-white/10 backdrop-blur-sm">
                  <p className="text-white text-xs font-bold truncate max-w-[80px]">{player.name}</p>
                  <div className="flex items-center justify-center gap-1">
                    <img 
                      src={`https://flagcdn.com/w20/${player.draftedNation?.flagCode}.png`} 
                      alt=""
                      className="w-3 h-2"
                    />
                    <p className="text-gold text-[10px] uppercase font-semibold">{player.position}</p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onPositionClick(posId)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 border-dashed shadow-lg backdrop-blur-sm transition-all duration-300 ${
                  highlightEmpty
                    ? 'border-[#FFD700] bg-[#FFD700]/20 scale-110 shadow-[0_0_20px_rgba(255,215,0,0.4)] animate-pulse cursor-pointer'
                    : 'border-white/50 bg-black/40 cursor-default'
                }`}
              >
                <span className="text-white/80 font-bold text-sm tracking-wider">{posId}</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PitchView;
