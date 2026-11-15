import { KnowledgeEntry } from '../../types/knowledgeBase';

export const CISCO_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  // ==================== 1. ОБЩАЯ ИНФОРМАЦИЯ ПО ОБОРУДОВАНИЮ И ОС CISCO ====================
  {
    id: 'kb-cisco-hardware-lineup',
    section: 'Cisco и Сетевое оборудование',
    category: 'Оборудование и ОС Cisco (Общая информация)',
    title: 'Линейки оборудования Cisco: Catalyst, Nexus, ISR/ASR и межсетевые экраны ASA/FTD',
    shortSummary: 'Назначение основных серий сетевого оборудования Cisco в архитектуре Access / Distribution / Core / WAN / DC.',
    description: `Сетевое оборудование Cisco строится по трёхуровневой иерархической модели сети (Access — Distribution — Core) и делится на чёткие продуктовые линейки:
1) Кампусные коммутаторы Catalyst (уровень доступа и ядра офиса):
   • Серии 2960-X / 9200 / 9200L — уровень Access для подключения ПК, IP-телефонов (PoE/PoE+) и точек доступа Wi-Fi;
   • Серии 3650 / 3850 / 9300 / 9500 — L3-коммутаторы уровня распределения (Distribution) и ядра (Core) с поддержкой аппаратного стекирования StackWise, UPOE (до 60–90 Вт/порт) и полной маршрутизации OSPF/BGP/VRF.
2) Коммутаторы ЦОД Nexus (серии 3000 / 5000 / 7000 / 9000): сверхнизкие задержки, 10G/25G/40G/100G/400G порты, vPC (Virtual Port Channel — актив-актив агрегация к разным шасси) и VXLAN EVPN фабрики.
3) Маршрутизаторы (WAN / Граница сети):
   • ISR (Integrated Services Routers — 1000 / 4000 / Catalyst 8200/8300) — филиальные и центральные роутеры с модулями NIM/EHWIC, шифрованием IPsec/DMVPN и голосом;
   • ASR (Aggregation Services Routers — 1000 / 9000) — высокопроизводительные операторские роутеры с BGP Full View.
4) Безопасность: Cisco ASA и современное поколение Firepower (FTD — Firepower Threat Defense) для NGFW, IPS и AnyConnect VPN.`,
    practicalUsage: 'Выбор правильной модели при проектировании корпоративной ЛВС и ЦОД, чтение маркировки моделей (например, C9300-48P-A = 48 портов 1G, PoE+, лицензия Network Advantage).',
    commandsOrConfig: `! Проверка точной модели, серийного номера, модулей и состояния БП/вентиляторов
SW-01# show version | include Model|Serial|System image
SW-01# show inventory
SW-01# show environment all
SW-01# show power inline           ! проверка расхода и бюджета PoE по портам`,
    level: 'Junior',
    tags: ['Cisco', 'Catalyst', 'Nexus', 'ISR', 'ASR', 'Firepower', 'PoE', 'Оборудование'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-os-families',
    section: 'Cisco и Сетевое оборудование',
    category: 'Оборудование и ОС Cisco (Общая информация)',
    title: 'Операционные системы Cisco: IOS, IOS-XE, IOS-XR и NX-OS (архитектура и различия)',
    shortSummary: 'Чем классический монолитный IOS отличается от модульного IOS-XE поверх Linux, дата-центровой NX-OS и операторской IOS-XR.',
    description: `У Cisco не одна ОС — на разных линейках устройств работают четыре ключевые платформы с похожим, но отличающимся CLI:
• Classic Cisco IOS (Catalyst 2960/3560/3750, ISR G2): монолитное ядро реального времени в одном бинарном файле (.bin). Всё работает в общем адресном пространстве; нет встроенного автоматического commit.
• Cisco IOS-XE (Catalyst 9200/9300/9500, ISR 4000, ASR 1000, Catalyst 8000): современная ОС поверх ядра Linux, где процессы IOS запущены как отдельные демоны (IOSd), поддерживаются контейнеры (Guest Shell / Python), NETCONF/RESTCONF API и потоковая телеметрия.
• Cisco NX-OS (коммутаторы ЦОД Nexus): основана на модульном Linux-подобном ядре с изоляцией процессов. Отличия CLI: фичи включаются явно командой feature ospf / feature lacp, интерфейс управления mgmt0, copy run start вместо wr (или алиас), чекпоинты rollback.
• Cisco IOS-XR (магистральные роутеры ASR 9000 / NCS): операторская микроядерная ОС (QNX/Linux) с двухэтапной транзакционной конфигурацией — изменения применяются только после команды commit (как в Junos), с возможностью мгновенного rollback.`,
    practicalUsage: 'Уверенная работа на любом устройстве Cisco — от старого офисного Catalyst 2960 до современной фабрики Nexus 9000 и магистрального роутера провайдера.',
    commandsOrConfig: `! Особенности NX-OS (Cisco Nexus): явное включение модулей и быстрый rollback
NX-01(config)# feature lacp
NX-01(config)# feature vpc
NX-01(config)# feature ospf
NX-01# checkpoint my_safe_point
NX-01# rollback running-config checkpoint my_safe_point

! Особенности IOS-XR: транзакционный коммит изменений
RP/0/RP0/CPU0:XR-01(config)# router bgp 65001
RP/0/RP0/CPU0:XR-01(config-bgp)# show configuration   ! просмотр черновика до применения
RP/0/RP0/CPU0:XR-01(config-bgp)# commit confirmed 120 ! автооткат через 120 сек, если не подтвердить!`,
    level: 'Middle',
    tags: ['Cisco', 'IOS', 'IOS-XE', 'NX-OS', 'IOS-XR', 'Архитектура', 'commit'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-memory-boot-recovery',
    section: 'Cisco и Сетевое оборудование',
    category: 'Оборудование и ОС Cisco (Общая информация)',
    title: 'Память устройств Cisco (RAM, NVRAM, Flash, ROMMON), загрузка и сброс пароля',
    shortSummary: 'За что отвечает каждый вид памяти, регистры загрузки 0x2102 / 0x2142 и пошаговое восстановление доступа без потери конфигурации.',
    description: `Понимание подсистемы памяти Cisco необходимо для безопасного обновления прошивки и аварийного восстановления:
• ROM / ROMMON (Read-Only Memory Monitor): аналог BIOS/UEFI. Хранит базовый загрузчик, выполняет POST и даёт аварийную консоль rommon 1> при повреждении образа ОС или сбросе пароля.
• Flash (flash: / bootflash:): энергонезависимая память, где хранится образ ОС (.bin / .packages.conf), файлы vlan.dat (база VLAN!), архивы конфигов и криптоключи.
• NVRAM (Non-Volatile RAM): энергонезависимая память, хранящая startup-config — файл конфигурации, загружаемый при старте.
• RAM (Оперативная память): хранит активную ОС, running-config, таблицы маршрутизации, MAC/ARP кэши и буферы пакетов.

Последовательность загрузки: POST -> Bootloader -> загрузка образа из Flash (переменная boot system) -> чтение startup-config из NVRAM в running-config.
Если утерян пароль, через консоль прерывают загрузку (Ctrl+Break / кнопка Mode на коммутаторе), выставляют регистр 0x2142 (игнорировать startup-config), загружаются, копируют startup в running, меняют пароль и ВОЗВРАЩАЮТ регистр 0x2102!`,
    practicalUsage: 'Безопасный сброс пароля на доставшемся «по наследству» свитче/роутере без стирания рабочей конфигурации, очистка переполненной Flash-памяти перед обновлением IOS.',
    commandsOrConfig: `! Просмотр файловой системы Flash, базы VLAN и регистра конфигурации
SW-01# dir flash:
SW-01# show file systems
SW-01# show version | include Configuration register

! Восстановление забытого пароля на маршрутизаторе (через ROMMON + Console):
rommon 1 > confreg 0x2142
rommon 2 > reset
! После загрузки без конфига:
Router> enable
Router# copy startup-config running-config
Router# configure terminal
Router(config)# enable secret NewStrongPassword!
Router(config)# config-register 0x2102
Router(config)# end
Router# write memory`,
    level: 'Middle',
    tags: ['Cisco', 'ROMMON', 'NVRAM', 'Flash', 'confreg', 'Сброс пароля', 'Загрузка'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 2. ПОДКЛЮЧЕНИЕ И ФИЗИКА ОБОРУДОВАНИЯ ====================
  {
    id: 'kb-cisco-console-oob-connect',
    section: 'Cisco и Сетевое оборудование',
    category: 'Подключение и Физика оборудования Cisco',
    title: 'Подключение к Cisco: Console RJ-45 / Mini-USB, параметры 9600-8-N-1, AUX и Management (OOB)',
    shortSummary: 'Как физически подключиться к новому или заблокированному устройству, распиновка Rollover-кабеля и настройка терминалов (PuTTY, screen, minicom).',
    description: `Новый или потерявший сетевую доступ коммутатор/маршрутизатор Cisco настраивается через порт Console (обозначен голубым цветом):
1) Консольный порт RJ-45 (RS-232): подключается фирменным плоским голубым кабелем (Rollover — зеркальная распиновка 1-8..8-1) через переходник USB-to-Serial (на чипах FTDI или Prolific PL2303). В Linux устройство определяется как /dev/ttyUSB0, в Windows — как COM3/COM4 в Диспетчере устройств.
2) Консольный порт Mini-USB / USB-C (на современных Catalyst 9k, ISR 4k): работает напрямую обычным USB-кабелем; в Linux появляется как /dev/ttyACM0 (драйвер cdc_acm), в Windows может потребовать драйвер Cisco USB Console.
3) Обязательные параметры последовательного порта (UART):
   Speed: 9600 baud | Data bits: 8 | Parity: None | Stop bits: 1 | Flow control: None (9600-8-N-1).
4) Выделенный порт Out-of-Band Management (Mgmt0 / Gi0/0 Li0 в изолированном VRF Mgmt-vrf): используется для удалённого управления по SSH даже при шторме или сбое маршрутизации в основной сети передачи данных!`,
    practicalUsage: 'Первое включение оборудования «из коробки», настройка удалённого OOB-управления через консольный сервер (Terminal Server), подключение с ноутбука инженера на Linux/macOS/Windows.',
    commandsOrConfig: `# Подключение по консоли к Cisco с ноутбука на Linux / macOS:
ls -l /dev/ttyUSB* /dev/ttyACM*
sudo usermod -aG dialout $USER          # выдать права на COM-порт без sudo
screen /dev/ttyUSB0 9600                # выход из screen: Ctrl+A затем K -> y
# Либо через picocom / minicom / putty:
picocom -b 9600 /dev/ttyUSB0

! Настройка консольной линии на самом Cisco (защита от обрыва вывода логов посреди ввода команды):
SW-01(config)# line console 0
SW-01(config-line)# logging synchronous
SW-01(config-line)# exec-timeout 15 0
SW-01(config-line)# login local

! Настройка OOB-порта управления Catalyst 9200/9300 (отдельный VRF Mgmt-vrf)
SW-01(config)# interface GigabitEthernet0/0
SW-01(config-if)# vrf forwarding Mgmt-vrf
SW-01(config-if)# ip address 10.255.0.10 255.255.255.0`,
    level: 'Junior',
    tags: ['Cisco', 'Console', 'RJ-45', 'USB', 'PuTTY', 'screen', '9600-8-N-1', 'OOB', 'Подключение'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-optics-cabling-stack',
    section: 'Cisco и Сетевое оборудование',
    category: 'Подключение и Физика оборудования Cisco',
    title: 'Оптика SFP/SFP+, патчинг, DOM-уровни (dBm), StackWise и тест кабеля TDR',
    shortSummary: 'Типы трансиверов и оптических патч-кордов (MMF vs SMF), диагностика затухания оптики, проверка витой пары без тестера и стекирование.',
    description: `При физическом подключении коммутаторов Cisco критично правильно подобрать среду передачи и уметь проверять L1 из консоли:
• Витая пара (Cat5e/6/6a): современные гигабитные порты Cisco поддерживают Auto-MDIX, поэтому одинаково работают прямые и кроссоверные патчи (но порт должен быть в auto speed/duplex). Встроенный TDR-рефлектометр (test cable-diagnostics tdr) измеряет длину кабеля и точно показывает пару в обрыве или коротком замыкании прямо из CLI!
• Оптические модули SFP (1G) и SFP+ (10G):
  - Многомод (MMF, оранжевые или бирюзовые OM3/OM4 патчи): модули SX / SR (850 нм, до 300–550 м внутри здания).
  - Одномод (SMF, жёлтые OS2 патчи): модули LX / LH / LR (1310 нм, 10+ км) и ER/ZR (40–80 км). При подключении одномодового патча на коротком линке 20 км+ может потребоваться оптический аттенюатор.
  - Сторонние совместимые модули на Cisco часто блокируются по умолчанию — временно лечится парой скрытых/сервисных команд unsupported-transceiver.
• StackWise (на Catalyst 3750/3850/9200/9300): объединение до 8–9 физических коммутаторов специальным задним кабелем в один логический коммутатор с единым IP, единым конфигом и нумерацией портов Gi1/0/x, Gi2/0/x.`,
    practicalUsage: 'Диагностика «мигающего» аплинка или низкой скорости на 10G оптике по уровням Rx/Tx dBm (DOM), поиск перебитого кабеля в стене за 10 секунд без выезда с дорогим Fluke, сборка стека.',
    commandsOrConfig: `! 1. Проверка оптических уровней Rx/Tx (DOM), температуры и питания SFP модулей
SW-01# show interfaces transceiver detail
SW-01# show interfaces TenGigabitEthernet1/1/1 transceiver

! 2. Встроенный кабельный тестер витой пары (TDR) прямо на порту коммутатора
SW-01# test cable-diagnostics tdr interface GigabitEthernet1/0/15
SW-01# show cable-diagnostics tdr interface GigabitEthernet1/0/15

! 3. Разрешение неоригинальных совместимых SFP модулей (если заблокированы err-disabled)
SW-01(config)# service unsupported-transceiver
SW-01(config)# no errdisable detect cause gbic-invalid

! 4. Диагностика физического стека StackWise
SW-01# show switch
SW-01# show switch stack-ports summary`,
    level: 'Middle',
    tags: ['Cisco', 'SFP', 'SFP+', 'Оптика', 'DOM', 'TDR', 'StackWise', 'Витая пара'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 3. ПОЛНЫЙ СПРАВОЧНИК КОМАНД CISCO ДЛЯ ИНЖЕНЕРОВ ====================
  {
    id: 'kb-cisco-cmd-show-diagnostics',
    section: 'Cisco и Сетевое оборудование',
    category: 'Справочник команд Cisco IOS / IOS-XE',
    title: 'Главные команды диагностики Cisco (show): интерфейсы, MAC/ARP, CDP/LLDP, CPU и пайпы',
    shortSummary: 'Полный набор команд чтения состояния коммутатора и маршрутизатора + фильтры вывода (include, exclude, section, begin).',
    description: `Сетевой инженер 80% времени читает состояние сети командами show (в режиме # или из любого режима конфигурации с приставкой do show). Чтобы не листать тысячи строк конфига, в Cisco используются пайпы (|):
• | include <шаблон> (сокращённо | i) — показать только совпадающие строки;
• | exclude <шаблон> (| e) — скрыть ненужное (например, строки с !);
• | begin <слово> (| b) — начать вывод с указанного места;
• | section <слово> (| s) — вывести целиком блок конфигурации (например, sh run | s router ospf).

Ключевые диагностические show-команды:
- Состояние портов: show ip interface brief (L1/L2 + IP) и show interfaces status (VLAN, дуплекс, скорость, тип SFP на свитчах).
- Ошибки на порту: show interfaces Gi0/1 (CRC, Input errors, Runts, Giants, Output drops — признаки плохого кабеля/трансивера или перегруза).
- Таблицы L2/L3: show mac address-table (на каком порту живёт MAC), show ip arp (привязка IP-MAC).
- Поиск соседей: show cdp neighbors detail (Cisco-протокол L2 — покажет модель, порт и IP соседнего свитча/телефона!) и show lldp neighbors detail (для MikroTik, HP, серверов).`,
    practicalUsage: 'Мгновенный поиск к какому именно порту в стойке подключён ПК, сервер или соседний коммутатор, поиск проблемного кабеля по CRC-ошибкам и аудит загрузки CPU/памяти.',
    commandsOrConfig: `! Интерфейсы, IP-адреса и физический статус портов
SW-01# show ip interface brief | exclude unassigned
SW-01# show interfaces status
SW-01# show interfaces counters errors

! Фильтрация конфига пайпами (супер-экономия времени)
SW-01# show running-config | section interface GigabitEthernet0/1
SW-01# show running-config | include hostname|username|ip route

! Где физически подключено устройство? (MAC -> ARP -> Соседи)
SW-01# show mac address-table address aabb.ccdd.1122
SW-01# show ip arp | include 10.10.20.55
SW-01# show cdp neighbors detail
SW-01# show lldp neighbors

! Ресурсы, логи и перечень заблокированных портов (err-disabled)
SW-01# show processes cpu sorted | exclude 0.00%
SW-01# show memory statistics
SW-01# show logging last 50
SW-01# show interfaces status err-disabled`,
    level: 'Junior',
    tags: ['Cisco', 'show', 'CLI', 'CDP', 'LLDP', 'MAC', 'ARP', 'Пайпы', 'Диагностика'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-cmd-navigation-file-ops',
    section: 'Cisco и Сетевое оборудование',
    category: 'Справочник команд Cisco IOS / IOS-XE',
    title: 'Команды CLI Cisco: горячие клавиши, файлы, бэкапы (TFTP/SCP), archive rollback и reload in',
    shortSummary: 'Настройка безопасного редактирования на удалённом устройстве: откат по таймеру (reload in), автобэкап конфига и быстрая работа в терминале.',
    description: `Опытного сетевого инженера отличает скорость работы в консоли и страховка от потери удалённого доступа:
• Обязательные хоткеи CLI: Ctrl+A (в начало строки), Ctrl+E (в конец), Ctrl+Z (выйти сразу в # из любого подрежима), Ctrl+R (перерисовать строку, если выскочил лог), Tab (автодополнение), ? (контекстная справка команд), команда no <команда> (отмена любой настройки), default interface Gi0/1 (сброс порта в заводские настройки одной командой!).
• Страховка от потери связи: перед опасной правкой ACL/маршрутизации на удалённом объекте выполните reload in 10 (перезагрузит роутер через 10 минут к старому startup-config). Если всё прошло успешно — сразу отмените командой reload cancel!
• Транзакционный откат конфигурации (archive + configure replace): позволяет откатить ошибочный running-config целиком к точке сохранения без перезагрузки устройства, а также автоматически отправлять бэкап на SCP/TFTP сервер после каждого write memory.`,
    practicalUsage: 'Безопасная удалённая перенастройка роутеров в других городах без риска «окирпичить» линк и ехать туда машиной, массовое конфигурирование десятков портов через interface range.',
    commandsOrConfig: `! Полезные настройки удобства терминала и отключённый зависающий DNS-поиск опечаток!
R1(config)# no ip domain-lookup       ! чтобы опечатка не вешала консоль на 30 сек
R1# terminal length 0                 ! отключить постраничную паузу --More-- (удобно для бэкапа)

! Страховка от потери удалённого доступа (таймер автоперезагрузки)
R1# reload in 10
! ... вносим опасные правки ... Если доступ остался:
R1# reload cancel
R1# write memory

! Настройка локального архива и мгновенного отката (Cisco Configuration Replace)
R1(config)# archive
R1(config-archive)# path flash:backup-cfg
R1(config-archive)# write-memory
R1# configure terminal revert timer 5   ! автооткат конфига через 5 мин без "configure confirm"!

! Быстрый сброс порта и массовое применение настроек на диапазон портов
SW-01(config)# default interface GigabitEthernet1/0/5
SW-01(config)# interface range GigabitEthernet1/0/1 - 24
SW-01(config-if-range)# description USER_PORTS`,
    level: 'Middle',
    tags: ['Cisco', 'CLI', 'reload in', 'archive', 'configure replace', 'TFTP', 'SCP', 'Хоткеи'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-cmd-routing-static-bgp',
    section: 'Cisco и Сетевое оборудование',
    category: 'Справочник команд Cisco IOS / IOS-XE',
    title: 'Команды маршрутизации Cisco: Static/Floating маршруты, BGP, VRF, Ping с source/MTU и Traceroute',
    shortSummary: 'Настройка статических и резервных маршрутов (Floating Static), сессий eBGP, изоляция таблиц маршрутизации VRF и проверка Path MTU.',
    description: `Помимо OSPF, в корпоративных сетях и на границе с провайдерами инженер регулярно использует:
• Static Route и Floating Static Route: ip route <сеть> <маска> <next-hop> [AD]. Указав административную дистанцию выше протокола (например, 250 или 5 для резервного IPsec/ISP канала), маршрут автоматически поднимется только при падении основного! Вместе с ip sla и track можно переключаться при потере пинга до интернета даже при физически живом порте провайдера.
• BGP (eBGP к провайдерам): router bgp <ASN>, объявление префиксов (network ... mask ...), проверка статуса пиринга show ip bgp summary (в колонке State/PfxRcd должно быть число полученных префиксов, а не Active/Idle!).
• VRF (Virtual Routing and Forwarding): разделение роутера на несколько полностью независимых таблиц маршрутизации (например, изолированный VRF для гостевого интернета, DMZ и корпоративной сети).
• Расширенный ping: позволяет указать интерфейс-источник (source) и флаг запрета фрагментации (df-bit) для поиска проблемного MTU на VPN-туннелях.`,
    practicalUsage: 'Настройка резервного интернет-канала с автопереключением (Dual-WAN / IP SLA), стык с интернет-провайдером по BGP, диагностика асимметричной маршрутизации и чёрных дыр MTU.',
    commandsOrConfig: `! Статический маршрут по умолчанию и резервный (Floating Static с AD=200)
R1(config)# ip route 0.0.0.0 0.0.0.0 198.51.100.1
R1(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1 200

! Базовый eBGP к провайдеру (AS 65100 -> провайдер AS 3356)
R1(config)# router bgp 65100
R1(config-router)# bgp router-id 198.51.100.2
R1(config-router)# neighbor 198.51.100.1 remote-as 3356
R1(config-router)# address-family ipv4 unicast
R1(config-router-af)# network 192.0.2.0 mask 255.255.255.0

! Диагностика маршрутизации и BGP
R1# show ip route
R1# show ip route 8.8.8.8
R1# show ip bgp summary
R1# show ip bgp neighbors 198.51.100.1 received-routes

! Проверка MTU и связности из конкретного внутреннего VLAN/Loopback
R1# ping 8.8.8.8 source Loopback0 size 1472 df-bit
R1# traceroute 10.50.0.10 source GigabitEthernet0/1`,
    level: 'Middle',
    tags: ['Cisco', 'Маршрутизация', 'Static Route', 'BGP', 'VRF', 'IP SLA', 'MTU', 'traceroute'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-cmd-nat-dhcp-services',
    section: 'Cisco и Сетевое оборудование',
    category: 'Справочник команд Cisco IOS / IOS-XE',
    title: 'Команды служб в Cisco IOS: NAT/PAT, DHCP-сервер, NTP, Syslog и SNMP',
    shortSummary: 'Настройка выхода офиса в интернет (PAT Overload), проброса портов (DNAT), локального DHCP-пула и интеграции с мониторингом/логированием.',
    description: `Маршрутизатор Cisco часто выполняет не только маршрутизацию, но и базовые инфраструктурные сервисы:
• NAT / PAT (Overload): интерфейсы чётко размечаются на ip nat inside (локальная сеть) и ip nat outside (канал провайдера). Динамический PAT переводит весь внутренний трафик из ACL в IP внешнего интерфейса (overload), а статический NAT пробрасывает конкретный порт внутрь (например, TCP 443 на внутренний веб-сервер).
• Встроенный DHCP-сервер: сначала задаются исключённые адреса (ip dhcp excluded-address — шлюз, принтеры, серверы), затем пул (network, default-router, dns-server, lease).
• Эксплуатационная обвязка (Management Plane): точное время NTP (иначе в логах будут неверные метки 1993 года!), пересылка логов на внешний Syslog/SIEM (logging host) с метками времени service timestamps log datetime msec и опрос метрик Zabbix/Prometheus по SNMPv2c/SNMPv3.`,
    practicalUsage: 'Настройка офисного пограничного маршрутизатора с нуля, проброс сервисов внутрь сети, интеграция Cisco в Zabbix/Graylog и оперативная очистка зависших сессий NAT.',
    commandsOrConfig: `! 1. Настройка PAT (выход локалки 10.10.0.0/16 в интернет) и проброса порта 443
R1(config)# interface GigabitEthernet0/0
R1(config-if)# ip nat outside
R1(config)# interface GigabitEthernet0/1
R1(config-if)# ip nat inside
R1(config)# ip access-list standard NAT_LAN
R1(config-std-nacl)# permit 10.10.0.0 0.0.255.255
R1(config)# ip nat inside source list NAT_LAN interface GigabitEthernet0/0 overload
R1(config)# ip nat inside source static tcp 10.10.1.50 443 interface GigabitEthernet0/0 443
R1# show ip nat translations

! 2. Локальный DHCP-сервер на Cisco
R1(config)# ip dhcp excluded-address 10.10.20.1 10.10.20.30
R1(config)# ip dhcp pool OFFICE_VLAN20
R1(dhcp-config)# network 10.10.20.0 255.255.255.0
R1(dhcp-config)# default-router 10.10.20.1
R1(dhcp-config)# dns-server 10.10.1.2 1.1.1.1
R1# show ip dhcp binding

! 3. Время, Syslog и SNMP для Zabbix
R1(config)# clock timezone MSK 3 0
R1(config)# ntp server 10.10.1.2
R1(config)# service timestamps log datetime msec localtime
R1(config)# logging host 10.10.1.100`,
    level: 'Junior',
    tags: ['Cisco', 'NAT', 'PAT', 'DHCP', 'NTP', 'Syslog', 'SNMP', 'Команды'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-cmd-l2-security-troubleshooting',
    section: 'Cisco и Сетевое оборудование',
    category: 'Справочник команд Cisco IOS / IOS-XE',
    title: 'Команды защиты L2 и глубокого траблшутинга Cisco: DHCP Snooping, DAI, SPAN, EPC и Debug',
    shortSummary: 'Защита от Rogue DHCP и ARP-спуфинга, зеркалирование трафика в Wireshark (SPAN), захват пакетов внутри IOS-XE и безопасный debug.',
    description: `Для защиты кампусной сети от внутренних атак и глубокой отладки трафика в Cisco встроены мощные инструменты:
• DHCP Snooping + Dynamic ARP Inspection (DAI): коммутатор слушает DHCP-выдачу, запоминает легитимную связку IP+MAC+Порт и блокирует ответы от поддельных DHCP-серверов (разрешены только на trusted аплинках!) и подмену ARP-ответов.
• Storm-Control: ограничивает долю широковещательного/мультикаст трафика на порту (например, 15%), спасая свитч от петель.
• SPAN / RSPAN (monitor session): копирует трафик с нужных портов или VLAN на порт анализатора, куда подключён ноутбук с Wireshark.
• Embedded Packet Capture (EPC) в IOS-XE: позволяет записать .pcap дамп прямо в память/Flash самого маршрутизатора или Catalyst 9k без подключения внешнего сниффера!
• Debug (debug ip ospf adj / debug crypto isakmp): мощный инструмент, но опасный на нагруженном устройстве (способен положить CPU на 100%). Всегда включайте terminal monitor (для SSH) и отключайте командой undebug all (сокращённо u all).`,
    practicalUsage: 'Защита офисной сети от подмены шлюза (MITM/ARP Spoofing), перехват и разбор пакетов в реальном времени прямо с удалённого роутера без выезда на объект.',
    commandsOrConfig: `! 1. Защита L2: DHCP Snooping + DAI (доверенный только аплинк Gi0/24!)
SW-01(config)# ip dhcp snooping
SW-01(config)# ip dhcp snooping vlan 10,20
SW-01(config)# ip arp inspection vlan 10,20
SW-01(config)# interface GigabitEthernet0/24
SW-01(config-if)# ip dhcp snooping trust
SW-01(config-if)# ip arp inspection trust

! 2. Зеркалирование трафика в Wireshark (SPAN) с порта Gi0/1 на порт Gi0/10
SW-01(config)# monitor session 1 source interface GigabitEthernet0/1 both
SW-01(config)# monitor session 1 destination interface GigabitEthernet0/10

! 3. Снятие PCAP-дампа прямо на Catalyst 9k / ISR (Embedded Packet Capture)
R1# monitor capture MYCAP interface GigabitEthernet0/0/0 both
R1# monitor capture MYCAP match ipv4 host 10.10.1.50 any
R1# monitor capture MYCAP start
R1# monitor capture MYCAP stop
R1# monitor capture MYCAP export flash:dump.pcap

! 4. Безопасная отладка и автовосстановление портов err-disabled
R1# terminal monitor
R1# debug ip icmp
R1# undebug all    ! (коротко: u all)
SW-01(config)# errdisable recovery cause bpduguard
SW-01(config)# errdisable recovery interval 300`,
    level: 'Senior',
    tags: ['Cisco', 'DHCP Snooping', 'DAI', 'SPAN', 'EPC', 'Packet Capture', 'Debug', 'Безопасность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-cisco-cmd-aaa-tacacs-radius',
    section: 'Cisco и Сетевое оборудование',
    category: 'Справочник команд Cisco IOS / IOS-XE',
    title: 'Команды AAA, TACACS+ и RADIUS в Cisco IOS: централизованный доступ и аудит команд',
    shortSummary: 'Настройка аутентификации инженеров через Active Directory / Cisco ISE с обязательным резервным локальным входом при падении сервера.',
    description: `Хранить одинаковых локальных пользователей на 100 коммутаторах небезопасно: при увольнении инженера придётся менять пароли вручную везде. Архитектура AAA (Authentication, Authorization, Accounting) переносит проверку на центральный сервер:
• TACACS+ (TCP/49, стандарт для управления железом — Cisco ISE, tac_plus): шифрует весь пакет целиком (не только пароль), разделяет аутентификацию, авторизацию каждой введённой команды и полный аудит (кто, когда и какую команду конфига ввёл!).
• RADIUS (UDP/1812, 1813): чаще используется для сетевого доступа пользователей по Wi-Fi и 802.1X на портах (NAC).

Критическое правило продакшена: в методе аутентификации всегда указывайте fallback local (group tacacs+ local) — тогда если сервер AAA или канал к нему упадёт, вы всё равно сможете войти по локальному аварийному паролю!`,
    practicalUsage: 'Внедрение единого входа сетевых инженеров на парк устройств Cisco через Active Directory + Cisco ISE, ведение аудита кто именно удалил VLAN или изменил маршрут.',
    commandsOrConfig: `! Создание аварийного локального админа перед включением AAA!
SW-01(config)# username emergency_admin privilege 15 secret SuperBackupPass!

! Включение AAA и подключение сервера TACACS+ (современный синтаксис)
SW-01(config)# aaa new-model
SW-01(config)# tacacs server ISE_PRIMARY
SW-01(config-server-tacacs)# address ipv4 10.10.1.30
SW-01(config-server-tacacs)# key SecretTacacsSharedKey
SW-01(config-server-tacacs)# exit

SW-01(config)# aaa group server tacacs+ TACACS_GROUP
SW-01(config-sg-tacacs+)# server name ISE_PRIMARY

! Методы: сначала TACACS+, при недоступности сервера -> локальная база
SW-01(config)# aaa authentication login default group TACACS_GROUP local
SW-01(config)# aaa authorization exec default group TACACS_GROUP local
SW-01(config)# aaa accounting commands 15 default start-stop group TACACS_GROUP

! Тест проверки учётной записи без выхода из текущей сессии!
SW-01# test aaa group TACACS_GROUP netadmin TestPass legacy`,
    level: 'Senior',
    tags: ['Cisco', 'AAA', 'TACACS+', 'RADIUS', 'Cisco ISE', 'Аудит', 'Безопасность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
