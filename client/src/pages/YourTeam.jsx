import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';
import StarPlayerCard from '../components/your-team/StarPlayerCard';

const YourTeam = () => {
  const { selectedNation } = useTheme();
  const [loading, setLoading] = useState(true);
  const [squad, setSquad] = useState([]);
  
  // Tactical Insights & Outlook (Static for now, but dynamically styled)
  const insights = [
    { title: "Tactical Setup", desc: "Focuses on high pressing and quick transitions through the midfield." },
    { title: "Key Strength", desc: "Exceptional depth in attacking positions allowing for late-game impact substitutions." },
    { title: "Vulnerability", desc: "Can struggle against deep-lying defensive blocks in transition." }
  ];

  useEffect(() => {
    const fetchSquad = async () => {
      if (!selectedNation?._id) {
        // If we only have the static fallback theme without an _id, fetch by code
        try {
           const code = selectedNation?.code || 'ar'; // fallback
           const response = await fetch(`${API_URL}/players/nation/code/${code}`);
           const data = await response.json();
           if (data.success) {
             setSquad(data.data);
           }
        } catch (err) {
           console.error("Failed to fetch squad by code:", err);
        } finally {
           setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`${API_URL}/players/nation/${selectedNation._id}`);
        const data = await response.json();
        if (data.success) {
          setSquad(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch squad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSquad();
  }, [selectedNation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="loading-ring w-12 h-12"></div>
      </div>
    );
  }

  // Analytics Calculations
  const averageAge = squad.length > 0 ? (squad.reduce((acc, p) => acc + p.age, 0) / squad.length).toFixed(1) : 'N/A';
  const totalGoals = squad.reduce((acc, p) => acc + p.goals, 0);
  const totalCaps = squad.reduce((acc, p) => acc + p.caps, 0);
  
  // Get top 4 players by rating/caps/goals
  const starPlayers = [...squad].sort((a, b) => b.goals - a.goals).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white font-inter pb-20">
      
      {/* SECTION A: TEAM OVERVIEW HERO */}
      <div className="relative overflow-hidden pt-20 pb-24 border-b border-white/5">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none" 
             style={{ backgroundColor: selectedNation?.theme?.primary || '#FFD700' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            src={`https://flagcdn.com/w320/${selectedNation?.flagCode || 'un'}.png`}
            alt={selectedNation?.name}
            className="w-48 h-auto shadow-2xl rounded mb-8 border-4 border-white/10"
            onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
          />
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-outfit font-bold uppercase tracking-widest mb-4"
            style={{ color: selectedNation?.theme?.primary || '#FFD700' }}
          >
            {selectedNation?.name || 'Your Team'}
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 text-sm font-semibold tracking-wider uppercase text-white/60"
          >
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">FIFA Rank: {selectedNation?.fifaRank || 'N/A'}</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Manager: {selectedNation?.manager || 'TBD'}</span>
            <span className="bg-white/5 px-4 py-2 rounded-full border border-white/10">{selectedNation?.confederation || 'FIFA'}</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* SECTION B: SQUAD ANALYTICS */}
        <section>
          <div className="flex items-center space-x-4 mb-8">
            <h2 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white/90">Squad Analytics</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
               <span className="text-white/40 font-semibold uppercase tracking-widest text-sm mb-2">Average Age</span>
               <span className="text-5xl font-outfit font-bold text-white">{averageAge}</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
               <span className="text-white/40 font-semibold uppercase tracking-widest text-sm mb-2">Total Int. Goals</span>
               <span className="text-5xl font-outfit font-bold" style={{ color: selectedNation?.theme?.primary || '#FFD700' }}>{totalGoals}</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
               <span className="text-white/40 font-semibold uppercase tracking-widest text-sm mb-2">Total Caps</span>
               <span className="text-5xl font-outfit font-bold text-white">{totalCaps}</span>
            </motion.div>
          </div>
        </section>

        {/* SECTION C: STAR PLAYERS */}
        {starPlayers.length > 0 && (
          <section>
            <div className="flex items-center space-x-4 mb-8">
              <h2 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white/90">Key Players</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {starPlayers.map(player => (
                <StarPlayerCard key={player._id} player={player} theme={selectedNation?.theme} />
              ))}
            </div>
          </section>
        )}

        {/* SECTION D & E: TACTICAL INSIGHTS & OUTLOOK */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <div>
             <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white/90">Scouting Report</h2>
             </div>
             <div className="space-y-4">
               {insights.map((insight, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                   className="bg-[#1a1a1a] border-l-4 p-5 rounded-r-xl border-y border-r border-white/5"
                   style={{ borderLeftColor: selectedNation?.theme?.primary || '#FFD700' }}
                 >
                   <h4 className="text-lg font-outfit font-bold text-white mb-2">{insight.title}</h4>
                   <p className="text-white/60 text-sm leading-relaxed">{insight.desc}</p>
                 </motion.div>
               ))}
             </div>
           </div>
           
           <div>
             <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-3xl font-outfit font-bold uppercase tracking-widest text-white/90">Tournament Outlook</h2>
             </div>
             <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v5h-2z"/></svg>
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white mb-4">Road to the Final</h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  With {selectedNation?.name} drawn into Group {selectedNation?.group || '?'}, the path to glory requires navigating 
                  through tough opponents. Their historical best finish of <strong>{selectedNation?.historicalBest || 'Unknown'}</strong> will 
                  serve as both inspiration and a benchmark to surpass.
                </p>
                <div className="mt-auto">
                   <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full" 
                        style={{ backgroundColor: selectedNation?.theme?.primary || '#FFD700' }}
                      />
                   </div>
                   <div className="flex justify-between text-xs font-semibold text-white/40 uppercase tracking-widest">
                      <span>Progression Chance</span>
                      <span style={{ color: selectedNation?.theme?.primary || '#FFD700' }}>High</span>
                   </div>
                </div>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default YourTeam;
