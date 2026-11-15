import { KnowledgeEntry } from '../../types/knowledgeBase';

export const ENTERPRISE_1C_AND_OFFICE_ENTRIES: KnowledgeEntry[] = [
  // ==================== 1С:ПРЕДПРИЯТИЕ ====================
  {
    id: 'kb-1c-cluster-architecture',
    section: '1С:Предприятие',
    category: 'Архитектура и Сервер 1С',
    title: 'Кластер серверов 1С:Предприятие 8.3 (ragent, rmngr, rphost)',
    shortSummary: 'Трехзвенная архитектура 1С: клиент -> сервер приложений (процессы агента, менеджера и рабочих процессов) -> СУБД.',
    description: `В корпоративном клиент-серверном режиме платформа 1С:Предприятие 8.3 работает в трехуровневой архитектуре:
1) Клиент (Тонкий, Веб или Толстый) — отрисовывает интерфейс и общается с сервером по бинарному протоколу или HTTP.
2) Кластер серверов 1С состоит из трех ключевых служб/процессов:
   - ragent (Агент сервера, порт TCP 1540) — точка входа, запускает и контролирует менеджеры кластера и рабочие процессы.
   - rmngr (Менеджер кластера, порт TCP 1541) — управляет балансировкой нагрузки, распределяет сеансы, хранит кэш метаданных и лицензии.
   - rphost (Рабочий процесс, порты 1560–1591) — непосредственно исполняет встроенный бизнес-код 1С и взаимодействует с СУБД (PostgreSQL / MS SQL).
3) Сервер СУБД — хранит таблицы, транзакции и индексы.`,
    practicalUsage: 'Настройка отказоустойчивых кластеров из нескольких серверов rphost, разделение ролей серверов (отдельный rphost под тяжелые фоновые задания и веб-сервисы), диагностика утечек памяти рабочих процессов.',
    commandsOrConfig: `# Проверка статуса службы сервера 1С в Linux (srv1cv83 / srv1cv8-8.3...)
sudo systemctl status srv1cv8-8.3.25.1394@default
ss -tulpn | grep -E "1540|1541|156"

# Проверка процессов ragent, rmngr, rphost в Linux
ps aux | grep -E "ragent|rmngr|rphost"`,
    level: 'Middle',
    tags: ['1С', 'ragent', 'rmngr', 'rphost', 'Кластер 1С', 'Архитектура'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-1c-file-vs-client-server',
    section: '1С:Предприятие',
    category: 'Архитектура и Сервер 1С',
    title: 'Файловый режим 1С vs Клиент-Серверный: выбор и миграция',
    shortSummary: 'Сравнение работы с файлом 1Cv8.1CD по SMB и серверной СУБД: пороги масштабирования, риски и переезд на сервер.',
    description: `В файловом варианте вся база данных лежит в одном файле 1Cv8.1CD на общем сетевом диске (SMB). Каждый пользовательский компьютер сам открывает этот файл и выполняет вычисления. При росте базы свыше 4–8 ГБ или работе более 5–10 одновременных пользователей резко возрастают сетевые блокировки, база замедляется, а обрыв сети в момент записи может физически повредить файл 1Cv8.1CD.

Клиент-серверный режим переносит логику на мощный сервер приложений 1С, а хранение данных — в полноценную транзакционную СУБД (PostgreSQL или MS SQL), обеспечивая высокую скорость, безопасность и надежность ACID при десятках и тысячах пользователей.`,
    practicalUsage: 'Обоснование руководству перехода на сервер 1С + PostgreSQL (или публикацию файловой базы через Apache/IIS для снижения риска порчи 1Cv8.1CD по SMB), плановый перенос базы через выгрузку .dt.',
    commandsOrConfig: `# Проверка целостности поврежденной файловой базы утилитой chdbfl.exe (Windows)
"C:\\Program Files\\1cv8\\8.3.25.1394\\bin\\chdbfl.exe"

# Пакетный запуск выгрузки базы в .dt через командную строку
"C:\\Program Files\\1cv8\\8.3.25.1394\\bin\\1cv8.exe" DESIGNER /S"srv-1c\\buh" /N"Admin" /P"Pass" /DumpIB "D:\\Backups\\buh.dt"`,
    level: 'Junior',
    tags: ['1С', '1Cv8.1CD', 'chdbfl', 'Клиент-сервер', 'Миграция', 'SMB'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-1c-web-publish-apache-nginx',
    section: '1С:Предприятие',
    category: 'Архитектура и Сервер 1С',
    title: 'Публикация 1С через Apache / IIS и проксирование через Nginx HTTPS',
    shortSummary: 'Настройка модуля wsap24, файла default.vrd, публикация веб-клиента и HTTP-сервисов 1С за Reverse Proxy.',
    description: `Публикация информационной базы на веб-сервере (Apache 2.4 или Microsoft IIS) позволяет пользователям заходить в 1С прямо через браузер (Веб-клиент) или подключаться тонким клиентом по протоколу HTTPS без открытия внутренних бинарных портов 1540–1591 в интернет!

Модуль расширения Apache (wsap24.so / wsap24.dll) транслирует запросы в кластер 1С согласно описанию в файле default.vrd (указывается строка подключения Ref=...;Srvr=...). Впереди Apache обычно ставят Nginx для терминации TLS-сертификатов Let's Encrypt, защиты от брутфорса и отдачи WebSocket-трафика.`,
    practicalUsage: 'Организация безопасной удаленной работы бухгалтеров и менеджеров с 1С без VPN и терминальных серверов, публикация OData и REST API 1С для интеграции с сайтами.',
    commandsOrConfig: `# Публикация базы 1С на веб-сервере Apache в Linux утилитой webinst
sudo /opt/1cv8/x86_64/8.3.25.1394/webinst -publish -apache24 \\
  -wsdir buh -dir /var/www/1c/buh \\
  -connstr "Srvr=127.0.0.1;Ref=buh_db;" \\
  -confpath /etc/apache2/mods-available/1c.conf

# Пример фрагмента default.vrd
<?xml version="1.0" encoding="UTF-8"?>
<point xmlns="http://v8.1c.ru/8.2/virtual-resource-system"
       base="/buh" ib="Srvr=127.0.0.1;Ref=buh_db;" enable="true"/>`,
    level: 'Middle',
    tags: ['1С', 'Apache', 'Nginx', 'default.vrd', 'webinst', 'Веб-клиент'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-1c-postgresql-tuning',
    section: '1С:Предприятие',
    category: 'Производительность и Администрирование 1С',
    title: 'Оптимизация PostgreSQL и MS SQL для работы с 1С:Предприятие',
    shortSummary: 'Обязательные патчи PostgresPro, параметры postgresql.conf (enable_mergejoin, temp_buffers), регулярный VACUUM/REINDEX.',
    description: `Стандартный ванильный PostgreSQL плохо оптимизирован под специфичные запросы 1С с временными таблицами, поэтому в продакшене используют специальную сборку PostgreSQL для 1С (от компании 1С или PostgresPro) либо настраивают ключевые параметры планировщика.

В частности, для 1С критичны настройки: shared_buffers (25% RAM), temp_buffers (64–256MB под временные таблицы), work_mem (32–128MB), standard_conforming_strings = off, escape_string_warning = off, max_locks_per_transaction = 256 и агрессивный autovacuum + еженедельный VACUUM FULL / REINDEX в окно простоя для предотвращения деградации скорости проведения документов.`,
    practicalUsage: 'Устранение хронических тормозов при закрытии месяца и формировании отчетов в 1С:ERP и 1С:Бухгалтерия.',
    commandsOrConfig: `# Рекомендуемые параметры postgresql.conf для кластера 1С (пример на 32 GB RAM)
shared_buffers = 8GB
effective_cache_size = 24GB
work_mem = 64MB
temp_buffers = 128MB
max_locks_per_transaction = 256
standard_conforming_strings = off
synchronous_commit = off   # ускоряет запись, риск потери последних 0.2-1с при сбое питания`,
    level: 'Senior',
    tags: ['1С', 'PostgreSQL', 'PostgresPro', 'Тюнинг', 'VACUUM', 'Базы данных'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-1c-ras-rac-techlog',
    section: '1С:Предприятие',
    category: 'Производительность и Администрирование 1С',
    title: 'Администрирование 1С: RAS/RAC, Технологический журнал (ТЖ) и лицензии',
    shortSummary: 'Управление кластером 1С через консоль rac (вместо GUI Windows), файл logcfg.xml и программные/HASP лицензии.',
    description: `На Linux-серверах нет графической оснастки администрирования кластера (MMC), поэтому управление выполняется через сервер администрирования RAS (порт 1545) и консольную утилиту rac (Remote Administration Client). Через rac можно смотреть активные сеансы, сбрасывать зависшие соединения, блокировать регламентные задания и проверять выданные лицензии.

Технологический журнал (ТЖ), настраиваемый через XML-файл logcfg.xml, позволяет поймать точные причины взаимных блокировок (Deadlocks — события TDEADLOCK/TTIMEOUT) и самых долгих SQL-запросов (CALL, DBPOSTGRS/DBMSSQL). Программные лицензии привязываются к ключевым параметрам железа (CPU/RAM/UUID/MAC) — изменение железа ВМ требует переактивации пин-кода.`,
    practicalUsage: 'Администрирование серверов 1С на Astra Linux / Ubuntu Server, ночной перезапуск с выбросом зависших сеансов перед резервным копированием, расследование блокировок проведения документов.',
    commandsOrConfig: `# Запуск сервера RAS и список информационных баз через rac
/opt/1cv8/x86_64/8.3.25.1394/ras cluster --daemon
rac cluster list
rac infobase summary list --cluster=<CLUSTER_UUID>

# Просмотр списка активных сеансов и принудительное завершение сеанса
rac session list --cluster=<CLUSTER_UUID>
rac session terminate --cluster=<CLUSTER_UUID> --session=<SESSION_UUID>`,
    level: 'Middle',
    tags: ['1С', 'RAC', 'RAS', 'Технологический журнал', 'Deadlock', 'Лицензии HASP'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== EXCEL ====================
  {
    id: 'kb-excel-lookup-formulas',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Excel',
    title: 'Ключевые формулы Excel: XLOOKUP (ПРОСМОТРХ), ВПР, ИНДЕКС+ПОИСКПОЗ и СУММЕСЛИМН',
    shortSummary: 'Сопоставление таблиц, многокритериальное суммирование и поиск данных без ошибок #Н/Д.',
    description: `Функции подстановки и агрегации — главный инструмент при работе с прайсами, выгрузками из 1С и инвентаризацией:
- ВПР (VLOOKUP) — классический поиск значения в первом столбце таблицы справа, ограниченный тем, что столбец поиска обязан быть крайним левым.
- ИНДЕКС + ПОИСКПОЗ (INDEX/MATCH) — гибкая связка, ищущая в любом направлении без поломки при вставке столбцов.
- ПРОСМОТРХ (XLOOKUP) — современная замена ВПР с поиском влево/вправо, встроенной обработкой ошибок ("Не найдено") и поиском снизу вверх.
- СУММЕСЛИМН / СЧЁТЕСЛИМН (SUMIFS / COUNTIFS) — суммирование и подсчет по нескольким условиям одновременно, а ЕСЛИОШИБКА (IFERROR) скрывает системные ошибки.`,
    practicalUsage: 'Сверка номенклатуры между двумя таблицами (поиск расхождений в инвентаризации компьютеров и лицензий), расчет бюджетов по отделам, обработка выгрузок логов.',
    commandsOrConfig: `// Поиск отдела сотрудника по табельному номеру (XLOOKUP с подстановкой при отсутствии)
=ПРОСМОТРХ(A2; Справочник!A:A; Справочник!D:D; "Не найден")

// Классическая связка INDEX + MATCH (работает во всех версиях Excel/LibreOffice)
=ЕСЛИОШИБКА(ИНДЕКС(Справочник!$C$2:$C$500; ПОИСКПОЗ(A2; Справочник!$A$2:$A$500; 0)); "Нет данных")

// Сумма затрат на IT только по филиалу "Москва" за 2026 год
=СУММЕСЛИМН(D2:D1000; B2:B1000; "Москва"; C2:C1000; ">=01.01.2026")`,
    level: 'Junior',
    tags: ['Excel', 'XLOOKUP', 'ВПР', 'VLOOKUP', 'INDEX-MATCH', 'Формулы'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-excel-pivot-tables',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Excel',
    title: 'Сводные таблицы (Pivot Tables), группировка и Срезы (Slicers)',
    shortSummary: 'Мгновенная агрегация сотен тысяч строк отчетов без единой формулы, вычисляемые поля и интерактивные фильтры.',
    description: `Сводная таблица (Вставка -> Сводная таблица) позволяет за пару кликов сгруппировать массив из сотен тысяч строк по категориям, датам (кварталы/месяцы/дни) и отделам, автоматически посчитав суммы, средние, доли в % и уникальные значения (через Модель данных).

Перед созданием сводной таблицы исходные данные рекомендуется превратить в "Умную таблицу" (Ctrl+T) — тогда при добавлении новых строк сводная таблица обновится автоматически без изменения диапазона. Визуальные Срезы (Slicers) и Временные шкалы (Timelines) превращают лист Excel в интерактивный дашборд для руководства.`,
    practicalUsage: 'Анализ заявок Service Desk (SLA, количество инцидентов по категориям и исполнителям), агрегация биллинга телефонии/облака, сводка инвентаризации ПО.',
    commandsOrConfig: `# Чек-лист правильной подготовки данных для Pivot Table:
1. Одна строка заголовков (без объединенных ячеек и пустых столбцов).
2. Каждый столбец строго одного типа (только даты, только числа, только текст).
3. Преобразование диапазона в Умную таблицу: Ctrl + T.
4. Горячая клавиша быстрого обновления всех сводных таблиц: Ctrl + Alt + F5.`,
    level: 'Junior',
    tags: ['Excel', 'Pivot Tables', 'Сводные таблицы', 'Slicers', 'Аналитика'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-excel-power-query',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Excel',
    title: 'Power Query (ETL в Excel): объединение CSV/JSON/SQL и очистка данных',
    shortSummary: 'Автоматический импорт, трансформация, Unpivot и склейка десятков файлов из папки по нажатию одной кнопки «Обновить».',
    description: `Power Query (вкладка Данные -> Получить данные) — встроенный ETL-движок (Extract-Transform-Load) внутри Excel и Power BI на языке M. Он записывает шаги обработки (удаление пустых строк, разделение столбцов, замена ошибок, преобразование кросс-таблиц Unpivot, объединение Merge/Append как SQL JOIN/UNION) и воспроизводит их автоматически.

Позволяет подключиться напрямую к целой папке с десятками ежемесячных CSV-выгрузок, к базе PostgreSQL/MS SQL или к JSON/XML API и собрать чистую таблицу без единого макроса VBA.`,
    practicalUsage: 'Автоматизация рутинных еженедельных отчетов: вместо 3 часов ручного копирования и чистки выгрузок из 1С/Active Directory достаточно положить новый файл в папку и нажать "Обновить всё".',
    commandsOrConfig: `// Пример шага фильтрации и преобразования на языке Power Query (M)
let
    Source = Csv.Document(File.Contents("C:\\Reports\\ad_export.csv"), [Delimiter=";", Encoding=65001]),
    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    FilteredActive = Table.SelectRows(PromotedHeaders, each ([Enabled] = "True")),
    SplitDomain = Table.SplitColumn(FilteredActive, "Email", Splitter.SplitTextByDelimiter("@"))
in
    SplitDomain`,
    level: 'Middle',
    tags: ['Excel', 'Power Query', 'ETL', 'CSV', 'Язык M', 'Автоматизация'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-excel-validation-vba',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Excel',
    title: 'Условное форматирование, Проверка данных, Защита и макросы VBA',
    shortSummary: 'Выпадающие списки, визуальное выделение аномалий, блокировка ячеек от случайного удаления формул и основы VBA.',
    description: `Чтобы пользователи не портили общие шаблоны Excel, применяются три механизма:
1) Проверка данных (Data Validation) — запрещает ввод некорректных значений (выпадающие списки из справочника, ограничение по диапазону дат/чисел).
2) Условное форматирование — автоматическая подсветка просроченных дедлайнов, дубликатов или критических отклонений (>90% заполнения диска).
3) Защита листа — снятие галочки "Защищаемая ячейка" только с полей ввода, после чего остальные ячейки с формулами защищаются паролем от перезаписи.
Макросы VBA (.xlsm) позволяют автоматизировать нестандартные операции (генерация PDF по каждой строке, рассылка писем через Outlook), но требуют осторожности из-за рисков ИБ.`,
    practicalUsage: 'Создание корпоративных форм заявок и калькуляторов с защитой формул, автоматическая раскраска отчетов мониторинга.',
    commandsOrConfig: `' Базовый цикл макроса VBA для экспорта листов книги в PDF
Sub ExportSheetsToPDF()
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:="C:\\Temp\\" & ws.Name & ".pdf"
    Next ws
End Sub`,
    level: 'Middle',
    tags: ['Excel', 'VBA', 'Data Validation', 'Условное форматирование', 'Защита листа'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },

  // ==================== MICROSOFT OFFICE ====================
  {
    id: 'kb-office-odt-deployment',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Office & Корпоративная среда',
    title: 'Развертывание Microsoft Office LTSC / M365 через Office Deployment Tool (ODT)',
    shortSummary: 'Настройка XML-конфигурации для тихой корпоративной установки (Click-to-Run), выбор приложений и языковых пакетов.',
    description: `Современные корпоративные версии Office (LTSC 2021/2024 и Microsoft 365 Apps) используют технологию Click-to-Run (C2R) вместо старых MSI-установщиков. Для централизованного скачивания и тихой установки администратор применяет утилиту Office Deployment Tool (setup.exe) с файлом configuration.xml.

В XML-файле задаются: архитектура (64-bit), канал обновлений, исключаемые ненужные программы (ExcludeApp, например Groove/Teams/Publisher), автоматическое принятие EULA и путь к локальной сетевой шаре, чтобы сотни ПК не качали гигабайты из интернета.`,
    practicalUsage: 'Массовая установка и переустановка Microsoft Office через SCCM, Intune, Ansible или logon-скрипты GPO.',
    commandsOrConfig: `<!-- Файл configuration.xml для тихой установки Word, Excel, Outlook, PowerPoint -->
<Configuration>
  <Add OfficeClientEdition="64" Channel="PerpetualVL2021">
    <Product ID="ProPlus2021Volume">
      <Language ID="ru-ru" />
      <ExcludeApp ID="Access" />
      <ExcludeApp ID="Publisher" />
      <ExcludeApp ID="OneDrive" />
    </Product>
  </Add>
  <Display Level="None" AcceptEULA="TRUE" />
</Configuration>

# Скачивание и тихая установка из локального кэша
setup.exe /download configuration.xml
setup.exe /configure configuration.xml`,
    level: 'Middle',
    tags: ['Microsoft Office', 'ODT', 'Click-to-Run', 'LTSC', 'M365', 'Деплой'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-office-kms-adba',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Office & Корпоративная среда',
    title: 'Корпоративная активация Office и Windows: KMS-сервер и ADBA',
    shortSummary: 'Автоматическая активация в изолированных и корпоративных сетях через службу KMS (порт 1688) или домен AD (ADBA).',
    description: `В корпоративной сети с Volume-лицензиями вместо ввода индивидуальных ключей MAK используются два механизма:
1) KMS (Key Management Service) — выделенный внутренний сервер с установленным KMS-хостом. Рабочие станции автоматически находят его по DNS SRV-записи _vlmcs._tcp и активируются каждые 7 дней (срок действия активации 180 дней). Требуется порог активации (минимум 5 хостов для активации Office / серверов и 25 для клиентских Windows).
2) ADBA (Active Directory-Based Activation) — хранит объект активации прямо в домене AD DS, не требует отдельного KMS-сервера и пороговых счетчиков.`,
    practicalUsage: 'Автоматическая активация Windows и Microsoft Office в закрытых корпоративных контурах без выхода рабочих станций в интернет.',
    commandsOrConfig: `# Проверка статуса лицензии и адреса KMS сервера через скрипт ospp.vbs
cscript "C:\\Program Files\\Microsoft Office\\Office16\\ospp.vbs" /dstatus

# Принудительное указание KMS-хоста и запуск активации Office
cscript ospp.vbs /sethst:kms.corp.local
cscript ospp.vbs /act`,
    level: 'Middle',
    tags: ['Microsoft Office', 'KMS', 'ADBA', 'ospp.vbs', 'Лицензирование', 'AD'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-office-gpo-security',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Office & Корпоративная среда',
    title: 'Управление безопасностью Office через GPO (ADMX-шаблоны и макросы VBA)',
    shortSummary: 'Централизованная защита от вредоносных документов: блокировка макросов из интернета, Protected View и ASR.',
    description: `Документы Office с макросами VBA (XLSM/DOCM) — один из главных векторов доставки шифровальщиков и троянов по почте. После импорта официальных ADMX-шаблонов Office в Central Store контроллера домена (\\\\corp.local\\SYSVOL\\corp.local\\Policies\\PolicyDefinitions) администратор может политиками GPO жестко запретить выполнение неподписанных макросов, заблокировать макросы в файлах из интернета (Mark-of-the-Web) и включить принудительный Защищенный просмотр (Protected View) для вложений Outlook.`,
    practicalUsage: 'Соответствие стандартам информационной безопасности, исключение случайного запуска вредоносных вложений сотрудниками бухгалтерии.',
    commandsOrConfig: `# Ключевые политики в GPO (User Configuration -> Administrative Templates -> Microsoft Office):
- Trust Center -> Block macros from running in Office files from the Internet -> Enabled
- Trust Center -> VBA Macro Notification Settings -> Disable all except digitally signed macros
- Protected View -> Do not open files in Unsafe Locations -> Enabled`,
    level: 'Middle',
    tags: ['Microsoft Office', 'GPO', 'ADMX', 'Макросы', 'Protected View', 'ИБ'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
  {
    id: 'kb-office-outlook-autodiscover',
    section: 'Офисные пакеты и Аналитика',
    category: 'Microsoft Office & Корпоративная среда',
    title: 'Администрирование Microsoft Outlook: OST vs PST, Autodiscover и профили',
    shortSummary: 'Настройка автоматического подключения к почтовому серверу, кэшированный режим Exchange и лечение поврежденных баз scanpst.',
    description: `Outlook хранит локальную почту в двух форматах:
- OST (.ost) — зашифрованный локальный кэш почтового ящика Exchange/IMAP, привязанный к конкретному профилю и ПК (при потере удаляется и перекачивается с сервера).
- PST (.pst) — автономный архивный файл переносимых писем (может превышать лимит 50 ГБ и тормозить/повреждаться при размещении на сетевых шарах SMB!).

Для автоматической настройки почты по вводу только email и пароля используется служба Autodiscover (через запись DNS autodiscover.domain.com или SRV _autodiscover._tcp). Режим Cached Exchange Mode ускоряет работу при плохом интернете, но на терминальных серверах RDS его часто отключают или ограничивают периодом в 1–3 месяца для экономии диска.`,
    practicalUsage: 'Массовая настройка почтовых клиентов в домене (Zero-Config Profile через GPO), восстановление битых архивов scanpst.exe, оптимизация места на серверах RDS.',
    commandsOrConfig: `# Запуск Outlook в безопасном режиме (отключение проблемных плагинов/надстроек)
outlook.exe /safe

# Сброс области навигации и представлений при сбоях интерфейса
outlook.exe /resetnavpane

# Восстановление поврежденного архива .pst встроенной утилитой
"C:\\Program Files\\Microsoft Office\\root\\Office16\\SCANPST.EXE"`,
    level: 'Junior',
    tags: ['Microsoft Office', 'Outlook', 'OST', 'PST', 'Autodiscover', 'Exchange'],
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  },
];
