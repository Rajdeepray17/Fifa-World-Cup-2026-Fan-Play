import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChampionFrame from '../components/champions/ChampionFrame';
import JourneyModal from '../components/champions/JourneyModal';
import { championsData } from '../data/championsData';

const WallOfChampions = () => {
  const [selectedChampion, setSelectedChampion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-inter relative overflow-hidden">
      
      {/* Museum Wall Texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center mb-20"
         >
           <h3 className="text-[#BF953F] tracking-[0.4em] uppercase text-sm md:text-base mb-4 font-semibold">
             The Immortals
           </h3>
           <h1 className="text-5xl md:text-7xl font-outfit font-black tracking-widest uppercase mb-6 drop-shadow-2xl text-white">
             Wall of <br className="md:hidden" /> Champions
           </h1>
           <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent mx-auto mb-6" />
           <p className="max-w-2xl mx-auto text-lg text-white/60 font-light">
             Since 1930, only eight nations have lifted the ultimate prize. 
             Walk the halls of history and discover the legendary teams that conquered the world.
           </p>
         </motion.div>

         {/* Masonry-style Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {championsData.map((champion, index) => (
              <motion.div
                key={champion.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              >
                 <ChampionFrame 
                   champion={champion} 
                   onClick={(champ) => setSelectedChampion(champ)} 
                 />
              </motion.div>
            ))}
         </div>
      </div>

      <JourneyModal 
        champion={selectedChampion} 
        onClose={() => setSelectedChampion(null)} 
      />
      
    </div>
  );
};

export default WallOfChampions;
