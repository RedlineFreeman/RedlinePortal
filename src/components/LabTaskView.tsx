import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import {
  FileCode2,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Terminal,
  AlertCircle,
  FolderTree,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface LabTaskViewProps {
  selectedStepId: number;
  onSelectStep: (stepId: number) => void;
  completedStepIds: number[];
  onToggleStep: (stepId: number) => void;
  onOpenTerminalWithMission?: (missionId: string) => void;
}

export const LabTaskView: React.FC<LabTaskViewProps> = ({
  selectedStepId,
  onSelectStep,
  completedStepIds,
  onToggleStep,
}) => {
  const currentStep =
    ROADMAP_STEPS.find((s) => s.id === selectedStepId) || ROADMAP_STEPS[0];
  const lab = currentStep.lab;
  const artifact = lab.portfolioArtifact;

  const [activeTab, setActiveTab] = useState<'guide' | 'portfolio' | 'configs'>('guide');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [checkedDodItems, setCheckedDodItems] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([artifact.readmeMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `README-${artifact.repoName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleDod = (idx: number) => {
    const key = `${selectedStepId}-${idx}`;
    setCheckedDodItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isCompleted = completedStepIds.includes(currentStep.id);

  return (
    <div className="space-y-6">
      {/* Top Header & Step Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              ЛАБОРАТОРНЫЙ КЕЙС #{currentStep.id}
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">{lab.environment}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">{lab.title}</h2>
        </div>

        {/* Step Select Dropdown / Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-xs text-slate-400 font-medium">Выбрать шаг:</label>
          <select
            value={selectedStepId}
            onChange={(e) => onSelectStep(Number(e.target.value))}
            className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {ROADMAP_STEPS.map((step) => (
              <option key={step.id} value={step.id}>
                Шаг {step.id}: {step.title.slice(0, 35)}...
              </option>
            ))}
          </select>

          <button
            onClick={() => onToggleStep(currentStep.id)}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Лабораторная сдана' : 'Отметить готовность'}</span>
          </button>
        </div>
      </div>

      {/* Monorepo Integration Callout */}
      <div className="bg-slate-900/70 border border-emerald-500/20 px-4 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-300">
            <strong className="text-white">Часть Единого Мега-Проекта:</strong> Навыки и конфиги шага #{currentStep.id} автоматически объединены в{' '}
            <code className="text-emerald-400 font-mono">sysadmin-enterprise-monorepo</code>.
          </span>
        </div>
        <span className="text-slate-400 text-[11px] font-mono shrink-0">
          Связанные файлы: docker-compose.yml, ansible/site.yml
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('guide')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'guide'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Пошаговое руководство (ТЗ)</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'portfolio'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>Кейс для GitHub (README.md)</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
            Готово
          </span>
        </button>

        <button
          onClick={() => setActiveTab('configs')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === 'configs'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Файлы конфигураций ({artifact.keyConfigSnippets.length})</span>
        </button>
      </div>

      {/* TAB 1: GUIDE */}
      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Walkthrough */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Бизнес-сценарий (Реальная задача с работы)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{lab.scenario}</p>

              <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div>
                  <strong className="text-slate-300">Среда:</strong> {lab.environment}
                </div>
                <div>
                  <strong className="text-slate-300">Оценка времени:</strong> {lab.estimatedTime}
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Пошаговые инструкции выполнения:
              </h3>
              {lab.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center border border-emerald-500/30">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{st.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {st.instructions}
                  </p>

                  {st.commands && st.commands.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Команды для выполнения в терминале:</span>
                        <button
                          onClick={() => handleCopy(st.commands!.join('\n'), `step-${idx}`)}
                          className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === `step-${idx}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Скопировано</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Скопировать блок</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto space-y-1">
                        {st.commands.map((cmd, cIdx) => (
                          <div key={cIdx} className="flex gap-2">
                            <span className="text-slate-600 select-none">$</span>
                            <span className="select-all">{cmd}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-300">Критерий верификации:</strong>{' '}
                      {st.verification}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: DoD & Troubleshooting */}
          <div className="space-y-6">
            {/* Definition of Done */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Критерии приемки (Definition of Done)
              </h3>
              <p className="text-xs text-slate-400">
                Отметьте выполненные пункты для подтверждения готовности проекта к добавлению в портфолио:
              </p>
              <div className="space-y-2">
                {lab.definitionOfDone.map((item, idx) => {
                  const key = `${selectedStepId}-${idx}`;
                  const isChecked = !!checkedDodItems[key];
                  return (
                    <label
                      key={idx}
                      onClick={() => toggleDod(idx)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Troubleshooting Tips */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Подводные камни и траблшутинг
              </h3>
              <div className="space-y-2 text-xs text-slate-400">
                {lab.troubleshootingTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80 leading-relaxed"
                  >
                    ⚠️ {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PORTFOLIO README */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Рекомендуемое имя репозитория:</div>
              <div className="text-base font-mono font-bold text-emerald-400 flex items-center gap-2 mt-0.5">
                <span>{artifact.repoName}</span>
                <button
                  onClick={() => handleCopy(artifact.repoName, 'repo-name')}
                  className="text-slate-500 hover:text-white"
                >
                  {copiedKey === 'repo-name' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(artifact.readmeMarkdown, 'readme-content')}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                {copiedKey === 'readme-content' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать README</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadReadme}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Скачать README.md</span>
              </button>
            </div>
          </div>

          {/* Suggested File Tree */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-cyan-400" />
              Структура файлов в репозитории:
            </h4>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              <div className="text-emerald-400 font-bold mb-1">{artifact.repoName}/</div>
              {artifact.fileTree.map((f, idx) => (
                <div key={idx} className="pl-4 text-slate-400 flex items-center gap-1">
                  <span className="text-slate-600">├──</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Markdown Preview */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Предпросмотр сгенерированного README.md:
              </h4>
              <span className="text-xs text-slate-500">Готов для загрузки на GitHub</span>
            </div>
            <pre className="bg-slate-950 p-5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
              {artifact.readmeMarkdown}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: CONFIG SNIPPETS */}
      {activeTab === 'configs' && (
        <div className="space-y-6">
          {artifact.keyConfigSnippets.map((cfg, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">{cfg.fileName}</span>
                  <p className="text-[11px] text-slate-400">{cfg.description}</p>
                </div>
                <button
                  onClick={() => handleCopy(cfg.code, `cfg-${idx}`)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedKey === `cfg-${idx}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === `cfg-${idx}` ? 'Скопировано' : 'Копировать код'}</span>
                </button>
              </div>
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto bg-slate-950/40 leading-relaxed">
                {cfg.code}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
