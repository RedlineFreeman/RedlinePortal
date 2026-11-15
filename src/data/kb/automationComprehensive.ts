import { KnowledgeEntry } from '../../types/knowledgeBase';

export const AUTOMATION_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  // ==================== POWERSHELL ====================
  {
    id: 'kb-auto-powershell-modules-tasks-ps7',
    section: 'Автоматизация и Скрипты',
    category: 'PowerShell',
    title: 'PowerShell 5.1 vs PowerShell 7+ (pwsh), Модули, REST API и Планировщик задач (ScheduledTasks)',
    shortSummary: 'Эволюция до кроссплатформенного PowerShell 7, политики запуска ExecutionPolicy, работа с JSON/API (Telegram) и регистрация задач.',
    description: `В современной инфраструктуре сосуществуют две ветки PowerShell:
• Windows PowerShell 5.1 (powershell.exe) — встроен во все Windows 10/11 и Server 2016–2025, основан на .NET Framework, заморожен в развитии, но обязателен для ряда старых серверных модулей.
• PowerShell 7+ (pwsh.exe) — кроссплатформенная (Windows, Linux, macOS) Open Source версия на .NET Core/.NET 8+. Добавляет параллельные циклы (ForEach-Object -Parallel), тернарный оператор (?:), конвейерные цепочки (&& и ||) и в разы большую скорость!

Политика выполнения (ExecutionPolicy): защита от случайного запуска скриптов (не является строгой границей безопасности!). Основные режимы: Restricted (по умолчанию на клиентах), RemoteSigned (рекомендуется для серверов — локальные скрипты работают, скачанные требуют подписи), Bypass (для однократного запуска из планировщика/GPO).

Модули из PSGallery (Install-Module) расширяют возможности: ImportExcel (работа с .xlsx без установленного Excel!), VMware.PowerCLI, SqlServer, Posh-SSH. Командлет Invoke-RestMethod автоматически парсит JSON/XML ответы веб-сервисов в объекты PowerShell.`,
    practicalUsage: 'Отправка мгновенных алертов мониторинга в Telegram/Slack по HTTP API, автоматизация задач в Планировщике Windows без ручного кликанья в GUI, кроссплатформенные скрипты на Linux/Windows.',
    commandsOrConfig: `# Установка PowerShell 7 и полезного модуля для работы с Excel без MS Office
winget install Microsoft.PowerShell
Install-Module -Name ImportExcel -Scope CurrentUser -Force

# Разрешение локальных скриптов и разовый запуск с политикой Bypass
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "C:\\Scripts\\DailyReport.ps1"

# Отправка уведомления в Telegram Bot через Invoke-RestMethod
$token = $env:TG_BOT_TOKEN
$body = @{ chat_id = "-100123456789"; text = "SRV-1C: свободного места < 10%!" } | ConvertTo-Json
Invoke-RestMethod -Uri "https://api.telegram.org/bot$token/sendMessage" -Method Post -ContentType "application/json; charset=utf-8" -Body $body

# Создание задачи в Планировщике Windows на 02:00 каждый день от имени SYSTEM
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File C:\\Scripts\\Backup.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 2:00AM
Register-ScheduledTask -TaskName "NightlyBackup" -Action $action -Trigger $trigger -User "SYSTEM" -RunLevel Highest`,
    level: 'Middle',
    tags: ['PowerShell', 'pwsh', 'ExecutionPolicy', 'REST API', 'ScheduledTasks', 'Модули'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-auto-powershell-dsc-security-logging',
    section: 'Автоматизация и Скрипты',
    category: 'PowerShell',
    title: 'PowerShell в продакшене: логирование (Start-Transcript), безопасные пароли, реестр и NTFS-права',
    shortSummary: 'Запись полного протокола работы скрипта, защита учетных данных через DPAPI/SecretManagement и автоматизация реестра/ACL.',
    description: `Промышленные скрипты PowerShell должны быть проверяемыми и безопасными:
1. Логирование: встроенная пара Start-Transcript / Stop-Transcript записывает весь ввод/вывод консоли в текстовый лог-файл с таймстемпами. Для интеграции с SIEM/мониторингом используют Write-EventLog / New-WinEvent.
2. Безопасное хранение паролей: НИКОГДА не храните пароли открытым текстом в .ps1! Используйте переменные окружения, модуль Microsoft.PowerShell.SecretManagement (единое хранилище секретов) либо Export-Clixml (шифрует PSCredential через Windows DPAPI — расшифровать сможет только тот же пользователь на том же компьютере!).
3. Работа с реестром как с файловой системой: провайдеры HKLM: и HKCU: позволяют создавать ветки (New-Item) и менять параметры (Set-ItemProperty / Get-ItemPropertyValue) едиными файловыми командлетами.
4. Управление NTFS-правами: Get-Acl / Set-Acl или классический icacls.exe внутри скрипта.`,
    practicalUsage: 'Безопасная автоматизация сервисных учеток в ночных задачах, массовое исправление веток реестра по списку серверов и детальное журналирование действий администраторов.',
    commandsOrConfig: `# Логирование всей сессии скрипта в файл с датой
$logPath = "C:\\Logs\\script_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"
Start-Transcript -Path $logPath -Append
# ... код скрипта ...
Stop-Transcript

# Сохранение и чтение зашифрованного пароля (DPAPI - работает для того же User+PC)
(Get-Credential).ExportClixml("C:\\Scripts\\svc_cred.xml")
$cred = Import-Clixml "C:\\Scripts\\svc_cred.xml"

# Чтение и изменение параметра реестра (например, включение RDP)
$rdpPath = "HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server"
Set-ItemProperty -Path $rdpPath -Name "fDenyTSConnections" -Value 0`,
    level: 'Middle',
    tags: ['PowerShell', 'Start-Transcript', 'DPAPI', 'Реестр', 'ACL', 'Безопасность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== BASH & SHELL ====================
  {
    id: 'kb-auto-bash-functions-getopts-ssh',
    section: 'Автоматизация и Скрипты',
    category: 'Bash & Shell',
    title: 'Продвинутый Bash: функции, разбор флагов (getopts), условия [[ ]], Parameter Expansion и SSH-циклы',
    shortSummary: 'Написание гибких CLI-утилит на Bash с аргументами, ассоциативными массивами, подстановками строк и пакетным SSH/rsync.',
    description: `Чтобы Bash-скрипты легко поддерживались и не превращались в «лапшу», применяют продвинутые конструкции языка:

1. Условия [[ ... ]] вместо старых [ ... ]: внутри [[ ]] не падают пустые переменные без кавычек, работают логические операторы && / || и проверка регулярных выражений (=~)! Основные проверки файлов: -f (обычный файл), -d (каталог), -s (непустой файл), -x (исполняемый), строк: -z (пустая), -n (непустая).
2. Parameter Expansion (манипуляция строками без вызова sed/awk!):
• \${VAR:-default} — подставить default, если переменная не задана.
• \${VAR:?Error message} — аварийно завершить скрипт с сообщением, если переменная пуста!
• \${FILE%.*} — отрезать расширение файла; \${FILE##*/} — получить только имя файла (быстрее basename).
3. Разбор флагов getopts: превращает скрипт в профессиональную команду с ключами (например, ./deploy.sh -e prod -v).
4. Функции с local-переменными и ассоциативные массивы (declare -A) для словарей ключ-значение.
5. Неинтерактивный SSH в циклах: обязательны опции -o BatchMode=yes (не виснуть на запросе пароля!) и -o ConnectTimeout=5, а также < /dev/null в циклах while read, чтобы ssh не «съел» весь входной файл списка серверов!`,
    practicalUsage: 'Написание универсальных скриптов деплоя с ключами -h/-e/-d, пакетный сбор диагностики с десятков Linux-серверов по SSH без зависаний и быстрая обработка имен файлов в бэкапах.',
    commandsOrConfig: `#!/usr/bin/env bash
set -euo pipefail

ENV="staging"
VERBOSE=false

usage() { echo "Usage: $0 [-e env] [-v]"; exit 1; }

while getopts "e:vh" opt; do
  case "$opt" in
    e) ENV="$OPTARG" ;;
    v) VERBOSE=true ;;
    *) usage ;;
  esac
done

check_host() {
  local host="$1"
  ssh -n -o BatchMode=yes -o ConnectTimeout=5 "admin@\${host}" "uptime -p"
}

# Цикл чтения серверов из файла с защитой stdin (-n у ssh или < /dev/null)
while IFS= read -r srv; do
  [[ -z "$srv" || "$srv" == \\#* ]] && continue
  echo "=== $srv ($ENV) ==="
  check_host "$srv" || echo "WARN: $srv unreachable"
done < servers.txt`,
    level: 'Middle',
    tags: ['Bash', 'getopts', 'Parameter Expansion', 'SSH', 'Функции', 'Linux'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-auto-shell-posix-zsh-expect',
    section: 'Автоматизация и Скрипты',
    category: 'Bash & Shell',
    title: 'POSIX Shell (/bin/sh, Dash), Zsh, Fish, ShellCheck и Expect (автоматизация интерактивных диалогов)',
    shortSummary: 'Различия между /bin/sh и Bash в Alpine/Debian/FreeBSD, удобство Zsh/Fish, линтер ShellCheck и Expect для старых CLI.',
    description: `Термин «Shell» объединяет целое семейство командных оболочек, и незнание отличий часто ломает скрипты в Docker и на серверах:

1. POSIX Shell (/bin/sh, Dash в Debian/Ubuntu, Ash/BusyBox в Alpine Linux):
• В минимальных Docker-образах (alpine, debian-slim) часто НЕТ bash — там только /bin/sh!
• В /bin/sh НЕ работают «башизмы»: [[ ... ]], массивы arr=(...), конструкция {1..10}, подстановка <<< и команда source (вместо неё используют точку: . ./env.sh). Стандартные скрипты инициализации и Dockerfile-команды должны быть строго POSIX-совместимы.
2. Zsh (Z Shell) — стандартная оболочка macOS и популярная альтернатива для админов (с фреймворком Oh My Zsh, умным автодополнением, плагинами zsh-autosuggestions / syntax-highlighting и общим history между вкладками).
3. Fish (Friendly Interactive Shell) — сверхдружелюбная интерактивная оболочка с подсветкой и автоподсказками «из коробки» (но её синтаксис НЕ совместим с POSIX/Bash!).
4. ShellCheck — обязательный статический анализатор для bash/sh-скриптов: мгновенно находит забытые кавычки, башизмы в #!/bin/sh и потенциальные баги.
5. Expect (Tcl) — утилита автоматизации интерактивных программ (ssh без ключей, telnet на старых свитчах, интерактивный ввод пароля fdisk/passwd/ftp), считывающая вывод программы (expect "Password:") и имитирующая ввод с клавиатуры (send "secret\\r").`,
    practicalUsage: 'Написание переносимых скриптов для Dockerfile/Alpine/FreeBSD без башизмов, проверка всех рабочих скриптов через ShellCheck в CI и автоматизация устаревших интерактивных устройств через Expect.',
    commandsOrConfig: `# Проверка скриптов статическим анализатором ShellCheck
sudo apt install -y shellcheck
shellcheck -s sh entrypoint.sh        # Жесткая проверка на POSIX совместимость
shellcheck deploy.sh                  # Проверка Bash-скрипта

# Пример POSIX-совместимого скрипта (работает в Alpine, Debian dash, FreeBSD /bin/sh)
#!/bin/sh
set -eu
NAME="\${1:-world}"
if [ -n "$NAME" ]; then
  printf 'Hello, %s\\n' "$NAME"
fi

# Expect-скрипт для автоматического входа в интерактивный CLI (например, legacy Telnet)
#!/usr/bin/expect -f
set timeout 10
spawn telnet 192.168.1.2
expect "Username:"
send "admin\\r"
expect "Password:"
send "AdminPass123\\r"
expect "#"
send "show running-config\\r"
expect "#"
send "exit\\r"`,
    level: 'Middle',
    tags: ['Shell', 'POSIX', 'Dash', 'Zsh', 'Fish', 'ShellCheck', 'Expect', 'Alpine'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== WINDOWS BATCH (.BAT / .CMD) ====================
  {
    id: 'kb-auto-bat-cmd-basics',
    section: 'Автоматизация и Скрипты',
    category: 'Windows Batch (.bat / .cmd)',
    title: 'Windows Batch (.bat и .cmd): синтаксис, кодировка UTF-8, DelayedExpansion, циклы FOR и подпрограммы',
    shortSummary: 'Основы командных файлов Windows: разница .bat vs .cmd, переменная %~dp0, отложенное раскрытие !VAR! и разбор строк FOR /F.',
    description: `Пакетные файлы (.bat и .cmd) — старейший и до сих пор повсеместно применяемый инструмент автоматизации Windows (работает на абсолютно любой Windows без ExecutionPolicy и зависимостей — идеально для GPO Logon/Startup скриптов и тихих установщиков!).

Ключевые отличия и правила:
• .bat vs .cmd: в .cmd любая внутренняя команда (даже успешная, как SET или PATH) обновляет ERRORLEVEL, тогда как в .bat ERRORLEVEL менялся только при ошибке. В современных скриптах предпочтительнее .cmd.
• Кодировка и кириллица: для корректного вывода русских букв в файле UTF-8 (без BOM) первой строкой ставят chcp 65001 >nul.
• Скрытие вывода команд: @echo off в начале файла убирает дублирование самой команды в консоль.
• Текущая папка скрипта: %~dp0 (всегда раскрывается в полный путь к папке, где лежит сам .bat/.cmd, с завершающим слэшем!).
• Подводный камень циклов (DelayedExpansion): внутри скобок IF (...) или FOR (...) переменные %VAR% вычисляются ОДИН РАЗ до начала цикла! Чтобы читать меняющееся значение внутри цикла, включают setlocal EnableDelayedExpansion и обращаются к переменной через восклицательные знаки: !VAR!.
• Цикл FOR: FOR /F — парсит вывод команд или строки файлов; FOR /R — рекурсивно обходит каталоги; FOR /L — числовой счетчик (1,1,10).`,
    practicalUsage: 'Создание переносимых logon-скриптов Active Directory, инсталляторов ПО с флешки/сетевой шары и оберток для запуска системных утилит без ограничений PowerShell.',
    commandsOrConfig: `@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

REM Папка, из которой запущен скрипт (удобно для относительных путей)
set "SCRIPT_DIR=%~dp0"
echo Рабочий каталог: "%SCRIPT_DIR%"

REM Проверка существования файла и ветвление по коду ошибки
if not exist "C:\\Logs" mkdir "C:\\Logs"

REM Перебор строк из текстового файла или вывода команды (FOR /F)
set /a COUNT=0
for /f "usebackq tokens=1,2 delims=;" %%A in ("%SCRIPT_DIR%hosts.csv") do (
    set /a COUNT+=1
    echo [!COUNT!] Проверка узла %%A ^(IP: %%B^)
    ping -n 1 -w 500 %%B >nul
    if !errorlevel! equ 0 (
        echo    -^> ДОСТУПЕН
    ) else (
        echo    -^> НЕ ОТВЕЧАЕТ >> "C:\\Logs\\down.log"
    )
)
endlocal & exit /b 0`,
    level: 'Junior',
    tags: ['Batch', 'BAT', 'CMD', 'DelayedExpansion', 'FOR', 'ERRORLEVEL', 'Windows'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-auto-bat-sysadmin-tools',
    section: 'Автоматизация и Скрипты',
    category: 'Windows Batch (.bat / .cmd)',
    title: 'Боевой Windows Batch (.bat / .cmd): Robocopy, Forfiles, Schtasks, SC, Reg, Msiexec и проверка прав Admin',
    shortSummary: 'Готовые паттерны сисадминских батников: многопоточное зеркалирование файлов, ротация старых бэкапов, тихая установка ПО и службы.',
    description: `Вся мощь .bat/.cmd раскрывается при оркестровке штатных консольных утилит Windows:

1. Robocopy (Robust File Copy) — главный инструмент копирования и бэкапов: /MIR (полное зеркало с удалением лишнего), /E (с пустыми подпапками), /MT:16 (многопоточность), /R:3 /W:5 (3 попытки с паузой 5 сек при блокировке файла — иначе по умолчанию ждет миллион раз!), /Z (возобновляемый режим), /XD (исключить папки). Внимание: у robocopy коды возврата 0–7 означают УСПЕХ (например, 1 = файлы скопированы), а >=8 — реальную ошибку!
2. Forfiles — автоудаление файлов старше N дней (например, ротация ночных бэкапов или логов IIS старше 14 дней).
3. Net session >nul 2>&1 — стандартная проверка, запущен ли батник «От имени администратора».
4. SC (Service Control) — запуск, остановка, настройка автозапуска (config start= auto) и удаление служб.
5. REG ADD / REG DELETE — быстрая правка ключей реестра без подтверждений (/f).
6. Msiexec — тихое развертывание корпоративных пакетов (/i package.msi /qn /norestart).
7. Net use / Netsh — подключение сетевых дисков, настройка статических IP/DNS и правил Windows Firewall.`,
    practicalUsage: 'Надежные ежедневные бэкапы файловых шар через Robocopy, автоматическая очистка диска от старых архивов/логов и тихая установка программ через GPO или SCCM.',
    commandsOrConfig: `@echo off
chcp 65001 >nul

REM 1. Проверка прав администратора перед выполнением
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Запустите скрипт от имени Администратора!
    exit /b 1
)

REM 2. Многопоточный бэкап общей папки с ротацией лога (успех robocopy: код < 8)
robocopy "D:\\Shares\\Finance" "\\\\BACKUP-NAS\\Finance" /MIR /MT:16 /R:2 /W:3 /XD "$RECYCLE.BIN" "System Volume Information" /LOG+:"C:\\Logs\\robocopy.log"
if %errorlevel% geq 8 (
    echo [ALERT] Ошибка копирования Robocopy: %errorlevel%
    exit /b %errorlevel%
)

REM 3. Удаление архивов бэкапа старше 30 дней
forfiles /p "D:\\Backups\\1C" /s /m *.dt /d -30 /c "cmd /c del /q @path"

REM 4. Тихая установка MSI-пакета без перезагрузки и правка реестра
msiexec /i "\\\\srv-dc\\deploy\\7z24-x64.msi" /qn /norestart
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\System" /v EnableSmartScreen /t REG_DWORD /d 0 /f`,
    level: 'Junior',
    tags: ['Batch', 'BAT', 'CMD', 'Robocopy', 'Forfiles', 'Msiexec', 'SC', 'Reg'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== PYTHON ====================
  {
    id: 'kb-auto-python-sysadmin-core',
    section: 'Автоматизация и Скрипты',
    category: 'Python для Системного Администратора',
    title: 'Python для сисадмина: venv, pathlib, shutil, subprocess, argparse и логирование (RotatingFileHandler)',
    shortSummary: 'Когда пора переходить с Bash/Bat на Python: изолированные окружения, безопасный запуск ОС-команд, работа с ФС и нормальное логирование.',
    description: `Золотое правило DevOps и SRE: если ваш Bash-скрипт перевалил за 50–80 строк, требует сложной логики со словарями, обработки JSON/YAML или кроссплатформенности (Windows + Linux) — переписывайте его на Python 3!

Обязательный базовый стек стандартной библиотеки Python:
1. Виртуальные окружения (venv) — изоляция зависимостей проекта от системного Python ОС (в современных Debian 12 / Ubuntu 24.04 установка через pip напрямую в систему заблокирована ошибкой externally-managed-environment!).
2. pathlib (Path) — современная объектно-ориентированная работа с путями и файлами вместо устаревшего os.path (одинаково корректно склеивает пути на Windows и Linux).
3. shutil — рекурсивное копирование (copytree), перенос (move), проверка свободного места (disk_usage) и создание zip/tar архивов (make_archive).
4. subprocess.run — правильный запуск внешних программ. Всегда передавайте команду списком ["ls", "-la"], а НЕ строкой с shell=True, чтобы защититься от Command Injection! Параметр check=True автоматически выбросит исключение при ненулевом коде возврата.
5. argparse — профессиональный парсер флагов и --help для вашего скрипта за 5 строк кода.
6. logging (RotatingFileHandler) — автоматическая ротация лог-файлов по размеру, чтобы скрипт за год не забил весь диск.`,
    practicalUsage: 'Написание надежных утилит резервного копирования, ротации архивов, парсинга сложных логов и CLI-инструментов внутренней автоматизации ИТ-отдела.',
    commandsOrConfig: `# Создание и активация виртуального окружения venv в Linux / Windows
python3 -m venv /opt/scripts/venv
source /opt/scripts/venv/bin/activate      # Linux/macOS
# .\\venv\\Scripts\\Activate.ps1             # Windows PowerShell

# Пример продакшн-скрипта на Python (стандартная библиотека)
import argparse, logging, shutil, subprocess
from logging.handlers import RotatingFileHandler
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[RotatingFileHandler("/var/log/sys_maint.log", maxBytes=5_000_000, backupCount=3), logging.StreamHandler()]
)

parser = argparse.ArgumentParser(description="Проверка диска и бэкап конфигов")
parser.add_argument("--src", type=Path, default=Path("/etc/nginx"))
args = parser.parse_args()

total, used, free = shutil.disk_usage("/")
logging.info(f"Свободно на /: {free // (1024**3)} ГБ")

res = subprocess.run(["nginx", "-t"], capture_output=True, text=True, check=False)
if res.returncode == 0:
    shutil.make_archive("/var/backups/nginx_conf", "gztar", args.src)
    logging.info("Бэкап конфигурации Nginx успешно создан")`,
    level: 'Middle',
    tags: ['Python', 'venv', 'pathlib', 'subprocess', 'shutil', 'argparse', 'logging'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-auto-python-network-api-monitoring',
    section: 'Автоматизация и Скрипты',
    category: 'Python для Системного Администратора',
    title: 'Python в инфраструктуре: psutil (мониторинг), requests (REST API), Paramiko/Netmiko (SSH/Cisco) и JSON/YAML/CSV',
    shortSummary: 'Практические библиотеки Python для сбора системных метрик, работы с веб-API, управления Linux/Cisco по SSH и обработки конфигов.',
    description: `Поверх стандартной библиотеки экосистема PyPI (pip install) дает системному администратору мощные готовые модули:

1. psutil — кроссплатформенный сбор метрик ОС (CPU %, загрузка ядер, RAM/Swap, IOPS дисков, сетевые интерфейсы, список процессов и открытых сокетов) — без парсинга вывода top/free/df!
2. requests (или httpx) — эталонная библиотека для HTTP/HTTPS запросов, работы с REST API (GitLab, Jira, Zabbix, Proxmox API), отправки вебхуков и уведомлений в Telegram с таймаутами (timeout=10 обязателен, чтобы скрипт не завис навечно!).
3. json / pyyaml / csv / configparser — чтение и генерация конфигураций Ansible/Docker/Prometheus, инвентаризация таблиц CSV.
4. Paramiko — низкоуровневый SSHv2/SFTP клиент для удаленного выполнения команд на Linux-серверах и скачивания/загрузки файлов по SFTP из Python.
5. Netmiko — надстройка над Paramiko, специально заточенная под сетевое оборудование (Cisco IOS/NX-OS, MikroTik, Huawei, Juniper, Arista): сама понимает промпты enable/config t, постраничный вывод --More-- и делает бэкапы running-config с сотен коммутаторов за минуту!`,
    practicalUsage: 'Написание собственных ботов мониторинга и экспортеров Prometheus, массовый сбор конфигов с коммутаторов Cisco/MikroTik по расписанию и интеграция HR/AD/Zabbix через REST API.',
    commandsOrConfig: `# Установка ключевых библиотек автоматизации в venv
pip install psutil requests pyyaml paramiko netmiko

# Мониторинг ресурсов (psutil) + алерт в Telegram (requests)
import psutil, requests

cpu = psutil.cpu_percent(interval=1)
ram = psutil.virtual_memory().percent
if cpu > 90 or ram > 90:
    requests.post(
        "https://api.telegram.org/bot<TOKEN>/sendMessage",
        json={"chat_id": -100123456, "text": f"ALERT: CPU={cpu}%, RAM={ram}%"},
        timeout=10,
    )

# Автоматический бэкап конфигурации Cisco IOS через Netmiko
from netmiko import ConnectHandler

switch = {"device_type": "cisco_ios", "host": "10.0.1.10", "username": "admin", "password": "secret"}
with ConnectHandler(**switch) as conn:
    config = conn.send_command("show running-config")
    with open("sw_core_01.cfg", "w", encoding="utf-8") as f:
        f.write(config)`,
    level: 'Middle',
    tags: ['Python', 'psutil', 'requests', 'Paramiko', 'Netmiko', 'Cisco', 'REST API', 'JSON'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
