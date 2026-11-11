import { RoadmapStep } from '../types/sysadmin';

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 1,
    slug: 'hardware-and-os-basics',
    title: 'Серверное железо, архитектура ПК и BIOS/UEFI',
    subtitle: 'Фундамент: от понимания компонентов сервера до диагностики неисправностей',
    level: 'Junior Base',
    durationWeeks: '2 недели',
    estimatedHours: 25,
    iconName: 'Cpu',
    keySkills: [
      'Архитектура x86-64',
      'Серверные CPU (Xeon, EPYC)',
      'ECC RAM',
      'RAID 0/1/5/6/10',
      'IPMI / iDRAC / iLO',
      'UEFI & Secure Boot',
      'smartctl & memtest',
    ],
    theorySummary:
      'Системный администратор должен четко понимать, как работает "железо": почему в серверах используется только память с коррекцией ошибок (ECC), чем отличается аппаратный RAID от HBA-контроллера и софтверного RAID (mdadm/ZFS), и как управлять "мертвым" сервером удаленно через выделенный процессор IPMI/iDRAC/iLO без монитора и клавиатуры.',
    coreConcepts: [
      {
        name: 'ECC Память (Error-Correcting Code)',
        description:
          'Память, которая обнаруживает и исправляет одиночные битовые ошибки (Single-Bit Errors) на лету с помощью кода Хэмминга. В обычных ПК сбой бита вызывает "синий экран", а в сервере с 512GB RAM сбои происходили бы каждую неделю.',
        realWorldUse:
          'Обязательна для гипервизоров и баз данных, где повреждение даже одного байта в памяти может испортить всю базу данных.',
      },
      {
        name: 'Удаленное управление IPMI / iDRAC / iLO',
        description:
          'Отдельный автономный микрокомпьютер (BMC) на материнской плате сервера с собственным сетевым портом и питанием. Работает, даже если сервер выключен или ОС зависла в Kernel Panic.',
        realWorldUse:
          'Позволяет удаленно включить сервер, смонтировать виртуальный ISO-образ ОС и просматривать видеовыход через KVM over IP из любой точки мира.',
      },
      {
        name: 'Аппаратный RAID vs HBA (Host Bus Adapter)',
        description:
          'Аппаратный RAID-контроллер (LSI, MegaRAID) имеет собственный процессор (ROC) и кэш-память с батарейкой (BBU/CacheVault). Режим HBA (IT-mode) передает диски напрямую операционной системе без виртуализации томов.',
        realWorldUse:
          'HBA критически необходим для современных программных систем хранения (ZFS, Ceph, TrueNAS), а аппаратный RAID с BBU используют для традиционных установок Windows/Linux.',
      },
    ],
    cheatSheets: [
      {
        category: 'Диагностика железа в Linux',
        commands: [
          { cmd: 'lscpu', desc: 'Подробная информация о процессоре, ядрах, потоках, кэшах L1/L2/L3' },
          { cmd: 'dmidecode -t memory', desc: 'Информация об установленных планках RAM (частота, производитель, ECC)' },
          { cmd: 'lspci -nnk', desc: 'Список PCI-устройств с отображением используемых драйверов ядра' },
          { cmd: 'smartctl -H /dev/sda', desc: 'Проверка SMART-здоровья жесткого диска или SSD' },
          { cmd: 'smartctl -a /dev/nvme0n1', desc: 'Детальные атрибуты износа NVMe накопителя (TBW, температура)' },
          { cmd: 'ipmitool sensor list', desc: 'Опрос температурных датчиков и оборотов вентиляторов через BMC' },
        ],
      },
    ],
    lab: {
      id: 'lab-1-hardware-audit',
      title: 'Аудит серверного оборудования и проектирование спецификации сервера',
      scenario:
        'Компания открывает филиал на 50 сотрудников. Вам поручено провести полный аудит предоставленного б/у сервера на выявление битых секторов дисков и ошибок памяти, а также составить техническую спецификацию на закупку нового сервера для виртуализации.',
      environment: 'Ubuntu 24.04 LTS (на ПК или LiveUSB) + утилиты smartmontools, dmidecode, stress-ng',
      estimatedTime: '4-5 часов',
      prerequisites: ['Базовые навыки работы в терминале', 'Флешка с Ubuntu Desktop/Server Live'],
      steps: [
        {
          title: 'Шаг 1. Инвентаризация аппаратной части',
          instructions:
            'Загрузитесь в Linux и соберите полную спецификацию: модель материнской платы, процессора, объем и частоту RAM, количество слотов расширения и сетевых контроллеров.',
          commands: [
            'sudo dmidecode -t baseboard',
            'sudo lscpu',
            'sudo free -h',
            'sudo lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINTS',
          ],
          verification: 'Вывод всех команд сохранен в файл hardware_report.txt',
        },
        {
          title: 'Шаг 2. SMART-диагностика дисков и проверка на перегрев',
          instructions:
            'Установите пакет smartmontools и запустите короткий самотест диска. Проверьте ключевые параметры: Reallocated Sectors Count, Power-On Hours, Wear Range Delta.',
          commands: [
            'sudo apt-get update && sudo apt-get install -y smartmontools nvme-cli',
            'sudo smartctl -t short /dev/sda',
            'sudo smartctl -a /dev/sda | grep -E "Reallocated|Pending|Uncorrectable|Power_On"',
          ],
          verification: 'Статус самотеста "Completed without error", счетчики переназначенных секторов равны 0.',
        },
        {
          title: 'Шаг 3. Стресс-тестирование CPU и памяти под нагрузкой',
          instructions:
            'Используйте stress-ng для 10-минутного стресс-теста всех ядер процессора и 90% оперативной памяти, отслеживая температуру сенсоров.',
          commands: [
            'sudo apt-get install -y lm-sensors stress-ng',
            'sudo sensors-detect --auto',
            'stress-ng --cpu 0 --vm 2 --vm-bytes 80% --timeout 300s --metrics-brief',
          ],
          verification: 'Сервер не ушел в перезагрузку, температура CPU не превысила 80°C.',
        },
      ],
      definitionOfDone: [
        'Создан подробный Markdown-отчет об аудите железа',
        'Диски проверены через SMART, сделано заключение о пригодности к эксплуатации',
        'Составлена спецификация сервера для виртуализации (RAM, CPU, RAID 10 SSD, dual PSU)',
      ],
      troubleshootingTips: [
        'Если smartctl не видит физические диски за аппаратным RAID-контроллером, укажите тип устройства: smartctl -d megaraid,0 -a /dev/sda',
        'Если sensors показывает "No sensors found", убедитесь, что загружен модуль ядра: sudo modprobe coretemp',
      ],
      portfolioArtifact: {
        title: 'Server Hardware Audit & Sizing Specification',
        repoName: 'server-hardware-audit-and-sizing',
        summary:
          'Автоматизированный аудит аппаратного обеспечения сервера с отчетом о SMART-состоянии дисков, нагрузочным тестированием стабильности и инженерной спецификацией для филиала.',
        technologies: ['Bash', 'smartmontools', 'stress-ng', 'dmidecode', 'IPMI'],
        fileTree: [
          'README.md',
          'scripts/hardware_audit.sh',
          'reports/hardware_audit_report.md',
          'docs/branch_office_server_sizing.md',
        ],
        keyConfigSnippets: [
          {
            fileName: 'scripts/hardware_audit.sh',
            language: 'bash',
            code: `#!/usr/bin/env bash
set -euo pipefail

OUTPUT="reports/hardware_audit_$(date +%Y%m%d_%H%M%S).txt"
mkdir -p reports

echo "=== SERVER HARDWARE INVENTORY ===" | tee "$OUTPUT"
echo "[CPU Model]: $(lscpu | grep 'Model name:' | sed 's/Model name:[ \\t]*//')" | tee -a "$OUTPUT"
echo "[RAM Installed]: $(free -h | awk '/Mem:/ {print $2}')" | tee -a "$OUTPUT"
echo "[Disk Topology]:" | tee -a "$OUTPUT"
lsblk -o NAME,SIZE,ROTA,TYPE,MODEL | tee -a "$OUTPUT"
echo "=== SMART HEALTH CHECK ===" | tee -a "$OUTPUT"
for disk in $(lsblk -dpno NAME | grep -v "[0-9]$"); do
  echo "Checking $disk..." | tee -a "$OUTPUT"
  smartctl -H "$disk" | grep -i "test result" || true
done
echo "Audit report generated: $OUTPUT"`,
            description: 'Скрипт автоматического сбора характеристик сервера и проверки дисков',
          },
        ],
        readmeMarkdown: `# Server Hardware Audit & Sizing Specification

## 📌 Описание проекта
Данный проект представляет собой практическое руководство и набор скриптов для проведения аудита серверного оборудования, оценки износа дисковой подсистемы и подбора серверной платформы для офиса на 50 рабочих мест.

## 🛠 Использованные инструменты
- **dmidecode** — инвентаризация памяти и материнской платы
- **smartmontools / nvme-cli** — диагностика накопителей HDD/SSD/NVMe
- **stress-ng** — проверка температурного режима и стабильности CPU/RAM
- **ipmitool** — управление и мониторинг через BMC

## 📊 Результаты аудита
- Проверено 2 накопителя SATA SSD: износ 4%, Reallocated Sectors = 0.
- 10-минутный стресс-тест CPU показал максимальную температуру 68°C при лимите 85°C.
- Сервер признан полностью готовым к развертыванию гипервизора Proxmox VE.
`,
      },
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'Что произойдет в сервере при возникновении Single-Bit ошибки в модуле ECC RAM?',
        options: [
          'Сервер мгновенно выключится для предотвращения повреждения данных',
          'Контроллер памяти исправит ошибку на лету, а операционная система зарегистрирует событие в логе (EDAC/AER)',
          'Произойдет перезагрузка с синим экраном (BSOD)',
          'Диск автоматически перемонтируется в режим Read-Only',
        ],
        correctIndex: 1,
        explanation:
          'ECC память использует код Хэмминга. Она автоматически исправляет одиночные битовые ошибки (Correctable Errors) без остановки работы системы. При возникновении двухбитовых ошибок (Uncorrectable) сервер аварийно остановится во избежание порчи данных.',
      },
      {
        id: 'q1-2',
        question: 'Какое главное преимущество технологии IPMI/iDRAC/iLO для системного администратора?',
        options: [
          'Ускорение работы процессора на 15%',
          'Возможность подключаться к терминалу и BIOS сервера через сеть даже при выключенной ОС или Kernel Panic',
          'Автоматическое шифрование жестких дисков',
          'Замена сетевой карты для ускорения интернета',
        ],
        correctIndex: 1,
        explanation:
          'IPMI/BMC работает автономно на отдельном чипе, доступен по выделенному сетевому интерфейсу и позволяет включать/выключать питание, заходить в BIOS и монтировать удаленные образы без физического присутствия у стойки.',
      },
      {
        id: 'q1-3',
        question: 'Сколько дисков может выйти из строя в массиве RAID 5 без потери данных?',
        options: ['Ни одного', 'Один диск', 'Два диска', 'Половина всех дисков'],
        correctIndex: 1,
        explanation:
          'RAID 5 использует распределенную четность (parity) объемом в один диск. При выходе из строя одного любого диска массив переходит в режим Degraded, но данные остаются доступны. Выход из строя второго диска приводит к потере всех данных.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq1-1',
        category: 'Архитектура',
        question: 'Чем аппаратный RAID отличается от программного (mdadm/ZFS)? Какой выберете вы?',
        shortAnswer:
          'Аппаратный RAID выполняет расчеты на чипе контроллера и защищен батарейкой BBU; программный использует CPU сервера, но обеспечивает прозрачность и не привязывает вас к конкретной модели контроллера.',
        detailedAnswer:
          'В аппаратном RAID при отказе платы контроллера диски нельзя прочитать на другой модели контроллера без риска. В ZFS или Linux mdadm диски можно вставить в любой ПК, и массив соберется. Для современных СХД и гипервизоров я выберу HBA контроллер + ZFS/mdadm из-за защиты от "тихого" повреждения данных (bit-rot scrubbing) и независимости от вендора.',
        practicalTip:
          'На собеседовании упомяните Write-hole в RAID 5 и почему ZFS copy-on-write решает эту проблему.',
      },
    ],
  },
  {
    id: 2,
    slug: 'networking-and-protocols',
    title: 'Компьютерные сети (Network Fundamentals & Routing)',
    subtitle: 'Модель OSI, адресация IPv4/IPv6, VLAN, DHCP, DNS, маршрутизация и Wireshark',
    level: 'Junior Base',
    durationWeeks: '3 недели',
    estimatedHours: 35,
    iconName: 'Network',
    keySkills: [
      'Модель OSI & TCP/IP',
      'Расчет подсетей (CIDR / маски)',
      'VLAN (802.1Q)',
      'Маршрутизация (Default Gateway, статика)',
      'DNS (A, CNAME, MX, PTR, TTL)',
      'DHCP (DORA процесс)',
      'Анализ трафика tcpdump & Wireshark',
      'iptables / nftables',
    ],
    theorySummary:
      'Сети — это кровеносная система ИТ-инфраструктуры. 80% проблем в работе приложений связаны с сетевыми неполадками: неверная маска подсети, отсутствие маршрута, блокировка порта фаерволом, зацикливание пакетов (STP) или сбой резолвинга DNS. Системный администратор обязан уметь диагностировать трафик на уровнях L2, L3, L4 и L7.',
    coreConcepts: [
      {
        name: 'Модель OSI: 7 уровней',
        description:
          'Физический (L1, кабель/SFP), Канальный (L2, MAC-адреса, коммутаторы, VLAN 802.1Q), Сетевой (L3, IP-адреса, маршрутизаторы), Транспортный (L4, TCP/UDP порты), Сеансовый (L5), Представления (L6), Прикладной (L7, HTTP, DNS, SSH).',
        realWorldUse:
          'Позволяет локализовать поломку: "Пинг идет (L3), но по SSH на 22 порт не заходит (L4 firewall) или сайт выдает 502 (L7)".',
      },
      {
        name: 'DORA в протоколе DHCP',
        description:
          'Процесс выдачи IP-адреса: Discover (клиент ищет сервер широковещательным запросом), Offer (сервер предлагает IP), Request (клиент запрашивает этот IP), Acknowledge (сервер подтверждает аренду lease).',
        realWorldUse:
          'Понимание DORA помогает отлаживать проблемы, когда в сети появляется "чужой" неавторизованный DHCP-сервер (Rogue DHCP) и перехватывает шлюзы.',
      },
      {
        name: 'DNS: от корня до зоны',
        description:
          'Иерархическая распределенная система преобразования доменных имен в IP-адреса. Включает Root servers (.), TLD (.ru, .com), авторитативные DNS-серверы и кэширующие рекурсоры (Unbound, 8.8.8.8).',
        realWorldUse:
          'Каждый сбой внешних сервисов проверяется с команды dig @8.8.8.8 domain.com, чтобы исключить сбой локального DNS-кэша.',
      },
    ],
    cheatSheets: [
      {
        category: 'Диагностика сети в Linux (iproute2)',
        commands: [
          { cmd: 'ip -br addr', desc: 'Краткий список всех сетевых интерфейсов, их статусов и IP-адресов' },
          { cmd: 'ip route show', desc: 'Таблица маршрутизации (включая шлюз по умолчанию default via)' },
          { cmd: 'ss -tulpn', desc: 'Список всех открытых портов (TCP/UDP) и процессов, которые их слушают' },
          { cmd: 'dig +trace example.com', desc: 'Пошаговая трассировка запроса DNS от корневых серверов' },
          { cmd: 'tcpdump -ni any port 53 -v', desc: 'Перехват сетевых пакетов DNS в реальном времени' },
          { cmd: 'traceroute -n -T -p 443 1.1.1.1', desc: 'TCP-трассировка до 443 порта в обход блокировки ICMP' },
        ],
      },
    ],
    lab: {
      id: 'lab-2-network-topology',
      title: 'Проектирование изолированных офисных сетей (VLAN, DHCP, NAT и DNS)',
      scenario:
        'Необходимо разделить офисную сеть на 3 изолированных сегмента: VLAN 10 (Сотрудники 192.168.10.0/24), VLAN 20 (Гостевой Wi-Fi 192.168.20.0/24, изолирован от сотрудников) и VLAN 30 (Серверы 192.168.30.0/24). Настроить Linux-маршрутизатор с NAT, DNS-сервером и DHCP.',
      environment: 'Linux Ubuntu Server в VirtualBox (2 сетевых интерфейса: WAN и LAN) или GNS3/Packet Tracer',
      estimatedTime: '6-8 часов',
      prerequisites: ['Понимание масок подсетей', 'Установленный VirtualBox'],
      steps: [
        {
          title: 'Шаг 1. Включение IP Forwarding и создание VLAN-интерфейсов',
          instructions:
            'Включите пересылку пакетов в ядре Linux (/proc/sys/net/ipv4/ip_forward) и настройте VLAN через netplan.',
          commands: [
            'sudo sysctl -w net.ipv4.ip_forward=1',
            'echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.d/99-ipforward.conf',
          ],
          verification: 'cat /proc/sys/net/ipv4/ip_forward возвращает 1',
        },
        {
          title: 'Шаг 2. Настройка DHCP-сервера (isc-dhcp-server или dnsmasq)',
          instructions:
            'Настройте dnsmasq для автоматической раздачи IP-адресов, шлюзов и DNS клиентам в VLAN 10 и VLAN 20 с раздельными пулами.',
          commands: [
            'sudo apt-get install -y dnsmasq',
            'cat <<EOF | sudo tee /etc/dnsmasq.d/vlans.conf\ninterface=eth1.10\ndhcp-range=192.168.10.50,192.168.10.200,12h\ninterface=eth1.20\ndhcp-range=192.168.20.50,192.168.20.200,2h\nEOF',
            'sudo systemctl restart dnsmasq',
          ],
          verification: 'systemctl status dnsmasq активен (running), порты 53 и 67 слушают',
        },
        {
          title: 'Шаг 3. Настройка межсетевого экрана (nftables / iptables)',
          instructions:
            'Разрешите выход в интернет из VLAN 10 и 20 через Masquerade (NAT), но жестко заблокируйте любой трафик из гостевого VLAN 20 в офисный VLAN 10 и серверный VLAN 30.',
          commands: [
            'sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE',
            'sudo iptables -A FORWARD -i eth1.20 -o eth1.10 -j DROP',
            'sudo iptables -A FORWARD -i eth1.20 -o eth1.30 -j DROP',
            'sudo iptables -A FORWARD -m state --state RELATED,ESTABLISHED -j ACCEPT',
          ],
          verification: 'Гостевая машина имеет доступ в интернет (ping 8.8.8.8), но не может пинговать сервер 192.168.30.1',
        },
      ],
      definitionOfDone: [
        'Клиенты получают IP автоматически в зависимости от VLAN',
        'Гостевая сеть изолирована от корпоративной на уровне правил межсетевого экрана',
        'Снят pcap-дамп через tcpdump, подтверждающий корректность работы DHCP DORA',
      ],
      troubleshootingTips: [
        'Если dnsmasq не запускается из-за конфликта на порту 53, отключите systemd-resolved: sudo systemctl stop systemd-resolved',
        'Не забудьте сохранить правила iptables: sudo apt-get install iptables-persistent && sudo netfilter-persistent save',
      ],
      portfolioArtifact: {
        title: 'Enterprise Multi-VLAN Router with DHCP, NAT & Isolation',
        repoName: 'enterprise-vlan-router-lab',
        summary:
          'Архитектура корпоративного сетевого шлюза на базе Linux: сегментация на 3 VLAN (Staff, Guests, Servers), развертывание dnsmasq, фильтрация межсегментного трафика и NAT-маскарадинг.',
        technologies: ['Linux', 'VLAN 802.1Q', 'dnsmasq', 'iptables', 'tcpdump', 'Wireshark'],
        fileTree: [
          'README.md',
          'docs/network-architecture-diagram.png',
          'configs/netplan-config.yaml',
          'configs/dnsmasq.conf',
          'configs/iptables-rules.v4',
          'pcap/dhcp_dora_capture.pcap',
        ],
        keyConfigSnippets: [
          {
            fileName: 'configs/netplan-config.yaml',
            language: 'yaml',
            code: `network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: true # WAN uplink
    eth1:
      dhcp4: false
  vlans:
    eth1.10:
      id: 10
      link: eth1
      addresses: [192.168.10.1/24]
    eth1.20:
      id: 20
      link: eth1
      addresses: [192.168.20.1/24]
    eth1.30:
      id: 30
      link: eth1
      addresses: [192.168.30.1/24]`,
            description: 'Конфигурация Netplan с тегированными VLAN интерфейсами L2/L3',
          },
        ],
        readmeMarkdown: `# Enterprise Multi-VLAN Router with DHCP, NAT & Isolation

## 📌 Архитектура сети
Лабораторный стенд реализует корпоративный шлюз безопасности (Router-on-a-Stick). Сеть разделена на 3 изолированных домена безопасности:
- **VLAN 10 (Corporate Staff)**: 192.168.10.0/24 — рабочие места сотрудников.
- **VLAN 20 (Guest Wi-Fi)**: 192.168.20.0/24 — гостевой сегмент без доступа к серверам.
- **VLAN 30 (Server DMZ)**: 192.168.30.0/24 — продуктивные сервисы компании.

## 🔒 Политики безопасности (Stateful Firewall)
1. Разрешен выход во внешнюю сеть через трансляцию адресов (NAT / SNAT).
2. Запрещен любой входящий трафик из Guest в Corporate и DMZ.
3. Разрешены только установленные сессии (ESTABLISHED, RELATED).
`,
      },
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'Сколько полезных IP-адресов для хостов доступно в подсети с маской /27 (255.255.255.224)?',
        options: ['32 адреса', '30 адресов', '16 адресов', '28 адресов'],
        correctIndex: 1,
        explanation:
          'Размер подсети /27 равен 2^(32-27) = 2^5 = 32 адреса. Из них вычитаются адрес сети (Network ID) и широковещательный адрес (Broadcast). Итого для хостов доступно 32 - 2 = 30 адресов.',
      },
      {
        id: 'q2-2',
        question: 'На каком уровне модели OSI работают VLAN (стандарт IEEE 802.1Q)?',
        options: ['L1 (Физический)', 'L2 (Канальный)', 'L3 (Сетевой)', 'L4 (Транспортный)'],
        correctIndex: 1,
        explanation:
          'VLAN тегирует кадры (Ethernet frames) 4-байтовым тегом с 12-битным VLAN ID на канальном уровне L2, разделяя один физический коммутатор на независимые широковещательные домены.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq2-1',
        category: 'Сети',
        question: 'Что подробно происходит, когда пользователь вводит в браузере "https://google.com" и нажимает Enter?',
        shortAnswer:
          'Происходит локальный поиск DNS-кэша, рекурсивный DNS-запрос, определение MAC через ARP, TCP 3-way handshake, TLS Handshake с проверкой сертификата, HTTP GET запрос и получение HTML.',
        detailedAnswer:
          '1. Браузер проверяет свой кэш DNS -> кэш ОС (hosts / systemd-resolved).\n2. Если нет, отправляет UDP-запрос на DNS-резолвер.\n3. Получив IP (L3), ОС определяет шлюз по таблице маршрутизации и шлет ARP-запрос (L2) для нахождения MAC-адреса шлюза.\n4. Начинается TCP 3-way handshake (SYN -> SYN-ACK -> ACK) на порт 443.\n5. Запускается TLS Handshake (Client Hello -> Server Hello + Сертификат -> обмен ключами ECDH -> зашифрованная сессия).\n6. Отправляется HTTP/2 GET-запрос, веб-сервер отдает страницу, браузер парсит DOM и CSSOM.',
        practicalTip:
          'Этот вопрос задают на 90% технических собеседований. Четко разделяйте уровни L2, L3, L4 и L7 при ответе.',
      },
    ],
  },
  {
    id: 3,
    slug: 'linux-administration-core',
    title: 'Linux System Administration (Ядро, Права, Службы, Хранилище)',
    subtitle: 'Управление пользователями, POSIX права & ACL, systemd юниты, LVM2, SSH-Hardening и логи',
    level: 'Junior',
    durationWeeks: '3 недели',
    estimatedHours: 40,
    iconName: 'Server',
    keySkills: [
      'Иерархия FHS (/etc, /var, /proc, /sys)',
      'Права chmod, chown, SUID/SGID/Sticky, ACL',
      'systemd (units, targets, timers)',
      'LVM2 (PV, VG, LV, resize)',
      'SSH Hardening (ed25519, 2FA, Match block)',
      'journalctl, logrotate, rsyslog',
      'cron и systemd-timer',
    ],
    theorySummary:
      'Linux — основа 95% серверных решений мира. На этом этапе вы переходите от пользователя терминала к администратору: учитесь управлять дисковыми разделами без остановки сервисов с помощью LVM, писать собственные демоны systemd с автоматическим перезапуском при сбоях и настраивать безопасный вход по SSH с защитой от брутфорса.',
    coreConcepts: [
      {
        name: 'LVM (Logical Volume Manager)',
        description:
          'Слой абстракции между физическими дисками и файловой системой: Physical Volumes (PV) объединяются в Volume Group (VG), из которой нарезаются Logical Volumes (LV).',
        realWorldUse:
          'Позволяет на лету расширить раздел диска под базу данных командой lvextend -r -L +50G без перезагрузки сервера.',
      },
      {
        name: 'systemd и Юниты',
        description:
          'Главный процесс инициализации (PID 1) в большинстве дистрибутивов. Управляет зависимостями сервисов, сокетами, точками монтирования и периодическими задачами (timers).',
        realWorldUse:
          'Заменяет ненадежные shell-скрипты: автоматически перезапускает упавшее приложение, изолирует его ресурсы через cgroups и ведет журнал в бинарном journald.',
      },
      {
        name: 'Специальные биты прав: SUID, SGID, Sticky Bit',
        description:
          'SUID (chmod u+s, 4000) запускает бинарник от имени владельца файла; SGID (chmod g+s, 2000) наследует группу в каталоге; Sticky Bit (chmod +t, 1000) запрещает удалять чужие файлы в общем каталоге (/tmp).',
        realWorldUse:
          'Критично для безопасности общих файловых папок и понимания вектора атак Privilege Escalation.',
      },
    ],
    cheatSheets: [
      {
        category: 'Администрирование служб и LVM',
        commands: [
          { cmd: 'systemctl daemon-reload', desc: 'Перечитать конфигурации всех unit-файлов systemd после изменения' },
          { cmd: 'systemctl list-units --failed', desc: 'Быстро найти все упавшие службы на сервере' },
          { cmd: 'journalctl -u nginx.service -n 50 -f', desc: 'Просмотр последних 50 строк логов сервиса в режиме live' },
          { cmd: 'pvcreate /dev/sdb && vgextend vg_data /dev/sdb', desc: 'Инициализация нового диска и добавление в группу томов' },
          { cmd: 'lvextend -r -L +20G /dev/vg_data/lv_storage', desc: 'Расширение логического тома и файловой системы на лету' },
          { cmd: 'setfacl -m u:deployer:rwx /var/www/site', desc: 'Назначение точечных прав POSIX ACL конкретному пользователю' },
        ],
      },
    ],
    lab: {
      id: 'lab-3-hardened-linux-lvm',
      title: 'Развертывание защищенного Linux-сервера с LVM и кастомным systemd-демоном',
      scenario:
        'Необходимо настроить сервер для критически важного внутреннего приложения: создать отказоустойчивую структуру разделов LVM, ужесточить настройки SSH, настроить автоматический сбор логов и написать отказоустойчивый systemd сервис с таймером очистки.',
      environment: 'Ubuntu Server 22.04/24.04 или Rocky Linux 9 в VirtualBox с 2 виртуальными дисками',
      estimatedTime: '6 часов',
      prerequisites: ['Установленный Linux сервер', 'Второй виртуальный диск на 10-20 ГБ'],
      steps: [
        {
          title: 'Шаг 1. Нарезка LVM томов',
          instructions:
            'Создайте физический том на втором диске, создайте Volume Group "vg_app" и выделите логический том "lv_data" на 5 ГБ с форматированием в ext4 и автомонтированием в /opt/app_data.',
          commands: [
            'sudo pvcreate /dev/sdb',
            'sudo vgcreate vg_app /dev/sdb',
            'sudo lvcreate -n lv_data -L 5G vg_app',
            'sudo mkfs.ext4 /dev/vg_app/lv_data',
            'sudo mkdir -p /opt/app_data',
            'echo "/dev/vg_app/lv_data /opt/app_data ext4 defaults,noexec,nodev 0 2" | sudo tee -a /etc/fstab',
            'sudo mount -a',
          ],
          verification: 'df -h | grep /opt/app_data показывает смонтированный раздел 5G',
        },
        {
          title: 'Шаг 2. SSH Hardening (Защита удаленного доступа)',
          instructions:
            'Настройте SSH: отключите вход по паролю (только ed25519 ключи), отключите вход root по SSH, смените порт на 2222 и ограничьте количество попыток.',
          commands: [
            'sudo sed -i "s/#PasswordAuthentication yes/PasswordAuthentication no/" /etc/ssh/sshd_config',
            'sudo sed -i "s/PermitRootLogin yes/PermitRootLogin no/" /etc/ssh/sshd_config',
            'sudo sshd -t',
            'sudo systemctl restart ssh',
          ],
          verification: 'Попытка зайти по паролю отклоняется с ошибкой "Permission denied (publickey)".',
        },
        {
          title: 'Шаг 3. Создание собственного systemd сервиса',
          instructions:
            'Создайте unit-файл /etc/systemd/system/app-watcher.service, который запускает фоновый процесс с автоматическим перезапуском при падении (Restart=always).',
          commands: [
            'sudo systemctl daemon-reload',
            'sudo systemctl enable --now app-watcher.service',
            'sudo systemctl status app-watcher.service',
          ],
          verification: 'После команды kill -9 PID сервиса systemd автоматически поднимает его снова через 3 секунды',
        },
      ],
      definitionOfDone: [
        'Разделы смонтированы через fstab с флагами noexec,nodev',
        'SSH полностью защищен ключами ed25519, root-логин закрыт',
        'Написан и протестирован systemd service и systemd timer',
      ],
      troubleshootingTips: [
        'Всегда проверяйте конфигурацию SSH перед перезапуском командой sshd -t, не закрывая текущую сессию!',
        'Если fstab содержит ошибку, сервер может зависнуть в emergency mode. Проверяйте синтаксис командой mount -a.',
      ],
      portfolioArtifact: {
        title: 'Hardened Linux Baseline Server with LVM & Custom Systemd Units',
        repoName: 'hardened-linux-server-baseline',
        summary:
          'Эталонный шаблон защищенного production-сервера Linux: безопасная разметка LVM, SSH Hardening по рекомендациям CIS Benchmark, кастомный демон systemd и автоматическая ротация логов.',
        technologies: ['Linux', 'Ubuntu Server', 'systemd', 'LVM2', 'SSH', 'logrotate'],
        fileTree: [
          'README.md',
          'configs/sshd_config.d/hardening.conf',
          'configs/fstab',
          'systemd/app-watcher.service',
          'systemd/app-cleanup.timer',
          'scripts/setup_baseline.sh',
        ],
        keyConfigSnippets: [
          {
            fileName: 'systemd/app-watcher.service',
            language: 'ini',
            code: `[Unit]
Description=Production Health Watcher Daemon
After=network.target

[Service]
Type=simple
User=sysadmin
Group=sysadmin
ExecStart=/usr/local/bin/app-watcher
Restart=always
RestartSec=5s
LimitNOFILE=65535
ProtectSystem=full
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target`,
            description: 'Безопасный systemd unit с песочницей (sandboxing) и авторестартом',
          },
        ],
        readmeMarkdown: `# Hardened Linux Baseline Server with LVM & Custom Systemd Units

## 📌 Цель проекта
Создание стандартизированного и защищенного базового образа Linux-сервера для развертывания в продуктивной среде с соблюдением требований безопасности (Least Privilege, Storage Separation, Process Isolation).

## 🛡 Примененные меры безопасности
1. **SSH Hardening:** Полный запрет аутентификации по паролям (только ed25519), запрет прямого входа root, тайм-аут простоя ClientAliveInterval 300.
2. **Дисковая безопасность:** Выделение /tmp, /var/log и /opt/app_data в отдельные логические тома LVM с опциями монтирования nodev, noexec, nosuid.
3. **Отказоустойчивость служб:** Демон упакован в systemd unit с перезапуском и ограничением прав NoNewPrivileges.
`,
      },
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'Какая команда корректно расширяет размер логического тома LVM и файловой системы ext4 одновременно?',
        options: [
          'lvextend -L +10G /dev/vg0/data',
          'lvextend -r -L +10G /dev/vg0/data',
          'resize2fs /dev/vg0/data 10G',
          'fdisk /dev/sdb',
        ],
        correctIndex: 1,
        explanation:
          'Флаг -r (или --resizefs) в команде lvextend автоматически вызывает соответствующую утилиту расширения файловой системы (resize2fs для ext4 или xfs_growfs для XFS) сразу после изменения размера блочного устройства.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq3-1',
        category: 'Linux',
        question: 'Что такое Load Average и чем он отличается от загрузки процессора в %?',
        shortAnswer:
          'Load Average показывает среднее количество процессов, находящихся в очереди на выполнение (Runnable) или ожидающих дискового ввода-вывода (Uninterruptible Sleep/D-state) за 1, 5 и 15 минут.',
        detailedAnswer:
          'Загрузка CPU в 100% означает, что процессор занят полезными вычислениями. При этом Load Average может быть равен 4 на 4-ядерной машине — это нормальная полная загрузка. Но если на сервере медленный диск, процессор может быть занят всего на 5%, а Load Average взлетит до 50, потому что десятки процессов зависли в iowait (D-state) в ожидании ответа от дисковой подсистемы.',
        practicalTip:
          'Всегда упоминайте iowait и три временных интервала (1, 5, 15 минут), чтобы показать глубокое понимание.',
      },
    ],
  },
  {
    id: 4,
    slug: 'web-services-and-databases',
    title: 'Сетевые службы, Web-стек и Базы данных (Nginx, SSL, PostgreSQL)',
    subtitle: 'Nginx Reverse Proxy, SSL/TLS Let\'s Encrypt, HTTP/2, кластеризация бэкенда и БД PostgreSQL',
    level: 'Junior',
    durationWeeks: '3 недели',
    estimatedHours: 40,
    iconName: 'Globe',
    keySkills: [
      'Nginx как Reverse Proxy & Load Balancer',
      'SSL/TLS сертификаты (certbot, Let\'s Encrypt)',
      'Оптимизация Nginx (gzip, client_max_body_size, buffers)',
      'База данных PostgreSQL (роли, pg_hba.conf, бэкап pg_dump)',
      'Траблшутинг кодов 502, 504, 403, 404',
      'systemd сокеты и upstream health checks',
    ],
    theorySummary:
      'Веб-серверы и базы данных формируют ядро любого онлайн-бизнеса. Сисадмин должен знать, как принять HTTPS-трафик, отсечь DDoS-флуд лимитами rate-limiting, сбалансировать нагрузку между несколькими бэкендами и обеспечить стабильную работу СУБД с безопасной аутентификацией.',
    coreConcepts: [
      {
        name: 'Nginx: Reverse Proxy vs Forward Proxy',
        description:
          'Forward Proxy стоит перед клиентами и маскирует их (например, корпоративный прокси для выхода сотрудников в интернет). Reverse Proxy стоит перед серверами приложений, принимая запросы извне и распределяя их.',
        realWorldUse:
          'Nginx принимает TLS 1.3 на 443 порту, снимает шифрование (SSL Offloading), сжимает gzip и передает чистый HTTP на локальные микросервисы.',
      },
      {
        name: 'Ошибки 502 Bad Gateway vs 504 Gateway Timeout',
        description:
          '502 означает, что Nginx постучался в бэкенд (upstream), но порт закрыт или приложение сразу сбросило соединение (Connection Refused). 504 означает, что бэкенд принял соединение, но не успел сформировать ответ за proxy_read_timeout (например, завис медленный SQL запрос).',
        realWorldUse:
          'Позволяет мгновенно понять, упал ли сервис полностью (502) или база перегружена тяжелым отчетом (504).',
      },
      {
        name: 'PostgreSQL: pg_hba.conf и аутентификация',
        description:
          'Host-Based Authentication файл — главный брандмауэр PostgreSQL. Определяет, кому, с каких IP-адресов и каким методом (md5, scram-sha-256, peer) разрешено подключаться к базам.',
        realWorldUse:
          'Никогда не открывать PostgreSQL на 0.0.0.0 с методом trust; настраивать подключение только через локальный сокет или внутреннюю VPN-сеть.',
      },
    ],
    cheatSheets: [
      {
        category: 'Nginx и PostgreSQL',
        commands: [
          { cmd: 'nginx -t', desc: 'Проверка синтаксиса конфигурационных файлов Nginx перед перезагрузкой' },
          { cmd: 'systemctl reload nginx', desc: 'Применение новых конфигов Nginx на лету БЕЗ разрыва активных соединений' },
          { cmd: 'certbot --nginx -d example.com', desc: 'Автоматическое получение бесплатного SSL сертификата Let\'s Encrypt' },
          { cmd: 'pg_dump -U postgres -d mydb -Fc -f backup.dump', desc: 'Создание консистентного кастомного бэкапа базы данных' },
          { cmd: 'pg_isready -h localhost -p 5432', desc: 'Быстрая проверка доступности сервера базы данных PostgreSQL' },
        ],
      },
    ],
    lab: {
      id: 'lab-4-ha-web-cluster',
      title: 'Отказоустойчивый Web-стек: Балансировщик Nginx + Upstream бэкенды + База данных PostgreSQL',
      scenario:
        'Развернуть отказоустойчивый веб-сайт: балансировщик Nginx с SSL-шифрованием распределяет запросы (Round Robin / Least Connected) между двумя нодами приложений. Данные хранятся в защищенной базе PostgreSQL.',
      environment: 'Linux сервер (Ubuntu/Debian) с установленными Nginx, Python/NodeJS бэкендами и PostgreSQL 16',
      estimatedTime: '6-8 часов',
      prerequisites: ['Базовые навыки Linux', 'Понимание портов и протокола HTTP'],
      steps: [
        {
          title: 'Шаг 1. Развертывание PostgreSQL и настройка прав',
          instructions:
            'Установите PostgreSQL, создайте базу данных "company_db", пользователя "app_user" со стойким паролем и настройте pg_hba.conf.',
          commands: [
            'sudo apt-get install -y postgresql postgresql-contrib',
            'sudo -u postgres psql -c "CREATE DATABASE company_db;"',
            'sudo -u postgres psql -c "CREATE USER app_user WITH ENCRYPTED PASSWORD \'StrongSecurePass2026!\';"',
            'sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE company_db TO app_user;"',
          ],
          verification: 'psql -U app_user -d company_db -h 127.0.0.1 успешно подключается',
        },
        {
          title: 'Шаг 2. Запуск двух экземпляров бэкенда',
          instructions:
            'Запустите два простых HTTP-сервера на портах 8081 и 8082, возвращающих идентификатор ноды Node-A и Node-B.',
          commands: [
            'nohup python3 -m http.server 8081 > /tmp/node1.log 2>&1 &',
            'nohup python3 -m http.server 8082 > /tmp/node2.log 2>&1 &',
          ],
          verification: 'curl http://127.0.0.1:8081 и curl http://127.0.0.1:8082 отвечают HTTP 200',
        },
        {
          title: 'Шаг 3. Настройка Nginx Upstream и SSL',
          instructions:
            'Настройте блок upstream с директивой least_conn и health check параметрами. Включите HTTP/2, HSTS и gzip сжатие.',
          commands: [
            'sudo nginx -t',
            'sudo systemctl reload nginx',
          ],
          verification: 'curl -I http://localhost показывает заголовки Server: nginx и балансировку запросов',
        },
      ],
      definitionOfDone: [
        'Nginx балансирует нагрузку между нодами',
        'При остановке одной ноды клиенты не получают ошибок (автоматический failover на вторую)',
        'База данных защищена паролем и доступна только по локальному адресу',
      ],
      troubleshootingTips: [
        'Если Nginx отдает 502, проверьте лог ошибок: sudo tail -f /var/log/nginx/error.log',
        'Проверьте, не блокирует ли SELinux сетевые соединения Nginx: sudo setsebool -P httpd_can_network_connect 1',
      ],
      portfolioArtifact: {
        title: 'High-Availability Nginx Reverse Proxy with Load Balancing & PostgreSQL',
        repoName: 'nginx-ha-loadbalancer-postgres',
        summary:
          'Архитектура отказоустойчивого веб-комплекса: балансировка нагрузки между нодами бэкенда с алгоритмом least_conn, SSL/TLS Hardening (A+ рейтинг SSLLabs) и тюнинг СУБД PostgreSQL.',
        technologies: ['Nginx', 'PostgreSQL 16', 'SSL/TLS', 'HTTP/2', 'Bash', 'Systemd'],
        fileTree: [
          'README.md',
          'nginx/nginx.conf',
          'nginx/sites-available/app_cluster.conf',
          'postgres/postgresql.conf',
          'postgres/pg_hba.conf',
          'scripts/test_failover.sh',
        ],
        keyConfigSnippets: [
          {
            fileName: 'nginx/sites-available/app_cluster.conf',
            language: 'nginx',
            code: `upstream app_servers {
    least_conn;
    server 127.0.0.1:8081 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8082 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 80;
    server_name portal.internal;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name portal.internal;

    ssl_certificate /etc/ssl/certs/app.crt;
    ssl_certificate_key /etc/ssl/private/app.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_next_upstream error timeout http_502 http_503;
    }
}`,
            description: 'Отказоустойчивый конфиг Nginx с балансировкой least_conn и failover',
          },
        ],
        readmeMarkdown: `# High-Availability Nginx Reverse Proxy with Load Balancing & PostgreSQL

## 📌 Архитектура стенда
Проект демонстрирует реализацию корпоративного веб-комплекса высокой доступности:
- **Балансировка нагрузки:** Nginx распределяет запросы между инстансами бэкенда.
- **Отказоустойчивость:** Директива \`proxy_next_upstream\` гарантирует прозрачное переключение клиента на здоровую ноду при сбое без показа ошибки 502.
- **Безопасность:** SSL/TLS терминация с принудительным редиректом с HTTP на HTTPS, защита от clickjacking (X-Frame-Options: SAMEORIGIN).
`,
      },
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'В чем разница между командами `systemctl reload nginx` и `systemctl restart nginx`?',
        options: [
          'Reload применяется быстрее, но сбрасывает все текущие TCP-соединения клиентов',
          'Reload перечитывает конфигурационные файлы и запускает новые worker-процессы без разрыва существующих соединений (Zero Downtime)',
          'Никакой разницы нет, это псевдонимы одной и той же операции',
          'Restart запрещен в production-средах',
        ],
        correctIndex: 1,
        explanation:
          'Reload выполняет плавную перезагрузку (graceful reload): старые воркеры дорабатывают открытые соединения и завершаются, а новые воркеры подхватывают новую конфигурацию. Пользователи сайта не заметят ни единого сбоя.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq4-1',
        category: 'Web/Nginx',
        question: 'Пользователь жалуется: "Сайт выдает 502 Bad Gateway". Каковы ваши действия?',
        shortAnswer:
          '502 означает, что Nginx не смог связаться с бэкендом. Проверяю статус службы бэкенда через systemctl, логи /var/log/nginx/error.log и открыт ли целевой порт через ss -tulpn.',
        detailedAnswer:
          '1. Открываю лог ошибок веб-сервера: `tail -n 50 /var/log/nginx/error.log` — там будет точная причина (например: "connect() failed (111: Connection refused) while connecting to upstream 127.0.0.1:8000").\n2. Проверяю статус приложения: `systemctl status myapp`.\n3. Если приложение упало, смотрю `journalctl -u myapp -e` для выяснения причины (нехватка памяти OOM, сбой подключения к БД).\n4. Проверяю, не блокирует ли порт локальный фаервол или SELinux.\n5. Перезапускаю сервис бэкенда и проверяю возвращение HTTP 200.',
        practicalTip:
          'Четкий алгоритмический подход к расследованию инцидентов очень ценится на собеседованиях.',
      },
    ],
  },
  {
    id: 5,
    slug: 'windows-server-and-active-directory',
    title: 'Windows Server и Active Directory Domain Services',
    subtitle: 'AD DS, Доменные контроллеры, Групповые политики (GPO), DNS/DHCP, PowerShell и RSAT',
    level: 'Junior+',
    durationWeeks: '3 недели',
    estimatedHours: 35,
    iconName: 'Shield',
    keySkills: [
      'Active Directory Domain Services (AD DS)',
      'FSMO роли (Schema, Domain Naming, PDC, RID, Infrastructure)',
      'Организационные подразделения (OU) и группы безопасности',
      'Групповые политики (GPO) и фильтрация WMI',
      'DNS и интегрированные зоны AD',
      'PowerShell администрирование (ActiveDirectory модуль)',
      'Аутентификация Kerberos и NTLM',
    ],
    theorySummary:
      'В корпоративном секторе рабочие места пользователей и рабочие станции практически повсеместно управляются через экосистему Microsoft Active Directory. Системный администратор обязан уметь централизованно управлять учетными записями, настраивать парольные политики, монтировать сетевые диски и развертывать ПО через GPO.',
    coreConcepts: [
      {
        name: 'Active Directory и Kerberos',
        description:
          'Каталог AD хранит объекты (пользователи, компьютеры, принтеры, группы). Аутентификация основана на билетах Kerberos: Ticket Granting Ticket (TGT) выдается KDC контроллера домена, после чего клиент запрашивает Service Ticket (TGS) для доступа к ресурсам.',
        realWorldUse:
          'Обеспечивает единую точку входа (Single Sign-On): пользователь входит на рабочий ПК один раз и получает доступ к почте, файловым шарам и порталам без повторного ввода пароля.',
      },
      {
        name: 'Групповые политики (GPO)',
        description:
          'Механизм централизованного применения настроек безопасности, реестра Windows, скриптов входа и ограничений на компьютеры и пользователей домена.',
        realWorldUse:
          'Позволяет одной политикой запретить запуск USB-накопителей на 1000 офисных компьютерах или автоматически установить корпоративный антивирус.',
      },
      {
        name: 'Роли FSMO (Flexible Single Master Operations)',
        description:
          'Пять специализированных ролей, которые не могут распределяться между всеми контроллерами одновременно: Schema Master, Domain Naming Master, PDC Emulator, RID Master, Infrastructure Master.',
        realWorldUse:
          'PDC Emulator отвечает за синхронизацию точного времени во всем домене и приоритетную смену паролей.',
      },
    ],
    cheatSheets: [
      {
        category: 'PowerShell для Active Directory',
        commands: [
          { cmd: 'Get-ADUser -Filter * -Properties LastLogonDate | Select Name, LastLogonDate', desc: 'Поиск неактивных учетных записей сотрудников' },
          { cmd: 'New-ADUser -Name "Ivan Ivanov" -SamAccountName "i.ivanov" -UserPrincipalName "i.ivanov@corp.local" -Enabled $true', desc: 'Создание нового пользователя домена через PowerShell' },
          { cmd: 'gpupdate /force', desc: 'Принудительное немедленное обновление групповых политик на клиенте' },
          { cmd: 'gpresult /h report.html', desc: 'Формирование детального HTML-отчета о применившихся политиках GPO' },
          { cmd: 'netdom query fsmo', desc: 'Определение держателей всех 5 ролей FSMO в домене' },
        ],
      },
    ],
    lab: {
      id: 'lab-5-enterprise-ad-gpo',
      title: 'Развертывание Active Directory с корпоративными политиками безопасности GPO',
      scenario:
        'Развернуть домен corp.local на Windows Server. Спроектировать дерево OU (Management, Sales, IT, Workstations), настроить парольную политику (Fine-Grained Password Policy), развернуть сетевые диски через GPO и автоматизировать создание учеток через PowerShell.',
      environment: 'Windows Server 2022 (Trial) + Windows 10/11 в VirtualBox / Hyper-V',
      estimatedTime: '8 часов',
      prerequisites: ['Базовое знакомство с интерфейсом Windows Server'],
      steps: [
        {
          title: 'Шаг 1. Установка роли AD DS и повышение до контроллера домена',
          instructions:
            'Установите роль Active Directory Domain Services и запустите мастер создания нового леса corp.local.',
          commands: [
            'Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools',
            'Install-ADDSForest -DomainName "corp.local" -InstallDns -Force',
          ],
          verification: 'Сервер перезагрузился, домен corp.local функционирует, DNS-зона corp.local создана',
        },
        {
          title: 'Шаг 2. Создание структуры OU и пользователей через скрипт',
          instructions:
            'Напишите PowerShell скрипт, импортирующий список пользователей из CSV-файла и создающий правильную структуру подразделений.',
          commands: [
            'Import-Csv users.csv | ForEach-Object { New-ADUser ... }',
          ],
          verification: 'В Active Directory Users and Computers видны подразделения и созданные учетные записи',
        },
        {
          title: 'Шаг 3. Настройка групповой политики безопасности (GPO)',
          instructions:
            'Создайте GPO "Sec_Hardening_Workstations": включите блокировку экрана через 10 минут, отключите протокол SMBv1, включите аудит неудачных попыток входа.',
          commands: [
            'gpupdate /force',
            'gpresult /r',
          ],
          verification: 'На клиентской машине политики безопасности успешно применились',
        },
      ],
      definitionOfDone: [
        'Лес и домен corp.local полностью настроены и валидны',
        'Пользователи создаются пакетно через PowerShell скрипт',
        'Политики безопасности GPO блокируют опасные функции и применяются к рабочим станциям',
      ],
      troubleshootingTips: [
        'Клиентский компьютер не входит в домен? Проверьте сетевые настройки клиента: в качестве DNS должен быть указан ТОЛЬКО IP-адрес контроллера домена!',
      ],
      portfolioArtifact: {
        title: 'Active Directory Infrastructure & GPO Security Baseline',
        repoName: 'active-directory-gpo-automation',
        summary:
          'Комплексное развертывание доменной инфраструктуры Microsoft Active Directory: структура OU по методологии Microsoft Tier Model, политики GPO и скрипты автоматизации онбординга сотрудников на PowerShell.',
        technologies: ['Windows Server 2022', 'Active Directory', 'GPO', 'PowerShell', 'DNS'],
        fileTree: [
          'README.md',
          'docs/ad-ou-hierarchy.png',
          'powershell/New-EnterpriseUsersFromCSV.ps1',
          'powershell/Audit-InactiveUsers.ps1',
          'gpo-backups/Sec_Hardened_Workstations.xml',
        ],
        keyConfigSnippets: [
          {
            fileName: 'powershell/New-EnterpriseUsersFromCSV.ps1',
            language: 'powershell',
            code: `# Automated Employee Onboarding Script
param(
    [string]$CsvPath = ".\\employees.csv"
)

Import-Module ActiveDirectory

$Users = Import-Csv -Path $CsvPath
foreach ($User in $Users) {
    $OU = "OU=$($User.Department),OU=Departments,DC=corp,DC=local"
    $SecurePassword = ConvertTo-SecureString $User.TempPassword -AsPlainText -Force
    
    New-ADUser -Name "$($User.FirstName) $($User.LastName)" \`
               -GivenName $User.FirstName \`
               -Surname $User.LastName \`
               -SamAccountName $User.Username \`
               -UserPrincipalName "$($User.Username)@corp.local" \`
               -Path $OU \`
               -AccountPassword $SecurePassword \`
               -Enabled $true \`
               -ChangePasswordAtLogon $true
    Write-Host "[+] Created user: $($User.Username) in $OU" -ForegroundColor Green
}`,
            description: 'Скрипт автоматизированного создания пользователей домена с временным паролем',
          },
        ],
        readmeMarkdown: `# Active Directory Infrastructure & GPO Security Baseline

## 📌 Архитектура проекта
Проект реализует корпоративный стандарт доменной службы Active Directory для среднего предприятия:
- **Tiered Administrative Model:** Разделение административных учетных записей (Tier 0 — Domain Admins, Tier 1 — Server Admins, Tier 2 — Workstation Admins) для предотвращения атак Pass-the-Hash.
- **Group Policy:** Централизованное управление параметрами Windows Defender, запрет исполнения неподписанных макросов, аудит безопасности (Event ID 4624/4625).
- **PowerShell Automation:** Автоматизация жизненного цикла учетных записей от создания до архивации уволенных сотрудников.
`,
      },
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'Что является наиболее частой причиной ошибки "Не удалось найти контроллер домена" при вводе компьютера в домен Active Directory?',
        options: [
          'Недостаточно оперативной памяти на клиенте',
          'На сетевом адаптере клиентского компьютера указан публичный DNS (например 8.8.8.8) вместо IP-адреса контроллера домена',
          'Контроллер домена выключил протокол IPv6',
          'Имя компьютера превышает 8 символов',
        ],
        correctIndex: 1,
        explanation:
          'Active Directory критически зависит от специальных DNS-записей SRV (_ldap._tcp.dc._msdcs.domain.local). Если клиент обращается к внешнему DNS-серверу (Google, провайдер), он не сможет найти эти SRV-записи и вызовет ошибку.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq5-1',
        category: 'Windows/AD',
        question: 'В чем разница между группами безопасности Universal, Global и Domain Local в Active Directory?',
        shortAnswer:
          'Применяется правило AGDLP: Accounts -> Global groups -> Domain Local groups -> Permissions. Global объединяет похожих пользователей, Domain Local назначает права на ресурс.',
        detailedAnswer:
          'Global группа может содержать только пользователей из своего домена и используется для группировки по должностям (например, "Бухгалтерия"). Domain Local группа создается для ресурса (например, "Доступ к папке Отчеты - Чтение") и может содержать Global группы из любых доверенных доменов. Universal группы реплицируются в Global Catalog и нужны для многодоменных лесов.',
        practicalTip:
          'Запомните аббревиатуру AGDLP — это эталонный ответ на собеседованиях по инфраструктуре Microsoft.',
      },
    ],
  },
  {
    id: 6,
    slug: 'virtualization-and-containers',
    title: 'Виртуализация и Контейнеры (Proxmox VE & Docker)',
    subtitle: 'Гипервизоры KVM, LXC контейнеры, Proxmox кластер, Dockerfile, Docker Compose и Portainer',
    level: 'Junior+',
    durationWeeks: '3 недели',
    estimatedHours: 40,
    iconName: 'Layers',
    keySkills: [
      'Гипервизоры Type 1 (Proxmox VE, ESXi) vs Type 2 (VirtualBox)',
      'KVM виртуализация и virtIO драйверы',
      'LXC (Linux Containers) в Proxmox',
      'Docker архитектура (daemon, images, containers)',
      'Написание оптимизированных Dockerfile',
      'Docker Compose для мультисервисных приложений',
      'Docker сети (bridge, host, overlay) и тома (volumes)',
    ],
    theorySummary:
      'Эпоха установки всех служб прямо на физическое железо ("Bare-metal") ушла в прошлое. Современная инфраструктура строится на виртуализации (Proxmox VE / KVM) и микросервисной контейнеризации (Docker). Системный администратор обязан изолировать сервисы друг от друга, управлять ресурсами и быстро мигрировать сервисы между хостами.',
    coreConcepts: [
      {
        name: 'Виртуальная машина (KVM) vs Контейнер (Docker/LXC)',
        description:
          'ВМ эмулирует полноценное виртуальное железо с собственным независимым ядром ОС. Контейнер разделяет общее ядро хостовой ОС Linux, изолируя процессы через cgroups (квоты CPU/RAM) и namespaces (PID, NET, MNT).',
        realWorldUse:
          'ВМ используют, когда нужна другая ОС (например Windows на Linux хосте) или максимальная изоляция ядра. Контейнеры используют для легковесного запуска микросервисов за миллисекунды.',
      },
      {
        name: 'Docker Volumes: персистентность данных',
        description:
          'По умолчанию файловая система контейнера эфемерна: при удалении контейнера все записанные файлы пропадают. Docker Volumes выносят данные на хостовую файловую систему вне жизненного цикла контейнера.',
        realWorldUse:
          'Каталоги баз данных (/var/lib/postgresql/data) ВСЕГДА монтируются через тома volume, чтобы обновление версии контейнера не стерло данные компании.',
      },
      {
        name: 'Многоэтапная сборка (Multi-stage Dockerfile)',
        description:
          'Техника сборки образов, где на первом этапе компилируется код с тяжелыми SDK и библиотеками, а в финальный образ копируется только готовый бинарник на минимальной ОС (Alpine/Scratch).',
        realWorldUse:
          'Уменьшает размер итогового образа с 1.5 ГБ до 25 МБ и кардинально снижает количество уязвимостей (CVE).',
      },
    ],
    cheatSheets: [
      {
        category: 'Docker и Proxmox',
        commands: [
          { cmd: 'docker ps -a', desc: 'Список всех контейнеров (включая остановленные)' },
          { cmd: 'docker logs -f --tail 100 <container_id>', desc: 'Просмотр последних 100 строк логов контейнера в реальном времени' },
          { cmd: 'docker compose up -d --build', desc: 'Сборка и запуск всего мультисервисного стека в фоновом режиме' },
          { cmd: 'docker system prune -af --volumes', desc: 'Глубокая очистка неиспользуемых образов, контейнеров и томов' },
          { cmd: 'qm list', desc: 'Список всех виртуальных машин KVM в Proxmox VE' },
          { cmd: 'pct list', desc: 'Список всех LXC контейнеров в Proxmox VE' },
        ],
      },
    ],
    lab: {
      id: 'lab-6-proxmox-docker-stack',
      title: 'Инфраструктура на Proxmox VE и мультисервисный стек в Docker Compose',
      scenario:
        'Развернуть гипервизор Proxmox VE на старом ПК или вложенной ВМ. Создать виртуальную машину с Ubuntu Server под Docker хост. Развернуть в Docker Compose полноценный стек: Nginx Proxy Manager + WordPress + MariaDB + Redis с постоянным хранением данных в Volumes.',
      environment: 'Proxmox VE 8.x + Docker 26.x + Docker Compose v2',
      estimatedTime: '8 часов',
      prerequisites: ['Включенная аппаратная виртуализация VT-x/AMD-V в BIOS'],
      steps: [
        {
          title: 'Шаг 1. Установка Docker Engine на Linux хост',
          instructions:
            'Установите официальный Docker Engine по рекомендациям Docker Docs (не snap!). Добавьте пользователя в группу docker.',
          commands: [
            'sudo apt-get update && sudo apt-get install -y ca-certificates curl',
            'curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh',
            'sudo usermod -aG docker $USER',
          ],
          verification: 'docker run --rm hello-world выводит "Hello from Docker!" без sudo',
        },
        {
          title: 'Шаг 2. Создание мультисервисного docker-compose.yml',
          instructions:
            'Создайте манифест с изолированной сетью, сервисами web, db и redis, политиками перезапуска restart: unless-stopped и healthcheck.',
          commands: [
            'docker compose up -d',
            'docker compose ps',
          ],
          verification: 'Все три контейнера имеют статус "Up" и healthy',
        },
        {
          title: 'Шаг 3. Тестирование персистентности и резервного копирования томов',
          instructions:
            'Внесите данные в базу, принудительно удалите контейнеры командой docker compose down и поднимите заново. Убедитесь, что данные сохранились.',
          commands: [
            'docker compose down',
            'docker compose up -d',
          ],
          verification: 'Все созданные статьи и пользователи на месте',
        },
      ],
      definitionOfDone: [
        'Стек сервисов развернут одной командой через docker-compose',
        'Настроены именованные тома (volumes) для персистентности базы данных',
        'Ограничены ресурсы CPU и RAM для контейнеров (deploy.resources.limits)',
      ],
      troubleshootingTips: [
        'Контейнер постоянно перезапускается (CrashLoop)? Смотрите причину с флагом --tail: docker logs <container> --tail 50',
      ],
      portfolioArtifact: {
        title: 'Production Docker Compose Multi-Tier Stack with Reverse Proxy',
        repoName: 'docker-production-multitier-stack',
        summary:
          'Готовый к продакшену шаблон развертывания мультисервисного приложения в Docker Compose: Nginx reverse proxy, изолированные сети, персистентные тома, healthchecks и ограничение ресурсов cgroups.',
        technologies: ['Docker', 'Docker Compose', 'Nginx', 'MariaDB', 'Redis', 'Proxmox VE'],
        fileTree: [
          'README.md',
          'docker-compose.yml',
          '.env.example',
          'nginx/default.conf',
          'scripts/backup_volumes.sh',
        ],
        keyConfigSnippets: [
          {
            fileName: 'docker-compose.yml',
            language: 'yaml',
            code: `version: '3.8'

services:
  db:
    image: mariadb:11.3
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASS}
      MYSQL_DATABASE: app_db
      MYSQL_USER: app_user
      MYSQL_PASSWORD: \${DB_USER_PASS}
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - internal_net
    deploy:
      resources:
        limits:
          memory: 1024M
          cpus: '1.0'

  web:
    image: wordpress:php8.3-apache
    restart: unless-stopped
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: app_user
      WORDPRESS_DB_PASSWORD: \${DB_USER_PASS}
      WORDPRESS_DB_NAME: app_db
    volumes:
      - web_data:/var/www/html
    networks:
      - internal_net
      - proxy_net

volumes:
  db_data:
  web_data:

networks:
  internal_net:
    internal: true
  proxy_net:`,
            description: 'Изолированный мультисервисный Compose-стек с лимитами памяти',
          },
        ],
        readmeMarkdown: `# Production Docker Compose Multi-Tier Stack with Reverse Proxy

## 📌 Архитектура решения
Проект реализует современный стандарт контейнеризации сервисов:
- **Сетевая изоляция:** База данных MariaDB находится во внутренней сети \`internal: true\` без доступа извне и без открытых наружу портов хоста.
- **Ограничение ресурсов:** Использование cgroups (лимит 1GB RAM) защищает хост от падения по OOM-killer при пиковых нагрузках.
- **Управление секретами:** Переменные окружения хранятся в защищенном файле \`.env\` (исключен из git репозитория).
`,
      },
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'Что произойдет с данными базы данных внутри контейнера MariaDB при выполнении команды `docker compose down`, если директория `/var/lib/mysql` не была примонтирована в Volume?',
        options: [
          'Данные сохранятся в системном кэше хоста',
          'Все данные и таблицы базы данных будут безвозвратно удалены вместе с контейнером',
          'Docker автоматически создаст резервную копию в /tmp',
          'Команда вернет ошибку и откажется удалять контейнер',
        ],
        correctIndex: 1,
        explanation:
          'Слой записи контейнера (writable container layer) существует только пока существует сам контейнер. Без явного указания volumes любые изменения на файловой системе исчезают при удалении контейнера.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq6-1',
        category: 'Виртуализация',
        question: 'В чем принципиальная разница между LXC контейнером в Proxmox и Docker контейнером?',
        shortAnswer:
          'LXC — это системный контейнер (эмулирует целую ОС со всеми службами, systemd, sshd), а Docker — контейнер приложения (запускает один конкретный процесс PID 1).',
        detailedAnswer:
          'В LXC вы можете зайти по SSH, запустить cron, syslog, несколько сервисов, обновить пакеты через apt — он ведет себя почти как полноценная ВМ, но использует ядро хоста. В Docker правильная парадигма — "one process per container" (одно приложение на контейнер), он эфемерный (stateless) и пересобирается целиком при обновлении версии.',
        practicalTip:
          'Подчеркните разницу между System Container и Application Container — это признак зрелого инженера.',
      },
    ],
  },
  {
    id: 7,
    slug: 'automation-scripting-and-ansible',
    title: 'Автоматизация, Скриптинг и Ansible (IaC)',
    subtitle: 'Продвинутый Bash (strict mode, traps, logs), PowerShell, Python для парсинга и Ansible плейбуки',
    level: 'Junior+',
    durationWeeks: '3 недели',
    estimatedHours: 40,
    iconName: 'Terminal',
    keySkills: [
      'Bash скриптинг (set -euo pipefail, trap, getopts)',
      'Ansible архитектура (agentless over SSH)',
      'Playbooks, Roles, Inventory, Handlers',
      'Ansible Vault для шифрования паролей и ключей',
      'Идемпотентность конфигураций',
      'Python для автоматизации (requests, os, json, re)',
      'Git основы для сисадмина (commit, branch, pull request)',
    ],
    theorySummary:
      'Хороший системный администратор автоматизирует любую задачу, которую приходится делать больше одного раза. Конфигурация серверов вручную через SSH ("Click-Ops" / ручной ввод команд) приводит к дрейфу конфигураций и ошибкам. Инструмент Ansible позволяет управлять сотнями серверов из одного репозитория, гарантируя повторяемость и идемпотентность.',
    coreConcepts: [
      {
        name: 'Идемпотентность (Idempotency)',
        description:
          'Свойство операции давать одинаковый результат при многократном повторении. Если служба уже запущена или пакет уже установлен, запуск плейбука не производит лишних действий и ничего не ломает.',
        realWorldUse:
          'Позволяет запускать Ansible раз в час по расписанию: если конфигурация на сервере изменилась, Ansible вернет ее в эталонное состояние (drift correction).',
      },
      {
        name: 'Strict Mode в Bash: set -euo pipefail',
        description:
          '-e аварийно останавливает скрипт при ошибке любой команды; -u выдает ошибку при обращении к необъявленной переменной; -o pipefail передает код ошибки через конвейер пайпов |.',
        realWorldUse:
          'Предотвращает катастрофы вида `rm -rf /tmp/$SUBDIR/` — если переменная $SUBDIR окажется пустой, без флага -u скрипт выполнит `rm -rf //` и уничтожит всю ОС.',
      },
      {
        name: 'Ansible Roles: структура и переиспользование',
        description:
          'Стандартизированная структура каталогов для описания логики (tasks, handlers, templates, vars, defaults).',
        realWorldUse:
          'Позволяет использовать одну роль nginx на серверах баз данных, веб-серверах и мониторинге, просто передавая разные переменные.',
      },
    ],
    cheatSheets: [
      {
        category: 'Ansible и Bash автоматизация',
        commands: [
          { cmd: 'ansible all -m ping -i inventory.ini', desc: 'Проверка доступности всех серверов из инвентаря по SSH' },
          { cmd: 'ansible-playbook site.yml --check --diff', desc: 'Сухой прогон (Dry Run): показывает, что изменится, без внесения реальных изменений' },
          { cmd: 'ansible-vault encrypt vars/secrets.yml', desc: 'Стойкое шифрование файла с паролями алгоритмом AES-256' },
          { cmd: 'bash -n script.sh', desc: 'Проверка синтаксиса bash скрипта без его фактического запуска' },
          { cmd: 'shellcheck script.sh', desc: 'Статический анализатор и аудит ошибок bash скриптов' },
        ],
      },
    ],
    lab: {
      id: 'lab-7-ansible-iac-automation',
      title: 'Полная автоматизация настройки серверов с помощью Ansible (IaC)',
      scenario:
        'Создать Ansible репозиторий, который с нуля настраивает "чистый" сервер Linux: создает пользователя-администратора со SSH ключом, настраивает UFW фаервол, устанавливает Docker и развертывает Nginx с кастомным шаблоном Jinja2.',
      environment: '2 виртуальные машины Linux (Управляющая нода Ansible Control Node + Целевой сервер Managed Node)',
      estimatedTime: '8 часов',
      prerequisites: ['Доступ по SSH по ключам между хостами'],
      steps: [
        {
          title: 'Шаг 1. Создание инвентаря и структуры ролей',
          instructions:
            'Создайте структуру каталогов: inventory.ini, roles/common, roles/security, roles/docker.',
          commands: [
            'mkdir -p roles/{common,security,docker}/{tasks,handlers,templates,vars}',
          ],
          verification: 'ansible-galaxy init или ручная структура каталогов готова',
        },
        {
          title: 'Шаг 2. Написание задач автоматизации в YAML',
          instructions:
            'Напишите плейбуки для обновления пакетов, настройки sysctl параметров безопасности и развертывания Nginx.',
          commands: [
            'ansible-playbook -i inventory.ini site.yml --syntax-check',
          ],
          verification: 'Синтаксис YAML валиден',
        },
        {
          title: 'Шаг 3. Запуск плейбука и проверка идемпотентности',
          instructions:
            'Запустите плейбук. Первый запуск должен показать изменения (changed > 0). Второй запуск подряд должен показать changed = 0 (все ок, ничего не менялось).',
          commands: [
            'ansible-playbook -i inventory.ini site.yml',
            'ansible-playbook -i inventory.ini site.yml',
          ],
          verification: 'При повторном запуске все задачи имеют статус "ok", changed=0',
        },
      ],
      definitionOfDone: [
        'Инфраструктура настраивается полностью без ручного вмешательства',
        'Секреты зашифрованы через Ansible Vault',
        'Плейбук строго идемпотентен (второй запуск не вносит изменений)',
      ],
      troubleshootingTips: [
        'Ошибка SSH connection failed? Проверьте параметры ansible_ssh_user и путь к приватному ключу в inventory.ini.',
      ],
      portfolioArtifact: {
        title: 'Enterprise Server Provisioning with Ansible & Infrastructure as Code',
        repoName: 'ansible-server-provisioning-iac',
        summary:
          'Модульный Ansible проект для автоматического приведения серверов к корпоративному стандарту безопасности: SSH, UFW firewall, Docker engine, мониторинг-агенты и шаблонизация Jinja2.',
        technologies: ['Ansible', 'Bash', 'Jinja2', 'YAML', 'Git', 'Linux'],
        fileTree: [
          'README.md',
          'inventory.ini',
          'site.yml',
          'roles/security/tasks/main.yml',
          'roles/security/templates/sshd_config.j2',
          'roles/docker/tasks/main.yml',
          'scripts/run_audit.sh',
        ],
        keyConfigSnippets: [
          {
            fileName: 'site.yml',
            language: 'yaml',
            code: `- name: Baseline Server Configuration
  hosts: all
  become: true
  gather_facts: true

  roles:
    - role: security
      tags: security
    - role: docker
      tags: docker

  handlers:
    - name: restart sshd
      systemd:
        name: sshd
        state: restarted`,
            description: 'Мастер-плейбук развертывания базовой инфраструктуры',
          },
        ],
        readmeMarkdown: `# Enterprise Server Provisioning with Ansible & Infrastructure as Code

## 📌 Описание проекта
Данный репозиторий реализует концепцию **Infrastructure as Code (IaC)** для автоматического развертывания и поддержания конфигурации серверов.

## 🚀 Возможности
- **Модульность:** Разделение на роли (\`security\`, \`docker\`, \`monitoring\`).
- **Безопасность:** Автоматическое закрытие неиспользуемых портов через UFW, генерация sshd_config из защищенного шаблона Jinja2.
- **Идемпотентность:** Гарантированное отсутствие побочных эффектов при повторных запусках.
`,
      },
    },
    quiz: [
      {
        id: 'q7-1',
        question: 'Что делает директива `set -euo pipefail` в начале Bash скрипта?',
        options: [
          'Ускоряет выполнение скрипта в 2 раза',
          'Останавливает скрипт при ошибке любой команды (-e), при обращении к необъявленной переменной (-u) и при ошибке внутри конвейера (-o pipefail)',
          'Переводит вывод скрипта на русский язык',
          'Запускает скрипт в фоновом режиме',
        ],
        correctIndex: 1,
        explanation:
          'Это "Strict Mode" для Bash. По умолчанию Bash продолжает выполнять скрипт даже при фатальных ошибках, что приводит к непредсказуемым последствиям и повреждению данных.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq7-1',
        category: 'Linux',
        question: 'В чем разница между Ansible, Puppet и Terraform? Когда вы выберете Ansible?',
        shortAnswer:
          'Terraform оркестрирует облачную инфраструктуру (IaaS), а Ansible конфигурирует ОС внутри серверов (Config Management). Ansible безагентный (работает по SSH), в отличие от Puppet/Chef.',
        detailedAnswer:
          'Terraform лучше всего подходит для создания виртуальных машин, сетей, балансировщиков в облаке (Declarative State). После того как машины созданы, Ansible подключается к ним по SSH без установки агентов-демонов и накатывает софт, пользователей и конфиги. Я выберу Ansible за простоту старта, отсутствие необходимости поддерживать сервер управления (Puppet Master) и человекочитаемый YAML.',
        practicalTip:
          'Понимание места каждого инструмента в цепочке CI/CD и IaC — обязательное требование к современному сисадмину.',
      },
    ],
  },
  {
    id: 8,
    slug: 'monitoring-and-logging',
    title: 'Мониторинг, Логирование и Алертинг (Observability)',
    subtitle: 'Prometheus, Node Exporter, Grafana дашборды, Zabbix 7, Loki и мгновенные алерты в Telegram',
    level: 'Middle Ready',
    durationWeeks: '3 недели',
    estimatedHours: 40,
    iconName: 'Activity',
    keySkills: [
      'Pull vs Push модель сбора метрик',
      'Prometheus (PromQL, scrape configs, retention)',
      'Node Exporter (CPU, RAM, Disk I/O, Network)',
      'Grafana (построение информативных дашбордов)',
      'Alertmanager и интеграция с Telegram Bot / Webhooks',
      'Централизованный сбор логов: Vector / Grafana Loki',
      'Zabbix 7.0 архитектура (агенты, шаблоны, триггеры)',
    ],
    theorySummary:
      'Вы не можете управлять тем, чего не измеряете. Сисадмин не должен узнавать о падении сервера от разгневанных пользователей или директора. Грамотно настроенный стек мониторинга предупреждает о проблеме заранее: когда диск заполнен на 85%, когда растет количество 5xx ошибок или когда база данных близка к исчерпанию соединений.',
    coreConcepts: [
      {
        name: 'Pull (Prometheus) vs Push (Zabbix/StatsD)',
        description:
          'В Pull-модели сервер мониторинга сам опрашивает агенты по расписанию (HTTP GET /metrics). В Push-модели агенты сами отправляют данные на сервер.',
        realWorldUse:
          'Pull-модель в Prometheus исключает переполнение сервера метриками при резких всплесках нагрузки и автоматически детектирует смерть ноды (Target Down), если та перестала отвечать.',
      },
      {
        name: 'Золотые сигналы мониторинга (Google SRE)',
        description:
          'Четыре ключевые метрики любой системы: Latency (задержка ответа), Traffic (нагрузка/RPS), Errors (процент ошибок) и Saturation (насыщение ресурсов: CPU, RAM, Disk queue).',
        realWorldUse:
          'Вместо создания 100 бесполезных графиков вы фокусируетесь на том, что реально влияет на бизнес.',
      },
      {
        name: 'Шторм алертов (Alert Fatigue) и группировка',
        description:
          'Ситуация, когда при падении коммутатора администратор получает 500 сообщений в Telegram от каждого сервера за секунду. Настройка inhibit_rules и grouping в Alertmanager объединяет их в одно осмысленное сообщение.',
        realWorldUse:
          'Предотвращает ситуацию, когда дежурные просто отключают уведомления из-за бесконечного спама.',
      },
    ],
    cheatSheets: [
      {
        category: 'PromQL и логирование',
        commands: [
          { cmd: '100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)', desc: 'PromQL: реальная загрузка CPU сервера в процентах за последние 5 минут' },
          { cmd: '(node_filesystem_free_bytes / node_filesystem_size_bytes) * 100 < 15', desc: 'PromQL: триггер алерта при остатке свободного места на диске менее 15%' },
          { cmd: 'promtool check config prometheus.yml', desc: 'Проверка синтаксиса конфигурации Prometheus' },
          { cmd: 'promtool check rules alert_rules.yml', desc: 'Проверка синтаксиса правил алертинга' },
        ],
      },
    ],
    lab: {
      id: 'lab-8-observability-stack',
      title: 'Развертывание системы мониторинга Prometheus + Grafana с алертами в Telegram',
      scenario:
        'Развернуть полноценный мониторинг серверов компании: Prometheus собирает метрики хоста через Node Exporter, в Grafana настроен красивый дашборд использования ресурсов, а Alertmanager шлет мгновенное уведомление в Telegram-чат дежурных при падении сервиса или перегрузке CPU.',
      environment: 'Docker Compose на любом Linux сервере с доступом в Интернет к Telegram API',
      estimatedTime: '8 часов',
      prerequisites: ['Созданный Telegram-бот через @BotFather и Chat ID'],
      steps: [
        {
          title: 'Шаг 1. Развертывание стека в Docker Compose',
          instructions:
            'Запустите контейнеры prometheus, node-exporter, grafana и alertmanager.',
          commands: [
            'docker compose up -d',
          ],
          verification: 'Grafana открывается на порту 3000, Prometheus на 9090, Alertmanager на 9093',
        },
        {
          title: 'Шаг 2. Настройка Alertmanager для Telegram',
          instructions:
            'Настройте alertmanager.yml с токеном Telegram-бота и шаблоном сообщения.',
          commands: [
            'promtool check config prometheus.yml',
          ],
          verification: 'Alertmanager успешно подключен к Telegram',
        },
        {
          title: 'Шаг 3. Имитация аварии (Chaos Engineering)',
          instructions:
            'Загрузите процессор до 100% утилитой stress-ng или остановите сервис. Убедитесь, что в Telegram приходит алерт [FIRING], а после снятия нагрузки — уведомление [RESOLVED].',
          commands: [
            'stress-ng --cpu 4 --timeout 180s',
          ],
          verification: 'В Telegram получен алерт: "🔥 High CPU Load on srv-node01"',
        },
      ],
      definitionOfDone: [
        'Метрики собираются непрерывно каждые 15 секунд',
        'В Grafana импортирован Node Exporter Full Dashboard (ID 1860)',
        'Алерты о критических сбоях приходят в Telegram с авто-резолвом',
      ],
      troubleshootingTips: [
        'Не приходят алерты в Telegram? Проверьте chat_id (для групп он часто отрицательный, например -100123456789).',
      ],
      portfolioArtifact: {
        title: 'Full Observability Stack: Prometheus, Grafana, Alertmanager & Telegram',
        repoName: 'infrastructure-monitoring-stack',
        summary:
          'Готовый инфраструктурный стек наблюдаемости (Observability): сбор системных метрик через Node Exporter, красивые дашборды в Grafana, тонкая настройка порогов срабатывания и алертинг в Telegram с подавлением ложных срабатываний.',
        technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'PromQL', 'Docker', 'Telegram API'],
        fileTree: [
          'README.md',
          'docker-compose.yml',
          'prometheus/prometheus.yml',
          'prometheus/alerts.yml',
          'alertmanager/alertmanager.yml',
          'grafana/dashboards/node_overview.json',
        ],
        keyConfigSnippets: [
          {
            fileName: 'prometheus/alerts.yml',
            language: 'yaml',
            code: `groups:
  - name: HostAlerts
    rules:
      - alert: HostHighCpuLoad
        expr: (100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)) > 85
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "Host high CPU load (instance {{ $labels.instance }})"
          description: "CPU load is > 85% for more than 3 minutes. Current value: {{ $value }}%"

      - alert: InstanceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} down"
          description: "Target has been unreachable for more than 1 minute."`,
            description: 'Правила алертинга Prometheus для CPU и падения хоста',
          },
        ],
        readmeMarkdown: `# Full Observability Stack: Prometheus, Grafana, Alertmanager & Telegram

## 📌 Архитектура системы мониторинга
Проект реализует комплексный мониторинг серверного парка:
- **Метрики:** Prometheus с интервалом сбора 15 секунд.
- **Визуализация:** Grafana с преднастроенными дашбордами системных ресурсов (CPU, Memory, Disk Space, Network Bandwidth, IOPS).
- **Алертинг:** Двухуровневые уведомления (Warning и Critical) в корпоративный Telegram-канал дежурных инженеров.
`,
      },
    },
    quiz: [
      {
        id: 'q8-1',
        question: 'Для чего в правилах алертинга Prometheus используется директива `for: 3m`?',
        options: [
          'Алерт будет отправляться каждые 3 минуты бесконечно',
          'Условие алерта (например, CPU > 85%) должно непрерывно выполняться в течение 3 минут, чтобы отсечь кратковременные пики и избежать ложных тревог',
          'Алерт удалится из памяти через 3 минуты',
          'Задержка доставки сообщения в Telegram на 3 минуты',
        ],
        correctIndex: 1,
        explanation:
          'Директива `for` переводит алерт в состояние PENDING. Только если условие сохраняется в течение указанного времени, алерт переходит в статус FIRING и отправляется в Alertmanager. Это защищает администратора от ночных побудок из-за 5-секундного всплеска нагрузки.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq8-1',
        category: 'Мониторинг',
        question: 'Что вы выберете для компании: Zabbix или связку Prometheus + Grafana? В чем разница?',
        shortAnswer:
          'Zabbix — комплексный классический комбайн "все-в-одном" (подходит для офисных сетей, SNMP коммутаторов, принтеров, традиционных ВМ). Prometheus + Grafana — современный де-факто стандарт для облаков, микросервисов и контейнеров.',
        detailedAnswer:
          'Zabbix хранит сырые данные в реляционной СУБД (PostgreSQL/MySQL), имеет удобный веб-интерфейс для настройки "мышкой" и отлично опрашивает сетевое железо по SNMP. Prometheus использует оптимизированную Time-Series базу данных (TSDB), работает по Pull-модели и настраивается как код (GitOps), идеально масштабируясь в Kubernetes и динамических средах. В реальной жизни часто используют Zabbix для физических сетей, а Prometheus для сервисов и приложений.',
        practicalTip:
          'Покажите взвешенный подход: идеального инструмента нет, все зависит от типа инфраструктуры.',
      },
    ],
  },
  {
    id: 9,
    slug: 'security-backups-and-disaster-recovery',
    title: 'Информационная безопасность, Бэкапы и Disaster Recovery (DRP)',
    subtitle: 'Бэкап-стратегия 3-2-1, BorgBackup, Restic, UFW/nftables, Fail2ban, CIS Benchmarks и план DRP',
    level: 'Middle Ready',
    durationWeeks: '3 недели',
    estimatedHours: 40,
    iconName: 'Lock',
    keySkills: [
      'Правило резервного копирования 3-2-1-1-0',
      'Дедупликация и шифрование (BorgBackup, Restic)',
      'Сетевые экраны UFW / nftables',
      'Защита от брутфорса Fail2ban',
      'Аудит безопасности: Lynis & CIS Benchmark',
      'План аварийного восстановления (Disaster Recovery Plan)',
      'Метрики RTO (Recovery Time Objective) и RPO (Recovery Point Objective)',
    ],
    theorySummary:
      'Системные администраторы делятся на тех, кто еще не делает бэкапы, и тех, кто их УЖЕ делает и ПРОВЕРЯЕТ восстановление. Без регулярного тестового восстановления бэкап считается несуществующим. На этом этапе вы строите неприступный периметр безопасности и автоматизируете создание зашифрованных резервных копий с защитой от вирусов-вымогателей (Ransomware/Immutability).',
    coreConcepts: [
      {
        name: 'Стратегия 3-2-1-1-0',
        description:
          '3 копии данных, на 2 разных типах носителей (например, локальный RAID и удаленный сервер), 1 копия вне офиса (Offsite / Cloud), 1 копия неизменяемая (Immutable/Air-gapped offline), 0 ошибок при тестовом восстановлении.',
        realWorldUse:
          'Защищает от пожара в серверной, сбоя оборудования и вирусов-шифровальщиков, которые стирают сетевые диски.',
      },
      {
        name: 'RTO и RPO',
        description:
          'RPO (Recovery Point Objective) — за какой период компания готова потерять данные (например, бэкап раз в сутки = RPO 24 часа). RTO (Recovery Time Objective) — сколько времени допустимо простаивать до полного запуска систем после катастрофы.',
        realWorldUse:
          'Позволяет согласовать с бизнесом бюджет: RTO 5 минут стоит дорого (Active-Active кластер), а RTO 4 часа можно обеспечить восстановлением из бэкапа.',
      },
      {
        name: 'Дедупликация на уровне блоков',
        description:
          'Технология (как в BorgBackup), разбивающая файлы на чанки. Одинаковые блоки данных (например, 10 виртуальных машин с одинаковой ОС Ubuntu) сохраняются в хранилище только один раз.',
        realWorldUse:
          'Экономит до 80-90% дискового пространства и сетевого трафика при ежедневном резервном копировании.',
      },
    ],
    cheatSheets: [
      {
        category: 'Бэкапы и безопасность',
        commands: [
          { cmd: 'borg init --encryption=repokey-blake2 /backup/repo', desc: 'Инициализация зашифрованного репозитория BorgBackup' },
          { cmd: 'borg create --stats --progress /backup/repo::backup-{now} /var/www /etc', desc: 'Создание инкрементального дедуплицированного бэкапа с выводом статистики' },
          { cmd: 'borg list /backup/repo', desc: 'Просмотр всех доступных снапшотов бэкапа' },
          { cmd: 'borg check --verify-data /backup/repo', desc: 'Полная проверка целостности репозитория бэкапов' },
          { cmd: 'fail2ban-client status sshd', desc: 'Просмотр заблокированных IP-адресов злоумышленников' },
          { cmd: 'lynis audit system', desc: 'Комплексный аудит безопасности Linux-сервера по стандартам CIS/ISO' },
        ],
      },
    ],
    lab: {
      id: 'lab-9-disaster-recovery-plan',
      title: 'Внедрение автоматического шифрованного бэкапа BorgBackup и симуляция восстановления после катастрофы',
      scenario:
        'Настроить автоматическое резервное копирование critical данных компании на удаленный сервер по расписанию: шифрование AES-256, дедупликация, уведомления в Telegram. Сымитировать аппаратный сбой диска (`rm -rf`) и провести полное восстановление сервисов с замером фактического RTO.',
      environment: '2 Linux сервера (Prod Server + Dedicated Backup Server)',
      estimatedTime: '8 часов',
      prerequisites: ['SSH ключ без пароля для служебного пользователя backup'],
      steps: [
        {
          title: 'Шаг 1. Инициализация и настройка BorgBackup',
          instructions:
            'Установите BorgBackup, создайте ключ шифрования и настройте исключения (--exclude /var/log, cache).',
          commands: [
            'sudo apt-get install -y borgbackup',
            'borg init --encryption=repokey-blake2 /mnt/backup/borg_repo',
          ],
          verification: 'Репозиторий успешно инициализирован',
        },
        {
          title: 'Шаг 2. Написание скрипта бэкапа с pruning и логами',
          instructions:
            'Создайте скрипт с автоматическим удалением старых копий: хранить 7 ежедневных, 4 еженедельных и 6 ежемесячных копий (borg prune).',
          commands: [
            'sudo /usr/local/bin/backup-job.sh',
          ],
          verification: 'Бэкап создан за считанные секунды благодаря дедупликации',
        },
        {
          title: 'Шаг 3. Учения по восстановлению (Disaster Recovery Drill)',
          instructions:
            'Засеките секундомер. Удалите рабочие файлы веб-сервера. Смонтируйте бэкап через `borg mount` или извлеките через `borg extract`. Запустите сервисы и зафиксируйте итоговый RTO.',
          commands: [
            'borg extract /mnt/backup/borg_repo::latest_backup',
          ],
          verification: 'Сайт снова доступен, целостность файлов подтверждена, RTO задокументирован',
        },
      ],
      definitionOfDone: [
        'Бэкап выполняется автоматически по cron или systemd-timer',
        'Архивы зашифрованы, ключ надежно сохранен вне сервера',
        'Составлен пошаговый регламент действий при аварии (DRP Runbook)',
      ],
      troubleshootingTips: [
        'Обязательно сделайте экспорт ключа репозитория: borg key export /mnt/backup/borg_repo key.txt и сохраните его в надежный менеджер паролей!',
      ],
      portfolioArtifact: {
        title: 'Enterprise Backup Solution with BorgBackup & Disaster Recovery Runbook',
        repoName: 'disaster-recovery-and-borgbackup',
        summary:
          'Автоматизированный комплекс резервного копирования на базе BorgBackup: дедупликация, шифрование на стороне клиента, ротация по схеме GFS (Grandfather-Father-Son), мониторинг статуса и регламент восстановления при ЧС.',
        technologies: ['BorgBackup', 'Bash', 'Cryptest', 'systemd', 'Telegram Bot', 'DRP'],
        fileTree: [
          'README.md',
          'scripts/borg_backup.sh',
          'systemd/borg-backup.service',
          'systemd/borg-backup.timer',
          'docs/DISASTER_RECOVERY_RUNBOOK.md',
          'docs/rto_rpo_analysis.md',
        ],
        keyConfigSnippets: [
          {
            fileName: 'scripts/borg_backup.sh',
            language: 'bash',
            code: `#!/usr/bin/env bash
set -euo pipefail

export BORG_REPO="ssh://backup-user@backup.internal/var/backups/prod"
export BORG_PASSPHRASE="\${BACKUP_SECRET_PASS}"

echo "Starting BorgBackup: $(date)"

borg create --verbose --stats --compression zstd,3 \\
    --exclude-caches \\
    --exclude '/var/cache/*' \\
    --exclude '/var/log/*' \\
    "$BORG_REPO::{hostname}-{now:%Y-%m-%d_%H:%M}" \\
    /etc /var/www /var/lib/postgresql

echo "Pruning old backups..."
borg prune -v --list "$BORG_REPO" \\
    --keep-daily=7 \\
    --keep-weekly=4 \\
    --keep-monthly=6

echo "Backup finished successfully."`,
            description: 'Продакшен-скрипт резервного копирования с дедупликацией ZSTD и ротацией',
          },
        ],
        readmeMarkdown: `# Enterprise Backup Solution with BorgBackup & Disaster Recovery Runbook

## 📌 Архитектура защиты данных
Решение обеспечивает защиту критически важной информации компании по стандарту 3-2-1:
- **Шифрование:** Все данные шифруются алгоритмом AES-256 на клиенте до передачи по сети.
- **Эффективность хранения:** Дедупликация на уровне чанков позволила сократить требуемый объем хранилища в 6.4 раза.
- **Готовность к ЧС:** В состав репозитория включен регламент \`DISASTER_RECOVERY_RUNBOOK.md\` с хронометражем и командами для восстановления "с нуля" при аппаратном выходе сервера из строя.
`,
      },
    },
    quiz: [
      {
        id: 'q9-1',
        question: 'Что такое RTO (Recovery Time Objective)?',
        options: [
          'Максимально допустимый объем потерянных данных при сбое в гигабайтах',
          'Максимально допустимое время простоя системы от момента аварии до полного восстановления работоспособности сервиса',
          'Стоимость одного серверного шкафа',
          'Количество копий бэкапа в облаке',
        ],
        correctIndex: 1,
        explanation:
          'RTO определяет время: за сколько часов/минут системный администратор обязан поднять упавшую инфраструктуру. RPO (Recovery Point Objective) определяет свежесть данных: сколько часов работы допустимо потерять.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq9-1',
        category: 'Безопасность',
        question: 'Что вы предпримете в первую очередь, если обнаружите, что один из Linux-серверов скомпрометирован (взломан)?',
        shortAnswer:
          'Изолировать сервер от сети (отключить сетевой кабель/виртуальный интерфейс), снять дамп оперативной памяти и снапшот диска для форензики, поднять чистую систему из доверенного бэкапа.',
        detailedAnswer:
          '1. **Изоляция:** Немедленно отключить хост от сети на уровне гипервизора/коммутатора, чтобы злоумышленник не продвинулся дальше (Lateral Movement) и не стер следы.\n2. **Фиксация доказательств:** Снять снапшот ВМ и дамп RAM для расследования (Digital Forensics).\n3. **Восстановление:** Никогда не "лечить" взломанную ОС вручную — злоумышленник мог оставить руткиты на уровне ядра. Развернуть чистый сервер из IaC/бэкапа до инцидента.\n4. **Смена всех секретов:** Немедленная ротация всех SSH-ключей, паролей БД и API-токенов во всей компании.',
        practicalTip:
          'Никогда не говорите "я просто перезагружу сервер" — это уничтожит следы в памяти и может активировать деструктивный сценарий вредоноса.',
      },
    ],
  },
  {
    id: 10,
    slug: 'portfolio-packaging-and-interviews',
    title: 'Упаковка портфолио, Резюме и Подготовка к собеседованиям',
    subtitle: 'Как оформить GitHub, пройти технический скрининг, составить сильное резюме и получить оффер',
    level: 'Middle Ready',
    durationWeeks: '2 недели',
    estimatedHours: 25,
    iconName: 'Briefcase',
    keySkills: [
      'Оформление GitHub профиля инженера',
      'Написание качественных README и схем архитектуры',
      'Составление продающего резюме (HH.ru, LinkedIn, Хабр)',
      'Технический скрининг и Live-troubleshooting',
      'Soft skills и умение говорить на языке пользы для бизнеса',
      'Торг по зарплате и выбор надежного работодателя',
    ],
    theorySummary:
      'Иметь глубокие технические знания — только половина успеха. Вторая половина — уметь их продемонстрировать. Начинающие сисадмины пишут в резюме "знаю Linux, настраивал ПК" и месяцами ждут отклика. Инженер, который прикладывает ссылку на GitHub с 5 оформленными репозиториями, архитектурными схемами, Ansible-плейбуками и регламентами DRP, получает приглашения на собеседования в первые же дни.',
    coreConcepts: [
      {
        name: 'GitHub портфолио системного администратора',
        description:
          'Публичный профиль, демонстрирующий не код приложений, а инженерный подход: аккуратные Ansible роли, Docker Compose манифесты, скрипты на Bash/Python и документация (Runbooks).',
        realWorldUse:
          'Техлид, открыв ваш GitHub, сразу видит, как вы оформляете документацию, знаете ли вы Git и умеете ли структурировать сложные системы.',
      },
      {
        name: 'Формула описания опыта в резюме: XYZ',
        description:
          'Вместо пассивного "занимался серверами" пишите: "Сделал X с помощью технологии Y, что привело к результату Z".',
        realWorldUse:
          'Пример: "Внедрил автоматическое резервное копирование на BorgBackup (Y), что сократило время простоя при аварии до 20 минут (Z) и снизило затраты на диски на 70% благодаря дедупликации".',
      },
      {
        name: 'Поведение на техническом интервью',
        description:
          'Если вы не знаете ответ на конкретный вопрос, никогда не гадайте. Расскажите свой алгоритм поиска ответа.',
        realWorldUse:
          'Фраза: "Точный синтаксис этой директивы я посмотрю в man или man-странице, но суть работы механизма следующая..." звучит в 10 раз профессиональнее молчания.',
      },
    ],
    cheatSheets: [
      {
        category: 'Чек-лист подготовки к интервью',
        commands: [
          { cmd: 'git commit -m "feat(nginx): add upstream least_conn configuration"', desc: 'Используйте понятные Conventional Commits в портфолио' },
          { cmd: 'tree -L 2', desc: 'Визуализация структуры каталогов репозитория для вставки в README' },
        ],
      },
    ],
    lab: {
      id: 'lab-10-portfolio-showcase',
      title: 'Финальная сборка витрины системного администратора и симуляция технического скрининга',
      scenario:
        'Объединить все выполненные практические проекты из предыдущих шагов в единый GitHub профиль. Сгенерировать профессиональный README профиля, подготовить резюме без "воды" и пройти симуляцию из 20 случайных технических вопросов с мгновенной оценкой готовности к офферу.',
      environment: 'GitHub аккаунт + локальный Git + онлайн тренажер собеседований',
      estimatedTime: '6 часов',
      prerequisites: ['Выполненные лабораторные работы из шагов 1-9'],
      steps: [
        {
          title: 'Шаг 1. Создание репозиториев портфолио на GitHub',
          instructions:
            'Создайте 3-5 ключевых публичных репозиториев (например: enterprise-network-vlan, hardened-linux-baseline, ansible-server-provisioning, prometheus-grafana-telegram).',
          commands: [
            'git init',
            'git add .',
            'git commit -m "Initial commit of production lab"',
            'git branch -M main',
            'git push -u origin main',
          ],
          verification: 'Репозитории доступны публично, содержат понятные README с иллюстрациями',
        },
        {
          title: 'Шаг 2. Создание GitHub Profile README',
          instructions:
            'Создайте специальный репозиторий с именем вашего аккаунта (например, username/username) и скопируйте сгенерированный мастер-файл README.md со ссылками на все лабораторные.',
          commands: [],
          verification: 'На главной странице вашего GitHub профиля отображается матрица компетенций и проекты',
        },
        {
          title: 'Шаг 3. Заполнение резюме и пробное интервью',
          instructions:
            'Заполните анкету в разделе "Портфолио & Резюме" нашего приложения, скачайте готовый Markdown и пройдите симулятор вопросов.',
          commands: [],
          verification: 'Индекс готовности к собеседованию превышает 85%',
        },
      ],
      definitionOfDone: [
        'GitHub профиль полностью заполнен и структурирован',
        'Резюме адаптировано под реальные вакансии Junior/Middle Sysadmin',
        'Пройден тренажер технических вопросов по всем 6 направлениям',
      ],
      troubleshootingTips: [
        'Не бойтесь указывать, что это лабораторные проекты! Честность: "Развернул и отладил в домашней лаборатории на Proxmox" ценится намного выше выдуманного опыта.',
      ],
      portfolioArtifact: {
        title: 'Complete SysAdmin Master Portfolio & GitHub Profile Showcase',
        repoName: 'sysadmin-portfolio-master',
        summary:
          'Единый мастер-профиль системного администратора: визитная карточка, матрица стека, ссылки на 9 развернутых инфраструктурных проектов, диаграммы архитектур и регламенты аварийного восстановления.',
        technologies: ['GitHub', 'Markdown', 'Architecture Diagrams', 'GitOps', 'Resume'],
        fileTree: [
          'README.md',
          'RESUME_CV.md',
          'docs/competency_matrix.md',
          'docs/interview_cheatsheet.md',
        ],
        keyConfigSnippets: [
          {
            fileName: 'README.md',
            language: 'markdown',
            code: `# Senior / Junior Sysadmin Portfolio
Welcome to my infrastructure portfolio. Here you will find production-grade IaC playbooks, Docker stacks, network architectures, and security hardening baselines.`,
            description: 'Заголовок мастер-профиля GitHub',
          },
        ],
        readmeMarkdown: `# Complete SysAdmin Master Portfolio & GitHub Profile Showcase

## 🎯 Добро пожаловать
В данном профиле собраны законченные практические проекты, разработанные в ходе подготовки по комплексной программе системного администрирования.

### 🌟 Ключевые проекты:
1. **[Ansible Server Provisioning (IaC)](./labs/step-7)** — автоматизация развертывания хостов.
2. **[Prometheus & Grafana Observability](./labs/step-8)** — мониторинг и Telegram-алертинг.
3. **[Disaster Recovery & BorgBackup](./labs/step-9)** — шифрованное резервное копирование и регламенты DRP.
4. **[High-Availability Nginx & Postgres](./labs/step-4)** — балансировка нагрузки и веб-стек.
`,
      },
    },
    quiz: [
      {
        id: 'q10-1',
        question: 'Что в резюме системного администратора привлекает технических интервьюеров больше всего?',
        options: [
          'Список из 50 программ без описания решаемых задач',
          'Конкретные оцифрованные результаты, ссылки на реальные конфигурации на GitHub и умение обосновать выбор технологии',
          'Красочный дизайн шаблона с графиками владения навыками в процентах (например, Linux 90%)',
          'Большой объем текста на 6 страниц',
        ],
        correctIndex: 1,
        explanation:
          'Рекрутеры и тимлиды обращают внимание на проверяемые факты: наличие кода конфигураций, четко описанный практический опыт и умение решать проблемы бизнеса.',
      },
    ],
    interviewQuestions: [
      {
        id: 'iq10-1',
        category: 'Траблшутинг',
        question: 'Расскажите о самом сложном или интересном инциденте, который вы расследовали в своей практике?',
        shortAnswer:
          'Используйте структуру STAR (Situation, Task, Action, Result): опишите исходную ситуацию, вставшую задачу, предпринятые шаги локализации и достигнутый результат с выводами на будущее.',
        detailedAnswer:
          'Пример ответа: "При тестировании веб-кластера сайт неожиданно стал отдавать 502 ошибку при пике нагрузки (Situation). Задача была найти узкое место без остановки сервиса (Task). Через dmesg я обнаружил ошибку \'nf_conntrack: table full, dropping packet\', что означало исчерпание таблицы отслеживания соединений в iptables (Action). Я увеличил лимит nf_conntrack_max через sysctl, оптимизировал таймауты TCP TIME_WAIT и задокументировал настройку в Ansible. В итоге пропускная способность выросла в 4 раза без сбоев (Result)".',
        practicalTip:
          'Заранее подготовьте 2-3 подобные истории из ваших лабораторных работ для собеседования.',
      },
    ],
  },
];
