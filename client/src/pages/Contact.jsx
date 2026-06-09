import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { selectedNation } = useTheme();
  
  const themeColor = selectedNation?.theme?.primary || '#FFD700';

  const skills = [
    { name: "React", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Node.js", level: 80 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Three.js", level: 60 },
    { name: "Framer Motion", level: 85 },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-inter py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none" style={{ backgroundColor: themeColor }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: themeColor }} />

      <div className="max-w-5xl mx-auto relative z-10 space-y-32">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shrink-0 relative group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
              <img 
                src="assets/images/Rajdeep1.jpg"
                alt="Rajdeep Ray"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
              />
           </div>

           <div className="text-center md:text-left space-y-4">
              <h1 className="text-5xl md:text-7xl font-outfit font-black tracking-tighter uppercase text-white">
                 Rajdeep <span style={{ color: themeColor }}>Ray</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-white/60 font-light tracking-widest uppercase">
                 Full-Stack Developer • Football Enthusiast
              </h2>
              <div className="pt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                 <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white/80">Software Engineer</span>
                 <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white/80">Liverpool FC - YNWA </span>
                 <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white/80">Creator of this Hub</span>
                 <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold text-white/80">Jamshedpur , Jharkhand , India</span>
              </div>
           </div>
        </motion.section>

        {/* Project Vision & Bio */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <motion.div 
             initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
             className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-3xl"
           >
              <h3 className="text-3xl font-outfit font-bold mb-6 flex items-center space-x-3">
                 <span style={{ color: themeColor }}>/</span>
                 <span>The Vision</span>
              </h3>
              <p className="text-white/70 leading-relaxed text-lg mb-4">
                 I built the <strong>FIFA World Cup 2026 Digital Hub</strong> because I believe football is more than just 90 minutes on a pitch. It is history, statistics, emotion, and global unity.
              </p>
              <p className="text-white/70 leading-relaxed text-lg">
                 This platform combines real-time data, predictive gamification, and immersive storytelling into a single MERN-stack ecosystem. The goal was to create an experience that feels as premium and broadcast-ready as the tournament itself.
              </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
           >
              <h3 className="text-3xl font-outfit font-bold mb-8 flex items-center space-x-3">
                 <span style={{ color: themeColor }}>/</span>
                 <span>Tech Arsenal</span>
              </h3>
              <div className="space-y-6">
                 {skills.map((skill, index) => (
                    <div key={skill.name}>
                       <div className="flex justify-between text-sm font-semibold text-white/80 mb-2">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                       </div>
                       <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: themeColor }}
                          />
                       </div>
                    </div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* Contact Links */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center pt-10 border-t border-white/10"
        >
           <h3 className="text-3xl font-outfit font-bold mb-8">Let's Connect</h3>
           <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "Instagram", url: "https://www.instagram.com/rajdeep__ray/", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { name: "GitHub", url: "https://github.com/Rajdeepray17", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/rajdeepray17/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { name: "Email", url: "mailto:rajdeepray033@gmail.com", icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }
              ].map((social) => (
                <motion.a 
                  key={social.name}
                  href={social.url}
                  target={social.name === 'Email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-[#1a1a1a] hover:bg-white/10 border border-white/10 px-8 py-4 rounded-xl flex items-center space-x-3 transition-colors"
                  style={{ hoverBorderColor: themeColor }}
                >
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d={social.icon} />
                   </svg>
                   <span className="font-semibold">{social.name}</span>
                </motion.a>
              ))}
           </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Contact;
