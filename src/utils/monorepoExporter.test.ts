import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getUnifiedMonorepoFiles,
  UNIFIED_DOCKER_COMPOSE_YML,
  UNIFIED_ANSIBLE_SITE_YML,
  UNIFIED_MONOREPO_README_MD,
  MONOREPO_TOPOLOGY_ASCII,
} from './monorepoExporter';

test('getUnifiedMonorepoFiles contains all essential infrastructure files', () => {
  const files = getUnifiedMonorepoFiles();
  const fileKeys = Object.keys(files);

  const requiredFiles = [
    'README.md',
    'docker-compose.yml',
    'docker-compose.prod.yml',
    'Makefile',
    '.env.example',
    'nginx/nginx.conf',
    'nginx/conf.d/default.conf',
    'ansible/site.yml',
    'ansible/inventory/hosts.ini',
    'ansible/group_vars/all.yml',
    'monitoring/prometheus/prometheus.yml',
    'monitoring/prometheus/alerts.yml',
    'monitoring/grafana/provisioning/datasources/prometheus.yml',
    'postgres/init/01-init.sql',
    'postgres/postgresql.conf',
    'backup/backup-borg.sh',
    'backup/restore-drill.sh',
    'scripts/deploy.sh',
    'scripts/healthcheck.sh',
    'scripts/hardening.sh',
    'docs/ARCHITECTURE.md',
    'docs/RUNBOOK_INCIDENTS.md',
  ];

  for (const expected of requiredFiles) {
    assert.ok(
      fileKeys.includes(expected),
      `Missing required file in monorepo: ${expected}`
    );
    assert.ok(
      files[expected].length > 0,
      `File ${expected} should not be empty`
    );
  }
});

test('unified docker-compose.yml defines all 8 coordinated services', () => {
  const compose = UNIFIED_DOCKER_COMPOSE_YML;
  const services = [
    'reverse-proxy:',
    'app-backend:',
    'postgres-db:',
    'redis-cache:',
    'monitoring-prometheus:',
    'monitoring-grafana:',
    'node-exporter:',
    'uptime-kuma:',
  ];

  for (const service of services) {
    assert.ok(
      compose.includes(service),
      `docker-compose.yml must define ${service}`
    );
  }

  // Network isolation
  assert.ok(compose.includes('enterprise-frontend:'));
  assert.ok(compose.includes('enterprise-backend:'));
  assert.ok(compose.includes('internal: true'));
  assert.ok(compose.includes('enterprise-monitoring:'));
});

test('unified ansible site.yml contains modular roles and healthcheck', () => {
  const ansible = UNIFIED_ANSIBLE_SITE_YML;
  assert.ok(ansible.includes('01_system_hardening'));
  assert.ok(ansible.includes('02_security'));
  assert.ok(ansible.includes('03_docker'));
  assert.ok(ansible.includes('04_infrastructure_deploy'));
  assert.ok(ansible.includes('05_backup_borg'));
  assert.ok(ansible.includes('healthcheck.sh'));
});

test('unified README.md provides quickstart instructions and ASCII topology', () => {
  const readme = UNIFIED_MONOREPO_README_MD;
  assert.ok(readme.includes('docker compose up -d'));
  assert.ok(readme.includes('ansible-playbook'));
  assert.ok(readme.includes('BorgBackup'));
  assert.ok(readme.includes('Prometheus'));
  assert.ok(readme.includes('Node Exporter'));
  assert.ok(readme.includes(MONOREPO_TOPOLOGY_ASCII.trim()));
});
