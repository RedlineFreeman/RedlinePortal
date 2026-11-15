import { KnowledgeEntry } from '../../types/knowledgeBase';

export const FREEBSD_UNIX_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  // ==================== 1. АРХИТЕКТУРА FREEBSD И UNIX ====================
  {
    id: 'kb-freebsd-kernel-architecture',
    section: 'FreeBSD & Unix',
    category: 'Архитектура ОС FreeBSD и Unix',
    title: 'Архитектура ядра FreeBSD: модули (.ko), loader.conf, подсистемы GEOM, CAM и VNET',
    shortSummary: 'Модульное ядро FreeBSD, загрузочные параметры /boot/loader.conf, слой блочных устройств GEOM, SCSI/NVMe стек CAM и сетевая виртуализация VNET.',
    description: `В отличие от Linux (где ядро и пользовательские утилиты развиваются разными проектами), ядро FreeBSD (/boot/kernel/kernel) проектируется как единое целое с Base System. Ключевые архитектурные подсистемы ядра FreeBSD:
1) Модули ядра (KLD — Kernel Loadable Modules): загружаются динамически без пересборки ядра (zfs.ko, pf.ko, if_lagg.ko, vmm.ko). Загрузка на этапе старта прописывается в /boot/loader.conf, а тонкие настройки времени работы — в /etc/sysctl.conf.
2) GEOM — модульный каркас трансформации блочных устройств: любой диск можно пропустить через стек слоёв (разметка gpart -> шифрование geli -> программный RAID gmirror -> кэш -> ФС UFS/ZFS).
3) CAM (Common Access Method) — унифицированная подсистема работы с накопителями (SAS, SATA, AHCI, NVMe, USB Mass Storage) через утилиту camcontrol.
4) VNET (Network Stack Virtualization) — позволяет выдавать каждой клетке Jail собственный независимый сетевой стек, таблицу маршрутизации и экземпляр фаервола PF.`,
    practicalUsage: 'Тюнинг высоконагруженных сетевых шлюзов и серверов хранения (10G/100G сетевые карты, увеличение сокетных буферов kern.ipc.maxsockbuf, загрузка драйверов ZFS/bhyve и диагностика дисков).',
    commandsOrConfig: `# Просмотр, загрузка и выгрузка модулей ядра FreeBSD
kldstat
sudo kldload pf zfs vmm
sudo kldunload pf

# Примеры параметров загрузки (/boot/loader.conf) и тюнинга (/etc/sysctl.conf)
# /boot/loader.conf:
zfs_load="YES"
vfs.zfs.arc_max="8589934592"      # ограничение кэша ZFS ARC до 8 ГБ

# Проверка настроек ядра на лету (sysctl) и список физических дисков через GEOM / CAM
sysctl hw.model hw.ncpu hw.physmem
geom disk list
sudo camcontrol devlist`,
    level: 'Middle',
    tags: ['FreeBSD', 'Kernel', 'GEOM', 'CAM', 'kldload', 'loader.conf', 'sysctl', 'VNET'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-unix-boot-init-hierarchy',
    section: 'FreeBSD & Unix',
    category: 'Архитектура ОС FreeBSD и Unix',
    title: 'Иерархия каталогов FreeBSD (hier(7)) и системы инициализации Unix (rcNG, SMF, launchd)',
    shortSummary: 'Строгое разделение /etc vs /usr/local/etc в BSD, процесс загрузки ОС и сравнение систем инициализации BSD rcNG, Solaris SMF и macOS launchd.',
    description: `В мире BSD-систем структура каталогов (описана в встроенной справке man 7 hier) жёстко отделяет базовую ОС от стороннего ПО:
• /boot/ — ядро, модули, loader.conf и загрузчик (gptzfsboot / loader.efi);
• /etc/ и /etc/rc.d/ — конфиги и стартовые скрипты ТОЛЬКО базовой системы (sshd, pf, ntpd);
• /usr/local/ — строгий префикс для ВСЕХ устанавливаемых пакетов (аналог того, что в Linux перемешано в /usr и /etc):
  - бинарники лежат в /usr/local/bin и /usr/local/sbin;
  - конфиги Nginx, PostgreSQL, PHP — строго в /usr/local/etc/;
  - стартовые скрипты служб — в /usr/local/etc/rc.d/;
• /usr/src/ и /usr/ports/ — исходные коды самой ОС и дерево портов;
• /compat/linux/ — корень окружения совместимости Linuxulator.

Системы инициализации в Unix-мире (в отличие от systemd в Linux):
- FreeBSD rcNG (rc.subr): простые декларативные shell-скрипты с зависимостями PROVIDE/REQUIRE (управление через service и sysrc);
- Solaris / illumos SMF (Service Management Facility): службы как FMRI-объекты с автоматическим перезапуском (svcs, svcadm);
- macOS Darwin launchd: единый PID 1 с XML plist-манифестами (launchctl).`,
    practicalUsage: 'Безошибочный поиск конфигурационных файлов на незнакомом BSD/Unix-сервере и написание собственных rc.d-скриптов автозапуска сервисов во FreeBSD.',
    commandsOrConfig: `# Справка по архитектуре каталогов прямо в системе
man 7 hier

# Управление службами в разных Unix ОС:
# 1) FreeBSD (rcNG):
sudo sysrc postgresql_enable="YES"
sudo service postgresql initdb && sudo service postgresql start
service -e                           # список всех включённых служб

# 2) Solaris / illumos (SMF):
svcs -a | grep ssh
sudo svcadm restart network/ssh

# 3) macOS (launchd):
sudo launchctl kickstart -k system/com.openssh.sshd`,
    level: 'Junior',
    tags: ['FreeBSD', 'Unix', 'hier', '/usr/local', 'rcNG', 'SMF', 'launchd', 'Архитектура'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 2. ФАЙЛОВЫЕ СИСТЕМЫ FREEBSD И UNIX ====================
  {
    id: 'kb-freebsd-ufs2-ffs',
    section: 'FreeBSD & Unix',
    category: 'Файловые системы FreeBSD и Unix',
    title: 'Нативная ФС FreeBSD UFS2 / FFS: Soft Updates, SU+J, снапшоты, gpart и newfs',
    shortSummary: 'Быстрая классическая ФС для маломощных VPS и embedded-систем: разметка GPT через gpart, создание UFS2 и фоновая проверка fsck.',
    description: `UFS2 (Unix File System v2 / Fast File System) — классическая родная файловая система FreeBSD, отточенная за десятилетия. Хотя для серверов с большим объёмом RAM стандартом является OpenZFS, UFS2 незаменима на лёгких VPS (512 МБ – 2 ГБ ОЗУ), одноплатниках (Raspberry Pi), роутерах и виртуальных машинах, где CoW-оверхед и кэш ZFS избыточны.

Ключевые технологии UFS2:
• Soft Updates (SU) — упорядочивает запись метаданных на диск так, чтобы ФС оставалась целостной даже при внезапном отключении питания, позволяя запускать фоновый fsck уже после загрузки ОС;
• SU+J (Soft Updates Journaling) — добавляет компактный журнал метаданных, сокращая проверку после сбоя до 1–2 секунд (по умолчанию включается инсталлятором);
• UFS Snapshots (mksnap_ffs) — позволяет делать консистентные снимки тома прямо во время работы для безопасного бэкапа через dump/restore;
• Резерв 8% (minfree) — сохраняется для предотвращения фрагментации и работы под root.`,
    practicalUsage: 'Разметка и подключение нового диска (NVMe/VirtIO) на облачном сервере FreeBSD, расширение раздела на лету через gpart + growfs и настройка TRIM для SSD.',
    commandsOrConfig: `# 1. Разметка нового диска /dev/vtbd1 в GPT и создание раздела UFS2 (SU+J + TRIM)
sudo gpart create -s gpt vtbd1
sudo gpart add -t freebsd-ufs -a 1m -l data_disk vtbd1
sudo newfs -U -j -t /dev/vtbd1p1         # -U SoftUpdates, -j Journal, -t TRIM для SSD

# 2. Проверка/тюнинг параметров существующей UFS2 и расширение после апгрейда диска ВМ
sudo tunefs -p /dev/vtbd1p1
sudo gpart recover vtbd1 && sudo gpart resize -i 1 vtbd1
sudo growfs /dev/vtbd1p1

# 3. Запись в /etc/fstab по метке GPT
# /dev/gpt/data_disk   /mnt/data   ufs   rw,noatime   2   2`,
    level: 'Middle',
    tags: ['FreeBSD', 'UFS2', 'FFS', 'gpart', 'newfs', 'growfs', 'Soft Updates', 'Файловые системы'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-freebsd-geom-zfs-storage',
    section: 'FreeBSD & Unix',
    category: 'Файловые системы FreeBSD и Unix',
    title: 'Хранилище FreeBSD: слои GEOM (gmirror, geli шифрование) и интеграция OpenZFS',
    shortSummary: 'Программный RAID1 через gmirror, аппаратно-ускоренное шифрование дисков GELI (AES-XTS) и нативные фичи OpenZFS во FreeBSD.',
    description: `Подсистема хранения FreeBSD славится гибкостью стека GEOM и эталонной интеграцией OpenZFS в ядро (без проблем лицензирования GPL, как в Linux):
• gmirror / gstripe — встроенный на уровне ядра программный RAID1 (зеркало) и RAID0, способный работать даже поверх отдельных разделов или загрузочных томов UFS;
• geli — криптографическое шифрование блочных устройств с аппаратным ускорением AES-NI (aesni.ko), поддерживающее ключевые файлы + парольную фразу (в том числе шифрование корневого ZFS-пула прямо при установке FreeBSD!);
• OpenZFS во FreeBSD — поддерживает прозрачное сжатие zstd/lz4, дедупликацию, квоты (zfs set quota=50G), нативное шифрование на уровне датасета и мгновенный экспорт по NFS прямо командой zfs set sharenfs=... on.`,
    practicalUsage: 'Шифрование дисков сервера в ненадёжном дата-центре через GELI (ввод ключа при загрузке по SSH в dropbear/удалённой консоли), организация зеркальных СХД на TrueNAS CORE / FreeBSD.',
    commandsOrConfig: `# 1. Шифрование диска /dev/da1 с помощью GELI (AES-XTS 256 бит)
sudo geli init -s 4096 -l 256 /dev/da1
sudo geli attach /dev/da1               # появится расшифрованное устройство /dev/da1.eli
sudo zpool create secure_pool /dev/da1.eli

# 2. Создание зеркала RAID1 на двух дисках через GEOM (для UFS)
sudo gmirror label -v -b round-robin gm0 /dev/ada1 /dev/ada2
gmirror status

# 3. Типичные команды OpenZFS во FreeBSD (сжатие zstd, лимиты, шаринг NFS)
sudo zfs create -o compression=zstd -o atime=off zroot/app_data
sudo zfs set quota=100G zroot/app_data
sudo zfs set sharenfs="-network 10.0.0.0/24" zroot/app_data`,
    level: 'Middle',
    tags: ['FreeBSD', 'GEOM', 'geli', 'gmirror', 'OpenZFS', 'Шифрование', 'Хранилище'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-unix-filesystems-apfs-vxfs-devfs',
    section: 'FreeBSD & Unix',
    category: 'Файловые системы FreeBSD и Unix',
    title: 'Специальные и коммерческие ФС Unix-мира: devfs, nullfs, tmpfs, APFS (macOS), JFS2 и VxFS',
    shortSummary: 'Устройство виртуальных ФС в BSD (devfs.rules, nullfs вместо bind mount) и корпоративные файловые системы Unix (Apple APFS, IBM JFS2, Veritas VxFS).',
    description: `Помимо дисковых UFS2 и ZFS, в FreeBSD и коммерческих Unix используются специализированные виртуальные и проприетарные ФС:
1) Виртуальные ФС FreeBSD:
   • devfs (/dev) — динамическая ФС устройств. В отличие от Linux udev, доступ к устройствам внутри клеток Jail гибко фильтруется правилами в /etc/devfs.rules (например, скрыть все физические диски, оставив только /dev/null и /dev/urandom);
   • nullfs — аналог Linux mount --bind: мгновенно пробрасывает общий каталог хоста внутрь множества Jails (в том числе в режиме read-only);
   • tmpfs / mdmfs — ФС в оперативной памяти (используется для /tmp и дисковых образов ISO через mdconfig);
   • fdescfs и procfs — дескрипторы процессов (иногда нужны для Java/Bash скриптов).
2) Коммерческие и настольные Unix ФС:
   • APFS (Apple File System, macOS/Darwin) — 64-битная CoW-ФС с мгновенными клонами файлов, шифрованием FileVault и общим пространством контейнеров;
   • JFS2 (IBM AIX) и Veritas VxFS (HP-UX / Solaris / Linux) — промышленные журналируемые ФС для банковских мейнфреймов и кластерных СХД.`,
    practicalUsage: 'Безопасный проброс каталогов в FreeBSD Jails через nullfs, монтирование ISO-образов без записи на флешку через mdconfig, настройка прав устройств в /etc/devfs.rules.',
    commandsOrConfig: `# Монтирование общего каталога с хоста в Jail в режиме только чтение (nullfs)
sudo mount -t nullfs -o ro /usr/ports /usr/jails/web/usr/ports

# Подключение ISO-образа во FreeBSD как виртуального диска (аналог mount -o loop)
sudo mdconfig -a -t vnode -f FreeBSD-14.1-RELEASE-amd64-disc1.iso -u 0
sudo mount -t cd9660 /dev/md0 /mnt/iso
# Отключение:
sudo umount /mnt/iso && sudo mdconfig -d -u 0

# Быстрый RAM-диск во FreeBSD (tmpfs, до 2 ГБ)
sudo mount -t tmpfs -o size=2G tmpfs /mnt/ram`,
    level: 'Middle',
    tags: ['FreeBSD', 'Unix', 'devfs', 'nullfs', 'mdconfig', 'tmpfs', 'APFS', 'JFS2', 'VxFS'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 3. КОМАНДЫ УПРАВЛЕНИЯ FREEBSD И UNIX ====================
  {
    id: 'kb-freebsd-cmd-network-routing',
    section: 'FreeBSD & Unix',
    category: 'Команды управления FreeBSD и Unix',
    title: 'Команды управления сетью FreeBSD/BSD: ifconfig, route, netstat, lagg, carp и drill',
    shortSummary: 'Настройка IP, VLAN, агрегации портов (LACP lagg0), отказоустойчивого VIP (CARP) и сетевая диагностика без iproute2.',
    description: `Во FreeBSD и OpenBSD сетевой стек настраивается классическими, но мощными утилитами ifconfig, route и netstat (команды ip/ss из Linux здесь отсутствуют):
• Имена интерфейсов отражают драйвер сетевой карты и номер порта: em0 / igb0 / ix0 (Intel 1G/10G), bge0 (Broadcom), vtnet0 (KVM VirtIO), lo0 (loopback).
• ifconfig — создаёт и настраивает абсолютно всё: IPv4/IPv6-адреса (alias для доп. IP), VLAN (ifconfig vlan10 create vlan 10 vlandev ix0), сетевые мосты (bridge0) и агрегацию портов LACP (lagg0).
• CARP (Common Address Redundancy Protocol) — встроенная в ядро BSD открытая замена VRRP/HSRP для создания отказоустойчивого виртуального IP между двумя серверами/роутерами!
• drill (в базовой системе FreeBSD вместо dig) — диагностика DNS и DNSSEC.`,
    practicalUsage: 'Настройка серверов и шлюзов FreeBSD/OPNsense, создание отказоустойчивой пары роутеров на CARP + pfsync, диагностика маршрутизации и трафика.',
    commandsOrConfig: `# Просмотр интерфейсов, маршрутов и активных соединений (BSD-стиль)
ifconfig -a
netstat -rn                  # таблица маршрутизации (аналог ip route)
sockstat -46 -l              # слушающие порты и PID процессов (аналог ss -tulpn)
drill @1.1.1.1 example.com   # встроенный DNS-инструмент (аналог dig)

# Назначение основного IP и дополнительного alias на лету + постоянная запись через sysrc
sudo ifconfig em0 inet 10.10.1.50/24
sudo ifconfig em0 inet 10.10.1.51/32 alias
sudo sysrc ifconfig_em0="inet 10.10.1.50 netmask 255.255.255.0"
sudo sysrc defaultrouter="10.10.1.1"

# Создание агрегированного интерфейса LACP (lagg0) в /etc/rc.conf через sysrc
sudo sysrc cloned_interfaces="lagg0"
sudo sysrc ifconfig_lagg0="laggproto lacp laggport ix0 laggport ix1 10.10.1.10/24"

# Захват трафика встроенным tcpdump (интерфейс PF логов pflog0!)
sudo tcpdump -n -e -ttt -i pflog0`,
    level: 'Middle',
    tags: ['FreeBSD', 'ifconfig', 'netstat', 'route', 'lagg', 'CARP', 'drill', 'Команды'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-freebsd-cmd-users-procs-perf',
    section: 'FreeBSD & Unix',
    category: 'Команды управления FreeBSD и Unix',
    title: 'Команды управления пользователями, процессами и диагностики FreeBSD: pw, procstat, truss, gstat и systat',
    shortSummary: 'Аналоги useradd, strace, iotop и lsof в BSD: управление учётками через pw, инспекция процессов procstat и мониторинг дисков gstat.',
    description: `Администрирование FreeBSD использует собственные высокоэффективные утилиты из Base System:
• pw — единая мощная команда для создания, блокировки и изменения пользователей и групп (вместо разрозненных useradd/usermod/groupadd). Интерактивный мастер — adduser. Смена пароля — passwd, редактирование базы пользователей напрямую — vipw.
• procstat — инспекция ядра по процессам (заменяет чтение /proc в Linux): открытые файлы (procstat -f), сокеты, аргументы, переменные окружения и стеки потоков.
• truss — трассировщик системных вызовов FreeBSD (прямой аналог Linux strace).
• gstat — монитор нагрузки на дисковые слои GEOM в реальном времени (IOPS, MB/s, %busy, ms/r — аналог iotop/iostat).
• systat -vmstat / systat -ifstat — псевдографическая панель реального времени (CPU, RAM, прерывания, трафик интерфейсов).`,
    practicalUsage: 'Управление доступом администраторов, поиск причины тормозов дисковой подсистемы (gstat) и быстрая отладка падающих бинарников через truss без установки сторонних утилит.',
    commandsOrConfig: `# 1. Управление пользователями и группами командой pw
sudo pw useradd devops -m -s /bin/sh -G wheel -c "DevOps Engineer"
sudo passwd devops
sudo pw groupmod wheel -m alice       # добавить alice в группу wheel (право на su/sudo)
sudo pw lock devops                   # временно заблокировать вход

# 2. Мониторинг производительности в реальном времени (всё встроено в Base System!)
top -P -H                             # загрузка по каждому ядру CPU и потокам
gstat -p                              # нагрузка, IOPS и задержки физических дисков
systat -ifstat 1                      # живая скорость на сетевых картах
vmstat -w 1                           # память, swap и переключения контекста

# 3. Отладка процесса по PID (аналоги lsof и strace)
sudo procstat -f <PID>                # все открытые файлы и сокеты процесса
sudo truss -p <PID>                   # трассировка системных вызовов на лету`,
    level: 'Middle',
    tags: ['FreeBSD', 'pw', 'procstat', 'truss', 'gstat', 'systat', 'top', 'Команды'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-unix-cmd-crossplatform-admin',
    section: 'FreeBSD & Unix',
    category: 'Команды управления FreeBSD и Unix',
    title: 'Команды и отличия CLI в BSD/Unix от Linux (GNU vs BSD sed/grep/tar, doas, OpenBSD, AIX, Solaris)',
    shortSummary: 'Почему Linux-скрипты ломаются на FreeBSD/macOS: отличия синтаксиса sed -i, find, ps, замена sudo на doas и ключевые команды классических Unix.',
    description: `Инженер, переходящий с Linux на FreeBSD, OpenBSD, macOS или коммерческие Unix (Solaris/AIX), постоянно сталкивается с разницей между GNU coreutils и классическими BSD/POSIX-утилитами:
1) sed -i (редактирование на месте): в GNU/Linux пишут sed -i 's/a/b/' file, а во FreeBSD и macOS ОБЯЗАТЕЛЬНО нужно передавать пустой суффикс бэкапа: sed -i '' 's/a/b/' file!
2) find: в BSD обязательно указывать путь первым аргументом (find . -name ...; просто find -name выдаст ошибку).
3) ps: BSD-стиль (ps aux) без дефиса; System V (Solaris/AIX) — ps -ef.
4) fetch (FreeBSD) и ftp (OpenBSD) вместо wget/curl по умолчанию в минимальной установке.
5) doas (OpenDoas — родом из OpenBSD, популярен во FreeBSD): минималистичная и безопасная альтернатива тяжелому sudo с простейшим конфигом /usr/local/etc/doas.conf.
6) Классические коммерческие Unix:
   • IBM AIX: LVM и управление через lsvg/lspv/lslv, интерактивный мастер smit / smitty, установка пакетов installp;
   • Oracle Solaris / illumos: управление сетью dladm/ipadm, службы svcs/svcadm, пакеты pkg.`,
    practicalUsage: 'Написание переносимых POSIX shell-скриптов, работа на macOS и BSD-шлюзах без сюрпризов, быстрая настройка прав администратора через doas.',
    commandsOrConfig: `# 1. Переносимые отличия команд BSD / macOS от GNU/Linux:
sed -i '' 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config  # BSD/macOS!
fetch -o installer.sh https://example.com/installer.sh                      # встроен в FreeBSD!
tar -czf backup.tar.gz /etc /usr/local/etc

# 2. Настройка минималистичного doas вместо sudo (/usr/local/etc/doas.conf во FreeBSD)
permit persist :wheel
permit nopass sysadmin as root cmd /usr/sbin/service

# 3. Шпаргалка базовых команд других Unix ОС:
# OpenBSD:  rcctl enable nginx && rcctl start nginx | pkg_add htop | pfctl -sr
# Solaris:  ipadm show-addr | dladm show-phys | svcs -xv
# IBM AIX:  lsvg -o | lspv | errpt -a | smitty`,
    level: 'Middle',
    tags: ['Unix', 'FreeBSD', 'OpenBSD', 'AIX', 'Solaris', 'macOS', 'doas', 'GNU vs BSD'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 4. СИСТЕМНОЕ И ПОЛЬЗОВАТЕЛЬСКОЕ ПО FREEBSD И UNIX ====================
  {
    id: 'kb-freebsd-base-software-toolchain',
    section: 'FreeBSD & Unix',
    category: 'Системное и пользовательское ПО',
    title: 'Системное ПО FreeBSD Base System: Clang/LLVM, DTrace, гипервизор bhyve, Periodic и оболочки',
    shortSummary: 'Богатейший инструментарий, встроенный в саму ОС «из коробки»: компилятор C/C++, динамический профайлер DTrace, гипервизор bhyve и ночной аудит.',
    description: `Базовая поставка FreeBSD (Base System) проектируется так, чтобы сервер мог полноценно работать и отлаживаться сразу после установки без подключения интернета:
• Системные оболочки: POSIX /bin/sh (для скриптов) и интерактивный /bin/tcsh (csh) по умолчанию для root (с историей команд и автодополнением; современные админы часто ставят sh или zsh).
• Инструментарий разработки: полный компилятор Clang/LLVM (cc/c++), отладчик lldb, система сборки make и библиотека OpenSSL/OpenSSH.
• DTrace (портирован из Sun Solaris): легендарная система динамической трассировки ядра и user-space приложений в продакшене с нулевым оверхедом в простое (позволяет на живом сервере поймать, кто делает медленные read() или создаёт процессы).
• bhyve (BSD Hypervisor): встроенный легковесный гипервизор 2-го типа с аппаратной виртуализацией Intel VT-x / AMD-V (управляется через vm-bhyve) — позволяет запускать ВМ с Linux, Windows и OpenBSD прямо на сервере FreeBSD.
• Periodic (/etc/periodic/): встроенный фреймворк ежедневного, еженедельного и ежемесячного аудита (проверка места на дисках, состояния ZFS/RAID, уязвимостей pkg audit и логов попыток взлома с отчётом на почту root).`,
    practicalUsage: 'Глубокий профилинг продакшена через DTrace, запуск Windows/Linux виртуальных машин поверх ZFS с помощью bhyve и получение ежедневных автоматических сводок безопасности от periodic.',
    commandsOrConfig: `# 1. Включение и базовое управление встроенным гипервизором bhyve (обёртка vm-bhyve)
sudo pkg install -y vm-bhyve bhyve-firmware
sudo sysrc vm_enable="YES" vm_dir="zfs:zroot/vm"
sudo vm init && sudo vm switch create public && sudo vm switch add public em0
sudo vm create -t ubuntu -s 40G linux-node01
sudo vm install linux-node01 ubuntu-24.04-live-server-amd64.iso

# 2. Однострочник DTrace: какие процессы прямо сейчас делают больше всего системных вызовов
sudo dtrace -n 'syscall:::entry { @[execname] = count(); }'

# 3. Просмотр встроенных ежедневных отчётов аудита безопасности и ручной запуск
sudo periodic daily
sudo cat /etc/defaults/periodic.conf | head -n 40`,
    level: 'Senior',
    tags: ['FreeBSD', 'DTrace', 'bhyve', 'Clang', 'Periodic', 'tcsh', 'Системное ПО'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-freebsd-userland-desktop-software',
    section: 'FreeBSD & Unix',
    category: 'Системное и пользовательское ПО',
    title: 'Пользовательское и серверное ПО во FreeBSD/Unix: pkg, Poudriere, Xorg/Wayland и Linuxulator',
    shortSummary: 'Установка серверного и десктопного софта (Nginx, PostgreSQL, KDE/XFCE, Firefox), сборка своих пакетов в Poudriere и запуск Linux-программ через Linuxulator.',
    description: `Всё пользовательское и прикладное ПО в FreeBSD (более 35 000 программ) ставится изолированно в /usr/local/ двумя способами:
1) Бинарные пакеты (pkg): мгновенная установка скомпилированных пакетов из официальных веток quarterly (стабильная) или latest (свежие версии). Примеры: веб-серверы nginx/caddy/haproxy, СУБД postgresql16/redis, десктопные среды Xorg / Wayland (Sway), KDE Plasma, XFCE, браузеры Firefox/Chromium, LibreOffice, VS Code, tmux, vim, neovim, zsh, htop, btop.
2) Poudriere — промышленный сборочный комбайн для создания собственного корпоративного репозитория pkg из дерева Ports (в изолированных ZFS Jails) с нужными флагами оптимизации и патчами безопасности.
3) Linux Binary Compatibility (Linuxulator): слой трансляции системных вызовов Linux прямо в ядре FreeBSD (kldload linux64) — это НЕ эмулятор и НЕ виртуальная машина! Позволяет запускать нативные Linux-бинарники (Rocky Linux / Ubuntu userland в /compat/linux) на скорости железа.`,
    practicalUsage: 'Развёртывание универсальных рабочих станций на FreeBSD, сборка корпоративных пакетов через Poudriere, запуск проприетарного Linux-ПО (агенты бэкапов, Oracle client, игры) на ядре FreeBSD через Linuxulator.',
    commandsOrConfig: `# 1. Установка базового набора утилит и серверного ПО через pkg
sudo pkg install -y bash zsh tmux neovim htop btop git curl jq rsync sudo
sudo pkg install -y nginx postgresql16-server redis

# 2. Установка графической среды на рабочей станции FreeBSD (Xorg + XFCE + Firefox)
sudo pkg install -y xorg xfce lightdm lightdm-gtk-greeter firefox
sudo sysrc dbus_enable="YES" lightdm_enable="YES"

# 3. Включение слоя совместимости с Linux-программами (Linuxulator)
sudo sysrc linux_enable="YES"
sudo service linux start
sudo pkg install -y linux_base-rl9     # установка userland Rocky Linux 9 в /compat/linux/

# 4. Переключение репозитория pkg с quarterly на latest (свежие версии софта)
# /usr/local/etc/pkg/repos/FreeBSD.conf:
# FreeBSD: { url: "pkg+https://pkg.FreeBSD.org/\${ABI}/latest" }
sudo pkg update -f && sudo pkg upgrade`,
    level: 'Middle',
    tags: ['FreeBSD', 'pkg', 'Poudriere', 'Linuxulator', 'Xorg', 'Wayland', 'Пользовательское ПО'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
