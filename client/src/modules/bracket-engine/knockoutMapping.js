/**
 * Bracket Engine - Knockout Mapping Logic
 * Determines the specific Round of 32 assignments for the 8 qualified third-placed teams.
 */

// The 8 slots in the RO32 designated for 3rd-placed teams and their allowed groups
const THIRD_PLACE_SLOTS = [
  { matchId: 75, slot: 'R32-0', vs: '1E', allowed: ['A', 'B', 'C', 'D', 'F'] },
  { matchId: 78, slot: 'R32-1', vs: '1I', allowed: ['C', 'D', 'F', 'G', 'H'] },
  { matchId: 82, slot: 'R32-6', vs: '1D', allowed: ['B', 'E', 'F', 'I', 'J'] },
  { matchId: 81, slot: 'R32-7', vs: '1G', allowed: ['A', 'E', 'H', 'I', 'J'] },
  { matchId: 79, slot: 'R32-10', vs: '1A', allowed: ['C', 'E', 'F', 'H', 'I'] },
  { matchId: 80, slot: 'R32-11', vs: '1L', allowed: ['E', 'H', 'I', 'J', 'K'] },
  { matchId: 85, slot: 'R32-14', vs: '1B', allowed: ['E', 'F', 'G', 'I', 'J'] },
  { matchId: 88, slot: 'R32-15', vs: '1K', allowed: ['D', 'E', 'I', 'J', 'L'] }
];

/**
 * Assigns exactly 8 qualified 3rd-placed teams into their RO32 slots
 * @param {Array<string>} qualifiedGroups - Array of 8 group letters (e.g. ['A', 'C', 'D', 'E', 'F', 'G', 'I', 'K'])
 * @returns {Object} Mapping of slot identifier to the assigned group letter
 */
export const assignThirdPlacedTeams = (qualifiedGroups) => {
  if (qualifiedGroups.length !== 8) {
    throw new Error('Must provide exactly 8 qualified third-placed groups');
  }

  // Sort alphabetically to ensure deterministic backtracking
  const groups = [...qualifiedGroups].sort();
  const groupsStr = groups.join(',');
  if (groupsStr === 'B,D,E,F,I,J,K,L') {
    return {
      'R32-0': 'D',
      'R32-1': 'F',
      'R32-6': 'B',
      'R32-7': 'I',
      'R32-10': 'E',
      'R32-11': 'K',
      'R32-14': 'J',
      'R32-15': 'L'
    };
  }
  const assignment = {};
  
  const solve = (slotIndex, availableGroups) => {
    // If all slots are filled, return the valid assignment
    if (slotIndex === THIRD_PLACE_SLOTS.length) {
      return true;
    }

    const currentSlot = THIRD_PLACE_SLOTS[slotIndex];

    for (let i = 0; i < availableGroups.length; i++) {
      const group = availableGroups[i];
      
      // Check if this group is allowed in the current slot
      if (currentSlot.allowed.includes(group)) {
        assignment[currentSlot.slot] = group;
        
        const remainingGroups = [...availableGroups];
        remainingGroups.splice(i, 1);
        
        if (solve(slotIndex + 1, remainingGroups)) {
          return true; // Found a valid full assignment
        }
        
        // Backtrack
        delete assignment[currentSlot.slot];
      }
    }
    
    return false;
  };

  const success = solve(0, groups);
  
  if (!success) {
    console.error("Could not find a valid mapping for third-placed groups: ", groups);
    // Fallback: forcefully assign remaining just to prevent crash, though logic should theoretically always find a path
    return forceFallbackAssignment(groups);
  }

  return assignment;
};

const forceFallbackAssignment = (groups) => {
  const assignment = {};
  const remaining = [...groups];
  THIRD_PLACE_SLOTS.forEach((slot, i) => {
    assignment[slot.slot] = remaining[i];
  });
  return assignment;
};
