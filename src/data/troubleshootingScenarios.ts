import { TroubleshootingMission } from '../types/sysadmin';

export const TROUBLESHOOTING_MISSIONS: TroubleshootingMission[] = [
  {
    id: 'mission-nginx-502',
    title: 'Инцидент: Сайт выдает 502 Bad Gateway',
    severity: 'Критический',
    category: 'Web/Nginx',
    description:
      'Пользователи сообщают, что главный портал компании не открывается и выдает ошибку 502 Bad Gateway. Ваша задача — выяснить причину сбоя, исправить ее и восстановить работу веб-сервера.',
    symptoms: [
      'curl http://localhost возвращает "HTTP/1.1 502 Bad Gateway"',
      'В логах /var/log/nginx/error.log фиксируется "connect() failed (111: Connection refused)"',
      'Служба бэкенда app-backend.service находится в упавшем состоянии',
    ],
    initialState: {
      files: {
        '/etc/nginx/nginx.conf': `events { worker_connections 1024; }
http {
    upstream backend {
        server 127.0.0.1:8080;
    }
    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
}`,
        '/etc/systemd/system/app-backend.service': `[Unit]
Description=Core App Backend Service
After=network.target

[Service]
ExecStart=/usr/local/bin/python3 -m http.server 8080
Restart=on-failure
User=www-data

[Install]
WantedBy=multi-user.target`,
        '/var/log/nginx/error.log': `2026/10/31 10:14:02 [error] 1421#1421: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 127.0.0.1, server: localhost, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:8080/"`,
      },
      services: {
        nginx: {
          status: 'running',
          logs: ['nginx service is running normally on port 80'],
        },
        'app-backend': {
          status: 'failed',
          logs: [
            'app-backend.service: Main process exited, code=exited, status=1/FAILURE',
            'Failed with result "exit-code". Service crashed due to unhandled exception.',
          ],
        },
      },
      ports: [80],
    },
    goalDescription:
      'Запустите упавший бэкенд app-backend (или перезапустите его через systemctl restart app-backend) и проверьте, что curl http://localhost отдает HTTP 200 OK.',
    hint: 'Проверьте статус служб командой "systemctl status app-backend" и запустите ее: "systemctl restart app-backend". Затем проверьте "curl -I http://localhost".',
    solutionExplanation:
      'Ошибка 502 Bad Gateway возникает, когда Reverse Proxy (Nginx) пытается соединиться с upstream-сервером (в данном случае 127.0.0.1:8080), но на этом порту никто не слушает соединения (Connection Refused). Перезапуск упавшей службы восстановил доступность порта 8080.',
  },
  {
    id: 'mission-disk-full',
    title: 'Инцидент: Диск переполнен на 100% (/var/log)',
    severity: 'Критический',
    category: 'Storage/Logs',
    description:
      'Сервисы перестали записывать данные и базы данных падают в аварийный режим. Системный раздел переполнен до 100%. Необходимо найти гигантский файл, освободить место и восстановить нормальную работу.',
    symptoms: [
      'df -h показывает /dev/sda1 Use% 100%',
      'Попытка создать любой файл завершается ошибкой "No space left on device"',
      'Служба PostgreSQL не может записать WAL логи',
    ],
    initialState: {
      files: {
        '/var/log/debug_overflow.log': 'TRUNCATED_LOG_FILE_SIZE_48GB_OF_ENDLESS_STACKTRACES',
        '/etc/logrotate.d/app': `/var/log/debug_overflow.log {
    daily
    rotate 7
    compress
    missingok
}`,
      },
      services: {
        postgresql: {
          status: 'failed',
          logs: ['FATAL: could not write to log file: No space left on device'],
        },
      },
      ports: [],
    },
    goalDescription:
      'Найдите огромный лог-файл в /var/log, очистите его (truncate) и перезапустите службу postgresql.',
    hint: 'Используйте "du -sh /var/log/* | sort -h" или очистите лог через "truncate -s 0 /var/log/debug_overflow.log", затем "systemctl restart postgresql".',
    solutionExplanation:
      'При заполнении диска на 100% удаление файла через `rm` часто не освобождает место немедленно, если файл удерживается открытым дескриптором процесса (lsof | grep deleted). Очистка файла на лету через `> file` или `truncate -s 0` мгновенно возвращает свободные блоки файловой системы.',
  },
  {
    id: 'mission-ssh-firewall',
    title: 'Инцидент: Случайная блокировка SSH фаерволом',
    severity: 'Высокий',
    category: 'Firewall/SSH',
    description:
      'Младший администратор случайно применил правило `iptables -P INPUT DROP`, забыв разрешить входящий порт 22. Новые SSH подключения отваливаются по Connection Timed Out.',
    symptoms: [
      'Подключение ssh sysadmin@server зависает и завершается таймаутом',
      'iptables -L показывает политику DROP для цепочки INPUT без правила для порта 22',
      'Внешний мониторинг фиксирует потерю доступности узла',
    ],
    initialState: {
      files: {
        '/etc/iptables/rules.v4': `*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
COMMIT`,
      },
      services: {
        sshd: {
          status: 'running',
          logs: ['Server listening on 0.0.0.0 port 22'],
        },
      },
      ports: [22],
    },
    goalDescription:
      'Добавьте правило разрешения входящего трафика на порт 22: "iptables -A INPUT -p tcp --dport 22 -j ACCEPT" или переключите политику INPUT на ACCEPT.',
    hint: 'Выполните "iptables -A INPUT -p tcp --dport 22 -j ACCEPT" и проверьте статус фаервола "iptables -L -n -v".',
    solutionExplanation:
      'Политика по умолчанию DROP блокирует абсолютно все входящие пакеты. При настройке брандмауэра первым делом всегда открывают порт управления SSH (порт 22 или нестандартный), а также разрешают трафик локального интерфейса lo (loopback) и установленные соединения (ESTABLISHED, RELATED).',
  },
  {
    id: 'mission-dns-resolver',
    title: 'Инцидент: Сервер не может разрешать доменные имена',
    severity: 'Средний',
    category: 'DNS',
    description:
      'Скрипты бэкапов и обновление пакетов `apt update` завершаются ошибкой: "Temporary failure in name resolution". Сервер не может обратиться ни к одному внешнему хосту по имени.',
    symptoms: [
      'ping 8.8.8.8 работает, но ping google.com возвращает "Name or service not known"',
      'В файле /etc/resolv.conf указан несуществующий IP nameserver 192.0.2.99',
    ],
    initialState: {
      files: {
        '/etc/resolv.conf': 'nameserver 192.0.2.99\noptions timeout:2',
      },
      services: {
        'systemd-resolved': {
          status: 'stopped',
          logs: ['systemd-resolved stopped'],
        },
      },
      ports: [],
    },
    goalDescription:
      'Замените неработающий DNS сервер в /etc/resolv.conf на рабочий адрес (например, 8.8.8.8 или 1.1.1.1) и проверьте резолвинг командой "ping -c 1 google.com" или "dig google.com".',
    hint: 'Выполните: echo "nameserver 8.8.8.8" > /etc/resolv.conf или systemctl restart systemd-resolved.',
    solutionExplanation:
      'Если IP-маршрутизация исправна (L3), но имена не резолвятся (L7), виновником практически всегда является конфигурация резолвера в `/etc/resolv.conf` или падение локального кэширующего демона `systemd-resolved`.',
  },
  {
    id: 'mission-docker-crashloop',
    title: 'Инцидент: Контейнер приложения падает в CrashLoopBackOff',
    severity: 'Высокий',
    category: 'Containers',
    description:
      'Контейнер веб-приложения постоянно перезапускается каждые 5 секунд. Логи показывают ошибку подключения к базе данных из-за опечатки в переменной окружения DB_PORT.',
    symptoms: [
      'docker ps показывает статус Restarting (1) 3 seconds ago',
      'docker logs web-app показывает "Connection refused to database on port 5433"',
      'База данных запущена и слушает стандартный порт 5432',
    ],
    initialState: {
      files: {
        '/app/docker-compose.yml': `version: '3.8'
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
  web-app:
    image: node-backend:latest
    environment:
      DB_HOST: db
      DB_PORT: 5433 # ОШИБКА: порт должен быть 5432!
    restart: always`,
      },
      services: {
        'docker-db': {
          status: 'running',
          logs: ['PostgreSQL Database directory is ready on port 5432'],
        },
        'docker-web-app': {
          status: 'failed',
          logs: [
            'Attempting connection to db:5433...',
            'ECONNREFUSED: Connection refused to db:5433',
            'Fatal: cannot start server without database connection',
          ],
        },
      },
      ports: [5432],
    },
    goalDescription:
      'Исправьте порт DB_PORT на 5432 в docker-compose.yml и перезапустите контейнеры командой "docker compose up -d".',
    hint: 'Отредактируйте конфиг, заменив 5433 на 5432, затем выполните "docker compose up -d" или "docker restart web-app".',
    solutionExplanation:
      'В микросервисной архитектуре опечатка в конфигурациях портов и хостов — самая частая причина циклических перезапусков контейнеров (CrashLoopBackOff). Просмотр логов контейнера через `docker logs` мгновенно указывает на источник сбоя.',
  },
];
