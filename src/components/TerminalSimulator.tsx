import React, { useState, useRef, useEffect } from 'react';
import {
  TerminalState,
  createInitialTerminalState,
  executeCommand,
} from '../utils/terminalEngine';
import { TROUBLESHOOTING_MISSIONS } from '../data/troubleshootingScenarios';
import { TroubleshootingMission } from '../types/sysadmin';
import {
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalSimulatorProps {
  initialMissionId?: string | null;
  onMissionCompleted?: (missionId: string) => void;
}

interface HistoryItem {
  id: string;
  command: string;
  output: string;
  isRoot: boolean;
  dir: string;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  initialMissionId,
  onMissionCompleted,
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(
    initialMissionId || 'sandbox'
  );
  const [terminalState, setTerminalState] = useState<TerminalState>(() => {
    const foundMission = TROUBLESHOOTING_MISSIONS.find((m) => m.id === initialMissionId);
    return createInitialTerminalState(foundMission || null);
  });

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome-0',
      command: '',
      output: `Добро пожаловать в эмулятор Linux терминала SysAdmin Pro!
Хост: srv-node01 | ОС: Ubuntu 24.04 LTS (Kernel 6.8.0-generic)
Введите 'help' для списка доступных команд (systemctl, df, ip, ss, curl, docker, journalctl).`,
      isRoot: false,
      dir: '/home/sysadmin',
    },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialMissionId) {
      setSelectedMissionId(initialMissionId);
      const mission = TROUBLESHOOTING_MISSIONS.find((m) => m.id === initialMissionId) || null;
      setTerminalState(createInitialTerminalState(mission));
      setHistory([
        {
          id: `mission-start-${Date.now()}`,
          command: '',
          output: mission
            ? `🚨 ИНЦИДЕНТ АКТИВИРОВАН: ${mission.title}\nЦель: ${mission.goalDescription}\nВведите 'help' для просмотра команд.`
            : 'Запущен режим свободной песочницы (Sandbox).',
          isRoot: false,
          dir: '/home/sysadmin',
        },
      ]);
    }
  }, [initialMissionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSelectMission = (missionId: string) => {
    setSelectedMissionId(missionId);
    const mission = TROUBLESHOOTING_MISSIONS.find((m) => m.id === missionId) || null;
    const newState = createInitialTerminalState(mission);
    setTerminalState(newState);
    setHistory([
      {
        id: `switch-${Date.now()}`,
        command: '',
        output: mission
          ? `🚨 ИНЦИДЕНТ ЗАГРУЖЕН: ${mission.title}\n${mission.description}\nСимптомы:\n${mission.symptoms.map((s) => `  - ${s}`).join('\n')}\nПодсказка: ${mission.hint}`
          : 'Переключено в режим свободной песочницы (Sandbox).',
        isRoot: false,
        dir: '/home/sysadmin',
      },
    ]);
  };

  const handleReset = () => {
    const mission = TROUBLESHOOTING_MISSIONS.find((m) => m.id === selectedMissionId) || null;
    setTerminalState(createInitialTerminalState(mission));
    setHistory([
      {
        id: `reset-${Date.now()}`,
        command: '',
        output: 'Терминал и виртуальные службы сброшены в исходное состояние.',
        isRoot: false,
        dir: '/home/sysadmin',
      },
    ]);
  };

  const handleRunCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const result = executeCommand(trimmed, terminalState);
    setTerminalState(result.nextState);

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        output: result.output,
        isRoot: terminalState.isRoot,
        dir: terminalState.currentDir,
      },
    ]);
    setInputVal('');
    setCmdIndex(-1);

    if (result.missionJustSolved) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (terminalState.activeMission && onMissionCompleted) {
        onMissionCompleted(terminalState.activeMission.id);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRunCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const hist = terminalState.commandHistory;
      if (hist.length === 0) return;
      const nextIdx = cmdIndex === -1 ? hist.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIdx);
      setInputVal(hist[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const hist = terminalState.commandHistory;
      if (cmdIndex === -1) return;
      const nextIdx = cmdIndex + 1;
      if (nextIdx >= hist.length) {
        setCmdIndex(-1);
        setInputVal('');
      } else {
        setCmdIndex(nextIdx);
        setInputVal(hist[nextIdx] || '');
      }
    }
  };

  const quickCommands = [
    'systemctl status',
    'journalctl -u nginx',
    'df -h',
    'ss -tulpn',
    'ip addr',
    'curl -I http://localhost',
    'docker ps',
    'iptables -L',
  ];

  const currentMission = terminalState.activeMission;

  return (
    <div className="space-y-6">
      {/* Simulator Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">
              ИНТЕРАКТИВНЫЙ СИМУЛЯТОР СИСТЕМНОГО АДМИНИСТРАТОРА
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                terminalState.missionSolved
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : currentMission
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {terminalState.missionSolved
                ? 'ИНЦИДЕНТ УСТРАНЕН'
                : currentMission
                ? 'АКТИВНЫЙ ИНЦИДЕНТ'
                : 'ПЕСОЧНИЦА'}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {currentMission ? currentMission.title : 'Свободный терминал srv-node01'}
          </h3>
        </div>

        {/* Mission Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedMissionId}
            onChange={(e) => handleSelectMission(e.target.value)}
            className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="sandbox">Свободный режим (Песочница)</option>
            {TROUBLESHOOTING_MISSIONS.map((m) => (
              <option key={m.id} value={m.id}>
                Миссия: {m.title.slice(0, 32)}...
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Сбросить состояние терминала"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mission Objective Card if Active */}
      {currentMission && (
        <div
          className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            terminalState.missionSolved
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              {terminalState.missionSolved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Задача успешно выполнена!</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Цель устранения аварии:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentMission.goalDescription}
            </p>
          </div>

          <div className="shrink-0 text-xs font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-slate-400">
            <strong>Подсказка:</strong> {currentMission.hint}
          </div>
        </div>
      )}

      {/* Quick Command Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider mr-1">
          Быстрые команды:
        </span>
        {quickCommands.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleRunCommand(q)}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 rounded-md border border-slate-800 text-xs font-mono transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
        <button
          onClick={() => handleRunCommand('clear')}
          className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-400 rounded-md text-xs font-mono cursor-pointer"
        >
          clear
        </button>
      </div>

      {/* Terminal Window */}
      <div
        className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden font-mono"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Window Chrome Titlebar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs text-slate-400 font-semibold">
              sysadmin@srv-node01: {terminalState.currentDir}
            </span>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Bash v5.2</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 text-xs sm:text-sm space-y-3 min-h-[420px] max-h-[580px] overflow-y-auto">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">sysadmin@srv-node01</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-cyan-400">{item.dir}</span>
                  <span className="text-slate-500">{item.isRoot ? '#' : '$'}</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              {item.output && (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {item.output}
                </pre>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold select-none">sysadmin@srv-node01</span>
            <span className="text-slate-500 select-none">:</span>
            <span className="text-cyan-400 select-none">{terminalState.currentDir}</span>
            <span className="text-slate-500 select-none">
              {terminalState.isRoot ? '#' : '$'}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-xs sm:text-sm caret-emerald-400"
              placeholder="Введите команду (например: ss -tulpn или systemctl status)..."
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};
