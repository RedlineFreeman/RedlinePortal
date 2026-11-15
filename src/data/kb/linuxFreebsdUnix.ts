import { KnowledgeEntry } from '../../types/knowledgeBase';

export const LINUX_FREEBSD_UNIX_ENTRIES: KnowledgeEntry[] = [
  // ==================== LINUX ====================
  {
    id: 'kb-linux-namespaces',
    section: 'Linux & ОС',
    category: 'Ядро и Процессы',
    title: 'Linux Namespaces: изоляция процессов и основа контейнеров',
    shortSummary: 'Механизм ядра для виртуализации системных ресурсов (PID, NET, MNT, IPC, UTS, User) на уровне одного процесса.',
    description: `Если cgroups ограничивают потребление ресурсов, то Namespaces определяют, ЧТО процесс видит вокруг себя. В Linux существует 8 типов пространств имен:
- PID (собственное дерево процессов, начиная с PID 1),
- NET (собственные сетевые интерфейсы, IP, таблицы маршрутизации и порты),
- MNT (изолированные точки монтирования файловой системы),
- UTS (отдельный hostname), IPC (очереди сообщений/shared memory), User (маппинг UID/GID: root внутри контейнера = обычный пользователь на хосте), Cgroup и Time.`,
    practicalUsage: 'Вся контейнеризация Docker, Podman, Kubernetes и LXC построена на комбинации Namespaces + cgroups v2 + OverlayFS.',
    commandsOrConfig: `# Просмотр активных пространств имен в системе
sudo lsns

# Вход в сетевой namespace запущенного процесса (для отладки контейнеров)
sudo nsenter -t <PID> -n ip addr
sudo nsenter -t <PID> -n ss -tulpn`,
    level: 'Middle',
    tags: ['Linux', 'Namespaces', 'Docker', 'LXC', 'nsenter', 'Kernel'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-linux-boot-systemd',
    section: 'Linux & ОС',
    category: 'Ядро и Процессы',
    title: 'Процесс загрузки Linux и архитектура systemd (Units & Targets)',
    shortSummary: 'Цепочка инициализации UEFI -> GRUB2 -> Kernel -> initramfs -> PID 1 systemd, написание unit-файлов.',
    description: `Загрузка сервера Linux проходит этапы:
1) Firmware (BIOS/UEFI) проверяет оборудование (POST) и запускает загрузчик с раздела EFI (/boot/efi).
2) GRUB2 загружает образ ядра vmlinuz и временную файловую систему в памяти initramfs (содержащую драйверы для LVM, RAID, шифрования LUKS).
3) Ядро монтирует реальный корень / и запускает первый процесс (PID 1) — systemd.
4) systemd параллельно поднимает зависимости (Targets: multi-user.target или graphical.target) и сервисы (.service, .socket, .timer, .mount).`,
    practicalUsage: 'Восстановление незагружаемого сервера через rescue/init=/bin/bash, оптимизация времени старта, оформление демонов приложений в production как systemd-сервисы с лимитами и автоперезапуском.',
    commandsOrConfig: `# Диагностика времени загрузки служб
systemd-analyze blame
systemd-analyze critical-chain

# Пример production unit-файла (/etc/systemd/system/myapp.service)
[Unit]
Description=My App Service
After=network-online.target postgresql.service

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/server
Restart=always
RestartSec=5
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target`,
    level: 'Junior',
    tags: ['Linux', 'systemd', 'GRUB2', 'initramfs', 'UEFI', 'Unit'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-linux-memory-oom',
    section: 'Linux & ОС',
    category: 'Ядро и Процессы',
    title: 'Управление памятью Linux: Page Cache, Swap и OOM Killer',
    shortSummary: 'Почему "свободной" RAM мало в Linux, как работает кэш страниц, vm.swappiness и защита сервисов от OOM Killer.',
    description: `Ядро Linux старается утилизировать свободную оперативную память под Page Cache (кэширование чтения с дисков), который мгновенно освобождается при запросе приложениями (поэтому ориентироваться нужно на колонку available в free -h, а не free).

Когда физическая RAM и Swap полностью исчерпаны, ядро вызывает Out-Of-Memory (OOM) Killer, который по показателю oom_score выбирает и принудительно завершает самый "прожорливый" процесс (часто СУБД или 1С), чтобы спасти ОС от зависания.`,
    practicalUsage: 'Настройка sysctl параметров для серверов баз данных (vm.swappiness = 1 или 10), установка oom_score_adj = -1000 для критичных демонов (sshd, postgresql) и мониторинг swap thrashing.',
    commandsOrConfig: `# Реальная картина доступной памяти и slab-кэша
free -h
cat /proc/meminfo | grep -E "MemAvailable|Cached|Dirty|Slab"

# Просмотр событий срабатывания OOM Killer в логах ядра
dmesg -T | grep -i -E "oom|killed process"

# Уменьшение агрессивности выгрузки в Swap для серверов БД
sudo sysctl -w vm.swappiness=1`,
    level: 'Middle',
    tags: ['Linux', 'RAM', 'Page Cache', 'OOM Killer', 'Swap', 'sysctl'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-linux-lvm2',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'LVM2 (Logical Volume Manager): PV, VG, LV и расширение дисков без простоя',
    shortSummary: 'Абстракция дискового пространства в Linux: объединение дисков в пулы, онлайн-изменение размеров и снапшоты.',
    description: `LVM2 добавляет гибкий слой поверх физических дисков:
- Physical Volume (PV) — инициализированный физический диск или раздел (/dev/sdb).
- Volume Group (VG) — общий пул дискового пространства из одного или нескольких PV.
- Logical Volume (LV) — виртуальный раздел внутри VG, на котором создается файловая система (ext4/xfs).
Главное преимущество: тома можно динамически расширять прямо на работающем сервере без размонтирования и перезагрузки.`,
    practicalUsage: 'Добавление нового виртуального диска в работающую ВМ под выросшую базу данных, создание временных консистентных снапшотов перед обновлением ПО.',
    commandsOrConfig: `# Полный цикл добавления нового диска /dev/sdc к существующему тому LV
sudo pvcreate /dev/sdc
sudo vgextend vg_data /dev/sdc
sudo lvextend -l +100%FREE -r /dev/vg_data/lv_postgres
# Флаг -r автоматически расширит ext4 или xfs файловую систему!

# Просмотр архитектуры PV / VG / LV
sudo pvs && sudo vgs && sudo lvs`,
    level: 'Junior',
    tags: ['Linux', 'LVM2', 'Хранилище', 'ext4', 'xfs', 'lvextend'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-linux-permissions-selinux',
    section: 'Linux & ОС',
    category: 'Безопасность и Права доступа',
    title: 'Права доступа Linux: RWX, SUID/Sticky Bit, POSIX ACL и SELinux/AppArmor',
    shortSummary: 'Дискреционное (DAC) и мандатное (MAC) разграничение доступа, расширенные списки прав и безопасность сервисов.',
    description: `Базовые права POSIX (DAC) задаются тремя триадами для владельца (u), группы (g) и остальных (o): r(4), w(2), x(1). Спецбиты: SUID (4000 — запуск с правами владельца файла, как /usr/bin/sudo), SGID (2000 — наследование группы в общих папках) и Sticky Bit (1000 — запрет удаления чужих файлов в /tmp).

Когда стандартных групп не хватает, применяют POSIX ACL (setfacl/getfacl). Дополнительно в корпоративных ОС работают системы мандатного доступа MAC: SELinux (RHEL/AlmaLinux) с контекстами безопасности и AppArmor (Ubuntu/Debian) с профилями путей.`,
    practicalUsage: 'Настройка общих каталогов совместной работы, изоляция веб-сервера Nginx/Apache от остальной ФС, устранение ошибок "Permission denied" при корректных chmod (проверка SELinux/AppArmor).',
    commandsOrConfig: `# Назначение прав для общего каталога отдела (SGID)
sudo chmod 2770 /srv/shared_1c

# Выдача точечных прав пользователю backup на каталог через ACL
sudo setfacl -R -m u:backup:rx /var/www/html
getfacl /var/www/html

# Проверка состояния SELinux и поиск заблокированных событий
getenforce
sudo ausearch -m avc -ts recent`,
    level: 'Middle',
    tags: ['Linux', 'chmod', 'SUID', 'ACL', 'SELinux', 'AppArmor'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-linux-logs-journald',
    section: 'Linux & ОС',
    category: 'Ядро и Процессы',
    title: 'Логирование в Linux: systemd-journald, rsyslog и logrotate',
    shortSummary: 'Анализ бинарных журналов journalctl, фильтрация по юнитам и времени, ротация текстовых логов.',
    description: `systemd-journald собирает логи ядра, загрузки, служб и stdout/stderr приложений в структурированном индексированном бинарном формате. Для пересылки по сети (SIEM/Graylog) или записи в традиционные файлы /var/log/syslog и /var/log/messages работает rsyslog. Утилита logrotate по расписанию сжимает (gzip/zstd) и удаляет старые файлы логов, отправляя демонам сигнал на переоткрытие файла.`,
    practicalUsage: 'Поиск причины падения сервиса за конкретный временной интервал, освобождение переполненного раздела /var, централизованный сбор логов с сотен серверов.',
    commandsOrConfig: `# Фильтрация логов конкретной службы за последний час с приоритетом ошибки
sudo journalctl -u nginx -u postgresql --since "1 hour ago" -p err..emerg

# Живой поток логов в реальном времени
sudo journalctl -f

# Очистка старых журналов с сохранением не более 500 МБ
sudo journalctl --vacuum-size=500M`,
    level: 'Junior',
    tags: ['Linux', 'journalctl', 'journald', 'rsyslog', 'logrotate', 'Логи'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== FREEBSD ====================
  {
    id: 'kb-freebsd-base-pkg-ports',
    section: 'FreeBSD & Unix',
    category: 'FreeBSD',
    title: 'Архитектура FreeBSD: Base System, пакеты pkg и Ports Collection',
    shortSummary: 'Единая целостная ОС (ядро + пользовательское окружение), разделение базовой системы и стороннего софта в /usr/local.',
    description: `В отличие от Linux (который является только ядром, а всё остальное собирается из разных проектов в дистрибутив), FreeBSD — это целостная операционная система, разрабатываемая одной командой. Базовая система (ядро, утилиты, компилятор, sshd) живет в /bin, /sbin, /usr/bin, а весь устанавливаемый администратором софт строго изолирован в /usr/local/ (конфиги в /usr/local/etc/).

ПО устанавливается либо в бинарном виде через быстрый менеджер pkg, либо собирается из исходных кодов через Ports Collection (/usr/ports) с кастомными опциями компиляции.`,
    practicalUsage: 'Высоконагруженные маршрутизаторы, пограничные фаерволы, серверы хранения данных (TrueNAS/ZFS) и стабильные веб/DNS-серверы, требующие предсказуемого обновления без поломки базовой ОС.',
    commandsOrConfig: `# Обновление базовой системы FreeBSD до патч-уровня безопасности
sudo freebsd-update fetch install

# Управление бинарными пакетами (pkg)
sudo pkg update && sudo pkg upgrade
sudo pkg install -y nginx postgresql16-server htop
pkg audit -F   # аудит уязвимостей установленных пакетов`,
    level: 'Middle',
    tags: ['FreeBSD', 'pkg', 'Ports', 'Base System', 'freebsd-update', 'Unix'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-freebsd-jails',
    section: 'FreeBSD & Unix',
    category: 'FreeBSD',
    title: 'FreeBSD Jails: изоляция на уровне ОС и менеджер Bastille',
    shortSummary: 'Предшественник современных контейнеров: безопасные изолированные окружения с собственным IP, root и ФС.',
    description: `Технология FreeBSD Jails появилась в 2000 году — задолго до Docker и LXC. Каждая "клетка" (Jail) имеет собственный корневой каталог (обычно ZFS dataset), процессы, пользователей (включая изолированного root) и собственный сетевой стек (VNET/epair или привязанный IP-адрес). Процессы внутри Jail физически не видят хост-систему и соседние клетки.`,
    practicalUsage: 'Размещение изолированных сервисов (веб-сервер, БД, почта, прокси) на одном сервере FreeBSD с нулевыми накладными расходами гипервизора и мгновенными ZFS-снапшотами каждой клетки.',
    commandsOrConfig: `# Просмотр запущенных Jails и вход внутрь клетки
jls
sudo jexec web_jail /bin/sh

# Работа с популярным менеджером клеток BastilleBSD
sudo bastille create nginx-jail 14.1-RELEASE 10.0.0.50 vtnet0
sudo bastille console nginx-jail`,
    level: 'Middle',
    tags: ['FreeBSD', 'Jails', 'Bastille', 'VNET', 'Контейнеризация'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-freebsd-pf-firewall',
    section: 'FreeBSD & Unix',
    category: 'FreeBSD',
    title: 'PF (Packet Filter): межсетевой экран, NAT и таблицы во FreeBSD',
    shortSummary: 'Декларативный синтаксис файрвола PF (портированного из OpenBSD), динамические таблицы блокировок и балансировка.',
    description: `PF (Packet Filter) — один из самых мощных и читаемых пакетных фильтров в мире (родом из OpenBSD, используется во FreeBSD и pfSense/OPNsense). Правила описываются в одном файле /etc/pf.conf, поддерживают макросы, динамические таблицы IP-адресов (для автоматического бана брутфорсеров), NAT/RDR-проброс портов и stateful-инспекцию соединений (keep state). В отличие от iptables, в PF срабатывает последнее совпавшее правило (если не указан модификатор quick).`,
    practicalUsage: 'Построение промышленных шлюзов безопасности (pfSense/OPNsense), защита серверов от сканирования и DDoS, маршрутизация через нескольких провайдеров.',
    commandsOrConfig: `# Пример конфигурации /etc/pf.conf
ext_if = "em0"
table <bruteforce> persist
set skip on lo0
scrub in all
nat on $ext_if from 10.0.0.0/24 to any -> ($ext_if)
block in quick from <bruteforce>
block in all
pass out all keep state
pass in on $ext_if proto tcp to port { 22, 80, 443 } keep state

# Проверка синтаксиса и применение правил без разрыва сессий
sudo pfctl -nf /etc/pf.conf && sudo pfctl -f /etc/pf.conf
sudo pfctl -t bruteforce -T show`,
    level: 'Middle',
    tags: ['FreeBSD', 'PF', 'Firewall', 'pfSense', 'OPNsense', 'NAT'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-freebsd-rc-bectl',
    section: 'FreeBSD & Unix',
    category: 'FreeBSD',
    title: 'Администрирование FreeBSD: rc.conf, sockstat и Boot Environments (bectl)',
    shortSummary: 'Управление службами и сетевой конфигурацией через /etc/rc.conf, мгновенный откат обновлений ОС с помощью bectl.',
    description: `Вся базовая конфигурация FreeBSD (hostname, IP-адреса, автозапуск сервисов, роутинг) централизована в текстовом файле /etc/rc.conf и изменяется командой sysrc. Для просмотра открытых портов используется встроенная утилита sockstat.

При установке FreeBSD на ZFS доступна киллер-фича Boot Environments (bectl): перед опасным обновлением создается клон корневой системы, и если система не загрузится, на экране загрузки можно в 1 клик откатиться к прошлой рабочей среде.`,
    practicalUsage: 'Безопасное обслуживание удаленных серверов с возможностью гарантированного отката за секунду при любой ошибке обновления.',
    commandsOrConfig: `# Включение и запуск службы через sysrc и service
sudo sysrc nginx_enable="YES"
sudo service nginx start

# Список слушающих сокетов (аналог ss во FreeBSD)
sockstat -4 -6 -l

# Создание Boot Environment перед обновлением и активация
sudo bectl create pre-upgrade-$(date +%F)
bectl list`,
    level: 'Middle',
    tags: ['FreeBSD', 'rc.conf', 'sysrc', 'bectl', 'sockstat', 'ZFS'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== UNIX ====================
  {
    id: 'kb-unix-philosophy-posix',
    section: 'FreeBSD & Unix',
    category: 'Архитектура и Философия Unix',
    title: 'Философия Unix, стандарт POSIX и концепция «Всё есть файл»',
    shortSummary: 'Фундаментальные принципы построения Unix-систем, переносимый стандарт POSIX и унифицированный файловый интерфейс.',
    description: `Философия Unix (Дуглас Макилрой, Кен Томпсон, Деннис Ритчи):
1) Каждая программа должна делать одну вещь и делать её хорошо.
2) Программы должны взаимодействовать друг с другом через универсальный текстовый поток (stdout -> pipe -> stdin).
3) «Всё есть файл» (Everything is a file): обычные файлы, каталоги, жесткие диски (/dev/sda), терминалы (/dev/tty), сетевые сокеты и даже состояние ядра (/proc) представлены как файловые дескрипторы, с которыми работают единые системные вызовы open(), read(), write(), close().

POSIX (Portable Operating System Interface) — набор стандартов IEEE, гарантирующий переносимость C-кода и shell-скриптов между Linux, FreeBSD, macOS и классическими Unix.`,
    practicalUsage: 'Понимание того, почему любые устройства, процессы и логи в Unix-подобных системах управляются едиными инструментами без специальных проприетарных API.',
    commandsOrConfig: `# Чтение устройства генерации случайных чисел и системной информации как обычных файлов
head -c 16 /dev/urandom | base64
cat /proc/cpuinfo | head -n 15

# Проверка соблюдения POSIX-синтаксиса в sh-скриптах
sh -n deploy.sh`,
    level: 'Junior',
    tags: ['Unix', 'POSIX', 'Everything is a file', 'KISS', 'Философия'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-unix-fhs-inodes',
    section: 'FreeBSD & Unix',
    category: 'Архитектура и Философия Unix',
    title: 'Unix FHS, индексные дескрипторы (inode), Hard и Soft ссылки',
    shortSummary: 'Внутреннее устройство файловой системы: почему удаленный файл может занимать место на диске и отличия ln от ln -s.',
    description: `В Unix имя файла хранится отдельно от его метаданных. Индексный дескриптор (inode) содержит метаданные файла (размер, права, UID/GID, временные метки и указатели на блоки данных на диске), но НЕ содержит его имени! Каталог — это просто таблица сопоставления [Имя файла -> Номер inode].

- Жесткая ссылка (Hard Link, ln) — новое имя, указывающее на тот же самый inode. Работает только в рамках одной ФС; данные удаляются с диска лишь тогда, когда число ссылок (Link Count) и число открытых файловых дескрипторов равны 0!
- Символическая ссылка (Symlink, ln -s) — отдельный файл с новым inode, хранящий текстовый путь к цели. Может указывать на каталоги и другие диски.`,
    practicalUsage: 'Решение классической аварии "df показывает 100% заполнения диска, а du видит только 20%": файл удален через rm, но все еще открыт запущенным процессом (lsof +L1).',
    commandsOrConfig: `# Проверка свободного места и исчерпания inode (частая проблема при миллионах мелких файлов)
df -h
df -i

# Просмотр inode файла и создание символической ссылки
ls -li /etc/nginx/nginx.conf
ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/

# Поиск удаленных файлов, всё ещё удерживаемых процессами
sudo lsof +L1`,
    level: 'Middle',
    tags: ['Unix', 'inode', 'FHS', 'Symlink', 'Hard Link', 'lsof'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-unix-processes-signals',
    section: 'FreeBSD & Unix',
    category: 'Архитектура и Философия Unix',
    title: 'Процессы в Unix: fork/exec, состояния (Z, D) и сигналы SIGTERM/SIGKILL',
    shortSummary: 'Жизненный цикл процесса, процессы-зомби, непрерываемый сон (I/O wait) и корректное завершение демонов.',
    description: `Новые процессы в Unix создаются через клонирование родителя системным вызовом fork() с последующей заменой образа программы через execve(). Основные состояния в ps/top:
- R (Running/Runnable): выполняется на CPU или ждет очереди.
- S (Interruptible Sleep): ждет события (сети, ввода).
- D (Uninterruptible Sleep): ждет завершения дискового I/O (нельзя убить даже через kill -9!).
- Z (Zombie): процесс уже завершился, но родитель еще не забрал его код возврата через wait().

Сигналы управления: SIGHUP (1 — перечитать конфиг без рестарта), SIGINT (2 — Ctrl+C), SIGTERM (15 — вежливая просьба завершиться и сохранить данные на диск) и SIGKILL (9 — мгновенное снятие процесса ядром без перехвата).`,
    practicalUsage: 'Безопасная перезагрузка Nginx (SIGHUP), корректная остановка БД перед бэкапом (никогда не начинать с kill -9 для PostgreSQL/1С!), диагностика зависшего диска по процессам в статусе D.',
    commandsOrConfig: `# Просмотр дерева процессов и их состояний (R, S, D, Z)
ps auxf

# Поиск процессов-зомби (Z) и их родителей (PPID)
ps -eo pid,ppid,stat,comm | awk '$3 ~ /Z|D/'

# Перечитать конфиг Nginx без разрыва активных клиентов
sudo kill -HUP $(cat /run/nginx.pid)`,
    level: 'Middle',
    tags: ['Unix', 'Процессы', 'Zombie', 'SIGTERM', 'SIGKILL', 'fork'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-unix-families-bsd-sysv',
    section: 'FreeBSD & Unix',
    category: 'Архитектура и Философия Unix',
    title: 'Семейства Unix: System V, BSD, Solaris/illumos, AIX и macOS (Darwin)',
    shortSummary: 'Эволюционное дерево Unix-систем: чем отличаются BSD-системы, коммерческие Unix и Linux.',
    description: `Исторический AT&T Unix (1969, Bell Labs) разделился на две главные ветви:
1) System V (SysV) — от него произошли коммерческие серверные ОС: Oracle Solaris (и открытый форк illumos/OmniOS), IBM AIX (для PowerPC) и HP-UX. Оттуда же пришла классическая SysV init-система с runlevels.
2) BSD (Berkeley Software Distribution) — подарила миру стек сокетов TCP/IP, редактор vi, csh и породила FreeBSD, OpenBSD (фокус на безопасность, OpenSSH, PF), NetBSD и ядро Darwin/XNU в основе Apple macOS.
Linux был написан Линусом Торвальдсом с нуля как Unix-подобное ядро (POSIX-совместимое), но без кода AT&T или BSD.`,
    practicalUsage: 'Ориентирование в корпоративной инфраструктуре крупных банков и телеком-операторов (где до сих пор работают Solaris/AIX/BSD), понимание различий в опциях ps, grep и скриптах.',
    commandsOrConfig: `# Определение ядра, архитектуры и ОС в любой Unix/POSIX системе
uname -a

# Пример отличия флагов ps (BSD-стиль vs SysV-стиль):
ps aux       # BSD-синтаксис (без дефиса)
ps -ef       # System V синтаксис (с дефисом)`,
    level: 'Junior',
    tags: ['Unix', 'BSD', 'System V', 'Solaris', 'AIX', 'macOS'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
];
