import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import IconCard from '../components/icons/IconCard';
import { iconsData } from '../data/iconsData';

const Icons = () => {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-inter relative overflow-hidden">
      
      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      
      {/* Header Section */}
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10"
      >
         <h3 className="text-[#FFD700] tracking-[0.5em] uppercase text-sm md:text-base mb-6 font-semibold">
           Legends of the Game
         </h3>
         <h1 className="text-6xl md:text-9xl font-outfit font-black tracking-tighter uppercase mb-6 leading-none">
           World Cup <br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
             Icons
           </span>
         </h1>
         <p className="max-w-2xl text-lg md:text-2xl text-white/60 font-light mt-4">
           A journey through time, celebrating the immortals who etched their names into the golden history of the beautiful game.
         </p>

         <motion.div 
           animate={{ y: [0, 10, 0] }} 
           transition={{ repeat: Infinity, duration: 2 }}
           className="absolute bottom-12 flex flex-col items-center opacity-50"
         >
           <span className="text-xs tracking-widest uppercase mb-2">Scroll to explore</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
         </motion.div>
      </motion.div>

      {/* Icons List */}
      <div className="max-w-7xl mx-auto pb-32">
        {iconsData.map((icon, index) => (
          <IconCard key={icon.id} icon={icon} index={index} />
        ))}
      </div>

    </div>
  );
};

export default Icons;
