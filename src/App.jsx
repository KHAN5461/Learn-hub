import React, { useState, useEffect, useRef, useCallback } from 'react';
import FlipBook from './components/FlipBook';
import FullDashboard from './components/dashboard/FullDashboard';
import { soundFx } from './utils/sound';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const totalLeaves = 3;
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [view, setView] = useState('book'); // 'book' | 'dashboard'
  const [isMuted, setIsMuted] = useState(false);

  const [flippedCount, setFlippedCount] = useState(totalLeaves);
  const [flippingIndex, setFlippingIndex] = useState(null);

  // Loading phase: book structure fades, spinner floats in center
  const [isLoading, setIsLoading] = useState(false);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const next = soundFx.toggleMute();
    setIsMuted(!next);
  };

  const [user, setUser] = useState({
    name: 'Alex Rivers',
    email: 'alex.rivers@study.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    streak: 14,
    xp: 3450,
    level: 'Level 5 Scholar',
    track: 'Neuroscience & AI',
  });

  const closeTimersRef = useRef([]);

  const closeAllPages = useCallback(() => {
    closeTimersRef.current.forEach(clearTimeout);
    closeTimersRef.current = [];
    const delayStep = 100;
    for (let i = totalLeaves - 1; i >= 0; i--) {
      const stepIndex = totalLeaves - 1 - i;
      const t = setTimeout(() => {
        setFlippingIndex(i);
        setFlippedCount(i);
        soundFx.playPageFlip(1.3);
        if (i === 0) {
          setTimeout(() => {
            setFlippingIndex(null);
            soundFx.playSnap();
          }, 350);
        }
      }, stepIndex * delayStep);
      closeTimersRef.current.push(t);
    }
  }, [totalLeaves]);

  // Initial load animation
  useEffect(() => {
    if (view === 'book') {
      const t = setTimeout(() => closeAllPages(), 200);
      return () => {
        clearTimeout(t);
        closeTimersRef.current.forEach(clearTimeout);
      };
    }
  }, [closeAllPages, view]);

  const goToPage = useCallback((targetPage) => {
    setFlippedCount((current) => {
      if (current === targetPage) return current;
      setFlippingIndex(targetPage > current ? current : targetPage);
      soundFx.playPageFlip(1.1);
      setTimeout(() => setFlippingIndex(null), 400);
      return targetPage;
    });
  }, []);

  const flipNext = useCallback(() => {
    setFlippedCount((current) => {
      if (current >= totalLeaves) return current;
      setFlippingIndex(current);
      soundFx.playPageFlip(1.0);
      setTimeout(() => setFlippingIndex(null), 380);
      return current + 1;
    });
  }, [totalLeaves]);

  const flipPrev = useCallback(() => {
    setFlippedCount((current) => {
      if (current <= 0) return current;
      const target = current - 1;
      setFlippingIndex(target);
      soundFx.playPageFlip(1.0);
      setTimeout(() => setFlippingIndex(null), 380);
      return target;
    });
  }, []);

  /**
   * Login Transition Sequence
   * ─────────────────────────
   * 1. Flip all remaining leaves sequentially to the end
   * 2. Show loading spinner on the back cover
   * 3. isLoading=true → open book slides to center, fades out
   * 4. Floating centered spinner persists
   * 5. Switch cleanly into dashboard
   */
  const triggerFlipTransition = (userData, fromLeaf) => {
    setUser(userData);

    const FLIP_GAP = 270;
    const FLIP_ANIM = 400;

    for (let i = fromLeaf; i < totalLeaves; i++) {
      const leafI = i;
      const delay = (i - fromLeaf) * FLIP_GAP;
      setTimeout(() => {
        soundFx.playPageFlip(1.0 + (i - fromLeaf) * 0.12);
        setFlippingIndex(leafI);
        setFlippedCount(leafI + 1);
        setTimeout(() => setFlippingIndex(null), FLIP_ANIM);
      }, delay);
    }

    const allFlipsDone = (totalLeaves - fromLeaf) * FLIP_GAP + FLIP_ANIM + 120;

    setTimeout(() => {
      setIsLoading(true);
    }, allFlipsDone);

    setTimeout(() => {
      setView('dashboard');
      setIsLoading(false);
    }, allFlipsDone + 1400);
  };

  const handleLogin = (userData) => triggerFlipTransition(userData, 1);
  const handleSignUp = (userData) => triggerFlipTransition(userData, 2);

  // Sign out: Switch to open book state and trigger rapid close animation
  const handleSignOut = () => {
    setFlippedCount(totalLeaves);
    setView('book');
    setTimeout(() => {
      closeAllPages();
    }, 250);
  };

  return (
    <div
      className={`h-screen w-full flex items-center justify-center relative overflow-hidden select-none transition-colors duration-500 ${
        isDark ? 'bg-[#0e1117] text-stone-100' : 'bg-[#eef1f6] text-stone-900'
      }`}
    >
      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <FullDashboard
            key="dashboard"
            user={user}
            onSignOut={handleSignOut}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        ) : (
          <motion.div
            key="book-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Ambient Background Glow */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isDark
                  ? 'bg-radial from-stone-800/25 via-transparent to-transparent'
                  : 'bg-radial from-stone-300/40 via-transparent to-transparent'
              }`}
            />

            {/* Top Right Portal Controls (Theme & Audio) */}
            <div className="fixed top-6 right-6 z-40 flex items-center gap-2.5">
              {/* Sound Toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleSound}
                className={`p-3 rounded-full border shadow-lg backdrop-blur-md transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'bg-black/40 border-white/10 text-slate-300 hover:bg-black/60 hover:text-white'
                    : 'bg-white/80 border-black/10 text-slate-700 hover:bg-white hover:text-slate-950 shadow-stone-300/50'
                }`}
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                className={`p-3 rounded-full border shadow-lg backdrop-blur-md transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'bg-black/40 border-white/10 text-amber-300 hover:bg-black/60 hover:text-amber-200'
                    : 'bg-white/80 border-black/10 text-slate-700 hover:bg-white hover:text-slate-950 shadow-stone-300/50'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>

            {/* 3D FlipBook Stage */}
            <main className="relative z-10 w-full h-full flex items-center justify-center">
              <FlipBook
                theme={theme}
                flippedCount={flippedCount}
                totalLeaves={totalLeaves}
                flippingIndex={flippingIndex}
                flipNext={flipNext}
                flipPrev={flipPrev}
                goToPage={goToPage}
                closeAllPages={closeAllPages}
                onLogin={handleLogin}
                onSignUp={handleSignUp}
                isLoading={isLoading}
              />
            </main>

            {/* Floating spinner — fades in when isLoading, stays centered as book fades out */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none"
                >
                  {/* Spinner ring */}
                  <div className="relative w-14 h-14">
                    <div
                      className={`absolute inset-0 rounded-full border-[3px] ${
                        isDark ? 'border-white/10' : 'border-black/10'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 rounded-full border-[3px] border-transparent animate-spin ${
                        isDark ? 'border-t-white' : 'border-t-slate-900'
                      }`}
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className={`mt-4 text-xs font-mono tracking-[0.2em] uppercase ${
                      isDark ? 'text-white/60' : 'text-slate-600'
                    }`}
                  >
                    Opening workspace…
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
