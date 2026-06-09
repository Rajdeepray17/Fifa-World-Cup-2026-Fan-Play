import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IconCard = ({ icon, index }) => {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleEffect = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity: opacityFade, scale: scaleEffect }}
      className={`relative min-h-[70vh] flex flex-col md:flex-row items-center justify-center gap-10 py-16 px-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Portrait Image with Parallax */}
      <div className="w-full md:w-5/12 h-[500px] md:h-[650px] relative rounded-t-[100px] rounded-b-[20px] overflow-hidden shadow-2xl border border-white/10 group bg-[#111]">
        <motion.div 
          style={{ y: yParallax }} 
          className="absolute inset-[-20%] w-[140%] h-[140%]"
        >
          <img 
            src={icon.image} 
            alt={icon.name}
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            onError={(e) => {
               // Fallback if user hasn't added the image yet
               e.target.src = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop';
            }}
          />
        </motion.div>
        
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
        
        {/* Number/Era Indicator */}
        <div className="absolute top-6 right-6 font-outfit text-white/50 text-xl md:text-2xl font-light tracking-widest bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
           {icon.era}
        </div>
      </div>

      {/* Content Block */}
      <div className="w-full md:w-6/12 flex flex-col justify-center space-y-6 z-10">
         <div className="space-y-2">
            <h4 className="text-xl md:text-2xl font-accent text-[#FFD700] tracking-[0.2em] uppercase">
               {icon.country}
            </h4>
            <h2 className="text-5xl md:text-7xl font-outfit font-black tracking-tighter text-white uppercase leading-none">
               {icon.name}
            </h2>
         </div>

         <div className="relative pt-6 pb-4">
            <span className="absolute top-0 left-0 text-6xl text-white/10 font-serif leading-none">"</span>
            <p className="text-xl md:text-3xl font-serif text-white/80 italic leading-relaxed pl-6 relative z-10">
               {icon.quote}
            </p>
         </div>

         <div className="w-16 h-1 bg-[#FFD700] rounded-full" />

         <p className="text-lg text-white/60 leading-relaxed font-light max-w-2xl">
            {icon.description}
         </p>
      </div>

      {/* Background large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-outfit font-black text-white/[0.02] whitespace-nowrap pointer-events-none z-[-1] uppercase select-none">
         {icon.name.split(' ')[0]}
      </div>
    </motion.div>
  );
};

export default IconCard;
