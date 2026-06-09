import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../config';
import GroupStageDraggable from '../components/bracket/GroupStageDraggable';
import ThirdPlaceSelector from '../components/bracket/ThirdPlaceSelector';
import VisualBracket from '../components/bracket/VisualBracket';

const BracketPredictor = () => {
  const [step, setStep] = useState('group'); // 'group' | 'thirdPlace' | 'knockout'
  const [loading, setLoading] = useState(true);
  const [groupsData, setGroupsData] = useState({});
  const [thirdPlaceQualifiers, setThirdPlaceQualifiers] = useState([]); // Array of group letters

  useEffect(() => {
    // Fetch all nations
    const fetchNations = async () => {
      try {
        const response = await fetch(`${API_URL}/nations?limit=100`);
        const data = await response.json();
        
        // Group nations by their letter
        const grouped = {};
        const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];
        
        groupLetters.forEach(letter => {
          grouped[letter] = [];
        });

        if (data.success) {
          data.data.forEach(nation => {
            if (nation.group && grouped[nation.group]) {
              grouped[nation.group].push(nation);
            }
          });
          setGroupsData(grouped);
        }
      } catch (err) {
        console.error("Failed to fetch nations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNations();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleGroupRankingsChange = (newGroupsData) => {
    setGroupsData(newGroupsData);
  };

  const handleThirdPlaceSelect = (selectedGroups) => {
    setThirdPlaceQualifiers(selectedGroups);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-[#FFD700] animate-pulse text-2xl font-outfit">Loading Tournament Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#FFD700]/20 p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-outfit font-bold text-[#FFD700] tracking-wider uppercase">
            Predictor
          </h1>
          
          {/* Stepper */}
          <div className="flex space-x-2 md:space-x-4">
            <button 
              onClick={() => setStep('group')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${step === 'group' ? 'bg-[#FFD700] text-black' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
            >
              1. Group Stage
            </button>
            <button 
              onClick={() => setStep('thirdPlace')}
              disabled={step === 'group'}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${step === 'thirdPlace' ? 'bg-[#FFD700] text-black' : 'bg-white/10 text-white/50'} ${step === 'group' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
            >
              2. Third Place
            </button>
            <button 
              onClick={() => setStep('knockout')}
              disabled={step === 'group' || step === 'thirdPlace' && thirdPlaceQualifiers.length !== 8}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${step === 'knockout' ? 'bg-[#FFD700] text-black' : 'bg-white/10 text-white/50'} ${(step === 'group' || (step === 'thirdPlace' && thirdPlaceQualifiers.length !== 8)) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
            >
              3. Knockouts
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 mt-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'group' && (
            <motion.div 
              key="group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GroupStageDraggable 
                groupsData={groupsData} 
                onChange={handleGroupRankingsChange} 
                onNext={() => setStep('thirdPlace')}
              />
            </motion.div>
          )}

          {step === 'thirdPlace' && (
            <motion.div 
              key="thirdPlace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThirdPlaceSelector 
                groupsData={groupsData} 
                selected={thirdPlaceQualifiers}
                onSelect={handleThirdPlaceSelect}
                onNext={() => setStep('knockout')}
                onBack={() => setStep('group')}
              />
            </motion.div>
          )}

          {step === 'knockout' && (
            <motion.div 
              key="knockout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VisualBracket 
                groupsData={groupsData}
                thirdPlaceQualifiers={thirdPlaceQualifiers}
                onBack={() => setStep('thirdPlace')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
};

export default BracketPredictor;
