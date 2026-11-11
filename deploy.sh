#!/usr/bin/env bash
# ==============================================================================
# SysAdmin Pro - Automated One-Click VPS Deployment Script
# Tested on: Ubuntu 20.04/22.04/24.04, Debian 11/12, Rocky Linux 9
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}     SysAdmin Pro: Автоматический деплой на VPS     ${NC}"
echo -e "${BLUE}=====================================================${NC}"

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[!] Ошибка: запустите скрипт с правами root (sudo bash deploy.sh)${NC}"
  exit 1
fi

APP_DIR="/opt/sysadmin-pro"
echo -e "${YELLOW}[1/5] Проверка рабочего каталога: ${APP_DIR}...${NC}"
mkdir -p "$APP_DIR"

if ! command -v docker &> /dev/null; then
  echo -e "${YELLOW}[2/5] Docker не найден. Установка официального Docker CE...${NC}"
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm -f get-docker.sh
  systemctl enable --now docker
  echo -e "${GREEN}[✓] Docker успешно установлен.${NC}"
else
  echo -e "${GREEN}[✓] Docker уже установлен: $(docker --version)${NC}"
fi

if ! docker compose version &> /dev/null; then
  echo -e "${YELLOW}Установка docker-compose-plugin...${NC}"
  if command -v apt-get &> /dev/null; then
    apt-get update && apt-get install -y docker-compose-plugin
  elif command -v dnf &> /dev/null; then
    dnf install -y docker-compose-plugin
  fi
fi

echo -e "${YELLOW}[3/5] Сборка и запуск контейнера через Docker Compose...${NC}"
cd "$APP_DIR"
docker compose down || true
docker compose build --pull
docker compose up -d

if command -v ufw &> /dev/null && ufw status | grep -q "Status: active"; then
  echo -e "${YELLOW}[4/5] Настройка фаервола UFW (открытие портов 80 и 443)...${NC}"
  ufw allow 80/tcp comment 'SysAdmin Pro HTTP'
  ufw allow 443/tcp comment 'SysAdmin Pro HTTPS'
  echo -e "${GREEN}[✓] Порты 80/443 открыты в UFW.${NC}"
fi

PUBLIC_IP=$(curl -s -4 ifconfig.me || curl -s -4 icanhazip.com || echo "IP_ВАШЕГО_СЕРВЕРА")

echo -e "${GREEN}=====================================================${NC}"
echo -e "${GREEN}  Успешно! SysAdmin Pro запущен и готов к работе!    ${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo -e "Открыть в браузере: ${BLUE}http://${PUBLIC_IP}${NC}"
echo -e ""
echo -e "Полезные команды управления:"
echo -e "  Просмотр логов:   cd ${APP_DIR} && docker compose logs -f"
echo -e "  Перезапуск:       cd ${APP_DIR} && docker compose restart"
echo -e "  Остановка:        cd ${APP_DIR} && docker compose down"
echo -e "  Получение SSL:    apt install -y certbot python3-certbot-nginx"
