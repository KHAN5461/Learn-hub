import React from 'react';

export default function StudySuperpowers() {
  const stats = [
    { label: 'Notes Processed', value: '14.2M+' },
    { label: 'Average Score Lift', value: '+24%' },
    { label: 'Time Saved / Week', value: '8.5 Hrs' },
    { label: 'Active Students', value: '250k+' },
  ];

  return (
    <div className="w-full h-full bg-[#f6eee3] text-stone-900 flex flex-col justify-between p-7 sm:p-10 select-none relative overflow-hidden font-sans border-r border-stone-300">
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-stone-300 pb-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold text-stone-500">
            PROVEN METHODOLOGY
          </span>
          <span className="text-[10px] font-mono text-stone-400">
            RESEARCH BACKED
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight mt-3 text-stone-900">
          Study with clarity. Remember with confidence.
        </h3>
        <p className="text-xs mt-1.5 leading-relaxed font-normal text-stone-600">
          Designed around cognitive science principles tested by top medical and engineering scholars.
        </p>
      </div>

      {/* 2x2 Clean Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-3 my-auto py-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border shadow-sm text-center flex flex-col items-center justify-center bg-white border-stone-200"
          >
            <span className="text-lg sm:text-xl font-bold font-serif text-stone-900">
              {stat.value}
            </span>
            <span className="text-[11px] font-medium mt-0.5 text-stone-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Student Testimonial */}
      <div className="relative z-10 p-3.5 rounded-xl border shadow-sm bg-white border-stone-200">
        <p className="text-[11px] italic leading-relaxed font-serif text-stone-700">
          "This cut my exam prep time in half. The active recall questions target exactly what I need to review."
        </p>
        <div className="mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-medium border-stone-100 text-stone-600">
          <span>— Maya R., Medical Student</span>
          <span className="font-mono opacity-60">P. 02</span>
        </div>
      </div>
    </div>
  );
}
