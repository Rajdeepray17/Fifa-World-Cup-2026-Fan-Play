import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useBeforeUnload } from './hooks/useBeforeUnload';

/* Eager imports for critical path */
import EntryExperience from './pages/EntryExperience';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/* Lazy imports for pages (code-splitting) */
const Home = lazy(() => import('./pages/Home'));
const Placeholder = lazy(() => import('./pages/Placeholder'));
const Activity = lazy(() => import('./pages/Activity'));
const BracketPredictor = lazy(() => import('./pages/BracketPredictor'));
const SquadBuilder = lazy(() => import('./pages/SquadBuilder'));
const TriviaGame = lazy(() => import('./pages/TriviaGame'));

/**
 * AppInner — The actual app layout, placed inside ThemeProvider
 * so it can consume theme context.
 */
function AppInner() {
  const { isNationSelected } = useTheme();

  /* Warn on unload only after nation selection */
  useBeforeUnload(isNationSelected);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isNationSelected && <EntryExperience key="entry" />}
      </AnimatePresence>

      {isNationSelected && (
        <Router>
          <Navbar />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="loading-ring w-8 h-8" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/activity/bracket" element={<BracketPredictor />} />
              <Route path="/activity/squad-builder" element={<SquadBuilder />} />
              <Route path="/activity/trivia" element={<TriviaGame />} />
              <Route path="/groups" element={<Placeholder />} />
              <Route path="/fixtures" element={<Placeholder />} />
              <Route path="/memories" element={<Placeholder />} />
              <Route path="/your-team" element={<Placeholder />} />
              <Route path="/contact" element={<Placeholder />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      )}
    </>
  );
}

/**
 * App — Root component wrapping everything in ThemeProvider.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
