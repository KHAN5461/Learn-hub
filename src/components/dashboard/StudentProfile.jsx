import React, { useState } from 'react';
import { Flame, Award, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

export default function StudentProfile({ user, onUploadNotes }) {
  const [activeDeck, setActiveDeck] = useState(0);

  const notesList = [
    { title: 'Neurobiology & Synaptic Plasticity', questions: 14, score: '94%', tag: 'Biology' },
    { title: 'Graph Theory & Tree Traversal', questions: 20, score: '88%', tag: 'CS' },
    { title: 'Macroeconomics: Fiscal Policy', questions: 12, score: '100%', tag: 'Econ' },
  ];

  return (
    <div className="w-full h-full bg-[#faf7f2] text-stone-900 flex flex-col justify-between p-5 sm:p-7 select-none relative overflow-hidden font-sans border-r border-stone-200">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-stone-300 object-cover shadow-sm"
          />
          <div>
            <h3 className="text-sm font-bold font-serif text-stone-900 leading-tight">
              {user?.name || 'Alex Rivers'}
            </h3>
            <span className="text-[10px] text-stone-500 font-mono">{user?.level || 'Level 5 Scholar'}</span>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>{user?.streak || 14} Day Streak</span>
        </div>
      </div>

      {/* Upload Notes Card */}
      <div className="relative z-10 my-2">
        <div
          onClick={onUploadNotes}
          className="p-3.5 rounded-xl border border-dashed border-stone-300 bg-white hover:bg-stone-50 transition-all cursor-pointer flex items-center justify-between shadow-sm group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-stone-100 text-stone-700 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">Upload New Study Notes</p>
              <p className="text-[10px] text-stone-500">PDF, Audio, or Text • AI summarizes</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-stone-900 text-white text-[10px] font-bold shadow-sm">
            Upload
          </span>
        </div>
      </div>

      {/* Recent Study Decks */}
      <div className="relative z-10 flex-1 flex flex-col justify-center space-y-2 py-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 font-semibold">
            Recent Study Decks
          </span>
          <span className="text-[10px] text-stone-400">3 Active</span>
        </div>

        <div className="space-y-1.5">
          {notesList.map((deck, idx) => (
            <div
              key={idx}
              onClick={() => setActiveDeck(idx)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeDeck === idx
                  ? 'bg-white border-stone-900 text-stone-900 shadow-sm'
                  : 'bg-white/60 border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-stone-600" />
                <div>
                  <h4 className="text-xs font-bold truncate max-w-[150px] sm:max-w-[190px] text-stone-900">{deck.title}</h4>
                  <span className="text-[9px] text-stone-500">{deck.questions} Questions • {deck.tag}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-stone-800">{deck.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="relative z-10 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-stone-600">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>{user?.xp || 3450} XP Earned</span>
        </div>
        <span className="text-[10px] text-stone-500 font-mono">Mastery: 84%</span>
      </div>
    </div>
  );
}
