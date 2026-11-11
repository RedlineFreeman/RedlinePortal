/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as XLSX from 'xlsx';
import { TechItem } from '../types/techCatalog';
import { TECH_CATALOG_SUMMARY } from '../data/techCatalogData';

/**
 * Generates and downloads a native Excel (.xlsx) file with multi-sheet structure,
 * explicit OS columns (Windows, Linux, macOS, FreeBSD), documentation URLs,
 * and summary statistics.
 */
export function exportTechCatalogToExcel(
  items: TechItem[],
  filename = 'Full_IT_Base_Technologies_and_Programs.xlsx'
): void {
  // Sheet 1: Main exhaustive catalog table
  const mainData = items.map((item, idx) => ({
    '№': item.num || idx + 1,
    'Специализация': item.specialization || '',
    'Категория': item.category,
    'Название': item.name,
    'Тип': item.type,
    'ОС': item.osRaw || item.supportedOS.join(', '),
    'Windows': item.supportedOS.includes('Windows') ? 'Да' : 'Нет',
    'Linux': item.supportedOS.includes('Linux') ? 'Да' : 'Нет',
    'macOS': item.supportedOS.includes('macOS') ? 'Да' : 'Нет',
    'FreeBSD': item.supportedOS.includes('FreeBSD') ? 'Да' : 'Нет',
    'Приоритет': item.priorityRaw || item.importance,
    'Назначение': item.purpose,
    'Документация / Ссылка': item.docUrl || '',
    'Источники': item.sources || '',
    'Тестовое задание для лаборатории': item.testLab || '',
    'Команда / Установка': item.quickCommandOrInstall || '',
  }));

  const workbook = XLSX.utils.book_new();
  const mainWorksheet = XLSX.utils.json_to_sheet(mainData);

  // Set explicit column widths for readability in Excel
  mainWorksheet['!cols'] = [
    { wch: 6 },   // №
    { wch: 22 },  // Специализация
    { wch: 30 },  // Категория
    { wch: 24 },  // Название
    { wch: 14 },  // Тип
    { wch: 28 },  // ОС
    { wch: 10 },  // Windows
    { wch: 8 },   // Linux
    { wch: 8 },   // macOS
    { wch: 10 },  // FreeBSD
    { wch: 14 },  // Приоритет
    { wch: 55 },  // Назначение
    { wch: 42 },  // Документация / Ссылка
    { wch: 28 },  // Источники
    { wch: 60 },  // Тестовое задание
    { wch: 40 },  // Установка
  ];

  XLSX.utils.book_append_sheet(workbook, mainWorksheet, 'Полный список');

  // Sheet 2: "Программы vs Технологии" (Side-by-side comparison sheet)
  const programsList = items.filter((i) => i.type === 'Программа' || i.type === 'Утилита' || i.type === 'ОС');
  const techList = items.filter((i) => i.type === 'Технология' || i.type === 'Платформа' || i.type === 'Язык');
  const maxLen = Math.max(programsList.length, techList.length);

  const sideBySideData = [];
  for (let i = 0; i < maxLen; i++) {
    const prog = programsList[i];
    const tech = techList[i];
    sideBySideData.push({
      '№ (Программы)': prog ? i + 1 : '',
      'Столбик: ПРОГРАММЫ': prog ? prog.name : '',
      'Специализация (П)': prog ? prog.specialization : '',
      'Категория (П)': prog ? prog.category : '',
      'ОС (П)': prog ? prog.osRaw : '',
      'Ссылка (П)': prog ? prog.docUrl : '',
      '|': '|',
      '№ (Технологии)': tech ? i + 1 : '',
      'Столбик: ТЕХНОЛОГИИ': tech ? tech.name : '',
      'Специализация (Т)': tech ? tech.specialization : '',
      'Категория (Т)': tech ? tech.category : '',
      'ОС (Т)': tech ? tech.osRaw : '',
      'Ссылка (Т)': tech ? tech.docUrl : '',
    });
  }

  const sideBySideWorksheet = XLSX.utils.json_to_sheet(sideBySideData);
  sideBySideWorksheet['!cols'] = [
    { wch: 6 },
    { wch: 22 },
    { wch: 20 },
    { wch: 24 },
    { wch: 20 },
    { wch: 30 },
    { wch: 4 },
    { wch: 6 },
    { wch: 22 },
    { wch: 20 },
    { wch: 24 },
    { wch: 20 },
    { wch: 30 },
  ];
  XLSX.utils.book_append_sheet(workbook, sideBySideWorksheet, 'Программы vs Технологии');

  // Sheet 3: Сводка по категориям и приоритетам
  const summaryData = TECH_CATALOG_SUMMARY.map((s, idx) => ({
    '№': idx + 1,
    'Категория': s.category,
    '🔴 Высокий': s.highCount,
    '🟡 Средний': s.mediumCount,
    '🟢 Базовый/Низкий': s.lowCount,
    'Всего инструментов': s.totalCount,
  }));
  const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
  summaryWorksheet['!cols'] = [
    { wch: 6 },
    { wch: 35 },
    { wch: 14 },
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
  ];
  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Сводка и Аналитика');

  // Trigger browser download
  XLSX.writeFile(workbook, filename);
}

/**
 * Exports catalog to RFC-4180 compliant CSV string with UTF-8 BOM.
 */
export function exportTechCatalogToCsv(items?: TechItem[]): string {
  const dataset = items && items.length > 0 ? items : [];
  const headers = [
    '№',
    'Специализация',
    'Категория',
    'Название',
    'Тип',
    'ОС',
    'Windows',
    'Linux',
    'macOS',
    'FreeBSD',
    'Приоритет',
    'Назначение',
    'Документация',
    'Источники',
  ];

  const escapeCsv = (val: string | number | undefined) => {
    if (val === undefined || val === null) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = dataset.map((item, idx) => [
    escapeCsv(item.num || idx + 1),
    escapeCsv(item.specialization),
    escapeCsv(item.category),
    escapeCsv(item.name),
    escapeCsv(item.type),
    escapeCsv(item.osRaw),
    escapeCsv(item.supportedOS.includes('Windows') ? 'Да' : 'Нет'),
    escapeCsv(item.supportedOS.includes('Linux') ? 'Да' : 'Нет'),
    escapeCsv(item.supportedOS.includes('macOS') ? 'Да' : 'Нет'),
    escapeCsv(item.supportedOS.includes('FreeBSD') ? 'Да' : 'Нет'),
    escapeCsv(item.priorityRaw || item.importance),
    escapeCsv(item.purpose),
    escapeCsv(item.docUrl),
    escapeCsv(item.sources),
  ]);

  // Prepend UTF-8 BOM (\uFEFF)
  return '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
}

/**
 * Generates TSV text for direct copy-pasting into spreadsheets.
 */
export function generateTechCatalogTsv(items: TechItem[]): string {
  const headers = [
    '№',
    'Специализация',
    'Категория',
    'Название',
    'Тип',
    'ОС',
    'Приоритет',
    'Назначение',
    'Документация',
  ];

  const rows = items.map((item, idx) => [
    item.num || idx + 1,
    item.specialization,
    item.category,
    item.name,
    item.type,
    item.osRaw,
    item.priorityRaw,
    item.purpose.replace(/\t|\r|\n/g, ' '),
    item.docUrl,
  ]);

  return [headers.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
}
