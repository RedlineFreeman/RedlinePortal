import { KnowledgeEntry } from '../../types/knowledgeBase';

export const DATABASES_EXTENDED_ENTRIES: KnowledgeEntry[] = [
  // ==================== ФУНДАМЕНТ И SQL ====================
  {
    id: 'kb-db-acid-cap-base',
    section: 'Базы данных',
    category: 'Фундамент и Архитектура БД',
    title: 'ACID, BASE и теорема CAP: выбор между строгостью и масштабом',
    shortSummary: 'Фундаментальные гарантии реляционных транзакций (ACID) против компромиссов распределенных кластеров (CAP/PACELC).',
    description: `ACID описывает 4 свойства надежной транзакции в классических СУБД (PostgreSQL, MySQL InnoDB, MS SQL):
- Atomicity (Атомарность): транзакция выполняется целиком или не выполняется вовсе («всё или ничего»).
- Consistency (Согласованность): ограничения целостности (FOREIGN KEY, CHECK, UNIQUE) никогда не нарушаются.
- Isolation (Изолированность): параллельные транзакции не портят промежуточные данные друг друга.
- Durability (Долговечность): подтвержденные (COMMIT) данные не пропадут при сбое питания (благодаря WAL / Redo Log).

Теорема CAP (Brewer) для распределенных БД гласит, что при разделении сети (Partition Tolerance — P, неизбежном в распределенных системах) кластер должен выбрать либо Consistency (CP — строгая согласованность на всех узлах, как etcd/Patroni Sync), либо Availability (AP — узел ответит даже устаревшими данными, модель BASE, как Cassandra/DynamoDB).`,
    practicalUsage: 'Проектирование банковских систем и биллинга (строгий ACID / CP), либо глобальных каталогов, счетчиков и лент новостей с высокой доступностью (BASE / AP).',
    commandsOrConfig: `-- Классическая атомарная транзакция перевода средств (SQL)
BEGIN;
  UPDATE accounts SET balance = balance - 1000 WHERE id = 101 AND balance >= 1000;
  UPDATE accounts SET balance = balance + 1000 WHERE id = 202;
COMMIT; -- Если возникнет сбой на 2-й строке, ROLLBACK вернет баланс 101-го счета`,
    level: 'Junior',
    tags: ['Базы данных', 'ACID', 'CAP', 'BASE', 'Транзакции', 'Архитектура'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-isolation-levels',
    section: 'Базы данных',
    category: 'Фундамент и Архитектура БД',
    title: 'Уровни изоляции транзакций (Read Committed, Repeatable Read, Serializable)',
    shortSummary: 'Как СУБД защищаются от Dirty Read, Non-Repeatable Read, Phantom Read и Write Skew при параллельной нагрузке.',
    description: `Стандарт SQL определяет 4 уровня изоляции, балансирующих между скоростью и защитой от аномалий:
1. Read Uncommitted: разрешает «грязное чтение» незафиксированных изменений других транзакций (в PostgreSQL фактически работает как Read Committed).
2. Read Committed (по умолчанию в PostgreSQL и Oracle): каждый SELECT видит только данные, закоммиченные до начала этого запроса. Возможны неповторяемое чтение и фантомы.
3. Repeatable Read (по умолчанию в MySQL InnoDB): снимок данных (Snapshot) фиксируется на момент начала всей транзакции — повторные SELECT вернут те же строки. В PostgreSQL на этом уровне нет и фантомов, но возможна аномалия Write Skew.
4. Serializable: самая строгая изоляция — результат эквивалентен последовательному выполнению транзакций. При конфликте СУБД откатывает одну из них с ошибкой serialization_failure (приложение обязано уметь делать Retry).`,
    practicalUsage: 'Предотвращение двойного списания бонусов/денег при одновременных запросах, корректный расчет складских остатков и финансовой отчетности.',
    commandsOrConfig: `-- Просмотр текущего уровня изоляции по умолчанию (PostgreSQL)
SHOW default_transaction_isolation;

-- Явное повышение изоляции для критической финансовой транзакции
BEGIN ISOLATION LEVEL REPEATABLE READ;
  SELECT balance FROM wallets WHERE user_id = 42;
  -- Логика проверки и обновления
COMMIT;`,
    level: 'Middle',
    tags: ['Базы данных', 'Isolation Levels', 'Read Committed', 'Serializable', 'MVCC', 'SQL'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-normalization-oltp-olap',
    section: 'Базы данных',
    category: 'Фундамент и Архитектура БД',
    title: 'Нормальные формы БД (1NF, 2NF, 3NF, BCNF), денормализация и OLTP vs OLAP',
    shortSummary: 'Правила проектирования схем без аномалий обновления и выбор между строковыми OLTP и аналитическими OLAP моделями.',
    description: `Нормализация устраняет дублирование данных и аномалии при вставке/удалении:
- 1NF: все значения атомарны (нет списков внутри одной ячейки вроде "tag1, tag2"), нет повторяющихся групп колонок.
- 2NF: таблица в 1NF и каждый неключевой столбец зависит от ВСЕГО составного первичного ключа целиком.
- 3NF: таблица в 2NF и нет транзитивных зависимостей (неключевые поля не зависят от других неключевых полей — например, город клиента не хранят в таблице заказов, а выносят в справочник).
- BCNF (форма Бойса-Кодда): любой детерминант является потенциальным ключом.

Денормализация — осознанное дублирование полей (например, хранение кэшированного поля total_sum в таблице заказов) ради ускорения тяжелых чтений без JOIN. Это подводит к разделению нагрузок: OLTP (множество быстрых точечных INSERT/UPDATE/SELECT, высокая нормализация) и OLAP (сложные агрегации по миллиардам строк, схемы «Звезда» и «Снежинка»).`,
    practicalUsage: 'Проектирование таблиц веб-сервисов и ERP (3NF), оптимизация витрин отчетов и дашбордов (денормализация / OLAP).',
    commandsOrConfig: `-- Пример 3NF: заказы ссылаются на клиента по внешнему ключу (без дублирования ФИО и адреса)
CREATE TABLE customers (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL
);`,
    level: 'Junior',
    tags: ['Базы данных', 'Нормализация', '3NF', 'OLTP', 'OLAP', 'Проектирование БД'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== POSTGRESQL ADVANCED ====================
  {
    id: 'kb-db-pgbouncer-pooling',
    section: 'Базы данных',
    category: 'PostgreSQL & Пулинг',
    title: 'PgBouncer: пулинг соединений PostgreSQL (Session, Transaction, Statement)',
    shortSummary: 'Снижение накладных расходов на процессы Postgres и обслуживание тысяч клиентских подключений без исчерпания RAM.',
    description: `Каждое прямое подключение к PostgreSQL запускает отдельный OS-процесс (~5–10 МБ RAM) и перегружает планировщик ядра при сотнях активных сессий. PgBouncer выступает легким прокси-пулером перед PostgreSQL, удерживая пул из 20–100 реальных соединений к БД и мультиплексируя через них тысячи клиентских подключений.

Режимы пулинга:
- session (по умолчанию): соединение БД отдается клиенту до отключения (совместимо со всем, но малоэффективно).
- transaction: соединение возвращается в пул сразу после COMMIT/ROLLBACK — оптимальный режим для микросервисов и веб-приложений. (Важно: не работают сессионные SET, LISTEN/NOTIFY и старые prepared statements без pool_mode настройки).
- statement: возврат в пул после каждого SQL-запроса (мультизапросные транзакции запрещены).`,
    practicalUsage: 'Высоконагруженные веб-проекты, кластеры Kubernetes с сотнями подов приложений, защита PostgreSQL от ошибки "FATAL: sorry, too many clients already".',
    commandsOrConfig: `# /etc/pgbouncer/pgbouncer.ini
[databases]
prod_db = host=127.0.0.1 port=5432 dbname=prod_db

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
pool_mode = transaction
max_client_conn = 2000
default_pool_size = 50

# Подключение к админ-консоли PgBouncer для статистики пулов
psql -p 6432 -U pgbouncer pgbouncer -c "SHOW POOLS; SHOW STATS;"`,
    level: 'Middle',
    tags: ['PostgreSQL', 'PgBouncer', 'Connection Pooling', 'Highload', 'Базы данных'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-patroni-ha-cluster',
    section: 'Базы данных',
    category: 'PostgreSQL & Пулинг',
    title: 'Patroni, etcd и HAProxy: отказоустойчивый кластер PostgreSQL с авто-failover',
    shortSummary: 'Построение High-Availability кластера Postgres без Split-Brain на базе распределенного консенсуса DCS.',
    description: `Обычная потоковая репликация PostgreSQL не умеет автоматически переключать Primary при падении сервера. Для этого применяют Patroni — оркестратор на Python, который запускается рядом с каждым узлом PostgreSQL и координирует состояние через распределенное key-value хранилище DCS (обычно etcd или Consul на 3/5 узлах по алгоритму Raft).

Leader (Primary) регулярно продлевает «лиз» (TTL lease) в etcd. Если Primary умирает и не продлевает блокировку, здоровые реплики проводят выборы нового лидера (учитывая актуальность LSN WAL), и самый свежий узел повышается до Primary. Балансировщик HAProxy опрашивает REST API Patroni (порт 8008: GET /primary и GET /replica) и автоматически направляет трафик записи только на текущего Primary.`,
    practicalUsage: 'Критически важные корпоративные базы, 24/7 веб-сервисы и финтех-платформы, где время восстановления (RTO) при падении сервера должно составлять менее 15–30 секунд.',
    commandsOrConfig: `# Проверка статуса кластера и отставания реплик через patronictl
patronictl -c /etc/patroni/patroni.yml list

# Плановое переключение Primary (Switchover) без потери данных
patronictl -c /etc/patroni/patroni.yml switchover

# Проверка REST API Patroni (200 OK только на Primary)
curl -s -o /dev/null -w "%{http_code}\\n" http://10.0.0.11:8008/primary`,
    level: 'Senior',
    tags: ['PostgreSQL', 'Patroni', 'etcd', 'HAProxy', 'Failover', 'High Availability'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-locks-deadlocks-stats',
    section: 'Базы данных',
    category: 'PostgreSQL & Пулинг',
    title: 'Блокировки (Locks), Deadlocks и pg_stat_statements в PostgreSQL',
    shortSummary: 'Диагностика зависших запросов, графов ожиданий (pg_blocking_pids), взаимных блокировок и поиск самых дорогих SQL-запросов.',
    description: `Хотя в PostgreSQL чтения не блокируют запись (MVCC), операции изменения таблиц (ALTER TABLE берет AccessExclusiveLock!) или одновременное обновление одних и тех же строк вызывают очереди блокировок. При циклической зависимости (транзакция A ждет строку B, а транзакция B ждет строку A) возникает Deadlock — через deadlock_timeout (обычно 1 сек) Postgres прерывает одну из транзакций.

Расширение pg_stat_statements собирает агрегированную статистику всех выполненных запросов в кластере (общее время total_exec_time, число вызовов, прочитанные блоки shared_blks_read), позволяя точно найти главный источник нагрузки на CPU/Disk I/O.`,
    practicalUsage: 'Поиск причины "все зависло после миграции", выявление N+1 запросов и тяжелых FULL SCAN запросов в продакшене.',
    commandsOrConfig: `-- Поиск кто кого блокирует прямо сейчас
SELECT pid, usename, state, wait_event_type, wait_event,
       pg_blocking_pids(pid) AS blocked_by, left(query, 90) AS query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;

-- Топ-10 самых тяжелых запросов по суммарному времени (pg_stat_statements)
SELECT calls, round(total_exec_time::numeric, 1) AS total_ms,
       round(mean_exec_time::numeric, 2) AS avg_ms, left(query, 100)
FROM pg_stat_statements
ORDER BY total_exec_time DESC LIMIT 10;`,
    level: 'Middle',
    tags: ['PostgreSQL', 'Locks', 'Deadlock', 'pg_stat_statements', 'Диагностика', 'Траблшутинг'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== РЕПЛИКАЦИЯ, ШАРДИРОВАНИЕ И БЭКАПЫ ====================
  {
    id: 'kb-db-replication-topologies',
    section: 'Базы данных',
    category: 'Репликация и Масштабирование',
    title: 'Репликация БД: Master-Replica (Async/Sync), Logical и защита от Split-Brain',
    shortSummary: 'Сравнение физической и логической репликации, асинхронного vs синхронного коммита, RPO/RTO и проблемы отставания реплик.',
    description: `Репликация решает две задачи: отказоустойчивость (High Availability) и масштабирование чтения (Read Scaling).
- Асинхронная репликация: Master подтверждает COMMIT клиенту сразу после записи в свой локальный журнал, не дожидаясь реплики. Минимальная задержка записи, но при внезапной гибели Master последние миллисекунды транзакций теряются (RPO > 0).
- Синхронная репликация (synchronous_commit = on / remote_apply): Master ждет подтверждения минимум от 1 Standby-узла (RPO = 0, но падает скорость записи на величину сетевого RTT).
- Физическая (потоковая по WAL/binlog) копирует бинарные блоки 1-в-1; Логическая репликация передает изменения на уровне таблиц/строк (позволяет реплицировать между разными мажорными версиями СУБД для Zero-Downtime апгрейда).`,
    practicalUsage: 'Вынесение тяжелых аналитических SELECT-отчетов на Read-реплику, бесшовное обновление PostgreSQL 14 -> 17 без длительного простоя, географически распределенное резервирование.',
    commandsOrConfig: `-- Проверка отставания (Replication Lag) на Primary в PostgreSQL
SELECT client_addr, state, sync_state,
       pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS lag_bytes
FROM pg_stat_replication;

-- Создание публикации для логической репликации выбранных таблиц
CREATE PUBLICATION pub_analytics FOR TABLE orders, payments;`,
    level: 'Middle',
    tags: ['Репликация', 'Master-Replica', 'Logical Replication', 'RPO', 'RTO', 'Базы данных'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-partitioning-sharding',
    section: 'Базы данных',
    category: 'Репликация и Масштабирование',
    title: 'Партиционирование (Partitioning) и Шардирование (Sharding) больших таблиц',
    shortSummary: 'Горизонтальное разбиение таблиц на сотни миллионов строк (Range/List/Hash) внутри одного узла и распределение по серверам.',
    description: `Когда таблица логов или транзакций перерастает сотни гигабайт, даже B-Tree индекс перестает помещаться в RAM, а VACUUM/удаление старых строк (DELETE) парализует диск.
- Партиционирование (Declarative Partitioning): логически одна таблица делится физически на секции (например, по месяцам Range или по ID Hash) на одном сервере. Запрос с фильтром по дате сканирует только нужную партицию (Partition Pruning), а удаление данных за прошлый год выполняется мгновенно через DROP TABLE / DETACH PARTITION без фрагментации.
- Шардирование: разнесение партиций (шардов) по РАЗНЫМ физическим серверам (Citus для Postgres, Vitess для MySQL, встроенный sharding в MongoDB/ClickHouse), когда не хватает CPU/диска одного сервера на запись.`,
    practicalUsage: 'Таблицы телеметрии, аудита, чеков, финансовых проводок и исторических заказов, растущие на десятки гигабайт в месяц.',
    commandsOrConfig: `-- Декларативное Range-партиционирование по дате в PostgreSQL
CREATE TABLE audit_logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ NOT NULL,
  action TEXT NOT NULL
) PARTITION BY RANGE (created_at);

CREATE TABLE audit_logs_2026_11 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-11-01') TO ('2026-12-01');`,
    level: 'Senior',
    tags: ['Partitioning', 'Sharding', 'Масштабирование', 'PostgreSQL', 'Highload', 'Citus'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-enterprise-backup-pitr',
    section: 'Базы данных',
    category: 'Резервное копирование и Надёжность',
    title: 'Промышленные бэкапы и PITR: pgBackRest, Barman и Percona XtraBackup',
    shortSummary: 'Инкрементальное и дифференциальное копирование многотерабайтных БД в S3 с шифрованием и проверкой восстановления.',
    description: `Утилиты pg_dump/mysqldump хорошо подходят для баз до 50–100 ГБ, но на базах от 500 ГБ+ логический дамп и особенно его восстановление занимают сутки. В продакшене применяют физическое инкрементальное резервное копирование:
- pgBackRest (PostgreSQL): поддерживает Full / Differential / Incremental бэкапы на уровне измененных страниц, параллельное сжатие zstd, шифрование AES-256 и прямую выгрузку в S3/MinIO вместе с непрерывной архивацией WAL для PITR.
- Percona XtraBackup (MySQL / MariaDB): выполняет горячий физический бэкап InnoDB без блокировки записи.

Золотое правило DBA: непроверенный бэкап считается несуществующим — регулярный автотест восстановления на стенд обязателен.`,
    practicalUsage: 'Обеспечение регламентных RPO < 1 минуты (благодаря WAL-архиву) и быстрого восстановления больших продакшн-кластеров после сбоев или ошибочного DELETE без WHERE.',
    commandsOrConfig: `# pgBackRest: создание инкрементального бэкапа и проверка целостности
sudo -u postgres pgbackrest --stanza=prod --type=incr backup
sudo -u postgres pgbackrest --stanza=prod info

# Восстановление PostgreSQL на точную секунду (PITR) перед ошибкой
sudo -u postgres pgbackrest --stanza=prod --type=time \\
  --target="2026-11-15 10:14:55+03" --target-action=promote restore`,
    level: 'Senior',
    tags: ['pgBackRest', 'XtraBackup', 'PITR', 'Бэкапы', 'S3', 'Disaster Recovery'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== NOSQL, АНАЛИТИКА И ПОИСК ====================
  {
    id: 'kb-db-mongodb-nosql',
    section: 'Базы данных',
    category: 'NoSQL, Кэш и Оптимизация',
    title: 'MongoDB: документная модель (BSON), Replica Set, шардинг и индексы',
    shortSummary: 'Хранение гибких JSON/BSON документов без жесткой схемы, автоматический failover Replica Set и управление WiredTiger.',
    description: `MongoDB — ведущая документно-ориентированная NoSQL СУБД, хранящая записи в виде бинарных JSON-документов (BSON) в коллекциях. В отличие от SQL, структура документов внутри одной коллекции может эволюционировать без блокирующих миграций ALTER TABLE. Движок хранения WiredTiger обеспечивает сжатие документов и блокировки на уровне документа.

Для отказоустойчивости развертывается Replica Set (обычно 3 узла: 1 Primary и 2 Secondary с журналом операций oplog), а при нехватке места/IOPS включается горизонтальное шардирование через маршрутизаторы mongos и Config Servers.`,
    practicalUsage: 'Каталоги товаров e-commerce с разнородными характеристиками, профили пользователей, метаданные контента, быстрое прототипирование и хранение событий.',
    commandsOrConfig: `# Проверка статуса Replica Set и задержки репликации в mongosh
rs.status()
rs.printSecondaryReplicationInfo()

# Создание составного индекса в фоне и анализ плана запроса
db.events.createIndex({ userId: 1, createdAt: -1 })
db.events.find({ userId: 105 }).explain("executionStats")`,
    level: 'Middle',
    tags: ['MongoDB', 'NoSQL', 'BSON', 'Replica Set', 'WiredTiger', 'Базы данных'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-clickhouse-olap',
    section: 'Базы данных',
    category: 'Аналитические и Поисковые БД',
    title: 'ClickHouse: колоночная аналитическая СУБД (MergeTree) для логов и OLAP',
    shortSummary: 'Молниеносная аналитика миллиардов строк, сжатие данных до 10x и семейство движков MergeTree.',
    description: `В обычных OLTP-базах (Postgres/MySQL) данные лежат построчно, и запрос SELECT sum(bytes) FROM logs вынужден считывать с диска все колонки таблицы. ClickHouse хранит каждую колонку в отдельном сжатом файле (LZ4/ZSTD), векторизованно обрабатывая данные на всех ядрах CPU — это ускоряет аналитические запросы в 100–1000 раз.

Основной движок — семейство MergeTree (ReplacingMergeTree, SummingMergeTree, ReplicatedMergeTree). В ClickHouse данные принято вставлять крупными батчами (1000+ строк за раз), а частые точечные UPDATE/DELETE по одной строке противопоказаны.`,
    practicalUsage: 'Хранилище кликстрима, веб-аналитики, телеметрии IoT, биллинговой статистики, централизованный сбор логов и метрик (в связке с Vector / Fluent Bit / Kafka).',
    commandsOrConfig: `-- Создание партиционированной таблицы логов на движке MergeTree
CREATE TABLE http_logs (
  ts DateTime,
  status UInt16,
  host LowCardinality(String),
  latency_ms UInt32
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(ts)
ORDER BY (host, ts)
TTL ts + INTERVAL 90 DAY; -- Автоудаление старых данных через 90 дней`,
    level: 'Middle',
    tags: ['ClickHouse', 'OLAP', 'MergeTree', 'Колоночная БД', 'Аналитика', 'Big Data'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-elasticsearch-opensearch',
    section: 'Базы данных',
    category: 'Аналитические и Поисковые БД',
    title: 'Elasticsearch / OpenSearch: инвертированный индекс, шарды, ILM и анализ логов',
    shortSummary: 'Распределенный поисковый и аналитический движок на базе Apache Lucene для полнотекстового поиска и стека ELK.',
    description: `Elasticsearch и его открытый форк OpenSearch строят инвертированный индекс (как предметный указатель в конце книги: слово → список ID документов), что позволяет находить совпадения по морфологии, опечаткам (fuzzy search) и фразам за миллисекунды среди терабайтов текста.

Каждый индекс разбивается на Primary Shards (обеспечивают горизонтальное масштабирование) и Replica Shards (защита от потери узла и ускорение чтения). Для контроля роста дисков в логах настраивают ILM / ISM (Index Lifecycle Management): горячие индексы (Hot) ротируются по размеру/дню и автоматически удаляются (Delete) после истечения срока хранения. Важно не допускать Oversharding (тысячи мелких шардов по несколько мегабайт съедают Heap JVM).`,
    practicalUsage: 'Полнотекстовый поиск по каталогу товаров/документации, централизованное хранение логов инфраструктуры (ELK / EFK / Graylog) и SIEM-аналитика безопасности.',
    commandsOrConfig: `# Проверка здоровья кластера (green / yellow / red) и состояния шардов
curl -s "http://localhost:9200/_cluster/health?pretty"
curl -s "http://localhost:9200/_cat/shards?v&h=index,shard,prirep,state,store" | head

# Поиск документов через REST API
curl -s -X GET "http://localhost:9200/app-logs-*/_search?pretty" \\
  -H "Content-Type: application/json" \\
  -d '{"query":{"match":{"level":"ERROR"}},"size":5}'`,
    level: 'Middle',
    tags: ['Elasticsearch', 'OpenSearch', 'ELK', 'Lucene', 'Полнотекстовый поиск', 'Логи'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== МИГРАЦИИ И БЕЗОПАСНОСТЬ БД ====================
  {
    id: 'kb-db-migrations-zerodowntime',
    section: 'Базы данных',
    category: 'Эксплуатация и Безопасность БД',
    title: 'Миграции схем БД (Flyway, Liquibase, Alembic) и Zero-Downtime изменения',
    shortSummary: 'Версионирование DDL-изменений в Git и безопасное изменение таблиц под нагрузкой без блокировки продакшена.',
    description: `Ручное выполнение ALTER TABLE на боевой базе приводит к рассинхрону окружений и простоям. Для воспроизводимого изменения структуры таблиц используют инструменты миграций (Flyway, Liquibase, Alembic, Drizzle Kit, Prisma Migrate), хранящие пронумерованные SQL/код скрипты в Git и таблицу истории миграций в самой БД.

Правила Zero-Downtime миграций:
1. Никогда не переименовывайте и не удаляйте используемую колонку одним шагом — используйте паттерн Expand & Contract (добавить новую колонку -> дублировать запись в коде -> перенести старые данные батчами -> переключить чтение -> удалить старую колонку позже).
2. Задавайте lock_timeout перед DDL, чтобы ALTER TABLE не встал в вечную очередь, заблокировав все последующие SELECT (эффект домино в Postgres).
3. Индексы создавайте только с CONCURRENTLY.`,
    practicalUsage: 'Безопасный CI/CD деплой новых версий бэкенда без остановки сервиса (Rolling Update) при работе со старой и новой версией схемы одновременно.',
    commandsOrConfig: `-- Безопасное добавление nullable-колонки с тайм-аутом блокировки (PostgreSQL)
SET lock_timeout = '3s';
ALTER TABLE users ADD COLUMN phone_verified_at TIMESTAMPTZ NULL;

-- Добавление CHECK-ограничения без длительной блокировки таблицы (в 2 шага)
ALTER TABLE orders ADD CONSTRAINT chk_amount_pos CHECK (amount > 0) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT chk_amount_pos;`,
    level: 'Senior',
    tags: ['Миграции БД', 'Flyway', 'Liquibase', 'Zero-Downtime', 'DDL', 'CI/CD'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-db-security-rls-tls',
    section: 'Базы данных',
    category: 'Эксплуатация и Безопасность БД',
    title: 'Безопасность СУБД: принцип минимальных привилегий, TLS, RLS и аудит',
    shortSummary: 'Защита баз данных от компрометации: разделение ролей, шифрование трафика, Row-Level Security и логирование DDL.',
    description: `База данных — главная цель атак, поэтому подключать веб-приложение под суперпользователем (postgres / root / sa) категорически запрещено. Минимальный стандарт защиты СУБД:
- Разделение ролей: отдельная роль-мигратор (владелец таблиц, право DDL) и рабочая роль приложения (только SELECT, INSERT, UPDATE, DELETE без права CREATE/DROP).
- Сетевая изоляция и TLS: прослушивание только приватного VLAN/localhost, жесткие правила pg_hba.conf (hostssl + scram-sha-256), принудительное шифрование трафика TLS 1.3 / mTLS.
- Row-Level Security (RLS): встроенная фильтрация строк на уровне ядра СУБД (клиент видит только строки своего tenant_id даже при ошибке в SQL-запросе приложения).
- Аудит: расширение pgaudit для фиксации всех DDL, смены прав и обращений к персональным данным.`,
    practicalUsage: 'Соответствие требованиям 152-ФЗ / GDPR / PCI DSS, защита мультитенантных SaaS-систем от утечек данных между клиентами.',
    commandsOrConfig: `-- Создание ограниченной роли для веб-приложения в PostgreSQL
CREATE ROLE app_runtime WITH LOGIN PASSWORD 'StrongRandomPassword!';
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO app_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_runtime;

-- Включение Row-Level Security (RLS) для изоляции клиентов (tenant_id)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON documents
  USING (tenant_id = current_setting('app.current_tenant')::uuid);`,
    level: 'Middle',
    tags: ['Безопасность БД', 'TLS', 'RLS', 'pgaudit', 'PostgreSQL', 'Least Privilege'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
