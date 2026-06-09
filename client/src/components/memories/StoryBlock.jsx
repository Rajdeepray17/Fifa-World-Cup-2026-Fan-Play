import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const StoryBlock = ({ story, index, isPlaceholder }) => {
  const ref = useRef(null);
  const { selectedNation } = useTheme();
  
  // Parallax and fade animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-8">
      {/* Background container for Parallax */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {isPlaceholder ? (
          <motion.div 
            className="w-full h-full bg-[#1a1a1a] flex items-center justify-center"
            style={{ y: yImage, scale: scaleImage }}
          >
             <div className="text-white/10 font-outfit text-6xl md:text-9xl font-bold uppercase tracking-tighter">
                Image {index + 1}
             </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('${story.image}')`,
              backgroundPosition: story.imagePosition || 'center',
              y: yImage,
              scale: scaleImage,
            }}
          />
        )}
        {/* Heavy vignette/overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-10" />
        <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-black/80 to-transparent z-10`} />
      </div>

      {/* Content */}
      <motion.div 
        className={`relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row ${isEven ? 'justify-start' : 'justify-end'}`}
        style={{ opacity: opacityText, y: yText }}
      >
        <div className="max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
           <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl md:text-6xl font-outfit font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
                 {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: selectedNation?.theme?.primary || '#FFD700' }} />
           </div>

           <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-2 leading-tight">
             {isPlaceholder ? 'Placeholder Title' : story.title}
           </h2>
           <h3 className="text-xl md:text-2xl text-[#FFD700] font-semibold mb-6 tracking-wide">
             {isPlaceholder ? 'Subtitle / Year' : story.subtitle}
           </h3>
           
           <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
             {isPlaceholder ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' : story.didYouKnow}
           </p>

           {(!isPlaceholder && story.quote) && (
             <div className="border-l-4 pl-6 py-2" style={{ borderColor: selectedNation?.theme?.primary || '#FFD700' }}>
               <p className="text-white/90 italic text-xl mb-2">{story.quote}</p>
               <p className="text-white/50 text-sm font-semibold uppercase tracking-widest">— {story.quoteAuthor}</p>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryBlock;
