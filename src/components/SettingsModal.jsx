import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sun, Moon, Volume2, VolumeX, Maximize2, Minimize2, 
  RotateCcw, Play, Pause, BookOpen, Keyboard, Sparkles 
} from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  theme,
  setTheme,
  soundEnabled,
  toggleSound,
  isFullscreen,
  toggleFullscreen,
  isAutoPlay,
  toggleAutoPlay,
  closeAllPages,
  flippedCount,
  totalLeaves,
  flipNext,
  flipPrev
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Settings Floating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed top-16 right-6 w-80 max-w-[calc(100vw-3rem)] rounded-2xl p-5 shadow-2xl z-50 border backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-stone-900/90 border-white/10 text-stone-100'
                : 'bg-white/90 border-stone-200 text-stone-800'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between pb-3 border-b ${theme === 'dark' ? 'border-white/10' : 'border-stone-200'}`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold tracking-wide">Book Settings</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-3 text-xs">
              {/* Page Progress Indicator */}
              <div className={`p-3 rounded-xl flex items-center justify-between ${
                theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <span className="font-medium text-stone-400">Current Spread</span>
                <span className="font-bold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {flippedCount === 0
                    ? 'Front Cover'
                    : flippedCount >= totalLeaves
                    ? 'Back Cover'
                    : `Page ${flippedCount * 2 - 1} - ${flippedCount * 2}`}
                </span>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Appearance</span>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all font-semibold"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Page Audio</span>
                <button
                  onClick={toggleSound}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all font-semibold"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                      <span>Muted</span>
                    </>
                  )}
                </button>
              </div>

              {/* Auto Play Slideshow */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Auto-Play Pages</span>
                <button
                  onClick={toggleAutoPlay}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    isAutoPlay
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20'
                  }`}
                >
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Start</span>
                    </>
                  )}
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Fullscreen</span>
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all font-semibold"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5" />
                      <span>Exit</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enter</span>
                    </>
                  )}
                </button>
              </div>

              {/* Reset to Cover */}
              <div className={`pt-2 border-t flex justify-between gap-2 ${theme === 'dark' ? 'border-white/10' : 'border-stone-200'}`}>
                <button
                  onClick={() => {
                    closeAllPages();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-500 border border-rose-500/20 font-semibold transition-all active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Close All &amp; Reset</span>
                </button>
              </div>
            </div>

            {/* Keyboard Shortcuts Footer */}
            <div className={`pt-3 border-t flex items-center justify-between text-[11px] text-stone-400 ${theme === 'dark' ? 'border-white/10' : 'border-stone-200'}`}>
              <div className="flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5" />
                <span>Shortcuts</span>
              </div>
              <div className="flex gap-1.5">
                <kbd className={`px-1.5 py-0.5 rounded font-mono ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>←</kbd>
                <kbd className={`px-1.5 py-0.5 rounded font-mono ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>→</kbd>
                <kbd className={`px-1.5 py-0.5 rounded font-mono ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>Esc</kbd>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
