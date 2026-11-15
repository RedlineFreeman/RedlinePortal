import { KnowledgeEntry } from '../../types/knowledgeBase';

export const PROTOCOLS_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  // ==================== L2: КАНАЛЬНЫЙ УРОВЕНЬ И ДОСТУП ====================
  {
    id: 'kb-proto-ethernet-8023',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Ethernet (IEEE 802.3): кадры, MAC-адресация и Jumbo Frames',
    shortSummary: 'Базовый протокол канального уровня локальных сетей, структура Ethernet II кадра, MTU 1500/9000 и Flow Control.',
    description: `Ethernet (IEEE 802.3) определяет передачу кадров (Frames) на канальном уровне (L2) с использованием 48-битных физических MAC-адресов (первые 3 байта — OUI производителя, последние 3 байта — ID интерфейса). Кадр Ethernet II включает преамбулу, MAC получателя и отправителя, EtherType (0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6, 0x8100 VLAN 802.1Q), полезную нагрузку (46–1500 байт по умолчанию) и контрольную сумму FCS/CRC-32.

Для высоконагруженных сетей хранения (iSCSI, NFS, vMotion) включают Jumbo Frames (MTU 9000 байт), что снижает накладные расходы CPU на обработку заголовков, но требует сквозной поддержки MTU 9000 на всех коммутаторах пути.`,
    practicalUsage: 'Локальные сети офисов и дата-центров (1G / 10G / 25G / 100G), настройка Jumbo Frames для SAN и гипервизоров, диагностика ошибок CRC/FCS на битых патч-кордах и SFP-модулях.',
    commandsOrConfig: `# Проверка MAC-адреса, MTU и статистики ошибок CRC/Drop на интерфейсе
ip -s link show dev eth0
ethtool -S eth0 | grep -iE "err|drop|crc"

# Временное включение Jumbo Frames (MTU 9000)
sudo ip link set dev eth0 mtu 9000`,
    level: 'Junior',
    tags: ['Протоколы', 'Ethernet', '802.3', 'MAC', 'L2', 'MTU', 'Jumbo Frames'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-lldp-cdp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'LLDP (IEEE 802.1AB) и CDP (Cisco Discovery Protocol)',
    shortSummary: 'Протоколы канального уровня для автоматического обнаружения соседних коммутаторов, портов, VLAN и питания PoE.',
    description: `LLDP (открытый стандарт IEEE 802.1AB) и CDP (проприетарный протокол Cisco) работают напрямую поверх Ethernet L2 без IP-адресов. Сетевые устройства (коммутаторы, маршрутизаторы, IP-телефоны, точки доступа и серверы с lldpd) периодически рассылают multicast-кадры со своими идентификаторами: именем хоста, моделью, версией ПО, номером порта, Native VLAN и запрашиваемой мощностью PoE.

В целях безопасности LLDP/CDP отключают на внешних портах, смотрящих в сторону провайдера или недоверенных пользователей, чтобы злоумышленник не узнал топологию и модели оборудования.`,
    practicalUsage: 'Быстрая инвентаризация физической топологии без походов в серверную ("в какой порт какого свитча воткнут сервер eth1?"), автоматическое выделение Voice VLAN для IP-телефонов.',
    commandsOrConfig: `# Установка и просмотр соседей по LLDP/CDP в Linux
sudo apt-get install -y lldpd
sudo lldpcli show neighbors

# Просмотр соседей на коммутаторе Cisco IOS
show lldp neighbors detail
show cdp neighbors detail`,
    level: 'Junior',
    tags: ['Протоколы', 'LLDP', 'CDP', '802.1AB', 'L2', 'PoE', 'Диагностика'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-8021x-eap',
    section: 'Сети',
    category: 'Протоколы',
    title: 'IEEE 802.1X и EAP (Extensible Authentication Protocol)',
    shortSummary: 'Контроль доступа к проводным портам и корпоративному Wi-Fi (WPA2/WPA3-Enterprise) на канальном уровне.',
    description: `IEEE 802.1X (Port-Based Network Access Control) блокирует весь сетевой трафик на порту коммутатора или точке доступа Wi-Fi до успешной аутентификации устройства. В схеме участвуют три роли: Supplicant (клиентское устройство), Authenticator (коммутатор / контроллер Wi-Fi) и Authentication Server (RADIUS, например FreeRADIUS или Windows NPS).

Аутентификация идет с помощью протокола EAP поверх Ethernet (EAPoL): наиболее безопасными методами являются EAP-TLS (взаимная проверка клиентских и серверных сертификатов X.509) и PEAP / EAP-TTLS (туннелирование логина/пароля внутри TLS).`,
    practicalUsage: 'Корпоративная защита от подключения чужих ноутбуков в офисные розетки (NAC), динамическое назначение VLAN после входа, корпоративный Wi-Fi с доменной авторизацией.',
    commandsOrConfig: `! Включение 802.1X на порту коммутатора Cisco
dot1x system-auth-control
interface GigabitEthernet0/10
 switchport mode access
 authentication port-control auto
 dot1x pae authenticator`,
    level: 'Senior',
    tags: ['Протоколы', '802.1X', 'EAP', 'EAP-TLS', 'NAC', 'RADIUS', 'Wi-Fi'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-ppp-pppoe-l2tp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'PPP, PPPoE и L2TP: туннелирование канального уровня и ISP-доступ',
    shortSummary: 'Инкапсуляция L2-кадров для авторизации абонентов провайдерами, аутентификация CHAP/MS-CHAPv2 и нюансы MTU 1492.',
    description: `PPP (Point-to-Point Protocol) обеспечивает установление прямого канала с аутентификацией (PAP, зашифрованный CHAP), сжатием и выдачей IP-адреса. PPPoE (RFC 2516) инкапсулирует PPP-кадры внутрь обычного Ethernet — благодаря этому интернет-провайдеры (ISP) авторизуют абонентов по логину/паролю и управляют сессиями биллинга через Ethernet-сети. Заголовок PPPoE занимает 8 байт, снижая максимальный размер пакета (MTU) с 1500 до 1492 байт (требует TCP MSS Clamping).

L2TP (Layer 2 Tunneling Protocol, UDP/1701) часто комбинируется с IPsec (L2TP/IPsec) для создания корпоративных Remote Access VPN-туннелей, поддерживаемых встроенными клиентами Windows/macOS.`,
    practicalUsage: 'Настройка WAN-подключений у интернет-провайдеров (PPPoE), диагностика "не открываются некоторые сайты" из-за проблемного MTU/MSS, L2TP/IPsec VPN.',
    commandsOrConfig: `# Коррекция TCP MSS на роутере Linux (iptables) для PPPoE (MTU 1492)
iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

# Просмотр активных PPP-интерфейсов в Linux
ip link show type ppp`,
    level: 'Middle',
    tags: ['Протоколы', 'PPP', 'PPPoE', 'L2TP', 'MTU', 'MSS', 'ISP'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== L3: МАРШРУТИЗАЦИЯ, ТУННЕЛИ И ОВЕРЛЕИ ====================
  {
    id: 'kb-proto-isis-rip-eigrp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'IGP-протоколы маршрутизации: IS-IS, RIP (v2/RIPng) и EIGRP',
    shortSummary: 'Сравнение протоколов динамической маршрутизации внутри автономной системы: Link-State, Distance-Vector и гибридная метрика.',
    description: `Помимо OSPF и BGP, в сетях применяются другие ключевые протоколы маршрутизации (IGP):
- IS-IS (Intermediate System to Intermediate System): Link-State протокол, работающий напрямую поверх L2 без IP-заголовка (RFC 1142 / ISO 10589). Используется крупными операторами связи и облаками (AWS, Яндекс) благодаря высокой масштабируемости (единая поддержка IPv4/IPv6 через TLV).
- RIPv2 / RIPng (UDP/520, 521): классический Distance-Vector протокол (алгоритм Беллмана-Форда) с метрикой по числу прыжков (максимум 15 хопов, медленная сходимость). Применяется только в небольших/унаследованных сетях.
- EIGRP (IP Protocol 88): гибридный протокол Cisco (открыт RFC 7868) на базе алгоритма DUAL — учитывает пропускную способность и задержку, мгновенно переключается на резервный маршрут (Feasible Successor).`,
    practicalUsage: 'Проектирование операторских магистралей (IS-IS + MPLS), миграция легаси-сетей (RIP -> OSPF), мультивендорная и Cisco-инфраструктура (EIGRP).',
    commandsOrConfig: `! Проверка маршрутов и соседей EIGRP / IS-IS в Cisco IOS / FRRouting
show ip eigrp neighbors
show isis neighbors
show ip route`,
    level: 'Senior',
    tags: ['Протоколы', 'IS-IS', 'RIP', 'EIGRP', 'Маршрутизация', 'IGP'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-gre-ipip',
    section: 'Сети',
    category: 'Протоколы',
    title: 'GRE (Generic Routing Encapsulation) и IPIP туннелирование',
    shortSummary: 'Легковесная инкапсуляция пакетов разных протоколов поверх IP (Protocol 47) для проброса мультикаста и OSPF/BGP.',
    description: `GRE (RFC 2784, IP Protocol 47) создает виртуальный точка-точка туннель между двумя маршрутизаторами, оборачивая исходный пакет (включая IPv6, MPLS или широковещательный/мультикаст трафик OSPF/EIGRP) в новый IP-заголовок. Важно: сам по себе GRE не шифрует данные! Поэтому в продакшене обычно строят схему GRE over IPsec — IPsec отвечает за криптографию, а GRE позволяет гонять внутри туннеля динамическую маршрутизацию (OSPF/BGP).

Более простой вариант — IPIP (IP Protocol 4), который инкапсулирует только IPv4-в-IPv4 с минимальным заголовком (20 байт).`,
    practicalUsage: 'Объединение филиалов по GRE over IPsec с динамической маршрутизацией, защита от DDoS (скруббинг-центры возвращают очищенный трафик по GRE), CNI-плагин Calico (режим IPIP).',
    commandsOrConfig: `# Создание GRE туннеля в Linux (iproute2)
sudo ip tunnel add gre1 mode gre remote 203.0.113.2 local 198.51.100.1 ttl 255
sudo ip addr add 10.255.0.1/30 dev gre1
sudo ip link set gre1 up mtu 1476`,
    level: 'Middle',
    tags: ['Протоколы', 'GRE', 'IPIP', 'Туннелирование', 'IPsec', 'L3'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vxlan-geneve',
    section: 'Сети',
    category: 'Протоколы',
    title: 'VXLAN и GENEVE: оверлейные сети дата-центров (L2 over L3)',
    shortSummary: 'Преодоление лимита 4096 VLAN через UDP-инкапсуляцию (VNI до 16 млн сегментов) для облаков и Kubernetes.',
    description: `Традиционный VLAN (802.1Q) ограничен 12-битным полем VID (максимум 4094 сети) и плохо масштабируется между стойками дата-центра из-за STP. Протокол VXLAN (RFC 7348) решает эту проблему, инкапсулируя весь L2 Ethernet-кадр внутрь UDP-пакета (стандартный порт UDP/4789) с 24-битным идентификатором VNI (Virtual Network Identifier) — это дает до 16,7 миллионов изолированных виртуальных сетей поверх обычной L3-фабрики (Spine-Leaf).

GENEVE (UDP/6081) — расширение концепции VXLAN с гибкими полями TLV, применяемое в Open Virtual Network (OVN) и современных облачных SDN.`,
    practicalUsage: 'Виртуальные сети в OpenStack, VMware NSX, Proxmox SDN, распределенные подсети подов Kubernetes (Flannel VXLAN, Cilium).',
    commandsOrConfig: `# Создание VXLAN интерфейса в Linux (мультикаст или unicast VTEP)
sudo ip link add vxlan100 type vxlan id 100 dstport 4789 local 10.0.0.1 dev eth0
sudo ip link set vxlan100 up

# Проверка таблицы FDB (соответствие MAC -> удаленный VTEP IP)
bridge fdb show dev vxlan100`,
    level: 'Senior',
    tags: ['Протоколы', 'VXLAN', 'GENEVE', 'SDN', 'Overlay', 'Kubernetes', 'Spine-Leaf'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-mpls',
    section: 'Сети',
    category: 'Протоколы',
    title: 'MPLS (Multiprotocol Label Switching): коммутация по меткам',
    shortSummary: 'Высокоскоростной транспорт операторов связи (L2.5) для L3VPN, изолированных VRF и Traffic Engineering.',
    description: `MPLS работает на границе L2 и L3 (иногда называют L2.5): входной граничный маршрутизатор (LER / PE) добавляет к пакету 32-битную метку (Label), а транзитные роутеры ядра (LSR / P) пересылают трафик на основе короткой таблицы меток без просмотра таблицы IP-маршрутов или заголовков L3.

Протокол позволяет строить изолированные корпоративные каналы L3VPN / L2VPN (VPLS, EVPN) поверх общей магистрали провайдера с сохранением пересекающихся приватных IP (благодаря VRF и Route Distinguisher) и задавать явные маршруты Traffic Engineering (MPLS-TE / Segment Routing).`,
    practicalUsage: 'Магистральные сети интернет-провайдеров и банков, объединение десятков филиалов в защищенную корпоративную сеть через операторский MPLS L3VPN.',
    commandsOrConfig: `# Просмотр таблицы пересылки меток (LFIB) и соседей LDP на маршрутизаторе
show mpls ldp neighbor
show mpls forwarding-table
show ip vrf`,
    level: 'Senior',
    tags: ['Протоколы', 'MPLS', 'VRF', 'L3VPN', 'EVPN', 'Операторы связи'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vrrp-carp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'VRRP (RFC 5798) и CARP: открытые протоколы резервирования шлюза',
    shortSummary: 'Отказоустойчивый виртуальный IP-адрес (VIP) на базе Keepalived в Linux и маршрутизаторах без привязки к Cisco.',
    description: `VRRP (Virtual Router Redundancy Protocol, IP Protocol 112) — открытый стандарт создания единого отказоустойчивого виртуального шлюза (VIP) из двух и более маршрутизаторов или серверов балансировки (в отличие от проприетарного Cisco HSRP). Один узел выступает Master и отвечает на ARP-запросы для VIP виртуальным MAC-адресом (00:00:5e:00:01:XX), регулярно рассылая мультикаст-объявления (224.0.0.18). При отказе Master узел Backup перехватывает VIP за 1–3 секунды.

CARP (Common Address Redundancy Protocol) — криптографически защищенный аналог VRRP, созданный в OpenBSD/FreeBSD (поддерживает одновременную балансировку нагрузки).`,
    practicalUsage: 'Отказоустойчивые пары балансировщиков Nginx/HAProxy на Linux (демон Keepalived), резервирование корпоративных шлюзов на MikroTik, pfSense/OPNsense и Juniper.',
    commandsOrConfig: `# Пример конфигурации /etc/keepalived/keepalived.conf (VRRP)
vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 150
    advert_int 1
    virtual_ipaddress {
        10.10.10.1/24
    }
}`,
    level: 'Middle',
    tags: ['Протоколы', 'VRRP', 'CARP', 'Keepalived', 'VIP', 'High Availability'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-igmp-pim-multicast',
    section: 'Сети',
    category: 'Протоколы',
    title: 'IGMP и PIM: протоколы Multicast-маршрутизации',
    shortSummary: 'Групповая передача видеопотоков (IPTV), биржевых котировок и синхронизации кластеров без дублирования трафика.',
    description: `Multicast (диапазон IPv4 224.0.0.0/4) позволяет серверу отправлять ОДИН поток пакетов, который маршрутизаторы и коммутаторы размножают только в те ветки сети, где есть подписчики:
- IGMP (Internet Group Management Protocol, IP Protocol 2): работает между конечными хостами и ближайшим маршрутизатором — клиент шлет Join/Leave для подписки на мультикаст-группу. На L2 коммутаторах включают IGMP Snooping, чтобы мультикаст не заливал все порты как Broadcast.
- PIM (Protocol Independent Multicast, IP Protocol 103 — Sparse/Dense Mode): строит дерево доставки мультикаста между маршрутизаторами (через Rendezvous Point в PIM-SM).`,
    practicalUsage: 'Корпоративное IPTV, системы видеоконференцсвязи, массовое развертывание образов ОС (Clonezilla/FOG Multicast), кластерные протоколы.',
    commandsOrConfig: `# Проверка подписок мультикаст-групп в Linux
ip maddr show dev eth0
netstat -gn

# Проверка IGMP Snooping на коммутаторе Cisco
show ip igmp snooping groups`,
    level: 'Senior',
    tags: ['Протоколы', 'IGMP', 'PIM', 'Multicast', 'IGMP Snooping', 'IPTV'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== L4–L6: ТРАНСПОРТ, КРИПТОГРАФИЯ И ПРОКСИ ====================
  {
    id: 'kb-proto-dccp-rudp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'DCCP и Reliable UDP (ENet / KCP / RUDP): специализированный транспорт',
    shortSummary: 'Протокол контроля перегрузок без гарантированной доставки (IP 33) и сверхбыстрые игровые/стриминговые транспорты.',
    description: `Помимо классической тройки TCP/UDP/SCTP, для задач реального времени созданы альтернативные транспортные протоколы:
- DCCP (Datagram Congestion Control Protocol, IP Protocol 33, RFC 4340): в отличие от UDP устанавливает соединение и контролирует перегрузки сети (TFRC/CCID), но НЕ переотправляет потерянные пакеты. Идеально подходит для потокового аудио/видео, где устаревший кадр бесполезен.
- Reliable UDP (RUDP, ENet, KCP): надстройки поверх UDP, добавляющие выборочную надежность (часть пакетов с гарантией доставки, часть без — для координат игроков в MMORPG или телеметрии).`,
    practicalUsage: 'Сетевые движки онлайн-игр (Unreal/Unity/MMORPG серверы), стриминг реального времени и кастомные VPN-акселераторы с агрессивным контролем задержек.',
    commandsOrConfig: `# Проверка загруженных транспортных модулей и протоколов ядра Linux
cat /proc/protocols
ss -A dccp -a 2>/dev/null || true`,
    level: 'Senior',
    tags: ['Протоколы', 'DCCP', 'RUDP', 'KCP', 'Транспортный уровень', 'Игровые сети'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-tls-dtls',
    section: 'Сети',
    category: 'Протоколы',
    title: 'TLS 1.2 / TLS 1.3 и DTLS: криптографическая защита транспорта',
    shortSummary: 'Асимметричное рукопожатие, сертификаты X.509, шифрование AES-GCM/ChaCha20, mTLS, SNI/ALPN и защита UDP (DTLS).',
    description: `TLS (Transport Layer Security — преемник устаревшего SSL) обеспечивает конфиденциальность, целостность и подлинность данных между клиентом и сервером. В TLS 1.3 (RFC 8446) рукопожатие сокращено до 1-RTT (или 0-RTT), удалены небезопасные алгоритмы (RC4, SHA-1, статический RSA без PFS), а все данные сертификата зашифрованы.

Ключевые расширения: SNI (Server Name Indication — позволяет хостить десятки HTTPS-сайтов на одном IP), ALPN (согласование h2/http1.1 до первого HTTP-запроса) и mTLS (взаимная аутентификация клиента по сертификату). DTLS (RFC 9147) переносит механизмы TLS на ненадежные датаграммы UDP (используется в WebRTC, VPN AnyConnect/OpenConnect и CoAP).`,
    practicalUsage: 'HTTPS, защита почты (SMTPS/IMAPS), mTLS между микросервисами (Istio/Linkerd), корпоративный PKI / Let’s Encrypt (ACME).',
    commandsOrConfig: `# Полная инспекция TLS-рукопожатия, цепочки сертификатов и протокола (TLS 1.3)
openssl s_client -connect example.com:443 -servername example.com -tls1_3

# Проверка даты окончания сертификата через openssl
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates -subject`,
    level: 'Middle',
    tags: ['Протоколы', 'TLS 1.3', 'DTLS', 'SSL', 'mTLS', 'SNI', 'X.509'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-socks5-proxy',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SOCKS5 и HTTP CONNECT: сеансовые прокси-протоколы',
    shortSummary: 'Универсальная ретрансляция произвольного TCP/UDP трафика (RFC 1928) через промежуточный бастион или прокси-узел.',
    description: `В отличие от обычных HTTP-прокси (работающих только на L7 с HTTP-запросами), протокол SOCKS5 (RFC 1928, стандартный порт 1080) работает на сеансовом уровне (L5) и прозрачно передает любые TCP- и UDP-пакеты (SSH, базы данных, игры, DNS, торренты), поддерживая IPv6 и аутентификацию логин/пароль.

Для проксирования HTTPS через стандартный HTTP-прокси (порт 3128 в Squid) используется метод HTTP CONNECT — прокси открывает сырой TCP-туннель до целевого порта 443, не расшифровывая TLS.`,
    practicalUsage: 'Доступ во внутреннюю корпоративную сеть через SSH Dynamic Port Forwarding (ssh -D 1080), настройка корпоративного Squid-прокси и изоляция серверов без прямого интернета.',
    commandsOrConfig: `# Поднятие локального SOCKS5 прокси через SSH-бастион
ssh -N -D 127.0.0.1:1080 admin@bastion.company.ru

# Проверка работы HTTP/HTTPS сайта через SOCKS5 (включая удаленный DNS)
curl --socks5-hostname 127.0.0.1:1080 https://internal-panel.corp.local`,
    level: 'Junior',
    tags: ['Протоколы', 'SOCKS5', 'HTTP CONNECT', 'Proxy', 'Squid', 'SSH'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== L7: WEB, API И ВЕБ-ПРОТОКОЛЫ ====================
  {
    id: 'kb-proto-http1-http2',
    section: 'Сети',
    category: 'Протоколы',
    title: 'HTTP/1.1 и HTTP/2: методы, статусы, заголовки и мультиплексирование',
    shortSummary: 'Основа современного веба (RFC 9110–9113): от текстовых запросов с Keep-Alive до бинарных потоков HTTP/2.',
    description: `HTTP — протокол запроса-ответа прикладного уровня. Ключевые методы: GET (чтение), POST (создание/отправка), PUT/PATCH (обновление), DELETE, HEAD (только заголовки), OPTIONS (CORS preflight). Коды ответов делятся на 2xx (Успех), 3xx (Редиректы 301/302), 4xx (Ошибки клиента: 400, 401, 403, 404, 429) и 5xx (Ошибки сервера/бэкенда: 500, 502 Bad Gateway, 503, 504 Timeout).

HTTP/1.1 текстовый и страдает от ограничения 1 запрос в 1 соединении одновременно (до 6 параллельных TCP-сокетов на домен). HTTP/2 перешел на бинарный фрейминг, сжатие заголовков (HPACK) и мультиплексирование десятков параллельных запросов внутри ОДНОГО TCP-соединения.`,
    practicalUsage: 'Диагностика веб-сервисов и балансировщиков (502/504 ошибки в Nginx), оптимизация загрузки сайтов, настройка кэширования (Cache-Control, ETag) и CORS.',
    commandsOrConfig: `# Проверка версии HTTP/2 и заголовков ответа сервера
curl -I --http2 https://example.com

# Отправка POST JSON-запроса для отладки REST API
curl -X POST https://api.example.com/v1/login \\
  -H "Content-Type: application/json" \\
  -d '{"user":"admin"}'`,
    level: 'Junior',
    tags: ['Протоколы', 'HTTP', 'HTTP/2', 'REST API', 'Nginx', 'L7'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-websocket',
    section: 'Сети',
    category: 'Протоколы',
    title: 'WebSocket (WS / WSS, RFC 6455): полнодуплексная связь в вебе',
    shortSummary: 'Постоянное двунаправленное TCP-соединение с минимальными задержками для чатов, бирж, уведомлений и онлайн-панелей.',
    description: `В обычном HTTP инициатором всегда выступает клиент — чтобы получать обновления от сервера, раньше приходилось делать частый опрос (Polling). WebSocket начинается как обычный HTTP-запрос с заголовками Upgrade: websocket и Connection: Upgrade (ответ 101 Switching Protocols), после чего соединение переключается в постоянный двунаправленный бинарный/текстовый канал (WS поверх 80, WSS поверх TLS/443).

При проксировании через Nginx обязательно явно передавать заголовки Upgrade и Connection, иначе WebSocket будет обрываться с ошибкой.`,
    practicalUsage: 'Онлайн-чаты, терминалы в браузере (ttyd, Proxmox noVNC), стриминг котировок, телеметрия мониторинга в реальном времени и браузерные игры.',
    commandsOrConfig: `# Обязательные директивы Nginx для проксирования WebSocket
location /ws/ {
    proxy_pass http://backend_ws;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 3600s;
}`,
    level: 'Middle',
    tags: ['Протоколы', 'WebSocket', 'WSS', 'RFC 6455', 'Nginx', 'Real-Time'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-grpc-protobuf',
    section: 'Сети',
    category: 'Протоколы',
    title: 'gRPC и Protocol Buffers: высокопроизводительный RPC поверх HTTP/2',
    shortSummary: 'Бинарный протокол межсервисного взаимодействия со строгими контрактами .proto и двунаправленным стримингом.',
    description: `gRPC — современный открытый RPC-фреймворк, работающий поверх HTTP/2 (или HTTP/3). Вместо тяжеловесного текстового JSON данные сериализуются в компактный бинарный формат Protocol Buffers (Protobuf) на основе строгой схемы (.proto файлов), что уменьшает объем трафика в 3–10 раз и ускоряет парсинг.

Поддерживает 4 режима работы: Unary (запрос-ответ), Server Streaming, Client Streaming и Bidirectional Streaming. При балансировке L4 (обычный TCP) все вызовы gRPC залипают на одном бэкенде из-за долгоживущего HTTP/2 соединения — поэтому для gRPC требуется L7-балансировщик (Envoy, Nginx grpc_pass, HAProxy h2).`,
    practicalUsage: 'Внутреннее общение микросервисов в Kubernetes, API Kubernetes CRI/CSI, высоконагруженные сервисы телеметрии и финтеха.',
    commandsOrConfig: `# Проксирование gRPC через Nginx (директива grpc_pass)
server {
    listen 443 ssl http2;
    location / {
        grpc_pass grpcs://grpc_backends;
    }
}

# Тестирование gRPC-сервиса из консоли утилитой grpcurl
grpcurl -plaintext localhost:50051 list`,
    level: 'Middle',
    tags: ['Протоколы', 'gRPC', 'Protobuf', 'HTTP/2', 'Микросервисы', 'RPC'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== УДАЛЁННЫЙ ДОСТУП И УПРАВЛЕНИЕ ====================
  {
    id: 'kb-proto-ssh-sftp-scp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SSH (Secure Shell v2), SFTP и SCP: защищённый доступ и туннели',
    shortSummary: 'Криптографический протокол удаленной консоли (TCP/22), ключи Ed25519, проброс портов (-L/-R/-J) и передача файлов.',
    description: `SSHv2 (RFC 4251–4254, стандартный порт TCP/22) полностью заменил открытый Telnet, обеспечивая шифрование трафика, аутентификацию сервера (отпечаток ключа хоста в known_hosts) и клиента (предпочтительно ключи Ed25519 с отключением входа по паролю).

Поверх одного SSH-канала работают подсистемы передачи файлов SFTP (интерактивный защищенный файловый протокол) и SCP, а также мощный механизм проброса портов: Local Forwarding (-L — доступ к закрытому порту БД на удаленном сервере), Remote Forwarding (-R) и ProxyJump (-J — прозрачный прыжок через бастион).`,
    practicalUsage: 'Ежедневное управление Linux/FreeBSD серверами и сетевым оборудованием, автоматизация Ansible, безопасный бэкап (rsync over SSH) и туннели к БД.',
    commandsOrConfig: `# Генерация современного ключа Ed25519 и копирование на сервер
ssh-keygen -t ed25519 -C "admin@corp"
ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@10.0.10.5

# Проброс удаленного PostgreSQL (5432) на локальный порт 15432 через бастион
ssh -J jump@bastion.ru -L 15432:127.0.0.1:5432 dbadmin@10.0.10.20 -N`,
    level: 'Junior',
    tags: ['Протоколы', 'SSH', 'SFTP', 'SCP', 'Ed25519', 'Туннели', 'OpenSSH'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-rdp-vnc-spice',
    section: 'Сети',
    category: 'Протоколы',
    title: 'RDP, VNC (RFB) и SPICE: протоколы удалённого рабочего стола',
    shortSummary: 'Передача графического рабочего стола, буфера обмена, USB и звука (TCP/UDP 3389, RFB/5900, KVM SPICE).',
    description: `- RDP (Remote Desktop Protocol, Microsoft, порт TCP/UDP 3389): работает на уровне графических примитивов (GDI/DirectX/RemoteFX/AVC444), поддерживая проброс принтеров, смарт-карт, папок и аутентификацию NLA (Network Level Authentication — проверка пароля до создания графической сессии). Использование UDP 3389 резко повышает плавность при высоком RTT.
- VNC (протокол RFB — Remote Framebuffer, порт 5900+N): передает растровые области экрана (независим от ОС, используется в BIOS/KVM консолях гипервизоров noVNC). Сам по себе трафик RFB не шифруется — требует SSH-туннеля.
- SPICE: оптимизированный протокол для виртуальных машин QEMU/KVM/Proxmox с поддержкой аудио и проброса USB.`,
    practicalUsage: 'Терминальные серверы 1С (Windows RDS), удаленное подключение к офисным ПК через RD Gateway/VPN, аварийная консоль VNC/SPICE в Proxmox и VMware.',
    commandsOrConfig: `# Подключение к Windows/RDS из Linux с NLA и пробросом папки
xfreerdp /v:10.0.10.50:3389 /u:admin /d:CORP +clipboard /drive:share,/tmp/share /dynamic-resolution

# Безопасное подключение к VNC через SSH-туннель
ssh -L 5901:127.0.0.1:5901 user@kvm-host -N`,
    level: 'Junior',
    tags: ['Протоколы', 'RDP', 'VNC', 'RFB', 'SPICE', 'NLA', 'Удаленный доступ'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-telnet-serial',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Telnet и Serial (RS-232 / IPMI SOL): консольное и legacy-управление',
    shortSummary: 'Открытый текстовый протокол (TCP/23) для отладки, а также асинхронный последовательный интерфейс консолей серверов.',
    description: `Telnet (RFC 854, порт TCP/23) — исторический протокол удаленного терминала, передающий весь ввод (включая пароли!) в открытом незашифрованном виде. Для администрирования серверов и свитчей в продакшене его использование категорически запрещено (заменен на SSH). Тем не менее понимание работы Telnet важно для диагностики текстовых TCP-протоколов и поддержки старого промышленного оборудования.

Serial (RS-232 / UART, 9600 или 115200 baud 8N1) и его сетевой вариант IPMI Serial-over-LAN (SOL) — главный способ восстановить мертвый коммутатор, маршрутизатор или ядро Linux при потере сети.`,
    practicalUsage: 'Первичная настройка нового коммутатора Cisco/MikroTik через консольный кабель (RJ45-USB), подключение к Linux Serial Console на VPS и IPMI SOL.',
    commandsOrConfig: `# Подключение к консольному порту маршрутизатора через USB-Serial адаптер
sudo screen /dev/ttyUSB0 9600
# Или с помощью picocom (115200 бод)
sudo picocom -b 115200 /dev/ttyUSB0

# Удаленная консоль сервера через IPMI Serial-Over-LAN
ipmitool -I lanplus -H 10.0.99.10 -U ADMIN -P pass sol activate`,
    level: 'Junior',
    tags: ['Протоколы', 'Telnet', 'RS-232', 'Serial', 'IPMI SOL', 'Консоль'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== ФАЙЛОВЫЕ И БЛОЧНЫЕ ХРАНИЛИЩА ====================
  {
    id: 'kb-proto-smb-cifs',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SMB / CIFS (Server Message Block v2/v3): общие папки и доменный доступ',
    shortSummary: 'Сетевая файловая система Windows и Samba (TCP/445), шифрование SMB 3.1.1, Kerberos и защита от атак на SMBv1.',
    description: `SMB (Server Message Block, порт TCP/445; устаревший NetBIOS over TCP 137–139) — основной протокол общего доступа к файлам, принтерам и именованным каналам в корпоративных сетях Windows и Linux (Samba).

Ключевые вехи:
- SMBv1 (CIFS) устарел и критически уязвим (эксплойт EternalBlue / WannaCry) — обязан быть отключен на всех хостах!
- SMB 2.x/3.x резко сократили число команд, добавили поддержку больших буферов, сквозное шифрование (AES-128-GCM / AES-256 в SMB 3.1.1), SMB Direct (RDMA) и SMB Multichannel (агрегация нескольких сетевых карт без LACP).`,
    practicalUsage: 'Корпоративные файловые серверы (Windows File Server / Samba в AD), общие сетевые папки 1С, бэкапы на NAS (Synology/TrueNAS).',
    commandsOrConfig: `# Проверка подключений и версий SMB в PowerShell (Windows Server)
Get-SmbConnection
Get-SmbServerConfiguration | Select EnableSMB1Protocol, EncryptData

# Монтирование SMB3-шары в Linux (cifs-utils)
sudo mount -t cifs //fs01.corp.local/shared /mnt/shared -o credentials=/etc/smb.cred,vers=3.1.1`,
    level: 'Junior',
    tags: ['Протоколы', 'SMB', 'CIFS', 'Samba', 'Windows', 'Файловый сервер'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-nfs',
    section: 'Сети',
    category: 'Протоколы',
    title: 'NFS (Network File System v3 / v4.1 / v4.2): сетевые тома Unix/Linux',
    shortSummary: 'Высокопроизводительный протокол файлового доступа POSIX (TCP/2049) для серверов Linux, Kubernetes PV и гипервизоров.',
    description: `NFS (Network File System) позволяет монтировать удаленные каталоги СХД как локальные файловые системы Linux/FreeBSD с сохранением POSIX-прав доступа.
- NFSv3 требовал целого набора дополнительных демонов и динамических портов (rpcbind/portmapper 111, mountd, statd, lockd), что затрудняло прохождение через фаерволы.
- NFSv4 / v4.1 / v4.2 объединил всё в ОДИН порт TCP/2049 (легко фильтруется), добавил встроенные блокировки файлов, поддержку Kerberos-аутентификации (krb5p), а в NFSv4.1 — pNFS (параллельный доступ) и восстановление сессий (Session Trunking).`,
    practicalUsage: 'Общие хранилища для кластеров Proxmox/ESXi, распределенные Persistent Volumes в Kubernetes, расшаривание статики/медиа между несколькими веб-серверами.',
    commandsOrConfig: `# Просмотр доступных экспортов на NFS-сервере и локальных шаров
showmount -e 10.0.20.10
exportfs -v

# Монтирование NFSv4.1 с оптимальными таймаутами (nconnect=4 для многопоточности)
sudo mount -t nfs -o vers=4.1,nconnect=4,noatime 10.0.20.10:/exports/data /mnt/nfs`,
    level: 'Middle',
    tags: ['Протоколы', 'NFS', 'NFSv4', 'Linux', 'Storage', 'Proxmox'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-ftp-ftps-tftp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'FTP, FTPS и TFTP: режимы Active/Passive и тривиальная загрузка',
    shortSummary: 'Классические протоколы передачи файлов (TCP 20/21), прохождение NAT в Passive-режиме и TFTP (UDP/69) для PXE.',
    description: `FTP (RFC 959) использует два раздельных TCP-соединения: управляющее (порт 21) и канал данных. В Active-режиме сервер сам пытается подключиться с порта 20 на случайный порт клиента — что блокируется клиентским NAT/фаерволом. Поэтому в современных сетях используют Passive Mode (PASV), где клиент открывает оба соединения на выделенный диапазон портов сервера. Обычный FTP передает пароли в открытом виде (в отличие от FTPS поверх TLS или SFTP поверх SSH).

TFTP (Trivial FTP, UDP/69) — предельно упрощенный протокол без аутентификации и списка директорий: умещается в загрузчике сетевой карты для скачивания ядра при PXE-загрузке и прошивке свитчей/IP-телефонов.`,
    practicalUsage: 'Настройка PXE-сервера установки ОС (TFTP), прием отчетов от старых сканеров/оборудования, безопасная настройка vsftpd/ProFTPD в пассивном режиме с TLS.',
    commandsOrConfig: `# Проверка TFTP-загрузки файла с локального сервера
tftp 10.0.10.5 -c get pxelinux.0

# Проверка FTPS-соединения с явным TLS через curl
curl --ssl-reqd ftp://files.example.com/archive.tar.gz --user user:pass -o archive.tar.gz`,
    level: 'Junior',
    tags: ['Протоколы', 'FTP', 'FTPS', 'TFTP', 'PXE', 'Passive Mode'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-iscsi-fc-nvmeof',
    section: 'Сети',
    category: 'Протоколы',
    title: 'iSCSI, Fibre Channel и NVMe-oF: протоколы блочных сетей хранения (SAN)',
    shortSummary: 'Подключение удаленных дисков СХД на уровне блоков (SCSI/NVMe) по IP (TCP/3260) или оптической фабрике FC.',
    description: `В отличие от файловых протоколов (SMB/NFS), протоколы SAN предоставляют серверу «сырой» блочный диск (LUN), на котором уже сам сервер создает файловую систему (ext4, XFS, NTFS, VMFS):
- iSCSI (RFC 7143, порт TCP/3260): инкапсулирует команды SCSI в обычные TCP/IP пакеты. Дешевле Fibre Channel, требует выделенного VLAN, Jumbo Frames и Multipath I/O (MPIO) для отказоустойчивости.
- Fibre Channel (FC): выделенная оптическая сеть (8G/16G/32G/64G FC) со сверхнизкой задержкой без потерь кадров (Buffer-to-Buffer credits) и WWN-адресацией.
- NVMe-oF (NVMe over Fabrics: TCP / RDMA / FC): замена устаревшего стека SCSI, раскрывающая миллионы IOPS современных NVMe SSD по сети.`,
    practicalUsage: 'Подключение кластеров гипервизоров (Hyper-V, VMware, Proxmox) и серверов БД к отказоустойчивым дисковым массивам СХД.',
    commandsOrConfig: `# Обнаружение и подключение iSCSI Target в Linux (open-iscsi)
sudo iscsiadm -m discovery -t sendtargets -p 10.0.50.10
sudo iscsiadm -m node --login

# Проверка отказоустойчивых путей Multipath (MPIO)
sudo multipath -ll`,
    level: 'Senior',
    tags: ['Протоколы', 'iSCSI', 'Fibre Channel', 'NVMe-oF', 'SAN', 'MPIO', 'СХД'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-webdav-s3',
    section: 'Сети',
    category: 'Протоколы',
    title: 'WebDAV и S3 API: файловый и объектный доступ поверх HTTP/HTTPS',
    shortSummary: 'Расширение HTTP для совместного редактирования документов (PROPFIND/LOCK) и стандарт объектных хранилищ (AWS S3/MinIO).',
    description: `WebDAV (RFC 4918) расширяет HTTP дополнительными методами (PROPFIND, MKCOL, COPY, MOVE, LOCK), позволяя монтировать удаленные папки прямо поверх стандартных веб-портов 80/443 (используется в Nextcloud, SharePoint и CalDAV/CardDAV для календарей и контактов).

S3 Protocol (REST API, популяризированный Amazon S3 и открытыми серверами MinIO / Ceph RGW) стал де-факто стандартом объектного хранения: файлы хранятся в плоских бакетах (Buckets) по ключу с метаданными, поддержкой версионирования, блокировки от удаления (Object Lock / WORM против шифровальщиков) и подписанных временных ссылок (Presigned URL).`,
    practicalUsage: 'Хранение бэкапов БД (pgBackRest/Restic/Velero в S3), медиа-контента веб-сервисов и корпоративных облачных дисков Nextcloud.',
    commandsOrConfig: `# Работа с S3-совместимым хранилищем (MinIO / AWS S3) через rclone или aws-cli
aws --endpoint-url https://s3.internal.local s3 ls s3://backups/
aws --endpoint-url https://s3.internal.local s3 cp db.dump s3://backups/2026-11-15/`,
    level: 'Middle',
    tags: ['Протоколы', 'S3 API', 'WebDAV', 'MinIO', 'Object Storage', 'HTTP'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== ЭЛЕКТРОННАЯ ПОЧТА ====================
  {
    id: 'kb-proto-smtp-submission',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SMTP, SMTPS и Submission (25, 465, 587): отправка и маршрутизация почты',
    shortSummary: 'Межсерверная пересылка писем (MTA), клиентская отправка с авторизацией и защита от спама SPF/DKIM/DMARC.',
    description: `SMTP (RFC 5321) — протокол передачи исходящей и транзитной электронной почты. Принципиально важно различать порты:
- TCP/25 (SMTP): используется ТОЛЬКО для обмена между почтовыми серверами (MTA-to-MTA по MX-записям). Обычно на сервере здесь нет авторизации, а провайдеры часто блокируют исходящий 25-й порт для защиты от ботнетов.
- TCP/587 (Submission + STARTTLS) и TCP/465 (SMTPS implicit TLS): порты для отправки писем почтовыми клиентами и приложениями (MUA-to-MSA) с обязательной аутентификацией.

Для защиты от подделки отправителя используются механизмы DNS поверх SMTP: SPF (белый список IP отправителей), DKIM (криптографическая подпись письма в заголовке) и DMARC (политика обработки при провале SPF/DKIM).`,
    practicalUsage: 'Развертывание почтовых серверов (Postfix, Exim, Exchange), настройка SMTP-релеев для уведомлений от Zabbix/Grafana/1С, устранение попадания писем в Спам.',
    commandsOrConfig: `# Проверка доступности SMTP-сервера и поддержки STARTTLS из консоли
openssl s_client -starttls smtp -connect mail.example.com:587 -crlf

# Проверка SPF и DMARC записей домена
dig +short TXT example.com | grep spf
dig +short TXT _dmarc.example.com`,
    level: 'Middle',
    tags: ['Протоколы', 'SMTP', 'STARTTLS', 'SPF', 'DKIM', 'DMARC', 'Почта'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-imap-pop3',
    section: 'Сети',
    category: 'Протоколы',
    title: 'IMAP и POP3 (IMAPS/993, POP3S/995): протоколы получения почты',
    shortSummary: 'Синхронизация ящика и папок на нескольких устройствах (IMAP) против простого скачивания писем с сервера (POP3).',
    description: `- IMAP4 (RFC 9051, порт 143 STARTTLS / 993 IMAPS): хранит письма и дерево папок на сервере (Dovecot, Exchange), синхронизируя статусы («Прочитано», «Удалено») между телефоном, ноутбуком и веб-интерфейсом. Позволяет загружать только заголовки, не скачивая тяжелые вложения сразу.
- POP3 (RFC 1939, порт 110 STARTTLS / 995 POP3S): устаревающий протокол для доступа с одного устройства. Клиент скачивает все новые письма из папки «Входящие» локально (в .pst файл) и по умолчанию удаляет их с сервера (оптимально при жесткой экономии места на почтовом сервере).`,
    practicalUsage: 'Настройка почтовых клиентов Thunderbird/Outlook (Dovecot/Postfix), миграция почтовых ящиков (imapsync) без потери структуры папок.',
    commandsOrConfig: `# Диагностика защищенного подключения к IMAP и проверка логина
openssl s_client -connect mail.example.com:993 -quiet
# После подключения:
# a1 LOGIN user@example.com Password
# a2 LIST "" "*"`,
    level: 'Junior',
    tags: ['Протоколы', 'IMAP', 'IMAPS', 'POP3', 'Dovecot', 'Почта'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== МОНИТОРИНГ И ТЕЛЕМЕТРИЯ ====================
  {
    id: 'kb-proto-snmp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SNMP v1/v2c/v3 (UDP 161/162): мониторинг сетевого оборудования',
    shortSummary: 'Опрос счетчиков интерфейсов, CPU и температуры свитчей/роутеров по OID/MIB и прием асинхронных SNMP Traps.',
    description: `SNMP (Simple Network Management Protocol) — стандарт мониторинга коммутаторов, маршрутизаторов, ИБП (UPS), принтеров и серверов (Zabbix, LibreNMS, Prometheus snmp_exporter). Агент на устройстве слушает UDP/161 и отдает метрики по древовидным числовым идентификаторам OID, описанным в словарях MIB (например, загрузка портов из IF-MIB).

Также поддерживаются асинхронные уведомления от устройства к серверу мониторинга — SNMP Traps (UDP/162), например при падении линка или перегреве. Версии v1/v2c передают «пароль» (Community String: public/private) в открытом виде; в продакшене рекомендуется SNMPv3 с аутентификацией SHA-256 и шифрованием AES-128 (authPriv).`,
    practicalUsage: 'Снятие графиков загрузки портов коммутаторов Cisco/MikroTik, контроль заряда батарей ИБП APC и уровня тонера сетевых МФУ.',
    commandsOrConfig: `# Опрос системного описания и интерфейсов через SNMPv2c
snmpwalk -v2c -c MySecretRO 10.0.0.1 1.3.6.1.2.1.1

# Безопасный опрос по SNMPv3 (authPriv: SHA + AES)
snmpget -v3 -u monitor_user -l authPriv -a SHA -A AuthPass123 -x AES -X PrivPass123 10.0.0.1 sysUpTime.0`,
    level: 'Middle',
    tags: ['Протоколы', 'SNMP', 'SNMPv3', 'MIB', 'OID', 'Zabbix', 'Мониторинг'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-syslog-netflow-sflow',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Syslog (RFC 5424), NetFlow / IPFIX и sFlow: логи и телеметрия трафика',
    shortSummary: 'Централизованный сбор системных журналов (порт 514) и аналитика «кто с кем и сколько качает» в корпоративной сети.',
    description: `- Syslog (RFC 3164/5424, UDP/514 или надежный TCP+TLS/6514): стандарт отправки событий с серверов, фаерволов и коммутаторов на центральный коллектор (rsyslog, Graylog, Loki, SIEM). Каждое сообщение имеет Facility (источник: kern, auth, daemon) и Severity (0 Emergency — 7 Debug).
- NetFlow / IPFIX (RFC 7011, обычно UDP 2055/4739): роутер группирует пакеты в потоки (Flows: src/dst IP, порты, байты) и шлет метаданные на коллектор (ElastiFlow, nfdump) для выявления аномалий и DDoS без записи всего трафика.
- sFlow (UDP/6343): легкое статистическое семплирование каждого N-го заголовка пакета на высокоскоростных L2/L3 коммутаторах (10G–400G).`,
    practicalUsage: 'Расследование инцидентов ИБ (кто забил канал на 100%, с каких IP шли попытки входа), хранение логов по требованиям аудита и комплаенса.',
    commandsOrConfig: `# Отправка тестового Syslog-сообщения с Linux-сервера
logger -p authpriv.warning -t audit_test "Manual security alert check"

# Захват и просмотр входящих NetFlow потоков утилитой nfdump
nfdump -R /var/cache/nfdump -s ip/bytes -n 15`,
    level: 'Middle',
    tags: ['Протоколы', 'Syslog', 'NetFlow', 'IPFIX', 'sFlow', 'Телеметрия', 'SIEM'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== АУТЕНТИФИКАЦИЯ, КАТАЛОГИ И SSO ====================
  {
    id: 'kb-proto-radius-tacacs',
    section: 'Сети',
    category: 'Протоколы',
    title: 'RADIUS и TACACS+: протоколы централизованного доступа (AAA)',
    shortSummary: 'Разделение Authentication, Authorization и Accounting для входа на сетевое оборудование, VPN и Wi-Fi.',
    description: `Оба протокола реализуют концепцию AAA (Аутентификация, Авторизация, Аккаунтинг), чтобы не заводить локальные пароли на каждом коммутаторе:
- RADIUS (RFC 2865, UDP 1812 Auth / 1813 Acct): объединяет аутентификацию и авторизацию в одном пакете Access-Request/Accept, шифрует ТОЛЬКО пароль (остальное открыто). Отраслевой стандарт для доступа конечных пользователей: Wi-Fi (802.1X), PPPoE и VPN.
- TACACS+ (RFC 8907, TCP/49): полностью разделяет A-A-A и шифрует ВЕСЬ пакет (кроме заголовка). Позволяет контролировать каждую конкретную CLI-команду администратора на роутере (Command Authorization) и вести подробный журнал введенных команд.`,
    practicalUsage: 'TACACS+ (tac_plus / Cisco ISE) — для единого входа инженеров на сетевое оборудование с интеграцией AD; RADIUS (FreeRADIUS / NPS) — для Wi-Fi и VPN.',
    commandsOrConfig: `! Настройка AAA через TACACS+ на Cisco IOS с резервным локальным входом
aaa new-model
tacacs server ISE-01
 address ipv4 10.0.0.50
 key StrongTacacsSecret
aaa authentication login default group tacacs+ local
aaa accounting commands 15 default start-stop group tacacs+`,
    level: 'Middle',
    tags: ['Протоколы', 'RADIUS', 'TACACS+', 'AAA', 'FreeRADIUS', 'Cisco ISE'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-ldap-ldaps',
    section: 'Сети',
    category: 'Протоколы',
    title: 'LDAP и LDAPS (RFC 4511): протокол доступа к службам каталогов',
    shortSummary: 'Иерархические запросы к Active Directory / OpenLDAP / FreeIPA, структура DN/CN/OU и защита через LDAPS (636).',
    description: `LDAP (Lightweight Directory Access Protocol) — стандартный протокол чтения и изменения древовидных справочников организаций (пользователи, группы, компьютеры, контакты). Объекты адресуются уникальным именем DN (Distinguished Name), например: cn=Ivanov,ou=Admins,dc=corp,dc=local.

Базовый порт LDAP TCP/389 передает запросы и пароли при Simple Bind в открытом виде (если не используется StartTLS), поэтому в продакшене для интеграции сторонних сервисов (GitLab, Grafana, 1С, VPN) обязательно используют шифрованный LDAPS (TCP/636 поверх TLS).`,
    practicalUsage: 'Единая база учетных записей (SSO на базе OpenLDAP / FreeIPA / Active Directory), синхронизация адресных книг и авторизация сервисов.',
    commandsOrConfig: `# Проверка поиска пользователя в Active Directory / OpenLDAP через ldapsearch
ldapsearch -x -H ldaps://dc01.corp.local:636 \\
  -D "cn=svc_ldap,ou=Services,dc=corp,dc=local" -W \\
  -b "dc=corp,dc=local" "(sAMAccountName=ivanov)" memberOf mail`,
    level: 'Middle',
    tags: ['Протоколы', 'LDAP', 'LDAPS', 'Active Directory', 'OpenLDAP', 'FreeIPA'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-oauth2-oidc-saml',
    section: 'Сети',
    category: 'Протоколы',
    title: 'OAuth 2.0, OpenID Connect (OIDC) и SAML 2.0: протоколы SSO',
    shortSummary: 'Современная федеративная аутентификация (Single Sign-On) для веб-порталов, облаков и корпоративных IdP (Keycloak/ADFS).',
    description: `- OAuth 2.0 (RFC 6749): протокол ДЕЛЕГИРОВАНИЯ АВТОРИЗАЦИИ — позволяет приложению получить ограниченный Access Token к API от имени пользователя без передачи пароля (Grant Types: Authorization Code + PKCE, Client Credentials).
- OpenID Connect (OIDC): слой АУТЕНТИФИКАЦИИ поверх OAuth 2.0, добавляющий подписанный ID Token в формате JWT (JSON Web Token) с данными профиля пользователя. Стандарт для современных приложений, Kubernetes и мобильных клиентов.
- SAML 2.0 (Security Assertion Markup Language): корпоративный XML-стандарт SSO с криптографическими утверждениями (Assertions) между Identity Provider (Keycloak, Okta, AD FS) и Service Provider (Jira, AWS, 1С:Документооборот).`,
    practicalUsage: 'Единый вход (SSO) сотрудников во все корпоративные сервисы через Keycloak / Entra ID, защита REST API через JWT Bearer-токены.',
    commandsOrConfig: `# Декодирование полезной нагрузки JWT-токена (Header.Payload.Signature) в Bash
echo "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJzcmUifQ.sig" | cut -d. -f2 | base64 -d 2>/dev/null

# Получение OpenID Connect discovery-конфигурации IdP (Keycloak)
curl -s https://sso.example.com/realms/corp/.well-known/openid-configuration | jq .`,
    level: 'Middle',
    tags: ['Протоколы', 'OAuth 2.0', 'OIDC', 'SAML 2.0', 'JWT', 'SSO', 'Keycloak'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== IOT, ОЧЕРЕДИ СООБЩЕНИЙ, VOIP И SCADA ====================
  {
    id: 'kb-proto-mqtt-amqp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'MQTT и AMQP: протоколы очередей сообщений и Pub/Sub для IoT и бэкенда',
    shortSummary: 'Сверхлегкий бинарный транспорт для датчиков (MQTT 1883/8883) и надежная маршрутизация задач в RabbitMQ (AMQP 5672).',
    description: `- MQTT (OASIS / ISO 20922, порты TCP 1883 / TLS 8883): предельно компактный протокол «Издатель–Подписчик» (минимальный заголовок всего 2 байта!), созданный для тысяч IoT-датчиков с плохим каналом. Поддерживает иерархические топики (sensors/floor1/temp), Last Will and Testament (сообщение при внезапном обрыве клиента) и 3 уровня доставки QoS (0 — не более 1 раза, 1 — хотя бы 1 раз, 2 — ровно 1 раз).
- AMQP 0-9-1 / 1.0 (TCP 5672 / TLS 5671): мощный протокол брокеров корпоративных сообщений (RabbitMQ) с Exchanges (Direct, Topic, Fanout), очередями, подтверждением ACK и гарантированной сохранностью задач.`,
    practicalUsage: 'Телеметрия умного дома / промышленных датчиков (Mosquitto, EMQX), асинхронная обработка фоновых задач и сглаживание пиковых нагрузок в микросервисах (RabbitMQ).',
    commandsOrConfig: `# Подписка и публикация тестового сообщения в MQTT-брокер (mosquitto-clients)
mosquitto_sub -h 10.0.10.30 -t "datacenter/+/temp" -v
mosquitto_pub -h 10.0.10.30 -t "datacenter/rack1/temp" -m "23.4" -q 1`,
    level: 'Middle',
    tags: ['Протоколы', 'MQTT', 'AMQP', 'RabbitMQ', 'IoT', 'Pub/Sub', 'Очереди'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-coap-iot',
    section: 'Сети',
    category: 'Протоколы',
    title: 'CoAP (Constrained Application Protocol, RFC 7252): REST поверх UDP для IoT',
    shortSummary: 'Аналог HTTP для микроконтроллеров с малым объемом RAM и батарейным питанием (UDP/5683, CoAPS/DTLS 5684).',
    description: `Обычный HTTP+TLS слишком тяжел для автономных датчиков на микроконтроллерах и сетей с низким энергопотреблением (LoRaWAN, NB-IoT, Zigbee IP / Thread). Протокол CoAP переносит привычную REST-архитектуру (методы GET, POST, PUT, DELETE, коды ответа 2.05 Content, 4.04 Not Found) в сверхкомпактный 4-байтный бинарный заголовок поверх UDP (порт 5683).

Надежность доставки обеспечивается опциональными Confirmable (CON) сообщениями с простым ACK, а безопасность — протоколом DTLS поверх UDP (порт 5684).`,
    practicalUsage: 'Умные счетчики ЖКХ, промышленные беспроводные сенсоры с батарейкой на 5–10 лет, управление устройствами умного дома стандарта Matter / Thread.',
    commandsOrConfig: `# Пример GET-запроса к IoT-устройству по CoAP через libcoap (coap-client)
coap-client -m get coap://[fe80::1]/sensors/temperature`,
    level: 'Senior',
    tags: ['Протоколы', 'CoAP', 'UDP', 'DTLS', 'IoT', 'REST'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-sip-rtp-webrtc',
    section: 'Сети',
    category: 'Протоколы',
    title: 'SIP, RTP/RTCP и WebRTC (ICE/STUN/TURN): протоколы VoIP и видеосвязи',
    shortSummary: 'Сигнализация звонков (5060/5061), передача голоса в реальном времени по UDP и преодоление NAT (ICE/STUN/TURN).',
    description: `В интернет-телефонии (Asterisk, FreeSWITCH) разделяют сигнализацию и медиапоток:
- SIP (Session Initiation Protocol, RFC 3261, UDP/TCP 5060 и SIPS TLS/5061): текстовый протокол (INVITE, ACK, BYE, REGISTER), похожий на HTTP, который устанавливает вызов и согласует кодеки (G.711, Opus) через тело SDP.
- RTP / SRTP (RFC 3550): передает сами оцифрованные пакеты голоса и видео поверх UDP (динамические четные порты, например 10000–20000), а RTCP собирает статистику потерь и джиттера (Jitter).
- WebRTC добавляет к этому автоматический проход сквозь корпоративные NAT с помощью ICE, STUN (узнать свой внешний IP/порт, UDP 3478) и TURN (ретрансляция трафика при симметричном NAT).`,
    practicalUsage: 'Настройка корпоративной IP-телефонии (Asterisk, FreePBX), диагностика "нет звука в одну сторону" (One-Way Audio из-за NAT/ALG), развертывание видеоконференций Jitsi / LiveKit.',
    commandsOrConfig: `# Фильтр Wireshark для разбора звонков VoIP (сигнализация + аудиопотоки)
sip || rtp

# Проверка доступности STUN/TURN сервера
stunclient stun.l.google.com 19302 2>/dev/null || nc -zuv turn.example.com 3478`,
    level: 'Middle',
    tags: ['Протоколы', 'SIP', 'RTP', 'WebRTC', 'STUN', 'TURN', 'VoIP', 'Asterisk'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-xmpp-matrix',
    section: 'Сети',
    category: 'Протоколы',
    title: 'XMPP (Jabber) и Matrix: открытые федеративные протоколы мессенджеров',
    shortSummary: 'Децентрализованный корпоративный обмен сообщениями со сквозным шифрованием (OMEMO / Olm) без vendor lock-in.',
    description: `- XMPP (RFC 6120, TCP/5222 клиент-сервер, 5269 сервер-сервер): проверенный временем XML-протокол федеративного обмена мгновенными сообщениями и статусами присутствия (используется на серверах Prosody/ejabberd, в корпоративных чатах и для управления IoT).
- Matrix: современный открытый децентрализованный протокол на базе JSON over HTTPS с синхронизацией истории комнат между независимыми домашними серверами (Synapse, Dendrite), поддержкой мостов в Telegram/Slack и E2EE-шифрованием Olm/Megolm.`,
    practicalUsage: 'Развертывание полностью автономного корпоративного мессенджера внутри закрытого контура компании (on-premise) с интеграцией в Active Directory.',
    commandsOrConfig: `# Проверка SRV-записей федерации XMPP и Matrix в DNS
dig _xmpp-client._tcp.example.com SRV +short
curl -s https://matrix.example.com/.well-known/matrix/server | jq .`,
    level: 'Middle',
    tags: ['Протоколы', 'XMPP', 'Jabber', 'Matrix', 'Мессенджеры', 'Федерация'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-scada-modbus-opcua',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Промышленные протоколы (АСУ ТП / SCADA): Modbus TCP, OPC UA и BACnet',
    shortSummary: 'Обмен данными с ПЛК, датчиками ЦОД, системами вентиляции/охлаждения и промышленной автоматикой (OT-сети).',
    description: `В инженерной инфраструктуре дата-центров (кондиционеры, ДГУ, ЧПУ, умные здания) и на производстве работают специализированные промышленные протоколы (OT):
- Modbus TCP (порт TCP/502): предельно простой открытый протокол чтения/записи регистров (Coils, Holding Registers) контроллеров ПЛК. Внимание: НЕ имеет встроенной аутентификации и шифрования — требует жесткой изоляции в отдельном VLAN!
- OPC UA (Open Platform Communications Unified Architecture, порт TCP/4840): современный безопасный стандарт АСУ ТП с объектной моделью данных, сертификатами X.509 и шифрованием.
- BACnet/IP (UDP/47808): стандарт автоматизации зданий (BMS — климат-контроль, СКУД, освещение).`,
    practicalUsage: 'Мониторинг климата и прецизионных кондиционеров в серверной/ЦОД (интеграция в Zabbix/Grafana через Modbus/OPC UA), сегментация IT и OT сетей по стандарту IEC 62443.',
    commandsOrConfig: `# Фильтры Wireshark для анализа промышленных OT-сетей
modbus || opcua || bacnet

# Чтение регистров Modbus TCP с контроллера из Python/CLI (mbpoll)
mbpoll -m tcp -a 1 -r 100 -c 5 10.100.10.20`,
    level: 'Senior',
    tags: ['Протоколы', 'Modbus', 'OPC UA', 'BACnet', 'SCADA', 'OT', 'ЦОД'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-mdns-llmnr',
    section: 'Сети',
    category: 'Протоколы',
    title: 'mDNS (Bonjour/Avahi), LLMNR и NetBIOS-NS: локальное разрешение имён и ИБ-риски',
    shortSummary: 'Мультикаст-обнаружение сервисов без DNS-сервера (.local) и почему LLMNR/NBT-NS отключают через GPO против Responder-атак.',
    description: `- mDNS (Multicast DNS, RFC 6762, UDP/5353, домен .local): позволяет устройствам в локальной сети (Apple Bonjour, Linux Avahi, сетевые принтеры, Chromecast) находить друг друга без центрального DNS-сервера.
- LLMNR (Link-Local Multicast Name Resolution, UDP/5355) и NetBIOS-NS (UDP/137): резервные механизмы Windows, когда обычный DNS не ответил. Клиент кричит мультикастом/широковещательно в локальную сеть: «Кто знает сервер fileserver1?» — и злоумышленник с утилитой Responder отвечает первым, перехватывая NTLMv2-хэши паролей пользователей!`,
    practicalUsage: 'Обязательное отключение LLMNR и NetBIOS over TCP/IP через групповые политики (GPO) в доменах Active Directory для предотвращения внутреннего пентест-вектора LLMNR Poisoning.',
    commandsOrConfig: `# Просмотр локальных сервисов mDNS в Linux (Avahi)
avahi-browse -a -t

# Проверка статуса LLMNR в systemd-resolved
resolvectl status | grep -i llmnr`,
    level: 'Middle',
    tags: ['Протоколы', 'mDNS', 'LLMNR', 'NetBIOS', 'Avahi', 'Active Directory', 'Безопасность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-bfd-ptp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'BFD (RFC 5880) и PTP (IEEE 1588): субсекундный failover и точное время',
    shortSummary: 'Мгновенное обнаружение обрыва линка для BGP/OSPF за миллисекунды (UDP 3784) и синхронизация времени с точностью до наносекунд.',
    description: `- BFD (Bidirectional Forwarding Detection, UDP/3784): сверхлегкий протокол проверки живости канала между двумя маршрутизаторами/серверами, шлющий пакеты каждые 10–50 мс. Вместо ожидания тайм-аутов BGP (90–180 сек) или OSPF (40 сек) BFD детектирует обрыв оптики за ~100–150 мс и мгновенно триггерит переключение маршрута.
- PTP (Precision Time Protocol, IEEE 1588, UDP 319/320): аппаратная синхронизация часов через сетевые карты и коммутаторы с поддержкой PTP (Boundary/Transparent Clock) с точностью до субмикросекунд/наносекунд (в 1000 раз точнее NTP).`,
    practicalUsage: 'Ультрабыстрая сходимость магистральных BGP/OSPF линков в ЦОД и у операторов связи (BFD), высокочастотный трейдинг, телеком-вышки 5G и аудио/видеостудии (PTP).',
    commandsOrConfig: `# Включение BFD для соседа BGP в FRRouting / Cisco IOS
router bgp 65001
 neighbor 10.0.0.2 fall-over bfd

# Проверка активных сессий BFD и статуса PTP в Linux (linuxptp)
sudo vtysh -c "show bfd peers"
pmc -u -b 0 'GET CURRENT_DATA_SET' 2>/dev/null || true`,
    level: 'Senior',
    tags: ['Протоколы', 'BFD', 'PTP', 'IEEE 1588', 'BGP', 'OSPF', 'Failover'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== VPN-ПРОТОКОЛЫ И ТУННЕЛИРОВАНИЕ ====================
  {
    id: 'kb-proto-vpn-wireguard-awg',
    section: 'Сети',
    category: 'Протоколы',
    title: 'WireGuard и AmneziaWG: ядро Linux, Noise Protocol и Cryptokey Routing',
    shortSummary: 'Сверхбыстрый L3 VPN-протокол (UDP/51820) с минимальной кодовой базой, статичными ключами Curve25519 и обфускацией.',
    description: `WireGuard встроен непосредственно в ядро Linux (с версии 5.6), занимает ~4000 строк кода и использует фиксированный современный набор криптографии (Noise_IKpsk2, ChaCha20 для шифрования, Poly1305 для аутентификации, Curve25519 для обмена ключами, BLAKE2s для хэширования). Ключевая концепция — Cryptokey Routing: каждый открытый ключ пира жестко привязан к списку разрешенных IP-адресов (AllowedIPs). Протокол не рассылает keepalive без надобности (Silent/Stealth mode) и поддерживает роуминг IP-адреса без разрыва сессии.

AmneziaWG — форк протокола WireGuard, добавляющий мусорные пакеты перед рукопожатием и изменение сигнатур заголовков, чтобы DPI-системы не могли заблокировать WireGuard по характерному первому пакету.`,
    practicalUsage: 'Высокоскоростные корпоративные туннели (до 10+ Гбит/с на одном ядре), защищенный доступ сотрудников и устойчивые VPN-шлюзы в условиях фильтрации UDP.',
    commandsOrConfig: `# Пример конфига /etc/wireguard/wg0.conf
[Interface]
PrivateKey = <ServerPrivateKey>
Address = 10.66.66.1/24
ListenPort = 51820

[Peer]
PublicKey = <ClientPublicKey>
AllowedIPs = 10.66.66.2/32
PersistentKeepalive = 25

# Включение и проверка статуса
sudo wg-quick up wg0 && sudo wg show`,
    level: 'Middle',
    tags: ['Протоколы', 'VPN', 'WireGuard', 'AmneziaWG', 'Noise', 'UDP'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vpn-ipsec-ikev2',
    section: 'Сети',
    category: 'Протоколы',
    title: 'IPsec (AH, ESP, IKEv1/IKEv2, NAT-T 4500): стандарт межсетевых VPN',
    shortSummary: 'Набор протоколов IP-уровня для туннелей Site-to-Site и MOBIKE: согласование ключей IKEv2 (UDP 500/4500) и шифрование ESP.',
    description: `IPsec (Internet Protocol Security) — фундаментальный стек стандартов IETF (RFC 4301, 7296) для защиты трафика на уровне L3:
- IKEv1 / IKEv2 (UDP/500, а при наличии NAT — NAT-Traversal UDP/4500): протокол обмена ключами и создания ассоциаций безопасности (SA). Современный IKEv2 быстрее, устойчивее к потере пакетов и поддерживает MOBIKE (смена Wi-Fi ↔ 4G/5G на смартфонах без обрыва VPN).
- ESP (Encapsulating Security Payload, IP Protocol 50): шифрует и аутентифицирует полезную нагрузку (в Transport mode — только данные пакета, в Tunnel mode — весь исходный IP-пакет).
- AH (Authentication Header, IP Protocol 51): только подпись и целостность без шифрования (не совместим с NAT!).`,
    practicalUsage: 'Обязательный стандарт для Site-to-Site туннелей между разнородными маршрутизаторами (Cisco, MikroTik, Fortinet, Palo Alto, Linux StrongSwan/Libreswan) и корпоративный Mobile VPN.',
    commandsOrConfig: `# Просмотр политик и состояний IPsec XFRM в ядре Linux
sudo ip xfrm state
sudo ip xfrm policy

# Проверка IKEv2 туннелей в StrongSwan (swanctl)
sudo swanctl --list-sas`,
    level: 'Senior',
    tags: ['Протоколы', 'VPN', 'IPsec', 'IKEv2', 'ESP', 'AH', 'NAT-T', 'StrongSwan'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vpn-openvpn',
    section: 'Сети',
    category: 'Протоколы',
    title: 'OpenVPN: архитектура SSL/TLS VPN, режимы TUN vs TAP и tls-crypt',
    shortSummary: 'Гибкий кроссплатформенный протокол на базе OpenSSL поверх UDP/TCP 1194/443 с поддержкой L3-маршрутизации и L2-моста.',
    description: `OpenVPN использует стандартную криптографию TLS (OpenSSL / mbedTLS) для аутентификации и обмена ключами, работая поверх UDP (рекомендуется для скорости и избежания TCP-over-TCP meltdown) или TCP/443 (маскировка под HTTPS для прохождения жестких прокси/фаерволов).

Режимы виртуальных интерфейсов:
- TUN (L3 маршрутизируемый туннель): передает только IP-пакеты — минимум оверхеда, стандарт для удаленного доступа.
- TAP (L2 Ethernet-мост): эмулирует виртуальную сетевую карту и пропускает широковещательный (Broadcast/ARP) трафик, что нужно для специфического ПО.
Директива tls-crypt дополнительно шифрует и подписывает даже стартовые пакеты TLS-рукопожатия общим ключом, скрывая OpenVPN от сканеров портов.`,
    practicalUsage: 'Классические корпоративные VPN-серверы (pfSense, MikroTik, Linux), раздача маршрутов и DNS клиентам по PKI-сертификатам Easy-RSA.',
    commandsOrConfig: `# Проверка статуса подключенных клиентов OpenVPN и тест ключа tls-crypt
openvpn --genkey secret ta.key
cat /var/log/openvpn/openvpn-status.log`,
    level: 'Middle',
    tags: ['Протоколы', 'VPN', 'OpenVPN', 'TUN', 'TAP', 'TLS', 'OpenSSL'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vpn-pptp-sstp',
    section: 'Сети',
    category: 'Протоколы',
    title: 'PPTP и SSTP (Microsoft VPN): MPPE, порт 443 и устаревание PPTP',
    shortSummary: 'Нативные VPN-протоколы Windows: небезопасный PPTP (TCP/1723 + GRE) против защищённого SSTP поверх HTTPS (TCP/443).',
    description: `- PPTP (Point-to-Point Tunneling Protocol, TCP/1723 + GRE Protocol 47): один из старейших VPN-протоколов Microsoft. Использует устаревшую аутентификацию MS-CHAPv2 и потоковый шифр MPPE (RC4 128-bit), которые взламываются за минуты. Сегодня PPTP запрещен политиками ИБ (сохраняется только на старом легаси-оборудовании).
- SSTP (Secure Socket Tunneling Protocol, TCP/443): разработан Microsoft как замена PPTP — инкапсулирует PPP-трафик внутрь стандартного TLS 1.2/1.3 (порт 443). Легко проходит практически любые корпоративные фаерволы и NAT-шлюзы, нативно встроен в Windows (RRAS) и поддерживается в Linux/MikroTik (sstp-client).`,
    practicalUsage: 'Миграция со старых PPTP-серверов на IKEv2/WireGuard/SSTP, резервный канал доступа Windows-клиентов через порт 443 из отелей и публичных Wi-Fi.',
    commandsOrConfig: `# Подключение к SSTP VPN из Linux (sstp-client)
sudo sstpc --cert-warn --user corpuser --password 'Secret' vpn.company.ru usepeerdns defaultroute`,
    level: 'Junior',
    tags: ['Протоколы', 'VPN', 'PPTP', 'SSTP', 'GRE', 'Windows', 'RRAS'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vpn-openconnect-softether',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Cisco AnyConnect (OpenConnect) и SoftEther VPN: SSL + DTLS туннели',
    shortSummary: 'Корпоративный протокол удалённого доступа (TCP/443 TLS + UDP/443 DTLS) и мультивендорный швейцарский нож SoftEther.',
    description: `- Cisco AnyConnect / OpenConnect (ocserv): работает гибридно — управляющий канал и авторизация (логин/пароль + 2FA TOTP/RADIUS + сертификат) идут по HTTPS (TCP/443), а сам трафик данных передается по низколатентному DTLS (UDP/443) с мгновенным откатом на TLS при блокировке UDP. Снаружи неотличим от обычного веб-сервера.
- SoftEther VPN: открытый мультивендорный VPN-сервер (университет Цукубы), поддерживающий одновременно собственный быстрый SSL-VPN протокол поверх HTTPS/443, а также OpenVPN, L2TP/IPsec, MS-SSTP и VPN over ICMP/DNS.`,
    practicalUsage: 'Корпоративный Remote Access с двухфакторной аутентификацией (ocserv на Linux или Cisco ASA/FTD), прохождение жестко фильтруемых сетей.',
    commandsOrConfig: `# Подключение из Linux к серверу Cisco AnyConnect / ocserv через openconnect
sudo openconnect --protocol=anyconnect https://vpn.company.ru -u admin

# Управление сервером ocserv (OpenConnect Server)
sudo occtl show users`,
    level: 'Middle',
    tags: ['Протоколы', 'VPN', 'OpenConnect', 'AnyConnect', 'SoftEther', 'DTLS', 'SSL VPN'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vpn-mesh-tailscale-zerotier',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Mesh VPN (Zero-Trust): протоколы Tailscale (Headscale) и ZeroTier',
    shortSummary: 'Одноранговые (P2P) оверлейные сети с автоматическим NAT Traversal (STUN/DERP) без единой точки отказа.',
    description: `В отличие от классического Hub-and-Spoke VPN, где весь трафик идет через центральный сервер, Mesh VPN строят прямые зашифрованные P2P-туннели между всеми узлами напрямую:
- Tailscale (и открытый self-hosted сервер управления Headscale): использует WireGuard для шифрования трафика, а координационный сервер — только для раздачи публичных ключей, ACL-политик и преодоления NAT (UDP hole punching / STUN, с резервными релеями DERP over HTTPS).
- ZeroTier (протокол VL1 + VL2): создает глобальную виртуальную L2 Ethernet-сеть (поддерживает ARP, Broadcast, Multicast и собственные контроллеры) со сквозным шифрованием Salsa20/Poly1305 поверх UDP/9993.`,
    practicalUsage: 'Объединение домашних лабораторий, удаленных серверов за серым NAT (без белого IP!), серверов в разных облаках и рабочих ноутбуков по концепции Zero Trust.',
    commandsOrConfig: `# Подключение Linux-узла к Tailscale / Headscale и настройка Exit Node
sudo tailscale up --login-server=https://headscale.corp.ru --accept-routes
tailscale status
tailscale ping 100.64.0.5

# Проверка статуса сети ZeroTier
sudo zerotier-cli listnetworks
sudo zerotier-cli peers`,
    level: 'Middle',
    tags: ['Протоколы', 'VPN', 'Tailscale', 'Headscale', 'ZeroTier', 'Mesh VPN', 'Zero Trust'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-vpn-shadowsocks-vless',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Shadowsocks, VLESS (XTLS-Reality) и Trojan: прокси-туннели против DPI',
    shortSummary: 'Современные протоколы туннелирования без характерной VPN-сигнатуры, маскирующиеся под легитимный TLS 1.3 трафик.',
    description: `В отличие от классических VPN (OpenVPN/IPsec), которые легко распознаются системами глубокого анализа пакетов (DPI), современные прокси-протоколы имитируют обычный HTTPS-трафик:
- Shadowsocks (AEAD шифры chacha20-ietf-poly1305 / aes-256-gcm): легкий шифрованный SOCKS5-прокси с произвольной структурой байтов без открытых заголовков рукопожатия.
- Trojan: полностью маскирует прокси-трафик под стандартный HTTPS-сайт на порту 443 — при попытке проверки со стороны сканера сервер отдает обычный легитимный веб-сайт.
- VLESS (стек Xray-core) + XTLS-Reality: легчайший stateless-протокол без лишнего двойного шифрования; транспорт Reality перехватывает TLS 1.3 рукопожатие и даже предъявляет проверяющим реальный сертификат доверенного внешнего сайта (без собственного домена).`,
    practicalUsage: 'Резервные каналы администрирования серверов из сетей с агрессивной фильтрацией (DPI), защищенное проксирование трафика поверх TCP/443.',
    commandsOrConfig: `# Проверка конфигурации Xray (VLESS) перед запуском
xray run -test -config /usr/local/etc/xray/config.json

# Генерация пары ключей x25519 для XTLS-Reality
xray x25519`,
    level: 'Senior',
    tags: ['Протоколы', 'VPN', 'VLESS', 'Reality', 'Shadowsocks', 'Trojan', 'DPI'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== ПРОЧИЕ КЛЮЧЕВЫЕ СЕТЕВЫЕ ПРОТОКОЛЫ ====================
  {
    id: 'kb-proto-doh-dot-doq',
    section: 'Сети',
    category: 'Протоколы',
    title: 'DoT (DNS over TLS), DoH (DNS over HTTPS) и DoQ: шифрование DNS',
    shortSummary: 'Защита DNS-запросов от перехвата и подмены (DNS Spoofing) через TLS/853, HTTPS/443 и QUIC/853.',
    description: `Классический DNS (UDP/TCP 53) передает все запрашиваемые домены в открытом виде — провайдер или злоумышленник в локальной сети видит каждый посещаемый ресурс и может подменить ответ. Для шифрования DNS созданы три стандарта:
- DoT (DNS over TLS, RFC 7858, порт TCP/853): оборачивает DNS в чистый TLS-туннель (используется в системных резолверах Android Private DNS и systemd-resolved).
- DoH (DNS over HTTPS, RFC 8484, порт TCP/443): передает DNS-пакеты внутри обычного HTTPS (поддерживается браузерами Chrome/Firefox и неотличим от веб-трафика).
- DoQ (DNS over QUIC, RFC 9250, порт UDP/853): новейший стандарт с нулевой задержкой 0-RTT и отсутствием Head-of-Line Blocking.`,
    practicalUsage: 'Настройка приватных корпоративных и домашних резолверов (AdGuard Home, Unbound, CoreDNS, Cloudflared) с шифрованными апстримами.',
    commandsOrConfig: `# Проверка DNS over TLS (DoT) через утилиту kdig (knot-dnsutils)
kdig @1.1.1.1 +tls example.com

# Проверка DNS over HTTPS (DoH) через curl (RFC 8484 JSON/Wireformat)
curl -sH 'accept: application/dns-json' 'https://dns.google/resolve?name=example.com&type=A' | jq .`,
    level: 'Middle',
    tags: ['Протоколы', 'DNS', 'DoH', 'DoT', 'DoQ', 'TLS', 'Приватность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-diameter',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Diameter (RFC 6733): телеком-преемник RADIUS для 4G LTE / 5G и IMS',
    shortSummary: 'Надёжный AAA-протокол нового поколения поверх TCP и SCTP (порт 3868) для операторов сотовой связи.',
    description: `Протокол Diameter создан IETF как эволюция RADIUS для высоконагруженных телекоммуникационных систем (ядро 4G EPC, IMS/VoLTE, роуминг). В отличие от RADIUS, работающего поверх ненадежного UDP, Diameter использует транспорт с установлением соединения — TCP или SCTP (стандартный порт 3868, TLS 5868), поддерживает обнаружение разрыва связи (Watchdog), гарантированную доставку AVP-атрибутов и peer-to-peer архитектуру без жесткого разделения клиент/сервер.`,
    practicalUsage: 'Биллинг, авторизация и политика тарификации абонентов в сетях мобильных операторов (HSS, PCRF, OCS) в паре с SCTP Multi-Homing.',
    commandsOrConfig: `# Фильтр Wireshark для анализа сообщений Diameter (например, 3GPP LTE S6a)
diameter || sctp.port == 3868`,
    level: 'Senior',
    tags: ['Протоколы', 'Diameter', 'AAA', 'SCTP', 'Телеком', 'LTE'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-evpn-rpki',
    section: 'Сети',
    category: 'Протоколы',
    title: 'BGP EVPN и RPKI: современная фабрика ЦОД и криптозащита маршрутов',
    shortSummary: 'Control Plane для VXLAN без флуда (EVPN, RFC 7432) и криптографическая проверка подлинности BGP-префиксов (RPKI/ROA).',
    description: `- BGP EVPN (Ethernet VPN): современный стандарт Control Plane для оверлейных сетей ЦОД поверх VXLAN/MPLS. Вместо широковещательного «обучения» MAC-адресов через флуд, коммутаторы Leaf обмениваются таблицами MAC и IP-адресов друг с другом напрямую по MP-BGP (Type-2/Type-5 маршруты), подавляя ARP-штормы (ARP Suppression).
- RPKI (Resource Public Key Infrastructure, RFC 6811): криптографическая защита глобального интернета от BGP Hijacking (случайного или злонамеренного анонса чужих подсетей). Владелец IP-блока публикует цифровую запись ROA, а пограничные роутеры проверяют валидность маршрутов (Valid / Invalid / NotFound) через валидатор (Routinator/StayRTR) по протоколу RTR.`,
    practicalUsage: 'Построение масштабируемых Spine-Leaf фабрик дата-центров (Cumulus, Arista, FRRouting) и защита AS-маршрутизации провайдеров/компаний от перехвата трафика.',
    commandsOrConfig: `# Просмотр EVPN таблицы MAC/IP и статуса RPKI в FRRouting (vtysh)
show bgp l2vpn evpn
show rpki prefix-table`,
    level: 'Senior',
    tags: ['Протоколы', 'EVPN', 'BGP', 'RPKI', 'VXLAN', 'ЦОД', 'Безопасность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-kerberos-ntlm',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Kerberos (TCP/UDP 88) vs NTLM (NTLMv2): аутентификация в доменах',
    shortSummary: 'Сравнение билетной системы Active Directory (TGT/TGS без передачи пароля) и унаследованного challenge-response NTLM.',
    description: `- Kerberos v5 (RFC 4120, порт 88): основной протокол аутентификации Active Directory и FreeIPA. Клиент получает от контроллера домена (KDC) билет TGT, а затем сервисные билеты TGS (по SPN сервиса), обеспечивая взаимную проверку сервера и клиента (защита от поддельного сервера) и строгую привязку к точному времени (допуск ±5 мин).
- NTLM / NTLMv2: устаревший протокол Microsoft «запрос-ответ» (Challenge-Response), используемый как fallback при обращении по IP-адресу вместо доменного имени или вне домена. Уязвим к атакам Relay (NTLM Relay) и перехвату хэшей — рекомендуется ограничивать/отключать NTLM в пользу Kerberos.`,
    practicalUsage: 'Настройка SPN для веб-приложений/1С/SQL (setspn), диагностика ошибок входа в Active Directory, аудит и отключение NTLMv1/NTLM.',
    commandsOrConfig: `# Просмотр и сброс билетов Kerberos на Windows и Linux
klist
klist purge      # Windows
kdestroy && kinit admin@CORP.LOCAL   # Linux MIT Kerberos`,
    level: 'Middle',
    tags: ['Протоколы', 'Kerberos', 'NTLM', 'Active Directory', 'SPN', 'Аутентификация'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-wol-pxe',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Wake-on-LAN (WoL) и PXE / iPXE: пробуждение и сетевая загрузка ОС',
    shortSummary: 'Удалённое включение выключенных компьютеров Magic Packet-ом (UDP 7/9) и установка ОС по сети без флешек.',
    description: `- Wake-on-LAN (WoL): технология удаленного включения спящего или выключенного ПК через отправку специального широковещательного «Магического пакета» (Magic Packet — 6 байт 0xFF и 16 повторов MAC-адреса целевой сетевой карты, обычно в UDP/7 или UDP/9 или EtherType 0x0842). Требует включения в BIOS/UEFI и дежурного питания сетевой карты.
- PXE / iPXE (Preboot Execution Environment): связка протоколов DHCP (Options 66/67) + TFTP (или HTTP в современном iPXE), позволяющая голому серверу или рабочей станции загрузить загрузчик и образ установщика ОС прямо по сети.`,
    practicalUsage: 'Массовая раскатка Windows/Linux на десятки рабочих станций (FOG, Foreman, WDS/MDT, netboot.xyz) и удаленное включение офисных ПК для ночных обновлений.',
    commandsOrConfig: `# Отправка Magic Packet (Wake-on-LAN) в Linux
wakeonlan 00:11:22:33:44:55
# или через etherwake с указанием интерфейса
sudo etherwake -i eth0 00:11:22:33:44:55`,
    level: 'Junior',
    tags: ['Протоколы', 'Wake-on-LAN', 'WoL', 'PXE', 'iPXE', 'TFTP', 'Автоматизация'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-rsync',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Rsync (Delta-Transfer Protocol): инкрементальная синхронизация по сети',
    shortSummary: 'Передача только изменённых блоков файлов с контрольными суммами по TCP/873 или поверх защищённого SSH.',
    description: `Rsync реализует алгоритм rolling checksum (дельта-передача): перед копированием большого файла он разбивает файл на блоки, сравнивает контрольные суммы на источнике и приемнике и передает по сети ТОЛЬКО изменившиеся фрагменты со сжатием (-z). Может работать как собственный демон (TCP/873, удобно для публичных зеркал репозиториев) либо прозрачно поверх SSH (рекомендуется для серверов и бэкапов).`,
    practicalUsage: 'Быстрая миграция терабайтных сайтов и хранилищ между серверами с сохранением прав/владельцев/симлинков (-a), инкрементальные бэкапы (--link-dest).',
    commandsOrConfig: `# Зеркалирование каталога по SSH с прогрессом, сжатием и удалением лишнего (--delete)
rsync -avzP --delete -e "ssh -p 22" /var/www/ appuser@10.0.10.15:/var/www/

# Ограничение скорости копирования до 10 МБ/с, чтобы не забить канал продакшена
rsync -avz --bwlimit=10000 /backups/ backup@storage:/srv/backups/`,
    level: 'Junior',
    tags: ['Протоколы', 'Rsync', 'Delta-Transfer', 'SSH', 'Бэкапы', 'Linux'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-proto-p2p-bittorrent-ipfs-tor',
    section: 'Сети',
    category: 'Протоколы',
    title: 'Децентрализованные P2P и анонимные протоколы: BitTorrent, IPFS и Tor',
    shortSummary: 'Одноранговое распространение файлов (DHT/Tracker), контентная адресация Web3 (IPFS) и луковая маршрутизация (Tor).',
    description: `- BitTorrent (BEP 3, DHT/Kademlia, uTP поверх UDP): децентрализованный P2P-протокол раздачи больших файлов кусками (Pieces) с проверкой SHA-1/SHA-256. Активно применяется не только для медиа, но и в корпоративном деплое (развертывание образов серверов в ДЦ через Kraken / Dragonfly — разгружает центральный Docker Registry).
- IPFS (InterPlanetary File System, libp2p): адресует файлы не по серверу/URL, а по криптографическому хэшу содержимого (CID — Content Identifier), позволяя забирать блоки с любого ближайшего узла.
- Tor (The Onion Router): многослойное («луковое») шифрование через цепочку из 3 случайных узлов (Guard -> Middle -> Exit), скрывающее IP-адрес клиента от получателя и содержимое от промежуточных узлов.`,
    practicalUsage: 'Массовая доставка Docker-образов и ISO на тысячи узлов в дата-центрах (P2P-репликация без перегрузки аплинка), распределенные архивы данных.',
    commandsOrConfig: `# Проверка локального Tor SOCKS5-прокси и выходного узла
curl --socks5-hostname 127.0.0.1:9050 https://check.torproject.org/api/ip

# Получение объекта из IPFS по его CID
ipfs cat /ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme`,
    level: 'Middle',
    tags: ['Протоколы', 'P2P', 'BitTorrent', 'IPFS', 'Tor', 'DHT', 'Децентрализация'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
