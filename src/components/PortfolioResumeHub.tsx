import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { ResumeData } from '../types/sysadmin';
import {
  generatePortfolioMasterReadme,
  generateResumeMarkdown,
} from '../utils/calculator';
import {
  Briefcase,
  FileText,
  Copy,
  Check,
  Download,
  Github,
  FolderTree,
  User,
  Mail,
  Phone,
  Send,
  MapPin,
  DollarSign,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface PortfolioResumeHubProps {
  completedStepIds: number[];
  completedMissionIds: string[];
}

export const PortfolioResumeHub: React.FC<PortfolioResumeHubProps> = ({
  completedStepIds,
  completedMissionIds,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'resume'>('portfolio');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: 'Иван Иванов',
    role: 'Младший системный администратор (Junior / Middle Sysadmin)',
    city: 'Москва / Удаленно',
    email: 'ivan.sysadmin@example.com',
    phone: '+7 (999) 123-45-67',
    telegram: '@ivan_sysadmin',
    githubUrl: 'https://github.com/ivan-sysadmin-portfolio',
    desiredSalary: 'от 90 000 до 140 000 ₽',
    aboutMe:
      'Системный администратор с практическим опытом развертывания Linux-серверов (Ubuntu, Debian, Rocky Linux), настройки сетей (VLAN, NAT, VPN WireGuard), контейнеризации сервисов в Docker и автоматизации на Ansible. Ищу работу в стабильной IT-компании для поддержки и масштабирования инфраструктуры.',
    completedStepIds,
    completedMissions: completedMissionIds,
  });

  const activeCompletedSteps = ROADMAP_STEPS.filter(
    (s) => completedStepIds.includes(s.id) || completedStepIds.length === 0
  );

  const masterReadme = generatePortfolioMasterReadme(
    resumeData.fullName,
    resumeData.githubUrl,
    activeCompletedSteps
  );

  const generatedResume = generateResumeMarkdown(resumeData, activeCompletedSteps);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Инструменты трудоустройства и самопрезентации
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Центр Портфолио & Конструктор Резюме
          </h2>
          <p className="text-sm text-slate-300">
            Сгенерируйте единый Master README для своего профиля на GitHub и готовое резюме
            с матрицей подтвержденных практических навыков.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub Портфолио</span>
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Резюме (CV)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: GITHUB MASTER PORTFOLIO */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400">Проектов в портфолио</span>
              <div className="text-2xl font-extrabold text-white mt-1">
                {ROADMAP_STEPS.length} готовых кейсов
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400">Решенных инцидентов</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                {completedMissionIds.length} из 5
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400">Стек технологий</span>
              <div className="text-sm font-bold text-slate-200 mt-1 truncate">
                Linux, Nginx, Docker, Ansible, Zabbix
              </div>
            </div>
          </div>

          {/* Master README Action Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Github className="w-4 h-4 text-emerald-400" />
                Единый Master README.md для вашего профиля GitHub
              </h3>
              <p className="text-xs text-slate-400">
                Создайте на GitHub специальный репозиторий с вашим никнеймом (например,{' '}
                <code className="text-emerald-400">username/username</code>) и вставьте этот файл.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(masterReadme, 'master-readme')}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              >
                {copiedKey === 'master-readme' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать Markdown</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownload(masterReadme, 'README.md')}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Скачать README.md</span>
              </button>
            </div>
          </div>

          {/* All 10 Projects Showcase Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Каталог проектов для загрузки на GitHub:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROADMAP_STEPS.map((step) => {
                const art = step.lab.portfolioArtifact;
                const isStepDone = completedStepIds.includes(step.id);
                return (
                  <div
                    key={step.id}
                    className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {art.repoName}
                        </span>
                        {isStepDone && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Выполнено
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white">{art.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{art.summary}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {art.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {art.fileTree.length} файлов в проекте
                      </span>
                      <button
                        onClick={() => handleCopy(art.readmeMarkdown, `repo-copy-${step.id}`)}
                        className="text-xs text-slate-300 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === `repo-copy-${step.id}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Скопировано!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>README проекта</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RESUME (CV) BUILDER */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Edit Form */}
          <div className="lg:col-span-5 space-y-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Данные кандидата для резюме
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ФИО:</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Желаемая должность:</label>
                <input
                  type="text"
                  value={resumeData.role}
                  onChange={(e) => setResumeData({ ...resumeData, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Город / Формат:</label>
                  <input
                    type="text"
                    value={resumeData.city}
                    onChange={(e) => setResumeData({ ...resumeData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Зарплатные ожидания:</label>
                  <input
                    type="text"
                    value={resumeData.desiredSalary}
                    onChange={(e) => setResumeData({ ...resumeData, desiredSalary: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Email:</label>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Telegram / Телефон:</label>
                  <input
                    type="text"
                    value={resumeData.telegram}
                    onChange={(e) => setResumeData({ ...resumeData, telegram: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Ссылка на GitHub портфолио:</label>
                <input
                  type="text"
                  value={resumeData.githubUrl}
                  onChange={(e) => setResumeData({ ...resumeData, githubUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">О себе (Summary):</label>
                <textarea
                  rows={4}
                  value={resumeData.aboutMe}
                  onChange={(e) => setResumeData({ ...resumeData, aboutMe: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Сгенерированное резюме для HeadHunter / Хабр Карьеры:
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(generatedResume, 'resume-copy')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer border border-slate-700"
                >
                  {copiedKey === 'resume-copy' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Копировать резюме</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownload(generatedResume, 'RESUME_CV.md')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Скачать CV.md</span>
                </button>
              </div>
            </div>

            <pre className="bg-slate-950 p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[620px]">
              {generatedResume}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
