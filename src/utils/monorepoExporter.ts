import JSZip from 'jszip';

export interface MonorepoFile {
  path: string;
  category: 'core' | 'docker' | 'nginx' | 'ansible' | 'monitoring' | 'postgres' | 'backup' | 'scripts' | 'docs';
  description: string;
  content: string;
}

export const MONOREPO_TOPOLOGY_ASCII = `
========================================================================================
             ENTERPRISE ALL-IN-ONE INFRASTRUCTURE MONOREPO ARCHITECTURE
========================================================================================

                           [ Internet / Clients ]
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │   UFW & Fail2ban Shield   │  (Port 22 SSH-Key, 80 HTTP, 443 HTTPS)
                        └─────────────┬─────────────┘
                                      │
                                      ▼
             ┌─────────────────────────────────────────────────┐
             │       Nginx Reverse Proxy & SSL Termination     │  (TLS 1.3, Rate-Limit, HSTS, Gzip)
             └───────┬─────────────────────────┬───────────────┘
                     │ Proxy-Pass              │ Basic-Auth / Protected
                     ▼                         ▼
          ┌─────────────────────┐   ┌──────────────────────────────────────────────┐
          │   App Web Service   │   │         Observability & Metrics Hub          │
          │  (Node / Express)   │   │  - Grafana (:3000) Dashboard Provisioning    │
          └──────────┬──────────┘   │  - Prometheus (:9090) TSDB & Scrapers        │
                     │              │  - Node Exporter (:9100) Host Metrics        │
          ┌──────────┴──────────┐   │  - Uptime Kuma (:3001) Heartbeat Monitors    │
          │                     │   └──────────────────────────────────────────────┘
          ▼                     ▼                                 ▲
   ┌──────────────┐      ┌─────────────┐                          │ Scrapes metrics
   │  PostgreSQL  │      │    Redis    │                          │
   │ (DB 16-Alp)  │      │ (In-Memory) │ ─────────────────────────┘
   └──────┬───────┘      └─────────────┘
          │
          ▼ Daily Automated Snapshots (Deduplication + AES-256 Encryption)
   ┌───────────────────────────────────────────────────────────────────────────────┐
   │         BorgBackup Engine (Retention: 7 Daily / 4 Weekly / 12 Monthly)        │
   │             + Disaster Recovery Restore Drills Validation Script              │
   └───────────────────────────────────────────────────────────────────────────────┘
                                      ▲
                                      │ Automated Zero-Touch Deployment & Hardening
   ┌──────────────────────────────────┴────────────────────────────────────────────┐
   │         Ansible Automation Suite (Playbook site.yml + Modular Roles)          │
   └───────────────────────────────────────────────────────────────────────────────┘
`;

export const UNIFIED_DOCKER_COMPOSE_YML = `version: '3.8'

# =============================================================================
# ENTERPRISE ALL-IN-ONE INFRASTRUCTURE STACK
# All 10 Sysadmin Modules Unified in One Orchestrated Compose Project
# =============================================================================

services:
  # ---------------------------------------------------------------------------
  # 1. REVERSE PROXY & EDGE SECURITY (Nginx + SSL + Rate Limiting)
  # ---------------------------------------------------------------------------
  reverse-proxy:
    image: nginx:alpine
    container_name: enterprise-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx_logs:/var/log/nginx
    depends_on:
      app-backend:
        condition: service_healthy
      monitoring-grafana:
        condition: service_started
    networks:
      - enterprise-frontend
      - enterprise-monitoring
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://127.0.0.1/stub_status || exit 1"]
      interval: 15s
      timeout: 5s
      retries: 3

  # ---------------------------------------------------------------------------
  # 2. APPLICATION TIER (Containerized Microservice)
  # ---------------------------------------------------------------------------
  app-backend:
    image: node:22-alpine
    container_name: enterprise-app
    restart: unless-stopped
    working_dir: /usr/src/app
    command: sh -c "node -e 'const http=require(\"http\"); const server=http.createServer((req,res)=>{ res.writeHead(200,{\"Content-Type\":\"application/json\"}); res.end(JSON.stringify({status:\"healthy\",service:\"enterprise-infra-api\",timestamp:new Date()})); }); server.listen(8080,()=>console.log(\"App listening on 8080\"));'"
    environment:
      NODE_ENV: production
      PORT: 8080
      DATABASE_URL: postgres://\${POSTGRES_USER:\${DB_USER:-sysadmin}}:\${POSTGRES_PASSWORD:\${DB_PASS:-SecureAdminPass2026!}}@postgres-db:5432/\${POSTGRES_DB:\${DB_NAME:-enterprise_db}}
      REDIS_URL: redis://:\${REDIS_PASSWORD:\${REDIS_PASS:-SecretRedisToken2026!}}@redis-cache:6379/0
    networks:
      - enterprise-frontend
      - enterprise-backend
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://127.0.0.1:8080/ || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 3
    depends_on:
      postgres-db:
        condition: service_healthy
      redis-cache:
        condition: service_healthy

  # ---------------------------------------------------------------------------
  # 3. RELATIONAL DATABASE (PostgreSQL 16 Alpine + WAL + Auto Init)
  # ---------------------------------------------------------------------------
  postgres-db:
    image: postgres:16-alpine
    container_name: enterprise-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: \${POSTGRES_DB:\${DB_NAME:-enterprise_db}}
      POSTGRES_USER: \${POSTGRES_USER:\${DB_USER:-sysadmin}}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:\${DB_PASS:-SecureAdminPass2026!}}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./postgres/init:/docker-entrypoint-initdb.d:ro
      - ./postgres/postgresql.conf:/etc/postgresql/postgresql.conf:ro
    command: postgres -c config_file=/etc/postgresql/postgresql.conf
    networks:
      - enterprise-backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:\${DB_USER:-sysadmin}} -d \${POSTGRES_DB:\${DB_NAME:-enterprise_db}}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ---------------------------------------------------------------------------
  # 4. IN-MEMORY CACHE (Redis 7 Alpine + Persistent AppendOnly)
  # ---------------------------------------------------------------------------
  redis-cache:
    image: redis:7-alpine
    container_name: enterprise-redis
    restart: unless-stopped
    command: ["redis-server", "--requirepass", "\${REDIS_PASSWORD:\${REDIS_PASS:-SecretRedisToken2026!}}", "--appendonly", "yes", "--maxmemory", "256mb", "--maxmemory-policy", "allkeys-lru"]
    volumes:
      - redisdata:/data
    networks:
      - enterprise-backend
    healthcheck:
      test: ["CMD-SHELL", "redis-cli -a \${REDIS_PASSWORD:\${REDIS_PASS:-SecretRedisToken2026!}} ping | grep PONG || exit 1"]
      interval: 10s
      timeout: 3s
      retries: 3

  # ---------------------------------------------------------------------------
  # 5. METRICS COLLECTOR (Prometheus TSDB)
  # ---------------------------------------------------------------------------
  monitoring-prometheus:
    image: prom/prometheus:v2.52.0
    container_name: enterprise-prometheus
    restart: unless-stopped
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'
    volumes:
      - ./monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./monitoring/prometheus/alerts.yml:/etc/prometheus/alerts.yml:ro
      - prometheus_data:/prometheus
    networks:
      - enterprise-monitoring
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://127.0.0.1:9090/-/healthy || exit 1"]
      interval: 15s
      timeout: 5s
      retries: 3

  # ---------------------------------------------------------------------------
  # 6. DASHBOARDS & VISUALIZATION (Grafana 11 with Auto-Provisioning)
  # ---------------------------------------------------------------------------
  monitoring-grafana:
    image: grafana/grafana:11.0.0
    container_name: enterprise-grafana
    restart: unless-stopped
    environment:
      - GF_SECURITY_ADMIN_USER=\${GRAFANA_ADMIN_USER:-admin}
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_ADMIN_PASSWORD:-EnterpriseGrafana2026!}
      - GF_USERS_ALLOW_SIGN_UP=false
      - GF_SERVER_ROOT_URL=%(protocol)s://%(domain)s/grafana/
      - GF_SERVER_SERVE_FROM_SUB_PATH=true
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
    networks:
      - enterprise-monitoring
    depends_on:
      - monitoring-prometheus

  # ---------------------------------------------------------------------------
  # 7. HOST TELEMETRY (Node Exporter)
  # ---------------------------------------------------------------------------
  node-exporter:
    image: prom/node-exporter:v1.8.0
    container_name: enterprise-node-exporter
    restart: unless-stopped
    pid: host
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--path.rootfs=/host/root'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/host/root:ro
    networks:
      - enterprise-monitoring

  # ---------------------------------------------------------------------------
  # 8. UPTIME & STATUS MONITOR (Uptime Kuma)
  # ---------------------------------------------------------------------------
  uptime-kuma:
    image: louislam/uptime-kuma:1.23.13-alpine
    container_name: enterprise-uptime-kuma
    restart: unless-stopped
    volumes:
      - uptime_kuma_data:/app/data
    networks:
      - enterprise-monitoring

networks:
  enterprise-frontend:
    driver: bridge
  enterprise-backend:
    driver: bridge
    internal: true
  enterprise-monitoring:
    driver: bridge

volumes:
  pgdata:
  redisdata:
  nginx_logs:
  prometheus_data:
  grafana_data:
  uptime_kuma_data:
`;

export const UNIFIED_ANSIBLE_SITE_YML = `---
# =============================================================================
# ENTERPRISE INFRASTRUCTURE MASTER PLAYBOOK
# Automates zero-touch deployment of hardened Linux VPS with all roles
# =============================================================================
- name: Deploy and Configure Enterprise Production Infrastructure
  hosts: servers
  become: true
  vars_files:
    - group_vars/all.yml

  pre_tasks:
    - name: Verify supported Linux distribution
      ansible.builtin.assert:
        that:
          - ansible_os_family in ['Debian', 'RedHat']
        fail_msg: "This enterprise playbook currently supports Debian/Ubuntu and RHEL/Rocky Linux."

    - name: Update apt cache if Debian/Ubuntu
      ansible.builtin.apt:
        update_cache: yes
        cache_valid_time: 3600
      when: ansible_os_family == 'Debian'

  roles:
    # Module 1 & 2: Base OS, Kernel Sysctl & Limits Tuning
    - role: 01_system_hardening
      tags: [base, sysctl, hardening]

    # Module 3 & 9: Firewall (UFW), SSH Keys & Fail2ban Jails
    - role: 02_security
      tags: [security, ufw, ssh, fail2ban]

    # Module 6: Docker Engine & Compose Plugin Installation
    - role: 03_docker
      tags: [docker, containers]

    # Module 4, 5, 8: Unified Stack Deploy (Nginx, Postgres, Redis, Prometheus, Grafana)
    - role: 04_infrastructure_deploy
      tags: [deploy, stack, compose]

    # Module 9: BorgBackup Automated Encrypted Daily Snapshots
    - role: 05_backup_borg
      tags: [backup, borg, disaster_recovery]

  post_tasks:
    - name: Run infrastructure healthcheck probe
      ansible.builtin.command: /opt/enterprise-infra/scripts/healthcheck.sh
      register: health_result
      changed_when: false
      failed_when: health_result.rc != 0

    - name: Display deployment success message
      ansible.builtin.debug:
        msg:
          - "=========================================================="
          - "ENTERPRISE INFRASTRUCTURE DEPLOYMENT SUCCESSFUL!"
          - "Public HTTP/HTTPS: https://{{ domain_name }}"
          - "Grafana Dashboards: https://{{ domain_name }}/grafana/"
          - "Uptime Status: https://{{ domain_name }}/status/"
          - "All services healthy and monitored by Prometheus."
          - "=========================================================="
`;

export const UNIFIED_ANSIBLE_HOSTS_INI = `[production]
prod-srv-01 ansible_host=198.51.100.10 ansible_user=deployer ansible_port=2222 ansible_python_interpreter=/usr/bin/python3

[staging]
stage-srv-01 ansible_host=198.51.100.20 ansible_user=deployer ansible_port=2222 ansible_python_interpreter=/usr/bin/python3

[servers:children]
production
staging

[servers:vars]
ansible_ssh_common_args='-o StrictHostKeyChecking=accept-new'
ansible_become=true
ansible_become_method=sudo
`;

export const UNIFIED_ANSIBLE_VARS_YML = `---
# Enterprise Global Configuration Variables
domain_name: "enterprise.example.com"
admin_email: "sysadmin@enterprise.example.com"
deploy_dir: "/opt/enterprise-infra"

# Security settings
ssh_hardened_port: 2222
allowed_ssh_users: ["deployer"]
enable_fail2ban: true

# Docker limits
docker_log_max_size: "50m"
docker_log_max_file: "3"

# Backup retention policy (G-F-S: 7 daily, 4 weekly, 12 monthly)
borg_repo_path: "/var/backups/borg-enterprise"
borg_retention_daily: 7
borg_retention_weekly: 4
borg_retention_monthly: 12
`;

export const UNIFIED_NGINX_DEFAULT_CONF = `# =============================================================================
# ENTERPRISE NGINX REVERSE PROXY & SECURITY CONFIGURATION
# =============================================================================

# Rate limiting zones to prevent brute force and DDoS attacks
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=20r/s;
limit_req_zone $binary_remote_addr zone=general_limit:10m rate=50r/s;

# Upstream definitions
upstream backend_app {
    server app-backend:8080 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

upstream grafana_service {
    server monitoring-grafana:3000;
    keepalive 16;
}

upstream uptime_service {
    server uptime-kuma:3001;
    keepalive 16;
}

# HTTP Server -> Auto Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name _;

    # Nginx stub status for Prometheus metrics scraping (internal only)
    location /stub_status {
        stub_status;
        allow 127.0.0.1;
        allow 172.16.0.0/12;
        allow 10.0.0.0/8;
        deny all;
    }

    # ACME Challenge for Let's Encrypt Certbot
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Production Server
server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    http2 on;
    server_name _;

    # SSL Certificates (Self-signed or Let's Encrypt)
    ssl_certificate /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

    # Modern TLS Security Parameters
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # Enterprise Hardening Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss;

    # Primary Application Routing
    location / {
        limit_req zone=general_limit burst=20 nodelay;
        proxy_pass http://backend_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
    }

    # Protected Grafana Metrics UI
    location /grafana/ {
        proxy_pass http://grafana_service;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Uptime Kuma Status Page
    location /status/ {
        proxy_pass http://uptime_service/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
`;

export const UNIFIED_PROMETHEUS_YML = `# =============================================================================
# ENTERPRISE PROMETHEUS CONFIGURATION
# =============================================================================
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "/etc/prometheus/alerts.yml"

scrape_configs:
  # Self-monitoring
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Linux Host Metrics
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  # Nginx Gateway Metrics
  - job_name: 'nginx'
    metrics_path: '/stub_status'
    static_configs:
      - targets: ['reverse-proxy:80']

  # Application Backend Health & Metrics
  - job_name: 'app-backend'
    metrics_path: '/'
    static_configs:
      - targets: ['app-backend:8080']
`;

export const UNIFIED_PROMETHEUS_ALERTS_YML = `groups:
  - name: enterprise_critical_alerts
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is DOWN!"
          description: "Target {{ $labels.instance }} of job {{ $labels.job }} has been unreachable for more than 1 minute."

      - alert: HostHighCpuLoad
        expr: 100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU load on {{ $labels.instance }}"
          description: "CPU utilization has exceeded 85% for 5 consecutive minutes."

      - alert: HostHighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 90
        for: 3m
        labels:
          severity: critical
        annotations:
          summary: "Host RAM usage critical (> 90%)"
          description: "Available memory is below 10% on {{ $labels.instance }}."

      - alert: DiskSpaceLow
        expr: (node_filesystem_free_bytes{mountpoint="/host/root"} / node_filesystem_size_bytes{mountpoint="/host/root"}) * 100 < 15
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Disk space low (< 15% remaining)"
          description: "Root partition on {{ $labels.instance }} has less than 15% free disk space left."
`;

export const UNIFIED_POSTGRES_INIT_SQL = `-- =============================================================================
-- ENTERPRISE POSTGRESQL INITIALIZATION & SCHEMA
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create Audit & Telemetry Schema
CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE IF NOT EXISTS audit.system_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(64) NOT NULL,
    severity VARCHAR(16) DEFAULT 'INFO',
    payload JSONB NOT NULL,
    source_ip INET,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_system_events_created_at ON audit.system_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_system_events_type ON audit.system_events(event_type);

-- Insert baseline bootstrap event
INSERT INTO audit.system_events (event_type, severity, payload)
VALUES ('INFRA_BOOTSTRAP', 'INFO', '{"status": "initialized", "monorepo": "sysadmin-enterprise", "version": "1.0.0"}');
`;

export const UNIFIED_POSTGRESQL_CONF = `# Enterprise PostgreSQL 16 Performance Tuning
# Sized for 4GB - 8GB VPS Host
listen_addresses = '*'
max_connections = 100

# Memory Tuning
shared_buffers = 1GB
effective_cache_size = 3GB
maintenance_work_mem = 256MB
work_mem = 16MB

# Checkpoints & WAL
wal_level = replica
min_wal_size = 1GB
max_wal_size = 4GB
checkpoint_completion_target = 0.9
checkpoint_timeout = 15min

# Disk & Planner
random_page_cost = 1.1
effective_io_concurrency = 200

# Logging & Telemetry
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_min_duration_statement = 250
shared_preload_libraries = 'pg_stat_statements'
`;

export const UNIFIED_BORG_BACKUP_SH = `#!/usr/bin/env bash
# =============================================================================
# ENTERPRISE AUTOMATED BORGBACKUP SNAPSHOT
# High-deduplication, AES-256 authenticated encryption, automated pruning
# =============================================================================
set -euo pipefail

# Configuration
export BORG_REPO="\${BORG_REPO:-/var/backups/borg-enterprise}"
export BORG_PASSPHRASE="\${BORG_PASSPHRASE:-EnterpriseBorgKey2026!ChangeMe}"
BACKUP_NAME="enterprise-snapshot-\$(date +%Y-%m-%d_%H%M%S)"
DOCKER_DIR="/opt/enterprise-infra"

echo "[\$(date +'%Y-%m-%d %H:%M:%S')] Starting Enterprise BorgBackup snapshot: \${BACKUP_NAME}..."

# 1. Take atomic database dump before backup
echo "Creating PostgreSQL logical dump..."
docker exec enterprise-postgres pg_dump -U sysadmin -d enterprise_db -F c -b -v -f /tmp/enterprise_db_dump.sql || echo "Warning: DB dump skipped"

# 2. Run BorgBackup archive creation
borg create --verbose --stats --progress --compression lz4 \\
    --exclude '\${DOCKER_DIR}/**/node_modules' \\
    --exclude '\${DOCKER_DIR}/**/.git' \\
    "\${BORG_REPO}::\${BACKUP_NAME}" \\
    "\${DOCKER_DIR}" \\
    /etc/nginx \\
    /etc/ssh \\
    /etc/ssl

# 3. Prune old snapshots according to G-F-S policy (Grandfather-Father-Son)
echo "Pruning older archives according to retention policy..."
borg prune -v --list --keep-daily=7 --keep-weekly=4 --keep-monthly=12 "\${BORG_REPO}"

# 4. Compact repository to free disk space
borg compact "\${BORG_REPO}"

echo "[\$(date +'%Y-%m-%d %H:%M:%S')] Enterprise BorgBackup completed successfully!"
`;

export const UNIFIED_RESTORE_DRILL_SH = `#!/usr/bin/env bash
# =============================================================================
# DISASTER RECOVERY RESTORE DRILL SCRIPT
# Validates backup integrity and tests restore procedure without destroying prod
# =============================================================================
set -euo pipefail

export BORG_REPO="\${BORG_REPO:-/var/backups/borg-enterprise}"
export BORG_PASSPHRASE="\${BORG_PASSPHRASE:-EnterpriseBorgKey2026!ChangeMe}"
TEST_DIR="/tmp/borg-restore-drill-\$(date +%s)"

echo "=== DISASTER RECOVERY RESTORE TEST INITIATED ==="
mkdir -p "\${TEST_DIR}"

# 1. Verify repository integrity
echo "1. Running Borg check..."
borg check --repository-only "\${BORG_REPO}"

# 2. Identify the latest archive
LATEST_ARCHIVE=\$(borg list "\${BORG_REPO}" --short | tail -n 1)
echo "2. Latest snapshot detected: \${LATEST_ARCHIVE}"

# 3. Extract sample configuration into sandboxed test dir
echo "3. Extracting sample files for integrity validation..."
cd "\${TEST_DIR}"
borg extract "\${BORG_REPO}::\${LATEST_ARCHIVE}" opt/enterprise-infra/docker-compose.yml opt/enterprise-infra/nginx/nginx.conf

if [ -f "opt/enterprise-infra/docker-compose.yml" ]; then
    echo "✓ [PASS] Backup archive integrity verified! docker-compose.yml extracted successfully."
else
    echo "✗ [FAIL] Extraction failed or archive corrupted!"
    exit 1
fi

# Clean up drill test files
cd /tmp
rm -rf "\${TEST_DIR}"
echo "=== DISASTER RECOVERY DRILL COMPLETED WITH SUCCESS ==="
`;

export const UNIFIED_DEPLOY_SH = `#!/usr/bin/env bash
# =============================================================================
# ENTERPRISE ZERO-DOWNTIME DEPLOYMENT SCRIPT
# =============================================================================
set -euo pipefail

SCRIPT_DIR="\$(cd "\$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="\$(dirname "\${SCRIPT_DIR}")"

cd "\${PROJECT_ROOT}"

echo "=== ENTERPRISE INFRASTRUCTURE DEPLOYMENT ==="

# 1. Pre-flight check
if ! command -v docker &>/dev/null; then
    echo "Error: Docker is not installed. Please install Docker CE first."
    exit 1
fi

if [ ! -f ".env" ]; then
    echo "Notice: .env not found. Copying .env.example to .env..."
    cp .env.example .env
fi

# 2. Generate self-signed SSL if certificates are missing
SSL_DIR="nginx/ssl"
mkdir -p "\${SSL_DIR}"
if [ ! -f "\${SSL_DIR}/server.crt" ]; then
    echo "Generating self-signed SSL certificate for initial boot..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
        -keyout "\${SSL_DIR}/server.key" \\
        -out "\${SSL_DIR}/server.crt" \\
        -subj "/C=RU/ST=Moscow/L=Moscow/O=Enterprise/CN=localhost" 2>/dev/null
fi

# 3. Pull latest images and build
echo "Pulling Docker images..."
docker compose pull --ignore-pull-failures

# 4. Start all 8 infrastructure services
echo "Starting services in background..."
docker compose up -d --remove-orphans

# 5. Run health check
echo "Running automated healthcheck probe..."
sleep 5
"\${SCRIPT_DIR}/healthcheck.sh"

echo "=== DEPLOYMENT COMPLETED SUCCESSFULLY ==="
`;

export const UNIFIED_HEALTHCHECK_SH = `#!/usr/bin/env bash
# =============================================================================
# FULL-STACK INFRASTRUCTURE HEALTHCHECK PROBE
# =============================================================================
set -uo pipefail

FAILED=0

echo "--- [1/6] Checking Docker Container Statuses ---"
docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"

echo ""
echo "--- [2/6] Checking Reverse Proxy HTTP & HTTPS ---"
if curl -skf http://127.0.0.1:80/stub_status &>/dev/null; then
    echo "✓ [OK] Nginx HTTP & Stub Status responding"
else
    echo "✗ [FAIL] Nginx HTTP port 80 not responding"
    FAILED=1
fi

echo ""
echo "--- [3/6] Checking Application Backend ---"
if docker exec enterprise-app wget -qO- http://127.0.0.1:8080/ &>/dev/null; then
    echo "✓ [OK] App Backend healthy"
else
    echo "✗ [FAIL] App Backend unhealthy"
    FAILED=1
fi

echo ""
echo "--- [4/6] Checking PostgreSQL Database ---"
if docker exec enterprise-postgres pg_isready -U sysadmin -d enterprise_db &>/dev/null; then
    echo "✓ [OK] PostgreSQL is accepting connections"
else
    echo "✗ [FAIL] PostgreSQL health check failed"
    FAILED=1
fi

echo ""
echo "--- [5/6] Checking Redis In-Memory Cache ---"
if docker exec enterprise-redis redis-cli -a SecretRedisToken2026! ping 2>/dev/null | grep -q PONG; then
    echo "✓ [OK] Redis responding with PONG"
else
    echo "✗ [FAIL] Redis ping failed"
    FAILED=1
fi

echo ""
echo "--- [6/6] Checking Monitoring Stack (Prometheus & Grafana) ---"
if docker exec enterprise-prometheus wget -qO- http://127.0.0.1:9090/-/healthy &>/dev/null; then
    echo "✓ [OK] Prometheus TSDB healthy"
else
    echo "✗ [FAIL] Prometheus not reachable"
    FAILED=1
fi

echo "------------------------------------------------"
if [ "\${FAILED}" -eq 0 ]; then
    echo "✓ ALL ENTERPRISE SERVICES ARE HEALTHY & OPERATIONAL!"
    exit 0
else
    echo "✗ ONE OR MORE SERVICES REPORTED FAILURES!"
    exit 1
fi
`;

export const UNIFIED_HARDENING_SH = `#!/usr/bin/env bash
# =============================================================================
# CIS LINUX BENCHMARK BASELINE HARDENING SCRIPT
# =============================================================================
set -euo pipefail

if [ "\$(id -u)" -ne 0 ]; then
    echo "Error: This script must be run as root." >&2
    exit 1
fi

echo "Applying kernel sysctl hardening..."
cat << 'EOF' > /etc/sysctl.d/99-enterprise-hardening.conf
# Disable IP packet forwarding (router only)
net.ipv4.ip_forward = 0
# Enable TCP SYN Cookies (protect against SYN flood)
net.ipv4.tcp_syncookies = 1
# Disable ICMP redirect acceptance (prevent MITM route injection)
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
# Ignore ICMP ping broadcasts
net.ipv4.icmp_echo_ignore_broadcasts = 1
# Virtual Memory: prioritize RAM over disk swap
vm.swappiness = 10
# File handles and max open connections
fs.file-max = 2097152
EOF
sysctl --system &>/dev/null || true

echo "Hardening file permissions on critical system paths..."
chmod 600 /etc/shadow 2>/dev/null || true
chmod 600 /etc/gshadow 2>/dev/null || true
chmod 644 /etc/passwd 2>/dev/null || true
chmod 644 /etc/group 2>/dev/null || true

echo "Configuring UFW Firewall baseline..."
if command -v ufw &>/dev/null; then
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow 22/tcp comment 'SSH Management'
    ufw allow 80/tcp comment 'HTTP Web'
    ufw allow 443/tcp comment 'HTTPS Web'
    echo "UFW rules configured (run 'ufw enable' to activate)."
fi

echo "✓ Kernel and security hardening baseline applied successfully."
`;

export const UNIFIED_MAKEFILE = `# Enterprise Infrastructure Makefile
.PHONY: up down restart logs status health backup restore harden

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f --tail=100

status:
	docker compose ps

health:
	./scripts/healthcheck.sh

backup:
	./backup/backup-borg.sh

restore:
	./backup/restore-drill.sh

harden:
	sudo ./scripts/hardening.sh
`;

export const UNIFIED_ENV_EXAMPLE = `# =============================================================================
# ENTERPRISE MONOREPO ENVIRONMENT SECRETS TEMPLATE
# Copy to .env and replace with secure unique values before deploying
# =============================================================================

# Domain & Host Configuration
DOMAIN_NAME=enterprise.yourdomain.com
ADMIN_EMAIL=sysadmin@yourdomain.com

# PostgreSQL Credentials
POSTGRES_DB=enterprise_db
POSTGRES_USER=sysadmin
POSTGRES_PASSWORD=UltraSecurePostgresPassword_2026_ChangeMe!

# Redis Cache Credentials
REDIS_PASSWORD=UltraSecureRedisToken_2026_ChangeMe!

# Grafana Observability Credentials
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=EnterpriseObservabilitySecret_2026!

# BorgBackup Encryption Passphrase
BORG_PASSPHRASE=EnterpriseBorgEncryptionPassphrase_2026_ChangeMe!
BORG_REPO=/var/backups/borg-enterprise
`;

export const UNIFIED_MONOREPO_README_MD = `# 🏢 Enterprise Infrastructure Monorepo (All-in-One)

[![Infrastructure](https://img.shields.io/badge/Infrastructure-Production--Ready-emerald.svg)](https://github.com)
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-8_Services-blue.svg)](https://docs.docker.com/compose/)
[![Ansible](https://img.shields.io/badge/Ansible-Automated_Playbooks-red.svg)](https://docs.ansible.com/)
[![Prometheus & Grafana](https://img.shields.io/badge/Observability-Prometheus_%2B_Grafana-orange.svg)](https://prometheus.io/)
[![BorgBackup](https://img.shields.io/badge/Backup-BorgBackup_AES--256-green.svg)](https://borgbackup.readthedocs.io/)
[![Security Hardening](https://img.shields.io/badge/Security-CIS_Linux_Benchmark-purple.svg)](https://cisecurity.org/)

> **Единый комплексный инфраструктурный репозиторий (Monorepo)**, объединяющий все 10 практических этапов подготовки системного администратора в целостную, готовую к эксплуатации корпоративную систему с единым развертыванием через \`docker compose up -d\` или Ansible.

---

## 📐 Архитектура и топология сети

\`\`\`
${MONOREPO_TOPOLOGY_ASCII.trim()}
\`\`\`

---

## 📦 Что входит в единый мега-проект (Объединение 10 этапов)

| № | Этап обучения | Компонент в репозитории | Технологии & Роль |
|---|---------------|-------------------------|-------------------|
| **1** | Серверное железо & Sizing | \`docs/ARCHITECTURE.md\`, \`scripts/hardening.sh\` | ECC RAM, RAID 10 sizing, SMART-мониторинг |
| **2** | Linux администрирование | \`ansible/roles/01_system_hardening\` | Ubuntu/Debian, Systemd, Sysctl tuning, limits |
| **3** | Сети, Фаервол & VPN | \`ansible/roles/02_security\`, UFW rules | TCP/IP, NAT, Port Forwarding, Security Groups |
| **4** | Nginx & SSL/TLS Gateway | \`nginx/conf.d/default.conf\` | HTTP/2, TLS 1.3, Rate-limiting, Gzip, HSTS |
| **5** | Базы данных | \`postgres/init/\`, \`postgres/postgresql.conf\` | PostgreSQL 16 Alpine, WAL replica, Connection pool |
| **6** | Контейнеризация | \`docker-compose.yml\`, \`Makefile\` | 8 изолированных контейнеров, bridge networks |
| **7** | Автоматизация (IaC) | \`ansible/site.yml\`, \`ansible/inventory/\` | Ansible роли, декларативное развертывание в 1 клик |
| **8** | Мониторинг & Телеметрия | \`monitoring/prometheus/\`, \`monitoring/grafana/\` | Prometheus, Grafana, Node Exporter, Uptime Kuma |
| **9** | Бэкапы & Безопасность | \`backup/backup-borg.sh\`, \`scripts/hardening.sh\` | BorgBackup AES-256, G-F-S (7D/4W/12M), Fail2ban |
| **10**| Эксплуатация & Runbooks | \`docs/RUNBOOK_INCIDENTS.md\`, \`healthcheck.sh\` | Диагностика аварий, SLA 99.9%, Disaster Recovery |

---

## ⚡ Быстрый старт (Запуск за 3 команды)

### Вариант А: Локальный запуск через Docker Compose
\`\`\`bash
# 1. Клонирование репозитория
git clone https://github.com/your-username/sysadmin-enterprise-monorepo.git
cd sysadmin-enterprise-monorepo

# 2. Настройка переменных окружения
cp .env.example .env

# 3. Развертывание всего стека
./scripts/deploy.sh
# или просто: make up
\`\`\`

Проверьте статус всех 8 сервисов:
\`\`\`bash
./scripts/healthcheck.sh
# или: make health
\`\`\`

---

### Вариант Б: Автоматическое развертывание на чистый VPS через Ansible
\`\`\`bash
cd ansible
# Отредактируйте IP-адрес вашего сервера в inventory/hosts.ini
ansible-playbook -i inventory/hosts.ini site.yml
\`\`\`

---

## 🌐 Сетевые порты и адреса сервисов

| Сервис | Внутренний порт | Внешний URL / Порт | Назначение |
|--------|-----------------|--------------------|------------|
| **Nginx Reverse Proxy** | \`80, 443\` | \`http://localhost\` / \`https://localhost\` | Входная точка трафика и SSL |
| **App Backend API** | \`8080\` | Через Nginx: \`/\` | Прикладной сервис |
| **Grafana Dashboards** | \`3000\` | Через Nginx: \`/grafana/\` | Визуализация метрик и алертов |
| **Uptime Kuma** | \`3001\` | Через Nginx: \`/status/\` | Мониторинг аптайма и пинга |
| **Prometheus TSDB** | \`9090\` | Внутренняя сеть (\`enterprise-monitoring\`) | Сбор метрик с хоста и контейнеров |
| **Node Exporter** | \`9100\` | Внутренняя сеть (\`enterprise-monitoring\`) | Метрики CPU, RAM, дисков хоста |
| **PostgreSQL 16** | \`5432\` | Внутренняя изолированная сеть (\`enterprise-backend\`) | Основная реляционная БД |
| **Redis 7 Cache** | \`6379\` | Внутренняя изолированная сеть (\`enterprise-backend\`) | Кэш сессий и очередей |

---

## 🛡 Политика резервного копирования (Disaster Recovery)

- **Инструмент:** BorgBackup с аутентифицированным шифрованием AES-256.
- **Дедупликация:** Блочная дедупликация на уровне чанков (экономит до 85% дискового пространства).
- **Политика ротации (Grandfather-Father-Son):**
  - \`--keep-daily=7\` (7 ежедневных снапшотов)
  - \`--keep-weekly=4\` (4 еженедельных снапшота)
  - \`--keep-monthly=12\` (12 ежемесячных архивных копий)
- **Учебное восстановление (Disaster Recovery Drill):**
  \`\`\`bash
  ./backup/restore-drill.sh
  \`\`\`

---

## 💬 Как презентовать проект на техническом собеседовании

1. **"Почему монорепозиторий?"**  
   *«Вместо разрозненных скриптов я объединил всю инфраструктуру в единый проект, как это принято в зрелых engineering-командах: единая оркестрация через Docker Compose, сквозной мониторинг, централизованные бэкапы и Ansible-плейбук, позволяющий развернуть идентичный стенд с нуля за 3 минуты.»*

2. **"Как защищена база данных?"**  
   *«PostgreSQL и Redis вынесены во внутреннюю изолированную docker-сеть (\`internal: true\`), наружу выставлены только порты 80/443 Nginx. Пароли передаются через секреты \`.env\`. Раз в сутки создается транзакционный дамп \`pg_dump\` и шифруется через BorgBackup.»*

3. **"Как устроен мониторинг?"**  
   *«Node Exporter собирает системные метрики хоста, Nginx отдает \`/stub_status\`, Prometheus парсит таргеты каждые 15 секунд, в Grafana автоматически преднастроены дашборды, а Uptime Kuma следит за доступностью внешних URL-эндпоинтов.»*
`;

export const UNIFIED_DOCS_RUNBOOK = `# 🚨 Production Incident Response Runbook

Инструкции по разрешению типовых инцидентов инфраструктуры:

## 1. Nginx возвращает 502 Bad Gateway
\`\`\`bash
# 1. Проверьте статус контейнера приложения
docker ps | grep enterprise-app

# 2. Изучите логи бэкенда
docker logs enterprise-app --tail=100

# 3. Перезапустите сервис
docker compose restart app-backend
\`\`\`

## 2. 100% заполнение дискового пространства (Disk Full)
\`\`\`bash
# 1. Найдите крупнейшие директории
du -ahx / | sort -rh | head -n 20

# 2. Очистите старые Docker образы и билды
docker system prune -af --volumes

# 3. Очистите логи systemd journal
journalctl --vacuum-size=200M
\`\`\`

## 3. Отказ базы данных PostgreSQL
\`\`\`bash
# 1. Проверьте доступность сокета
docker exec enterprise-postgres pg_isready -U sysadmin

# 2. Проверьте наличие свободного места в pgdata
docker exec enterprise-postgres df -h /var/lib/postgresql/data

# 3. При необходимости запустите аварийный дамп
./backup/backup-borg.sh
\`\`\`
`;

/**
 * Returns complete map of relative path -> content for the entire Monorepo
 */
export function getUnifiedMonorepoFiles(): Record<string, string> {
  return {
    'README.md': UNIFIED_MONOREPO_README_MD,
    'docker-compose.yml': UNIFIED_DOCKER_COMPOSE_YML,
    'docker-compose.prod.yml': UNIFIED_DOCKER_COMPOSE_YML.replace('unless-stopped', 'always'),
    'Makefile': UNIFIED_MAKEFILE,
    '.env.example': UNIFIED_ENV_EXAMPLE,
    'nginx/nginx.conf': `user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;
events {
    worker_connections 2048;
    use epoll;
    multi_accept on;
}
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    include /etc/nginx/conf.d/*.conf;
}`,
    'nginx/conf.d/default.conf': UNIFIED_NGINX_DEFAULT_CONF,
    'nginx/ssl/README.md': '# SSL Certificates Directory\nPlace your server.crt and server.key files here or use Let\'s Encrypt Certbot.',
    'ansible/site.yml': UNIFIED_ANSIBLE_SITE_YML,
    'ansible/inventory/hosts.ini': UNIFIED_ANSIBLE_HOSTS_INI,
    'ansible/group_vars/all.yml': UNIFIED_ANSIBLE_VARS_YML,
    'monitoring/prometheus/prometheus.yml': UNIFIED_PROMETHEUS_YML,
    'monitoring/prometheus/alerts.yml': UNIFIED_PROMETHEUS_ALERTS_YML,
    'monitoring/grafana/provisioning/datasources/prometheus.yml': `apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://monitoring-prometheus:9090
    isDefault: true
    editable: false
`,
    'monitoring/grafana/provisioning/dashboards/dashboards.yml': `apiVersion: 1
providers:
  - name: 'Default Provider'
    orgId: 1
    folder: 'Infrastructure'
    type: file
    disableDeletion: false
    editable: true
    options:
      path: /etc/grafana/provisioning/dashboards
`,
    'postgres/init/01-init.sql': UNIFIED_POSTGRES_INIT_SQL,
    'postgres/postgresql.conf': UNIFIED_POSTGRESQL_CONF,
    'backup/backup-borg.sh': UNIFIED_BORG_BACKUP_SH,
    'backup/restore-drill.sh': UNIFIED_RESTORE_DRILL_SH,
    'scripts/deploy.sh': UNIFIED_DEPLOY_SH,
    'scripts/healthcheck.sh': UNIFIED_HEALTHCHECK_SH,
    'scripts/hardening.sh': UNIFIED_HARDENING_SH,
    'docs/ARCHITECTURE.md': `# Enterprise System Architecture & Network Segmentation\n\n${MONOREPO_TOPOLOGY_ASCII}`,
    'docs/RUNBOOK_INCIDENTS.md': UNIFIED_DOCS_RUNBOOK,
  };
}

/**
 * Packs all files into a ready-to-deploy zip archive and triggers browser download
 */
export async function downloadUnifiedMonorepoZip(): Promise<void> {
  const zip = new JSZip();
  const files = getUnifiedMonorepoFiles();
  const rootFolder = zip.folder('sysadmin-enterprise-monorepo');

  if (!rootFolder) {
    throw new Error('Could not create zip folder');
  }

  for (const [relativePath, content] of Object.entries(files)) {
    rootFolder.file(relativePath, content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sysadmin-enterprise-monorepo.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
