import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../config';
import { useTheme } from '../../context/ThemeContext';

export default function NationStatusModal({ isOpen, onClose, nation }) {
  const { refreshGlobalData } = useTheme();
  const [status, setStatus] = useState('Active');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (nation) {
      setStatus(nation.status || 'Active');
      setError(null);
    }
  }, [nation]);

  if (!nation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const adminPin = localStorage.getItem('fifa-wc2026-admin-pin') || '';
      const res = await fetch(`${API_URL}/nations/${nation._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update status');
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
            className="relative z-10 w-full max-w-md bg-[#151515] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 font-inter text-white"
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
                Group {nation.group} • Standings Control
              </span>
              <h3 className="font-outfit text-2xl font-bold uppercase tracking-wider">
                Update Status
              </h3>
              <p className="text-white/40 text-xs mt-1">
                Manage qualification status for {nation.name}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nation Header */}
              <div className="flex items-center justify-center space-x-4 py-4 px-3 bg-white/5 rounded-xl border border-white/5">
                <img
                  src={`https://flagcdn.com/w80/${nation.flagCode}.png`}
                  alt={nation.name}
                  className="w-12 h-8 object-cover rounded shadow"
                  onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' }}
                />
                <span className="text-lg font-bold">
                  {nation.name}
                </span>
              </div>

              {/* Status Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60">
                  Qualify / Eliminate
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'Active', label: 'Active', desc: 'In contention', color: 'border-white/10 text-white hover:bg-white/5' },
                    { val: 'Qualified', label: 'Qualified', desc: 'Qualified', color: 'border-[#FFD700]/30 text-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/10' },
                    { val: 'Eliminated', label: 'Eliminated', desc: 'Eliminated', color: 'border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10' }
                  ].map((opt) => {
                    const isSelected = status === opt.val;
                    return (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setStatus(opt.val)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 ${
                          isSelected 
                            ? opt.val === 'Qualified'
                              ? 'border-[#FFD700] bg-[#FFD700]/20 text-white ring-1 ring-[#FFD700]'
                              : opt.val === 'Eliminated'
                                ? 'border-red-500 bg-red-500/20 text-white ring-1 ring-red-500'
                                : 'border-white bg-white/10 text-white ring-1 ring-white'
                            : opt.color
                        }`}
                      >
                        <span className="text-sm font-bold block">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

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
                  disabled={submitting}
                  className="w-1/2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold py-3 rounded-xl transition-all hover:brightness-110 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-center text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save Status'
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
