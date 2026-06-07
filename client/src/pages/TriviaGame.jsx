import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { triviaQuestions } from '../data/triviaQuestions';

const TOTAL_QUESTIONS = 30;

const TriviaGame = () => {
  const [gameState, setGameState] = useState('start'); // 'start' | 'playing' | 'result'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [questions, setQuestions] = useState([]);

  const shuffleQuestions = useCallback(() => {
    const shuffled = [...triviaQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
  }, []);

  useEffect(() => {
    shuffleQuestions();
  }, [shuffleQuestions]);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && !isAnswerRevealed && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswerRevealed && gameState === 'playing') {
      handleAnswerSelect(null);
    }
    return () => clearInterval(timer);
  }, [gameState, isAnswerRevealed, timeLeft]);

  const startGame = () => {
    shuffleQuestions();
    setGameState('playing');
    setCurrentQIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(15);
    setIsAnswerRevealed(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answer) => {
    if (isAnswerRevealed) return;

    setSelectedAnswer(answer);
    setIsAnswerRevealed(true);

    const currentQ = questions[currentQIndex];
    if (answer === currentQ.correctAnswer) {
      const timeBonus = Math.floor(timeLeft * (currentQ.points / 15));
      setScore(prev => prev + currentQ.points + timeBonus);
      setCorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setTimeLeft(15);
        setIsAnswerRevealed(false);
        setSelectedAnswer(null);
      } else {
        setGameState('result');
      }
    }, 2000);
  };

  const getGrade = () => {
    const pct = correctCount / TOTAL_QUESTIONS;
    if (pct >= 0.9) return { label: 'World Class', emoji: '🏆' };
    if (pct >= 0.7) return { label: 'Professional', emoji: '⭐' };
    if (pct >= 0.5) return { label: 'Semi-Pro', emoji: '💪' };
    if (pct >= 0.3) return { label: 'Amateur', emoji: '🎓' };
    return { label: 'Sunday League', emoji: '😅' };
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4 flex flex-col items-center justify-center">

      <AnimatePresence mode="wait">

        {/* ── START SCREEN ── */}
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center space-y-8 max-w-2xl"
          >
            <h1
              className="text-6xl md:text-8xl font-heading font-black tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BALL KNOWLEDGE
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-accent">
              30 questions. Answer quickly for bonus points. No going back.
            </p>
            <button
              onClick={startGame}
              className="mt-8 px-12 py-5 rounded-full font-bold text-2xl uppercase tracking-wider transition-transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)',
                color: '#000',
              }}
            >
              Start Challenge
            </button>
          </motion.div>
        )}

        {/* ── PLAYING SCREEN ── */}
        {gameState === 'playing' && questions.length > 0 && (
          <motion.div
            key={`q-${currentQIndex}`}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
          >
            {/* Header bar */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="text-lg font-heading font-bold" style={{ color: '#FFD700' }}>
                Q{currentQIndex + 1} <span className="text-white/30">/ {TOTAL_QUESTIONS}</span>
              </div>
              <div className="text-lg font-bold font-mono text-white">
                SCORE: <span style={{ color: '#FFD700' }}>{score}</span>
              </div>
            </div>

            {/* Timer */}
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-8">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / 15) * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
                style={{ backgroundColor: timeLeft <= 5 ? '#ef4444' : '#FFD700' }}
              />
            </div>

            {/* Question */}
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-center leading-snug text-white">
                {questions[currentQIndex].question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQIndex].options.map((opt, i) => {
                let cls = 'bg-white/5 border-white/10 hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5';

                if (isAnswerRevealed) {
                  if (opt === questions[currentQIndex].correctAnswer) {
                    cls = 'bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]';
                  } else if (opt === selectedAnswer) {
                    cls = 'bg-red-500/20 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
                  } else {
                    cls = 'bg-white/5 border-white/5 opacity-40';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(opt)}
                    disabled={isAnswerRevealed}
                    className={`p-5 rounded-xl border-2 text-lg font-semibold transition-all duration-200 text-left ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── RESULT SCREEN ── */}
        {gameState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl bg-white/5 border border-white/10 p-12 rounded-3xl"
          >
            <p className="text-6xl mb-4">{getGrade().emoji}</p>
            <h2 className="text-2xl font-heading text-white/50 mb-2 uppercase tracking-widest">
              {getGrade().label}
            </h2>
            <div
              className="text-7xl md:text-9xl font-black font-heading mb-4"
              style={{
                background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {score}
            </div>
            <p className="text-white/60 text-xl mb-8">
              {correctCount} / {TOTAL_QUESTIONS} correct
            </p>

            <button
              onClick={startGame}
              className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold text-xl uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default TriviaGame;
