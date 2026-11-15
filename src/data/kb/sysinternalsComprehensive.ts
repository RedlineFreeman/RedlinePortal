import { KnowledgeEntry } from '../../types/knowledgeBase';

export const SYSINTERNALS_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  {
    id: 'kb-sysinternals-suite-overview-live',
    section: 'Системная диагностика',
    category: 'Microsoft Sysinternals Suite',
    title: 'Пакет Microsoft Sysinternals Suite: установка, Sysinternals Live (WebDAV), EULA и карта всех утилит',
    shortSummary: 'Способы мгновенного запуска 70+ утилит Марка Руссиновича без установки, ключи -accepteula и полная классификация пакета.',
    description: `Windows Sysinternals — официальный бесплатный набор из более чем 70 низкоуровневых утилит диагностики, созданный Марком Руссиновичем и Брайсом Когсвеллом (ныне часть Microsoft). Утилиты не требуют инсталляции (portable) и выпускаются в версиях x86 (tool.exe), x64 (tool64.exe) и ARM64 (tool64a.exe).

Способы получения и запуска:
1. Полный архив SysinternalsSuite.zip с learn.microsoft.com/sysinternals (идеально для админской флешки и работы без интернета).
2. Пакетный менеджер Windows (одной командой): winget install Microsoft.Sysinternals.Suite или через Microsoft Store.
3. Sysinternals Live (WebDAV) — запуск любой утилиты напрямую с серверов Microsoft без скачивания, просто введя сетевой путь \\\\live.sysinternals.com\\tools\\ или смонтировав диск (требуется запущенная служба WebClient!).

При автоматическом запуске из скриптов любая утилита Sysinternals по умолчанию показывает окно лицензионного соглашения (EULA) и зависает. Чтобы этого избежать, всегда добавляйте флаг -accepteula (записывает согласие в реестр HKCU\\Software\\Sysinternals).

Все программы пакета официально делятся на 6 категорий:
• Process & Threads (Процессы и память): Process Explorer, Process Monitor, ProcDump, Handle, ListDLLs, VMMap, RAMMap, DebugView, LiveKd, CPUSTRES, Testlimit, ProcFeatures.
• File & Disk (Файлы и диски): Disk2vhd, SDelete, Du, Contig, DiskView, DiskMon, DiskExt, Streams, Junction, MoveFile, PendMoves, Sync, FindLinks, VolumeId, CacheSet, PageDefrag, EFSDump, PipeList.
• Networking (Сеть): TCPView, Tcpvcon, PsPing, Whois, Portmon.
• Security & System (Безопасность и автозагрузка): Autoruns, Sysmon, Sigcheck, AccessChk, AccessEnum, Autologon, LogonSessions, Strings, ShellRunas, RootkitRevealer.
• PsTools (Удаленное управление): PsExec, PsFile, PsGetSid, PsInfo, PsKill, PsList, PsLoggedOn, PsLogList, PsPasswd, PsService, PsShutdown, PsSuspend.
• System Info & Misc (Система и прочее): BGInfo, ZoomIt, RDCMan, Coreinfo, ClockRes, WinObj, RegJump, RegDelNull, Desktops, LoadOrder, ADExplorer, ADInsight, ADRestore, ShareEnum, Ctrl2Cap, Hex2dec, BlueScreen.`,
    practicalUsage: 'Создание единого диагностического комплекта на серверах или сетевой шаре для мгновенного реагирования на инциденты (зависания, утечки памяти, блокировки файлов, атаки ИБ).',
    commandsOrConfig: `# Установка всего пакета Sysinternals через Winget
winget install Microsoft.Sysinternals.Suite

# Включение службы WebClient и запуск через Sysinternals Live без скачивания
net start webclient
\\\\live.sysinternals.com\\tools\\procexp64.exe -accepteula

# Подключение Sysinternals Live как сетевого диска S:
net use S: https://live.sysinternals.com/tools

# Ключ -accepteula для любых CLI-скриптов (убирает диалог лицензии)
handle64.exe -accepteula -a C:\\Data`,
    level: 'Junior',
    tags: ['Sysinternals', 'Sysinternals Live', 'winget', 'accepteula', 'Windows', 'Диагностика'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-sysinternals-pstools-complete',
    section: 'Системная диагностика',
    category: 'Sysinternals: PsTools (Удалённое управление)',
    title: 'Полная инструкция по PsTools: PsExec, PsList, PsKill, PsInfo, PsLoggedOn, PsService, PsFile, PsShutdown и PsSuspend',
    shortSummary: 'Разбор всех 12 консольных утилит набора PsTools для управления локальными и удаленными Windows-ПК по сети (SMB).',
    description: `PsTools — пакет из 12 консольных утилит для управления локальными и удаленными машинами Windows (достаточно стандартного административного доступа по SMB — скрытой шары ADMIN$ и порта 445 TCP, WinRM не обязателен):

1. PsExec — выполнение команд и запуск программ на удаленном ПК. Ключи: -s (запуск от имени NT AUTHORITY\\SYSTEM — высшие права!), -i (интерактивно в сессии пользователя), -c (скопировать локальный .exe на удаленный ПК и удалить после работы), -u DOMAIN\\user -p pass. (Внимание: антивирусы и EDR часто помечают PsExec как инструмент бокового перемещения!).
2. PsKill — жесткое завершение процессов локально или на удаленном ПК по PID или имени; ключ -t убивает всё дерево дочерних процессов (process tree).
3. PsList — просмотр процессов, потоков, CPU и памяти; ключ -t рисует дерево процессов, -m показывает детальную память, -x — потоки и контекстные переключения.
4. PsInfo — сбор сводки о системе: версия ОС, uptime, процессор, ОЗУ; ключи -s (список установленных программ!), -h (установленные патчи/hotfixes), -d (тома дисков).
5. PsService — полное управление службами Windows: query, start, stop, restart, pause, config, depend (зависимости) и security (SDDL-права службы!).
6. PsLoggedOn — показывает, кто сейчас залогинен локально на ПК и кто подключен к его ресурсам по сети (SMB-сессии), либо ищет, на каком компьютере в сети сидит конкретный пользователь!
7. PsFile — показывает список файлов, открытых удаленно по сети, и позволяет принудительно закрыть зависшую блокировку (-c <ID>).
8. PsLogList — быстрая консольная выгрузка журналов Event Log (System, Security, Application) с удаленных машин с фильтрацией по Event ID (-i) и датам.
9. PsPasswd — массовая смена пароля локальной учетной записи (например, локального администратора) на списке удаленных компьютеров из файла (@hosts.txt).
10. PsGetSid — получение уникального SID компьютера или пользователя в домене/локально.
11. PsShutdown — удаленная перезагрузка (-r), выключение (-k), блокировка экрана (-l) или отмена (-a) с таймером и сообщением пользователю.
12. PsSuspend — заморозка (приостановка) и возобновление (-r) любого процесса! Спасает, когда тяжелый процесс загрузил CPU на 100%, но убивать его нельзя — можно временно «поставить на паузу».`,
    practicalUsage: 'Экстренное администрирование в домене при недоступном RDP/WinRM, снятие зависших блокировок 1С/офисных файлов по сети, массовая инвентаризация софта и «заморозка» процессов.',
    commandsOrConfig: `# PsExec: интерактивный cmd с правами SYSTEM или копирование/запуск скрипта
psexec64.exe \\\\PC-01 -s cmd
psexec64.exe @computers.txt -c C:\\Tools\\fix_dns.bat -accepteula

# PsInfo: удаленный список установленного ПО, патчей и дисков
psinfo64.exe \\\\SRV-01 -s -h -d

# PsService: проверка состояния и перезапуск зависшей службы спулера печати
psservice64.exe \\\\SRV-PRINT restart spooler

# PsFile: просмотр заблокированных по сети файлов и закрытие дескриптора #451
psfile64.exe \\\\SRV-FILES
psfile64.exe \\\\SRV-FILES 451 -c

# PsSuspend: поставить процесс на паузу и позже возобновить (-r)
pssuspend64.exe heavy_backup.exe
pssuspend64.exe -r heavy_backup.exe

# PsKill: принудительное убийство дерева зависших процессов Chrome на удаленном ПК
pskill64.exe \\\\PC-05 -t chrome`,
    level: 'Middle',
    tags: ['Sysinternals', 'PsTools', 'PsExec', 'PsService', 'PsKill', 'PsInfo', 'PsSuspend', 'PsLoggedOn'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-sysinternals-process-memory-tools',
    section: 'Системная диагностика',
    category: 'Sysinternals: Процессы, Потоки и Память',
    title: 'Инструкция по утилитам процессов и памяти: ProcDump, VMMap, Handle, ListDLLs, DebugView, LiveKd и RAMMap',
    shortSummary: 'Снятие аварийных дампов памяти при падении или высокой загрузке CPU, поиск утечек памяти, открытых дескрипторов и логов отладки.',
    description: `Помимо Process Explorer и Process Monitor, в категорию Process & Memory входят специализированные диагностические инструменты:

1. ProcDump — консольный инструмент для автоматического создания дампов памяти (.dmp) без остановки сервера. Умеет ловить: пик CPU (-c 80 -s 10), всплеск памяти (-m 4096), зависание окна (-h), необработанное исключение/краш (-e) и завершение процесса (-t). Может зарегистрироваться как системный обработчик падений AeDebug (procdump -i C:\\Dumps).
2. VMMap — глубокий рентген виртуального и физического адресного пространства ОДНОГО конкретного процесса (в отличие от RAMMap, который показывает всю ОС целиком). Разбивает память на Image (EXE/DLL), Private Data, Heap (куча — где чаще всего текут приложения), Stack, Mapped File и Shareable.
3. RAMMap — карта всей физической памяти Windows. Вкладка Use Counts сразу выдает утечку ядра (Driver Locked или огромный Nonpaged Pool!), вкладка File Summary показывает, какие файлы захватили файловый кэш (Metafile/Standby), а меню Empty позволяет безопасно сбросить Standby List без перезагрузки.
4. Handle — консольный аналог поиска дескрипторов Process Explorer: мгновенно показывает, какой процесс держит открытым файл/папку/порт/ключ реестра, и умеет принудительно закрыть конкретный хэндл (-c).
5. ListDLLs — выводит точные пути и версии всех загруженных DLL у процессов; ключ -u показывает ТОЛЬКО неподписанные DLL (быстрый поиск DLL Hijacking / инжектов малвари!).
6. DebugView (Dbgview) — перехватывает и логирует отладочный вывод OutputDebugString (Win32) и сообщения драйверов ядра (Kernel Debug Print) без тяжелой Visual Studio.
7. LiveKd — запускает отладчик ядра WinDbg на «живой» работающей Windows (или создает полный дамп ядра без синего экрана BSoD!).
8. Вспомогательные и стресс-утилиты: ProcFeatures (показывает аппаратные фичи CPU: PAE, NX, VT-x), CPUSTRES (генерация искусственной нагрузки на N потоков CPU), Testlimit (искусственная утечка памяти/хэндлов/GDI для проверки порогов мониторинга), NotMyFault (намеренный вызов BSoD или утечки драйвера для тестирования аварийных дампов).`,
    practicalUsage: 'Разбор причин падения служб 1С/IIS/SQL через ProcDump + WinDbg, поиск утечек памяти в драйверах через RAMMap/VMMap и выявление неподписанных внедренных DLL.',
    commandsOrConfig: `# ProcDump: снять полный дамп (-ma), если процесс w3wp.exe грузит CPU > 85% дольше 10 сек
procdump64.exe -accepteula -ma -c 85 -s 10 w3wp.exe C:\\Dumps\\

# ProcDump: поймать падение (Unhandled Exception) с полным дампом
procdump64.exe -accepteula -ma -e -t 1cv8.exe C:\\Dumps\\

# Handle: найти, кто держит файл D:\\Share\\report.xlsx, и список неподписанных DLL
handle64.exe -accepteula "report.xlsx"
listdlls64.exe -accepteula -u

# LiveKd: снять консистентный живой дамп ядра (через VSS-зеркало) для анализа BSoD/подвисаний
livekd64.exe -o C:\\Dumps\\live_kernel.dmp -ml`,
    level: 'Senior',
    tags: ['Sysinternals', 'ProcDump', 'VMMap', 'RAMMap', 'Handle', 'ListDLLs', 'DebugView', 'LiveKd'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-sysinternals-file-disk-tools',
    section: 'Системная диагностика',
    category: 'Sysinternals: Файлы, Диски и Хранилище',
    title: 'Инструкция по файловым и дисковым утилитам Sysinternals: Disk2vhd, SDelete, Du, Contig, Streams, Junction, Sync и др.',
    shortSummary: 'Полный обзор всех дисковых инструментов Sysinternals: горячая P2V-миграция, зануление свободного места, дефрагментация VHDX и скрытые потоки NTFS.',
    description: `Раздел File & Disk Utilities в Sysinternals решает сложные задачи хранения, миграции и зачистки:

1. Disk2vhd — создает виртуальные диски VHD/VHDX с работающей живой системы Windows (P2V — Physical-to-Virtual) с помощью службы теневого копирования VSS, без остановки сервера! Отличный способ быстро перенести старый физический сервер в Hyper-V (галочка Use Vhdx обязательна для томов >2 ТБ).
2. SDelete (Secure Delete) — безвозвратное затирание удаленных файлов стандартом DoD 5220.22-M. Ключ -z (zero free space) заполняет все свободное пространство диска нулями — ЭТО ОБЯЗАТЕЛЬНЫЙ ШАГ перед сжатием (Compact) динамических виртуальных дисков VHDX/VMDK/QCOW2!
3. Du (Disk Usage) — сверхбыстрый консольный подсчет размера папок (находит, кто забил диск C:), поддерживает уровень вложенности (-l 2) и выгрузку в CSV (-c).
4. Contig — консольный дефрагментатор отдельных файлов/папок (например, базы 1Cv8.1CD или файла VHDX) + умеет создавать непрерывные файлы заданного размера для бенчмарков.
5. Streams — поиск и удаление скрытых альтернативных потоков данных NTFS (Alternate Data Streams, ADS), включая поток Zone.Identifier («Файл получен с другого компьютера — Разблокировать») и скрытые вредоносные пейлоады.
6. Junction — просмотр и создание NTFS-точек соединения (Junctions / Directory Symlinks); незаменима при переносе тяжелых каталогов на другой диск без перенастройки программ.
7. DiskView — графическая карта кластеров тома NTFS: показывает точную физическую фрагментацию и какому файлу принадлежит каждый сектор диска.
8. DiskMon — монитор физических операций чтения/записи LBA-секторов жесткого диска/SSD в реальном времени (в т.ч. превращает значок в трее в «лампочку» активности HDD).
9. DiskExt — показывает точное соответствие букв логических дисков физическим дискам и смещениям разделов (Extents).
10. Sync — принудительный сброс всех кэшированных данных файловой системы с RAM на физический диск (аналог sync в Linux — важно перед жестким снимком или извлечением флешки).
11. MoveFile и PendMoves — позволяют запланировать замену или удаление заблокированного файла (например, системного драйвера) при следующей перезагрузке через реестр PendingFileRenameOperations (PendMoves показывает уже запланированные операции — полезно при аудите обновлений и руткитов!).
12. Прочие: FindLinks (поиск всех жестких ссылок hard links одного файла), VolumeId (изменение серийного номера тома FAT/NTFS), CacheSet (управление размером системного файлового кэша), PageDefrag (дефрагментация pagefile.sys и кустов реестра при загрузке), EFSDump (показывает, кто имеет доступ к EFS-зашифрованному файлу), PipeList (список всех именованных каналов Named Pipes в Windows!).`,
    practicalUsage: 'Очистка забитого диска C: на серверах через Du, перенос старых серверов в Hyper-V через Disk2vhd, уменьшение размера раздутых VHDX через SDelete -z и массовая разблокировка скачанных файлов через Streams.',
    commandsOrConfig: `# Du: топ самых тяжелых папок на 1 уровне глубины в C:\\Users (вывод в CSV)
du64.exe -accepteula -l 1 -c C:\\Users

# SDelete: занулить свободное место диска D: перед сжатием динамического VHDX
sdelete64.exe -accepteula -z D:

# Streams: найти и удалить метку "загружен из интернета" (Zone.Identifier) во всей папке
streams64.exe -s -d C:\\Downloads\\Tools

# Disk2vhd: горячее создание VHDX из командной строки всех локальных томов
disk2vhd64.exe -accepteula * D:\\Backup\\SRV01.vhdx

# Contig: проверка фрагментации и дефрагментация файла базы 1С
contig64.exe -v D:\\1C_Base\\1Cv8.1CD

# PipeList и PendMoves: аудит именованных каналов и отложенных удалений при перезагрузке
pipelist64.exe -accepteula
pendmoves64.exe -accepteula`,
    level: 'Middle',
    tags: ['Sysinternals', 'Disk2vhd', 'SDelete', 'Du', 'Contig', 'Streams', 'Junction', 'PipeList'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-sysinternals-network-ad-tools',
    section: 'Системная диагностика',
    category: 'Sysinternals: Сеть и Active Directory',
    title: 'Сетевые и AD-утилиты Sysinternals: TCPView / Tcpvcon, PsPing, Whois, Portmon, ADExplorer, ADInsight, ADRestore и ShareEnum',
    shortSummary: 'Диагностика сокетов и пропускной способности сети, отладка LDAP-запросов, снимки дерева Active Directory и аудит открытых шар SMB.',
    description: `Инструменты Sysinternals для сетевых инженеров и администраторов Active Directory:

Сетевые утилиты:
1. TCPView и консольный Tcpvcon — отображают все открытые TCP и UDP сокеты с привязкой к процессу, удаленным адресом, состоянием (ESTABLISHED, LISTENING, SYN_SENT, TIME_WAIT) и счетчиками байт/пакетов в реальном времени. Новые соединения подсвечиваются зеленым, закрываемые — красным. Прямо из GUI можно сделать Close Connection (разорвать подозрительную сессию без убийства процесса!).
2. PsPing — многофункциональный тестер сети: ICMP ping с высокой точностью (микросекунды), TCP ping (проверка доступности конкретного порта, например 443 или 1433, аналог Test-NetConnection с гистограммой задержек!), плюс замер пропускной способности (-b) и задержки (-l) в режиме клиент-сервер (как iperf).
3. Whois — консольный клиент WHOIS для быстрого получения регистратора домена и владельца IP-подсети прямо из cmd/PowerShell.
4. Portmon — перехватчик и анализатор трафика последовательных COM-портов (RS-232) и параллельных LPT-портов (незаменим при отладке сканеров штрихкодов, фискальных регистраторов 1С и промышленного оборудования!).

Утилиты Active Directory и сети Windows:
5. ADExplorer — мощный LDAP-браузер для Active Directory. Главная киллер-фича — создание полных снимков базы AD (.snp) с последующим визуальным сравнением (Compare) «что изменилось в лесу между вчера и сегодня», а также редактирование сырых атрибутов и поиск по сложным фильтрам.
6. ADInsight — перехватчик LDAP-запросов на стороне клиента (в реальном времени показывает, какие именно запросы, фильтры и с каким временем ответа шлет на контроллер домена 1С, Outlook или веб-приложение).
7. ADRestore — консольное восстановление удаленных объектов AD из контейнера Tombstone (когда AD Recycle Bin еще не был включен).
8. ShareEnum — быстрое сканирование всего домена или диапазона IP на наличие общих сетевых папок (SMB Shares) с выводом прав доступа (мгновенно находит забытые шары с правом Everyone: Full Control!).`,
    practicalUsage: 'Поиск программ, создающих скрытые сетевые подключения, проверка задержек TCP до SQL-сервера, сравнение состояния AD до и после сбоя через ADExplorer и аудит «дырявых» сетевых шар в офисе.',
    commandsOrConfig: `# Tcpvcon: выгрузка активных сетевых соединений в CSV без GUI
tcpvcon64.exe -accepteula -a -c

# PsPing: 20 замеров задержки TCP-подключения до SQL-сервера (порт 1433) с гистограммой
psping64.exe -accepteula -n 20 -h 5 10.0.10.25:1433

# PsPing: тест реальной пропускной способности канала (на сервере и клиенте)
psping64.exe -s 10.0.10.25:5000
psping64.exe -b -l 64k -n 1000 10.0.10.25:5000

# Whois и ADRestore из консоли
whois64.exe -accepteula 8.8.8.8
adrestore64.exe -r "Ivanov"`,
    level: 'Middle',
    tags: ['Sysinternals', 'TCPView', 'PsPing', 'ADExplorer', 'ADInsight', 'ShareEnum', 'Portmon', 'Whois'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-sysinternals-security-sysmon-sigcheck',
    section: 'Системная диагностика',
    category: 'Sysinternals: Безопасность и Аудит (Sysmon)',
    title: 'Безопасность в Sysinternals: Sysmon (конфиг SIEM), Sigcheck, AccessChk, AccessEnum, Strings, Autologon и LogonSessions',
    shortSummary: 'Глубокий аудит ИБ: телеметрия процессов Sysmon, поиск уязвимых прав служб (AccessChk), проверка подписей с VirusTotal (Sigcheck).',
    description: `Набор утилит безопасности Sysinternals используется как сисадминами, так и специалистами SOC / Threat Hunting:

1. Sysmon (System Monitor) — системная служба и драйвер ядра, пишущий детальнейшую телеметрию безопасности в журнал Microsoft-Windows-Sysmon/Operational (для отправки в SIEM: Wazuh, Splunk, ELK). Ключевые Event ID:
• ID 1: Process Creation (с полной командной строкой, ParentProcess и SHA256-хэшем!).
• ID 3: Network Connection (кто, куда, на какой порт полез).
• ID 7: Image Loaded (загрузка DLL), ID 8: CreateRemoteThread (инжект кода).
• ID 11: FileCreate, ID 12/13/14: изменения реестра, ID 22: DNS-запросы процессов!
2. Sigcheck — консольный аудитор цифровых подписей и версий файлов. С ключами -e -u -vt сканирует все исполняемые файлы, находит неподписанные и автоматически проверяет их хэши в базе VirusTotal! (С ключом -t обновляет/проверяет корневые сертификаты доверия Microsoft!).
3. AccessChk — консольная проверка реальных (эффективных) прав доступа к файлам, папкам, ключам реестра, службам Windows (-c), процессам и объектам ядра. Незаменим для поиска ошибок конфигурации, ведущих к повышению привилегий (например, служба запущена от SYSTEM, а обычный пользователь может перезаписать её .exe или путь!).
4. AccessEnum — простая графическая утилита, сканирующая диск или ветку реестра и показывающая все папки, где права отличаются от родительских (идеально для аудита файлового сервера).
5. Strings — быстрое извлечение всех читаемых ASCII и Unicode строк из бинарного файла, драйвера или дампа памяти (помогает понять назначение неизвестного .exe за 5 секунд).
6. Autologon — безопасно настраивает автоматический вход пользователя Windows при загрузке (шифрует пароль в LSA Secrets, а не хранит его открытым текстом в реестре Winlogon!).
7. LogonSessions — выводит все активные сеансы входа в Windows (Interactive, Network, Service, Batch) и пакет аутентификации (Kerberos/NTLM).
8. ShellRunas (добавляет пункт «Запуск от имени другого пользователя» в контекстное меню Проводника), RootkitRevealer (исторический сканер расхождений API и сырого диска/реестра для поиска руткитов уровня ядра).`,
    practicalUsage: 'Настройка полноценного EDR-подобного логирования на серверах через Sysmon (с конфигом SwiftOnSecurity/olafhartong), поиск закладок через Sigcheck + VirusTotal и аудит прав служб через AccessChk.',
    commandsOrConfig: `# Установка службы Sysmon с XML-конфигурацией и обновление конфига на лету
sysmon64.exe -accepteula -i sysmonconfig.xml
sysmon64.exe -c sysmonconfig.xml

# Sigcheck: проверка всех EXE в C:\\Windows\\Temp и папке запуска на подпись и VirusTotal
sigcheck64.exe -accepteula -e -u -vr -s C:\\Windows\\Temp

# AccessChk: поиск служб, права на изменение которых есть у обычной группы Users / Everyone
accesschk64.exe -accepteula -uwcqv "Authenticated Users" *
accesschk64.exe -accepteula -uwdqs "Users" C:\\ProgramData

# Извлечение строк длиной от 6 символов из подозрительного бинарника
strings64.exe -accepteula -n 6 unknown_tool.exe | findstr /I "http 192.168 cmd powershell"`,
    level: 'Senior',
    tags: ['Sysinternals', 'Sysmon', 'Sigcheck', 'AccessChk', 'AccessEnum', 'Strings', 'Autologon', 'ИБ'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-sysinternals-system-info-misc-tools',
    section: 'Системная диагностика',
    category: 'Sysinternals: Системная информация и Прочие утилиты',
    title: 'Системная информация и утилиты администратора: BGInfo, ZoomIt, RDCMan, Coreinfo, WinObj, RegJump и ClockRes',
    shortSummary: 'Инструменты для повседневной работы сисадмина: обои с параметрами сервера, менеджер RDP, пространство имен ядра, топология CPU и реестр.',
    description: `Завершающие две категории Sysinternals (System Information и Miscellaneous) содержат утилиты, экономящие часы рутины каждый день:

1. BGInfo — генерирует картинку рабочего стола с актуальными системными данными сервера (Имя хоста, IPv4, Шлюз, DNS, CPU, RAM, Свободное место на дисках, Версия ОС, Время загрузки). Настраивается через GPO/автозагрузку на всех серверах, чтобы инженер сразу видел на каком сервере находится, не открывая консоль!
2. RDCMan (Remote Desktop Connection Manager) — официальный легковесный клиент-менеджер от Microsoft для хранения и группировки сотен RDP-подключений в одном окне (дерево серверов, наследование учетных данных, масштабирование экрана, просмотр превью сессий).
3. ZoomIt — незаменимая утилита для демонстраций экрана и обучения: зум экрана (Ctrl+1), рисование поверх любого окна (Ctrl+2), белая/черная доска и таймер перерыва (Ctrl+3).
4. Coreinfo — консольный анализ топологии процессора: сокеты, физические и логические ядра, Hyper-Threading, NUMA-узлы, размеры кэшей L1/L2/L3 и поддержка аппаратной виртуализации (SLAT/EPT, ключ -v).
5. ClockRes — показывает текущее и минимально/максимально возможное разрешение системного таймера Windows (обычно 15.6 мс, при нагрузке снижается до 0.5–1 мс — важно при поиске причин нагрева ноутбука или лагов аудио/игр).
6. WinObj — графический просмотрщик внутреннего пространства имен Object Manager ядра Windows (\Device, \GLOBAL?? — куда монтируются буквы дисков C:, \Driver, \BaseNamedObjects с мьютексами и событиями).
7. RegJump — консольная команда, мгновенно открывающая редактор реестра regedit.exe сразу на нужном длинном пути (или на пути из буфера обмена!) без ручного раскрытия десятков веток.
8. RegDelNull — удаляет битые ключи реестра со встроенными нулевыми байтами (Null characters), которые обычный regedit не может ни открыть, ни удалить.
9. LoadOrder — показывает точный порядок загрузки драйверов и системных служб при старте Windows.
10. Прочие полезные мелочи: Desktops (до 4 независимых рабочих столов в старых Windows/Server без примеси Windows 10 Task View), Ctrl2Cap (переназначение CapsLock в Ctrl на уровне драйвера), Hex2dec (конвертер Hex <-> Dec в консоли), BlueScreen (исторический скринсейвер-розыгрыш BSoD).`,
    practicalUsage: 'Массовое развертывание BGInfo на фермах Windows Server и RDS, управление инфраструктурой через RDCMan, быстрая диагностика NUMA/VT-x через Coreinfo и мгновенная навигация по реестру через RegJump.',
    commandsOrConfig: `# BGInfo: тихое обновление обоев рабочего стола при входе пользователя
bginfo64.exe \\\\corp.local\\NETLOGON\\server_info.bgi /timer:0 /nolicprompt /silent

# Coreinfo: проверка поддержки аппаратной виртуализации и SLAT + топология кэшей
coreinfo64.exe -accepteula -v
coreinfo64.exe -accepteula -c -n

# RegJump: мгновенно открыть Regedit на ветке автозапуска или пути из буфера обмена
regjump.exe HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
regjump.exe -c

# ClockRes и RegDelNull
clockres64.exe -accepteula
regdelnull64.exe HKLM\\Software -s`,
    level: 'Junior',
    tags: ['Sysinternals', 'BGInfo', 'RDCMan', 'ZoomIt', 'Coreinfo', 'WinObj', 'RegJump', 'ClockRes'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
