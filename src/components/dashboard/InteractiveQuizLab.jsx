import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, LogOut, ArrowRight, Brain } from 'lucide-react';

const QUIZ_DATA = [
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

export default function InteractiveQuizLab({ onSignOut }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const q = QUIZ_DATA[currentQuestion];

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    setSelectedAnswer(opt.id);
    setIsAnswered(true);
    if (opt.isCorrect) {
      setScore(score + 100);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestion((prev) => (prev + 1) % QUIZ_DATA.length);
  };

  return (
    <div className="w-full h-full bg-[#faf7f2] text-stone-900 flex flex-col justify-between p-5 sm:p-7 select-none relative overflow-hidden font-sans border-l border-stone-200">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="flex items-center gap-1.5 text-stone-800 text-xs font-bold font-serif">
          <Brain className="w-4 h-4 text-stone-700" />
          <span>Active Recall Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 border border-stone-300 text-stone-700 font-mono font-bold">
            +{score} XP
          </span>
          <button
            onClick={onSignOut}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="relative z-10 my-auto space-y-3 py-1">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-mono tracking-widest text-stone-500 font-semibold">
            Question {currentQuestion + 1} of {QUIZ_DATA.length}
          </span>
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug font-serif">
            {q.question}
          </h4>
        </div>

        {/* Options */}
        <div className="space-y-1.5">
          {q.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            let btnStyle = 'bg-white border-stone-300 text-stone-800 hover:border-stone-400 shadow-sm';

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm font-semibold';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'bg-red-50 border-red-400 text-red-900';
              } else {
                btnStyle = 'opacity-40 bg-stone-50 border-stone-200 text-stone-500';
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {isAnswered && opt.isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                )}
                {isAnswered && isSelected && !opt.isCorrect && (
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Reveal */}
        {isAnswered && (
          <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-[11px] text-stone-700 leading-relaxed">
            <span className="font-bold text-stone-900">Explanation: </span>
            {q.explanation}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="relative z-10 pt-2 border-t border-stone-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setSelectedAnswer(null);
            setIsAnswered(false);
          }}
          className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Question</span>
        </button>

        <button
          type="button"
          onClick={handleNextQuestion}
          className="py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span>Next Question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
