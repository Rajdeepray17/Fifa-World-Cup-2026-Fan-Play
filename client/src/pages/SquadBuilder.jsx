import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { API_URL } from '../config';
import { nations } from '../data/nations';

/* ═══════════════════════════════════════════════════
   POSITION MAP for the 4-3-3 pitch layout
   ═══════════════════════════════════════════════════ */
const POSITIONS = [
  { id: 'GK',  label: 'GK',  style: { bottom: '4%',  left: '50%', transform: 'translateX(-50%)' } },
  { id: 'LB',  label: 'LB',  style: { bottom: '22%', left: '10%' } },
  { id: 'CB1', label: 'CB',  style: { bottom: '18%', left: '33%' } },
  { id: 'CB2', label: 'CB',  style: { bottom: '18%', right: '33%' } },
  { id: 'RB',  label: 'RB',  style: { bottom: '22%', right: '10%' } },
  { id: 'CDM', label: 'CDM', style: { bottom: '42%', left: '50%', transform: 'translateX(-50%)' } },
  { id: 'CM1', label: 'CM',  style: { bottom: '52%', left: '22%' } },
  { id: 'CM2', label: 'CM',  style: { bottom: '52%', right: '22%' } },
  { id: 'LW',  label: 'LW',  style: { top: '18%', left: '12%' } },
  { id: 'ST',  label: 'ST',  style: { top: '12%', left: '50%', transform: 'translateX(-50%)' } },
  { id: 'RW',  label: 'RW',  style: { top: '18%', right: '12%' } },
];

/* Mobile positions matching the user's list request */
const POSITIONS_MOBILE = [
  { id: 'GK',  placeholder: 'Goalkeeper', positionLabel: 'GK' },
  { id: 'LB',  placeholder: 'Left Back', positionLabel: 'LB' },
  { id: 'CB1', placeholder: 'Centre Back', positionLabel: 'CB' },
  { id: 'CB2', placeholder: 'Centre Back', positionLabel: 'CB' },
  { id: 'RB',  placeholder: 'Right Back', positionLabel: 'RB' },
  { id: 'CDM', placeholder: 'Defensive Midfielder', positionLabel: 'CDM' },
  { id: 'CM1', placeholder: 'Centre Midfielder', positionLabel: 'CM' },
  { id: 'CM2', placeholder: 'Centre Midfielder', positionLabel: 'CM' },
  { id: 'RW',  placeholder: 'Right Winger', positionLabel: 'RW' },
  { id: 'LW',  placeholder: 'Left winger', positionLabel: 'LW' },
  { id: 'ST',  placeholder: 'Centre Forward / Striker', positionLabel: 'ST' },
];

const GOLD = '#BF953F';
const GOLD_GRADIENT = 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)';

/* Helper to resolve the nation theme from local nations.js or database theme */
const getNationTheme = (nation) => {
  if (!nation) return { primary: '#333', secondary: '#111', accent: GOLD, flagCode: 'un', name: 'Unknown' };
  
  const found = nations.find(n => 
    n.flagCode?.toLowerCase() === nation.flagCode?.toLowerCase() ||
    n.name?.toLowerCase() === nation.name?.toLowerCase() ||
    n.id?.toLowerCase() === nation.code?.toLowerCase()
  );
  
  if (found) {
    return {
      primary: found.primary,
      secondary: found.secondary,
      accent: found.accent,
      flagCode: found.flagCode,
      name: found.name,
    };
  }
  
  return {
    primary: nation.theme?.primary || '#333',
    secondary: nation.theme?.secondary || '#111',
    accent: nation.theme?.accent || GOLD,
    flagCode: nation.flagCode || 'un',
    name: nation.name || 'Unknown',
  };
};

/* ── Sub-component for filled player box on mobile ── */
const FilledMobileBox = ({ player, posLabel }) => {
  const theme = getNationTheme(player._nation);
  
  return (
    <div
      className="relative flex items-center justify-between p-4 rounded-xl border shadow-lg overflow-hidden transition-all duration-300 active:scale-[0.98]"
      style={{
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        borderColor: theme.accent || GOLD,
      }}
    >
      {/* Background tint for premium text contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      
      {/* Flag background overlay */}
      <img
        src={`https://flagcdn.com/w320/${theme.flagCode}.png`}
        alt=""
        className="absolute right-0 top-0 w-36 h-full object-cover opacity-30 mix-blend-overlay pointer-events-none z-0"
        onError={e => { e.target.style.display = 'none'; }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Shirt Number Badge */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border font-heading font-bold text-base shadow-inner text-white flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent || theme.secondary})`,
            borderColor: theme.accent || GOLD,
          }}
        >
          {player.shirtNumber}
        </div>
        
        {/* Name and Club */}
        <div className="flex flex-col">
          <span className="font-accent font-black text-lg md:text-xl tracking-wide text-white uppercase drop-shadow-md">
            {player.name}
          </span>
          <span className="text-[11px] font-accent text-white/70 tracking-wider font-semibold uppercase">
            {player.club}
          </span>
        </div>
      </div>

      {/* Right side position & flag */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-accent uppercase text-white/60 tracking-wider">Position</span>
          <span
            className="font-heading font-black text-sm px-2 py-0.5 rounded border border-white/20 uppercase"
            style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          >
            {posLabel}
          </span>
        </div>
        <img
          src={`https://flagcdn.com/w40/${theme.flagCode}.png`}
          alt={theme.name}
          className="w-8 h-auto rounded shadow-sm border border-white/10 flex-shrink-0"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
    </div>
  );
};

/* ── Sub-component for empty position box on mobile ── */
const EmptyMobileBox = ({ posLabel, placeholder, canPlace, onClick }) => {
  return (
    <button
      onClick={canPlace ? onClick : undefined}
      disabled={!canPlace}
      className={`relative w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
        canPlace
          ? 'border-yellow-400 bg-yellow-500/10 shadow-[0_0_20px_rgba(250,204,21,0.5)] animate-pulse scale-[1.01] cursor-pointer'
          : 'border-white/10 bg-white/5 cursor-default'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Placeholder Badge */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border border-dashed font-heading font-bold text-sm ${
            canPlace ? 'border-yellow-400 text-yellow-400' : 'border-white/20 text-white/40'
          }`}
        >
          {posLabel}
        </div>
        
        {/* Placeholder Name */}
        <span className={`font-accent font-black text-sm md:text-base tracking-wide uppercase ${
          canPlace ? 'text-yellow-400' : 'text-white/40'
        }`}>
          {placeholder}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {canPlace ? (
          <span className="text-xs font-accent text-yellow-400 font-bold animate-bounce uppercase">
            Place Here ➔
          </span>
        ) : (
          <span className="text-xs font-accent text-white/20 uppercase">
            Empty
          </span>
        )}
      </div>
    </button>
  );
};

/* ═══════════════════════════════════════════════════
   SQUAD BUILDER — Main Page
   ═══════════════════════════════════════════════════ */
const SquadBuilder = () => {
  /* ── Data ── */
  const [allNations, setAllNations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Flow: 'idle' → 'rolling' → 'landed' → 'squad' → 'placing' → back to 'idle' ── */
  const [flowStep, setFlowStep] = useState('idle');
  const [rolledNation, setRolledNation] = useState(null);
  const [nationSquad, setNationSquad] = useState([]);
  const [pickedPlayer, setPickedPlayer] = useState(null);
  const [loadingSquad, setLoadingSquad] = useState(false);
  const [spinsRemaining, setSpinsRemaining] = useState(3);

  /* ── The 11 pitch slots ── */
  const [squad, setSquad] = useState(() => {
    const s = {};
    POSITIONS.forEach(p => (s[p.id] = null));
    return s;
  });

  /* ── Rolling animation state ── */
  const [rollingDisplayIdx, setRollingDisplayIdx] = useState(0);
  const rollTimeoutRef = useRef(null);

  /* ── Mobile responsiveness check & ref ── */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mobileListRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ── Fetch nations once ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/nations?limit=100`);
        const json = await res.json();
        if (json.success && json.data) {
          const valid = json.data.filter(n => !n.isPlaceholder);
          setAllNations(valid);
          // Preload all flags to prevent animation lag
          valid.forEach(nation => {
            const img = new Image();
            img.src = `https://flagcdn.com/w320/${nation.flagCode}.png`;
          });
        } else {
          setError('API returned unexpected format');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* Cleanup rolling timeouts */
  useEffect(() => {
    return () => {
      if (rollTimeoutRef.current) clearTimeout(rollTimeoutRef.current);
    };
  }, []);

  /* ──────────────────────────
     STEP 1: Start the roll
     ────────────────────────── */
  const startRoll = useCallback(() => {
    if (allNations.length === 0 || flowStep === 'rolling') return;
    setFlowStep('rolling');
    setRolledNation(null);

    const winnerIdx = Math.floor(Math.random() * allNations.length);
    let tick = 0;
    const totalTicks = 45;

    const doTick = () => {
      tick++;
      if (tick >= totalTicks) {
        setRollingDisplayIdx(winnerIdx);
        setRolledNation(allNations[winnerIdx]);
        setFlowStep('landed');
        return;
      }
      setRollingDisplayIdx(Math.floor(Math.random() * allNations.length));
      const delay = 40 + Math.pow(tick / totalTicks, 3) * 320;
      rollTimeoutRef.current = setTimeout(doTick, delay);
    };
    doTick();
  }, [allNations, flowStep]);

  /* ──────────────────────────
     STEP 2: Show Squad
     ────────────────────────── */
  const showSquad = useCallback(async () => {
    if (!rolledNation) return;
    setLoadingSquad(true);
    try {
      const res = await fetch(`${API_URL}/players/nation/code/${rolledNation.code}`);
      const json = await res.json();
      if (json.success && json.data) {
        setNationSquad(json.data);
      }
    } catch (e) {
      console.error('Failed to fetch squad:', e);
    } finally {
      setLoadingSquad(false);
    }
    setFlowStep('squad');
  }, [rolledNation]);

  /* ──────────────────────────
     STEP 3: Pick a player
     ────────────────────────── */
  const pickPlayer = (player) => {
    setPickedPlayer(player);
    setFlowStep('placing');
    // Scroll window/list container into view so the empty glowing spots are immediately visible on mobile
    setTimeout(() => {
      if (mobileListRef.current) {
        mobileListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  /* ──────────────────────────
     STEP 4: Place on pitch
     ────────────────────────── */
  const placeOnPitch = (posId) => {
    if (!pickedPlayer || squad[posId]) return;
    setSquad(prev => ({
      ...prev,
      [posId]: { ...pickedPlayer, _nation: rolledNation },
    }));
    setPickedPlayer(null);
    setFlowStep('idle');
    setRolledNation(null);
    setNationSquad([]);
  };

  /* ──────────────────────────
     Export
     ────────────────────────── */
  const handleExport = async () => {
    const exportId = isMobile ? 'lineup-announcement-export' : 'pitch-export';
    const el = document.getElementById(exportId);
    if (!el) return;
    const canvas = await html2canvas(el, { backgroundColor: '#000', scale: 2, useCORS: true });
    const a = document.createElement('a');
    a.download = isMobile ? 'My_WC2026_Lineup_Announcement.jpg' : 'My_WC2026_Starting_XI.jpg';
    a.href = canvas.toDataURL('image/jpeg', 1);
    a.click();
  };

  const filledCount = Object.values(squad).filter(Boolean).length;
  const isComplete = filledCount === 11;
  const displayNation = allNations[rollingDisplayIdx];

  /* ── Loading / Error states ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40 animate-pulse text-xl font-accent">Loading nations…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-400 text-xl font-accent">Error: {error}</p>
        <p className="text-white/40 text-sm">Make sure the backend server is running at localhost:5000</p>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1
              className="text-4xl md:text-5xl font-heading font-black tracking-wider"
              style={{
                background: GOLD_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SQUAD BUILDER
            </h1>
            <p className="text-white/50 font-accent mt-1">{filledCount} / 11 positions filled</p>
          </div>
          {isComplete && (
            <button
              onClick={handleExport}
              className="px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform"
              style={{ background: GOLD_GRADIENT, color: '#000' }}
            >
              Export Starting XI
            </button>
          )}
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ═══ LEFT PANEL: PITCH (DESKTOP) OR BEAUTIFUL LIST (MOBILE) ═══ */}
          <div className="flex-1 min-w-0" ref={mobileListRef}>
            {isMobile ? (
              /* ── MOBILE VIEW: Position Placeholders List ── */
              <div className="flex flex-col gap-3 max-w-xl mx-auto">
                {POSITIONS_MOBILE.map(pos => {
                  const player = squad[pos.id];
                  const isEmpty = !player;
                  const canPlace = flowStep === 'placing' && isEmpty;

                  return isEmpty ? (
                    <EmptyMobileBox
                      key={pos.id}
                      posLabel={pos.positionLabel}
                      placeholder={pos.placeholder}
                      canPlace={canPlace}
                      onClick={() => placeOnPitch(pos.id)}
                    />
                  ) : (
                    <FilledMobileBox
                      key={pos.id}
                      player={player}
                      posLabel={pos.positionLabel}
                    />
                  );
                })}
              </div>
            ) : (
              /* ── DESKTOP VIEW: Normal Football Pitch ── */
              <div className="relative w-full aspect-[2/3] md:aspect-[3/4] max-h-[800px] bg-[#2E8B57] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 mx-auto" id="pitch-export">
                {/* Pitch markings */}
                <div className="absolute inset-0 border-[6px] border-white/40 m-4 md:m-8 rounded" />
                <div className="absolute inset-x-0 top-1/2 h-[6px] bg-white/40 -mt-[3px]" />
                <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full border-[6px] border-white/40 -ml-16 -mt-16 md:-ml-24 md:-mt-24" />
                <div className="absolute top-4 left-1/2 w-64 md:w-96 h-32 md:h-48 border-[6px] border-t-0 border-white/40 -ml-32 md:-ml-48" />
                <div className="absolute bottom-4 left-1/2 w-64 md:w-96 h-32 md:h-48 border-[6px] border-b-0 border-white/40 -ml-32 md:-ml-48" />

                {/* Position slots */}
                {POSITIONS.map(pos => {
                  const player = squad[pos.id];
                  const isEmpty = !player;
                  const canPlace = flowStep === 'placing' && isEmpty;

                  return (
                    <div key={pos.id} className="absolute z-10 flex flex-col items-center" style={pos.style}>
                      {player ? (
                        /* ── Filled slot ── */
                        <div className="flex flex-col items-center">
                          <div
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden relative"
                            style={{
                              background: `linear-gradient(135deg, ${player._nation?.theme?.primary || '#333'}, ${player._nation?.theme?.secondary || '#111'})`,
                              borderColor: player._nation?.theme?.accent || GOLD,
                            }}
                          >
                            <img
                              src={`https://flagcdn.com/w80/${player._nation?.flagCode}.png`}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                              onError={e => { e.target.style.display = 'none'; }}
                            />
                            <span className="relative z-10 text-white font-heading font-bold text-lg drop-shadow-md">
                              {player.shirtNumber}
                            </span>
                          </div>
                          <div className="mt-1 p-1 bg-black/90 rounded border border-white/20 w-20 flex flex-col items-center justify-center">
                            <div style={{ fontFamily: 'sans-serif', fontSize: '10px', lineHeight: '1.2', color: '#ffffff', textAlign: 'center', width: '100%', wordWrap: 'break-word' }}>
                              {player.name}
                            </div>
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <img src={`https://flagcdn.com/w20/${player._nation?.flagCode}.png`} alt="" className="w-3 h-2" />
                              <span style={{ fontFamily: 'sans-serif', fontSize: '9px', fontWeight: 'bold', color: GOLD }}>{pos.label}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ── Empty slot ── */
                        <button
                          onClick={() => canPlace && placeOnPitch(pos.id)}
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 border-dashed shadow-lg backdrop-blur-sm transition-all duration-300 ${
                            canPlace
                              ? 'border-[#FFD700] bg-[#FFD700]/25 scale-110 shadow-[0_0_25px_rgba(255,215,0,0.5)] animate-pulse cursor-pointer'
                              : 'border-white/40 bg-black/40 cursor-default'
                          }`}
                        >
                          <span className={`font-bold text-xs tracking-wider ${canPlace ? 'text-[#FFD700]' : 'text-white/60'}`}>
                            {pos.label}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ═══ RIGHT PANEL ═══ */}
          <div className="w-full lg:w-[420px] flex-shrink-0">
            <AnimatePresence mode="wait">

              {/* ── IDLE: Spin button ── */}
              {(flowStep === 'idle' || flowStep === 'rolling' || flowStep === 'landed') && (
                <motion.div
                  key="spin-panel"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center"
                >
                  <h3 className="text-xl font-heading font-bold text-white mb-2 tracking-wider uppercase self-start">
                    Step 1 — Spin
                  </h3>
                  <p className="text-white/40 text-sm mb-6 self-start">
                    {isComplete
                      ? 'Your XI is complete! Export your squad.'
                      : 'Spin to reveal a random qualified nation.'}
                  </p>

                  {!isComplete && (
                    <div className="flex flex-col items-center space-y-6 w-full">

                      {/* Flag circle */}
                      <div
                        className={`w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                          flowStep === 'landed'
                            ? 'border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.4)]'
                            : flowStep === 'rolling'
                            ? 'border-white/30 shadow-lg'
                            : 'border-white/10'
                        }`}
                      >
                        {displayNation ? (
                          <img
                            src={`https://flagcdn.com/w320/${displayNation.flagCode}.png`}
                            alt={displayNation.name}
                            className={`w-full h-full object-cover transition-all duration-150 ${
                              flowStep === 'rolling' ? 'blur-[1px] scale-110' : 'blur-0 scale-100'
                            }`}
                            onError={e => {
                              e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span className="text-white/20 text-5xl">?</span>
                          </div>
                        )}
                      </div>

                      {/* Nation name */}
                      <p className={`text-2xl md:text-3xl font-heading font-bold text-center tracking-wider min-h-[2.5rem] ${
                        flowStep === 'landed' ? 'text-white' : 'text-white/30'
                      }`}>
                        {flowStep === 'idle' && !displayNation ? 'Press Spin' : displayNation?.name || '?'}
                      </p>

                      {/* Action buttons */}
                      {flowStep === 'idle' && (
                        <button
                          onClick={startRoll}
                          className="px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(191,149,63,0.3)]"
                          style={{ background: GOLD_GRADIENT, color: '#000' }}
                        >
                          🎰 Spin the Wheel
                        </button>
                      )}

                      {flowStep === 'rolling' && (
                        <p className="text-white/40 text-lg font-accent animate-pulse tracking-widest uppercase">
                          Rolling…
                        </p>
                      )}

                      {flowStep === 'landed' && rolledNation && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', bounce: 0.4 }}
                          onClick={showSquad}
                          className="px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_20px_rgba(191,149,63,0.3)]"
                          style={{ background: GOLD_GRADIENT, color: '#000' }}
                        >
                          Show Squad →
                        </motion.button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── SQUAD: 26-man list ── */}
              {flowStep === 'squad' && rolledNation && (
                <motion.div
                  key="squad-panel"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 max-h-[80vh] overflow-y-auto"
                >
                  {/* Nation header */}
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={`https://flagcdn.com/w40/${rolledNation.flagCode}.png`}
                      alt={rolledNation.name}
                      className="w-8 h-auto rounded-sm shadow"
                      onError={e => {
                        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg';
                      }}
                    />
                    <h3 className="text-lg font-heading font-bold text-white tracking-wider uppercase">
                      {rolledNation.name}
                    </h3>
                    <span className="ml-auto text-white/30 text-xs font-accent">{nationSquad.length}-man squad</span>
                  </div>

                  <p className="text-white/40 text-sm mb-4">Tap a player to select them, then place on the pitch.</p>

                  {loadingSquad ? (
                    <p className="text-white/30 animate-pulse py-8 text-center">Loading squad…</p>
                  ) : (
                    <div className="space-y-2">
                      {nationSquad.map(player => {
                        const used = Object.values(squad).some(s => s && s._id === player._id);
                        return (
                          <button
                            key={player._id}
                            onClick={() => !used && pickPlayer(player)}
                            disabled={used}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                              used
                                ? 'border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed'
                                : 'border-white/10 bg-black/30 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5 cursor-pointer'
                            }`}
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${rolledNation.theme?.primary || '#333'}, ${rolledNation.theme?.accent || '#555'})`,
                                color: '#fff',
                              }}
                            >
                              {player.shirtNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-semibold truncate">{player.name}</p>
                              <p className="text-white/40 text-xs truncate">{player.club}</p>
                            </div>
                            {used && <span className="text-green-400 text-xs flex-shrink-0">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (spinsRemaining > 0) {
                        setSpinsRemaining(prev => prev - 1);
                        setFlowStep('idle');
                        setRolledNation(null);
                        setNationSquad([]);
                      }
                    }}
                    disabled={spinsRemaining === 0}
                    className={`mt-6 w-full py-3 rounded-lg border border-white/10 text-sm font-accent uppercase tracking-wider transition-colors ${
                      spinsRemaining === 0
                        ? 'text-white/20 bg-white/5 cursor-not-allowed'
                        : 'text-white/50 hover:text-white hover:border-white/30'
                    }`}
                  >
                    ← Spin Again ({spinsRemaining} left)
                  </button>
                </motion.div>
              )}

              {/* ── PLACING: Pick a position ── */}
              {flowStep === 'placing' && pickedPlayer && (
                <motion.div
                  key="placing-panel"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-heading font-bold text-white mb-4 tracking-wider uppercase">
                    Place Player
                  </h3>

                  <div
                    className="rounded-xl overflow-hidden mb-6 border border-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${rolledNation?.theme?.primary || '#222'}33, ${rolledNation?.theme?.secondary || '#000'}33)`,
                    }}
                  >
                    <div className="p-5 flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${rolledNation?.theme?.primary || '#333'}, ${rolledNation?.theme?.accent || '#555'})`,
                          color: '#fff',
                        }}
                      >
                        {pickedPlayer.shirtNumber}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-lg font-bold truncate">{pickedPlayer.name}</p>
                        <p className="text-white/50 text-sm">{rolledNation?.name}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/50 text-sm mb-4">
                    Click an <span className="font-bold" style={{ color: GOLD }}>empty position</span> {isMobile ? 'in the list above' : 'on the pitch'} to place this player.
                  </p>

                  <button
                    onClick={() => {
                      setPickedPlayer(null);
                      setFlowStep('squad');
                    }}
                    className="w-full py-3 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors text-sm font-accent uppercase tracking-wider"
                  >
                    ← Back to Squad
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* ── HIDDEN EXPORT POSTER (FOR LINEUP ANNOUNCEMENT Capture) ── */}
        <div
          id="lineup-announcement-export"
          className="absolute"
          style={{
            left: '-9999px',
            top: '0',
            width: '800px',
            height: '1200px',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, #050508 0%, #12121c 100%)',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '10px solid #BF953F',
            boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.9)',
          }}
        >
          {/* Background texture/elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 20% 30%, #BF953F 0%, transparent 60%), radial-gradient(circle at 80% 70%, #8b6914 0%, transparent 50%)'
          }} />
          
          {/* Header */}
          <div className="text-center relative z-10 flex flex-col items-center">
            <div className="text-xs uppercase tracking-[0.4em] font-accent text-[#BF953F] font-bold mb-2">
              FIFA World Cup 2026
            </div>
            <h2
              className="text-5xl font-heading font-black tracking-[0.1em] uppercase mb-1"
              style={{
                background: GOLD_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              STARTING XI
            </h2>
            <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-[#BF953F] to-transparent my-3" />
            <p className="text-sm font-accent text-white/60 tracking-wider">
              SQUAD BUILDER LINEUP ANNOUNCEMENT
            </p>
          </div>

          {/* Players List */}
          <div className="my-8 flex flex-col gap-[14px] relative z-10">
            {POSITIONS_MOBILE.map(pos => {
              const player = squad[pos.id];
              
              if (player) {
                const theme = getNationTheme(player._nation);
                return (
                  <div
                    key={pos.id}
                    className="flex items-center justify-between p-[14px] rounded-lg border shadow-md overflow-hidden relative"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                      borderColor: theme.accent || GOLD,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/45 z-0" />
                    <img
                      src={`https://flagcdn.com/w320/${theme.flagCode}.png`}
                      alt=""
                      className="absolute right-0 top-0 w-36 h-full object-cover opacity-25 mix-blend-overlay pointer-events-none z-0"
                    />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border font-heading font-bold text-sm text-white flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent || theme.secondary})`,
                          borderColor: theme.accent || GOLD,
                        }}
                      >
                        {player.shirtNumber}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-accent font-black text-base tracking-wide text-white uppercase">
                          {player.name}
                        </span>
                        <span className="text-[10px] font-accent text-white/70 uppercase">
                          {player.club}
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                      <span
                        className="font-heading font-black text-xs px-2 py-0.5 rounded border border-white/20 uppercase"
                        style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                      >
                        {pos.positionLabel}
                      </span>
                      <img
                        src={`https://flagcdn.com/w40/${theme.flagCode}.png`}
                        alt=""
                        className="w-7 h-auto rounded border border-white/10"
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={pos.id}
                    className="flex items-center justify-between p-[14px] rounded-lg border border-white/10 bg-white/[0.03] opacity-60"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/30 font-bold text-xs">
                        {pos.positionLabel}
                      </div>
                      <span className="font-accent font-black text-sm uppercase text-white/30 tracking-wider">
                        {pos.placeholder}
                      </span>
                    </div>
                    <span className="text-[10px] font-accent text-white/20 uppercase tracking-widest">
                      VACANT
                    </span>
                  </div>
                );
              }
            })}
          </div>

          {/* Footer */}
          <div className="text-center relative z-10 flex flex-col items-center">
            <div className="h-[1px] w-full bg-white/10 mb-4" />
            <div className="text-[10px] font-accent text-[#BF953F] tracking-[0.3em] uppercase font-bold">
              United 2026 • Canada • Mexico • USA
            </div>
            <div className="text-[9px] text-white/30 font-accent mt-1">
              Generated via Squad Builder Fan Play
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadBuilder;
