import { KnowledgeEntry } from '../../types/knowledgeBase';

export const WINDOWS_AD_HYPERV_SYSINTERNALS_ENTRIES: KnowledgeEntry[] = [
  // ==================== ACTIVE DIRECTORY ====================
  {
    id: 'kb-ad-architecture-ou',
    section: 'Windows & Active Directory',
    category: 'Active Directory (AD DS)',
    title: 'Архитектура Active Directory: Лес, Дерево, Домен, OU и Сайты',
    shortSummary: 'Логическая и физическая структура службы каталогов Microsoft AD DS, границы безопасности и делегирование прав.',
    description: `Active Directory Domain Services (AD DS) объединяет логическую и физическую структуры корпоративной сети:
- Лес (Forest) — верхний уровень и граница безопасности (единая Схема и Глобальный Каталог GC).
- Дерево (Tree) — домены с общим пространством имен (corp.local -> spb.corp.local), связанные двусторонними транзитивными довериями (Trusts).
- Домен (Domain) — административная единица репликации и политик паролей.
- Подразделение (OU, Organizational Unit) — контейнер внутри домена для структурирования пользователей/ПК, привязки групповых политик (GPO) и делегирования прав (например, Helpdesk сбрасывает пароли только в одном филиале).`,
    practicalUsage: 'Проектирование структуры каталога предприятия под филиалы и отделы, изоляция серверов от рабочих станций и настройка доверительных отношений между компаниями при слияниях.',
    commandsOrConfig: `# Проверка базовых параметров домена и леса через PowerShell
Get-ADDomain | Select-Object DNSRoot, DomainMode, PDCEmulator
Get-ADForest | Select-Object Name, ForestMode, GlobalCatalogs

# Информация о текущем контроллере домена (Logon Server) на клиенте
echo %LOGONSERVER%
nltest /dsgetdc:corp.local`,
    level: 'Junior',
    tags: ['Active Directory', 'AD DS', 'Forest', 'OU', 'Global Catalog', 'Windows Server'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ad-fsmo-roles',
    section: 'Windows & Active Directory',
    category: 'Active Directory (AD DS)',
    title: '5 ролей FSMO в Active Directory и правила их переноса',
    shortSummary: 'Single-Master роли контроллеров домена: Schema, Domain Naming, PDC Emulator, RID Master и Infrastructure Master.',
    description: `Несмотря на мультимастерную репликацию AD, 5 критичных операций требуют единственного владельца (FSMO — Flexible Single Master Operations):
1) Schema Master (1 на лес) — управляет изменением схемы атрибутов AD (например, при установке Exchange).
2) Domain Naming Master (1 на лес) — добавление и удаление доменов в лесу.
3) PDC Emulator (1 на домен) — главный источник времени в домене, обработка смены паролей, блокировка учетных записей и редактирование GPO по умолчанию.
4) RID Master (1 на домен) — выдает пулы уникальных идентификаторов (RID) контроллерам для создания новых SID объектов.
5) Infrastructure Master (1 на домен) — обновляет ссылки на объекты из других доменов (не рекомендуется размещать на сервере Global Catalog в многодоменном лесу).`,
    practicalUsage: 'Плановая замена старого контроллера домена (Transfer ролей) или аварийный захват (Seize) при физической гибели сервера с ролью PDC/RID.',
    commandsOrConfig: `# Просмотр текущих владельцев всех 5 ролей FSMO
netdom query fsmo

# Плановый перенос ролей на новый контроллер DC02 через PowerShell
Move-ADDirectoryServerOperationMasterRole -Identity "DC02" -OperationMasterRole PDCEmulator,RIDMaster,InfrastructureMaster

# Аварийный захват (Seize — только если старый DC больше никогда не вернется в сеть!)
Move-ADDirectoryServerOperationMasterRole -Identity "DC02" -OperationMasterRole PDCEmulator -Force`,
    level: 'Middle',
    tags: ['Active Directory', 'FSMO', 'PDC Emulator', 'RID Master', 'netdom', 'PowerShell'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ad-gpo-lsdou',
    section: 'Windows & Active Directory',
    category: 'Active Directory (AD DS)',
    title: 'Групповые политики (GPO): порядок применения LSDOU и отладка',
    shortSummary: 'Приоритет наследования Local -> Site -> Domain -> OU, Loopback Processing, WMI-фильтры и диагностика gpresult.',
    description: `Групповые политики (GPO) централизованно настраивают Windows-станции и серверы. Политики применяются в строгом порядке LSDOU: Local (локальная) -> Site (сайт AD) -> Domain -> OU (от родительского к дочернему). Побеждает та политика, которая применилась ПОСЛЕДНЕЙ (ближе к объекту в OU), если не включены флаги Enforced (Принудительно) или Block Inheritance (Блокировать наследование).

Каждая GPO состоит из двух частей: GPC (запись в базе AD) и GPT (шаблоны и скрипты в общей папке SYSVOL). По умолчанию политики обновляются каждые 90 минут (+-30 мин).`,
    practicalUsage: 'Массовое развертывание сетевых дисков и принтеров, настройка Windows Firewall, ограничение запуска флешек, установка программ MSI и применение стандартов безопасности CIS Benchmark.',
    commandsOrConfig: `# Принудительное обновление пользовательских и компьютерных политик
gpupdate /force

# Выгрузка отчета примененных политик и причин отказа в HTML
gpresult /h C:\\Temp\\gpo_report.html /f

# Быстрый просмотр результирующего набора политик в консоли
gpresult /r /scope computer`,
    level: 'Junior',
    tags: ['Active Directory', 'GPO', 'LSDOU', 'SYSVOL', 'gpresult', 'gpupdate'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ad-replication-kerberos',
    section: 'Windows & Active Directory',
    category: 'Active Directory (AD DS)',
    title: 'Репликация AD (NTDS.dit / DFSR) и аутентификация Kerberos',
    shortSummary: 'Внутреннее устройство базы каталога, проверка здоровья контроллеров (dcdiag/repadmin) и выдача билетов TGT/TGS.',
    description: `База данных AD хранится в файле C:\\Windows\\NTDS\\ntds.dit (движок ESE), а шаблоны политик GPO — в папке SYSVOL, реплицируемой через DFSR. Контроллеры в одном сайте реплицируются за 15 секунд, между сайтами (через Sites and Services) — по расписанию со сжатием трафика. При удалении контроллера нельзя просто выключить его и оставить в сети дольше срока Tombstone Lifetime (180 дней), иначе возникнут объекты-зомби (lingering objects).

Основной протокол аутентификации — Kerberos (порт 88 TCP/UDP). Клиент получает у KDC билет TGT (Ticket Granting Ticket), а затем запрашивает билеты TGS (Service Ticket) для доступа к серверам по SPN (Service Principal Name). Требует синхронизации времени до 5 минут.`,
    practicalUsage: 'Диагностика расхождения паролей и не применяющихся GPO между филиалами, решение проблем двойного прыжка (Kerberos Double Hop) и конфликтов SPN для SQL/IIS/1С.',
    commandsOrConfig: `# Полная диагностика контроллера домена и DNS
dcdiag /v /c /d /e

# Проверка статуса и ошибок репликации между всеми DC
repadmin /replsummary
repadmin /showrepl
repadmin /syncall /AdeP

# Просмотр полученных билетов Kerberos на текущей машине
klist
klist purge`,
    level: 'Middle',
    tags: ['Active Directory', 'Kerberos', 'repadmin', 'dcdiag', 'DFSR', 'NTDS'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-ad-agdlp-model',
    section: 'Windows & Active Directory',
    category: 'Active Directory (AD DS)',
    title: 'Модель управления доступом AGDLP / IGDLA в Active Directory',
    shortSummary: 'Стандарт Microsoft по разделению ролей и доступов: Accounts -> Global -> Domain Local -> Permissions.',
    description: `Прямое назначение прав конкретному пользователю на файловые ресурсы приводит к хаосу при увольнениях и переводах. Модель AGDLP задает строгую иерархию:
- A (Accounts) — учетные записи пользователей добавляются в...
- G (Global Groups) — ролевые/отделовые группы (например, G_Buhgalteria, G_Sales).
- DL (Domain Local Groups) — группы доступа к конкретному ресурсу (например, DL_Share_1C_ReadWrite, DL_Share_1C_ReadOnly).
- P (Permissions) — именно группы DL прописываются в NTFS ACL папок/принтеров.

При появлении нового бухгалтера достаточно добавить его в G_Buhgalteria — все нужные права к папкам и 1С он получит автоматически.`,
    practicalUsage: 'Наведение порядка на файловых серверах и в 1С/RDS: аудит прав за 5 минут вместо разбора сотен разрозненных ACL на тысячах папок.',
    commandsOrConfig: `# Поиск всех членов группы доступа в PowerShell (рекурсивно)
Get-ADGroupMember -Identity "DL_Share_Finance_RW" -Recursive | Select-Object Name, SamAccountName`,
    level: 'Junior',
    tags: ['Active Directory', 'AGDLP', 'NTFS', 'Доступ', 'RBAC', 'Безопасность'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== WINDOWS SERVER ====================
  {
    id: 'kb-winserv-dns-dhcp-fsrm',
    section: 'Windows & Active Directory',
    category: 'Windows Server (ОС и Роли)',
    title: 'Ключевые роли Windows Server: AD-Integrated DNS, DHCP Failover и FSRM',
    shortSummary: 'Отказоустойчивый DHCP в режиме Hot Standby / Load Balance, репликация зон DNS и квоты файлового сервера.',
    description: `DNS в связке с AD хранит зоны прямо в базе Active Directory (AD-Integrated), обеспечивая безопасное динамическое обновление записей и мультимастерную репликацию на все DC.

DHCP Server в Windows Server поддерживает встроенную отказоустойчивость (DHCP Failover) между двумя серверами в режимах Load Balance (50/50) или Hot Standby (основной + резервный) без необходимости кластеризации дисков. Роль FSRM (File Server Resource Manager) позволяет задавать квоты на размер папок пользователей и блокировать запись файлов-шифровальщиков по расширению (File Screening).`,
    practicalUsage: 'Построение отказоустойчивой корпоративной инфраструктуры без единой точки отказа и защита общих файловых шар от эпидемий вирусов-шифровальщиков (Ransomware).',
    commandsOrConfig: `# Проверка состояния DHCP Failover и аренд через PowerShell
Get-DhcpServerv4Failover
Get-DhcpServerv4Scope | Get-DhcpServerv4Lease | Select-Object IPAddress, HostName, LeaseExpiryTime

# Добавление A-записи и PTR в DNS через PowerShell
Add-DnsServerResourceRecordA -Name "srv-1c" -ZoneName "corp.local" -IPv4Address "10.0.10.25" -CreatePtr`,
    level: 'Middle',
    tags: ['Windows Server', 'DNS', 'DHCP Failover', 'FSRM', 'PowerShell'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-winserv-rds',
    section: 'Windows & Active Directory',
    category: 'Windows Server (ОС и Роли)',
    title: 'Служба удаленных рабочих столов Windows (RDS) и RemoteApp',
    shortSummary: 'Архитектура терминальных ферм (RDSH, Broker, RD Gateway, Licensing) для работы 1С и корпоративных приложений.',
    description: `Remote Desktop Services (RDS) позволяет десяткам и сотням пользователей одновременно работать на одном сервере или ферме серверов:
- RD Session Host (RDSH) — серверы, где непосредственно запускаются сеансы и программы (1С, Excel, Outlook).
- RD Connection Broker — балансирует новых пользователей между серверами RDSH и возвращает отключившихся в их прежний сеанс.
- RD Gateway — инкапсулирует RDP в HTTPS (порт 443) для безопасного подключения из интернета без публикации порта 3389.
- RD Licensing — выдает клиентские лицензии (RDS CAL Per User / Per Device) в течение 120-дневного льготного периода.`,
    practicalUsage: 'Стандартная схема работы филиалов с 1С:Предприятие, бухгалтерией и клиент-банками с поддержкой публикации отдельных окон приложений (RemoteApp) и профилей User Profile Disks / FSLogix.',
    commandsOrConfig: `# Просмотр активных пользовательских RDP-сессий на сервере
query user
qwinsta

# Принудительное завершение зависшего сеанса пользователя (ID 14)
rwinsta 14`,
    level: 'Middle',
    tags: ['Windows Server', 'RDS', 'Terminal Server', 'RemoteApp', '1С', 'RD Gateway'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-winserv-storage-ntfs-vss',
    section: 'Windows & Active Directory',
    category: 'Windows Server (ОС и Роли)',
    title: 'Хранилища Windows Server: NTFS vs Share права, ReFS и Shadow Copies (VSS)',
    shortSummary: 'Правило пересечения прав доступа, файловая система ReFS с самовосстановлением и теневые копии "Предыдущие версии".',
    description: `При доступе к сетевой папке в Windows действуют одновременно два уровня разрешений: Share Permissions (на саму сетевую шару) и NTFS Permissions (на файлы/папки на диске). Итоговым доступом является НАИБОЛЕЕ СТРОГОЕ пересечение обоих наборов! Best practice: давать Share -> Everyone (или Authenticated Users) Full Control / Change, а реальный доступ гибко настраивать через NTFS + AGDLP.

Файловая система ReFS (Resilient File System) защищает данные от тихого повреждения с помощью Integrity Streams и мгновенно клонирует блоки VHDX (Block Cloning) для ускорения бэкапов Veeam и Hyper-V. Служба VSS (Volume Shadow Copy) позволяет настроить расписание снимков, чтобы сотрудники сами восстанавливали случайно удаленные файлы через вкладку "Предыдущие версии".`,
    practicalUsage: 'Настройка надежного файлового сервера предприятия, мгновенное восстановление файлов пользователями без участия техподдержки, репозитории бэкапов.',
    commandsOrConfig: `# Просмотр теневых копий (VSS) и используемого места
vssadmin list shadows
vssadmin list shadowstorage

# Просмотр и резервное копирование NTFS-прав каталога
icacls "D:\\Shared\\Docs" /save C:\\Temp\\ntfs_acl_backup.txt /t`,
    level: 'Junior',
    tags: ['Windows Server', 'NTFS', 'ReFS', 'VSS', 'icacls', 'Storage'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-winserv-monitoring-wac',
    section: 'Windows & Active Directory',
    category: 'Windows Server (ОС и Роли)',
    title: 'Мониторинг и управление Windows Server: Event Viewer, WSUS, Windows Admin Center',
    shortSummary: 'Аудит журналов безопасности (Event ID 4624/4625), централизованное обновление WSUS и современный веб-портал WAC.',
    description: `Диагностика Windows Server опирается на Журнал событий (Event Viewer: Application, System, Security). Критичные Event ID безопасности: 4624 (успешный вход), 4625 (неудачный вход / подбор пароля), 4740 (блокировка учетной записи — показывает имя ПК-источника), 4720 (создание пользователя), 6008 (внезапное выключение сервера).

Для централизованного скачивания и тестирования патчей до установки в продакшн применяется роль WSUS (Windows Server Update Services), а для удаленного браузерного администрирования серверов (даже Server Core без GUI) — Windows Admin Center (WAC).`,
    practicalUsage: 'Расследование причин блокировок доменных учеток и атак brute-force, управление парком серверов Server Core, контроль установки обновлений безопасности.',
    commandsOrConfig: `# Поиск последних 20 событий неудачного входа (4625) через PowerShell
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4625} -MaxEvents 20 |
  Select-Object TimeCreated, @{N='User';E={$_.Properties[5].Value}}, @{N='SourceIP';E={$_.Properties[19].Value}}

# Проверка целостности системных файлов Windows Server
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth`,
    level: 'Junior',
    tags: ['Windows Server', 'Event Viewer', 'WSUS', 'Windows Admin Center', 'Аудит'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== HYPER-V ====================
  {
    id: 'kb-hyperv-architecture',
    section: 'Виртуализация',
    category: 'Microsoft Hyper-V',
    title: 'Архитектура Microsoft Hyper-V (Type-1): Parent Partition и VMBus',
    shortSummary: 'Устройство гипервизора 1-го типа от Microsoft, поколения ВМ (Gen 1 vs Gen 2) и высокоскоростная шина VMBus.',
    description: `Hyper-V — гипервизор 1-го типа (bare-metal): сам гипервизор загружается раньше операционной системы и берет управление CPU (Intel VT-x / AMD-V) и памятью. Хостовая Windows Server при этом превращается в привилегированный родительский раздел (Parent Partition), а виртуальные машины — в дочерние (Child Partitions), общающиеся с оборудованием напрямую через скоростную шину памяти VMBus (Integration Services).

При создании ВМ всегда рекомендуется Generation 2: она эмулирует UEFI, поддерживает Secure Boot, загрузку с контроллера SCSI, горячее увеличение диска и в разы меньше устаревших эмулируемых устройств.`,
    practicalUsage: 'Консолидация физических серверов в корпоративном парке Windows, изоляция контроллера домена, серверов 1С и БД на отказоустойчивых хостах.',
    commandsOrConfig: `# Установка роли Hyper-V и инструментов управления в Windows Server
Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart

# Просмотр всех ВМ, статуса, памяти и CPU через PowerShell
Get-VM | Select-Object Name, State, Generation, CPUUsage, @{N='MemGB';E={[math]::Round($_.MemoryAssigned/1GB,2)}}, Uptime`,
    level: 'Junior',
    tags: ['Hyper-V', 'Виртуализация', 'Type-1', 'Gen 2', 'VMBus', 'PowerShell'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-hyperv-vswitch-vlan',
    section: 'Виртуализация',
    category: 'Microsoft Hyper-V',
    title: 'Виртуальные коммутаторы Hyper-V (vSwitch), SET Teaming и VLAN',
    shortSummary: 'Типы виртуальных свитчей External/Internal/Private, объединение сетевых карт SET и тегирование трафика ВМ.',
    description: `В Hyper-V предусмотрены 3 типа виртуальных коммутаторов (vSwitch):
1) External (Внешний) — привязан к физической сетевой карте хоста, дает ВМ доступ к корпоративной ЛВС и интернету.
2) Internal (Внутренний) — соединяет ВМ друг с другом и с самим хостом (удобно для тестовых NAT-лабораторий).
3) Private (Частный) — изолированная сеть строго между виртуальными машинами (хост трафик не видит).

На серверах с несколькими сетевыми картами в Hyper-V вместо старого LBFO применяется Switch Embedded Teaming (SET) — объединение до 8 физических адаптеров прямо внутри vSwitch с поддержкой RDMA и VMQ.`,
    practicalUsage: 'Вывод множества VLAN через один 10G транк к виртуальным машинам (Trunk mode на уровне виртуального адаптера ВМ), построение изолированных тестовых стендов без риска для продакшена.',
    commandsOrConfig: `# Создание vSwitch со встроенным отказоустойчивым тимингом SET
New-VMSwitch -Name "vSwitch-LAN" -NetAdapterName "NIC1","NIC2" -EnableEmbeddedTeaming $true

# Назначение тега VLAN 20 для виртуальной машины
Set-VMNetworkAdapterVlan -VMName "VM-1C-Server" -Access -VlanId 20

# Перевод порта ВМ в режим Trunk (для виртуального роутера/pfsense)
Set-VMNetworkAdapterVlan -VMName "VM-OPNsense" -Trunk -AllowedVlanIdList "10,20,30" -NativeVlanId 1`,
    level: 'Middle',
    tags: ['Hyper-V', 'vSwitch', 'SET Teaming', 'VLAN', 'Сеть'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-hyperv-vhdx-checkpoints',
    section: 'Виртуализация',
    category: 'Microsoft Hyper-V',
    title: 'Диски VHDX (Fixed vs Dynamic), Checkpoints и Live Migration / Replica',
    shortSummary: 'Выбор формата виртуального диска для БД, контрольные точки (Production vs Standard) и асинхронная репликация ВМ.',
    description: `Формат VHDX поддерживает тома до 64 ТБ, защищен от повреждения метаданных при отключении света и использует 4K-блоки:
- Fixed (Фиксированный) — сразу резервирует весь объем на диске; минимальная фрагментация, обязателен для высоконагруженных БД и 1С.
- Dynamic (Динамический) — растет по мере записи; экономит место на тестовых стендах.

Checkpoints (снимки) бывают Standard (сохраняют состояние RAM — опасно для контроллеров домена AD из-за отката USN!) и Production (используют VSS внутри гостевой ОС для создания консистентной копии диска). Hyper-V Replica каждые 30 секунд/5 минут/15 минут асинхронно реплицирует ВМ на резервный хост без дорогой СХД.`,
    practicalUsage: 'Быстрая организация аварийного резерва (DR) малого и среднего бизнеса между двумя серверами, безопасный откат перед обновлением ПО.',
    commandsOrConfig: `# Создание фиксированного диска VHDX и контрольной точки Production
New-VHD -Path "D:\\HyperV\\Disks\\db_data.vhdx" -SizeBytes 200GB -Fixed
Checkpoint-VM -Name "VM-App01" -SnapshotName "Before-Update"

# Живая миграция ВМ на другой хост без прерывания работы (Shared-Nothing)
Move-VM -Name "VM-App01" -DestinationHost "HV-NODE-02" -IncludeStorage -DestinationStoragePath "D:\\HyperV\\VM-App01"`,
    level: 'Middle',
    tags: ['Hyper-V', 'VHDX', 'Checkpoints', 'Live Migration', 'Replica', 'DRP'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== SYSINTERNALS ====================
  {
    id: 'kb-sysinternals-procexp',
    section: 'Системная диагностика',
    category: 'Microsoft Sysinternals Suite',
    title: 'Process Explorer (procexp): дерево процессов, Handles, DLL и VirusTotal',
    shortSummary: 'Продвинутая замена Диспетчера задач Windows для поиска скрытого ПО, утечек дескрипторов и заблокированных файлов.',
    description: `Process Explorer от Марка Руссиновича отображает иерархическое дерево процессов с цветовой кодировкой (сервисы, собственные процессы, процессы .NET, упакованные бинарники) и детальную нижнюю панель загруженных DLL и открытых дескрипторов (Handles: файлы, ключи реестра, мьютексы).

Ключевые возможности: функция Find -> Find Handle or DLL (показывает, какая программа заблокировала файл и не дает его удалить/переместить), встроенная проверка цифровых подписей Microsoft (Verify Image Signatures) и мгновенная отправка хэшей всех процессов на проверку в VirusTotal.`,
    practicalUsage: 'Выявление замаскированных майнеров и троянов, разблокировка файлов перед обновлением, анализ реального потребления Private Bytes и GPU.',
    commandsOrConfig: `# Запуск Process Explorer от администратора с проверкой подписей
procexp64.exe /e

# Поиск в консоли через родственную утилиту Handle (кто держит файл base.1cd)
handle64.exe "1Cv8.1CD" -accepteula`,
    level: 'Junior',
    tags: ['Sysinternals', 'Process Explorer', 'Handles', 'DLL', 'VirusTotal', 'Windows'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-sysinternals-procmon',
    section: 'Системная диагностика',
    category: 'Microsoft Sysinternals Suite',
    title: 'Process Monitor (procmon): трассировка реестра, ФС и ошибок ACCESS DENIED',
    shortSummary: 'Перехват в реальном времени тысяч операций обращения программ к файлам, веткам реестра и процессам.',
    description: `Process Monitor объединяет возможности старых Filemon и Regmon, записывая каждое обращение приложений к файловой системе, реестру, сети и потокам в реальном времени. За секунду генерируются десятки тысяч событий, поэтому главная техника работы — жесткая фильтрация (Filter -> Process Name is ..., Result is ACCESS DENIED / NAME NOT FOUND).

Позволяет также включить Boot Logging (запись всех событий с самого раннего этапа загрузки Windows, чтобы понять, какой драйвер подвешивает старт).`,
    practicalUsage: 'Поиск причины падения или ошибки "Отказано в доступе" / "Не найден файл", когда логи самой программы ничего не говорят (например, программа ищет DLL или ключ реестра по неочевидному пути).',
    commandsOrConfig: `# Ключевые фильтры для моментальной диагностики в Process Monitor:
Process Name   is   1cv8.exe        -> Include
Result         is   ACCESS DENIED   -> Include
Result         is   NAME NOT FOUND  -> Include

# Запуск сбора трассировки из скрипта в фоне на 60 секунд
procmon64.exe /Quiet /Minimized /BackingFile C:\\Temp\\trace.pml`,
    level: 'Middle',
    tags: ['Sysinternals', 'Process Monitor', 'procmon', 'ACCESS DENIED', 'Реестр', 'Диагностика'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-sysinternals-autoruns',
    section: 'Системная диагностика',
    category: 'Microsoft Sysinternals Suite',
    title: 'Autoruns: тотальный аудит всех точек автозапуска Windows',
    shortSummary: 'Инструмент №1 для обнаружения скрытой автозагрузки (реестр, службы, драйверы, WMI, планировщик, Winlogon).',
    description: `В отличие от вкладки "Автозагрузка" в Диспетчере задач, Autoruns сканирует более 40 скрытых механизмов автозапуска: ключи Run/RunOnce, службы и драйверы ядра, задачи Планировщика (Scheduled Tasks), расширения Проводника, Winlogon/AppInit DLLs, WMI-подписки и Image File Execution Options.

Вкладка Options -> Hide Microsoft Entries / Hide Windows Entries позволяет сразу отсеять системные компоненты ОС и увидеть только сторонний и подозрительный софт.`,
    practicalUsage: 'Реагирование на инциденты ИБ (проверка закрепления злоумышленника Persistence), чистка тормозящих терминальных серверов RDS от лишнего фонового ПО.',
    commandsOrConfig: `# Консольный аудит автозагрузки (autorunsc) с проверкой подписей и выгрузкой в CSV
autorunsc64.exe -a * -c -h -s -v -accepteula > C:\\Temp\\autoruns_audit.csv`,
    level: 'Junior',
    tags: ['Sysinternals', 'Autoruns', 'Автозагрузка', 'ИБ', 'Troubleshooting'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-sysinternals-tcpview-pstools',
    section: 'Системная диагностика',
    category: 'Microsoft Sysinternals Suite',
    title: 'TCPView, PsExec, RAMMap и Sysmon (Sysinternals Suite)',
    shortSummary: 'Мониторинг сокетов в реальном времени, удаленное выполнение команд в домене, анализ памяти и аудит Sysmon.',
    description: `Пакет Sysinternals включает еще ряд незаменимых инструментов:
- TCPView — наглядная карта всех открытых TCP/UDP соединений с привязкой к процессам и скоростью трафика в реальном времени (подсветка новых зеленым, закрываемых красным).
- PsExec / PsTools — выполнение команд на удаленных ПК в домене по протоколу SMB без предварительно настроенного WinRM (включая запуск от имени SYSTEM ключом -s).
- RAMMap — детальная карта распределения физической оперативной памяти (выявление утечек драйверов ядра Nonpaged Pool или Metafile).
- Sysmon (System Monitor) — системная служба, пишущая глубокую телеметрию безопасности (хеши запускаемых EXE, сетевые коннекты, изменение файлов) в Event Log для SIEM.`,
    practicalUsage: 'Удаленное лечение компьютеров в сети, выявление причин 99% занятой памяти при пустом списке процессов (утечка в Nonpaged Pool / драйвере) и построение SOC-мониторинга на базе Sysmon.',
    commandsOrConfig: `# Запуск интерактивного cmd на удаленном ПК от имени локальной системы
psexec64.exe \\\\PC-ACCOUNTING-01 -s cmd

# Принудительное выполнение GPUpdate на удаленной станции
psexec64.exe \\\\PC-ACCOUNTING-01 gpupdate /force

# Запуск всех инструментов Sysinternals напрямую по WebDAV без скачивания
\\\\live.sysinternals.com\\tools\\procexp64.exe`,
    level: 'Middle',
    tags: ['Sysinternals', 'TCPView', 'PsExec', 'RAMMap', 'Sysmon', 'Windows'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
];
