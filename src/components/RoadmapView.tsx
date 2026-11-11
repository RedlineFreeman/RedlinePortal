import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { RoadmapStep, StepLevel } from '../types/sysadmin';
import {
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Terminal,
  FileCode2,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  Network,
  Server,
  Globe,
  Shield,
  Layers,
  Activity,
  Lock,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoadmapViewProps {
  completedStepIds: number[];
  onToggleStep: (stepId: number) => void;
  onSelectLab: (stepId: number) => void;
  onOpenQuiz: (step: RoadmapStep) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu,
  Network,
  Server,
  Globe,
  Shield,
  Layers,
  Terminal,
  Activity,
  Lock,
  Briefcase,
};

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  completedStepIds,
  onToggleStep,
  onSelectLab,
  onOpenQuiz,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [expandedStepId, setExpandedStepId] = useState<number | null>(1);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const levels: { id: string; label: string }[] = [
    { id: 'all', label: 'Все шаги (1-10)' },
    { id: 'Junior Base', label: 'Базовый Junior (1-2)' },
    { id: 'Junior', label: 'Junior SysAdmin (3-4)' },
    { id: 'Junior+', label: 'Junior+ (5-7)' },
    { id: 'Middle Ready', label: 'Middle Ready (8-10)' },
  ];

  const filteredSteps = ROADMAP_STEPS.filter((step) => {
    if (selectedLevel === 'all') return true;
    return step.level === selectedLevel;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleStepComplete = (id: number) => {
    const willBeCompleted = !completedStepIds.includes(id);
    onToggleStep(id);
    if (willBeCompleted) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Инженерная программа подготовки 2025/2026
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Пошаговый план трудоустройства <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Системным Администратором
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            От архитектуры серверного оборудования и сетей TCP/IP до развертывания Nginx, Linux/AD,
            Docker, мониторинга Prometheus и автоматизации Ansible. После каждого шага вы создаете
            <strong className="text-white"> готовый кейс в свое GitHub портфолио</strong>, проверяете
            себя тестами и готовитесь к вопросам на собеседованиях.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Общий срок: 6-8 месяцев (25-30ч/неделю)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span>10 готовых проектов в портфолио</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Тесты и тренажер собеседований</span>
            </div>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2">
          Уровень подготовки:
        </span>
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setSelectedLevel(lvl.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedLevel === lvl.id
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      {/* Roadmap Steps Accordion / Cards */}
      <div className="space-y-4">
        {filteredSteps.map((step) => {
          const Icon = ICON_MAP[step.iconName] || Server;
          const isCompleted = completedStepIds.includes(step.id);
          const isExpanded = expandedStepId === step.id;

          const levelBadgeColor: Record<StepLevel, string> = {
            'Junior Base': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
            Junior: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
            'Junior+': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
            'Middle Ready': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          };

          return (
            <div
              key={step.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isCompleted
                  ? 'bg-slate-900/60 border-emerald-500/30 shadow-sm shadow-emerald-500/5'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-4">
                  {/* Step Number & Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 group-hover:text-emerald-400 group-hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        ШАГ {step.id.toString().padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          levelBadgeColor[step.level]
                        }`}
                      >
                        {step.level}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {step.durationWeeks} (~{step.estimatedHours}ч)
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{step.subtitle}</p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepComplete(step.id);
                    }}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                    title={isCompleted ? 'Отметить как не пройденное' : 'Отметить шаг как выполненный'}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}
                    />
                    <span className="hidden sm:inline">
                      {isCompleted ? 'Освоено' : 'Отметить'}
                    </span>
                  </button>

                  <div className="text-slate-500 group-hover:text-slate-300 transition-colors p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content Drawer */}
              {isExpanded && (
                <div className="px-4 pb-6 sm:px-6 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-6">
                  {/* Skills Pills */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Ключевые компетенции модуля:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {step.keySkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deep Theory Summary */}
                  <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800/80">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <BookOpen className="w-4 h-4" />
                      Теоретический фундамент
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {step.theorySummary}
                    </p>

                    {/* Core Concepts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
                      {step.coreConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 space-y-1.5"
                        >
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {concept.name}
                          </h5>
                          <p className="text-xs text-slate-400 leading-normal">
                            {concept.description}
                          </p>
                          <div className="text-[11px] text-emerald-400/90 bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20">
                            <strong>В продакшене:</strong> {concept.realWorldUse}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cheat Sheets */}
                  {step.cheatSheets.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Terminal className="w-4 h-4 text-cyan-400" />
                          Шпаргалка команд и синтаксиса:
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          Кликните на команду для копирования
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.cheatSheets[0].commands.map((cheat, idx) => {
                          const isCopied = copiedCmd === cheat.cmd;
                          return (
                            <div
                              key={idx}
                              onClick={() => handleCopy(cheat.cmd)}
                              className="group flex items-start justify-between gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all"
                            >
                              <div className="space-y-1 min-w-0">
                                <code className="text-xs text-cyan-300 font-mono block break-all font-semibold">
                                  {cheat.cmd}
                                </code>
                                <p className="text-[11px] text-slate-400">{cheat.desc}</p>
                              </div>
                              <button className="text-slate-500 group-hover:text-cyan-400 shrink-0 p-1">
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Practical Lab & Portfolio Teaser Banner */}
                  <div className="rounded-xl p-4 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Практическое задание и кейс портфолио
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{step.lab.title}</h4>
                      <p className="text-xs text-slate-400">
                        {step.lab.portfolioArtifact.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenQuiz(step)}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Тест ({step.quiz.length} вопр.)</span>
                      </button>

                      <button
                        onClick={() => onSelectLab(step.id)}
                        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
                      >
                        <span>Лабораторная & README</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
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
