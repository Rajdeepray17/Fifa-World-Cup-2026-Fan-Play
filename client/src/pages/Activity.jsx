import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const activities = [
  {
    id: 'bracket',
    title: 'Bracket Predictor',
    description: 'Predict the entire tournament path — from group stage rankings to the World Cup Champion. Uses official FIFA 2026 knockout mapping.',
    path: '/activity/bracket',
    icon: '🏆',
    gradient: 'from-amber-500/20 to-yellow-600/20',
    border: 'border-amber-500/30',
    accent: '#FFD700',
  },
  {
    id: 'squad',
    title: 'Squad Builder',
    description: 'Spin the wheel, reveal a random nation, and draft their best players into your ultimate Starting XI.',
    path: '/activity/squad-builder',
    icon: '⚽',
    gradient: 'from-emerald-500/20 to-green-600/20',
    border: 'border-emerald-500/30',
    accent: '#34D399',
  },
  {
    id: 'trivia',
    title: 'Ball Knowledge',
    description: '30 questions. Easy, Medium, Hard — all mixed. Test your World Cup knowledge against the clock.',
    path: '/activity/trivia',
    icon: '🧠',
    gradient: 'from-blue-500/20 to-indigo-600/20',
    border: 'border-blue-500/30',
    accent: '#60A5FA',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Activity() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl md:text-7xl font-heading font-black tracking-wider mb-4"
            style={{
              background: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ACTIVITIES
          </h1>
          <p className="text-white/50 text-lg md:text-xl font-accent max-w-2xl mx-auto">
            Immerse yourself in the World Cup experience. Predict the bracket, build your dream squad, or test your football knowledge.
          </p>
        </motion.div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={activity.path}
                className={`group block relative overflow-hidden rounded-2xl border ${activity.border} bg-gradient-to-br ${activity.gradient} backdrop-blur-sm p-8 h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,215,0,0.15)]`}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: activity.accent }}
                />

                <div className="relative z-10">
                  <span className="text-5xl mb-6 block">{activity.icon}</span>

                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 tracking-wide group-hover:text-gold transition-colors">
                    {activity.title}
                  </h2>

                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-accent tracking-wider uppercase" style={{ color: activity.accent }}>
                    <span>Play Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
