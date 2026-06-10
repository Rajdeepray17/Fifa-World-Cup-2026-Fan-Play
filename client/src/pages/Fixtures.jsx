import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';
import MatchCard from '../components/fixtures/MatchCard';

const ROUNDS = [
  'All',
  'Group Stage',
  'Round of 32',
  'Round of 16',
  'Quarter Final',
  'Semi Final',
  'Third Place',
  'Final'
];

const Fixtures = () => {
  const [loading, setLoading] = useState(true);
  const [fixtures, setFixtures] = useState([]);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRound, setSelectedRound] = useState('All');
  const { selectedNation, globalFixtures } = useTheme();

  useEffect(() => {
    if (globalFixtures) {
      setFixtures(globalFixtures);
      setFilteredFixtures(globalFixtures);
      setLoading(false);
    } else {
      const fetchFixtures = async () => {
        try {
          const response = await fetch(`${API_URL}/fixtures?limit=104&sort=date`);
          const data = await response.json();
          if (data.success) {
            setFixtures(data.data);
            setFilteredFixtures(data.data);
          }
        } catch (err) {
          console.error("Failed to fetch fixtures:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchFixtures();
    }
  }, [globalFixtures]);

  useEffect(() => {
    let result = fixtures;

    // Filter by Round
    if (selectedRound !== 'All') {
      result = result.filter(f => f.round === selectedRound);
    }

    // Filter by Search Query (Nation name or group)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(f => {
        const homeMatch = f.homeTeam?.name?.toLowerCase().includes(q) || f.homeTeamPlaceholder?.toLowerCase().includes(q);
        const awayMatch = f.awayTeam?.name?.toLowerCase().includes(q) || f.awayTeamPlaceholder?.toLowerCase().includes(q);
        const groupMatch = f.group?.toLowerCase() === q.replace('group ', '');
        const stadiumMatch = f.stadium?.name?.toLowerCase().includes(q) || f.stadium?.city?.toLowerCase().includes(q);
        const roundMatch = f.round?.toLowerCase().includes(q);
        
        return homeMatch || awayMatch || groupMatch || stadiumMatch || roundMatch;
      });
    }

    setFilteredFixtures(result);
  }, [searchQuery, selectedRound, fixtures]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="loading-ring w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-outfit font-bold tracking-widest uppercase mb-4 text-[#FFD700]">
            Match Centre
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg mb-8">
            The complete 104-match schedule. All timings are automatically converted to your local timezone (IST).
          </p>

          {/* Filters */}
          <div className="max-w-4xl mx-auto bg-[#1a1a1a] border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
            <div className="w-full md:w-1/2 relative">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               <input 
                 type="text" 
                 placeholder="Search team, group, city, or round..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors"
               />
            </div>
            
            <div className="w-full md:w-auto flex flex-wrap gap-2 justify-center">
               <select 
                 value={selectedRound}
                 onChange={(e) => setSelectedRound(e.target.value)}
                 className="bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors cursor-pointer appearance-none"
                 style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
               >
                 {ROUNDS.map(r => (
                   <option key={r} value={r} className="bg-[#1a1a1a]">{r}</option>
                 ))}
               </select>
               <div className="pointer-events-none absolute right-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                 <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-white/40 text-sm font-semibold px-2">
           <span>Showing {filteredFixtures.length} matches</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* Vertical Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform -translate-x-1/2 -z-10"></div>
          
          <AnimatePresence>
            {filteredFixtures.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center text-white/40 text-xl font-outfit"
              >
                No fixtures found matching your search.
              </motion.div>
            ) : (
              filteredFixtures.map((fixture, index) => (
                <motion.div
                  key={fixture.matchNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index < 10 ? index * 0.05 : 0 }}
                  className="w-full"
                >
                  <MatchCard 
                    fixture={fixture} 
                    selectedNationCode={selectedNation?.code} 
                    theme={selectedNation?.theme} 
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Fixtures;
