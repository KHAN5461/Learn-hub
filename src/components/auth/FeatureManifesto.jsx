import React from 'react';
import { FileText, HelpCircle, Brain } from 'lucide-react';

export default function FeatureManifesto() {
  const features = [
    {
      icon: <FileText className="w-4 h-4 text-stone-700" />,
      title: 'Note Summarization',
      desc: 'Turn long lecture slides and textbook chapters into clear, concise summaries.',
    },
    {
      icon: <HelpCircle className="w-4 h-4 text-stone-700" />,
      title: 'Exam Question Prediction',
      desc: 'AI identifies key concepts and generates high-yield test questions.',
    },
    {
      icon: <Brain className="w-4 h-4 text-stone-700" />,
      title: 'Active Recall Practice',
      desc: 'Interactive quizzes designed with spaced repetition cognitive science.',
    },
  ];

  return (
    <div className="w-full h-full bg-[#f6eee3] text-stone-900 flex flex-col justify-between p-7 sm:p-10 select-none relative overflow-hidden font-sans border-r border-stone-300">
      {/* Ex Libris Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-stone-300 pb-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold text-stone-500">
            EX LIBRIS • STUDY OS
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            EDITION 2026
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mt-3 text-stone-900">
          Turn passive reading into active understanding.
        </h3>
        <p className="text-xs mt-1.5 font-normal leading-relaxed text-stone-600">
          Transform notes into structured memory through automated synthesis and guided recall.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 space-y-3 my-auto py-2">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border shadow-sm flex items-start gap-3.5 bg-white border-stone-200"
          >
            <div className="p-2 rounded-lg border shrink-0 mt-0.5 bg-stone-100 border-stone-200">
              {item.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">
                {item.title}
              </h4>
              <p className="text-[11px] leading-relaxed mt-0.5 text-stone-600">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Footer */}
      <div className="relative z-10 pt-3 border-t border-stone-300 flex items-center justify-between text-[10px] font-serif italic text-stone-500">
        <span>"Knowledge organized is memory retained."</span>
        <span className="font-mono not-italic text-stone-400">
          P. 01
        </span>
      </div>
    </div>
  );
}
