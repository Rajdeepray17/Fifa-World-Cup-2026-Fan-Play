import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { API_URL } from '../config';
import GroupTable from '../components/groups/GroupTable';

const Groups = () => {
  const [loading, setLoading] = useState(true);
  const [groupsData, setGroupsData] = useState({});
  const { selectedNation } = useTheme();

  useEffect(() => {
    const fetchNations = async () => {
      try {
        const response = await fetch(`${API_URL}/nations?limit=100`);
        const data = await response.json();
        
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="loading-ring w-12 h-12"></div>
      </div>
    );
  }

  const groupLetters = ['A','B','C','D','E','F','G','H','I','J','K','L'];

  return (
    <div className="min-h-screen bg-black text-white font-inter pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-outfit font-bold tracking-widest uppercase mb-4 text-[#FFD700]">
            Tournament Groups
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            The road to glory begins here. 48 nations divided into 12 groups. 
            Only the top two from each group and the 8 best third-placed teams advance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {groupLetters.map((letter, index) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GroupTable 
                letter={letter} 
                teams={groupsData[letter] || []} 
                selectedNationCode={selectedNation?.code}
                theme={selectedNation?.theme}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
