import React from 'react';
import {
  Terminal,
  Compass,
  FileCode2,
  AlertTriangle,
  Briefcase,
  HelpCircle,
  Wrench,
  CheckCircle2,
  Server,
  FileSpreadsheet,
} from 'lucide-react';

export type ActiveTab =
  | 'roadmap'
  | 'catalog'
  | 'labs'
  | 'terminal'
  | 'troubleshooting'
  | 'portfolio'
  | 'interview'
  | 'toolkit'
  | 'vps';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  completedStepIds: number[];
  completedMissionIds: string[];
  testedItemCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  completedStepIds,
  completedMissionIds,
  testedItemCount = 0,
}) => {
  const totalSteps = 10;
  const progressPercent = Math.round((completedStepIds.length / totalSteps) * 100);

  const navItems = [
    { id: 'roadmap' as ActiveTab, label: 'Дорожная карта', icon: Compass },
    {
      id: 'catalog' as ActiveTab,
      label: 'База Софта & Excel (417)',
      icon: FileSpreadsheet,
      badge: '417 позиций',
      badgeColor: 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 font-bold',
    },
    {
      id: 'labs' as ActiveTab,
      label: 'Лабораторные & Кейсы',
      icon: FileCode2,
      badge: `${completedStepIds.length}/${totalSteps}`,
    },
    { id: 'terminal' as ActiveTab, label: 'Терминал Linux', icon: Terminal },
    {
      id: 'troubleshooting' as ActiveTab,
      label: 'Траблшутинг-миссии',
      icon: AlertTriangle,
      badge: `${completedMissionIds.length}/5`,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    { id: 'portfolio' as ActiveTab, label: 'Портфолио & Резюме', icon: Briefcase },
    { id: 'interview' as ActiveTab, label: 'Тренажер Собеседований', icon: HelpCircle },
    { id: 'toolkit' as ActiveTab, label: 'Инструменты Сисадмина', icon: Wrench },
    {
      id: 'vps' as ActiveTab,
      label: 'Скачать / VPS & Офлайн',
      icon: Server,
      badge: 'ZIP + Docker',
      badgeColor: 'bg-cyan-500/25 text-cyan-300 border-cyan-500/40 font-bold',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('roadmap')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Server className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  SysAdmin <span className="text-emerald-400">Pro</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Career Lab
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                План обучения + Портфолио + Собеседования
              </p>
            </div>
          </div>

          {/* Quick VPS & Progress Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('vps')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm shadow-cyan-500/10 cursor-pointer"
            >
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Скачать для VPS / Офлайн</span>
              <span className="sm:hidden">VPS & ZIP</span>
            </button>

            <div className="hidden md:flex items-center gap-4 bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Прогресс:</span>
                <span className="font-bold text-white">{progressPercent}%</span>
              </div>
              <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-2 overflow-x-auto py-2.5 border-t border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="font-semibold">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
