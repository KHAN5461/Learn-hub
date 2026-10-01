import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, Award, BookOpen, UploadCloud, FileText, CheckCircle2, 
  XCircle, Brain, Sparkles, LogOut, Search, Bell, ChevronRight, 
  BarChart2, Layers, Clock, ArrowRight, RefreshCw, Bookmark, Sun, Moon
} from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: 'Which neurotransmitter is primarily responsible for long-term potentiation and synaptic plasticity in memory consolidation?',
    options: [
      { id: 'a', text: 'Dopamine' },
      { id: 'b', text: 'Glutamate (NMDA Receptor)', isCorrect: true },
      { id: 'c', text: 'Serotonin' },
      { id: 'd', text: 'Acetylcholine' },
    ],
    explanation: 'Glutamate activation of NMDA receptors permits calcium influx, triggering the synaptic strengthening fundamental to long-term memory.',
  },
  {
    question: 'What is the optimal interval for spaced repetition active recall sessions?',
    options: [
      { id: 'a', text: 'Every 10 minutes continuously' },
      { id: 'b', text: 'Just before the forgetting curve steepens', isCorrect: true },
      { id: 'c', text: 'Once right before the exam' },
      { id: 'd', text: 'Only during deep sleep cycles' },
    ],
    explanation: 'Reviewing material just before memory decay reinforces neural pathways most efficiently.',
  },
];

export default function FullDashboard({ user, onSignOut, theme = 'dark', onToggleTheme }) {
  const isDark = theme === 'dark';
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(user?.xp || 3450);
  const [isUploading, setIsUploading] = useState(false);

  const q = QUIZ_QUESTIONS[currentQuiz];

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedAnswer(opt.id);
    setIsAnswered(true);
    if (opt.isCorrect) {
      setScore((prev) => prev + 100);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuiz((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('AI Note Processing Complete! 18 key concepts extracted and added to your study deck.');
    }, 1200);
  };

  const studyDecks = [
    { title: 'Neurobiology: Synaptic Plasticity', cards: 24, mastered: '94%', track: 'Biology', date: 'Today' },
    { title: 'Graph Theory & Tree Traversal', cards: 18, mastered: '88%', track: 'Computer Science', date: 'Yesterday' },
    { title: 'Macroeconomics: Fiscal Policy', cards: 12, mastered: '100%', track: 'Economics', date: '2 days ago' },
    { title: 'Cellular Respiration & Krebs Cycle', cards: 30, mastered: '76%', track: 'Biochemistry', date: '3 days ago' },
  ];

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={`min-h-screen w-full flex flex-col font-sans select-none absolute inset-0 transition-colors duration-300 ${
        isDark ? 'bg-[#0d1117] text-stone-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Top Navigation Bar */}
      <header
        className={`h-16 border-b px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md transition-colors ${
          isDark ? 'border-white/10 bg-[#161b22]/90' : 'border-slate-200 bg-white/90'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl border shadow-sm ${
              isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-slate-900 border-slate-900 text-white'
            }`}
          >
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h1
              className={`text-sm font-bold tracking-tight flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>Lumina Study OS</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                  isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Student Edition
              </span>
            </h1>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex items-center relative w-80">
          <Search className={`w-4 h-4 absolute left-3 pointer-events-none ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder="Search notes, quizzes, or concepts..."
            className={`w-full border rounded-xl pl-9 pr-3 py-1.5 text-xs transition-all focus:outline-none ${
              isDark
                ? 'bg-[#0d1117] border-white/10 text-white placeholder-slate-400 focus:border-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-slate-400'
            }`}
          />
        </div>

        {/* Right Status & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-amber-300 border-white/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Daily Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-bold shadow-sm">
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
            <span>{user?.streak || 14} Day Streak</span>
          </div>

          {/* XP Badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-mono font-semibold ${
              isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>{score} XP</span>
          </div>

          {/* Divider */}
          <div className={`h-6 w-[1px] hidden sm:block ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />

          {/* User Avatar & Logout */}
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt="Avatar"
              className={`w-8 h-8 rounded-full border object-cover shadow-sm ${
                isDark ? 'border-white/20' : 'border-slate-300'
              }`}
            />
            <div className="hidden lg:block text-left">
              <p className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {user?.name || 'Alex Rivers'}
              </p>
              <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {user?.level || 'Level 5 Scholar'}
              </p>
            </div>
            <button
              onClick={onSignOut}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-white/5 hover:bg-rose-500/15 text-slate-400 hover:text-rose-300 border-white/10 hover:border-rose-500/30'
                  : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200 hover:border-rose-300'
              }`}
              title="Sign Out & Return to Book"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Hero Greeting, Stats, Active Quiz Lab */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Welcome Banner */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden shadow-lg transition-colors ${
              isDark
                ? 'bg-gradient-to-r from-[#161b22] via-[#1a212b] to-[#161b22] border-white/10'
                : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-900 shadow-md'
            }`}
          >
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active Track: {user?.track || 'Cognitive Science & AI'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {user?.name || 'Alex'} 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                You've completed 18 of 24 active recall targets for this week. Your retention curve is performing 24% higher than average.
              </p>
            </div>
          </div>

          {/* 4 Quick Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Notes Analyzed', value: '48 Decks', icon: <FileText className="w-4 h-4" /> },
              { label: 'Mastery Rate', value: '94.2%', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" /> },
              { label: 'Study Time', value: '14.5 Hrs', icon: <Clock className="w-4 h-4 text-amber-500" /> },
              { label: 'Global Rank', value: 'Top 4%', icon: <Award className="w-4 h-4 text-sky-500" /> },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm transition-colors ${
                  isDark ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`flex items-center justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className="text-[11px] font-medium">{stat.label}</span>
                  {stat.icon}
                </div>
                <p className={`text-lg font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Active AI Study Lab / Live Interactive Quiz */}
          <div
            className={`p-6 rounded-2xl border space-y-4 shadow-lg transition-colors ${
              isDark ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="flex items-center gap-2">
                <Brain className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
                <div>
                  <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Active Recall AI Lab
                  </h3>
                  <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Daily personalized test question
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                  isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Question {currentQuiz + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <h4 className={`text-sm sm:text-base font-semibold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {q.question}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.id;
                  let style = isDark
                    ? 'bg-[#0d1117] border-white/10 text-slate-200 hover:border-white/30'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      style = isDark
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                    } else if (isSelected && !opt.isCorrect) {
                      style = isDark
                        ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                        : 'bg-rose-50 border-rose-500 text-rose-900';
                    } else {
                      style = isDark ? 'opacity-40 bg-[#0d1117] border-white/5' : 'opacity-40 bg-slate-50 border-slate-100';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                    >
                      <span>{opt.text}</span>
                      {isAnswered && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {isAnswered && isSelected && !opt.isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>AI Analysis: </span>
                  {q.explanation}
                </div>
              )}
            </div>

            {/* Quiz Footer Actions */}
            <div className={`pt-2 flex items-center justify-between border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <button
                onClick={() => {
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                }}
                className={`text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Answer</span>
              </button>

              <button
                onClick={handleNextQuiz}
                className={`py-2 px-4 font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                  isDark ? 'bg-white hover:bg-slate-100 text-slate-950' : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Notes Uploader & Recent Decks */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upload Notes Card */}
          <div
            className={`p-6 rounded-2xl border space-y-4 shadow-lg transition-colors ${
              isDark ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <UploadCloud className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-900'}`} />
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Instant AI Summarizer
              </h3>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Upload PDF slides, audio recordings, or textbook chapters. AI generates notes &amp; flashcards in seconds.
            </p>

            <div
              onClick={handleSimulatedUpload}
              className={`p-6 rounded-xl border border-dashed transition-all cursor-pointer text-center space-y-2 group ${
                isDark
                  ? 'border-white/20 bg-[#0d1117] hover:bg-[#11161f]'
                  : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center mx-auto group-hover:scale-110 transition-transform ${
                  isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-slate-900 border-slate-900 text-white'
                }`}
              >
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UploadCloud className="w-5 h-5" />
                )}
              </div>
              <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isUploading ? 'Analyzing Notes...' : 'Click to Upload Document'}
              </p>
              <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Supports PDF, DOCX, MP3 (up to 50MB)
              </p>
            </div>
          </div>

          {/* Recent Study Decks */}
          <div
            className={`p-6 rounded-2xl border space-y-3 shadow-lg transition-colors ${
              isDark ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Recent Study Decks
              </h3>
              <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                4 Active
              </span>
            </div>

            <div className="space-y-2">
              {studyDecks.map((deck, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                    isDark
                      ? 'bg-[#0d1117] border-white/10 hover:border-white/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-lg border ${
                        isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-bold transition-colors truncate max-w-[140px] sm:max-w-[170px] ${
                          isDark ? 'text-white group-hover:text-slate-200' : 'text-slate-900 group-hover:text-slate-700'
                        }`}
                      >
                        {deck.title}
                      </h4>
                      <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {deck.cards} Cards • {deck.track}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {deck.mastered}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onSignOut}
              className={`w-full py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 ${
                isDark
                  ? 'border-white/10 hover:bg-white/5 text-slate-300 hover:text-white'
                  : 'border-slate-200 hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit to Book Portal</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
