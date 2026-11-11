/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TechType =
  | 'Программа'
  | 'Технология'
  | 'Утилита'
  | 'Платформа'
  | 'ОС'
  | 'Язык'
  | 'Набор программ';

export type SupportedOS = 'Windows' | 'Linux' | 'macOS' | 'FreeBSD';

export type JobRole =
  | 'Системный администратор'
  | 'Сетевой инженер'
  | 'DevOps / Программист'
  | 'Тестировщик / QA';

export interface TechItem {
  id: string;
  num: number;
  name: string;
  type: TechType;
  specialization: string;
  category: string;
  supportedOS: SupportedOS[];
  osRaw: string;
  roles: JobRole[];
  level: 'Junior' | 'Middle' | 'Senior';
  importance: 'Критически важно' | 'Высокая' | 'Средняя' | 'Специализированная';
  priorityRaw: string;
  purpose: string;
  docUrl: string;
  sources: string;
  testLab: string;
  quickCommandOrInstall: string;
}

export interface SpecializationSummary {
  specialization: string;
  category: string;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  totalCount: number;
}
