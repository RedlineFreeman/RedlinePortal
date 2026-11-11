import React, { useState } from 'react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { ResumeData } from '../types/sysadmin';
import {
  generatePortfolioMasterReadme,
  generateResumeMarkdown,
} from '../utils/calculator';
import {
  getUnifiedMonorepoFiles,
  downloadUnifiedMonorepoZip,
  MONOREPO_TOPOLOGY_ASCII,
  UNIFIED_DOCKER_COMPOSE_YML,
  UNIFIED_ANSIBLE_SITE_YML,
  UNIFIED_MONOREPO_README_MD,
} from '../utils/monorepoExporter';
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
  Layers,
  Network,
  Terminal,
  ShieldCheck,
  HardDrive,
  Cpu,
  Server,
  Lock,
  Activity,
  Archive,
  Code,
  FileCode,
} from 'lucide-react';

interface PortfolioResumeHubProps {
  completedStepIds: number[];
  completedMissionIds: string[];
}

export const PortfolioResumeHub: React.FC<PortfolioResumeHubProps> = ({
  completedStepIds,
  completedMissionIds,
}) => {
  const [activeTab, setActiveTab] = useState<'monorepo' | 'portfolio' | 'resume'>('monorepo');
  const [monorepoSubTab, setMonorepoSubTab] = useState<'explorer' | 'architecture' | 'quickstart' | 'interview'>('explorer');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  const monorepoFiles = getUnifiedMonorepoFiles();
  const fileKeys = Object.keys(monorepoFiles);
  const [selectedFileKey, setSelectedFileKey] = useState<string>('docker-compose.yml');

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: 'Станислав (RedlineFreeman)',
    role: 'Системный администратор / DevOps Инженер',
    city: 'Москва / Удаленно',
    email: 'stanislav.redline@gmail.com',
    phone: '+7 (999) 123-45-67',
    telegram: '@RedlineFreeman',
    githubUrl: 'https://github.com/RedlineFreeman',
    desiredSalary: 'от 120 000 до 180 000 ₽',
    aboutMe:
      'Системный администратор и разработчик инфраструктуры (RedlinePortal & RedlineMMORPGPortal). Практический опыт развертывания Linux-серверов (Ubuntu, Debian), Nginx (SSL/TLS, rate-limiting), PostgreSQL 16, Redis, оркестрации в Docker Compose, мониторинга Prometheus + Grafana, автоматизации в Ansible и бэкапов BorgBackup. Автор игровых и IT-порталов.',
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

  const handleDownloadMonorepo = async () => {
    try {
      setIsDownloadingZip(true);
      await downloadUnifiedMonorepoZip();
    } catch (err) {
      console.error('Failed to download zip:', err);
    } finally {
      setIsDownloadingZip(false);
    }
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
            Центр Портфолио & Единый Мега-Проект (Monorepo)
          </h2>
          <p className="text-sm text-slate-300">
            Объединение всех 10 модулей в один реальный корпоративный репозиторий, готовый к запуску
            и демонстрации на собеседованиях.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('monorepo')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'monorepo'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Единый Мега-Проект</span>
            <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-400/40">
              Monorepo
            </span>
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>10 отдельных проектов</span>
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
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

      {/* TAB 1: UNIFIED MONOREPO */}
      {activeTab === 'monorepo' && (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 p-5 sm:p-6 rounded-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      sysadmin-enterprise-monorepo
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">• Production All-in-One</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Единая корпоративная инфраструктура высокой доступности
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    Все 10 этапов объединены в один сквозной проект: Nginx Reverse Proxy (SSL/TLS, rate-limiting),
                    изолированные БД PostgreSQL 16 & Redis, мониторинг Prometheus + Grafana + Node Exporter + Uptime Kuma,
                    автоматизация Ansible, зашифрованные бэкапы BorgBackup и базовое hardening.
                  </p>
                </div>

                {/* Primary Download Button */}
                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={handleDownloadMonorepo}
                    disabled={isDownloadingZip}
                    className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/25 active:scale-95 disabled:opacity-50"
                  >
                    <Download className="w-5 h-5" />
                    <span>
                      {isDownloadingZip
                        ? 'Архивирование...'
                        : 'Скачать весь монорепозиторий (.ZIP)'}
                    </span>
                  </button>
                  <span className="text-[11px] text-slate-400 text-center">
                    Готовый архив с {fileKeys.length} файлами, скриптами и конфигами
                  </span>
                </div>
              </div>

              {/* Badges / Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
                  <Server className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Сервисов в Compose</div>
                    <div className="text-xs font-bold text-white">8 контейнеров</div>
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Безопасность</div>
                    <div className="text-xs font-bold text-white">UFW + TLS 1.3 + CIS</div>
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Мониторинг</div>
                    <div className="text-xs font-bold text-white">Prometheus + Grafana</div>
                  </div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
                  <Archive className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Резервирование</div>
                    <div className="text-xs font-bold text-white">BorgBackup (7D/4W/12M)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setMonorepoSubTab('explorer')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                monorepoSubTab === 'explorer'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Просмотр файлов ({fileKeys.length})</span>
            </button>

            <button
              onClick={() => setMonorepoSubTab('architecture')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                monorepoSubTab === 'architecture'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Архитектура & Топология сети</span>
            </button>

            <button
              onClick={() => setMonorepoSubTab('quickstart')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                monorepoSubTab === 'quickstart'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Быстрый запуск & Makefile</span>
            </button>

            <button
              onClick={() => setMonorepoSubTab('interview')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                monorepoSubTab === 'interview'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Презентация на собеседовании</span>
            </button>
          </div>

          {/* SUB-TAB 1: FILE EXPLORER */}
          {monorepoSubTab === 'explorer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Sidebar: File Tree */}
              <div className="lg:col-span-4 space-y-3 bg-slate-900 border border-slate-800 p-4 rounded-xl max-h-[640px] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
                    Файлы репозитория
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">{fileKeys.length} шт.</span>
                </div>

                <div className="space-y-1">
                  {fileKeys.map((fKey) => {
                    const isSelected = fKey === selectedFileKey;
                    return (
                      <button
                        key={fKey}
                        onClick={() => setSelectedFileKey(fKey)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                        }`}
                      >
                        <div className="truncate flex items-center gap-2">
                          <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <span className="truncate">{fKey}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Panel: Code Viewer */}
              <div className="lg:col-span-8 space-y-3">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500">Выбранный файл:</span>
                    <div className="font-mono text-sm font-bold text-emerald-400">
                      {selectedFileKey}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(monorepoFiles[selectedFileKey], `file-${selectedFileKey}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    >
                      {copiedKey === `file-${selectedFileKey}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать файл</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownload(monorepoFiles[selectedFileKey], selectedFileKey.split('/').pop() || 'file.txt')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-500/30"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Скачать</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto max-h-[560px]">
                  <pre className="font-mono text-xs text-slate-300 whitespace-pre leading-relaxed">
                    {monorepoFiles[selectedFileKey]}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: ARCHITECTURE & TOPOLOGY */}
          {monorepoSubTab === 'architecture' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-400" />
                  Сквозная схема взаимодействия сервисов (Architecture Blueprint)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Трафик клиентов проходит через Nginx Reverse Proxy с проверкой SSL и лимитом запросов (Rate Limiting).
                  Базы данных PostgreSQL и Redis надежно изолированы во внутренней закрытой docker-сети без прямого доступа
                  из глобальной сети. Метрики централизованно собираются Prometheus и выводятся в Grafana.
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                  <pre className="font-mono text-[11px] sm:text-xs text-emerald-300 whitespace-pre leading-snug">
                    {MONOREPO_TOPOLOGY_ASCII}
                  </pre>
                </div>
              </div>

              {/* Networking Table */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  Таблица сетевой изоляции и портов (Network Segmentation)
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 px-3 font-semibold">Сервис</th>
                        <th className="py-2 px-3 font-semibold">Docker Сеть</th>
                        <th className="py-2 px-3 font-semibold">Внутренний порт</th>
                        <th className="py-2 px-3 font-semibold">Доступ снаружи</th>
                        <th className="py-2 px-3 font-semibold">Механизм защиты</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">Nginx Gateway</td>
                        <td className="py-2.5 px-3 text-cyan-400">enterprise-frontend</td>
                        <td className="py-2.5 px-3">80, 443</td>
                        <td className="py-2.5 px-3 text-emerald-400">0.0.0.0:80, 443</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">TLS 1.3, Rate-limit, Fail2ban</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">App Backend</td>
                        <td className="py-2.5 px-3 text-cyan-400">frontend + backend</td>
                        <td className="py-2.5 px-3">8080</td>
                        <td className="py-2.5 px-3 text-amber-400">Только через Nginx</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">Внутренний proxy_pass</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">PostgreSQL 16</td>
                        <td className="py-2.5 px-3 text-purple-400">enterprise-backend (internal)</td>
                        <td className="py-2.5 px-3">5432</td>
                        <td className="py-2.5 px-3 text-red-400">НЕТ (Закрыт)</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">Пароль, pg_hba.conf, non-root</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">Redis Cache</td>
                        <td className="py-2.5 px-3 text-purple-400">enterprise-backend (internal)</td>
                        <td className="py-2.5 px-3">6379</td>
                        <td className="py-2.5 px-3 text-red-400">НЕТ (Закрыт)</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">requirepass, appendonly</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">Grafana</td>
                        <td className="py-2.5 px-3 text-amber-400">enterprise-monitoring</td>
                        <td className="py-2.5 px-3">3000</td>
                        <td className="py-2.5 px-3 text-emerald-400">https://host/grafana/</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">Basic Auth / Пароль администратора</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-bold text-white">Prometheus</td>
                        <td className="py-2.5 px-3 text-amber-400">enterprise-monitoring</td>
                        <td className="py-2.5 px-3">9090</td>
                        <td className="py-2.5 px-3 text-red-400">Только во внутренней сети</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">Scrape targets whitelist</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: QUICKSTART & COMMANDS */}
          {monorepoSubTab === 'quickstart' && (
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Развертывание на сервере за 3 шага
                </h4>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400">1. Клонирование и настройка секретов:</span>
                    <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`git clone https://github.com/your-username/sysadmin-enterprise-monorepo.git
cd sysadmin-enterprise-monorepo
cp .env.example .env
nano .env   # укажите пароли для Postgres, Redis, Grafana`}
                    </pre>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400">2. Автоматический запуск стека:</span>
                    <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`./scripts/deploy.sh
# или через Makefile:
make up`}
                    </pre>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400">3. Проверка здоровья (Health Check Probe):</span>
                    <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`./scripts/healthcheck.sh
# Выведет статус портов 80/443, Docker контейнеров, соединение с БД и Prometheus`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Makefile Commands */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  Удобные команды администратора (Makefile)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <code className="text-xs font-bold text-emerald-400">make up</code>
                    <p className="text-[11px] text-slate-400 mt-1">Запуск всех 8 контейнеров в фоне</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <code className="text-xs font-bold text-emerald-400">make down</code>
                    <p className="text-[11px] text-slate-400 mt-1">Безопасная остановка всех сервисов</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <code className="text-xs font-bold text-emerald-400">make health</code>
                    <p className="text-[11px] text-slate-400 mt-1">Полный чек портов, баз и памяти</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <code className="text-xs font-bold text-emerald-400">make backup</code>
                    <p className="text-[11px] text-slate-400 mt-1">Запуск снапшота BorgBackup</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <code className="text-xs font-bold text-emerald-400">make restore</code>
                    <p className="text-[11px] text-slate-400 mt-1">Тестовая валидация бэкапа (Drill)</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <code className="text-xs font-bold text-emerald-400">make logs</code>
                    <p className="text-[11px] text-slate-400 mt-1">Просмотр live-логов с автоскроллом</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: INTERVIEW TALKING POINTS */}
          {monorepoSubTab === 'interview' && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  Готовые ответы на технические вопросы тимлидов
                </h4>
                <p className="text-xs text-slate-300">
                  Используйте эти аргументы на собеседовании, когда вас попросят рассказать о вашем проекте в портфолио:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">
                      Вопрос: «Расскажите, какой самый сложный инфраструктурный проект вы делали?»
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <em>«Я разработал комплексный Enterprise Monorepo, где с нуля спроектировал и автоматизировал
                      инфраструктуру на 8 сервисов. На фронтенде стоит Nginx с TLS 1.3, HSTS и защитой от перегрузки (Rate Limiting).
                      Базы данных PostgreSQL 16 и Redis изолированы в закрытой сети. Вся телеметрия собирается Node Exporter и
                      Prometheus с дашбордами в Grafana. Автоматизация сделана через роли Ansible, а резервное копирование —
                      через зашифрованный BorgBackup по схеме дедупликации G-F-S.»</em>
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">
                      Вопрос: «Как у вас организована безопасность серверов?»
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <em>«По принципу наименьших привилегий (Least Privilege): вход только по SSH-ключам (порт изменен,
                      root-логин отключен), фаервол UFW блокирует все лишние входящие порты, Fail2ban защищает от брутфорса,
                      ядро Linux настроено по CIS Benchmark (защита от SYN Flood, отключен ICMP redirect, vm.swappiness=10).
                      Контейнеры баз данных не имеют прямого выхода наружу.»</em>
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">
                      Вопрос: «А как вы проверяете, что ваши бэкапы действительно восстанавливаются?»
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <em>«Бэкап считается существующим только тогда, когда проверена процедура его восстановления.
                      В моем репозитории написан скрипт <code>restore-drill.sh</code>, который в изолированной тестовой
                      директории монтирует последний снапшот BorgBackup, распаковывает критические файлы и сверяет контрольные
                      суммы без простоя продакшена.»</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GITHUB 10 INDIVIDUAL PROJECTS */}
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

      {/* TAB 3: RESUME (CV) BUILDER */}
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
