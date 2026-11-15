import React, { useState, useEffect, useMemo } from 'react';
import { KnowledgeEntry, KnowledgeLevel } from '../types/knowledgeBase';
import { INITIAL_KNOWLEDGE_ENTRIES } from '../data/initialKnowledgeBase';
import {
  deduplicateKnowledgeEntries,
  mergeKnowledgeEntries,
  filterKnowledgeEntries,
} from '../utils/knowledgeBaseHelper';
import {
  BookOpen,
  Search,
  Plus,
  FolderTree,
  Tag,
  Copy,
  Check,
  Trash2,
  Edit3,
  Download,
  Upload,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Terminal,
  Server,
  Network,
  Shield,
  Database,
  Cpu,
  X,
  FileText,
  AlertCircle,
  Router,
  Activity,
  FileCode2,
  FileSpreadsheet,
  Briefcase,
} from 'lucide-react';

interface KnowledgeBaseViewProps {
  onOpenTerminalWithCommand?: (cmd: string) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = () => {
  // Load knowledge entries from localStorage and merge with latest built-in seed entries
  const [entries, setEntries] = useState<KnowledgeEntry[]>(() => {
    try {
      const saved = localStorage.getItem('redline_knowledge_db');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergeKnowledgeEntries(parsed, INITIAL_KNOWLEDGE_ENTRIES);
        }
      }
      return INITIAL_KNOWLEDGE_ENTRIES;
    } catch {
      return INITIAL_KNOWLEDGE_ENTRIES;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('redline_knowledge_db', JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save knowledge base:', e);
    }
  }, [entries]);

  // Selected entry (defaults to SCTP if present)
  const [selectedEntryId, setSelectedEntryId] = useState<string>(() => {
    const sctp = entries.find((e) => e.title.includes('SCTP'));
    return sctp ? sctp.id : entries[0]?.id || '';
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<KnowledgeLevel | 'all'>('all');

  // Expanded sections in tree view
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Сети': true,
    'Linux & ОС': true,
  });

  // UI helpers
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [importFeedback, setImportFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State for Adding / Editing
  const [formData, setFormData] = useState<{
    section: string;
    customSection: string;
    category: string;
    customCategory: string;
    title: string;
    shortSummary: string;
    description: string;
    practicalUsage: string;
    commandsOrConfig: string;
    level: KnowledgeLevel;
    tagsInput: string;
  }>({
    section: 'Сети',
    customSection: '',
    category: 'Протоколы',
    customCategory: '',
    title: '',
    shortSummary: '',
    description: '',
    practicalUsage: '',
    commandsOrConfig: '',
    level: 'Middle',
    tagsInput: '',
  });

  // Extract unique sections & categories for dropdown suggestions
  const availableSections = useMemo(() => {
    const set = new Set(entries.map((e) => e.section));
    return Array.from(set).sort();
  }, [entries]);

  const availableCategoriesForSection = useMemo(() => {
    const currentSec = formData.section === '__custom__' ? formData.customSection : formData.section;
    const set = new Set(entries.filter((e) => e.section === currentSec).map((e) => e.category));
    return Array.from(set).sort();
  }, [entries, formData.section, formData.customSection]);

  // Filter entries based on search & filters
  const filteredEntries = useMemo(() => {
    return filterKnowledgeEntries(entries, {
      searchQuery,
      selectedSection: selectedSectionFilter,
      selectedCategory: 'all',
      selectedLevel: selectedLevelFilter,
    });
  }, [entries, searchQuery, selectedSectionFilter, selectedLevelFilter]);

  // Group filtered entries for tree view
  const hierarchicalTree = useMemo(() => {
    const tree: Record<string, Record<string, KnowledgeEntry[]>> = {};
    for (const item of filteredEntries) {
      if (!tree[item.section]) {
        tree[item.section] = {};
      }
      if (!tree[item.section][item.category]) {
        tree[item.section][item.category] = [];
      }
      tree[item.section][item.category].push(item);
    }
    return tree;
  }, [filteredEntries]);

  // Selected entry object
  const currentEntry = useMemo(() => {
    return entries.find((e) => e.id === selectedEntryId) || filteredEntries[0] || null;
  }, [entries, selectedEntryId, filteredEntries]);

  const toggleSectionExpand = (sec: string) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenAddModal = () => {
    setEditingEntry(null);
    setFormData({
      section: availableSections[0] || 'Сети',
      customSection: '',
      category: 'Протоколы',
      customCategory: '',
      title: '',
      shortSummary: '',
      description: '',
      practicalUsage: '',
      commandsOrConfig: '',
      level: 'Middle',
      tagsInput: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setFormData({
      section: entry.section,
      customSection: '',
      category: entry.category,
      customCategory: '',
      title: entry.title,
      shortSummary: entry.shortSummary,
      description: entry.description,
      practicalUsage: entry.practicalUsage || '',
      commandsOrConfig: entry.commandsOrConfig || '',
      level: entry.level,
      tagsInput: entry.tags.join(', '),
    });
    setIsModalOpen(true);
  };

  const handleDeleteEntry = (id: string, title: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить материал "${title}" из базы знаний?`)) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEntryId === id) {
        const remaining = entries.filter((e) => e.id !== id);
        if (remaining.length > 0) {
          setSelectedEntryId(remaining[0].id);
        }
      }
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const finalSection = formData.section === '__custom__' ? formData.customSection.trim() : formData.section;
    const finalCategory = formData.category === '__custom__' ? formData.customCategory.trim() : formData.category;

    if (!finalSection || !finalCategory || !formData.title.trim() || !formData.description.trim()) {
      setFormError('Пожалуйста, заполните обязательные поля: Раздел, Категория, Название и Описание.');
      return;
    }

    const normalizedTitle = formData.title.trim().toLowerCase().replace(/\s+/g, ' ');
    const duplicate = entries.find(
      (item) =>
        item.title.trim().toLowerCase().replace(/\s+/g, ' ') === normalizedTitle &&
        item.id !== editingEntry?.id
    );
    if (duplicate) {
      setFormError(`Материал с названием "${duplicate.title}" уже существует в разделе "${duplicate.section}".`);
      return;
    }

    const tags = formData.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const now = new Date().toISOString().split('T')[0];

    if (editingEntry) {
      // Update existing
      setEntries((prev) =>
        prev.map((item) =>
          item.id === editingEntry.id
            ? {
                ...item,
                section: finalSection,
                category: finalCategory,
                title: formData.title.trim(),
                shortSummary: formData.shortSummary.trim() || formData.title.trim(),
                description: formData.description.trim(),
                practicalUsage: formData.practicalUsage.trim(),
                commandsOrConfig: formData.commandsOrConfig.trim(),
                level: formData.level,
                tags,
                updatedAt: now,
              }
            : item
        )
      );
      setSelectedEntryId(editingEntry.id);
    } else {
      // Create new
      const newId = `kb-${Date.now()}`;
      const newEntry: KnowledgeEntry = {
        id: newId,
        section: finalSection,
        category: finalCategory,
        title: formData.title.trim(),
        shortSummary: formData.shortSummary.trim() || formData.title.trim(),
        description: formData.description.trim(),
        practicalUsage: formData.practicalUsage.trim(),
        commandsOrConfig: formData.commandsOrConfig.trim(),
        level: formData.level,
        tags,
        isCustom: true,
        createdAt: now,
        updatedAt: now,
      };
      setEntries((prev) => [newEntry, ...prev]);
      setSelectedEntryId(newId);
      // Auto expand the new section
      setExpandedSections((prev) => ({ ...prev, [finalSection]: true }));
    }

    setIsModalOpen(false);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `redline-knowledge-base-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const deduplicated = deduplicateKnowledgeEntries(imported);
          setEntries(deduplicated);
          setImportFeedback({ type: 'success', text: `Успешно импортировано ${deduplicated.length} уникальных материалов в базу знаний!` });
          setTimeout(() => setImportFeedback(null), 5000);
        } else {
          setImportFeedback({ type: 'error', text: 'Файл должен содержать JSON массив материалов.' });
        }
      } catch {
        setImportFeedback({ type: 'error', text: 'Ошибка при чтении JSON файла. Проверьте валидность файла.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetToDefault = () => {
    if (window.confirm('Сбросить базу знаний к начальным материалам по умолчанию?')) {
      setEntries(INITIAL_KNOWLEDGE_ENTRIES);
      localStorage.removeItem('redline_knowledge_db');
      const sctp = INITIAL_KNOWLEDGE_ENTRIES.find((e) => e.title.includes('SCTP'));
      setSelectedEntryId(sctp ? sctp.id : INITIAL_KNOWLEDGE_ENTRIES[0].id);
    }
  };

  const getSectionIcon = (sec: string) => {
    switch (sec.toLowerCase()) {
      case 'сети':
        return Network;
      case 'cisco и сетевое оборудование':
        return Router;
      case 'linux & ос':
        return Terminal;
      case 'freebsd & unix':
        return Cpu;
      case 'windows & active directory':
        return Server;
      case 'виртуализация':
        return Layers;
      case 'системная диагностика':
        return Activity;
      case 'автоматизация и скрипты':
        return FileCode2;
      case 'базы данных':
        return Database;
      case '1с:предприятие':
        return Briefcase;
      case 'офисные пакеты и аналитика':
        return FileSpreadsheet;
      case 'безопасность & фаерволы':
        return Shield;
      case 'серверное железо':
        return Cpu;
      default:
        return Server;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            База Обучающих Материалов & Энциклопедия ({entries.length} тем без повторений)
          </div>
          <h2 className="text-2xl font-black text-white">
            Интерактивная База Знаний Системного Администратора
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Полный справочник без дублей: <strong className="text-white">Сети & Wireshark, Cisco IOS, Linux, FreeBSD & Unix, Active Directory, Windows Server, Hyper-V, Sysinternals, Bash, PowerShell, SQL/NoSQL БД, 1С:Предприятие, Excel и Microsoft Office</strong>.
            Вы можете <strong className="text-emerald-400">дополнять базу новыми материалами</strong> с сохранением в локальное хранилище и JSON-экспортом.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить материал</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            aria-label="Экспортировать базу знаний в JSON"
            title="Экспортировать всю базу знаний в JSON файл"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          <label
            aria-label="Импортировать базу знаний из JSON"
            title="Импортировать базу знаний из JSON файла"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>
        </div>
      </div>

      {importFeedback && (
        <div
          role="status"
          className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-medium ${
            importFeedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}
        >
          <span>{importFeedback.text}</span>
          <button
            type="button"
            onClick={() => setImportFeedback(null)}
            aria-label="Скрыть уведомление"
            className="ml-3 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Поиск по теме, протоколу (SCTP, TCP), описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Очистить поиск"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
            <span>Раздел:</span>
            <select
              value={selectedSectionFilter}
              onChange={(e) => setSelectedSectionFilter(e.target.value)}
              className="bg-slate-950 text-slate-200 rounded-lg px-2.5 py-1.5 border border-slate-800 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Все разделы ({entries.length})</option>
              {availableSections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
            <span>Сложность:</span>
            <select
              value={selectedLevelFilter}
              onChange={(e) => setSelectedLevelFilter(e.target.value as any)}
              className="bg-slate-950 text-slate-200 rounded-lg px-2.5 py-1.5 border border-slate-800 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Любой уровень</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <button
            onClick={handleResetToDefault}
            className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors ml-auto shrink-0 whitespace-nowrap"
            title="Сбросить пользовательские изменения"
          >
            Сброс
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Hierarchical Tree Navigation */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 max-h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
              Иерархия базы ({filteredEntries.length} материалов)
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              {Object.keys(hierarchicalTree).length} разд.
            </span>
          </div>

          {Object.keys(hierarchicalTree).length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              Материалов не найдено. Попробуйте изменить параметры поиска или добавьте новый материал!
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(hierarchicalTree).map(([section, categories]) => {
                const isSecExpanded = expandedSections[section] !== false;
                const SectionIcon = getSectionIcon(section);
                const sectionItemsCount = Object.values(categories).reduce((acc, arr) => acc + arr.length, 0);

                return (
                  <div key={section} className="rounded-lg bg-slate-950/60 border border-slate-800/80 overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSectionExpand(section)}
                      className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <SectionIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-bold text-white truncate">{section}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                          {sectionItemsCount}
                        </span>
                        {isSecExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Categories and Topics */}
                    {isSecExpanded && (
                      <div className="px-3 pb-2 pt-1 space-y-2 border-t border-slate-800/40">
                        {Object.entries(categories).map(([category, items]) => (
                          <div key={category} className="space-y-1">
                            <div className="text-[11px] font-semibold text-slate-400 pl-2 border-l border-slate-700/60 flex items-center justify-between">
                              <span>{category}</span>
                              <span className="text-[10px] text-slate-600 font-mono">{items.length}</span>
                            </div>

                            <div className="pl-3 space-y-0.5">
                              {items.map((item) => {
                                const isSelected = item.id === currentEntry?.id;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => setSelectedEntryId(item.id)}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between cursor-pointer ${
                                      isSelected
                                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                  >
                                    <span className="truncate">{item.title}</span>
                                    {item.isCustom && (
                                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1 rounded ml-1 shrink-0">
                                        своё
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Pane: Detailed Entry Viewer */}
        <div className="lg:col-span-8 space-y-5">
          {currentEntry ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-7 space-y-6">
              {/* Breadcrumbs & Header Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
                  <span className="text-slate-300 font-medium">{currentEntry.section}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-emerald-400 font-semibold">{currentEntry.category}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-white font-bold">{currentEntry.title}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEditModal(currentEntry)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700 text-xs flex items-center gap-1"
                    title="Редактировать материал"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Редактировать</span>
                  </button>

                  <button
                    onClick={() => handleDeleteEntry(currentEntry.id, currentEntry.title)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer border border-slate-700 text-xs flex items-center gap-1"
                    title="Удалить запись"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopy(`${currentEntry.title}\n\n${currentEntry.description}`, `copy-${currentEntry.id}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700 text-xs flex items-center gap-1"
                    title="Скопировать описание"
                  >
                    {copiedKey === `copy-${currentEntry.id}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копировать</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Level Badge */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      currentEntry.level === 'Junior'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : currentEntry.level === 'Middle'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    }`}
                  >
                    Уровень: {currentEntry.level}
                  </span>

                  {currentEntry.isCustom && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      Пользовательский материал
                    </span>
                  )}

                  <span className="text-xs text-slate-500">
                    Обновлено: {currentEntry.updatedAt}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentEntry.title}
                </h3>

                <p className="text-sm font-semibold text-emerald-400 leading-relaxed">
                  {currentEntry.shortSummary}
                </p>
              </div>

              {/* Description Body */}
              <div className="space-y-3 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  Подробное описание и архитектура
                </h4>
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {currentEntry.description}
                </div>
              </div>

              {/* Practical Usage (if provided) */}
              {currentEntry.practicalUsage && (
                <div className="space-y-2.5 bg-emerald-950/20 p-4 sm:p-5 rounded-xl border border-emerald-500/20">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Практическое применение в продакшене
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentEntry.practicalUsage}
                  </p>
                </div>
              )}

              {/* Commands / Configuration Snippet (if provided) */}
              {currentEntry.commandsOrConfig && (
                <div className="space-y-2.5 bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Terminal className="w-3.5 h-3.5" />
                      Примеры команд, диагностики и конфигурации:
                    </h4>
                    <button
                      onClick={() => handleCopy(currentEntry.commandsOrConfig!, `cmd-${currentEntry.id}`)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `cmd-${currentEntry.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать команды</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed p-3 bg-black/40 rounded-lg border border-slate-800/80">
                    {currentEntry.commandsOrConfig}
                  </pre>
                </div>
              )}

              {/* Tags Bar */}
              {currentEntry.tags && currentEntry.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  {currentEntry.tags.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSearchQuery(t)}
                      className="text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 px-2.5 py-0.5 rounded-full border border-slate-700 cursor-pointer transition-colors"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-base font-bold text-white">Материал не выбран</h4>
              <p className="text-xs text-slate-400">
                Выберите раздел в дереве слева или добавьте новый обучающий материал.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD / EDIT KNOWLEDGE ENTRY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  {editingEntry ? 'Редактирование материала' : 'Добавление нового материала в базу'}
                </h3>
                <p className="text-xs text-slate-400">
                  Заполните данные для иерархического каталога (Раздел → Категория → Тема → Описание)
                </p>
              </div>
              <button
                type="button"
                aria-label="Закрыть модальное окно"
                onClick={() => {
                  setFormError(null);
                  setIsModalOpen(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div role="alert" className="px-3.5 py-2.5 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              {/* Section selector or custom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    Раздел (Domain) <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    {availableSections.map((sec) => (
                      <option key={sec} value={sec}>
                        {sec}
                      </option>
                    ))}
                    <option value="__custom__">+ Создать свой раздел...</option>
                  </select>
                  {formData.section === '__custom__' && (
                    <input
                      type="text"
                      placeholder="Введите название раздела (например: DevOps)"
                      value={formData.customSection}
                      onChange={(e) => setFormData({ ...formData, customSection: e.target.value })}
                      className="w-full mt-2 bg-slate-950 border border-emerald-500/50 rounded-lg p-2 text-slate-200 focus:outline-none"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">
                    Категория / Подраздел <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    {availableCategoriesForSection.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__custom__">+ Создать новую категорию...</option>
                  </select>
                  {formData.category === '__custom__' && (
                    <input
                      type="text"
                      placeholder="Введите категорию (например: Протоколы, Маршрутизация)"
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      className="w-full mt-2 bg-slate-950 border border-emerald-500/50 rounded-lg p-2 text-slate-200 focus:outline-none"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Title & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-bold block mb-1">
                    Название темы / протокола <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Например: SCTP, BGP, WireGuard, cgroups v2..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Сложность</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as KnowledgeLevel })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              {/* Short Summary */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Краткое определение (1 предложение)
                </label>
                <input
                  type="text"
                  placeholder="Краткая суть протокола или технологии для списков и карточек"
                  value={formData.shortSummary}
                  onChange={(e) => setFormData({ ...formData, shortSummary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Подробное описание материала <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Вставьте полный текст описания, принципа работы, отличий от аналогов..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
                  required
                />
              </div>

              {/* Practical Usage */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Практическое применение в продакшене
                </label>
                <textarea
                  rows={2}
                  placeholder="Где и почему применяется? Например: Телекоммуникации, WebRTC Data Channels, банковские шлюзы..."
                  value={formData.practicalUsage}
                  onChange={(e) => setFormData({ ...formData, practicalUsage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Commands & Config */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Примеры команд, диагностики или конфигурации
                </label>
                <textarea
                  rows={3}
                  placeholder="lsmod | grep sctp&#10;sudo modprobe sctp&#10;ss --sctp -a"
                  value={formData.commandsOrConfig}
                  onChange={(e) => setFormData({ ...formData, commandsOrConfig: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Теги (через запятую)
                </label>
                <input
                  type="text"
                  placeholder="SCTP, Транспорт, Сети, Multi-Homing"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  {editingEntry ? 'Сохранить изменения' : 'Добавить в базу'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
