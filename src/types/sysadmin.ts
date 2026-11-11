export type StepLevel = 'Junior Base' | 'Junior' | 'Junior+' | 'Middle Ready';

export interface CommandCheat {
  cmd: string;
  desc: string;
  example?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InterviewQnA {
  id: string;
  category:
    | 'Сети'
    | 'Linux'
    | 'Windows/AD'
    | 'Виртуализация'
    | 'Безопасность'
    | 'Траблшутинг'
    | 'Архитектура'
    | 'Web/Nginx'
    | 'Мониторинг';
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  practicalTip: string;
}

export interface PortfolioArtifact {
  title: string;
  repoName: string;
  summary: string;
  technologies: string[];
  fileTree: string[];
  readmeMarkdown: string;
  keyConfigSnippets: {
    fileName: string;
    language: string;
    code: string;
    description: string;
  }[];
}

export interface PracticalLab {
  id: string;
  title: string;
  scenario: string;
  environment: string; // e.g. "Ubuntu 24.04 LTS в VirtualBox / Proxmox"
  estimatedTime: string; // e.g. "4-6 часов"
  prerequisites: string[];
  steps: {
    title: string;
    instructions: string;
    commands?: string[];
    verification: string;
    proTip?: string;
  }[];
  definitionOfDone: string[];
  troubleshootingTips: string[];
  portfolioArtifact: PortfolioArtifact;
}

export interface RoadmapStep {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  level: StepLevel;
  durationWeeks: string;
  estimatedHours: number;
  iconName: string;
  keySkills: string[];
  theorySummary: string;
  coreConcepts: {
    name: string;
    description: string;
    realWorldUse: string;
  }[];
  cheatSheets: {
    category: string;
    commands: CommandCheat[];
  }[];
  lab: PracticalLab;
  quiz: QuizQuestion[];
  interviewQuestions: InterviewQnA[];
}

export interface TroubleshootingMission {
  id: string;
  title: string;
  severity: 'Критический' | 'Высокий' | 'Средний';
  category: 'Web/Nginx' | 'Storage/Logs' | 'Firewall/SSH' | 'Containers' | 'DNS';
  description: string;
  symptoms: string[];
  initialState: {
    files: Record<string, string>;
    services: Record<string, { status: 'running' | 'failed' | 'stopped'; logs: string[] }>;
    ports: number[];
  };
  goalDescription: string;
  hint: string;
  solutionExplanation: string;
}

export interface SubnetResult {
  ip: string;
  cidr: number;
  netmask: string;
  wildcard: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalUsableHosts: number;
  ipClass: string;
  isPrivate: boolean;
}

export interface RaidResult {
  raidType: 'RAID 0' | 'RAID 1' | 'RAID 5' | 'RAID 6' | 'RAID 10';
  diskCount: number;
  diskSizeGb: number;
  rawCapacityGb: number;
  usableCapacityGb: number;
  efficiencyPercent: number;
  faultToleranceDisks: number;
  readSpeedMultiplier: string;
  writeSpeedMultiplier: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export interface ResumeData {
  fullName: string;
  role: string;
  city: string;
  email: string;
  phone: string;
  telegram: string;
  githubUrl: string;
  aboutMe: string;
  desiredSalary: string;
  completedStepIds: number[];
  completedMissions: string[];
}
