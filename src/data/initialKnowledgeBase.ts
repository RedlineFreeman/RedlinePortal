import { KnowledgeEntry } from '../types/knowledgeBase';
import { deduplicateKnowledgeEntries } from '../utils/knowledgeBaseHelper';
import { NETWORKS_WIRESHARK_CISCO_ENTRIES } from './kb/networksAndWireshark';
import { LINUX_FREEBSD_UNIX_ENTRIES } from './kb/linuxFreebsdUnix';
import { WINDOWS_AD_HYPERV_SYSINTERNALS_ENTRIES } from './kb/windowsAdHyperV';
import { AUTOMATION_AND_DB_ENTRIES } from './kb/automationAndDb';
import { ENTERPRISE_1C_AND_OFFICE_ENTRIES } from './kb/enterprise1cAndOffice';
import { DATABASES_EXTENDED_ENTRIES } from './kb/databasesExtended';
import { PROTOCOLS_COMPREHENSIVE_ENTRIES } from './kb/protocolsComprehensive';
import { LINUX_COMPREHENSIVE_ENTRIES } from './kb/linuxComprehensive';
import { OFFICE_VBA_AND_BIG_DATA_ENTRIES } from './kb/officeVbaAndBigData';
import { CISCO_COMPREHENSIVE_ENTRIES } from './kb/ciscoComprehensive';
import { FREEBSD_UNIX_COMPREHENSIVE_ENTRIES } from './kb/freebsdUnixComprehensive';
import { WINDOWS_AD_COMPREHENSIVE_ENTRIES } from './kb/windowsAdComprehensive';
import { VIRTUALIZATION_COMPREHENSIVE_ENTRIES } from './kb/virtualizationComprehensive';
import { SYSINTERNALS_COMPREHENSIVE_ENTRIES } from './kb/sysinternalsComprehensive';
import { AUTOMATION_COMPREHENSIVE_ENTRIES } from './kb/automationComprehensive';
import { ONEC_COMPREHENSIVE_ENTRIES } from './kb/onecComprehensive';

const CORE_INITIAL_ENTRIES: KnowledgeEntry[] = [
  {
    id: 'kb-sctp-protocol',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SCTP (Stream Control Transmission Protocol)',
    shortSummary: 'Протокол передачи управления потоком транспортного уровня с поддержкой Multi-Homing и многопоточности.',
    description: `Протокол передачи управления потоком. Еще один протокол, который относится к транспортному уровню. SCTP обеспечивает надежную последовательную передачу данных. Поддерживает многоадресное соединение, когда один или оба конечных узла могут состоять из более чем одного IP-адреса. Это обеспечивает прозрачное переключение между резервными сетевыми путями.

SCTP аналогичен протоколам UDP и TCP, которые обеспечивают функции транспортного уровня для некоторых интернет-приложений. Так как преимущество протокола SCTP — в быстром переключении между интерфейсами, на него переходят только компании, для которых критична недоступность приложений. SCTP работает поверх бесконтактной пакетной сети, такой как IP, и поддерживает передачу данных в случаях с одним или несколькими IP.`,
    practicalUsage: 'Широко применяется в телекоммуникационных сетях (SS7 over IP / SIGTRAN), WebRTC (для Data Channels между браузерами), банковских шлюзах и высоконадежных распределенных кластерах, где сбой одного сетевого интерфейса не должен приводить к обрыву сессии.',
    commandsOrConfig: `# Проверка поддержки SCTP в ядре Linux
lsmod | grep sctp || sudo modprobe sctp

# Установка диагностических утилит lksctp-tools
sudo apt-get install -y lksctp-tools

# Просмотр активных SCTP сокетов в системе
ss --sctp -a -n -p
cat /proc/net/sctp/eps`,
    level: 'Middle',
    tags: ['SCTP', 'Транспортный уровень', 'Multi-Homing', 'SIGTRAN', 'WebRTC', 'Отказоустойчивость'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-tcp-handshake',
    section: 'Сети',
    category: 'Протоколы',
    title: 'TCP (Transmission Control Protocol)',
    shortSummary: 'Надежный протокол транспортного уровня с установлением соединения, контролем потока и гарантированной доставкой.',
    description: `TCP ориентирован на соединение: перед отправкой данных выполняется трехстороннее рукопожатие (SYN -> SYN-ACK -> ACK). TCP разбивает поток данных на сегменты, нумерует их порядковыми номерами (Sequence Numbers) и ожидает подтверждения (ACK). При потере пакета TCP выполняет повторную отправку (Retransmission). Механизмы скользящего окна (Sliding Window) и контроля перегрузок (Congestion Control: Reno, Cubic, BBR) динамически регулируют скорость отправки.`,
    practicalUsage: 'Основа большинства протоколов интернета: HTTP/1.1, HTTP/2, HTTPS, SSH, SMTP, базы данных (PostgreSQL, MySQL), где потеря даже одного байта недопустима.',
    commandsOrConfig: `# Просмотр текущего алгоритма контроля перегрузок TCP
sysctl net.ipv4.tcp_congestion_control
# Переключение на Google BBR
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr

# Мониторинг TCP-сокетов с задержкой и размером очереди
ss -tin '( dport = :443 or dport = :80 )'`,
    level: 'Junior',
    tags: ['TCP', 'Handshake', 'SYN-ACK', 'BBR', 'Congestion Control', 'Сетевой стек'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-udp-protocol',
    section: 'Сети',
    category: 'Протоколы',
    title: 'UDP (User Datagram Protocol)',
    shortSummary: 'Легковесный транспортный протокол без установления соединения и без гарантии доставки для минимальных задержек.',
    description: `UDP не требует предварительного согласования соединения (0-RTT), не подтверждает прием пакетов и не восстанавливает порядок их следования. Заголовок UDP занимает всего 8 байт (в сравнении с 20-60 байтами TCP), что обеспечивает минимальный оверхед и отсутствие блокировок при потере пакетов (Head-of-Line Blocking).`,
    practicalUsage: 'DNS-запросы (порт 53), DHCP, NTP (синхронизация времени), VPN (WireGuard, OpenVPN UDP), голосовая связь VoIP (SIP/RTP), видеостриминг и сетевой код мультиплеерных игр.',
    commandsOrConfig: `# Просмотр слушающих UDP портов с именами процессов
sudo ss -u -l -p -n

# Тестирование пропускной способности UDP через iperf3
iperf3 -c 192.168.1.10 -u -b 100M`,
    level: 'Junior',
    tags: ['UDP', 'Datagram', 'DNS', 'WireGuard', 'VoIP', 'Минимальная задержка'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-quic-protocol',
    section: 'Сети',
    category: 'Протоколы',
    title: 'QUIC / HTTP/3',
    shortSummary: 'Современный транспортный протокол поверх UDP с встроенным шифрованием TLS 1.3 и независимыми потоками.',
    description: `QUIC разработан для устранения главного недостатка TCP: потери одного пакета блокируют весь поток данных (Head-of-Line Blocking). Работая поверх UDP, QUIC передает множество независимых мультиплексированных потоков внутри одного соединения. Поддерживает установление защищенного соединения за 0-RTT, а при смене IP-адреса клиента (например, переход с Wi-Fi на 4G) соединение не разрывается благодаря Connection ID.`,
    practicalUsage: 'Стандарт протокола HTTP/3, CDN-сети (Cloudflare, Fastly), видеоплатформы YouTube, мобильные приложения с нестабильным соединением.',
    commandsOrConfig: `# Проверка поддержки HTTP/3 на сервере через curl с флагом --http3
curl -I --http3 https://cloudflare.com

# Директива Nginx для включения HTTP/3
listen 443 quic reuseport;
add_header Alt-Svc 'h3=":443"; ma=86400';`,
    level: 'Middle',
    tags: ['QUIC', 'HTTP/3', 'UDP', 'TLS 1.3', '0-RTT', 'Multiplexing'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-bgp-routing',
    section: 'Сети',
    category: 'Маршрутизация',
    title: 'BGP (Border Gateway Protocol)',
    shortSummary: 'Протокол динамической маршрутизации между автономными системами (AS) в глобальном интернете.',
    description: `BGP — протокол пути вектора (Path-Vector), на котором держится весь глобальный интернет. Маршрутизаторы обмениваются префиксами сетей вместе с атрибутом AS-Path (списком автономных систем, через которые прошел маршрут). Различают eBGP (между разными провайдерами) и iBGP (внутри одной сети). BGP позволяет гибко управлять входящим и исходящим трафиком с помощью атрибутов Local Preference, MED и BGP Communities.`,
    practicalUsage: 'Подключение дата-центров и корпоративных сетей к нескольким интернет-провайдерам (Multi-Homing), организация Anycast-балансировки (DNS, CDN), предотвращение изолированности сети при аварии магистрала.',
    commandsOrConfig: `# Установка FRRouting (FRR) в Linux для запуска BGP-демона
sudo apt-get install -y frr
sudo vtysh

# Просмотр таблицы маршрутов BGP
show ip bgp summary
show ip bgp neighbors`,
    level: 'Senior',
    tags: ['BGP', 'AS', 'Маршрутизация', 'Anycast', 'Multi-Homing', 'FRRouting'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-cgroups-v2',
    section: 'Linux & ОС',
    category: 'Ядро и Процессы',
    title: 'Control Groups v2 (cgroups v2)',
    shortSummary: 'Механизм ядра Linux для изоляции, ограничения и учета системных ресурсов процессов.',
    description: `cgroups v2 представляет собой единую иерархическую модель управления ресурсами (CPU, Memory, I/O, PIDs), заменившую фрагментированную структуру v1. В cgroups v2 ресурсный контроллер не может быть присоединен к разным деревьям, что гарантирует точный учет потребления памяти (включая файловый кэш и сокетные буферы ядра) и предотвращает ситуации, когда процесс в контейнере подвешивает весь сервер.`,
    practicalUsage: 'Основа работы Docker, Kubernetes, systemd слайсов (user.slice, system.slice) и контейнеров Podman. Позволяет жестко задавать лимиты: memory.max, cpu.max, io.max.',
    commandsOrConfig: `# Проверка версии cgroups в системе
stat -fc %T /sys/fs/cgroup/  # cgroup2fs означает v2

# Просмотр ограничений памяти systemd службы
systemctl show nginx -p MemoryMax,CPUQuota

# Установка лимита памяти на лету через systemd-run
systemd-run --scope -p MemoryMax=500M -p CPUQuota=50% ./heavy_process.sh`,
    level: 'Middle',
    tags: ['Linux', 'Kernel', 'cgroups', 'systemd', 'Лимиты ресурсов', 'Docker'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-ebpf-xdp',
    section: 'Безопасность & Фаерволы',
    category: 'Фильтрация пакетов',
    title: 'eBPF & XDP (eXpress Data Path)',
    shortSummary: 'Сверхбыстрая фильтрация сетевых пакетов на уровне драйвера сетевой карты с производительностью до миллионов пакетов в секунду.',
    description: `eBPF (Extended Berkeley Packet Filter) позволяет безопасно выполнять пользовательские микропрограммы внутри ядра Linux без модификации исходного кода ядра. Технология XDP перехватывает сетевой пакет в драйвере сетевой карты еще ДО того, как ядро выделит под него структуру сокетного буфера sk_buff. Это позволяет отбрасывать нежелательные пакеты (XDP_DROP) со скоростью интерфейса (line-rate) с минимальным расходом CPU.`,
    practicalUsage: 'Защита от мощных DDoS-атак (SYN flood, UDP amplification), высокопроизводительные балансировщики нагрузки (Cilium, Cloudflare Unimog, Facebook Katran), observability метрики сети в реальном времени.',
    commandsOrConfig: `# Просмотр загруженных eBPF программ в системе
sudo bpftool prog list

# Установка утилит bcc-tools для анализа ядра
sudo apt-get install -y bpfcc-tools
sudo tcpretrans-bpfcc   # отслеживание повторных передач TCP на лету`,
    level: 'Senior',
    tags: ['eBPF', 'XDP', 'DDoS', 'Cilium', 'Kernel', 'Сетевая безопасность'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-zfs-cow',
    section: 'Linux & ОС',
    category: 'Хранилище & Файловые системы',
    title: 'ZFS (Zettabyte File System) & Copy-on-Write',
    shortSummary: 'Файловая система и менеджер томов корпоративного уровня с автоматической защитой от Silent Data Corruption.',
    description: `ZFS объединяет функции RAID-контроллера, менеджера логических томов (LVM) и файловой системы. Благодаря архитектуре Copy-on-Write (CoW) данные никогда не перезаписываются на старом месте: новый блок записывается в свободное пространство, и только затем обновляется ссылка метаданных. Каждый блок защищен криптографической контрольной суммой (checksumming), что позволяет выявлять "тихое" повреждение данных на дисках и автоматически восстанавливать их из зеркал при процедуре Scrubbing.`,
    practicalUsage: 'Корпоративные СХД, гипервизоры Proxmox VE, серверы баз данных, системы долгосрочного хранения архивов и бэкапов. Мгновенное создание снепшотов без снижения скорости ввода-вывода.',
    commandsOrConfig: `# Проверка статуса ZFS пулов и целостности
zpool status -v

# Запуск регулярной проверки контрольных сумм всех блоков
sudo zpool scrub tank

# Создание мгновенного CoW-снапшота
zfs snapshot tank/data@backup-$(date +%F)`,
    level: 'Middle',
    tags: ['ZFS', 'Copy-on-Write', 'Scrubbing', 'Proxmox', 'СХД', 'RAID-Z'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-postgres-wal',
    section: 'Базы данных',
    category: 'Репликация & Надежность',
    title: 'PostgreSQL WAL (Write-Ahead Logging)',
    shortSummary: 'Журналирование упреждающей записи для гарантии целостности ACID и непрерывной потоковой репликации.',
    description: `Принцип WAL гласит: любые изменения данных (INSERT/UPDATE/DELETE) должны быть сначала сброшены на постоянный диск в журнал транзакций (WAL-сегменты), и только затем изменения могут быть записаны в файлы таблиц. Это гарантирует надежность при сбое питания (Crash Recovery). На базе WAL построена физическая потоковая репликация (Streaming Replication) на Slave-серверы и Point-in-Time Recovery (PITR).`,
    practicalUsage: 'Отказоустойчивые кластеры PostgreSQL (Patroni, repmgr), восстановление базы на любую секунду в прошлом при случайном DROP TABLE, создание резервных реплик для чтения.',
    commandsOrConfig: `# Включение архивации WAL в postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'test ! -f /mnt/wal_archive/%f && cp %p /mnt/wal_archive/%f'

# Проверка текущей позиции записи WAL в psql
SELECT pg_current_wal_lsn(), pg_walfile_name(pg_current_wal_lsn());`,
    level: 'Middle',
    tags: ['PostgreSQL', 'WAL', 'ACID', 'PITR', 'Репликация', 'Бэкапы'],
    createdAt: '2026-11-11',
    updatedAt: '2026-11-11',
  },
  {
    id: 'kb-linux-pkg-apt-dnf',
    section: 'Linux & ОС',
    category: 'Пакетные менеджеры и Обновления',
    title: 'Пакетные менеджеры Linux: APT/DPKG (Debian/Ubuntu) и DNF/RPM (RHEL/AlmaLinux)',
    shortSummary: 'Управление зависимостями, безопасное обновление, фиксация версий пакетов (apt-mark hold) и диагностика сломанных репозиториев.',
    description: `В мире Linux доминируют два семейства пакетного управления:
1) DEB-системы (Debian, Ubuntu, Astra Linux): высокоуровневый apt работает поверх низкоуровневого dpkg, скачивая метаданные из /etc/apt/sources.list(.d/).
2) RPM-системы (RHEL, AlmaLinux, Rocky, РЕД ОС): современный dnf (заменил yum) работает поверх rpm, поддерживая модули и быстрый откат транзакций (dnf history undo).
Для изоляции от конфликтов библиотек также применяются универсальные контейнеризированные форматы Snap, Flatpak и AppImage.`,
    practicalUsage: 'Установка и удаление сервисов, автоматическая установка патчей безопасности (unattended-upgrades), блокировка нежелательного мажорного обновления ядра или БД.',
    commandsOrConfig: `# Ubuntu/Debian: обновление списка, установка и фиксация версии пакета
sudo apt update && sudo apt install -y htop curl
sudo apt-mark hold postgresql-16

# RHEL/AlmaLinux: просмотр истории установок и откат последней транзакции
sudo dnf history list
sudo dnf history undo last`,
    level: 'Junior',
    tags: ['Linux', 'APT', 'DPKG', 'DNF', 'RPM', 'Репозитории'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-office-word-ppt-collab',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Office & Корпоративная среда',
    title: 'Word, PowerPoint и совместная работа: Стили, Mail Merge и OneDrive/SharePoint',
    shortSummary: 'Автоматизация корпоративного документооборота: слияние документов (рассылки/договоры), автособираемые оглавления и шаблоны .dotx.',
    description: `Профессиональная работа с Microsoft Word в корпоративной среде строится на Стили (Заголовок 1–3, Основной текст) вместо ручного форматирования шрифтов — это позволяет в 1 клик обновлять автособираемое Оглавление (Table of Contents) и мгновенно менять дизайн всего 100-страничного регламента. Функция Слияние (Mail Merge) объединяет шаблон договора или сертификата в Word с базой сотрудников/клиентов в Excel для автоматической генерации сотен документов.

В корпоративных сетях на базе Microsoft 365 или локального SharePoint поддерживается Co-Authoring (одновременное редактирование одного файла несколькими пользователями с историей версий).`,
    practicalUsage: 'Создание корпоративных регламентов и инструкций (IT-политик), массовая генерация договоров и рассылок по списку из Excel, единые фирменные шаблоны презентаций PowerPoint (.potx).',
    commandsOrConfig: `# Ключевые форматы шаблонов и горячие клавиши Microsoft Office:
.dotx / .potx / .xltx   -> Корпоративные шаблоны без макросов
Ctrl + Alt + 1/2/3      -> Быстрое применение стилей Заголовка 1/2/3 в Word
Ctrl + Shift + N        -> Сброс выделенного текста в стиль "Обычный"
F5 (в PowerPoint)       -> Запуск показа слайдов с начала`,
    level: 'Junior',
    tags: ['Microsoft Office', 'Word', 'PowerPoint', 'Mail Merge', 'SharePoint', 'Шаблоны'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
];

export const INITIAL_KNOWLEDGE_ENTRIES: KnowledgeEntry[] = deduplicateKnowledgeEntries([
  ...CORE_INITIAL_ENTRIES,
  ...NETWORKS_WIRESHARK_CISCO_ENTRIES,
  ...PROTOCOLS_COMPREHENSIVE_ENTRIES,
  ...LINUX_FREEBSD_UNIX_ENTRIES,
  ...LINUX_COMPREHENSIVE_ENTRIES,
  ...WINDOWS_AD_HYPERV_SYSINTERNALS_ENTRIES,
  ...AUTOMATION_AND_DB_ENTRIES,
  ...DATABASES_EXTENDED_ENTRIES,
  ...ENTERPRISE_1C_AND_OFFICE_ENTRIES,
  ...OFFICE_VBA_AND_BIG_DATA_ENTRIES,
  ...CISCO_COMPREHENSIVE_ENTRIES,
  ...FREEBSD_UNIX_COMPREHENSIVE_ENTRIES,
  ...WINDOWS_AD_COMPREHENSIVE_ENTRIES,
  ...VIRTUALIZATION_COMPREHENSIVE_ENTRIES,
  ...SYSINTERNALS_COMPREHENSIVE_ENTRIES,
  ...AUTOMATION_COMPREHENSIVE_ENTRIES,
  ...ONEC_COMPREHENSIVE_ENTRIES,
]);

