import React, { useMemo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { slides } from '../data/slides';
import StoryBlock from '../components/memories/StoryBlock';

const Memories = () => {
  // Setup progress bar for the page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Combine and shuffle data
  const combinedStories = useMemo(() => {
    // Deep copy to avoid mutating original
    return [...slides].sort(() => Math.random() - 0.5);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-inter">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#FFD700] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518605368461-1ee7e161756a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-8xl font-outfit font-black tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            Down the <br/> Memory Lane
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide max-w-2xl mx-auto mb-12">
            35 iconic moments that shaped the beautiful game. Scroll to experience history.
          </p>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-12 border-2 border-white/30 rounded-full mx-auto flex justify-center p-2"
          >
            <motion.div className="w-1 h-3 bg-[#FFD700] rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Story Blocks */}
      <div>
        {combinedStories.map((story, index) => (
          <StoryBlock 
            key={story.id} 
            story={story} 
            index={index} 
            isPlaceholder={story.isPlaceholder} 
          />
        ))}
      </div>
      
      {/* Footer hint */}
      <div className="py-32 text-center text-white/40 font-outfit text-xl">
         More history to be written in 2026.
      </div>
    </div>
  );
};

export default Memories;
