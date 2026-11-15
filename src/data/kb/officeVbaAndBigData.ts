import { KnowledgeEntry } from '../../types/knowledgeBase';

export const OFFICE_VBA_AND_BIG_DATA_ENTRIES: KnowledgeEntry[] = [
  // ==================== VBA И МАКРОСЫ OFFICE ====================
  {
    id: 'kb-vba-architecture-ide',
    section: 'Офисные пакеты и Аналитика',
    category: 'VBA и Макросы Office',
    title: 'Основы VBA и макросов: редактор VBE (Alt+F11), Sub vs Function, объекты и события',
    shortSummary: 'Синтаксис Visual Basic for Applications, объектная модель Excel (Workbook -> Worksheet -> Range), отладка кода и форматы .xlsm/.xlsb.',
    description: `VBA (Visual Basic for Applications) — встроенный в Microsoft Office событийно-ориентированный язык автоматизации на базе COM-объектов. Среда разработки (VBE) открывается сочетанием Alt + F11.

Ключевые понятия для чистого и предсказуемого кода:
1) Обязательно включайте Option Explicit в первой строке модуля (или Tools -> Options -> Require Variable Declaration): это заставляет объявлять все переменные (Dim) и мгновенно ловит опечатки при компиляции.
2) Типы процедур:
   • Sub (Макрос) — выполняет последовательность действий (форматирование, копирование, сохранение PDF);
   • Function (UDF) — возвращает значение и может вызываться прямо из ячейки Excel как формула (=MyTaxCalc(A2)).
3) Иерархия объектов Excel: Application -> ThisWorkbook (книга с кодом) / ActiveWorkbook -> Worksheets("Отчёт") -> Range("A1:D100") / Cells(строка, столбец).
4) Модули хранения: обычные модули (Modules) — для общих макросов; модули Листов и ЭтаКнига (ThisWorkbook) — для событийных триггеров (Workbook_Open при открытии файла, Worksheet_Change при редактировании ячейки).
5) Книга с макросами обязана сохраняться как .xlsm или двоичный .xlsb (в .xlsx макросы удаляются!).`,
    practicalUsage: 'Написание надёжных корпоративных шаблонов и отчётных инструментов, автоматическое срабатывание проверок при вводе данных пользователем, пошаговая отладка логики через F8 и окно Immediate (Ctrl+G).',
    commandsOrConfig: `Option Explicit

' Стандартный макрос с явной ссылкой на книгу и лист (без ненадёжного .Select / .Activate)
Public Sub FormatReportHeader()
    Dim ws As Worksheet
    Dim lastRow As Long

    Set ws = ThisWorkbook.Worksheets("Продажи")
    ' Надёжный способ найти последнюю заполненную строку в столбце A
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row

    With ws.Range("A1:E1")
        .Font.Bold = True
        .Interior.Color = RGB(30, 58, 138)
        .Font.Color = vbWhite
    End With

    Debug.Print "Обработано строк: " & lastRow  ' Вывод в окно Immediate (Ctrl+G)
End Sub

' Событие автозапуска в модуле ThisWorkbook
Private Sub Workbook_Open()
    MsgBox "Данные готовы к обновлению!", vbInformation, "Система отчётности"
End Sub`,
    level: 'Junior',
    tags: ['VBA', 'Макросы', 'Excel', 'VBE', 'xlsm', 'Отладка', 'События'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-vba-arrays-dictionary-speed',
    section: 'Офисные пакеты и Аналитика',
    category: 'VBA и Макросы Office',
    title: 'Высокопроизводительный VBA для больших таблиц: массивы в RAM, Scripting.Dictionary и отключение UI',
    shortSummary: 'Как ускорить макрос с 10 минут до 0.5 секунды на 200 000 строках: чтение Range в Variant-массив, словарь O(1) и шаблон обработки ошибок.',
    description: `Главная ошибка новичков в VBA — чтение и запись ячеек в цикле по одной (Cells(i, 1).Value). Каждое обращение к объекту Range пересекает границу COM-интерфейса и перерисовывает экран, из-за чего перебор 100 000 строк занимает минуты и вешает Excel.

Золотой стандарт быстрого VBA для больших таблиц:
1) Отключать на время работы макроса перерисовку экрана (ScreenUpdating = False), автопересчёт формул (Calculation = xlCalculationManual) и триггеры событий (EnableEvents = False), обязательно восстанавливая их в блоке выхода/ошибки!
2) Выгружать весь диапазон целиком одним чтением в двумерный массив Variant в оперативной памяти: dataArr = ws.Range("A2:F100000").Value. Обработка массива в RAM быстрее обращения к ячейкам в 100–500 раз! После расчётов результат сбрасывается на лист за одну операцию.
3) Для сверки двух больших таблиц, поиска дубликатов и группировки (аналог быстрого ВПР/СУММЕСЛИМН в коде) использовать объект Scripting.Dictionary (хэш-таблица со сложностью поиска O(1)).`,
    practicalUsage: 'Сверка банковских выписок и прайс-листов на 100 000+ позиций, дедупликация выгрузок из 1С/CRM, массовая перекодировка и очистка сырых данных без зависания интерфейса.',
    commandsOrConfig: `Option Explicit

Public Sub FastProcessBigTable()
    Dim ws As Worksheet
    Dim lastRow As Long, i As Long
    Dim arr As Variant
    Dim dict As Object

    ' 1. Отключаем тормоза интерфейса (Обязательно восстанавливать в CleanExit!)
    Application.ScreenUpdating = False
    Application.EnableEvents = False
    Application.Calculation = xlCalculationManual
    On Error GoTo CleanExit

    Set ws = ThisWorkbook.Worksheets("Данные")
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    If lastRow < 2 Then GoTo CleanExit

    ' 2. Читаем 200 000 строк в RAM за 1 операцию (столбцы A:C)
    arr = ws.Range("A2:C" & lastRow).Value

    ' 3. Агрегация суммы по уникальному ключу (колонка A -> колонка C) через Dictionary
    Set dict = CreateObject("Scripting.Dictionary")
    dict.CompareMode = vbTextCompare ' Регистронезависимый ключ

    For i = 1 To UBound(arr, 1)
        If Not IsEmpty(arr(i, 1)) Then
            dict(arr(i, 1)) = dict(arr(i, 1)) + Val(arr(i, 3))
        End If
    Next i

    ' 4. Мгновенная выгрузка уникальных итогов на лист "Итоги"
    With ThisWorkbook.Worksheets("Итоги")
        .Range("A2").Resize(dict.Count, 1).Value = Application.Transpose(dict.Keys)
        .Range("B2").Resize(dict.Count, 1).Value = Application.Transpose(dict.Items)
    End With

CleanExit:
    If Err.Number <> 0 Then MsgBox "Ошибка: " & Err.Description, vbCritical
    Application.Calculation = xlCalculationAutomatic
    Application.EnableEvents = True
    Application.ScreenUpdating = True
End Sub`,
    level: 'Middle',
    tags: ['VBA', 'Оптимизация', 'Массивы', 'Scripting.Dictionary', 'Большие таблицы', 'Excel'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-vba-files-outlook-udf',
    section: 'Офисные пакеты и Аналитика',
    category: 'VBA и Макросы Office',
    title: 'Практическая автоматизация на VBA: склейка файлов из папки, UDF-формулы, UserForm и Outlook',
    shortSummary: 'Готовые паттерны: пакетный сбор отчётов из десятков книг Excel, создание своих функций листа (UDF) и автоотправка писем.',
    description: `Помимо расчётов внутри одной книги, VBA служит связующим звеном между файловой системой Windows и всеми программами пакета Microsoft Office (Word, Outlook, Access):
• Пакетная обработка файлов (Dir / FileSystemObject): макрос открывает в скрытом режиме по очереди все .xlsx/.csv файлы в выбранной папке (например, отчёты от 30 филиалов), забирает нужные строки в единый сводный лист и закрывает файлы без сохранения.
• Пользовательские функции листа (UDF): любые Public Function в стандартном модуле становятся доступны прямо в формулах Excel (например, сумма прописью, извлечение чисел из текста, проверка ИНН по контрольной сумме). Ограничение: UDF может возвращать значение только в вызвавшую её ячейку и не может менять форматирование других ячеек.
• Автоматизация Outlook: через CreateObject("Outlook.Application") можно автоматически формировать десятки писем с индивидуальным PDF-вложением (акты сверки, расчётные листки) — используйте .Display при отладке и .Send в боевом режиме.`,
    practicalUsage: 'Ежемесячный сбор таблиц филиалов без копипаста, валидация ИНН/СНИЛС формулой в Excel, массовая рассылка персональных счетов/актов контрагентам через корпоративный Outlook.',
    commandsOrConfig: `Option Explicit

' 1. Пользовательская формула Excel (UDF): извлечь только цифры из строки =ExtractDigits(A2)
Public Function ExtractDigits(ByVal txt As String) As String
    Dim i As Long, ch As String, res As String
    For i = 1 To Len(txt)
        ch = Mid$(txt, i, 1)
        If ch Like "[0-9]" Then res = res & ch
    Next i
    ExtractDigits = res
End Function

' 2. Пакетная рассылка сгенерированного PDF через Outlook (Late Binding — без ссылок Tools->References)
Public Sub SendReportViaOutlook(ByVal recipientEmail As String, ByVal pdfPath As String)
    Dim olApp As Object, olMail As Object
    Set olApp = CreateObject("Outlook.Application")
    Set olMail = olApp.CreateItem(0) ' olMailItem = 0

    With olMail
        .To = recipientEmail
        .Subject = "Ежедневный отчёт за " & Format(Date, "dd.mm.yyyy")
        .Body = "Добрый день!" & vbCrLf & "Актуальный отчёт во вложении."
        If Dir(pdfPath) <> "" Then .Attachments.Add pdfPath
        .Display ' Замените на .Send для отправки без подтверждения
    End With
End Sub`,
    level: 'Middle',
    tags: ['VBA', 'UDF', 'Outlook', 'Автоматизация', 'FileSystemObject', 'PDF'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-vba-web-http-json-scraping',
    section: 'Офисные пакеты и Аналитика',
    category: 'VBA и Макросы Office',
    title: 'Импорт данных из интернета через VBA: WinHttpRequest, XMLHTTP, REST API и парсинг XML/JSON',
    shortSummary: 'Отправка HTTP GET/POST запросов прямо из макроса Excel, передача Bearer-токенов, разбор XML курсов ЦБ РФ и работа с JSON.',
    description: `Когда нужно программно по кнопке загрузить данные с веб-сайта или корпоративного REST API, в VBA применяются встроенные COM-библиотеки Windows:
• MSXML2.XMLHTTP.6.0 (или ServerXMLHTTP60 — лучше для корпоративных прокси и таймаутов) — отправляет HTTP/HTTPS запросы и автоматически поддерживает парсинг XML через свойство .responseXML (DOM-дерево + XPath).
• WinHttp.WinHttpRequest.5.1 — позволяет тонко управлять заголовками (Authorization, User-Agent, Content-Type), редиректами и клиентскими SSL-сертификатами без кэширования ответов браузером IE.

Особенности парсинга форматов ответа:
- XML (например, API Центробанка РФ): разбирается нативно за пару строк через selectNodes / selectSingleNode без сторонних библиотек!
- JSON: в VBA нет встроенного JSON-парсера. Для надёжного продакшена в 64-битном Excel подключают open-source модуль JsonConverter.bas (VBA-JSON, работает через Scripting.Dictionary/Collection — избегайте устаревшего MSScriptControl.ScriptControl, который не работает в 64-bit Office!).`,
    practicalUsage: 'Автоматическая загрузка актуальных курсов валют ЦБ РФ по дате документа, проверка статуса контрагентов через DaData/ФНС API по ИНН, отправка уведомлений из Excel в Telegram Bot API.',
    commandsOrConfig: `Option Explicit

' Пример 1: Получение официального курса валюты с сайта ЦБ РФ (XML) по дате без внешних библиотек
Public Function GetCbrRate(ByVal currencyCode As String, ByVal onDate As Date) As Double
    Dim http As Object, xmlDoc As Object, node As Object
    Dim url As String

    url = "https://www.cbr.ru/scripts/XML_daily.asp?date_req=" & Format(onDate, "dd\/mm\/yyyy")
    Set http = CreateObject("MSXML2.ServerXMLHTTP.6.0")
    http.setTimeouts 5000, 5000, 10000, 10000
    http.Open "GET", url, False
    http.Send

    If http.Status = 200 Then
        Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
        xmlDoc.LoadXML http.responseText
        Set node = xmlDoc.SelectSingleNode("//Valute[CharCode='" & currencyCode & "']/VunitRate")
        If Not node Is Nothing Then
            GetCbrRate = CDbl(Replace(node.Text, ".", ",")) ' Для русской локали Excel
        End If
    End If
End Function

' Пример 2: POST-запрос к REST API (например, отправка отчёта или запрос к сервису)
Public Function CallRestApiPost(ByVal url As String, ByVal jsonBody As String, ByVal token As String) As String
    Dim req As Object
    Set req = CreateObject("WinHttp.WinHttpRequest.5.1")
    req.Open "POST", url, False
    req.SetRequestHeader "Content-Type", "application/json; charset=utf-8"
    req.SetRequestHeader "Authorization", "Bearer " & token
    req.Send jsonBody
    CallRestApiPost = req.ResponseText
End Function`,
    level: 'Senior',
    tags: ['VBA', 'WinHttp', 'XMLHTTP', 'REST API', 'JSON', 'XML', 'ЦБ РФ', 'Веб-запросы'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-vba-security-signing-office-scripts',
    section: 'Офисные пакеты и Аналитика',
    category: 'VBA и Макросы Office',
    title: 'Цифровая подпись макросов (SelfCert / УЦ), Доверенные расположения и Office Scripts',
    shortSummary: 'Как легально и безопасно запускать корпоративные макросы при строгих политиках ИБ и чем VBA заменяют в облачном Microsoft 365.',
    description: `Из-за атак шифровальщиков современные настройки Trust Center в Excel жёстко блокируют макросы в файлах из интернета или почты (метка Mark-of-the-Web). Вместо опасного «Включить все макросы», правильная корпоративная архитектура предлагает три решения:
1) Цифровая подпись VBA-проекта: код подписывается сертификатом Code Signing (из корпоративного Active Directory CA для всего домена, или локально утилитой SELFCERT.EXE из папки Office для личного ПК). В VBE: Tools -> Digital Signature. При любом изменении кода чужим лицом подпись сбрасывается.
2) Доверенные расположения (Trusted Locations): выделенная папка на защищённом сервере или ПК, откуда макросы запускаются без лишних предупреждений.
3) Office Scripts (вкладка Автоматизация в Microsoft 365 / Excel Online): современная альтернатива VBA на языке TypeScript. Скрипты хранятся в облаке OneDrive/SharePoint, работают прямо в браузере и могут запускаться по расписанию через Power Automate без участия пользователя.`,
    practicalUsage: 'Выпуск доверенных корпоративных калькуляторов и надстроек .xlam для бухгалтерии, настройка безопасного запуска макросов без конфликтов со службой ИБ, автоматизация веб-версии Excel.',
    commandsOrConfig: `# 1. Локальное создание сертификата подписи макросов (Windows):
"C:\\Program Files\\Microsoft Office\\root\\Office16\\SELFCERT.EXE"

# 2. Снятие блокировки Mark-of-the-Web (MOTW) с доверенного файла из интернета (PowerShell):
Unblock-File -Path "C:\\Reports\\CorporateTool.xlsm"

// 3. Пример современного Office Script (TypeScript) в Excel для веб:
function main(workbook: ExcelScript.Workbook) {
  const sheet = workbook.getActiveWorksheet();
  const used = sheet.getUsedRange();
  used.getFormat().autofitColumns();
}`,
    level: 'Middle',
    tags: ['VBA', 'Цифровая подпись', 'SelfCert', 'Trust Center', 'Office Scripts', 'TypeScript', 'ИБ'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },

  // ==================== БОЛЬШИЕ ТАБЛИЦЫ И ИМПОРТ ИЗ ИНТЕРНЕТА ====================
  {
    id: 'kb-excel-power-query-web-api',
    section: 'Офисные пакеты и Аналитика',
    category: 'Большие таблицы и Импорт из интернета',
    title: 'Импорт данных из интернета в Excel через Power Query: Web.Contents, JSON/XML API и HTML-таблицы',
    shortSummary: 'Загрузка живых таблиц с сайтов, курсов валют, прайсов и REST API (с заголовками и пагинацией) без программирования на VBA.',
    description: `Power Query (Данные -> Получить данные -> Из других источников -> Из Интернета) — главный современный инструмент загрузки онлайн-данных в Excel, заменивший устаревшие веб-запросы и сложные макросы парсинга:
1) Парсинг HTML-сайтов: укажите URL страницы, и движок сам найдёт все <table> на странице или позволит «Добавить таблицу с помощью примеров» (указать 2–3 значения со страницы, и Power Query сам построит CSS-селектор для тысяч карточек).
2) REST API и JSON/XML: функция Web.Contents() позволяет скачивать JSON, разворачивать вложенные списки (List) и записи (Record) в плоскую таблицу (Table.ExpandRecordColumn) и передавать HTTP-заголовки авторизации (Api-Key, Bearer).
3) Пагинация и динамические URL: с помощью List.Generate или функции-запроса (fnGetPage) Power Query обходит API, выдающие по 100 записей на страницу, и склеивает миллионы строк в единую таблицу.
4) Автообновление: в Свойствах подключения можно задать автообновление каждые N минут и при открытии файла.`,
    practicalUsage: 'Автоматическая загрузка статистики маркетплейсов (Wildberries/Ozon API), выгрузка курсов валют ЦБ РФ/бирж, сбор таблиц со справочных порталов и мониторинг цен конкурентов.',
    commandsOrConfig: `// Пример кода M (Power Query) для загрузки JSON из REST API с заголовком авторизации
let
    Source = Json.Document(
        Web.Contents("https://api.example.com", [
            RelativePath = "v1/orders",
            Query = [limit = "500", status = "paid"],
            Headers = [#"Authorization"="Bearer YOUR_API_TOKEN", #"Accept"="application/json"]
        ])
    ),
    ItemsList = Source[items],
    ToTable = Table.FromList(ItemsList, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    Expanded = Table.ExpandRecordColumn(ToTable, "Column1", {"id", "date", "amount", "currency"})
in
    Table.TransformColumnTypes(Expanded, {{"date", type date}, {"amount", type number}})`,
    level: 'Middle',
    tags: ['Excel', 'Power Query', 'Web.Contents', 'REST API', 'JSON', 'HTML парсинг', 'Импорт данных'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-excel-large-tables-architecture',
    section: 'Офисные пакеты и Аналитика',
    category: 'Большие таблицы и Импорт из интернета',
    title: 'Создание и оптимизация больших таблиц в Excel (100 000 – 1 000 000+ строк)',
    shortSummary: 'Как избежать зависания и крашей Excel на гигантских файлах: формат .xlsb, отказ от летучих формул, 64-bit архитектура и структура таблиц.',
    description: `Стандартный лист Excel вмещает до 1 048 576 строк и 16 384 столбца, но при неправильном проектировании книга начинает тормозить уже на 50 000 строк. Чек-лист создания быстрых больших таблиц:
1) Используйте 64-битный Microsoft Office: 32-битный Excel ограничен потолком в 2 ГБ RAM и падает с ошибкой «Недостаточно памяти», даже если на ПК стоит 32 ГБ ОЗУ!
2) Сохраняйте тяжёлые файлы в двоичном формате .xlsb (Excel Binary Workbook) вместо XML-архива .xlsx: файл открывается и сохраняется в 2–4 раза быстрее, а размер уменьшается на 30–60%.
3) Уничтожьте «летучие» функции (Volatile functions): ДВССЫЛ (INDIRECT), СМЕЩ (OFFSET), СЕГОДНЯ (TODAY), СЛУЧМЕЖДУ — они принудительно пересчитывают всю книгу при каждом клике. Заменяйте их на ИНДЕКС (INDEX) и Умные таблицы (Ctrl+T).
4) Не применяйте Условное форматирование и ВПР ко всему столбцу целиком (A:A) — ограничивайте диапазон или используйте Таблицу Ctrl+T.
5) Удаляйте пустое «призрачное» форматирование за пределами данных (проверьте Ctrl+End): сбросьте лишние пустые строки/столбцы.`,
    practicalUsage: 'Проектирование тяжёлых финансовых моделей, журналов складского движения и биллинговых отчётов на сотни тысяч строк, которые стабильно открываются у коллег без зависаний.',
    commandsOrConfig: `# Главные приёмы реанимации тормозящей большой книги Excel:
Ctrl + End                  -> Проверить реальный последний использованный угол листа (нет ли мусора на строке 1 048 576)
Файл -> Сведения -> Инспектор / Статистика книги -> Проверить объём таблиц и формул
Формулы -> Параметры вычислений -> Вручную (F9 для пересчёта всей книги, Shift+F9 для листа)

# Вместо медленного ВПР по 500 000 строк на каждое поле:
# Используйте XLOOKUP/INDEX-MATCH с бинарным поиском (match_mode = 2 по отсортированному столбцу — быстрее в 1000 раз!)
=ПРОСМОТРХ(A2; Справочник!$A$2:$A$500000; Справочник!$B$2:$B$500000; "Нет"; 0; 2)`,
    level: 'Middle',
    tags: ['Excel', 'Большие таблицы', 'xlsb', 'Оптимизация', '64-bit', 'Производительность'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-excel-power-pivot-dax',
    section: 'Офисные пакеты и Аналитика',
    category: 'Большие таблицы и Импорт из интернета',
    title: 'Power Pivot и Модель данных Excel (VertiPaq): анализ миллионов строк, связи и DAX',
    shortSummary: 'Как анализировать 10–50 миллионов строк прямо в Excel, обойти лимит листа в 1 млн строк и заменить тяжелые ВПР на связи «Звезда».',
    description: `Когда таблица превышает лимит листа Excel (1 048 576 строк) или состоит из нескольких связанных выгрузок, данные нельзя класть на обычный лист — их нужно загружать напрямую в Модель данных (Power Pivot) через Power Query («Только подключение» + галочка «Добавить эти данные в модель данных»).

Под капотом Power Pivot работает колоночный движок сжатия в памяти xVelocity (VertiPaq — тот же самый, что и в Power BI): он сжимает десятки миллионов строк в десятки мегабайт!
Ключевые принципы работы:
• Схема «Звезда» (Star Schema): одна центральная таблица Фактов (транзакции, продажи) связывается по ключевым ID с компактными таблицами Справочников (Товары, Клиенты, Календарь). Это полностью отменяет необходимость тянуть сотни тысяч формул ВПР!
• Меры (Measures) на языке DAX (Data Analysis Expressions): вычисляются динамически прямо внутри Сводной таблицы под любыми фильтрами и срезами, включая подсчёт уникальных клиентов (DISTINCTCOUNT) и накопительные итоги (TOTALYTD).`,
    practicalUsage: 'Построение BI-дашбордов внутри Excel по многолетним выгрузкам чеков, логам звонков или заказам (5–30 млн строк) с мгновенным откликом срезов.',
    commandsOrConfig: `// Основные меры на языке DAX в Power Pivot:

// 1. Базовая сумма и подсчёт уникальных покупателей (невозможно в обычной Сводной без Модели данных)
Выручка := SUM(FactSales[Amount])
Уникальные клиенты := DISTINCTCOUNT(FactSales[ClientID])

// 2. Доля категории в общих продажах и безопасное деление (без #ДЕЛ/0!)
Выручка Тотал := CALCULATE([Выручка], ALL(DimProducts[Category]))
Доля категории % := DIVIDE([Выручка], [Выручка Тотал], 0)

// 3. Рост год к году (Time Intelligence при наличии таблицы Календарь)
Выручка Прошлый Год := CALCULATE([Выручка], SAMEPERIODLASTYEAR(DimCalendar[Date]))`,
    level: 'Senior',
    tags: ['Excel', 'Power Pivot', 'DAX', 'Data Model', 'VertiPaq', 'Миллионы строк', 'BI'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-google-sheets-web-import',
    section: 'Офисные пакеты и Аналитика',
    category: 'Большие таблицы и Импорт из интернета',
    title: 'Импорт с сайтов и автоматизация в Google Таблицах: IMPORTXML, IMPORTHTML, QUERY и Apps Script',
    shortSummary: 'Живые формулы скрапинга сайтов по XPath, выгрузка CSV-фидов, SQL-подобная функция QUERY и HTTP-запросы на JavaScript (Apps Script).',
    description: `В отличие от десктопного Excel, Google Таблицы работают в облаке и умеют подтягивать открытые данные с сайтов прямо встроенными формулами без плагинов и макросов:
• =IMPORTHTML(url; "table"; индекс) — забирает готовую HTML-таблицу или список с веб-страницы (например, курсы, рейтинги, расписания).
• =IMPORTXML(url; xpath_запрос) — точечный парсинг любого элемента страницы (цены товара, заголовка H1, курса валюты) по XPath-пути.
• =IMPORTDATA(url) — загружает CSV/TSV-файл по прямой ссылке с автоматическим обновлением.
• =QUERY(диапазон; "SELECT A, SUM(D) WHERE B = 'Москва' GROUP BY A") — мощнейший SQL-движок внутри таблицы для фильтрации и агрегации больших массивов.
Для авторизованных REST API и больших объёмов (лимит Google Таблиц — 10 млн ячеек на книгу) используется встроенный Google Apps Script (JavaScript) с классом UrlFetchApp и триггерами по расписанию (Cron).`,
    practicalUsage: 'Облачные дашборды с автоматическим мониторингом страниц, быстрый парсинг прайс-листов и SEO-метатегов, интеграция с Telegram и корпоративными Webhook.',
    commandsOrConfig: `// 1. Формулы живого импорта с сайта в Google Таблицах:
=IMPORTHTML("https://ru.wikipedia.org/wiki/Список_стран_по_ВВП_(ППС)"; "table"; 1)
=IMPORTXML("https://www.cbr.ru/scripts/XML_daily.asp"; "//Valute[CharCode='USD']/Value")
=QUERY(Данные!A1:F50000; "SELECT B, COUNT(A), SUM(E) WHERE D > 0 GROUP BY B ORDER BY SUM(E) DESC"; 1)

// 2. Скрипт Google Apps Script (Расширения -> Apps Script) для загрузки JSON API по расписанию
function fetchApiToSheet() {
  const res = UrlFetchApp.fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const json = JSON.parse(res.getContentText());
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Курсы");
  const rows = Object.entries(json.rates);
  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
}`,
    level: 'Middle',
    tags: ['Google Sheets', 'IMPORTXML', 'IMPORTHTML', 'QUERY', 'Apps Script', 'XPath', 'Веб-импорт'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
