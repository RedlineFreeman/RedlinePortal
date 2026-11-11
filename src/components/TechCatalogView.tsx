/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TECH_CATALOG,
  ALL_SPECIALIZATIONS,
  ALL_TECH_TYPES,
  TECH_CATALOG_SUMMARY,
} from '../data/techCatalogData';
import { TechItem, SupportedOS, JobRole } from '../types/techCatalog';
import {
  exportTechCatalogToExcel,
  exportTechCatalogToCsv,
  generateTechCatalogTsv,
} from '../utils/excelExporter';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  CheckCircle2,
  Terminal,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Briefcase,
  Monitor,
  ExternalLink,
  BarChart3,
  BookOpen,
  Info,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TechCatalogViewProps {
  testedItemIds: string[];
  onToggleTested: (id: string) => void;
}

export const TechCatalogView: React.FC<TechCatalogViewProps> = ({
  testedItemIds,
  onToggleTested,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('Все специализации');
  const [selectedType, setSelectedType] = useState<string>('Все типы');
  const [selectedOs, setSelectedOs] = useState<string>('Все');
  const [selectedPriority, setSelectedPriority] = useState<string>('Все');
  const [selectedRole, setSelectedRole] = useState<string>('Все');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const osOptions: (string | SupportedOS)[] = ['Все', 'Windows', 'Linux', 'macOS', 'FreeBSD'];
  const priorityOptions = ['Все', '🔴 Высокий', '🟡 Средний', '🟢 Базовый'];
  const roles: (string | JobRole)[] = [
    'Все',
    'Системный администратор',
    'Сетевой инженер',
    'DevOps / Программист',
    'Тестировщик / QA',
  ];

  // Filtering
  const filteredItems = TECH_CATALOG.filter((item) => {
    if (selectedSpecialization !== 'Все специализации' && item.specialization !== selectedSpecialization) {
      return false;
    }
    if (selectedType !== 'Все типы' && item.type !== selectedType) {
      return false;
    }
    if (selectedOs !== 'Все' && !item.supportedOS.includes(selectedOs as SupportedOS)) {
      return false;
    }
    if (selectedPriority !== 'Все') {
      if (selectedPriority.includes('Высокий') && !item.priorityRaw.includes('Высокий')) return false;
      if (selectedPriority.includes('Средний') && !item.priorityRaw.includes('Средний')) return false;
      if (selectedPriority.includes('Базовый') && !(item.priorityRaw.includes('Низкий') || item.priorityRaw.includes('Базовый'))) return false;
    }
    if (selectedRole !== 'Все' && !item.roles.includes(selectedRole as JobRole)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.specialization.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        item.docUrl.toLowerCase().includes(q) ||
        item.supportedOS.some((os) => os.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleExportExcel = () => {
    exportTechCatalogToExcel(filteredItems, 'Full_IT_Base_417_Technologies.xlsx');
  };

  const handleExportCsv = () => {
    const csv = exportTechCatalogToCsv(filteredItems);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Full_IT_Base_417_Technologies.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyTsvToClipboard = () => {
    const tsv = generateTechCatalogTsv(filteredItems);
    navigator.clipboard.writeText(tsv);
    setCopiedKey('tsv');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestItem = (id: string, name: string) => {
    onToggleTested(id);
    if (!testedItemIds.includes(id)) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const testedCount = TECH_CATALOG.filter((i) => testedItemIds.includes(i.id)).length;
  const testedPercent = Math.round((testedCount / TECH_CATALOG.length) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Full IT Base • 417 Технологий & Программ из всех специализаций</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Полный каталог технологий, программ и ОС с официальными ссылками
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Исчерпывающая база IT-индустрии: <strong>417 инструментов</strong> по 10 направлениям (ОС, сети, базы данных, веб-серверы, контейнеры, мониторинг, безопасность, бэкапы, удаленный доступ). Для каждой позиции указаны ссылки на документацию, поддержка ОС и тестовые задания.
            </p>
          </div>

          {/* Action Buttons: Excel, CSV, TSV, Summary */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={handleExportExcel}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
              title="Скачать нативный Excel файл со всеми страницами и ссылками"
            >
              <Download className="w-4 h-4" />
              <span>Скачать Excel (.xlsx)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title="Скачать в CSV формате"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
              <button
                onClick={copyTsvToClipboard}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                title="Скопировать таблицу для вставки в Google Таблицы"
              >
                {copiedKey === 'tsv' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'tsv' ? 'Скопировано' : 'Буфер TSV'}</span>
              </button>
              <button
                onClick={() => setShowSummaryModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-colors cursor-pointer"
                title="Посмотреть статистическую матрицу категорий"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Сводка</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Всего в базе</div>
            <div className="text-xl font-extrabold text-white mt-0.5">{TECH_CATALOG.length} позиций</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Протестировано</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
              {testedCount} <span className="text-xs text-slate-400 font-normal">({testedPercent}%)</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Специализаций</div>
            <div className="text-xl font-extrabold text-indigo-300 mt-0.5">10 направлений</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Высокий приоритет</div>
            <div className="text-xl font-extrabold text-rose-400 mt-0.5">
              {TECH_CATALOG.filter((i) => i.priorityRaw.includes('Высокий')).length} инструментов
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter Control Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, назначению, категории, ссылке (например: Nginx, Docker, Wireshark, BIND9, KVM)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Specialization Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Специализация:</label>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ALL_SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Тип сущности:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ALL_TECH_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* OS Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Поддержка ОС:</label>
            <select
              value={selectedOs}
              onChange={(e) => setSelectedOs(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {osOptions.map((os) => (
                <option key={os} value={os}>
                  {os === 'Все' ? 'Все операционные системы' : os}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Приоритет / Важность:</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {priorityOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Target Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Целевая профессия:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter summary status */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div>
            Найдено записей: <strong className="text-white">{filteredItems.length}</strong> из {TECH_CATALOG.length}
          </div>
          {(selectedSpecialization !== 'Все специализации' ||
            selectedType !== 'Все типы' ||
            selectedOs !== 'Все' ||
            selectedPriority !== 'Все' ||
            selectedRole !== 'Все' ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedSpecialization('Все специализации');
                setSelectedType('Все типы');
                setSelectedOs('Все');
                setSelectedPriority('Все');
                setSelectedRole('Все');
                setSearchQuery('');
              }}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Сбросить все фильтры
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold tracking-wider uppercase text-[11px]">
                <th className="py-3 px-3 w-12 text-center">№</th>
                <th className="py-3 px-3 w-48">Название & Ссылка</th>
                <th className="py-3 px-3 w-32">Тип</th>
                <th className="py-3 px-3 w-44">Специализация & Категория</th>
                <th className="py-3 px-3 w-36">Поддержка ОС</th>
                <th className="py-3 px-3 w-28 text-center">Приоритет</th>
                <th className="py-3 px-4 min-w-[300px]">Назначение и применение</th>
                <th className="py-3 px-3 w-28 text-center">Протестировано</th>
                <th className="py-3 px-3 w-20 text-center">Детали</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredItems.map((item, idx) => {
                const isTested = testedItemIds.includes(item.id);
                const isExpanded = expandedRowId === item.id;

                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isTested ? 'bg-emerald-950/10' : ''
                      }`}
                    >
                      {/* Number */}
                      <td className="py-3 px-3 text-center text-slate-500 font-mono font-bold">
                        {item.num || idx + 1}
                      </td>

                      {/* Name & Official link */}
                      <td className="py-3 px-3">
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-white text-sm flex items-center gap-1.5 group">
                            <span>{item.name}</span>
                          </div>
                          {item.docUrl && (
                            <a
                              href={item.docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline max-w-[200px] truncate"
                              title={`Открыть документацию: ${item.docUrl}`}
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="truncate">{item.docUrl.replace(/^https?:\/\//, '')}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Type badge */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            item.type === 'ОС'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : item.type === 'Программа'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : item.type === 'Технология'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : item.type === 'Утилита'
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                              : item.type === 'Платформа'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : item.type === 'Язык'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>

                      {/* Specialization & Category */}
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          <span className="inline-block text-[10px] font-semibold text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">
                            {item.specialization}
                          </span>
                          <div className="text-[11px] text-slate-400">{item.category}</div>
                        </div>
                      </td>

                      {/* Supported OS */}
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {item.supportedOS.map((os) => (
                            <span
                              key={os}
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                os === 'Linux'
                                  ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                                  : os === 'Windows'
                                  ? 'bg-blue-950/40 text-blue-300 border border-blue-500/30'
                                  : os === 'macOS'
                                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                                  : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
                              }`}
                            >
                              {os}
                            </span>
                          ))}
                        </div>
                        {item.osRaw && item.osRaw.includes('Кроссплатформен') && (
                          <div className="text-[10px] text-slate-500 mt-0.5">Кроссплатформенно</div>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            item.priorityRaw.includes('Высокий')
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : item.priorityRaw.includes('Средний')
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {item.priorityRaw}
                        </span>
                      </td>

                      {/* Purpose */}
                      <td className="py-3 px-4 text-slate-300 text-xs leading-relaxed">
                        {item.purpose}
                      </td>

                      {/* Tested Checkbox */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleTestItem(item.id, item.name)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isTested
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 border border-slate-700'
                          }`}
                          title="Отметить как протестированное"
                        >
                          {isTested ? (
                            <>
                              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Готово</span>
                            </>
                          ) : (
                            <>
                              <Square className="w-3.5 h-3.5" />
                              <span>Тест</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Details toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => setExpandedRowId(isExpanded ? null : item.id)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Показать лабораторное задание и команду установки"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable row: Test lab & quick command */}
                    {isExpanded && (
                      <tr className="bg-slate-950/70 border-b border-slate-800/80">
                        <td colSpan={9} className="p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Test lab */}
                            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Практическое задание для лаборатории:</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">{item.testLab}</p>
                            </div>

                            {/* Quick command */}
                            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 relative group">
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                                  <Terminal className="w-3.5 h-3.5" />
                                  <span>Команда установки / запуска:</span>
                                </div>
                                <button
                                  onClick={() => copyText(`cmd-${item.id}`, item.quickCommandOrInstall)}
                                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedKey === `cmd-${item.id}` ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                  <span>{copiedKey === `cmd-${item.id}` ? 'Скопировано' : 'Копировать'}</span>
                                </button>
                              </div>
                              <pre className="font-mono text-xs text-slate-300 overflow-x-auto bg-slate-950 p-2 rounded border border-slate-800/80">
                                {item.quickCommandOrInstall}
                              </pre>
                            </div>
                          </div>

                          {/* Extra info row */}
                          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
                            <div>
                              <span>Источники в базе: </span>
                              <strong className="text-slate-300">{item.sources || 'Admin_Full_Map, IT_Mega_Matrix'}</strong>
                            </div>
                            {item.docUrl && (
                              <a
                                href={item.docUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:underline flex items-center gap-1"
                              >
                                <span>Перейти к официальной документации: {item.docUrl}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Matrix Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">
                  Сводная статистика IT-базы по 28 категориям (417 инструментов)
                </h3>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs text-slate-400">
                Таблица распределения 417 технологий и программ по уровню важности для системного администратора и смежных ролей (из листа «Сводка» файла Full IT Base).
              </p>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-2.5 px-3">Категория</th>
                      <th className="py-2.5 px-3 text-center text-rose-400">🔴 Высокий</th>
                      <th className="py-2.5 px-3 text-center text-amber-400">🟡 Средний</th>
                      <th className="py-2.5 px-3 text-center text-slate-400">🟢 Низкий</th>
                      <th className="py-2.5 px-3 text-center font-bold text-white">Всего</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {TECH_CATALOG_SUMMARY.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 text-slate-200 font-medium">{s.category}</td>
                        <td className="py-2 px-3 text-center text-rose-300 font-mono font-bold">
                          {s.highCount}
                        </td>
                        <td className="py-2 px-3 text-center text-amber-300 font-mono font-bold">
                          {s.mediumCount}
                        </td>
                        <td className="py-2 px-3 text-center text-slate-400 font-mono">
                          {s.lowCount}
                        </td>
                        <td className="py-2 px-3 text-center text-white font-mono font-extrabold bg-slate-950/40">
                          {s.totalCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-950 font-bold border-t border-slate-700">
                      <td className="py-3 px-3 text-white">ИТОГО</td>
                      <td className="py-3 px-3 text-center text-rose-400 font-mono font-extrabold">156</td>
                      <td className="py-3 px-3 text-center text-amber-400 font-mono font-extrabold">108</td>
                      <td className="py-3 px-3 text-center text-slate-400 font-mono font-extrabold">153</td>
                      <td className="py-3 px-3 text-center text-emerald-400 font-mono font-black text-sm">417</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex justify-end">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
