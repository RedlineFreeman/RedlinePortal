import { KnowledgeEntry } from '../../types/knowledgeBase';

export const WINDOWS_AD_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  // ==================== 1. НАСТРОЙКА AD, ДЕРЕВЬЯ, ЛЕСА, ПОЛЬЗОВАТЕЛИ ====================
  {
    id: 'kb-ad-forests-trees-trusts-setup',
    section: 'Windows & Active Directory',
    category: 'Active Directory: Настройка, Леса и Пользователи',
    title: 'Настройка Active Directory: развёртывание леса (Forest), деревьев (Trees), доменов и доверий (Trusts)',
    shortSummary: 'Пошаговая установка AD DS, повышение контроллеров домена (DC), структура деревьев с разными DNS-именами, уровни DFL/FFL и настройка Trusts.',
    description: `Проектирование и развёртывание Active Directory Domain Services (AD DS) начинается с понимания логической иерархии:
1) Первый домен задаёт имя Леса (Forest Root Domain, например corp.local или ad.company.ru — рекомендуется внутреннее поддоменное имя реального домена). Он хранит единую Схему (Schema) и Конфигурацию всего леса.
2) Добавление доменов в лес (через Мастер AD DS или PowerShell):
   • Дочерний домен (Child Domain) — образует Дерево (Tree) с общим пространством имён (eu.corp.local, siberia.corp.local).
   • Новое дерево в том же лесу (Tree Domain) — дочернее предприятие с другим DNS-именем (partner-holding.local), но с общим лесом, единой схемой и автоматическими двусторонними транзитивными довериями (Tree-Root Trust).
3) Доверительные отношения между РАЗНЫМИ лесами (Trusts):
   • Forest Trust (доверие между лесами) — одно- или двустороннее, позволяет пользователям Леса A получать доступ к ресурсам Леса B (требует настройки DNS Conditional Forwarders между лесами!).
   • External Trust — прямое нетранзитивное доверие между двумя конкретными доменами (например, при слиянии компаний или связи со старым доменом).
4) Functional Levels (FFL/DFL): определяют доступные фичи (например, корзина AD и 32K page database в Windows Server 2025).`,
    practicalUsage: 'Развёртывание первого контроллера домена в новой компании, ввод резервного DC2 (всегда минимум 2 контроллера домена на домен!), объединение филиалов или компаний после поглощения.',
    commandsOrConfig: `# 1. Установка роли AD DS и инструментов управления на чистый Windows Server
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# 2. Создание нового леса и первого контроллера домена (Forest Root DC)
Install-ADDSForest -DomainName "ad.corp.ru" \`
  -DomainNetbiosName "CORP" \`
  -ForestMode "WinThreshold" -DomainMode "WinThreshold" \`
  -InstallDns:$true -SafeModeAdministratorPassword (Read-Host -AsSecureString "DSRM Password")

# 3. Добавление резервного контроллера домена (DC02) в существующий домен
Install-ADDSDomainController -DomainName "ad.corp.ru" -InstallDns:$true -Credential (Get-Credential)

# 4. Создание нового Дерева (Tree) или Дочернего домена в лесу и просмотр доверий (Trusts)
Install-ADDSDomain -NewDomainName "holding.local" -ParentDomainName "ad.corp.ru" -DomainType TreeDomain
Get-ADTrust -Filter * | Format-Table Name, Direction, TrustType, IntraForest`,
    level: 'Middle',
    tags: ['Active Directory', 'Лес', 'Дерево', 'Trusts', 'Install-ADDSForest', 'DC', 'Windows Server'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-ad-sites-subnets-gc-rodc',
    section: 'Windows & Active Directory',
    category: 'Active Directory: Настройка, Леса и Пользователи',
    title: 'Сайты AD (Sites and Services), подсети, Global Catalog (GC) и RODC для филиалов',
    shortSummary: 'Привязка IP-подсетей к сайтам филиалов для локальной аутентификации, настройка межсайтовой репликации и контроллеры только для чтения (RODC).',
    description: `По умолчанию после создания домена существует один сайт Default-First-Site-Name. Если у компании 10 филиалов со своими контроллерами домена, но сайты и подсети НЕ настроены, сотрудники в Екатеринбурге могут случайно аутентифицироваться через контроллер во Владивостоке по медленному VPN!
Физическая топология в AD (оснастка dssite.msc):
• Сайты (Sites) — группы высокоскоростных локальных подсетей (офисы/ЦОД).
• Подсети (Subnets) — привязка IP-адресов (10.20.0.0/24 -> Site-SPB), по которым клиенты находят ближайший к себе DC и ближайшую точку DFS/Exchange.
• Site Links — каналы связи между сайтами со стоимостью (Cost) и расписанием репликации (по умолчанию каждые 180 минут, минимум 15 минут; при наличии галочки Change Notification репликация идёт мгновенно).
• Global Catalog (GC, порты 3268/3269): хранит полные данные своего домена и частичную read-only копию всех объектов других доменов леса — обязателен для поиска по лесу и входа по UPN (user@company.ru).
• RODC (Read-Only Domain Controller): контроллер без записи базы и без кэша всех паролей (кэширует через Password Replication Policy только сотрудников конкретного удалённого офиса) — защита на случай кражи сервера из неохраняемого филиала.`,
    practicalUsage: 'Оптимизация входа пользователей в распределённых филиалах, снижение VPN-трафика репликации AD, безопасная установка локального контроллера на складе или стройплощадке (RODC).',
    commandsOrConfig: `# Создание сайта филиала, привязка подсети и перенос контроллера в нужный сайт
New-ADReplicationSite -Name "Site-SPB"
New-ADReplicationSubnet -Name "10.20.0.0/24" -Site "Site-SPB" -Location "Saint-Petersburg Office"
Move-ADDirectoryServer -Identity "DC-SPB-01" -Site "Site-SPB"

# Настройка расписания межсайтовой репликации (каждые 15 минут)
Set-ADReplicationSiteLink -Identity "DEFAULTIPSITELINK" -ReplicationFrequencyInMinutes 15

# Проверка списка сайтов, подсетей и к какому сайту привязан текущий ПК
Get-ADReplicationSite -Filter * | Select-Object Name
nltest /dsgetsite`,
    level: 'Middle',
    tags: ['Active Directory', 'Sites', 'Subnets', 'Global Catalog', 'RODC', 'Репликация'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-ad-users-computers-lifecycle',
    section: 'Windows & Active Directory',
    category: 'Active Directory: Настройка, Леса и Пользователи',
    title: 'Управление пользователями, компьютерами AD, Корзина (Recycle Bin) и политики паролей FGPP',
    shortSummary: 'Жизненный цикл учётных записей (RSAT ADUC/ADAC + PowerShell), аудит «мёртвых душ», восстановление удалённых объектов и разные пароли через FGPP.',
    description: `Полный цикл администрирования пользователей и компьютеров в Active Directory выполняется через оснастку ADUC (dsa.msc), современный ADAC (dsac.exe) и модуль PowerShell ActiveDirectory:
1) Управление учётными записями (Onboarding / Offboarding): создание пользователя с UPN/SAMAccountName, добавление в группы, перевод между OU, сброс/разблокировка пароля и безопасное отключение при увольнении (Disable-ADAccount + отзыв сессий + перенос в OU=Disabled; удалять сразу нельзя из-за привязки SID к старым документам и почте!).
2) AD Recycle Bin (Корзина AD — включается 1 раз в ADAC или PowerShell, необратимо): позволяет за 5 секунд восстановить случайно удалённого пользователя, группу или целое дерево OU со всеми SID, группами и атрибутами БЕЗ перезагрузки контроллера в режим DSRM!
3) Fine-Grained Password Policies (FGPP / PSO): классическая Domain Password Policy в Default Domain Policy одна на весь домен. Если админам нужны пароли от 14 символов, а обычным юзерам от 8 — в ADAC создаются объекты Password Settings Object (PSO) с привязкой к группам и приоритетом (Precedence).`,
    practicalUsage: 'Ежедневная работа системного администратора: массовый приём/увольнение сотрудников, мгновенный поиск и блокировка неиспользуемых учётных записей (>90 дней без входа), ремонт отвалившегося от домена ПК.',
    commandsOrConfig: `# 1. Включение Корзины Active Directory (делается 1 раз на лес!)
Enable-ADOptionalFeature 'Recycle Bin Feature' -Scope ForestOrConfigurationSet -Target (Get-ADForest).Name

# 2. Восстановление случайно удалённого пользователя из Корзины AD
Get-ADObject -Filter 'Name -like "*Иванов*" -and Deleted -eq $true' -IncludeDeletedObjects | Restore-ADObject

# 3. Создание пользователя, разблокировка и поиск неактивных учётных записей (>90 дней)
New-ADUser -Name "Иван Петров" -SamAccountName "i.petrov" -UserPrincipalName "i.petrov@ad.corp.ru" \`
  -Path "OU=Sales,OU=Users,DC=ad,DC=corp,DC=ru" -Enabled $true -ChangePasswordAtLogon $true \`
  -AccountPassword (ConvertTo-SecureString "TempPass2026!" -AsPlainText -Force)
Unlock-ADAccount -Identity "i.petrov"
Search-ADAccount -AccountInactive -TimeSpan 90.00:00:00 -UsersOnly | Select-Object Name, SamAccountName, LastLogonDate

# 4. Создание усиленной парольной политики (FGPP) для группы Domain Admins
New-ADFineGrainedPasswordPolicy -Name "PSO-Admins" -Precedence 10 -MinPasswordLength 14 -ComplexityEnabled $true -LockoutThreshold 5
Add-ADFineGrainedPasswordPolicySubject -Identity "PSO-Admins" -Subjects "Domain Admins"

# 5. Ремонт доверительных отношений рабочей станции с доменом без вывода из домена
Test-ComputerSecureChannel -Repair -Credential (Get-Credential)`,
    level: 'Junior',
    tags: ['Active Directory', 'Пользователи', 'PowerShell', 'AD Recycle Bin', 'FGPP', 'PSO', 'ADAC'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 2. ПОДРОБНО О ГРУППОВЫХ ПОЛИТИКАХ (GPO) ====================
  {
    id: 'kb-gpo-deep-structure-preferences',
    section: 'Windows & Active Directory',
    category: 'Групповые политики (GPO)',
    title: 'Групповые политики (GPO) в деталях: Policies vs Preferences (GPP), ADMX Central Store, WMI и Loopback',
    shortSummary: 'Внутреннее устройство GPMC: жёсткие политики против гибких Preferences с Item-Level Targeting, центральное хранилище шаблонов и терминальный Loopback.',
    description: `В консоли управления групповыми политиками (gpmc.msc) каждый объект GPO разделён на два корня — Computer Configuration (применяется при запуске ОС) и User Configuration (при входе пользователя), а внутри каждого находятся два принципиально разных раздела:
1) Policies (Политики): записываются в защищённые ветки реестра (\\Policies\\), пользователь не может их поменять через GUI, и при отвязке GPO настройки автоматически откатываются (Tattooing нет). Здесь лежат Administrative Templates (шаблоны .admx/.adml) и Security Settings.
2) Preferences (Предпочтения / GPP): позволяют гибко разворачивать файлы, ключи реестра, ярлыки, задачи планировщика, сетевые диски и принтеры. Важнейшая фича GPP — Item-Level Targeting (нацеливание внутри одной GPO по группе безопасности, модели ноутбука, IP-подсети, версии Windows или файлу на диске!).
3) Central Store (Центральное хранилище ADMX): создаётся папка \\\\domain\\SYSVOL\\domain\\Policies\\PolicyDefinitions — после этого все администраторы видят актуальные шаблоны Windows 11, Chrome, Edge, Microsoft Office и 1С из единой точки.
4) Loopback Processing (Замыкание на себя): на терминальном сервере RDS пользовательские политики (User Config) обычно не зависят от OU, где лежит сервер. Режимы Merge / Replace позволяют применять строгие пользовательские настройки именно в зависимости от того, НА КАКОЙ сервер (OU серверов RDS) зашёл пользователь!`,
    practicalUsage: 'Грамотная архитектура GPO без десятков дублирующих политик (за счёт Item-Level Targeting), управление браузерами и Office через Central Store, жёсткая изоляция терминальных сессий RDS через Loopback.',
    commandsOrConfig: `# 1. Создание Central Store для шаблонов ADMX на контроллере домена
mkdir "\\\\ad.corp.ru\\SYSVOL\\ad.corp.ru\\Policies\\PolicyDefinitions"
xcopy "C:\\Windows\\PolicyDefinitions\\*" "\\\\ad.corp.ru\\SYSVOL\\ad.corp.ru\\Policies\\PolicyDefinitions\\" /E /I /Y

# 2. Создание, линковка к OU и резервное копирование всех GPO через PowerShell
New-GPO -Name "SEC-Workstations-Baseline" | New-GPLink -Target "OU=Workstations,DC=ad,DC=corp,DC=ru"
Backup-GPO -All -Path "D:\\Backups\\GPO\\$(Get-Date -Format yyyy-MM-dd)"

# 3. Пример WMI-фильтра: применять политику ТОЛЬКО на Windows 11 (Build >= 22000)
# WMI Namespace: root\\CIMv2
SELECT * FROM Win32_OperatingSystem WHERE Version LIKE "10.0.22%" OR Version LIKE "10.0.26%"`,
    level: 'Middle',
    tags: ['GPO', 'Group Policy', 'GPP', 'ADMX', 'Central Store', 'Loopback', 'WMI-фильтры', 'Active Directory'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-gpo-security-hardening-software',
    section: 'Windows & Active Directory',
    category: 'Групповые политики (GPO)',
    title: 'Боевая настройка GPO: Безопасность (Hardening, AppLocker, USB), диски/принтеры и деплой ПО',
    shortSummary: 'Чек-лист обязательных корпоративных групповых политик: защита от шифровальщиков, управление локальными админами (LAPS), маппинг дисков и MSI.',
    description: `Практический чек-лист критичных групповых политик, внедряемых в корпоративной сети на базе Active Directory:
1) Контроль локальных администраторов: на всех ПК включается Windows LAPS (Local Administrator Password Solution — пароль локального админа уникален для каждого ПК, регулярно меняется и хранится зашифрованным в AD!), а лишние учётки удаляются через Restricted Groups / GPP Local Users and Groups.
2) Защита от вирусов-шифровальщиков (AppLocker / Software Restriction Policies): запрещает запуск любых .exe, .ps1, .vbs и .bat из пользовательских каталогов %APPDATA%, %TEMP% и папки «Загрузки», разрешая запуск только из Program Files, Windows и по цифровой подписи.
3) Запрет съёмных носителей (USB-флешек): Policies -> Administrative Templates -> System -> Removable Storage Access -> All Removable Storage classes: Deny all access (можно делать исключения по аппаратному Hardware ID!).
4) Сетевая гигиена и Firewall: отключение небезопасных LLMNR (Turn off multicast name resolution) и NBT-NS, принудительный Windows Defender Firewall с правилами для WinRM/RDP/Zabbix, сохранение ключей восстановления BitLocker в AD.
5) Пользовательское окружение: маппинг сетевых дисков (GPP -> Drive Maps, действие Update), развёртывание принтеров и установка .msi пакетов (Software Installation — работает при перезагрузке ПК).`,
    practicalUsage: 'Построение защищённого корпоративного периметра Windows по стандартам Microsoft Security Baselines и CIS Benchmarks, ликвидация инцидентов с флешками и запуском троянов пользователями.',
    commandsOrConfig: `# Ключевые ветки GPO для быстрого поиска в редакторе:
# 1. Отключение LLMNR (защита от перехвата хэшей Responder):
Computer -> Policies -> Admin Templates -> Network -> DNS Client -> Turn off multicast name resolution = Enabled

# 2. Сохранение ключей BitLocker в Active Directory:
Computer -> Policies -> Admin Templates -> Windows Components -> BitLocker -> Store BitLocker recovery information in AD DS = Enabled

# 3. Запрет автозапуска и блокировка USB-накопителей:
Computer -> Policies -> Admin Templates -> System -> Removable Storage Access -> Removable Disks: Deny write/read access = Enabled

# Диагностика проблем применения GPO прямо из журнала событий Windows на клиенте:
Get-WinEvent -LogName "Microsoft-Windows-GroupPolicy/Operational" -MaxEvents 20 | Select-Object TimeCreated, Message`,
    level: 'Middle',
    tags: ['GPO', 'AppLocker', 'LAPS', 'BitLocker', 'USB', 'Security Baseline', 'Hardening', 'MSI'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== 3. ВСЕ ВЕРСИИ WINDOWS, РАЗМЕР, СТРОКИ КОДА И КОМПОНЕНТЫ ====================
  {
    id: 'kb-windows-desktop-versions-complete',
    section: 'Windows & Active Directory',
    category: 'Версии, редакции и архитектура Windows',
    title: 'Все клиентские версии Windows (95 – Windows 11): размер, строки кода, редакции и выбор версии',
    shortSummary: 'Справочник эволюции клиентских Windows: объём на диске, примерное число строк исходного кода, различия Home / Pro / Enterprise / LTSC и назначение.',
    description: `Клиентские ОС Microsoft прошли путь от 16/32-битной гибридной архитектуры DOS (9x) до единого микроядерно-модульного семейства Windows NT:
• Windows 95 / 98 SE / Me (1995–2000): ~15–18 млн строк кода, размер на диске 100–350 МБ. Нет полноценной защиты памяти (BSoD от любого драйвера), нет NTFS. Сейчас только ретро/музеи.
• Windows 2000 (NT 5.0, 2000): ~29 млн строк кода, ~650 МБ – 1 ГБ. Первое массовое внедрение Active Directory и NTFS 3.0.
• Windows XP (NT 5.1, 2001): ~40–45 млн строк кода, ~1.5–3 ГБ после установки. Легендарная скорость, но критически устарела по безопасности (нет DEP/ASLR в ранних, нет поддержки современного TLS/браузеров).
• Windows Vista (NT 6.0, 2006): ~50 млн строк кода, ~12–16 ГБ. Внедрила UAC, WDDM и новый сетевой стек (основа всех последующих Windows).
• Windows 7 (NT 6.1, 2009): ~40 млн строк кода (сокращено после рефакторинга ядра MinWin!), ~16–20 ГБ. Эталонная классика, до сих пор встречается на изолированных станках АСУ ТП, банкоматах и медтехнике.
• Windows 8 / 8.1 (NT 6.2/6.3, 2012–2013): ~50 млн строк кода, ~20 ГБ. Появился Hyper-V клиентский и быстрая загрузка, но спорный интерфейс Metro.
• Windows 10 (NT 10.0, 2015–2025): ~50–55+ млн строк кода, ~20–32 ГБ (64-bit). Лучший универсальный выбор для старого корпоративного парка ПК без TPM 2.0; ветка IoT Enterprise LTSC 2021 поддерживается до 2032 года без функциональных обновлений и Store!
• Windows 11 (NT 10.0, 22H2/23H2/24H2, 2021+): ~55–65+ млн строк кода, ~28–45 ГБ (требует минимум 64 ГБ диска, 4 ГБ RAM, UEFI Secure Boot и TPM 2.0). Лучше всего для новых офисных ПК, гибридных CPU (Intel 12+/AMD) и корпоративной защиты VBS/Credential Guard.

Выбор редакции:
- Home: только дом/личное использование (НЕТ домена AD, gpedit.msc, BitLocker Pro, RDP-сервера и Hyper-V).
- Pro: минимальный стандарт малого бизнеса и разработчиков (есть домен AD, GPO, RDP-сервер, Hyper-V, BitLocker).
- Enterprise / Education: крупный бизнес — добавляет AppLocker, Credential Guard, DirectAccess / BranchCache, гибкую телеметрию, а вариант LTSC полностью очищен от Microsoft Store, Xbox, OneDrive и рекламы!`,
    practicalUsage: 'Обоснование выбора редакций при закупке лицензий (почему в компанию нельзя покупать ноутбуки с Windows Home и когда для терминалов/станков нужна LTSC), расчёт места на SSD для корпоративных образов.',
    commandsOrConfig: `# Проверка точной версии, сборки (Build), редакции и состояния активации в Windows
winver
systeminfo | findstr /B /C:"OS Name" /C:"OS Version" /C:"System Type"
slmgr /xpr     # проверка срока окончания активации (KMS/MAK/Retail)

# Просмотр точного размера установленной папки Windows и очистки кэша обновлений (WinSxS)
DISM /Online /Cleanup-Image /AnalyzeComponentStore
DISM /Online /Cleanup-Image /StartComponentCleanup`,
    level: 'Junior',
    tags: ['Windows 10', 'Windows 11', 'Windows 7', 'LTSC', 'Редакции', 'Строки кода', 'Размер'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-windows-server-versions-complete',
    section: 'Windows & Active Directory',
    category: 'Версии, редакции и архитектура Windows',
    title: 'Все версии Windows Server (2003 – 2025): редакции, размер, варианты установки (Core vs Desktop) и выбор',
    shortSummary: 'Сравнение поколений Windows Server, разница Standard / Datacenter / Essentials, размер на диске (Core ~6 ГБ vs GUI ~20 ГБ) и новые фичи Server 2025.',
    description: `Серверная линейка Windows (также ~50–60+ млн строк кода в современных выпусках на общей базе с клиентскими ОС, но с серверным планировщиком приоритета фоновых служб и оптимизированным сетевым стеком):
• Server 2003 / 2008 R2 / 2012 R2: устаревшие поколения (EOL), встречающиеся в legacy-контурах. В 2008 R2 появился Hyper-V 2.0 и переход исключительно на 64-bit; в 2012 R2 — ReFS v1 и Storage Spaces.
• Server 2016 (EOL расширенной поддержки янв 2027): принёс Docker-контейнеры и Nested Virtualization, но отличается очень медленной установкой накопительных обновлений.
• Server 2019 (поддержка до 2029): проверенный корпоративный «рабочий стандарт» под AD, 1С, Exchange 2019 и RDS; заметно быстрее ставит патчи и поддерживает WSL/Kubernetes.
• Server 2022 (поддержка до 2031): усиленная безопасность Secured-core Server, нативный TLS 1.3, шифрованный DNS-over-HTTPS (DoH), ускоренный TCP HyStart++ и SMB over QUIC (в Azure).
• Server 2025 (новейший выпуск, поддержка до 2034): крупный апгрейд AD (32K page database вместо 8K — до 32 тыс. раз больше пределов объектов, dMSA — делегированные сервисные аккаунты), нативный SMB over QUIC в локальном ЦОД (файловые шары по UDP/443 без VPN!), Hotpatching (патчи без перезагрузки), встроенный sudo и разделение GPU (GPU-P) в Hyper-V.

Варианты установки и размер на диске:
1) Server Core (~6–9 ГБ после установки, потребляет ~600–900 МБ RAM): нет графического рабочего стола и Проводника — управление через PowerShell, WinRM и Windows Admin Center (WAC). Меньше уязвимостей и в 2 раза меньше перезагрузок! Лучший выбор для Контроллеров домена AD, DNS, DHCP, Hyper-V и файловых серверов.
2) Server with Desktop Experience (~16–25 ГБ после установки, +1–1.5 ГБ RAM): полный классический GUI. Лучший выбор для серверов 1С, терминальных ферм RDS и приложений, требующих графический интерфейс.

Редакции (Licensing):
- Essentials: малый офис до 25 пользователей / 50 устройств, без клиентских лицензий CAL (макс. 1 CPU до 10 ядер).
- Standard: до 2 виртуальных машин Windows (OSE) в Hyper-V на 1 полную лицензию (по 16+ ядер). Оптимально для серверов с 1–4 ВМ.
- Datacenter: БЕЗЛИМИТНОЕ число ВМ Hyper-V на хосте + эксклюзивные фичи: Storage Spaces Direct (S2D), Software-Defined Networking (SDN), Shielded VMs.`,
    practicalUsage: 'Выбор версии и редакции при проектировании серверов (расчёт лицензий Hyper-V Standard vs Datacenter), экономия ресурсов за счёт Server Core для контроллеров домена.',
    commandsOrConfig: `# Проверка редакции, варианта установки (Server Core vs Desktop) и доступных лицензий
Get-ItemProperty "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" | Select-Object ProductName, EditionID, InstallationType, CurrentBuildNumber
dism /online /Get-CurrentEdition

# Посмотреть доступные для установки роли/компоненты и какие уже установлены
Get-WindowsFeature | Where-Object {$_.InstallState -eq "Installed"} | Format-Table Name, DisplayName`,
    level: 'Middle',
    tags: ['Windows Server', 'Server 2019', 'Server 2022', 'Server 2025', 'Server Core', 'Datacenter', 'Standard', 'Размер'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-windows-default-features-matrix',
    section: 'Windows & Active Directory',
    category: 'Версии, редакции и архитектура Windows',
    title: 'Что включено в Windows по умолчанию, а что отключено или вырезано (Home, Pro, Enterprise, LTSC, Server)',
    shortSummary: 'Детальная матрица встроенных служб, опциональных компонентов и жёстких ограничений редакций: от SMBv1, Hyper-V и WSL до RDP, BitLocker и ролей Server.',
    description: `Администратор обязан точно знать, какие службы работают «из коробки», какие нужно доустанавливать, а какие физически заблокированы редакцией:

1) Включено по умолчанию в Windows 10/11 (Home / Pro / Enterprise):
   • Windows Defender Antivirus + Firewall, SmartScreen, UAC, сетевой клиент SMBv2/SMBv3 (SMBv3 с шифрованием), клиент DNS/DHCP, PowerShell 5.1, Проводник, Edge.
   • В Home/Pro: Microsoft Store, OneDrive, UWP-приложения (Почта, Xbox, Виджеты, Copilot/Поиск в сети). В Enterprise LTSC: ВСЕ UWP-приложения, Store, Xbox, OneDrive и телеметрия-виджеты отсутствуют по умолчанию!
   • В Windows 11 22H2/24H2: по умолчанию активированы VBS (Virtualization-Based Security) и изоляция ядра HVCI на поддерживаемых CPU.

2) Присутствует в дистрибутиве, но ОТКЛЮЧЕНО по умолчанию (включается вручную в Optional Features / DISM):
   • Hyper-V, WSL 2 (подсистема Linux), Windows Sandbox (Песочница), OpenSSH Server (в новых сборках доступен как Optional Capability), IIS (веб-сервер), .NET Framework 3.5 (часто нужен для старых программ и 1С), Telnet Client, SNMP, RSAT (оснастки управления Active Directory/DNS/GPO — ставятся отдельно!).
   • SMBv1 — по умолчанию полностью выключен/удалён с Windows 10 1709 / Server 2019 из-за критической уязвимости EternalBlue/WannaCry.

3) Жёсткие различия редакций (что ОТСУТСТВУЕТ и нельзя просто включить):
   • В Home вырезаны: присоединение к домену AD DS, gpedit.msc (локальные политики), входящий RDP-сервер, Hyper-V, BitLocker (кроме базового Device Encryption), Assigned Access (режим киоска).
   • Только в Enterprise / Education есть: AppLocker (в Pro правила AppLocker игнорируются!), Credential Guard, UE-V, BranchCache, DirectAccess.

4) В Windows Server по умолчанию vs Роли:
   • После установки Server включены только базовые сетевые службы, Defender и файрвол (причём удалённый рабочий стол RDP по умолчанию ВЫКЛЮЧЕН!).
   • Все серверные роли — AD DS, DNS, DHCP, File Server (FSRM), IIS, Hyper-V, RDS, WSUS, Failover Clustering, Storage Replica — по умолчанию НЕ установлены и добавляются командой Add-WindowsFeature.`,
    practicalUsage: 'Быстрая подготовка эталонного корпоративного образа Windows (Golden Image), включение RSAT/OpenSSH/.NET 3.5 одной командой и диагностика «почему на ПК не работает gpedit / RDP / AppLocker».',
    commandsOrConfig: `# 1. Включение отключённых по умолчанию компонентов в клиентской Windows 10/11 (PowerShell от Админа)
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All -NoRestart
Enable-WindowsOptionalFeature -Online -FeatureName Containers-DisposableClientVM -NoRestart   # Windows Sandbox
wsl --install -d Ubuntu                                                                     # Подсистема WSL 2

# 2. Установка OpenSSH-сервера и инструментов управления AD (RSAT) в Windows 10/11 Pro/Ent
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Add-WindowsCapability -Online -Name Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0
Add-WindowsCapability -Online -Name Rsat.GroupPolicy.Management.Tools~~~~0.0.1.0

# 3. Включение базового RDP и установка ролей на новом Windows Server
Set-ItemProperty -Path 'HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server' -Name "fDenyTSConnections" -Value 0
Enable-NetFirewallRule -DisplayGroup "Remote Desktop"
Install-WindowsFeature -Name AD-Domain-Services, DNS, DHCP -IncludeManagementTools`,
    level: 'Middle',
    tags: ['Windows 10', 'Windows 11', 'Windows Server', 'Home vs Pro', 'LTSC', 'RSAT', 'DISM', 'Компоненты'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
