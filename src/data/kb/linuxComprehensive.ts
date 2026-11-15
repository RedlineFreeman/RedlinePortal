import { KnowledgeEntry } from '../../types/knowledgeBase';

export const LINUX_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  // ==================== 1. ОПЕРАЦИОННАЯ СИСТЕМА И АРХИТЕКТУРА ====================
  {
    id: 'kb-linux-os-architecture',
    section: 'Linux & ОС',
    category: 'Архитектура ОС и Структура каталогов',
    title: 'Архитектура Linux: Kernel Space, User Space, Syscalls и модули ядра',
    shortSummary: 'Как устроена ОС Linux изнутри: монолитное модульное ядро, системные вызовы, библиотеки glibc/musl и взаимодействие с железом.',
    description: `Технически Linux — это монолитное ядро с поддержкой динамически загружаемых модулей (LKM — Loadable Kernel Modules, файлы .ko), а полноценная ОС (GNU/Linux или Alpine Linux) образуется сочетанием ядра, стандартной библиотеки Си (glibc или musl), системного менеджера (systemd/OpenRC), оболочки (Bash/sh) и утилит.

Память и привилегии процессора разделены на два уровня (кольца защиты x86_64):
1) Kernel Space (Ring 0) — ядро имеет прямой доступ к CPU, RAM, контроллерам дисков (NVMe/SATA) и сетевым картам. Внутри работают планировщик задач (CFS/EEVDF), менеджер памяти (MMU/slab), VFS (Virtual File System) и сетевой стек (Netfilter/TCP/IP).
2) User Space (Ring 3) — обычные программы и демоны (Nginx, PostgreSQL, Bash). Они изолированы: сбой программы не «роняет» ОС. Для доступа к файлам, сети или создания процессов программа обязана обратиться к ядру через системные вызовы (syscalls: open, read, write, execve, clone, socket) — обычно через обёртки glibc.`,
    practicalUsage: 'Понимание границы Kernel/User Space критично при диагностике высокой нагрузки %sys в top (слишком много syscalls или прерываний), подгрузке драйверов (modprobe) и выборе легковесных контейнеров (Alpine на musl vs Debian на glibc).',
    commandsOrConfig: `# Версия ядра, архитектура и параметры загрузки ядра
uname -a
cat /proc/cmdline

# Список загруженных модулей ядра (драйверы, ФС, фаервол) и информация о модуле
lsmod | head -n 20
modinfo nvme
sudo modprobe overlay        # подгрузить модуль без перезагрузки
sudo modprobe -r floppy      # выгрузить ненужный модуль

# Проверка используемой библиотеки C (glibc vs musl)
ldd --version | head -n 1`,
    level: 'Middle',
    tags: ['Linux', 'Kernel', 'User Space', 'Syscalls', 'modprobe', 'glibc', 'musl'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fhs-directories',
    section: 'Linux & ОС',
    category: 'Архитектура ОС и Структура каталогов',
    title: 'Иерархия каталогов Linux (FHS): где что расположено и что за что отвечает',
    shortSummary: 'Полный гид по файловой структуре Linux от корня / до /etc, /var, /usr, /opt, /boot, /dev, /proc, /sys и /run.',
    description: `Стандарт FHS (Filesystem Hierarchy Standard) задаёт единое дерево каталогов, начинающееся с корня / (в отличие от букв дисков C:\\ D:\\ в Windows):
• /bin и /sbin -> в современных дистрибутивах символические ссылки на /usr/bin и /usr/sbin: базовые программы пользователей (ls, cp, bash) и администратора (ip, fdisk, fsck).
• /etc -> ВСЕ системные и сервисные конфигурационные файлы (/etc/nginx, /etc/ssh, /etc/fstab). Никаких бинарников здесь нет.
• /var -> изменяемые данные времени работы: логи (/var/log), БД (/var/lib/postgresql, /var/lib/docker), кэш пакетов (/var/cache), почта и очереди (/var/spool). Главный кандидат на отдельный раздел, чтобы логи не забили корень /.
• /usr -> установленное ПО, библиотеки (/usr/lib), заголовочные файлы, документация (/usr/share) и локально скомпилированный софт (/usr/local).
• /opt -> крупные сторонние или проприетарные пакеты целиком в своей папке (/opt/1cv8, /opt/zabbix, /opt/google).
• /boot -> статические файлы загрузчика: ядро vmlinuz, initramfs и /boot/grub + раздел /boot/efi.
• /dev -> файлы устройств (блочные /dev/nvme0n1, /dev/sda; символьные /dev/tty, /dev/null, /dev/urandom).
• /proc и /sys -> виртуальные ФС ядра в RAM: процессы/память/параметры ядра (/proc) и топология железа/драйверов/cgroups (/sys).
• /run -> временные данные текущего запуска ОС (PID-файлы, сокеты Docker/systemd) в RAM (tmpfs), очищается при ребуте.
• /srv -> данные сервисов сервера (например, файлы FTP/HTTP сайтов).
• /home и /root -> домашние каталоги обычных пользователей и суперпользователя root (отдельно от /home, чтобы root мог войти при отвале /home).
• /tmp -> временные файлы программ (права 1777 со Sticky Bit), /mnt и /media -> точки ручного и автоматического монтирования дисков.`,
    practicalUsage: 'Мгновенная ориентация на любом сервере (Ubuntu, RHEL, Astra, Alpine): вы всегда точно знаете, где искать конфиги (/etc), куда писать данные сервиса (/var/lib или /opt), где лежат логи (/var/log) и почему нельзя чистить /proc или /dev.',
    commandsOrConfig: `# Просмотр дерева корневых каталогов и их размеров на реальных дисках
ls -la /
sudo du -h --max-depth=1 -x / | sort -hr

# Классические пути для веб-сервера и 1С:
# Конфиги:        /etc/nginx/nginx.conf
# Статика/данные: /var/www/site  или  /srv/www
# Логи:           /var/log/nginx/error.log
# PID и сокет:    /run/nginx.pid  (/run/postgresql/.s.PGSQL.5432)`,
    level: 'Junior',
    tags: ['Linux', 'FHS', '/etc', '/var', '/usr', '/opt', '/proc', '/sys', 'Каталоги'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-key-configs-proc-sys',
    section: 'Linux & ОС',
    category: 'Архитектура ОС и Структура каталогов',
    title: 'Ключевые системные файлы /etc и виртуальные каталоги /proc и /sys',
    shortSummary: 'За что отвечают /etc/passwd, /etc/shadow, /etc/hosts, /etc/resolv.conf, /etc/os-release и как диагностировать ОС через /proc.',
    description: `Знание критичных файлов в /etc и виртуальных счётчиков ядра избавляет от гадания при траблшутинге:
В /etc находятся:
• /etc/os-release — точное название и версия дистрибутива.
• /etc/hostname и /etc/hosts — локальное имя узла и статическое сопоставление IP ↔ домен (проверяется до DNS согласно /etc/nsswitch.conf).
• /etc/resolv.conf — адреса DNS-резолверов (nameserver 1.1.1.1) и search-домены.
• /etc/passwd — список пользователей, UID/GID, домашний каталог и shell (пароли здесь НЕ хранятся).
• /etc/shadow — хэши паролей и политики срока действия (читается только root).
• /etc/group — группы и их участники.

В /proc (procfs) каждый запущенный процесс имеет каталог /proc/<PID>/ со ссылкой на бинарник (exe), открытыми дескрипторами (fd), переменными окружения (environ) и командной строкой (cmdline). Глобальные файлы /proc/cpuinfo, /proc/meminfo, /proc/loadavg, /proc/mounts показывают состояние ядра напрямую.`,
    practicalUsage: 'Восстановление удалённого, но ещё открытого процессом файла через /proc/<PID>/fd/, проверка реальных DNS-серверов, аудит параметров ядра и чтение переменных окружения запущенного сервиса.',
    commandsOrConfig: `# Информация об ОС, CPU, RAM и текущей очереди нагрузки
cat /etc/os-release
lscpu | grep -E "Model name|CPU\\(s\\)"
cat /proc/loadavg

# Проверка порядка разрешения имён и текущих DNS
grep hosts /etc/nsswitch.conf
cat /etc/resolv.conf

# Посмотреть переменные окружения и реальный путь запуска процесса по PID
sudo tr '\\0' '\\n' < /proc/1234/environ
sudo ls -la /proc/1234/fd`,
    level: 'Junior',
    tags: ['Linux', '/etc/passwd', '/etc/shadow', '/etc/hosts', '/proc', '/sys', 'nsswitch'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-distros-families',
    section: 'Linux & ОС',
    category: 'Архитектура ОС и Структура каталогов',
    title: 'Семейства дистрибутивов Linux: Debian/Ubuntu, RHEL/Alma, Alpine, Arch и российские ОС',
    shortSummary: 'Чем отличаются дистрибутивы на одном ядре: пакетная база, цикл релизов, система инициализации и сценарии применения.',
    description: `Все дистрибутивы используют ядро Linux, но различаются системой пакетов, политикой обновлений, настройками безопасности по умолчанию и расположением некоторых конфигов (например, сетевые конфиги в /etc/netplan vs /etc/NetworkManager vs /etc/sysconfig/network-scripts):
1) Семейство Debian (Debian, Ubuntu LTS, Astra Linux, Linux Mint): .deb пакеты, APT/dpkg, AppArmor по умолчанию. Debian Stable — эталон предсказуемости; Ubuntu LTS — 5–10 лет поддержки и свежий софт для облаков/контейнеров; Astra Linux — отечественная сертифицированная ОС ФСТЭК с мандатным управлением доступом PARSEC.
2) Семейство RHEL (Red Hat Enterprise Linux, AlmaLinux, Rocky Linux, Oracle Linux, Fedora, РЕД ОС): .rpm пакеты, DNF, SELinux по умолчанию (Enforcing). Стандарт корпоративного энтерпрайза, 1С и банковской инфраструктуры.
3) Семейство SUSE / ALT (SLES, openSUSE, ALT Linux): RPM, уникальные инструменты YaST / snapper (откат системы на Btrfs), в ALT — apt-rpm и популярность в госсекторе РФ.
4) Alpine Linux: базируется на musl libc + BusyBox + OpenRC (без systemd). Образ весит ~5 МБ — мировой стандарт базовых Docker-образов.
5) Arch Linux: модель Rolling Release (всегда самые свежие версии без мажорных апгрейдов), менеджер pacman и AUR. Идеален для рабочих станций инженеров.`,
    practicalUsage: 'Выбор правильной ОС под задачу: AlmaLinux/РЕД ОС/Astra для серверов 1С и корпоративных систем с требованиями ИБ, Debian/Ubuntu LTS для веб-стека и Kubernetes-нод, Alpine для микросервисных Docker-образов.',
    commandsOrConfig: `# Определение семейства дистрибутива в кросс-платформенных скриптах
source /etc/os-release
echo "ID=$ID | LIKE=$ID_LIKE | VERSION=$VERSION_ID"

# Сравнение менеджеров пакетов:
# Debian/Ubuntu/Astra: apt install <pkg>   | конфиг сети: /etc/netplan/ или /etc/network/interfaces
# RHEL/Alma/РЕД ОС:    dnf install <pkg>   | конфиг сети: /etc/NetworkManager/system-connections/
# Alpine Linux:        apk add --no-cache <pkg> | службы: rc-service <name> start
# Arch Linux:          pacman -Syu <pkg>`,
    level: 'Junior',
    tags: ['Linux', 'Ubuntu', 'Debian', 'AlmaLinux', 'RHEL', 'Alpine', 'Astra Linux', 'РЕД ОС'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-users-pam-sudo',
    section: 'Linux & ОС',
    category: 'Архитектура ОС и Структура каталогов',
    title: 'Пользователи, группы, sudoers (visudo), PAM и терминалы (TTY/PTY)',
    shortSummary: 'Управление учётными записями, безопасное делегирование прав через sudo, архитектура модулей PAM и работа с оболочками.',
    description: `В Linux у каждого процесса есть числовые идентификаторы UID (User ID, где 0 = root, 1–999 = системные учётные записи служб, >=1000 = обычные пользователи) и GID (Group ID). Вся авторизация (вход по SSH, sudo, локальная консоль) проходит через стек PAM (Pluggable Authentication Modules, конфиги в /etc/pam.d/), который проверяет пароль, лимиты ресурсов (/etc/security/limits.conf), блокирует перебор (pam_faillock) или подключает AD/LDAP.

Делегирование админских прав выполняется через sudo. Правила в /etc/sudoers и /etc/sudoers.d/ редактируются ТОЛЬКО командой visudo, которая проверяет синтаксис перед сохранением (ошибка в sudoers заблокирует повышение прав).

Терминалы делятся на физические/виртуальные консоли (/dev/tty1..6) и псевдотерминалы (/dev/pts/0, 1...), которые создаются при подключении по SSH или открытии вкладки tmux.`,
    practicalUsage: 'Создание сервисных учётных записей без права интерактивного входа (/sbin/nologin), выдача разработчику права перезапускать только один сервис без пароля, настройка ulimit (max open files) для PostgreSQL/Nginx.',
    commandsOrConfig: `# Создание обычного пользователя с домашним каталогом и добавление в группу sudo/wheel
sudo useradd -m -s /bin/bash -G sudo deploy
sudo passwd deploy

# Создание системного пользователя службы без интерактивного входа
sudo useradd --system --no-create-home --shell /usr/sbin/nologin appservice

# Безопасное правило в /etc/sudoers.d/deploy (через sudo visudo -f /etc/sudoers.d/deploy)
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx, /usr/bin/systemctl status nginx

# Проверка текущих пользователей, их групп и открытых терминалов
id deploy
who -a
w`,
    level: 'Junior',
    tags: ['Linux', 'users', 'sudoers', 'visudo', 'PAM', 'TTY', 'PTS', 'limits'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-network-stacks',
    section: 'Linux & ОС',
    category: 'Архитектура ОС и Структура каталогов',
    title: 'Сетевые стеки и настройка сети в Linux: iproute2, Netplan, NetworkManager (nmcli) и systemd-networkd',
    shortSummary: 'От устаревшего ifconfig к iproute2, декларативный YAML в Ubuntu Netplan и управление соединениями через nmcli в RHEL/Alma.',
    description: `Сетевые интерфейсы в ядре Linux управляются через современный пакет iproute2 (команды ip, ss, tc — пришли на смену устаревшим ifconfig, route, netstat), но изменения через ip действуют только до перезагрузки. Для постоянного сохранения конфигурации дистрибутивы используют разные менеджеры:
• Netplan (Ubuntu Server 18.04+): администратор описывает сеть в YAML (/etc/netplan/*.yaml), а netplan apply транслирует её в бэкенд systemd-networkd (серверы) или NetworkManager (десктопы). Поддерживает безопасный тест netplan try с автооткатом через 120 секунд!
• NetworkManager + nmcli (RHEL, AlmaLinux, Rocky, Astra, РЕД ОС): профили хранятся в /etc/NetworkManager/system-connections/. Удобно настраивать VLAN (802.1Q), LACP Bonding, Bridge и статические маршруты.
• systemd-networkd: ультралёгкий и быстрый менеджер (.network/.netdev файлы в /etc/systemd/network/) для облаков и гипервизоров.`,
    practicalUsage: 'Настройка статических IP, агрегации портов (LACP bonding 802.3ad), VLAN-интерфейсов и мостов KVM без потери SSH-доступа на удалённом сервере.',
    commandsOrConfig: `# Базовая диагностика через iproute2 (работает во всех Linux)
ip -br -c addr show          # компактный цветной список интерфейсов и IP
ip -c route show             # таблица маршрутизации
ip neigh show                # ARP/NDP таблица соседей

# Настройка сети в RHEL/AlmaLinux через nmcli
sudo nmcli connection modify eth0 ipv4.addresses 10.10.1.50/24 ipv4.gateway 10.10.1.1 ipv4.dns "10.10.1.2 1.1.1.1" ipv4.method manual
sudo nmcli connection up eth0

# Безопасное применение YAML в Ubuntu (автооткат при потере связи за 120 сек)
sudo netplan try`,
    level: 'Middle',
    tags: ['Linux', 'iproute2', 'Netplan', 'NetworkManager', 'nmcli', 'systemd-networkd', 'Сеть'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 2. ВСЕ ВИДЫ ФАЙЛОВЫХ СИСТЕМ И ХРАНИЛИЩЕ ====================
  {
    id: 'kb-linux-fs-ext4-xfs',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'Классические журналируемые ФС Linux: ext4 и XFS',
    shortSummary: 'Устройство inode и журнала, сравнение ext4 и XFS, расширение и проверка целостности (fsck vs xfs_repair), резерв 5% для root.',
    description: `В Linux на серверах доминируют две журналируемые ФС:
1) ext4 (Fourth Extended Filesystem) — стандарт Debian/Ubuntu. Хранит метаданные файлов в структурах inode (права, владелец, временные метки, указатели на блоки/экстенты данных — имя файла хранится в каталоге!). Максимальный размер тома до 1 ЭБ, файла до 16 ТБ. Плюсы: невероятная стабильность, возможность как увеличения, так и уменьшения (shrink в offline через resize2fs). Нюанс: можно исчерпать inode (df -i) при миллионах мелких файлов, даже если место в ГБ ещё есть. По умолчанию резервирует 5% блока для root (на диске 4 ТБ это 200 ГБ!).
2) XFS — стандарт RHEL/AlmaLinux/CentOS для крупных хранилищ и СУБД. 64-битная архитектура с B+ деревьями и параллельным вводом-выводом (Allocation Groups) — отлично масштабируется на многоядерных серверах под NVMe. Главное ограничение: XFS можно ТОЛЬКО расширять (xfs_growfs), уменьшить существующий раздел XFS НЕЛЬЗЯ.`,
    practicalUsage: 'Выбор ext4 для корневых разделов и серверов с частым изменением размера; выбор XFS для многотерабайтных массивов 1С/PostgreSQL/ClickHouse и видеоархивов.',
    commandsOrConfig: `# Проверка свободного места и свободных INODE (частая причина "No space left on device")
df -hT
df -i

# Создание ФС ext4 и снятие лишнего 5% резерва на большом диске данных до 1%
sudo mkfs.ext4 -L data_vol /dev/sdb1
sudo tune2fs -m 1 /dev/sdb1

# Онлайн-расширение после увеличения блочного устройства
sudo resize2fs /dev/vg_data/lv_web      # для ext4
sudo xfs_growfs /mnt/db_data            # для XFS (указывается точка монтирования!)

# Проверка и починка размонтированной ФС
sudo fsck.ext4 -f -y /dev/sdb1
sudo xfs_repair /dev/sdc1`,
    level: 'Junior',
    tags: ['Linux', 'ext4', 'XFS', 'inode', 'tune2fs', 'xfs_growfs', 'Файловые системы'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fs-btrfs',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'Файловая система Btrfs (B-Tree FS): Subvolumes, Copy-on-Write, zstd и снапшоты',
    shortSummary: 'Современная встроенная в ядро Linux CoW-ФС: динамические сабволюмы, прозрачное сжатие, мгновенные снапшоты и дефрагментация.',
    description: `Btrfs (Better FS) — нативная для ядра Linux (лицензия GPL, в отличие от CDDL у ZFS) файловая система с Copy-on-Write (CoW), контрольными суммами данных и метаданных (CRC32C/xxhash64) и встроенным менеджером томов.
Ключевые особенности:
• Subvolumes (сабволюмы): логические разделы (@, @home, @var_log) внутри одного пула без жёсткого нарезания ГБ — делят общее свободное место и могут монтироваться с разными опциями.
• Снапшоты и инкрементальная репликация (btrfs send | btrfs receive): мгновенное замораживание состояния перед обновлением ОС (инструменты Timeshift, Snapper в SUSE/Fedora).
• Прозрачное сжатие данных налету (compress=zstd:3) экономит 30–50% места и ускоряет чтение.
Ограничение: для RAID5/6 в Btrfs сохраняется исторический риск write-hole (в продакшене рекомендуется только RAID0/RAID1/RAID10), а для высоконагруженных файлов БД с перезаписью (PostgreSQL/VM qcow2) применяют атрибут chattr +C (отключение CoW на папку).`,
    practicalUsage: 'Домашние и офисные рабочие станции, серверы с мгновенным откатом системы после неудачного apt upgrade (Snapper), NAS-хранилища с RAID1 и сжатием бэкапов.',
    commandsOrConfig: `# Создание Btrfs и подтомов (subvolumes)
sudo mkfs.btrfs -L rootfs /dev/nvme0n1p2
sudo mount /dev/nvme0n1p2 /mnt
sudo btrfs subvolume create /mnt/@
sudo btrfs subvolume create /mnt/@home

# Создание read-only снапшота и просмотр реального сжатия (compsize)
sudo btrfs subvolume snapshot -r /mnt/@ /mnt/@_snap_$(date +%F)
sudo compsize /

# Отключение CoW для каталога с образами ВМ или БД (исключаем фрагментацию)
sudo chattr +C /var/lib/libvirt/images
sudo btrfs scrub start -Bd /`,
    level: 'Middle',
    tags: ['Linux', 'Btrfs', 'CoW', 'Subvolume', 'Snapper', 'zstd', 'Файловые системы'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fs-virtual-overlay',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'Специальные и виртуальные ФС Linux: OverlayFS, tmpfs, ramfs, procfs и sysfs',
    shortSummary: 'Файловые системы, живущие в памяти или объединяющие слои: как работают слои Docker-образов и чем tmpfs отличается от ramfs.',
    description: `В Linux файловой системой считается любой объект, реализующий интерфейс VFS, даже если за ним нет физического диска:
1) OverlayFS (overlay2): объединяет два каталога в одну точку монтирования: read-only нижний слой (lowerdir — базовый образ Docker/LiveCD) и read-write верхний слой (upperdir — изменения контейнера). При редактировании файла с нижнего слоя срабатывает Copy-up в верхний слой, а при удалении создаётся скрытый whiteout-файл.
2) tmpfs: сверхбыстрая ФС в оперативной памяти (и частично Swap при нехватке RAM). Размер жёстко ограничивается опцией size= (по умолчанию до 50% RAM). Используется в /dev/shm, /run и часто для /tmp.
3) ramfs: устаревший предшественник tmpfs — НЕ имеет лимита размера и не уходит в Swap (бесконечная запись в ramfs вызовет Kernel Panic / OOM зависание!).
4) procfs (/proc), sysfs (/sys), devtmpfs (/dev), cgroup2 (/sys/fs/cgroup): псевдо-ФС ядра, отображающие структуры памяти ядра в виде обычных файлов, которые можно читать через cat и настраивать через echo.`,
    practicalUsage: 'Монтирование временных кэшей или сокетов в tmpfs для ускорения работы веб-сервисов и снижения износа SSD, понимание структуры /var/lib/docker/overlay2 при разборе утечки места на диске.',
    commandsOrConfig: `# Просмотр всех смонтированных физических и виртуальных ФС
findmnt -t ext4,xfs,btrfs,tmpfs,overlay

# Ручная сборка OverlayFS (принцип работы Docker-слоя)
sudo mount -t overlay overlay \\
  -o lowerdir=/srv/base_ro,upperdir=/srv/diff_rw,workdir=/srv/work \\
  /srv/merged

# Монтирование быстрого RAM-диска в /mnt/ramcache (строго до 1 ГБ)
sudo mount -t tmpfs -o size=1G,mode=1777 tmpfs /mnt/ramcache`,
    level: 'Middle',
    tags: ['Linux', 'OverlayFS', 'tmpfs', 'ramfs', 'procfs', 'sysfs', 'Docker'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fs-removable-fuse',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'Кроссплатформенные, флеш и FUSE ФС: FAT32, exFAT, NTFS3, F2FS, SquashFS и SSHFS',
    shortSummary: 'Все прочие виды ФС в Linux: загрузочный раздел EFI, флешки/диски Windows, SSD-оптимизированная F2FS, сжатый SquashFS и монтирование в User Space (FUSE).',
    description: `Помимо серверных ФС, в Linux активно применяются специализированные файловые системы:
• vfat (FAT32): обязательна для системного раздела загрузки UEFI (/boot/efi). Не поддерживает POSIX-права (uid/umask задаются при монтировании) и файлы >4 ГБ.
• exFAT: стандарт для больших USB-флешек и SD-карт (>4 ГБ), с ядра Linux 5.7 поддерживается нативным драйвером ядра (exfatprogs).
• NTFS3 / ntfs-3g: чтение и запись разделов Windows. Начиная с ядра Linux 5.15 встроен быстрый драйвер ядра ntfs3 (намного быстрее user-space ntfs-3g).
• F2FS (Flash-Friendly File System): разработана Samsung специально для NAND-памяти (eMMC, SD, смартфонные/встраиваемые SSD) с учётом архитектуры Log-Structured и снижения износа ячеек.
• SquashFS и ISO 9660: read-only сжатые ФС для LiveCD, пакетов Snap, AppImage и корневых образов embedded-устройств (OpenWrt).
• FUSE (Filesystem in Userspace): позволяет запускать драйверы ФС как обычные программы без риска уронить ядро. Примеры: sshfs (монтирование удалённого сервера по SSH как локальной папки), rclone mount (S3/Google Drive), encfs.`,
    practicalUsage: 'Настройка /boot/efi (vfat), перенос данных с Windows-дисков через ntfs3, прозрачное монтирование удалённого бэкап-сервера по SSHFS без настройки NFS/Samba.',
    commandsOrConfig: `# Монтирование Windows NTFS раздела через быстрый драйвер ядра ntfs3
sudo mount -t ntfs3 -o uid=1000,gid=1000 /dev/sdb1 /mnt/win_drive

# Форматирование загрузочного EFI-раздела (FAT32) и большой флешки (exFAT)
sudo mkfs.fat -F32 -n EFI /dev/nvme0n1p1
sudo mkfs.exfat -n FLASH64 /dev/sdc1

# Монтирование удалённой папки с другого сервера по SSH как локальной (FUSE)
sshfs admin@10.0.0.5:/var/backups /mnt/remote_bak -o reconnect,ServerAliveInterval=15
fusermount -u /mnt/remote_bak   # размонтировать FUSE`,
    level: 'Junior',
    tags: ['Linux', 'FAT32', 'exFAT', 'NTFS3', 'F2FS', 'SquashFS', 'FUSE', 'SSHFS'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-storage-fstab-mdadm-luks',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'Монтирование (/etc/fstab), программный RAID (mdadm) и шифрование дисков LUKS',
    shortSummary: 'Правила безопасного автоподключения дисков по UUID без риска остановить загрузку ОС, сборка программного RAID и полное шифрование дисков cryptsetup.',
    description: `Файл /etc/fstab описывает постоянные точки монтирования при старте ОС. Золотое правило: НИКОГДА не используйте имена устройств /dev/sdb1 (при добавлении контроллера или переключении SATA-портов буквы сместятся) — используйте неизменный UUID (blkid). Для внешних/второстепенных дисков всегда добавляйте опцию nofail (иначе при отвале одного диска сервер не загрузится и повиснет в Emergency Mode). Для SSD/NVMe полезны noatime (не писать на диск при каждом чтении файла) и периодический fstrim.

Программный RAID в Linux реализуется модулем ядра md (утилита mdadm): поддерживаются RAID 0, 1 (зеркало), 5, 6, 10 — часто используется для зеркалирования загрузочных NVMe без дорогого аппаратного контроллера.
Шифрование разделов на уровне блоков выполняется стандартом LUKS / dm-crypt (cryptsetup open/luksFormat) с аппаратным ускорением AES-NI.`,
    practicalUsage: 'Безопасное подключение дополнительного диска для бэкапов, защита дисков сервера от физической кражи в ЦОД через LUKS и развёртывание программного RAID1 под корневую ОС.',
    commandsOrConfig: `# Узнать UUID и тип ФС всех разделов и дисков
lsblk -f
sudo blkid

# Безопасная строка в /etc/fstab (6 полей: Устройство | Точка | ФС | Опции | dump | fsck)
UUID=8f3e12ab-4c11-4d9a-9001-123456789abc /mnt/backup ext4 defaults,noatime,nofail 0 2
# ОБЯЗАТЕЛЬНАЯ проверка fstab перед перезагрузкой! (в systemd-системах ещё нужен daemon-reload)
sudo systemctl daemon-reload && sudo mount -a

# Просмотр статуса программного RAID (mdadm) и шифрование раздела LUKS
cat /proc/mdstat
sudo mdadm --detail /dev/md0
sudo cryptsetup luksFormat /dev/sdb1
sudo cryptsetup open /dev/sdb1 secret_disk && sudo mkfs.ext4 /dev/mapper/secret_disk`,
    level: 'Middle',
    tags: ['Linux', 'fstab', 'UUID', 'mdadm', 'RAID', 'LUKS', 'cryptsetup', 'lsblk'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 3. ПРОГРАММЫ И КОМАНДЫ АДМИНИСТРИРОВАНИЯ ====================
  {
    id: 'kb-linux-cli-files-search-archives',
    section: 'Linux & ОС',
    category: 'Программы и Команды администрирования',
    title: 'Команды работы с файлами, поиском, правами, диском и архивами в Linux',
    shortSummary: 'Шпаргалка администратора на каждый день: ls, find, grep/rg, tar/zstd, du/ncdu, ln, rsync и анализ занятого места.',
    description: `Базовый набор CLI-утилит позволяет решать 90% задач на любом Linux-сервере за секунды:
• Навигация и файлы: ls -lahtr (сортировка по времени изменения), mkdir -p, cp -a (копирование с сохранением прав, владельца и симлинков), ln -s (создание символической ссылки), stat (полные метаданные файла: права в цифрах, inode, mtime/ctime).
• Поиск файлов и текста: find позволяет искать по имени, размеру (-size +100M), дате модификации (-mtime -7) и выполнять действия (-exec / -delete). Для сверхбыстрого поиска кода/логов по проектам применяют modern-аналоги ripgrep (rg) и fd.
• Анализ места на диске: df -hT (свободное место на разделах), du -sh * (размер папок), ncdu (интерактивный псевдографический анализатор — мгновенно находит, что съело диск).
• Архивы и передача: tar с компрессией gzip (.tar.gz), xz (.tar.xz) или сверхбыстрым zstd (.tar.zst), а также rsync для возобновляемого копирования с дельта-сверкой.`,
    practicalUsage: 'Поиск и очистка гигабайтных забытых дампов/логов, быстрое развёртывание симлинков для конфигов Nginx (sites-enabled), резервное архивирование каталогов с сохранением прав.',
    commandsOrConfig: `# Топ-15 самых тяжёлых папок/файлов в текущей директории + интерактивный ncdu
du -xhd1 . | sort -hr | head -n 15
sudo ncdu -x /var

# Поиск больших файлов (>500 МБ) или старых логов (>30 дней) с удалением
sudo find /var/log -type f -name "*.log*" -mtime +30 -delete
sudo find / -xdev -type f -size +500M -exec ls -lh {} +

# Упаковка и распаковка архивов tar (gz и современный быстрый zstd)
tar -czvf backup.tar.gz /etc/nginx /etc/letsencrypt
tar --zstd -cvf db_dump.tar.zst /var/backups/pg/
tar -xvf backup.tar.gz -C /tmp/restore/

# Создание символической ссылки (Symlink) и проверка
ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/`,
    level: 'Junior',
    tags: ['Linux', 'CLI', 'find', 'tar', 'zstd', 'ncdu', 'du', 'rsync', 'symlink'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-cli-performance-use',
    section: 'Linux & ОС',
    category: 'Программы и Команды администрирования',
    title: 'Программы мониторинга и диагностики производительности: htop, iostat, vmstat, iotop, sar и dmesg',
    shortSummary: 'Поиск узких мест (CPU, RAM, Disk I/O, Network) по методу Брендана Грегга (USE Method) за 60 секунд на сервере.',
    description: `Когда сервер «тормозит», не нужно гадать — нужно за минуту определить подсистему-бутылочное горлышко:
• uptime / top / htop / btop: смотрим Load Average (среднее число процессов в очереди на CPU или в состоянии D — ожидание диска). Важно %wa (iowait) — если оно высоко, процессор простаивает в ожидании медленного диска!
• vmstat 1: даёт моментальный срез раз в секунду: процессы в очереди (r), заблокированные I/O (b), переключения контекста (cs), прерывания (in), активность Swap (si/so — если > 0, система задыхается от нехватки RAM).
• iostat -xz 1 (из пакета sysstat): загрузка каждого диска (%util), очередь запросов (aqu-sz) и задержка чтения/записи (r_await / w_await в мс; >20 мс на SSD = деградация или перегрузка).
• iotop -oPa: показывает конкретный процесс, который прямо сейчас нагружает диск чтением/записью.
• sar (sysstat): «чёрный ящик» истории нагрузок (показывает, что творилось с CPU/RAM/дисками вчера ночью в 03:00).
• dmesg -T: кольцевой буфер сообщений ядра — сразу выявляет аппаратные ошибки I/O на дисках, отвал сетевого линка и срабатывание OOM Killer.`,
    practicalUsage: 'Первичный триаж любого инцидента производительности («база тормозит», «SSH долго открывается», «высокий Load Average при 10% CPU»).',
    commandsOrConfig: `# Установка комплекта системной диагностики
sudo apt install -y htop iotop sysstat ncdu dstat   # или dnf install -y htop iotop sysstat ncdu

# 1. Нагрузка на каждый диск, IOPS и миллисекунды задержки (await)
iostat -xz 1

# 2. Общий срез CPU / RAM / Swap / Context Switches каждую секунду
vmstat -S M 1

# 3. Какой процесс грузит диск прямо сейчас (только активные)
sudo iotop -oPa

# 4. Проверка ошибок железа, I/O и OOM в буфере ядра с читаемым временем
sudo dmesg -T --level=err,warn | tail -n 30

# 5. Историческая нагрузка за текущий день из sysstat (sar)
sar -u -r -d 10`,
    level: 'Middle',
    tags: ['Linux', 'htop', 'iostat', 'vmstat', 'iotop', 'sar', 'dmesg', 'Мониторинг'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-cli-process-debug',
    section: 'Linux & ОС',
    category: 'Программы и Команды администрирования',
    title: 'Глубокая отладка процессов, сокетов и файлов: lsof, strace, fuser, pkill и сигналы',
    shortSummary: 'Как выяснить кто держит удалённый файл (место не освободилось), какой процесс занял порт и на каком syscall зависла программа.',
    description: `Классические проблемы Linux, которые не видны в обычных логах, решаются тройкой утилит:
• lsof (List Open Files): в Unix «всё есть файл» (обычные файлы, каталоги, сетевые сокеты, пайпы). Помогает: 1) найти процесс, занявший порт 8080; 2) увидеть удалённые, но не закрытые файлы ((deleted)) — классическая причина, когда файл access.log удалили через rm, а df -h всё ещё показывает 100% заполнения диска, потому что Nginx держит дескриптор открытым!
• fuser: показывает PID процессов, использующих файл или точку монтирования (незаменимо при ошибке umount: target is busy).
• strace: трассирует все системные вызовы и сигналы процесса в реальном времени. Мгновенно показывает, какой именно конфиг-файл не может открыть программа (ENOENT), куда она пытается подключиться по сети (connect) и на чём зависла.
• Управление процессами и сигналы: kill -15 (SIGTERM — вежливое завершение с сохранением данных), kill -1 (SIGHUP — перечитать конфиг без разрыва), kill -9 (SIGKILL — принудительное убийство ядром, применять в крайнем случае!).`,
    practicalUsage: 'Освобождение «исчезнувшего» места на диске без перезагрузки сервера (truncate или SIGHUP), размонтирование зависших NFS/USB дисков, отладка сторонних бинарников без исходного кода.',
    commandsOrConfig: `# Найти удалённые файлы, которые всё ещё открыты процессами и занимают диск!
sudo lsof +L1

# Кто занимает TCP-порт 8080 или мешает размонтировать /mnt/data
sudo lsof -i :8080
sudo fuser -mv /mnt/data

# Трассировка системных вызовов запускаемой или уже работающей (PID) программы
strace -f -e trace=file,network nginx -t 2>&1 | grep -E "openat|connect"
sudo strace -p <PID> -s 200

# Грамотная отправка сигналов по имени процесса
sudo pkill -HUP nginx        # перечитать конфиги без простоя
sudo kill -TERM <PID>        # корректная остановка (всегда пробуем ДО kill -9)`,
    level: 'Middle',
    tags: ['Linux', 'lsof', 'strace', 'fuser', 'kill', 'SIGTERM', 'Отладка'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-essential-tools',
    section: 'Linux & ОС',
    category: 'Программы и Команды администрирования',
    title: 'Незаменимые программы в консоли Linux: tmux, vim/nano, jq, curl, chrony, smartctl и dmidecode',
    shortSummary: 'Набор обязательных утилит сисадмина: сохранение сессии при обрыве SSH, JSON-парсинг, точное время NTP и проверка здоровья железа.',
    description: `Профессиональная работа в Linux невозможна без базового инструментария:
1) tmux (терминальный мультиплексор): создаёт виртуальные сессии на сервере. Если вы запустили долгое обновление базы или миграцию, и у вас оборвался интернет/VPN — процесс внутри tmux продолжит работать! При переподключении tmux attach вернёт вас ровно в то же место экрана. Также позволяет делить окно на панели.
2) vim и nano: два главных консольных редактора. nano интуитивен (Ctrl+O сохранить, Ctrl+X выйти), а vim есть на 100% Linux/Unix систем (даже в rescue-режиме): режимы Normal/Insert (i)/Command (:wq — сохранить и выйти, :q! — выйти без сохранения, /текст — поиск, dd — удалить строку).
3) jq и curl/httpie: тестирование REST API и форматирование/фильтрация JSON прямо в консоли.
4) chrony (chronyc): современный демон точного времени NTP (критично для Kerberos/AD, кластеров БД, 1С и TLS).
5) smartctl (smartmontools) и dmidecode / lspci / lsusb: проверка износа SSD/SMART-ошибок дисков, моделей планок RAM и BIOS.`,
    practicalUsage: 'Запуск любых долгих операций (обновления ОС, pg_dump, ansible) строго внутри tmux, правка конфигов в аварийной консоли в vim, мониторинг остаточного ресурса NVMe-накопителей.',
    commandsOrConfig: `# Работа с tmux (префикс Ctrl+b, затем: d = отключиться, % = сплит вертикально)
tmux new -s work             # создать сессию work
tmux ls                      # список активных сессий
tmux attach -t work          # вернуться в сессию после обрыва SSH

# Проверка точного времени (chrony) и аппаратного здоровья дисков (SMART)
chronyc tracking && chronyc sources -v
sudo smartctl -a /dev/nvme0n1 | grep -E "Critical|Percentage Used|Media"

# Паспорт сервера (модель платы, серийник, слоты RAM) и парсинг API через jq
sudo dmidecode -t system -t memory | head -n 35
curl -s https://api.github.com/repos/nginx/nginx | jq '{name, stars: .stargazers_count}'`,
    level: 'Junior',
    tags: ['Linux', 'tmux', 'vim', 'nano', 'jq', 'chrony', 'smartctl', 'dmidecode'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-sysctl-auditd',
    section: 'Linux & ОС',
    category: 'Программы и Команды администрирования',
    title: 'Тонкая настройка ядра Linux (sysctl) и подсистема аудита (auditd)',
    shortSummary: 'Оптимизация сетевого стека, очередей сокетов и защиты от атак в /etc/sysctl.d/ + расследование кто и что менял через auditd.',
    description: `Утилита sysctl позволяет динамически менять сотни параметров ядра через интерфейс /proc/sys/ (постоянные настройки кладут в отдельные файлы /etc/sysctl.d/99-custom.conf). Это необходимо для превращения Linux в маршрутизатор (net.ipv4.ip_forward = 1), настройки BBR, увеличения очереди входящих подключений (net.core.somaxconn) под высоконагруженный Nginx и базового сетевого харденинга (защита от IP spoofing и SYN-флуда).

Подсистема auditd ведёт неизменяемый криминалистический журнал действий на уровне ядра (/var/log/audit/audit.log): кто, когда и какой процесс изменил файл /etc/passwd, /etc/ssh/sshd_config или вызвал sudo.`,
    practicalUsage: 'Включение NAT/маршрутизации на Linux-шлюзе, устранение дропов пакетов на высоконагруженных веб-серверах (conntrack/somaxconn), соответствие требованиям ИБ (ФСТЭК, PCI DSS) по аудиту изменений критичных файлов.',
    commandsOrConfig: `# Продакшн-профиль сетевого тюнинга и харденинга (/etc/sysctl.d/99-hardening.conf)
net.ipv4.ip_forward = 0                 # ставим 1, если сервер работает как VPN/NAT роутер
net.ipv4.tcp_syncookies = 1             # защита от SYN flood
net.ipv4.conf.all.rp_filter = 1         # защита от IP-спуфинга
net.ipv4.conf.all.accept_redirects = 0  # запрет подмены маршрутов через ICMP
net.core.somaxconn = 4096               # увеличение очереди сокетов для Nginx/HAProxy
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr   # современный алгоритм контроля перегрузок TCP BBR

# Применить все конфиги sysctl без перезагрузки
sudo sysctl --system

# Добавление правила аудита на отслеживание любых изменений /etc/sudoers
sudo auditctl -w /etc/sudoers -p wa -k sudoers_changes
sudo ausearch -k sudoers_changes`,
    level: 'Senior',
    tags: ['Linux', 'sysctl', 'BBR', 'Hardening', 'auditd', 'ausearch', 'Kernel'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 4. ВСЕ ВИДЫ ФАЕРВОЛОВ И СЕТЕВАЯ БЕЗОПАСНОСТЬ LINUX ====================
  {
    id: 'kb-linux-fw-iptables',
    section: 'Linux & ОС',
    category: 'Фаерволы и Сетевая безопасность Linux',
    title: 'Фаервол iptables (Netfilter): таблицы, цепочки, conntrack, NAT и сохранение правил',
    shortSummary: 'Классический фундамент сетевой фильтрации Linux: filter/nat/mangle, путь пакета по INPUT/FORWARD/OUTPUT и stateful-правила.',
    description: `Внутри ядра Linux фильтрацией управляет подсистема Netfilter. Классический CLI-интерфейс iptables (и ip6tables для IPv6) разделяет правила на таблицы (tables) и цепочки (chains):
1) Таблица filter (по умолчанию) — разрешение/блокировка:
   • INPUT — пакеты, идущие локально НА сам сервер;
   • FORWARD — транзитные пакеты, проходящие ЧЕРЕЗ сервер (роутер, VPN, Docker-бриджи);
   • OUTPUT — пакеты, исходящие ОТ самого сервера.
2) Таблица nat — трансляция адресов:
   • PREROUTING — DNAT (проброс портов внутрь, работает ДО принятия решения о маршрутизации);
   • POSTROUTING — SNAT / MASQUERADE (выпуск локальной сети в интернет, работает ПОСЛЕ маршрутизации).
3) Таблицы mangle (изменение TTL/TOS/маркировка пакетов) и raw (обход conntrack для снижения нагрузки).

Ключевая концепция — модуль conntrack (stateful inspection): правило ESTABLISHED,RELATED разрешает ответный трафик автоматически, не открывая лишних портов. Важно: изменения iptables в памяти пропадают после ребута без пакета iptables-persistent!`,
    practicalUsage: 'Настройка классических серверов и шлюзов NAT, отладка маршрутизации и проброса портов Docker, чтение legacy-правил (в новых дистрибутивах iptables работает как обёртка iptables-nft поверх nftables).',
    commandsOrConfig: `# Просмотр текущих правил с номерами строк, счётчиками пакетов и без DNS-резолва (-n)
sudo iptables -L -v -n --line-numbers
sudo iptables -t nat -L -v -n

# Минимальный безопасный набор правил (Stateful Input Firewall)
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -m conntrack --ctstate INVALID -j DROP
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp -m multiport --dports 80,443 -j ACCEPT
sudo iptables -P INPUT DROP   # ВНИМАНИЕ: ставить ПОСЛЕ разрешения SSH (порта 22)!

# Включение NAT (Masquerade) на сервере-шлюзе (внешний интерфейс eth0)
sudo iptables -t nat -A POSTROUTING -s 10.8.0.0/24 -o eth0 -j MASQUERADE

# Сохранение правил в Debian/Ubuntu
sudo apt install -y iptables-persistent && sudo netfilter-persistent save`,
    level: 'Middle',
    tags: ['Linux', 'iptables', 'Netfilter', 'NAT', 'conntrack', 'Фаервол', 'Firewall'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fw-nftables',
    section: 'Linux & ОС',
    category: 'Фаерволы и Сетевая безопасность Linux',
    title: 'Современный фаервол nftables (/etc/nftables.conf): единый синтаксис, sets, maps и NAT',
    shortSummary: 'Официальный преемник iptables/ip6tables/arptables/ebtables с атомарным применением правил, поддержкой IPv4+IPv6 (inet) и встроенными множествами.',
    description: `nftables (утилита nft) заменил сразу четыре устаревшие утилиты (iptables, ip6tables, arptables, ebtables) и является нативным стандартом Netfilter в современных Debian 10+, Ubuntu, RHEL 8/9 и AlmaLinux.
Главные преимущества перед iptables:
• Семейство таблиц inet: одно правило автоматически фильтрует И IPv4, И IPv6 трафик (нет риска забыть закрыть порт по IPv6!).
• Атомарная загрузка конфига /etc/nftables.conf целиком: правила меняются одной транзакцией ядра без доли секунды уязвимости, как было при iptables-restore по строкам.
• Встроенные множества (sets) и словари (maps): вместо 5000 отдельных правил блокировки IP создаётся одно правило со ссылкой на хэш-таблицу (set), что даёт сложность поиска O(1) и экономит CPU.
• Встроенный rate limiting (limit rate) прямо в правилах без сторонних модулей.`,
    practicalUsage: 'Настройка производительных продакшн-серверов, VPN-концентраторов и шлюзов с тысячными списками разрешённых/заблокированных IP и двойным стеком IPv4/IPv6.',
    commandsOrConfig: `# Просмотр всей активной таблицы правил nftables и статус службы
sudo nft list ruleset
sudo systemctl enable --now nftables

# Боевой пример /etc/nftables.conf (IPv4+IPv6 фаервол с Set для портов и защитой SSH)
#!/usr/sbin/nft -f
flush ruleset

table inet filter {
  set trusted_admins {
    type ipv4_addr
    elements = { 192.168.10.0/24, 203.0.113.50 }
  }

  chain input {
    type filter hook input priority filter; policy drop;
    iif "lo" accept
    ct state established,related accept
    ct state invalid drop
    ip protocol icmp icmp type echo-request limit rate 5/second accept
    ip saddr @trusted_admins tcp dport 22 ct state new limit rate 5/minute accept
    tcp dport { 80, 443 } accept
  }
  chain forward { type filter hook forward priority filter; policy drop; }
  chain output  { type filter hook output priority filter; policy accept; }
}

# Проверка синтаксиса (-c) перед применением!
sudo nft -c -f /etc/nftables.conf && sudo nft -f /etc/nftables.conf`,
    level: 'Middle',
    tags: ['Linux', 'nftables', 'nft', 'Netfilter', 'IPv6', 'Sets', 'Фаервол'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fw-ufw-docker',
    section: 'Linux & ОС',
    category: 'Фаерволы и Сетевая безопасность Linux',
    title: 'Настройка UFW (Uncomplicated Firewall) и критический нюанс с Docker (DOCKER-USER)',
    shortSummary: 'Быстрая настройка фаервола в Ubuntu/Debian, профили приложений, rate limit для SSH и почему Docker обходит правила UFW.',
    description: `UFW (Uncomplicated Firewall) — удобная надстройка над iptables/nftables, стандартно поставляемая в Ubuntu и Debian. Она избавляет от сложного синтаксиса цепочек: достаточно разрешить нужные порты (и обязательно SSH!) перед выполнением ufw enable. Поддерживает встроенную защиту от перебора (ufw limit 22/tcp ограничивает до 6 попыток за 30 секунд с одного IP) и готовые профили сервисов (/etc/ufw/applications.d/).

КРИТИЧЕСКАЯ ЛОВУШКА В ПРОДАКШЕНЕ (UFW + Docker):
Когда вы публикуете порт в Docker (ports: "5432:5432"), Docker сам вставляет правила DNAT в цепочку PREROUTING и пропускает трафик через цепочку FORWARD/DOCKER, ПОЛНОСТЬЮ ОБХОДЯ правила UFW INPUT! В итоге ваша база данных в контейнере оказывается открыта всему интернету, даже если ufw status показывает, что открыты только 22 и 443!
Решения два: 1) привязывать порты Docker строго к localhost (127.0.0.1:5432:5432); 2) фильтровать внешний трафик к контейнерам в специальной цепочке DOCKER-USER (/etc/ufw/after.rules).`,
    practicalUsage: 'Базовая защита веб-серверов и VPS на Ubuntu/Debian за 1 минуту и предотвращение критической утечки портов БД из Docker-контейнеров в интернет.',
    commandsOrConfig: `# Безопасный чек-лист включения UFW (SSH всегда разрешаем ДО enable!)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw limit 22/tcp comment 'SSH with rate limit'
sudo ufw allow 'Nginx Full'   # открывает 80 и 443 по профилю
sudo ufw allow from 10.20.0.0/16 to any port 5432 proto tcp
sudo ufw enable

# Просмотр правил с номерами и удаление ненужного правила
sudo ufw status numbered
sudo ufw delete 3

# ЗАЩИТА от обхода UFW со стороны Docker (добавить в /etc/ufw/after.rules):
# Вставляем правила в *filter цепочку DOCKER-USER: разрешаем локалку, дропаем остальное с eth0:
sudo iptables -I DOCKER-USER -i eth0 ! -s 10.0.0.0/8 -j DROP`,
    level: 'Junior',
    tags: ['Linux', 'UFW', 'Ubuntu', 'Debian', 'Docker', 'DOCKER-USER', 'Фаервол'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fw-firewalld',
    section: 'Linux & ОС',
    category: 'Фаерволы и Сетевая безопасность Linux',
    title: 'Настройка firewalld (RHEL, AlmaLinux, Rocky, Fedora, РЕД ОС): зоны, сервисы и Rich Rules',
    shortSummary: 'Динамический демон фаервола на базе зон доверия: работа без разрыва соединений, постоянная vs runtime конфигурация и маскарадинг.',
    description: `В RPM-дистрибутивах (RHEL, AlmaLinux, Rocky, Fedora, РЕД ОС, openSUSE) стандартом является firewalld (CLI-утилита firewall-cmd, работает поверх nftables).
Ключевая идея firewalld — ЗОНЫ доверия, к которым привязываются сетевые интерфейсы или подсети источников:
• public — недоверенная внешняя сеть (по умолчанию открыты только ssh и dhcpv6-client);
• internal / home — доверенная корпоративная/домашняя сеть;
• dmz — демилитаризованная зона для публичных серверов;
• trusted — разрешён весь трафик;
• drop / block — отброс всего входящего трафика (drop — молча, block — с ответом ICMP).

Главная особенность: firewalld разделяет Runtime-конфигурацию (действует прямо сейчас до перезагрузки) и Permanent-конфигурацию (сохраняется на диске). Команды с флагом --permanent НЕ вступают в силу немедленно — нужен firewall-cmd --reload! Зато reload применяет правила динамически без сброса текущих TCP-сессий. Для сложных условий (разрешить порт 5432 только с конкретного IP) применяются Rich Rules.`,
    practicalUsage: 'Настройка многоинтерфейсных корпоративных серверов (внешний интерфейс в зоне public, интерфейс бэкенд-сети в internal), публикация сервисов в РЕД ОС/AlmaLinux и настройка NAT.',
    commandsOrConfig: `# Просмотр активных зон, привязанных интерфейсов и всех правил
sudo firewall-cmd --get-active-zones
sudo firewall-cmd --list-all

# Открытие веб-сервиса или порта ПОСТОЯННО и применение без разрыва сессий
sudo firewall-cmd --zone=public --add-service=https --permanent
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --reload

# Rich Rule: разрешить доступ к PostgreSQL (5432) ТОЛЬКО для сервера приложений
sudo firewall-cmd --permanent --zone=public \\
  --add-rich-rule='rule family="ipv4" source address="10.0.5.20/32" port protocol="tcp" port="5432" accept'
sudo firewall-cmd --reload

# Безопасный тест опасного правила с автооткатом через 30 секунд (--timeout)
sudo firewall-cmd --zone=public --add-port=9090/tcp --timeout=30s`,
    level: 'Middle',
    tags: ['Linux', 'firewalld', 'firewall-cmd', 'AlmaLinux', 'RHEL', 'РЕД ОС', 'Зоны', 'Фаервол'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-linux-fw-ssh-fail2ban',
    section: 'Linux & ОС',
    category: 'Фаерволы и Сетевая безопасность Linux',
    title: 'Периметровая защита Linux: SSH Hardening (sshd_config) и Fail2ban (Jails & Filters)',
    shortSummary: 'Комплексное закрытие сервера от брутфорса: аутентификация по ключам Ed25519, запрет root-логина и автоматический бан через Fail2ban.',
    description: `Даже правильно настроенный фаервол вынужден оставлять открытыми порты удалённого доступа (SSH 22) или веб-сервера (80/443). Вторым эшелоном защиты выступают:
1) SSH Hardening (/etc/ssh/sshd_config или /etc/ssh/sshd_config.d/99-hardening.conf):
   • Полный переход на асимметричные ключи (Ed25519) и отключение парольного входа (PasswordAuthentication no);
   • Запрет прямого входа под root (PermitRootLogin no);
   • Ограничение списка допущенных пользователей (AllowUsers admin deploy);
   • Отключение X11Forwarding и уменьшение MaxAuthTries.
   Перед перезапуском sshd ОБЯЗАТЕЛЬНО проверяйте конфиг командой sshd -t и держите открытой вторую резервную SSH-сессию!
2) Fail2ban: демон анализа логов (systemd-journal или /var/log/auth.log, /var/log/nginx/error.log). При обнаружении N неудачных попыток входа за заданное время (findtime) по regex-фильтру Fail2ban автоматически добавляет IP атакующего в бан через nftables/iptables/ufw на время bantime (с поддержкой прогрессивного увеличения срока бана bantime.increment).`,
    practicalUsage: 'Мгновенная защита любого публичного Linux VPS или корпоративного шлюза от круглосуточного перебора паролей ботнетами, защита админок веб-приложений и почтовых серверов Postfix/Dovecot.',
    commandsOrConfig: `# Рекомендуемый харденинг SSH (/etc/ssh/sshd_config.d/99-hardening.conf)
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers deploy sysadmin
X11Forwarding no
# Проверка синтаксиса до перезагрузки демона:
sudo sshd -t && sudo systemctl reload sshd

# Настройка Fail2ban (НИКОГДА не правьте jail.conf — создавайте /etc/fail2ban/jail.local):
[DEFAULT]
bantime = 1h
bantime.increment = true
findtime = 10m
maxretry = 4
banaction = nftables-multiport

[sshd]
enabled = true
backend = systemd

# Проверка активных джейлов и ручная разблокировка ошибочно забаненного IP
sudo fail2ban-client status sshd
sudo fail2ban-client set sshd unbanip 203.0.113.10`,
    level: 'Junior',
    tags: ['Linux', 'SSH', 'Hardening', 'Fail2ban', 'sshd_config', 'Ed25519', 'Безопасность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
