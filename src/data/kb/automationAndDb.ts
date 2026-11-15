import { KnowledgeEntry } from '../../types/knowledgeBase';

export const AUTOMATION_AND_DB_ENTRIES: KnowledgeEntry[] = [
  // ==================== BASH ====================
  {
    id: 'kb-bash-strict-mode',
    section: 'Автоматизация и Скрипты',
    category: 'Bash & Shell',
    title: 'Bash Strict Mode (set -euo pipefail), переменные и массивы',
    shortSummary: 'Написание отказоустойчивых производственных скриптов в Linux без тихого проглатывания ошибок.',
    description: `По умолчанию при ошибке одной команды Bash продолжает выполнять скрипт дальше — что может привести к катастрофе (например, cd /nonexistent упадет, а следующий rm -rf * удалит текущий каталог). Поэтому в начале продакшн-скриптов включают Unofficial Strict Mode:
- set -e (errexit): немедленный выход при ненулевом коде возврата команды.
- set -u (nounset): ошибка при обращении к неинициализированной переменной.
- set -o pipefail: код ошибки всего конвейера равен коду первой упавшей команды, а не последней.

Все переменные всегда оборачивают в двойные кавычки "$VAR" во избежание разбивки пробелов (word splitting).`,
    practicalUsage: 'Надежные скрипты резервного копирования, CI/CD пайплайнов, деплоя серверов и автоматического обслуживания БД.',
    commandsOrConfig: `#!/usr/bin/env bash
set -euo pipefail
IFS=$'\\n\\t'

BACKUP_DIR="/var/backups/db"
DATABASES=("app_prod" "analytics" "1c_base")

for db in "\${DATABASES[@]}"; do
  echo "[$(date +%FT%T)] Dumping \${db}..."
  pg_dump -Fc "\${db}" > "\${BACKUP_DIR}/\${db}_\$(date +%F).dump"
done`,
    level: 'Junior',
    tags: ['Bash', 'Strict Mode', 'pipefail', 'Shell', 'Автоматизация', 'Linux'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-bash-pipes-redirection',
    section: 'Автоматизация и Скрипты',
    category: 'Bash & Shell',
    title: 'Потоки Bash (stdin/stdout/stderr), конвейеры и перенаправления',
    shortSummary: 'Работа с файловыми дескрипторами 0, 1, 2, разделение вывода ошибок, tee и Here-Document (EOF).',
    description: `Каждый процесс в Bash получает три стандартных потока: 0 (stdin — ввод), 1 (stdout — обычный вывод) и 2 (stderr — поток ошибок). Операторы перенаправления позволяют разделять их или объединять:
- > file (перезапись stdout), >> file (дозапись в конец), 2> err.log (перенаправить только ошибки), &> all.log или > all.log 2>&1 (объединить оба потока).
- Команда tee одновременно выводит поток на экран и пишет в файл.
- Конвейер (|) передает stdout левой команды на stdin правой, а /dev/null выступает "черной дырой" для ненужного вывода.`,
    practicalUsage: 'Тихое выполнение cron-задач с логированием только ошибок, генерация конфигов из шаблонов через cat <<EOF, разбор логов веб-сервера на лету.',
    commandsOrConfig: `# Перенаправление обычного вывода и ошибок в разные файлы
./sync.sh > /var/log/sync.out 2> /var/log/sync.err

# Запись и вывод одновременно + отбрасывание ошибок поиска
find /etc -name "*.conf" 2>/dev/null | tee found_configs.txt

# Генерация файла конфигурации через Here-Document
cat << 'EOF' > /etc/sysctl.d/99-custom.conf
net.core.somaxconn = 4096
vm.swappiness = 10
EOF`,
    level: 'Junior',
    tags: ['Bash', 'stdout', 'stderr', 'Pipes', 'tee', 'Here-Doc'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-bash-text-grep-awk-jq',
    section: 'Автоматизация и Скрипты',
    category: 'Bash & Shell',
    title: 'Обработка текста в Bash: grep, sed, awk, jq и xargs',
    shortSummary: 'Золотой арсенал системного администратора для парсинга логов, массового редактирования конфигов и JSON API.',
    description: `Сила оболочки Bash заключается в конвейерной обработке структурированного и неструктурированного текста:
- grep (-E regex, -i без регистра, -r рекурсивно, -v инверсия) — поиск строк по шаблонам.
- sed (Stream Editor) — потоковая замена текста по регулярным выражениям (sed -i 's/old/new/g' file).
- awk — мощный построчный обработчик колонок и агрегатор (подсчет сумм, фильтрация столбцов лога).
- jq — стандартный процессор JSON для разбора ответов Docker/Kubernetes/REST API.
- xargs (-P параллельность) — превращает список строк из stdin в аргументы следующей команды.`,
    practicalUsage: 'Поиск топ-10 IP-адресов в access.log Nginx во время DDoS, массовое раскомментирование параметров в конфигах, парсинг API ответов в скриптах мониторинга.',
    commandsOrConfig: `# Топ-10 IP-адресов по числу запросов из лога Nginx
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 10

# Поиск 502 ошибок и подсчет кода ответа
grep -E " 502 | 504 " /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c

# Парсинг JSON ответа через jq
curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r '.tag_name'

# Параллельное сжатие старых логов с помощью xargs
find /var/log/app -name "*.log" -mtime +7 -print0 | xargs -0 -P 4 gzip`,
    level: 'Middle',
    tags: ['Bash', 'grep', 'sed', 'awk', 'jq', 'xargs', 'Парсинг'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-bash-trap-cron-timers',
    section: 'Автоматизация и Скрипты',
    category: 'Bash & Shell',
    title: 'Сигналы trap в Bash, планировщик cron и systemd timers',
    shortSummary: 'Гарантированная очистка временных файлов при прерывании скрипта и надежный запуск задач по расписанию.',
    description: `Команда trap в Bash регистрирует функцию-обработчик, которая выполнится при получении сигнала (EXIT, INT Ctrl+C, TERM), даже если скрипт упал посередине — это гарантирует удаление lock-файлов и временных директорий.

Для запуска задач по расписанию исторически применяется crontab (5 полей: минута час день месяц день_недели). Современная альтернатива — systemd timers, дающие интеграцию с journalctl, контроль перекрытий и запуск пропущенных задач после выключения сервера (Persistent=true).`,
    practicalUsage: 'Защита бэкап-скриптов от повторного параллельного запуска (flock + trap), регулярная проверка сертификатов SSL и ночные регламентные задания.',
    commandsOrConfig: `# Безопасный временный каталог с гарантированным удалением через trap
TMP_DIR=$(mktemp -d)
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT INT TERM

# Формат записи crontab: запуск ежедневно в 03:30 с блокировкой flock
# 30 3 * * * /usr/bin/flock -n /tmp/backup.lock /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# Список всех активных systemd таймеров
systemctl list-timers --all`,
    level: 'Middle',
    tags: ['Bash', 'trap', 'cron', 'systemd-timers', 'flock', 'Расписание'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== POWERSHELL ====================
  {
    id: 'kb-ps-object-pipeline',
    section: 'Автоматизация и Скрипты',
    category: 'PowerShell',
    title: 'Объектный конвейер PowerShell: командлеты Verb-Noun, Where и Select',
    shortSummary: 'Принципиальное отличие от Bash: передача живых .NET-объектов вместо текста, фильтрация и форматирование.',
    description: `В отличие от текстовых конвейеров Unix/Bash, PowerShell передает по пайплайну (|) структурированные объекты .NET со свойствами и методами. Это избавляет от необходимости "вырезать" колонки через awk/sed. Все встроенные команды (cmdlets) строго следуют стандарту именования Глагол-Существительное (Get-Service, Stop-Process, New-ADUser).

Базовый конвейер строится вокруг Where-Object (фильтрация по условиям), Sort-Object (сортировка), Select-Object (выбор свойств) и Export-Csv / ConvertTo-Json.`,
    practicalUsage: 'Мгновенная инвентаризация софта, служб, прав доступа и событий на Windows-серверах и выгрузка отчетов напрямую в CSV/Excel.',
    commandsOrConfig: `# Топ-5 процессов по потреблению рабочей памяти в МБ
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 5 Name, Id, @{N='RAM_MB';E={[math]::Round($_.WorkingSet64/1MB,1)}}

# Поиск остановленных служб с типом запуска "Авто" и попытка их старта
Get-Service | Where-Object { $_.StartType -eq 'Automatic' -and $_.Status -ne 'Running' } | Start-Service -WhatIf`,
    level: 'Junior',
    tags: ['PowerShell', 'Pipeline', 'Objects', 'Cmdlets', 'Windows', 'Автоматизация'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ps-ad-automation',
    section: 'Автоматизация и Скрипты',
    category: 'PowerShell',
    title: 'Автоматизация Active Directory через PowerShell (Bulk Onboarding & Audit)',
    shortSummary: 'Массовый импорт сотрудников из CSV, поиск неактивных компьютеров/учеток и контроль истекающих паролей.',
    description: `Модуль ActiveDirectory для PowerShell позволяет за секунды автоматизировать операции, которые в графической оснастке ADUC заняли бы часы. В сочетании с Import-Csv администратор может массово создавать учетные записи новых сотрудников, раскладывать их по нужным OU и группам AGDLP, а также проводить регулярный аудит информационной безопасности (поиск учеток, не входивших в сеть 90 дней, или пользователей с флагом PasswordNeverExpires).`,
    practicalUsage: 'Ежедневная автоматизация HR-заявок (Onboarding/Offboarding), зачистка устаревших записей компьютеров в домене и генерация отчетов по ИБ.',
    commandsOrConfig: `# Поиск доменных учеток, не входивших в систему более 90 дней
$cutoff = (Get-Date).AddDays(-90)
Get-ADUser -Filter {Enabled -eq $true -and LastLogonDate -lt $cutoff} -Properties LastLogonDate, Department |
  Select-Object Name, SamAccountName, Department, LastLogonDate |
  Export-Csv -Path "C:\\Reports\\InactiveUsers.csv" -NoTypeInformation -Encoding UTF8

# Массовое создание пользователей из CSV
Import-Csv "new_staff.csv" | ForEach-Object {
  New-ADUser -Name $_.FullName -SamAccountName $_.Login -Path $_.OU -AccountPassword (ConvertTo-SecureString $_.Pass -AsPlainText -Force) -Enabled $true
}`,
    level: 'Middle',
    tags: ['PowerShell', 'Active Directory', 'Import-Csv', 'Аудит', 'ADUC'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ps-winrm-remoting',
    section: 'Автоматизация и Скрипты',
    category: 'PowerShell',
    title: 'Удаленное управление WinRM и PowerShell Remoting (Invoke-Command)',
    shortSummary: 'Параллельное выполнение скриптов на десятках серверов по протоколам HTTP/HTTPS (5985/5986) с шифрованием Kerberos.',
    description: `PowerShell Remoting работает поверх протокола WinRM (WS-Management, порт TCP 5985 по умолчанию внутри домена с шифрованием Kerberos, или HTTPS 5986). В отличие от RDP, он не требует загрузки графической оболочки и практически не потребляет ресурсы удаленных хостов.

Командлет Invoke-Command позволяет в одном потоке разослать скрипт одновременно на 50–100 серверов (-ComputerName (Get-Content servers.txt)), получить структурированные объекты назад и объединить их с указанием поля PSComputerName.`,
    practicalUsage: 'Массовый сбор серийных номеров/версий BIOS, централизованный перезапуск служб, проверка свободного места на дисках всех серверов компании одной командой.',
    commandsOrConfig: `# Включение WinRM на сервере (по умолчанию включен в Windows Server)
Enable-PSRemoting -Force

# Интерактивная консольная сессия на удаленном сервере (аналог SSH)
Enter-PSSession -ComputerName SRV-1C-01

# Параллельный сбор свободного места на дисках C: со списка серверов
$servers = "DC01", "SRV-1C-01", "SRV-SQL-01"
Invoke-Command -ComputerName $servers -ScriptBlock {
  Get-PSDrive C | Select-Object @{N='FreeGB';E={[math]::Round($_.Free/1GB,2)}}
} | Format-Table PSComputerName, FreeGB`,
    level: 'Middle',
    tags: ['PowerShell', 'WinRM', 'Invoke-Command', 'Remoting', 'Windows Server'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ps-scripting-cim-errors',
    section: 'Автоматизация и Скрипты',
    category: 'PowerShell',
    title: 'Скриптинг PowerShell: CmdletBinding, Try/Catch и CIM/WMI (Get-CimInstance)',
    shortSummary: 'Обработка исключений ($ErrorActionPreference), параметры функций и опрос аппаратных датчиков через CIM.',
    description: `Для написания переиспользуемых модулей в скриптах применяют [CmdletBinding()] с блоком param() — это автоматически добавляет поддержку стандартных ключей -Verbose, -WhatIf и -Confirm. Важно помнить, что в PowerShell ошибки делятся на Terminating (останавливают выполнение) и Non-Terminating: чтобы блок try { ... } catch { ... } поймал ошибку командлета, нужно передать ему -ErrorAction Stop.

Устаревший Get-WmiObject (работал по DCOM/RPC) в современных версиях заменен на Get-CimInstance (работает по WinRM и поддерживается в кроссплатформенном PowerShell 7).`,
    practicalUsage: 'Создание надежных системных утилит с логированием в файл/EventLog и сбором аппаратных метрик материнской платы, RAM и дисков.',
    commandsOrConfig: `function Get-ServerHealth {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$ComputerName)

    try {
        $os = Get-CimInstance Win32_OperatingSystem -ComputerName $ComputerName -ErrorAction Stop
        $ramFreePct = [math]::Round(($os.FreePhysicalMemory / $os.TotalVisibleMemorySize) * 100, 1)
        Write-Output "[$ComputerName] Free RAM: $ramFreePct%"
    } catch {
        Write-Warning "Failed to query $ComputerName : $($_.Exception.Message)"
    }
}`,
    level: 'Middle',
    tags: ['PowerShell', 'Try-Catch', 'CIM', 'WMI', 'CmdletBinding', 'Скрипты'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== БАЗЫ ДАННЫХ ====================
  {
    id: 'kb-db-postgresql-admin',
    section: 'Базы данных',
    category: 'Реляционные СУБД (SQL)',
    title: 'PostgreSQL: MVCC, Shared Buffers, pg_hba.conf и pg_dump / pg_basebackup',
    shortSummary: 'Архитектура процессов Postgres, многоверсионность (Autovacuum), контроль доступа по сети и виды бэкапов.',
    description: `PostgreSQL использует процессную архитектуру (каждое соединение обслуживается отдельным backend-процессом, поэтому при >100–200 коннектов обязателен пулер соединений PgBouncer). Конкурентный доступ без блокировок чтения достигается моделью MVCC (Multi-Version Concurrency Control): старые версии строк остаются в таблицах как "мертвые кортежи" (dead tuples) и очищаются фоновым процессом Autovacuum.

Основные файлы конфигурации: postgresql.conf (память shared_buffers ~25% RAM, work_mem, max_connections) и pg_hba.conf (правила сетевой авторизации хостов и методов scram-sha-256).`,
    practicalUsage: 'Эксплуатация высоконагруженных веб-сервисов и баз 1С:Предприятие на Linux, логические бэкапы (pg_dump) и физические бэкапы всего кластера (pg_basebackup).',
    commandsOrConfig: `# Логический бэкап конкретной базы в сжатом custom-формате
pg_dump -U postgres -Fc -Z 6 -f /backups/prod_$(date +%F).dump prod_db

# Восстановление базы в 4 параллельных потока
pg_restore -U postgres -j 4 -d prod_db /backups/prod.dump

# Просмотр активных и зависших транзакций в psql
SELECT pid, state, now() - query_start AS duration, left(query, 80)
FROM pg_stat_activity WHERE state != 'idle' ORDER BY duration DESC;`,
    level: 'Middle',
    tags: ['PostgreSQL', 'MVCC', 'Autovacuum', 'pg_hba.conf', 'pg_dump', 'PgBouncer'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-db-mysql-mariadb',
    section: 'Базы данных',
    category: 'Реляционные СУБД (SQL)',
    title: 'MySQL / MariaDB: движок InnoDB, binlog, репликация и mysqldump',
    shortSummary: 'Поточная модель СУБД, пул буферов InnoDB, бинарный журнал транзакций и резервное копирование без блокировки таблиц.',
    description: `В отличие от PostgreSQL, MySQL/MariaDB имеет многопоточную архитектуру в рамках одного процесса mysqld. Основной движок хранения — InnoDB (полная поддержка ACID, строковых блокировок, внешних ключей и буфера памяти innodb_buffer_pool_size, куда для выделенного сервера БД отдают 60–75% всей RAM). Устаревший MyISAM не поддерживает транзакции и блокирует всю таблицу при записи.

Для репликации Master-Replica и восстановления PITR используется бинарный журнал (binlog в формате ROW).`,
    practicalUsage: 'Серверная база для веб-порталов (CMS, LAMP/LEMP-стек, WordPress, Zabbix), горячее резервное копирование и масштабирование чтения на реплики.',
    commandsOrConfig: `# Горячий консистентный дамп InnoDB без блокировки записи (--single-transaction)
mysqldump -u root -p --single-transaction --routines --triggers --events sysadmin_db > backup.sql

# Проверка состояния репликации на Replica-сервере
SHOW REPLICA STATUS\\G

# Проверка самых тяжелых таблиц и фрагментации
SELECT table_name, ROUND((data_length+index_length)/1024/1024, 2) AS size_mb
FROM information_schema.tables WHERE table_schema='sysadmin_db';`,
    level: 'Junior',
    tags: ['MySQL', 'MariaDB', 'InnoDB', 'binlog', 'mysqldump', 'LAMP'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-db-mssql-server',
    section: 'Базы данных',
    category: 'Реляционные СУБД (SQL)',
    title: 'Microsoft SQL Server (MSSQL): модели восстановления, TempDB и планы обслуживания',
    shortSummary: 'Работа с корпоративной СУБД Microsoft: файлы .mdf/.ldf, модели Simple vs Full, резервные копии и DBCC.',
    description: `База данных в MS SQL Server состоит из основного файла данных (.mdf/.ndf) и журнала транзакций (.ldf). Критически важно выбрать правильную Recovery Model:
- Simple — журнал транзакций очищается автоматически после checkpoint (проще администрировать, нельзя восстановиться на конкретную минуту).
- Full — сохраняет все транзакции в .ldf, позволяя делать Point-in-Time восстановление; но БЕЗ регулярного бэкапа лога транзакций файл .ldf вырастет и полностью забьет диск!

Временная база TempDB пересоздается при каждом рестарте; для высокой производительности ей выделяют по 1 файлу на ядро CPU (до 8 файлов равного размера).`,
    practicalUsage: 'Корпоративные установки 1С:Предприятие на Windows, ERP-системы, Always On Availability Groups для высокой доступности.',
    commandsOrConfig: `-- Проверка целостности базы данных
DBCC CHECKDB ('CorpDB_1C') WITH NO_INFOMSGS;

-- Полный сжатый бэкап и бэкап журнала транзакций
BACKUP DATABASE [CorpDB_1C] TO DISK = N'D:\\Backups\\CorpDB_Full.bak' WITH COMPRESSION, STATS = 10;
BACKUP LOG [CorpDB_1C] TO DISK = N'D:\\Backups\\CorpDB_Log.trn' WITH COMPRESSION;`,
    level: 'Middle',
    tags: ['MSSQL', 'SQL Server', '1С', 'TempDB', 'Recovery Model', 'DBCC'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-db-sqlite-embedded',
    section: 'Базы данных',
    category: 'Реляционные СУБД (SQL)',
    title: 'SQLite: встраиваемая файловая СУБД, режим WAL и FTS5',
    shortSummary: 'Надежная база данных без отдельного серверного процесса в одном кроссплатформенном файле .sqlite.',
    description: `SQLite — самая распространенная СУБД в мире (встроена в Android, iOS, браузеры, системные службы). Вся база, таблицы, индексы и триггеры хранятся в одном обычном файле на диске, а движок работает прямо внутри адресного пространства приложения без сетевых портов и настроек пользователей.

Включение режима журналирования PRAGMA journal_mode=WAL; позволяет параллельно читать базу многим потокам во время записи одного писателя, многократно повышая конкурентность. Модуль FTS5 обеспечивает быстрый полнотекстовый поиск.`,
    practicalUsage: 'Локальные кэши, автономные настольные и мобильные приложения, небольшие веб-сервисы и порталы (до сотен тысяч чтений в день) с тривиальным бэкапом копированием одного файла.',
    commandsOrConfig: `-- Включение оптимальных настроек производительности SQLite
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;

-- Безопасное горячее резервное копирование через CLI
sqlite3 app.db ".backup '/backups/app_safe.db'"`,
    level: 'Junior',
    tags: ['SQLite', 'WAL', 'FTS5', 'Embedded DB', 'SQL'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-db-redis-caching',
    section: 'Базы данных',
    category: 'NoSQL, Кэш и Оптимизация',
    title: 'Redis и Memcached: In-Memory кэш, структуры данных и Sentinel',
    shortSummary: 'Сверхбыстрое хранение ключей в оперативной памяти (sub-millisecond), брокер очередей и персистентность RDB/AOF.',
    description: `Redis хранит данные в оперативной памяти, выдавая ответы за доли миллисекунды (до 100k+ RPS на один узел). Поддерживает богатые структуры: строки, хэши, списки, множества и отсортированные множества (Sorted Sets). В отличие от чистого кэша Memcached, Redis умеет сохранять состояние на диск с помощью снимков RDB (быстрый рестарт) и журнала AOF (Append-Only File — минимальная потеря данных). Для автоматического переключения при отказе мастера используется Redis Sentinel.`,
    practicalUsage: 'Хранение сессий авторизации веб-приложений, кэширование тяжелых SQL-запросов, Rate Limiting (ограничение частоты запросов API), брокеры задач (Celery/BullMQ).',
    commandsOrConfig: `# Интерактивная консоль Redis и проверка статистики памяти
redis-cli INFO memory
redis-cli INFO stats | grep keyspace

# Мониторинг всех поступающих команд в реальном времени (осторожно на хайлоаде!)
redis-cli MONITOR`,
    level: 'Middle',
    tags: ['Redis', 'Memcached', 'NoSQL', 'Кэширование', 'RDB', 'AOF'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-db-indexes-explain',
    section: 'Базы данных',
    category: 'NoSQL, Кэш и Оптимизация',
    title: 'Индексы БД (B-Tree, GIN, Hash), нормализация и EXPLAIN ANALYZE',
    shortSummary: 'Почему запросы замедляются в 1000 раз при росте таблиц, как работают индексы и поиск узких мест через план запроса.',
    description: `Без индекса СУБД вынуждена читать всю таблицу целиком (Sequential Scan / Full Table Scan). Индекс B-Tree строит сбалансированное дерево поиска, позволяя находить нужную строку среди миллионов за 3–4 шага (O(log N)), а также ускоряет сортировки и диапазоны (>, <, BETWEEN). Индекс GIN применяется для массивов, JSONB и полнотекстового поиска.

Однако каждый лишний индекс замедляет операции INSERT/UPDATE/DELETE, так как требует перестроения дерева при записи. Команда EXPLAIN ANALYZE показывает реальный план выполнения запроса, число прочитанных строк и время каждого этапа.`,
    practicalUsage: 'Оптимизация "тормозящего" отчета в 1С или веб-приложении, выбор составных индексов (порядок колонок от самой селективной) и выявление отсутствующих индексов на внешних ключах.',
    commandsOrConfig: `-- Анализ реального плана и времени выполнения запроса в PostgreSQL
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, title FROM knowledge_entries WHERE section = 'Сети' AND level = 'Middle';

-- Создание индекса в продакшене БЕЗ блокировки записи в таблицу (CONCURRENTLY)
CREATE INDEX CONCURRENTLY idx_kb_section_level ON knowledge_entries (section, level);`,
    level: 'Middle',
    tags: ['Базы данных', 'Индексы', 'B-Tree', 'GIN', 'EXPLAIN ANALYZE', 'SQL'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
];
