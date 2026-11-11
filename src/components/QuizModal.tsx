import React, { useState } from 'react';
import { RoadmapStep, QuizQuestion } from '../types/sysadmin';
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  step: RoadmapStep;
  onClose: () => void;
  onPassQuiz: (stepId: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  step,
  onClose,
  onPassQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const questions = step.quiz;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const isPassed = score + (selectedOption === currentQ.correctIndex ? 1 : 0) >= Math.ceil(questions.length * 0.7);
      if (isPassed) {
        onPassQuiz(step.id);
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Проверочный тест: {step.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-5">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Вопрос {currentIdx + 1} из {questions.length}
                </span>
                <span className="font-bold text-emerald-400">
                  Правильно: {score}
                </span>
              </div>

              {/* Question */}
              <h3 className="text-base font-bold text-white leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => {
                  let optStyle =
                    'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-bold';
                    } else if (idx === selectedOption) {
                      optStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answer */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Верно!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Неверно. Правильный ответ: вариант {String.fromCharCode(65 + currentQ.correctIndex)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {isAnswerSubmitted && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <span>{currentIdx + 1 < questions.length ? 'Следующий вопрос' : 'Завершить тест'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Тест завершен!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Вы ответили правильно на <strong className="text-white">{score}</strong> из{' '}
                  <strong className="text-white">{questions.length}</strong> вопросов (
                  {Math.round((score / questions.length) * 100)}%).
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Попробовать снова</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  Вернуться к программе
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
