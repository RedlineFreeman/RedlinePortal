import React from 'react';
import { TROUBLESHOOTING_MISSIONS } from '../data/troubleshootingScenarios';
import { TroubleshootingMission } from '../types/sysadmin';
import {
  AlertTriangle,
  CheckCircle2,
  Terminal,
  ArrowRight,
  ShieldAlert,
  Flame,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface TroubleshootingViewProps {
  completedMissionIds: string[];
  onLaunchMission: (missionId: string) => void;
}

export const TroubleshootingView: React.FC<TroubleshootingViewProps> = ({
  completedMissionIds,
  onLaunchMission,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-6 rounded-2xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            Интерактивный симулятор аварийных ситуаций
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Траблшутинг-миссии (Break-Fix Labs)
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Настоящий сисадмин оценивается не по тому, как он настраивает систему в спокойный день,
            а по тому, как быстро он находит причину сбоя во время аварии. Попробуйте устранить
            5 реальных инцидентов, встречающихся в 90% компаний.
          </p>
        </div>
      </div>

      {/* Grid of Missions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TROUBLESHOOTING_MISSIONS.map((mission) => {
          const isSolved = completedMissionIds.includes(mission.id);

          const severityBadgeColor: Record<string, string> = {
            Критический: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
            Высокий: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
            Средний: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          };

          return (
            <div
              key={mission.id}
              className={`rounded-xl border p-5 space-y-4 flex flex-col justify-between transition-all ${
                isSolved
                  ? 'bg-slate-900/60 border-emerald-500/40 shadow-sm shadow-emerald-500/5'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                        severityBadgeColor[mission.severity]
                      }`}
                    >
                      {mission.severity}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Категория: {mission.category}
                    </span>
                  </div>

                  {isSolved && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Устранено
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {mission.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {mission.description}
                </p>

                {/* Symptoms */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Наблюдаемые симптомы:
                  </h4>
                  <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
                    {mission.symptoms.map((s, idx) => (
                      <li key={idx} className="font-mono text-[11px] text-slate-300">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Theoretical Cause Breakdown */}
                <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80">
                  <strong className="text-slate-200 block mb-1">Разбор архитектуры:</strong>
                  {mission.solutionExplanation}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onLaunchMission(mission.id)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSolved
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>{isSolved ? 'Решить снова в терминале' : 'Устранить аварию в терминале'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
