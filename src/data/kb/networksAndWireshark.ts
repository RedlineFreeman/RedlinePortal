import { KnowledgeEntry } from '../../types/knowledgeBase';

export const NETWORKS_WIRESHARK_CISCO_ENTRIES: KnowledgeEntry[] = [
  // ==================== СЕТИ: Сетевое администрирование ====================
  {
    id: 'kb-osi-tcpip-model',
    section: 'Сети',
    category: 'Модель OSI и IP-сети',
    title: 'Модель OSI (7 уровней) и стек TCP/IP',
    shortSummary: 'Эталонная сетевая модель взаимодействия, инкапсуляция PDU и методика поуровневой диагностики сбоев.',
    description: `Модель OSI делит сетевое взаимодействие на 7 уровней: 1) Физический (кабель, оптика, биты), 2) Канальный (Ethernet, MAC-адреса, VLAN, кадры/frames), 3) Сетевой (IP, маршрутизация, пакеты), 4) Транспортный (TCP/UDP/SCTP, порты, сегменты), 5) Сеансовый, 6) Представления (кодировка, шифрование TLS) и 7) Прикладной (HTTP, DNS, SMTP, SSH). Практический стек TCP/IP объединяет уровни 5–7 в уровень приложений.

При прохождении данных сверху вниз каждый уровень добавляет свой заголовок (инкапсуляция), а на принимающей стороне снимает его (декапсуляция).`,
    practicalUsage: 'Главный алгоритм траблшутинга "снизу вверх": проверить линк (L1) -> ARP/MAC/VLAN (L2) -> IP и маршрут (L3) -> открытый порт/фаервол (L4) -> ответ сервиса (L7).',
    commandsOrConfig: `# L1-L2: Проверка физического линка, скорости и MAC-таблицы
ethtool eth0
ip link show dev eth0

# L3: IP-адреса и маршрутизация
ip -br addr
ip route get 8.8.8.8

# L4: Проверка доступности TCP-порта
ss -tulpn
nc -zv 10.0.10.5 5432`,
    level: 'Junior',
    tags: ['OSI', 'TCP/IP', 'Инкапсуляция', 'L2', 'L3', 'L4', 'Сетевое администрирование'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ipv4-cidr-nat',
    section: 'Сети',
    category: 'Модель OSI и IP-сети',
    title: 'IPv4, CIDR, VLSM-подсети и NAT/PAT',
    shortSummary: 'Бесклассовая адресация, расчёт масок переменной длины, частные диапазоны RFC 1918 и трансляция адресов.',
    description: `IPv4-адрес состоит из 32 бит (4 октета). Бесклассовая маршрутизация CIDR (/24, /26, /30) определяет границу между адресом сети и хостом. VLSM (Variable Length Subnet Mask) позволяет делить адресное пространство на подсети разного размера без потерь IP-адресов (например, /30 для p2p-линков на 2 хоста, /24 для офиса).

Частные сети RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) не маршрутизируются в интернете. Для выхода в сеть применяется NAT (SNAT/Masquerade) и PAT (Port Address Translation — трансляция тысяч внутренних хостов за один публичный IP по разным исходным портам).`,
    practicalUsage: 'Сегментация корпоративной сети (отделение серверов, пользователей, Wi-Fi гостей, камер), проброс портов (DNAT) до веб-серверов, проектирование IP-плана филиалов и облачных VPC.',
    commandsOrConfig: `# Вычисление подсети в Linux утилитой ipcalc
ipcalc 192.168.10.0/26

# Настройка Masquerade (SNAT/PAT) через nftables в Linux-роутере
nft add table ip nat
nft 'add chain ip nat postrouting { type nat hook postrouting priority 100 ; }'
nft add rule ip nat postrouting oifname "eth0" masquerade`,
    level: 'Junior',
    tags: ['IPv4', 'CIDR', 'VLSM', 'RFC 1918', 'NAT', 'PAT', 'Подсети'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ipv6-addressing',
    section: 'Сети',
    category: 'Модель OSI и IP-сети',
    title: 'IPv6: адресация, SLAAC и ICMPv6',
    shortSummary: '128-битная адресация нового поколения, автоконфигурация без DHCPv6 и обязательная роль ICMPv6.',
    description: `IPv6 использует 128-битные адреса в шестнадцатеричной записи (8 групп по 4 hex-цифры, например 2001:db8::1). Основные типы адресов: Global Unicast (2000::/3 — публичные), Unique Local (fc00::/7 — аналог RFC 1918) и Link-Local (fe80::/10 — автоматически назначается на каждом интерфейсе для работы внутри сегмента).

В IPv6 нет широковещательного трафика (Broadcast) и протокола ARP — вместо них используется Multicast и Neighbor Discovery Protocol (NDP) поверх ICMPv6. Поэтому полная блокировка ICMPv6 ломает сеть.`,
    practicalUsage: 'Настройка Dual-Stack (IPv4 + IPv6) на веб-серверах и пограничных маршрутизаторах, выдача префиксов провайдерам (Prefix Delegation), диагностика мобильных сетей.',
    commandsOrConfig: `# Просмотр IPv6-адресов и таблицы соседей (аналог ARP)
ip -6 addr show
ip -6 neigh show

# Трассировка и пинг по IPv6
ping6 -c 4 2001:4860:4860::8888
traceroute6 ifconfig.co`,
    level: 'Middle',
    tags: ['IPv6', 'SLAAC', 'NDP', 'ICMPv6', 'Dual-Stack', 'Сетевое администрирование'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-arp-icmp-routing',
    section: 'Сети',
    category: 'Модель OSI и IP-сети',
    title: 'ARP, ICMP и таблицы маршрутизации',
    shortSummary: 'Разрешение MAC-адресов в локальном сегменте, управляющие сообщения сети и выбор маршрута (Longest Prefix Match).',
    description: `ARP (Address Resolution Protocol) преобразует известный IPv4-адрес узла в его MAC-адрес с помощью широковещательного запроса ARP Request и кэширует результат в ARP-таблице. Gratuitous ARP (GARP) используется для обнаружения конфликтов IP и переключения отказоустойчивых кластеров (Keepalived/VRRP).

При маршрутизации ядро ОС выбирает маршрут по правилу Longest Prefix Match (наиболее длинная маска подсети имеет высший приоритет), а при совпадении масок — по наименьшей метрике.`,
    practicalUsage: 'Диагностика недоступности шлюза, выявление ARP-спуфинга и дублирующихся IP в VLAN, настройка Policy-Based Routing (несколько провайдеров).',
    commandsOrConfig: `# Просмотр и очистка ARP-кэша в Linux
ip neigh show
sudo ip neigh flush all

# Статический маршрут в определенную подсеть через шлюз
sudo ip route add 10.20.0.0/16 via 192.168.1.254 dev eth0

# Отслеживание переходов пакетов (MTU Path Discovery и потери)
mtr -n -c 20 1.1.1.1`,
    level: 'Junior',
    tags: ['ARP', 'ICMP', 'Routing', 'Longest Prefix Match', 'mtr', 'Сетевое администрирование'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-dns-architecture',
    section: 'Сети',
    category: 'Ключевые сетевые службы',
    title: 'DNS (Domain Name System): зоны, записи и DNSSEC',
    shortSummary: 'Распределенная иерархическая система преобразования доменных имен в IP, типы ресурсных записей и отладка.',
    description: `DNS преобразует доменные имена в IP-адреса и служебные данные. Иерархия включает корневые серверы (.), серверы верхнего уровня (TLD: .ru, .com) и авторитативные серверы доменов. Типы записей: A (IPv4), AAAA (IPv6), CNAME (псевдоним), MX (почтовые серверы), TXT (SPF/DKIM/DMARC и верификация), SRV (сервисы Active Directory _ldap._tcp), PTR (обратная зона rDNS), NS (авторитативные серверы) и SOA (параметры зоны и TTL).

DNS работает по UDP/53 (обычные запросы), TCP/53 (ответы >512 байт и трансфер зон AXFR), DoT (TLS/853) и DoH (HTTPS/443).`,
    practicalUsage: 'Развертывание корпоративных DNS-серверов (BIND9, Unbound, CoreDNS, Windows DNS), настройка Split-Horizon DNS, защита почты (SPF/DKIM/DMARC), интеграция с AD DS.',
    commandsOrConfig: `# Полная трассировка разрешения имени от корневых серверов
dig +trace example.com

# Запрос конкретных записей (MX, TXT, SRV) у указанного DNS
dig @8.8.8.8 gmail.com MX +short
dig @10.0.0.10 _ldap._tcp.dc._msdcs.corp.local SRV

# Обратный DNS-запрос (PTR)
dig -x 8.8.8.8 +short`,
    level: 'Junior',
    tags: ['DNS', 'BIND9', 'Unbound', 'dig', 'MX', 'SRV', 'Split-DNS'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-dhcp-dora-relay',
    section: 'Сети',
    category: 'Ключевые сетевые службы',
    title: 'DHCP: процесс DORA, DHCP Relay и Option 82',
    shortSummary: 'Автоматическая выдача сетевых параметров, ретрансляция запросов через маршрутизаторы и защита DHCP Snooping.',
    description: `DHCP выдает клиентам IP-адрес, маску, шлюз (Option 3), DNS-серверы (Option 6), NTP и путь сетевой загрузки PXE (Option 66/67). Цикл получения адреса состоит из 4 широковещательных/юникаст пакетов DORA: Discover -> Offer -> Request -> Acknowledge (порты UDP 67 сервер / UDP 68 клиент).

Поскольку широковещательный Broadcast не проходит через маршрутизатор (L3), в разных VLAN используется DHCP Relay Agent (в Cisco — команда ip helper-address), пересылающий запросы на центральный DHCP-сервер в виде Unicast.`,
    practicalUsage: 'Централизованное управление адресным пространством офисов на ISC Kea DHCP или Windows DHCP Failover, резервирование IP по MAC-адресу, защита от поддельных серверов (Rogue DHCP) через DHCP Snooping на коммутаторах.',
    commandsOrConfig: `# Настройка DHCP Relay на интерфейсе VLAN маршрутизатора Cisco
interface Vlan20
 ip address 10.20.20.1 255.255.255.0
 ip helper-address 10.0.0.15

# Принудительное обновление аренды DHCP в Linux (dhclient)
sudo dhclient -r eth0 && sudo dhclient -v eth0`,
    level: 'Junior',
    tags: ['DHCP', 'DORA', 'Relay', 'Kea', 'PXE', 'DHCP Snooping'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ntp-chrony',
    section: 'Сети',
    category: 'Ключевые сетевые службы',
    title: 'NTP и Chrony: синхронизация времени Stratum',
    shortSummary: 'Иерархия точного времени, плавная подстройка часов без скачков (slew) и критичность для Kerberos/БД.',
    description: `Протокол NTP (UDP/123) синхронизирует системные часы серверов с точностью до миллисекунд (или микросекунд в локальной сети). Источники времени делятся на уровни (Stratum): Stratum 0 (атомные часы/GPS), Stratum 1 (серверы, подключенные к Stratum 0), Stratum 2/3 (публичные и корпоративные серверы).

В современных дистрибутивах Linux вместо классического ntpd используется Chrony, который быстрее сходится, корректно работает на виртуальных машинах и плавно замедляет/ускоряет ход часов (slew) вместо резких скачков назад (которые могут сломать транзакции БД).`,
    practicalUsage: 'Без точной синхронизации времени (допустимый рассинхрон для Kerberos / Active Directory не более 5 минут) перестают работать авторизация в домене, TLS-сертификаты, 2FA TOTP и корреляция логов инцидентов.',
    commandsOrConfig: `# Проверка статуса синхронизации Chrony и источников времени
chronyc tracking
chronyc sources -v

# Принудительная корректировка системного времени
sudo chronyc makestep`,
    level: 'Junior',
    tags: ['NTP', 'Chrony', 'Stratum', 'Kerberos', 'Время', 'Linux'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-vpn-wireguard-ipsec',
    section: 'Сети',
    category: 'Протоколы',
    title: 'VPN-протоколы: WireGuard vs IPsec (IKEv2) vs OpenVPN',
    shortSummary: 'Сравнение корпоративных туннелей Site-to-Site и Remote Access по производительности, шифрованию и обходу NAT.',
    description: `WireGuard работает в пространстве ядра Linux (~4000 строк кода), использует современную криптографию (ChaCha20-Poly1305, Curve25519) поверх UDP, не хранит состояние сессии до получения валидного пакета (режим stealth) и моментально переключается при смене IP.

IPsec (IKEv2 + ESP) — промышленный стандарт для туннелей Site-to-Site между шлюзами разных вендоров (Cisco ASA, MikroTik, Fortinet, StrongSwan). OpenVPN работает в User-Space поверх TCP или UDP/443 с сертификатами TLS, что делает его удобным для обхода строгих корпоративных фаерволов.`,
    practicalUsage: 'Объединение филиалов в единую защищенную сеть (Site-to-Site), безопасный доступ удаленных сотрудников (Remote Access VPN) в офисную инфраструктуру и к 1С/RDP.',
    commandsOrConfig: `# Генерация пары ключей WireGuard и проверка интерфейса
wg genkey | tee privatekey | wg pubkey > publickey
sudo wg show

# Диагностика IPsec туннелей (StrongSwan)
sudo ipsec statusall`,
    level: 'Middle',
    tags: ['Протоколы', 'VPN', 'WireGuard', 'IPsec', 'IKEv2', 'OpenVPN', 'Site-to-Site'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-nginx-haproxy-lb',
    section: 'Сети',
    category: 'VPN, Балансировка и Траблшутинг',
    title: 'Nginx и HAProxy: Reverse Proxy и балансировка L4/L7',
    shortSummary: 'Терминация TLS, распределение трафика между бэкендами, health-check и высокопроизводительное проксирование.',
    description: `Reverse Proxy принимает запросы клиентов и передает их на пул внутренних серверов. Балансировка бывает L4 (TCP/UDP — перенаправление пакетов без расшифровки трафика, минимальная задержка) и L7 (HTTP/HTTPS — маршрутизация по URL, домену Host, заголовкам и Cookie).

HAProxy специализируется на отказоустойчивой балансировке с детальными active/passive health-check и очередями, а Nginx выступает универсальным комбайном: раздача статики, кэширование, HTTP/2/HTTP/3, терминация SSL (Let's Encrypt) и gRPC-проксирование.`,
    practicalUsage: 'Отказоустойчивые входные точки (Load Balancers) перед кластерами приложений и БД (PostgreSQL+Patroni через HAProxy), защита бэкендов от прямых подключений и Rate Limiting.',
    commandsOrConfig: `# Пример конфига Nginx Reverse Proxy с апстримом и SSL
upstream app_cluster {
    least_conn;
    server 10.0.1.11:8080 max_fails=3 fail_timeout=15s;
    server 10.0.1.12:8080 max_fails=3 fail_timeout=15s;
}
server {
    listen 443 ssl http2;
    location / {
        proxy_pass http://app_cluster;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}`,
    level: 'Middle',
    tags: ['Nginx', 'HAProxy', 'Reverse Proxy', 'Load Balancing', 'L7', 'SSL'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-net-troubleshooting-tools',
    section: 'Сети',
    category: 'VPN, Балансировка и Траблшутинг',
    title: 'Инструменты сетевого администратора: ss, nmap, iperf3, curl',
    shortSummary: 'Практический набор консольных утилит для замера пропускной способности, сканирования портов и отладки HTTP/TLS.',
    description: `В современном Linux устаревшие netstat и ifconfig заменены на пакет iproute2 (ip, ss). Утилита ss читает состояние сокетов напрямую через Netlink из ядра, мгновенно отображая тысячи соединений. Для измерения реальной полосы пропускания между узлами применяется iperf3, для аудита открытых портов — nmap, а для пошаговой проверки DNS, TCP, TLS-рукопожатия и HTTP-ответов — curl.`,
    practicalUsage: 'Ежедневная проверка производительности сети в ДЦ, поиск паразитного трафика, проверка прохождения правил фаервола и валидация сроков действия SSL-сертификатов.',
    commandsOrConfig: `# Анализ открытых сокетов, очередей Recv-Q/Send-Q и процессов
sudo ss -tulpn

# Замер скорости канала (сервер -> клиент в 4 потока)
iperf3 -s                       # на сервере
iperf3 -c 10.0.0.5 -P 4 -t 15   # на клиенте

# Сканирование портов и версий сервисов (SYN-скан)
sudo nmap -sS -sV -p 22,80,443,3389,5432 10.0.10.0/24

# Проверка времени ответа DNS / Connect / TLS / TTFB через curl
curl -sS -o /dev/null -w "DNS:%{time_namelookup}s TCP:%{time_connect}s TLS:%{time_appconnect}s TTFB:%{time_starttransfer}s\n" https://example.com`,
    level: 'Junior',
    tags: ['ss', 'nmap', 'iperf3', 'curl', 'iproute2', 'Диагностика'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== СЕТИ: Wireshark ====================
  {
    id: 'kb-wireshark-filters',
    section: 'Сети',
    category: 'Анализ трафика (Wireshark)',
    title: 'Wireshark: Capture Filters (BPF) vs Display Filters',
    shortSummary: 'Разделение синтаксиса захвата пакетов (libpcap) и фильтрации уже записанного трафика в окне Wireshark.',
    description: `Wireshark использует два совершенно разных языка фильтров:
1) Capture Filters (синтаксис BPF/tcpdump) — задаются ДО начала записи (например: host 10.0.0.5 and port 443). Отбрасывают лишний трафик сразу на уровне драйвера, экономя RAM и диск.
2) Display Filters (собственный синтаксис Wireshark) — применяются на лету к уже захваченным пакетам без их удаления (например: http.request.method == "POST" && ip.addr == 192.168.1.10). Поддерживают поля любых вложенных протоколов L2–L7.`,
    practicalUsage: 'Быстрое выделение нужного клиента или сессии среди гигабайтных дампов трафика на нагруженных шлюзах и серверах приложений.',
    commandsOrConfig: `# Примеры Display Filters в строке фильтрации Wireshark:
ip.addr == 10.0.5.12 && tcp.port == 443
tcp.flags.syn == 1 && tcp.flags.ack == 0        # только новые TCP SYN
dns.flags.rcode != 0                             # все ошибки DNS (NXDOMAIN, SERVFAIL)
http.response.code >= 400                        # ошибки HTTP 4xx/5xx
smb2.cmd == 5                                    # операции Create/Open по SMB`,
    level: 'Junior',
    tags: ['Wireshark', 'BPF', 'Display Filter', 'PCAP', 'Анализ трафика'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-wireshark-tcp-anomalies',
    section: 'Сети',
    category: 'Анализ трафика (Wireshark)',
    title: 'Поиск сетевых проблем в Wireshark: Retransmissions, Zero Window, RST',
    shortSummary: 'Расшифровка цветовых меток, поиск потерь пакетов, переполнения буферов и обрывов TCP-соединений.',
    description: `Wireshark автоматически подсвечивает аномалии на транспортном уровне:
- TCP Retransmission / Spurious Retransmission — потеря пакетов в сети или слишком долгий ответ (высокая задержка RTT).
- TCP Dup ACK (3 и более) — сигнализирует отправителю о пропуске сегмента (запускает Fast Retransmit).
- TCP ZeroWindow — приемный буфер получателя заполнен (приложение не успевает вычитывать данные из сокета, например тормозит БД или 1С).
- TCP RST (Reset) — принудительный сброс сессии (фаервол, закрытый порт или падение процесса).
Функция "Follow -> TCP Stream" собирает весь диалог клиента и сервера в читаемый текстовый вид.`,
    practicalUsage: 'Доказательство первопричины "сеть тормозит": определение, виноват ли канал связи (потери пакетов между хопами) или серверное приложение (Zero Window / долгая пауза перед ответом).',
    commandsOrConfig: `# Фильтры для поиска деградации и потерь в Wireshark:
tcp.analysis.retransmission || tcp.analysis.fast_retransmission
tcp.analysis.zero_window
tcp.flags.reset == 1
tcp.time_delta > 0.5                             # задержки между пакетами более 500мс`,
    level: 'Middle',
    tags: ['Wireshark', 'Retransmission', 'Zero Window', 'TCP RST', 'Траблшутинг'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-tcpdump-tshark',
    section: 'Сети',
    category: 'Анализ трафика (Wireshark)',
    title: 'tcpdump и tshark: захват трафика на серверах без GUI',
    shortSummary: 'Запись кольцевых .pcap-дампов в Linux для последующего разбора в Wireshark и консольная статистика tshark.',
    description: `На Linux-серверах нет графического интерфейса Wireshark, поэтому трафик записывается через tcpdump или консольный движок Wireshark — tshark. Чтобы не забить диск, в продакшене применяют кольцевую ротацию файлов (-C размер в МБ, -W количество файлов) и отключают разрешение DNS (-nn) для снижения нагрузки на CPU.`,
    practicalUsage: 'Отлов редких плавающих сетевых багов на удаленных VPS/прод-серверах (пропажи пакетов, сброс сессий SIP/VoIP, таймауты API) с последующим анализом дампа на ноутбуке администратора.',
    commandsOrConfig: `# Запись дампа без DNS-резолвинга с кольцевой ротацией (5 файлов по 100 МБ)
sudo tcpdump -i eth0 -nn -s 0 -C 100 -W 5 -w /tmp/capture.pcap 'host 10.0.10.20 and (port 80 or port 443)'

# Просмотр HTTP-запросов на лету через tshark
sudo tshark -i any -nn -Y "http.request" -T fields -e ip.src -e http.host -e http.request.uri

# Топ IP-адресов по количеству пакетов в записанном дампе
tshark -r capture.pcap -q -z endpoints,ip`,
    level: 'Middle',
    tags: ['tcpdump', 'tshark', 'Wireshark', 'pcap', 'Linux', 'Сниффер'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-wireshark-tls-decrypt',
    section: 'Сети',
    category: 'Анализ трафика (Wireshark)',
    title: 'Расшифровка TLS/HTTPS трафика в Wireshark (SSLKEYLOGFILE)',
    shortSummary: 'Анализ зашифрованного HTTP/2 и TLS 1.3 трафика через экспорт сессионных ключей Pre-Master Secret.',
    description: `С приходом шифров с прямой секретностью (Perfect Forward Secrecy — ECDHE) и TLS 1.3 невозможно расшифровать трафик приватным ключом сервера. Для отладки собственных приложений и браузеров используется переменная окружения SSLKEYLOGFILE: клиент (Chrome, Firefox, curl, OpenSSL) записывает эфемерные сессионные ключи в текстовый файл, который затем указывается в настройках Wireshark (Edit -> Preferences -> Protocols -> TLS -> (Pre)-Master-Secret log filename).`,
    practicalUsage: 'Отладка REST API, заголовков авторизации, WebSockets и ошибок HTTP/2/HTTP/3 без отключения HTTPS на тестовом или продакшн-стенде.',
    commandsOrConfig: `# Запуск curl с записью TLS ключей для Wireshark
export SSLKEYLOGFILE="$HOME/sslkeys.log"
curl -v https://api.internal.local/v1/health

# Фильтр для просмотра расшифрованного HTTP/2 внутри TLS
http2 && tls`,
    level: 'Senior',
    tags: ['Wireshark', 'TLS 1.3', 'SSLKEYLOGFILE', 'HTTPS', 'PFS', 'Отладка'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== CISCO И СЕТЕВОЕ ОБОРУДОВАНИЕ ====================
  {
    id: 'kb-cisco-ios-cli',
    section: 'Cisco и Сетевое оборудование',
    category: 'Cisco IOS & Коммутация',
    title: 'Cisco IOS CLI: режимы работы, базовая настройка и сохранение',
    shortSummary: 'Иерархия командных режимов Cisco IOS, настройка паролей, баннеров, SSH и работа с NVRAM/running-config.',
    description: `Операционная система Cisco IOS разделена на режимы доступа: User EXEC (> — базовый просмотр), Privileged EXEC (# — полная диагностика, команда enable), Global Configuration ((config)# — configure terminal), Interface/Line Configuration ((config-if)#, (config-line)#).

Изменения сразу применяются в оперативной памяти (running-config). Чтобы конфигурация не пропала после перезагрузки коммутатора или маршрутизатора, её необходимо сохранить в NVRAM командой write memory или copy running-config startup-config.`,
    practicalUsage: 'Первичная инициализация новых коммутаторов Cisco Catalyst и маршрутизаторов ISR, аудит текущей конфигурации, сброс пароля и резервное копирование конфигов на TFTP/SCP сервер.',
    commandsOrConfig: `Switch> enable
Switch# configure terminal
Switch(config)# hostname SW-CORE-01
SW-CORE-01(config)# service password-encryption
SW-CORE-01(config)# enable secret StrongAdminPass!
SW-CORE-01(config)# ip domain-name corp.local
SW-CORE-01(config)# crypto key generate rsa modulus 2048
SW-CORE-01(config)# ip ssh version 2
SW-CORE-01(config)# line vty 0 4
SW-CORE-01(config-line)# transport input ssh
SW-CORE-01(config-line)# login local
SW-CORE-01(config-line)# end
SW-CORE-01# copy running-config startup-config`,
    level: 'Junior',
    tags: ['Cisco', 'IOS', 'CLI', 'Catalyst', 'SSH', 'running-config'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-cisco-vlan-trunk',
    section: 'Cisco и Сетевое оборудование',
    category: 'Cisco IOS & Коммутация',
    title: 'VLAN, 802.1Q Trunk и Inter-VLAN Routing (SVI / Router-on-a-Stick)',
    shortSummary: 'Логическая изоляция широковещательных доменов L2, тегирование кадров IEEE 802.1Q и маршрутизация между VLAN.',
    description: `VLAN (Virtual LAN) делит один физический коммутатор на несколько изолированных L2-сетей. Порты бывают Access (принадлежат одному VLAN для конечных ПК/серверов) и Trunk (передают трафик множества VLAN между коммутаторами или к маршрутизатору/гипервизору, добавляя 4-байтный тег 802.1Q).

Native VLAN передается через Trunk без тега (по умолчанию VLAN 1 — в целях безопасности его меняют на неиспользуемый). Для связи между разными VLAN используется L3-маршрутизация: либо через подинтерфейсы внешнего роутера (Router-on-a-Stick), либо через виртуальные интерфейсы SVI (interface VlanX) на L3-коммутаторе.`,
    practicalUsage: 'Изоляция голосовой сети (Voice VLAN), гостевого Wi-Fi, серверов баз данных и интерфейсов управления IPMI/iLO в единой кабельной инфраструктуре офиса.',
    commandsOrConfig: `! Создание VLAN и назначение Access-порта
SW-01(config)# vlan 10
SW-01(config-vlan)# name USERS_OFFICE
SW-01(config)# interface GigabitEthernet0/1
SW-01(config-if)# switchport mode access
SW-01(config-if)# switchport access vlan 10

! Настройка Trunk-порта с белым списком VLAN
SW-01(config)# interface GigabitEthernet0/24
SW-01(config-if)# switchport trunk encapsulation dot1q
SW-01(config-if)# switchport mode trunk
SW-01(config-if)# switchport trunk native vlan 999
SW-01(config-if)# switchport trunk allowed vlan 10,20,30

! Inter-VLAN Routing (SVI) на L3 коммутаторе
SW-CORE(config)# ip routing
SW-CORE(config)# interface Vlan10
SW-CORE(config-if)# ip address 10.10.10.1 255.255.255.0`,
    level: 'Junior',
    tags: ['Cisco', 'VLAN', '802.1Q', 'Trunk', 'SVI', 'Inter-VLAN'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-cisco-stp-rstp',
    section: 'Cisco и Сетевое оборудование',
    category: 'Cisco IOS & Коммутация',
    title: 'STP / RSTP (Rapid PVST+), PortFast и BPDU Guard',
    shortSummary: 'Предотвращение широковещательных штормов и петель коммутации на L2, выбор Root Bridge и ускорение портов доступа.',
    description: `Физические кольца между коммутаторами без защиты вызывают мгновенный широковещательный шторм (Broadcast Storm), который полностью парализует сеть за секунды. Протокол Spanning Tree (STP 802.1D / Rapid STP 802.1w) автоматически блокирует избыточные линки, оставляя их в резерве на случай обрыва основного кабеля.

На базе наименьшего Bridge ID (Priority + MAC) выбирается главный коммутатор — Root Bridge. На портах, куда подключаются обычные ПК и серверы, включают PortFast (мгновенный переход в Forwarding без 30-секундной задержки) и BPDU Guard (автоматически отключает порт в err-disable, если кто-то воткнул туда несанкционированный свитч и создал петлю).`,
    practicalUsage: 'Обязательное проектирование ядра и уровня доступа ЛВС с резервированием кабелей и защитой от случайного соединения двух розеток патч-кордом.',
    commandsOrConfig: `! Назначение главного коммутатора Root Bridge для VLAN 10,20
SW-CORE(config)# spanning-tree mode rapid-pvst
SW-CORE(config)# spanning-tree vlan 10,20 priority 4096

! Включение защиты на портах доступа (Access)
SW-ACC(config)# interface range GigabitEthernet0/1 - 22
SW-ACC(config-if-range)# spanning-tree portfast
SW-ACC(config-if-range)# spanning-tree bpduguard enable

! Диагностика STP
SW-CORE# show spanning-tree vlan 10`,
    level: 'Middle',
    tags: ['Cisco', 'STP', 'RSTP', 'PVST+', 'PortFast', 'BPDU Guard', 'L2'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-cisco-etherchannel-security',
    section: 'Cisco и Сетевое оборудование',
    category: 'Cisco IOS & Коммутация',
    title: 'EtherChannel (LACP 802.3ad) и Port Security',
    shortSummary: 'Агрегация нескольких физических линков в один логический канал и привязка MAC-адресов на портах доступа.',
    description: `EtherChannel объединяет от 2 до 8 физических портов Ethernet в единый логический интерфейс Port-Channel для увеличения пропускной способности и отказоустойчивости (без блокировки со стороны STP). В мультивендорных сетях (Cisco + Linux Bonding + HP/MikroTik) используется открытый стандарт LACP (IEEE 802.3ad, режимы active/passive).

Port Security ограничивает количество разрешенных MAC-адресов на порту коммутатора и определяет реакцию при нарушении (protect, restrict или shutdown).`,
    practicalUsage: 'Высокоскоростные аплинки 2x10G/4x1G к серверам виртуализации Proxmox/Hyper-V и защита офисных розеток от подключения сторонних устройств.',
    commandsOrConfig: `! Настройка LACP EtherChannel (Trunk)
SW-01(config)# interface range GigabitEthernet0/23 - 24
SW-01(config-if-range)# channel-group 1 mode active
SW-01(config)# interface Port-channel1
SW-01(config-if)# switchport mode trunk

! Проверка состояния агрегации
SW-01# show etherchannel summary

! Port Security (макс 2 MAC с автоматическим запоминанием sticky)
SW-01(config-if)# switchport port-security
SW-01(config-if)# switchport port-security maximum 2
SW-01(config-if)# switchport port-security mac-address sticky`,
    level: 'Middle',
    tags: ['Cisco', 'EtherChannel', 'LACP', '802.3ad', 'Port Security', 'L2'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-cisco-ospf-acl-hsrp',
    section: 'Cisco и Сетевое оборудование',
    category: 'Cisco Маршрутизация и Безопасность',
    title: 'Cisco OSPF, ACL, NAT и резервирование шлюза HSRP',
    shortSummary: 'Динамическая маршрутизация внутри корпоративной сети (Link-State), фильтрация трафика и горячий резерв шлюза.',
    description: `OSPF — протокол динамической маршрутизации состояния связей (Link-State, AD=110), строящий кратчайшее дерево маршрутов по алгоритму Дейкстры на основе стоимости канала (Bandwidth). Сети делятся на области (Area 0 — магистральная Backbone).

Для фильтрации пакетов используются ACL (Access Control Lists): Standard (фильтр только по source IP, ставятся ближе к получателю) и Extended (source/dest IP, протокол и порты, ставятся ближе к источнику). Для резервирования шлюза по умолчанию (Default Gateway) два маршрутизатора объединяются в группу HSRP/VRRP с общим виртуальным IP (VIP).`,
    practicalUsage: 'Корпоративные распределенные сети со множеством маршрутизаторов и резервных каналов связи (MPLS/VPN), обеспечение нулевого простоя шлюза при выходе из строя одного роутера.',
    commandsOrConfig: `! Настройка OSPF с указанием wildcard-маски
R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 10.10.0.0 0.0.255.255 area 0
R1(config-router)# passive-interface GigabitEthernet0/1

! Резервный шлюз HSRP на виртуальном IP 10.10.10.1
R1(config-if)# standby 10 ip 10.10.10.1
R1(config-if)# standby 10 priority 110
R1(config-if)# standby 10 preempt

! Extended ACL (запрет RDP из гостевой сети, разрешение остального)
R1(config)# ip access-list extended GUEST_FILTER
R1(config-ext-nacl)# deny tcp 192.168.50.0 0.0.0.255 10.0.0.0 0.255.255.255 eq 3389
R1(config-ext-nacl)# permit ip any any`,
    level: 'Middle',
    tags: ['Cisco', 'OSPF', 'ACL', 'HSRP', 'VRRP', 'Маршрутизация'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
];
