import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/interviewData';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { InterviewQnA } from '../types/sysadmin';
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Award,
  Filter,
  Sparkles,
} from 'lucide-react';

export const InterviewTrainer: React.FC = () => {
  // Combine general interview questions with step-specific ones
  const allQuestions: InterviewQnA[] = [
    ...INTERVIEW_QUESTIONS,
    ...ROADMAP_STEPS.flatMap((s) => s.interviewQuestions),
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [expandedId, setExpandedId] = useState<string | null>(allQuestions[0]?.id || null);
  const [knownIds, setKnownIds] = useState<string[]>([]);

  const categories = [
    'Все',
    'Linux',
    'Сети',
    'Windows/AD',
    'Безопасность',
    'Архитектура',
    'Траблшутинг',
    'Мониторинг',
    'Виртуализация',
  ];

  const filteredQuestions = allQuestions.filter((q) => {
    if (selectedCategory === 'Все') return true;
    return q.category === selectedCategory;
  });

  const toggleKnown = (id: string) => {
    setKnownIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const readinessPercent = Math.round((knownIds.length / allQuestions.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            База знаний для технического скрининга
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Тренажер собеседований Системного Администратора
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Реальные каверзные вопросы от Senior инженеров и тимлидов с эталонными ответами,
            разбором механизмов работы ОС и подсказками, как выделиться среди других кандидатов.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 text-center min-w-[200px]">
          <div className="text-xs text-slate-400">Готовность к скринингу:</div>
          <div className="text-3xl font-extrabold text-indigo-400 my-1">
            {readinessPercent}%
          </div>
          <div className="text-xs text-slate-500">
            Изучено: {knownIds.length} из {allQuestions.length} вопросов
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
          Разделы:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedId === q.id;
          const isKnown = knownIds.includes(q.id);

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all ${
                isKnown
                  ? 'bg-slate-900/60 border-indigo-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:text-indigo-400">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {q.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {q.question}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleKnown(q.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      isKnown
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${isKnown ? 'text-indigo-400' : 'text-slate-500'}`}
                    />
                    <span className="hidden sm:inline">{isKnown ? 'Знаю' : 'Отметить'}</span>
                  </button>

                  <div className="text-slate-500 group-hover:text-slate-300 p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Answer */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
                  {/* Short Answer */}
                  <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <strong className="text-indigo-400 block text-xs uppercase tracking-wider mb-1">
                      Краткий ответ (TL;DR):
                    </strong>
                    {q.shortAnswer}
                  </div>

                  {/* Detailed Technical Breakdown */}
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                    <strong className="text-slate-200 block text-xs uppercase tracking-wider">
                      Глубокий технический разбор:
                    </strong>
                    <div className="whitespace-pre-wrap font-sans bg-slate-900/50 p-4 rounded-lg border border-slate-800/60">
                      {q.detailedAnswer}
                    </div>
                  </div>

                  {/* Practical Interview Tip */}
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Совет для собеседования:</strong>{' '}
                      {q.practicalTip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
