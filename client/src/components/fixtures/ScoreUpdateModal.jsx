import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../config';
import { useTheme } from '../../context/ThemeContext';

export default function ScoreUpdateModal({ isOpen, onClose, fixture }) {
  const { refreshGlobalData } = useTheme();
  const [status, setStatus] = useState('Scheduled');
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homePenalties, setHomePenalties] = useState('');
  const [awayPenalties, setAwayPenalties] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fixture) {
      setStatus(fixture.status || 'Scheduled');
      setHomeScore(fixture.score?.home || 0);
      setAwayScore(fixture.score?.away || 0);
      setHomePenalties(fixture.score?.penalties?.home !== null ? String(fixture.score.penalties.home) : '');
      setAwayPenalties(fixture.score?.penalties?.away !== null ? String(fixture.score.penalties.away) : '');
      setError(null);
    }
  }, [fixture]);

  if (!fixture) return null;

  const home = fixture.homeTeam || { name: fixture.homeTeamPlaceholder || 'TBD', flagCode: 'un' };
  const away = fixture.awayTeam || { name: fixture.awayTeamPlaceholder || 'TBD', flagCode: 'un' };

  // Knockout check
  const isKnockout = fixture.round !== 'Group Stage';
  const showPenalties = status === 'Completed' && isKnockout && Number(homeScore) === Number(awayScore);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      status,
      score: {
        home: Number(homeScore),
        away: Number(awayScore),
        penalties: showPenalties && homePenalties !== '' && awayPenalties !== ''
          ? { home: Number(homePenalties), away: Number(awayPenalties) }
          : { home: null, away: null }
      }
    };

    try {
      const adminPin = localStorage.getItem('fifa-wc2026-admin-pin') || '';
      const res = await fetch(`${API_URL}/fixtures/${fixture._id}/score`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update score');
      }

      await refreshGlobalData();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-lg bg-[#151515] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 font-inter text-white"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6 border-b border-white/5 pb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase block mb-1">
                {fixture.round} {fixture.group ? `• Group ${fixture.group}` : ''}
              </span>
              <h3 className="font-outfit text-2xl font-bold uppercase tracking-wider">
                Match Controller
              </h3>
              <p className="text-white/40 text-xs mt-1">
                Match Number {fixture.matchNumber} • Live Simulator
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Matchup Header */}
              <div className="grid grid-cols-3 items-center gap-4 py-4 px-3 bg-white/5 rounded-xl border border-white/5">
                {/* Home */}
                <div className="flex flex-col items-center text-center">
                  {home.flagCode && home.flagCode !== 'un' ? (
                    <img
                      src={`https://flagcdn.com/w80/${home.flagCode}.png`}
                      alt={home.name}
                      className="w-12 h-8 object-cover rounded shadow"
                    />
                  ) : (
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-white/30 text-xs">
                      ?
                    </div>
                  )}
                  <span className="text-xs font-bold mt-2 truncate w-full">
                    {home.name}
                  </span>
                </div>

                {/* VS */}
                <div className="text-center">
                  <span className="font-outfit font-black italic text-2xl text-white/20">
                    VS
                  </span>
                </div>

                {/* Away */}
                <div className="flex flex-col items-center text-center">
                  {away.flagCode && away.flagCode !== 'un' ? (
                    <img
                      src={`https://flagcdn.com/w80/${away.flagCode}.png`}
                      alt={away.name}
                      className="w-12 h-8 object-cover rounded shadow"
                    />
                  ) : (
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-white/30 text-xs">
                      ?
                    </div>
                  )}
                  <span className="text-xs font-bold mt-2 truncate w-full">
                    {away.name}
                  </span>
                </div>
              </div>

              {/* Status Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60">
                  Match Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FFD700]/50 transition-colors cursor-pointer appearance-none"
                >
                  <option value="Scheduled" className="bg-[#151515]">Scheduled</option>
                  <option value="Live" className="bg-[#151515]">Live</option>
                  <option value="Completed" className="bg-[#151515]">Completed</option>
                </select>
              </div>

              {/* Score Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60">
                    {home.name} Goals
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={homeScore}
                    onChange={(e) => setHomeScore(Math.max(0, parseInt(e.target.value) || 0))}
                    disabled={status === 'Scheduled'}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-center font-bold font-outfit text-xl focus:outline-none focus:border-[#FFD700]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60">
                    {away.name} Goals
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={awayScore}
                    onChange={(e) => setAwayScore(Math.max(0, parseInt(e.target.value) || 0))}
                    disabled={status === 'Scheduled'}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-center font-bold font-outfit text-xl focus:outline-none focus:border-[#FFD700]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              {/* Penalties Section */}
              {showPenalties && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 border-t border-white/5 pt-4"
                >
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                    Penalty Shoot-out Standings
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-white/40 block font-semibold">
                        {home.name} Pens
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={homePenalties}
                        onChange={(e) => setHomePenalties(e.target.value)}
                        placeholder="Pens scored"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-white text-center font-bold text-sm focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-white/40 block font-semibold">
                        {away.name} Pens
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={awayPenalties}
                        onChange={(e) => setAwayPenalties(e.target.value)}
                        placeholder="Pens scored"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-3 text-white text-center font-bold text-sm focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                      />
                    </div>
                  </div>
                  {homePenalties !== '' && awayPenalties !== '' && Number(homePenalties) === Number(awayPenalties) && (
                    <p className="text-[10px] text-red-500 font-semibold text-center mt-1">
                      Penalties cannot end in a draw. One team must win.
                    </p>
                  )}
                </motion.div>
              )}

              {error && (
                <div className="text-red-500 text-xs font-semibold text-center bg-red-500/10 border border-red-500/20 py-2.5 px-4 rounded-xl">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all cursor-pointer text-center text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || (showPenalties && homePenalties !== '' && awayPenalties !== '' && Number(homePenalties) === Number(awayPenalties))}
                  className="w-1/2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold py-3 rounded-xl transition-all hover:brightness-110 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-center text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save Result'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
