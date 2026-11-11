import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { RoadmapView } from './components/RoadmapView';
import { LabTaskView } from './components/LabTaskView';
import { TerminalSimulator } from './components/TerminalSimulator';
import { TroubleshootingView } from './components/TroubleshootingView';
import { PortfolioResumeHub } from './components/PortfolioResumeHub';
import { InterviewTrainer } from './components/InterviewTrainer';
import { SysadminToolkit } from './components/SysadminToolkit';
import { TechCatalogView } from './components/TechCatalogView';
import { VpsDeploymentView } from './components/VpsDeploymentView';
import { QuizModal } from './components/QuizModal';
import { RoadmapStep } from './types/sysadmin';
import { Server, Terminal, Github, Heart, RefreshCw, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('roadmap');
  const [selectedStepId, setSelectedStepId] = useState<number>(1);
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [quizModalStep, setQuizModalStep] = useState<RoadmapStep | null>(null);

  // Load persistence from localStorage
  const [completedStepIds, setCompletedStepIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('sysadmin_completed_steps');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sysadmin_completed_missions');
      return saved ? JSON.parse(saved) : ['mission-nginx-502'];
    } catch {
      return ['mission-nginx-502'];
    }
  });

  const [testedItemIds, setTestedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sysadmin_tested_items');
      return saved ? JSON.parse(saved) : ['nginx', 'docker', 'process-explorer', 'wireshark'];
    } catch {
      return ['nginx', 'docker', 'process-explorer', 'wireshark'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sysadmin_completed_steps', JSON.stringify(completedStepIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedStepIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sysadmin_completed_missions', JSON.stringify(completedMissionIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedMissionIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sysadmin_tested_items', JSON.stringify(testedItemIds));
    } catch (e) {
      console.error(e);
    }
  }, [testedItemIds]);

  const toggleStep = (stepId: number) => {
    setCompletedStepIds((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const toggleTestedItem = (id: string) => {
    setTestedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectLab = (stepId: number) => {
    setSelectedStepId(stepId);
    setActiveTab('labs');
  };

  const handleLaunchMission = (missionId: string) => {
    setActiveMissionId(missionId);
    setActiveTab('terminal');
  };

  const handleMissionCompleted = (missionId: string) => {
    setCompletedMissionIds((prev) =>
      prev.includes(missionId) ? prev : [...prev, missionId]
    );
  };

  const handleResetProgress = () => {
    if (window.confirm('Сбросить весь сохраненный прогресс обучения, отмеченные тесты и инциденты?')) {
      setCompletedStepIds([]);
      setCompletedMissionIds([]);
      setTestedItemIds([]);
      localStorage.removeItem('sysadmin_completed_steps');
      localStorage.removeItem('sysadmin_completed_missions');
      localStorage.removeItem('sysadmin_tested_items');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedStepIds={completedStepIds}
        completedMissionIds={completedMissionIds}
        testedItemCount={testedItemIds.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'roadmap' && (
          <RoadmapView
            completedStepIds={completedStepIds}
            onToggleStep={toggleStep}
            onSelectLab={handleSelectLab}
            onOpenQuiz={(step) => setQuizModalStep(step)}
          />
        )}

        {activeTab === 'catalog' && (
          <TechCatalogView
            testedItemIds={testedItemIds}
            onToggleTested={toggleTestedItem}
          />
        )}

        {activeTab === 'labs' && (
          <LabTaskView
            selectedStepId={selectedStepId}
            onSelectStep={setSelectedStepId}
            completedStepIds={completedStepIds}
            onToggleStep={toggleStep}
            onOpenTerminalWithMission={handleLaunchMission}
          />
        )}

        {activeTab === 'terminal' && (
          <TerminalSimulator
            initialMissionId={activeMissionId}
            onMissionCompleted={handleMissionCompleted}
          />
        )}

        {activeTab === 'troubleshooting' && (
          <TroubleshootingView
            completedMissionIds={completedMissionIds}
            onLaunchMission={handleLaunchMission}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioResumeHub
            completedStepIds={completedStepIds}
            completedMissionIds={completedMissionIds}
          />
        )}

        {activeTab === 'interview' && <InterviewTrainer />}

        {activeTab === 'toolkit' && <SysadminToolkit />}

        {activeTab === 'vps' && <VpsDeploymentView />}
      </main>

      {/* Quiz Modal */}
      {quizModalStep && (
        <QuizModal
          step={quizModalStep}
          onClose={() => setQuizModalStep(null)}
          onPassQuiz={(stepId) => {
            if (!completedStepIds.includes(stepId)) {
              setCompletedStepIds((prev) => [...prev, stepId]);
            }
          }}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-300">SysAdmin Pro Career Lab</span>
            <span>— Полный план обучения и генератор портфолио для трудоустройства</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetProgress}
              className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
              title="Сбросить локальные данные прогресса"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Сбросить прогресс</span>
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Стандарты: Linux FHS, CIS Benchmarks, OWASP, AGDLP
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
