/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { generateTechCatalogTsv, exportTechCatalogToCsv } from './excelExporter';
import { TECH_CATALOG, TECH_CATALOG_SUMMARY } from '../data/techCatalogData';

test('tech catalog has all 417 items from Full_IT_Base', () => {
  assert.equal(TECH_CATALOG.length, 417, `Expected 417 items, got ${TECH_CATALOG.length}`);

  // Check required examples from prompt: Nginx, Apache, PostgreSQL, MySQL, VictoriaHDD, Process Explorer, Prometheus, Grafana, Docker, Ansible, Terraform, Zabbix, Git
  const names = TECH_CATALOG.map((t) => t.name.toLowerCase());
  assert.ok(names.some((n) => n.includes('nginx')), 'Nginx missing');
  assert.ok(names.some((n) => n.includes('apache')), 'Apache missing');
  assert.ok(names.some((n) => n.includes('postgresql')), 'PostgreSQL missing');
  assert.ok(names.some((n) => n.includes('mysql')), 'MySQL missing');
  assert.ok(names.some((n) => n.includes('victoria')), 'Victoria HDD missing');
  assert.ok(names.some((n) => n.includes('process explorer')), 'Process Explorer missing');
  assert.ok(names.some((n) => n.includes('prometheus')), 'Prometheus missing');
  assert.ok(names.some((n) => n.includes('grafana')), 'Grafana missing');
  assert.ok(names.some((n) => n.includes('docker')), 'Docker missing');
  assert.ok(names.some((n) => n.includes('ansible')), 'Ansible missing');
  assert.ok(names.some((n) => n.includes('terraform')), 'Terraform missing');
  assert.ok(names.some((n) => n.includes('zabbix')), 'Zabbix missing');
  assert.ok(names.some((n) => n.includes('git')), 'Git missing');

  // Verify all have docUrl and specialization
  assert.ok(TECH_CATALOG.every((t) => t.docUrl && t.docUrl.startsWith('http')), 'All items should have valid docUrl');
  assert.ok(TECH_CATALOG.every((t) => t.specialization), 'All items should have specialization');
});

test('generateTechCatalogTsv produces tab-separated headers and data rows', () => {
  const sample = TECH_CATALOG.slice(0, 5);
  const tsv = generateTechCatalogTsv(sample);
  assert.ok(tsv.includes('Специализация\tКатегория\tНазвание\tТип'));
  const lines = tsv.trim().split('\n');
  assert.equal(lines.length, 6); // 1 header + 5 rows
});

test('exportTechCatalogToCsv includes UTF-8 BOM and correct headers', () => {
  const csv = exportTechCatalogToCsv(TECH_CATALOG.slice(0, 3));
  assert.ok(csv.startsWith('\uFEFF№;Специализация'));
  assert.ok(csv.includes('Alpine Linux'));
});

test('summary statistics contains 26 categories matching sheet019', () => {
  assert.equal(TECH_CATALOG_SUMMARY.length, 26, 'Expected 26 summary categories');
  const total = TECH_CATALOG_SUMMARY.reduce((sum, s) => sum + s.totalCount, 0);
  assert.equal(total, 411, 'Sum of categories in sheet019 is 411');
});
