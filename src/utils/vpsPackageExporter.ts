/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DOCKERFILE_CONTENT = `# Multi-stage Dockerfile for SysAdmin Pro Web App
# Stage 1: Build static assets
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy source code and build production bundle
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight Nginx Alpine
FROM nginx:1.27-alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck to ensure container is healthy
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \\
  CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
`;

export const DOCKER_COMPOSE_CONTENT = `version: '3.8'

services:
  sysadmin-pro:
    build:
      context: .
      dockerfile: Dockerfile
    image: sysadmin-pro:latest
    container_name: sysadmin_pro_app
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:80/"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
`;

export const NGINX_CONF_CONTENT = `server {
    listen 80;
    listen [::]:80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip Compression for high performance
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Security Headers (CIS Benchmark recommendations)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;" always;

    # SPA routing: fallback all routes to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|xlsx)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, max-age=15552000, immutable";
    }

    # Deny access to hidden files
    location ~ /\\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
`;

export const SYSTEMD_SERVICE_CONTENT = `[Unit]
Description=SysAdmin Pro Career Lab Web Application
After=network.target docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=/opt/sysadmin-pro
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=sysadmin-pro

[Install]
WantedBy=multi-user.target
`;

export const DEPLOY_SH_CONTENT = `#!/usr/bin/env bash
# ==============================================================================
# SysAdmin Pro - Automated One-Click VPS Deployment Script
# Tested on: Ubuntu 20.04/22.04/24.04, Debian 11/12, Rocky Linux 9
# ==============================================================================

set -euo pipefail

RED='\\033[0;31m'
GREEN='\\033[0;32m'
BLUE='\\033[0;34m'
YELLOW='\\033[1;33m'
NC='\\033[0m'

echo -e "\${BLUE}=====================================================\${NC}"
echo -e "\${BLUE}     SysAdmin Pro: Автоматический деплой на VPS     \${NC}"
echo -e "\${BLUE}=====================================================\${NC}"

# Check root privileges
if [ "$EUID" -ne 0 ]; then
  echo -e "\${RED}[!] Ошибка: запустите скрипт с правами root (sudo bash deploy.sh)\${NC}"
  exit 1
fi

APP_DIR="/opt/sysadmin-pro"
echo -e "\${YELLOW}[1/5] Проверка рабочего каталога: \${APP_DIR}...\${NC}"
mkdir -p "$APP_DIR"

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
  echo -e "\${YELLOW}[2/5] Docker не найден. Установка официального Docker CE...\${NC}"
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm -f get-docker.sh
  systemctl enable --now docker
  echo -e "\${GREEN}[✓] Docker успешно установлен.\${NC}"
else
  echo -e "\${GREEN}[✓] Docker уже установлен: $(docker --version)\${NC}"
fi

# Check Docker Compose plugin
if ! docker compose version &> /dev/null; then
  echo -e "\${YELLOW}Установка docker-compose-plugin...\${NC}"
  if command -v apt-get &> /dev/null; then
    apt-get update && apt-get install -y docker-compose-plugin
  elif command -v dnf &> /dev/null; then
    dnf install -y docker-compose-plugin
  fi
fi

# Build and start container
echo -e "\${YELLOW}[3/5] Сборка и запуск контейнера через Docker Compose...\${NC}"
cd "$APP_DIR"
docker compose down || true
docker compose build --pull
docker compose up -d

# Configure UFW firewall if active
if command -v ufw &> /dev/null && ufw status | grep -q "Status: active"; then
  echo -e "\${YELLOW}[4/5] Настройка фаервола UFW (открытие портов 80 и 443)...\${NC}"
  ufw allow 80/tcp comment 'SysAdmin Pro HTTP'
  ufw allow 443/tcp comment 'SysAdmin Pro HTTPS'
  echo -e "\${GREEN}[✓] Порты 80/443 открыты в UFW.\${NC}"
fi

# Get public IP
PUBLIC_IP=$(curl -s -4 ifconfig.me || curl -s -4 icanhazip.com || echo "IP_ВАШЕГО_СЕРВЕРА")

echo -e "\${GREEN}=====================================================\${NC}"
echo -e "\${GREEN}  Успешно! SysAdmin Pro запущен и готов к работе!    \${NC}"
echo -e "\${GREEN}=====================================================\${NC}"
echo -e "Открыть в браузере: \${BLUE}http://\${PUBLIC_IP}\${NC}"
echo -e ""
echo -e "Полезные команды управления:"
echo -e "  Просмотр логов:   cd \${APP_DIR} && docker compose logs -f"
echo -e "  Перезапуск:       cd \${APP_DIR} && docker compose restart"
echo -e "  Остановка:        cd \${APP_DIR} && docker compose down"
echo -e "  Получение SSL:    apt install -y certbot python3-certbot-nginx"
`;

export const VPS_DEPLOY_README_CONTENT = `# 🚀 Инструкция по развертыванию SysAdmin Pro на VPS и локальном ПК

Данный репозиторий содержит всё необходимое для запуска интерактивного образовательного портала **SysAdmin Pro: Дорожная карта и Лаборатория Системного Администратора** на любом личном виртуальном сервере (VPS/VDS) или домашнем компьютере.

---

## ⚡ Быстрый старт (За 2 минуты на VPS)

### Требования к серверу:
- **ОС**: Ubuntu 22.04 / 24.04 LTS, Debian 11/12, Rocky Linux 9, AlmaLinux
- **Ресурсы**: от 1 vCPU, 1 GB RAM, 10 GB диска (подойдет любой базовый тариф за 150-250 руб/мес в Timeweb, Selectel, Hetzner, Aeza, Beget)

### Способ 1: Автоматический скрипт (Docker)
1. Подключитесь к вашему VPS по SSH:
   \`\`\`bash
   ssh root@<IP_АДРЕС_ВАШЕГО_СЕРВЕРА>
   \`\`\`
2. Создайте каталог и скопируйте файлы архива:
   \`\`\`bash
   mkdir -p /opt/sysadmin-pro && cd /opt/sysadmin-pro
   # Распакуйте сюда скачанный ZIP-архив
   \`\`\`
3. Запустите скрипт деплоя:
   \`\`\`bash
   chmod +x deploy.sh
   sudo ./deploy.sh
   \`\`\`
4. Откройте в браузере: \`http://<IP_АДРЕС_СЕРВЕРА>\`

---

### Способ 2: Чистый Docker Compose
\`\`\`bash
cd /opt/sysadmin-pro
docker compose up -d --build
\`\`\`
Проверить статус:
\`\`\`bash
docker compose ps
docker compose logs -f
\`\`\`

---

### Способ 3: Запуск без Docker (Чистый Nginx - ультра-легкий, 64 MB RAM)
Если у вас очень слабый VPS и не хочется ставить Docker:
1. Установите Node.js 22 и Nginx:
   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx
   \`\`\`
2. Соберите проект:
   \`\`\`bash
   cd /opt/sysadmin-pro
   npm install
   npm run build
   \`\`\`
3. Скопируйте статику в Nginx:
   \`\`\`bash
   sudo cp -r dist/* /var/www/html/
   sudo cp nginx.conf /etc/nginx/sites-available/sysadmin-pro
   sudo ln -s /etc/nginx/sites-available/sysadmin-pro /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t && sudo systemctl reload nginx
   \`\`\`

---

## 🔒 Настройка бесплатного SSL (HTTPS) от Let's Encrypt
Если вы привязали к VPS домен (например, \`sysadmin.yourdomain.ru\`):
\`\`\`bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sysadmin.yourdomain.ru
\`\`\`
Certbot автоматически сконфигурирует HTTPS и включит автообновление сертификата раз в 90 дней.

---

## 💻 Локальный запуск на компьютере (Офлайн)
### Вариант А: Через Node.js
\`\`\`bash
npm install
npm run dev
# Открыть http://localhost:3000
\`\`\`

### Вариант Б: Без Node.js вообще (Автономный HTML)
Скачайте в разделе приложения файл **OFFLINE_SYSLAB.html** и дважды кликните на него. Он работает прямо в браузере из папки загрузок без сервера и подключения к интернету!
`;

export function generateOfflineHandbookHtml(): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SysAdmin Pro — Автономный Офлайн-Справочник</title>
  <style>
    :root {
      --bg: #0b0f19;
      --card: #131b2e;
      --border: #1e293b;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --accent: #10b981;
      --accent-glow: rgba(16, 185, 129, 0.15);
      --code-bg: #020617;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      padding: 24px 16px 80px;
    }
    .container { max-width: 1000px; margin: 0 auto; }
    header {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 24px;
      text-align: center;
    }
    h1 { color: #fff; font-size: 26px; margin-bottom: 8px; }
    .badge {
      display: inline-block;
      background: var(--accent-glow);
      color: var(--accent);
      border: 1px solid var(--accent);
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .desc { color: var(--muted); font-size: 14px; max-width: 700px; margin: 0 auto; }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    h2 { font-size: 18px; color: var(--accent); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    h3 { font-size: 15px; color: #fff; margin: 16px 0 8px; }
    p, li { font-size: 14px; color: #cbd5e1; }
    ul, ol { padding-left: 20px; margin-bottom: 12px; }
    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px;
      overflow-x: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      color: #38bdf8;
      margin: 8px 0 12px;
    }
    code {
      background: #1e293b;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: #38bdf8;
    }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .stat-box { background: #0b1120; border: 1px solid var(--border); padding: 14px; border-radius: 8px; }
    .stat-title { font-size: 12px; color: var(--muted); text-transform: uppercase; font-weight: 600; }
    .stat-val { font-size: 20px; font-weight: 700; color: #fff; margin-top: 4px; }
    footer { text-align: center; color: var(--muted); font-size: 12px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">АВТОНОМНАЯ ВЕРСИЯ БЕЗ СЕТИ</div>
      <h1>SysAdmin Pro: Полный Офлайн-Справочник и Лабораторный Комплекс</h1>
      <p class="desc">
        Данный документ открывается прямо с вашего диска в любом браузере (Chrome, Edge, Firefox, Safari) без подключения к интернету, веб-сервера или Node.js.
      </p>
    </header>

    <div class="grid" style="margin-bottom: 24px;">
      <div class="stat-box">
        <div class="stat-title">Всего этапов roadmap</div>
        <div class="stat-val">10 практических ступеней</div>
      </div>
      <div class="stat-box">
        <div class="stat-title">Технологий в каталоге</div>
        <div class="stat-val">78 кроссплатформенных утилит</div>
      </div>
      <div class="stat-box">
        <div class="stat-title">Аварийных инцидентов</div>
        <div class="stat-val">5 готовых сценариев Fix-It</div>
      </div>
    </div>

    <div class="card">
      <h2>1. Дорожная карта обучения (Junior -> Middle SysAdmin)</h2>
      <ol>
        <li><strong>Шаг 1: Железо ПК и серверное оборудование</strong> (RAID 0/1/5/6/10, IPMI, iDRAC, ECC RAM, Victoria HDD, MemTest86).</li>
        <li><strong>Шаг 2: Компьютерные сети и протоколы</strong> (Модель OSI, стек TCP/IP, маски CIDR, VLAN 802.1Q, Wireshark, tcpdump).</li>
        <li><strong>Шаг 3: Основы Linux и системное администрирование</strong> (FHS, systemd, права chmod/chown, LVM, SSH ключи, журнал journalctl).</li>
        <li><strong>Шаг 4: Веб-стек и базы данных</strong> (Nginx Reverse Proxy, Let's Encrypt SSL, PostgreSQL, MySQL, оптимизация innodb).</li>
        <li><strong>Шаг 5: Windows Server и Active Directory</strong> (AD DS, DNS, DHCP, GPO, PowerShell скрипты, AGDLP модель доступа).</li>
        <li><strong>Шаг 6: Виртуализация и Контейнеризация</strong> (KVM, Proxmox VE, Docker, Docker Compose, Portainer, лимиты памяти).</li>
        <li><strong>Шаг 7: Автоматизация и управление конфигурациями</strong> (Bash скриптинг, Ansible playbooks, idempotency, Jinja2 шаблоны).</li>
        <li><strong>Шаг 8: Мониторинг, логирование и алертинг</strong> (Prometheus, Node Exporter, Grafana дашборды, Loki, Zabbix).</li>
        <li><strong>Шаг 9: Информационная безопасность и бэкапы</strong> (UFW, iptables, fail2ban, правило 3-2-1, BorgBackup, RTO/RPO).</li>
        <li><strong>Шаг 10: Упаковка портфолио и подготовка к собеседованиям</strong> (GitHub репозитории, техническое резюме, скрининг).</li>
      </ol>
    </div>

    <div class="card">
      <h2>2. Шпаргалка ключевых команд Linux для сисадмина</h2>
      <h3>Диагностика диска и файловых систем</h3>
      <pre>df -hT                 # Свободное место на всех смонтированных разделах
du -sh /* 2>/dev/null  # Размер каталогов в корне
lsblk -f               # Блочные устройства, UUID и файловые системы
smartctl -a /dev/sda   # SMART отчет состояния жесткого диска/SSD</pre>

      <h3>Диагностика памяти и процессора</h3>
      <pre>free -h                # Оперативная память и Swap
top / htop / btop      # Интерактивный мониторинг процессов
ps aux --sort=-%mem    # Топ процессов по потреблению RAM
uptime                 # Время работы сервера и Load Average</pre>

      <h3>Сетевая диагностика</h3>
      <pre>ip a                   # Сетевые интерфейсы и IP адреса
ip r                   # Таблица маршрутизации
ss -tulpn              # Открытые порты и слушающие процессы
curl -Iv https://site  # Проверка HTTP заголовков и SSL рукопожатия</pre>

      <h3>Управление службами и журналами</h3>
      <pre>systemctl status nginx            # Статус сервиса
systemctl restart nginx           # Перезапуск сервиса
journalctl -u nginx -n 50 --no-pager  # Последние 50 строк лога службы</pre>
    </div>

    <div class="card">
      <h2>3. Развертывание проекта на личном VPS</h2>
      <p>Для запуска полного интерактивного портала с терминалом и симуляциями на вашем VPS:</p>
      <pre># 1. Скачайте ZIP архива приложения через веб-интерфейс
# 2. Распакуйте на VPS в /opt/sysadmin-pro
# 3. Выполните:
chmod +x deploy.sh
sudo ./deploy.sh</pre>
    </div>

    <footer>
      SysAdmin Pro Career Lab &bull; Автономный файл документации &bull; Открывается без интернета
    </footer>
  </div>
</body>
</html>`;
}
