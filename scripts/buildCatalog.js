const fs = require('fs');
const path = require('path');

// Read sheet001
const sheet001Buf = fs.readFileSync('public/assets/aistudio/sheet001_cb294fc2.htm');
const dec = new TextDecoder('windows-1251');
const sheet001Html = dec.decode(sheet001Buf);

// Read existing curated tech catalog to keep curated test labs
let existingCurated = {};
try {
  const existingContent = fs.readFileSync('src/data/techCatalogData.ts', 'utf-8');
  const nameMatches = [...existingContent.matchAll(/name:\s*['"]([^'"]+)['"][\s\S]*?testLab:\s*['"]([^'"]+)['"][\s\S]*?quickCommandOrInstall:\s*['"]([^'"]+)['"]/g)];
  for (const m of nameMatches) {
    const cleanName = m[1].toLowerCase().trim();
    existingCurated[cleanName] = {
      testLab: m[2],
      quickCommandOrInstall: m[3]
    };
  }
} catch (e) {
  console.warn('Could not read existing curated data:', e);
}

const rows = sheet001Html.split('<tr').slice(2);
const items = [];

function cleanText(str) {
  return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
}

function parseOS(osRaw) {
  const os = [];
  const text = osRaw.toLowerCase();
  if (text.includes('linux') || text.includes('кроссплатформенн') || text.includes('облачный')) os.push('Linux');
  if (text.includes('windows') || text.includes('кроссплатформенн') || text.includes('облачный')) os.push('Windows');
  if (text.includes('macos') || text.includes('кроссплатформенн') || text.includes('облачный')) os.push('macOS');
  if (text.includes('freebsd') || text.includes('кроссплатформенн')) os.push('FreeBSD');
  if (os.length === 0) os.push('Linux');
  return os;
}

function parseRoles(spec, cat, name, type) {
  const roles = new Set();
  const lowerSpec = spec.toLowerCase();
  const lowerCat = cat.toLowerCase();
  const lowerName = name.toLowerCase();

  roles.add('Системный администратор');

  if (lowerSpec.includes('сети') || lowerCat.includes('сети') || lowerCat.includes('маршрутиза') || lowerName.includes('cisco') || lowerName.includes('mikrotik') || lowerName.includes('wireshark')) {
    roles.add('Сетевой инженер');
  }

  if (lowerSpec.includes('devops') || lowerSpec.includes('веб') || lowerCat.includes('контейнер') || lowerCat.includes('iac') || lowerCat.includes('ci/cd') || lowerCat.includes('субд') || lowerCat.includes('скрипт') || lowerCat.includes('облачн')) {
    roles.add('DevOps / Программист');
  }

  if (lowerCat.includes('тестирован') || lowerCat.includes('api') || lowerName.includes('jmeter') || lowerName.includes('postman') || lowerName.includes('playwright') || lowerName.includes('fiddler') || lowerName.includes('charles')) {
    roles.add('Тестировщик / QA');
    roles.add('DevOps / Программист');
  }

  return Array.from(roles);
}

function determineLevel(name, priority, cat) {
  if (priority.includes('Высокий')) {
    if (name.includes('Kubernetes') || name.includes('BGP') || name.includes('Terraform') || name.includes('Ceph') || name.includes('Kafka') || name.includes('OpenStack')) {
      return 'Senior';
    }
    return 'Junior';
  }
  if (priority.includes('Средний')) return 'Middle';
  return 'Middle';
}

function determineImportance(priority) {
  if (priority.includes('Высокий')) return 'Критически важно';
  if (priority.includes('Средний')) return 'Высокая';
  return 'Средняя';
}

function generateDefaultLab(name, type, cat) {
  return `Развернуть и протестировать ${name} в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.`;
}

function generateDefaultCommand(name, type, osList) {
  const slug = name.toLowerCase().split(/[\s/]/)[0];
  if (osList.includes('Linux')) {
    return `sudo apt install -y ${slug} || docker run -d ${slug}`;
  }
  if (osList.includes('Windows')) {
    return `winget install ${slug} || choco install ${slug}`;
  }
  return `brew install ${slug}`;
}

for (const row of rows) {
  if (!row.includes('<td')) continue;
  const cells = [];
  const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let m;
  while ((m = tdRegex.exec(row)) !== null) {
    cells.push(m[1]);
  }
  if (cells.length < 9) continue;

  const num = parseInt(cleanText(cells[0]), 10);
  if (isNaN(num)) continue;

  const specialization = cleanText(cells[1]);
  const category = cleanText(cells[2]);
  const name = cleanText(cells[3]);
  let type = cleanText(cells[4]);
  if (!type) {
    if (category.includes('Операционные системы')) type = 'ОС';
    else if (category.includes('Языки') || category.includes('скрипт')) type = 'Язык';
    else if (category.includes('Пакетные менеджеры') || category.includes('Утилиты')) type = 'Утилита';
    else type = 'Программа';
  }

  const osRaw = cleanText(cells[5]);
  const priorityRaw = cells[6]
    .replace(/&#128308;/g, '🔴')
    .replace(/&#128993;/g, '🟡')
    .replace(/&#128994;/g, '🟢')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const purpose = cleanText(cells[7]);

  let docUrl = '';
  const aMatch = cells[8].match(/href="([^"]+)"/i);
  if (aMatch) {
    docUrl = aMatch[1].trim();
  } else {
    docUrl = cleanText(cells[8]);
  }

  const sources = cells[9] ? cleanText(cells[9]) : '';

  const id = `tool-${num}-${name.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;
  const supportedOS = parseOS(osRaw);
  const roles = parseRoles(specialization, category, name, type);
  const level = determineLevel(name, priorityRaw, category);
  const importance = determineImportance(priorityRaw);

  // Check if we have curated test lab
  const cleanNameLower = name.toLowerCase().trim();
  let testLab = generateDefaultLab(name, type, category);
  let quickCommandOrInstall = generateDefaultCommand(name, type, supportedOS);

  for (const [cName, cData] of Object.entries(existingCurated)) {
    if (cleanNameLower.includes(cName) || cName.includes(cleanNameLower)) {
      testLab = cData.testLab;
      quickCommandOrInstall = cData.quickCommandOrInstall;
      break;
    }
  }

  items.push({
    id,
    num,
    name,
    type,
    specialization,
    category,
    supportedOS,
    osRaw,
    roles,
    level,
    importance,
    priorityRaw,
    purpose,
    docUrl,
    sources,
    testLab,
    quickCommandOrInstall
  });
}

// Read sheet019 for summary statistics matrix
const sheet019Buf = fs.readFileSync('public/assets/aistudio/sheet019_2e1631a0.htm');
const sheet019Html = dec.decode(sheet019Buf);
const summaryRows = sheet019Html.split('<tr').slice(4); // skip header
const summaries = [];

for (const sRow of summaryRows) {
  if (!sRow.includes('<td')) continue;
  const sCells = [];
  const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  let m;
  while ((m = tdRegex.exec(sRow)) !== null) {
    sCells.push(cleanText(m[1]));
  }
  if (sCells.length >= 5 && sCells[0] !== 'Итого') {
    const category = sCells[0];
    const high = parseInt(sCells[1], 10) || 0;
    const med = parseInt(sCells[2], 10) || 0;
    const low = parseInt(sCells[3], 10) || 0;
    const total = parseInt(sCells[4], 10) || (high + med + low);
    summaries.push({
      category,
      highCount: high,
      mediumCount: med,
      lowCount: low,
      totalCount: total
    });
  }
}

console.log(`Parsed ${items.length} items and ${summaries.length} summary categories.`);

// Generate TypeScript code
const tsCode = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TechItem, SpecializationSummary, TechType } from '../types/techCatalog';

export const TECH_CATALOG_SUMMARY: SpecializationSummary[] = ${JSON.stringify(summaries, null, 2)};

export const ALL_SPECIALIZATIONS: string[] = [
  'Все специализации',
  'ОС и диагностика',
  'Сети и протоколы',
  'Веб-серверы и СУБД',
  'Виртуализация и контейнеры',
  'Автоматизация и DevOps',
  'Мониторинг и логи',
  'Почта и сервисы',
  'Безопасность и доступ',
  'Хранилища и бэкапы',
  'Удалённый доступ и прочее',
];

export const ALL_TECH_TYPES: string[] = [
  'Все типы',
  'Программа',
  'Технология',
  'Утилита',
  'ОС',
  'Платформа',
  'Язык',
  'Набор программ',
];

export const TECH_CATALOG: TechItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync('src/data/techCatalogData.ts', tsCode, 'utf-8');
console.log('Saved src/data/techCatalogData.ts with', items.length, 'tools!');
