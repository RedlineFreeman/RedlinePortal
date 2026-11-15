import { KnowledgeEntry } from '../../types/knowledgeBase';

export const VIRTUALIZATION_COMPREHENSIVE_ENTRIES: KnowledgeEntry[] = [
  {
    id: 'kb-virt-types-and-comparison-matrix',
    section: 'Виртуализация',
    category: 'Архитектура и Выбор ПО',
    title: 'Типы виртуализации (Type-1, Type-2, Контейнеры) и матрица выбора ПО: платные vs бесплатные',
    shortSummary: 'Сравнение гипервизоров 1-го и 2-го типа, контейнерной виртуализации, аппаратной поддержки VT-x/AMD-V и выбор под задачи.',
    description: `Виртуализация позволяет запускать изолированные вычислительные среды на одном физическом сервере или ПК. Выделяют три главных класса технологий:

1. Гипервизоры 1-го типа (Bare-Metal, Type-1) — работают непосредственно поверх «голого» железа, минимизируя накладные расходы (до 1–3% CPU). Используются в продакшене и ЦОД:
• VMware ESXi (vSphere) — платный корпоративный лидер (бесплатный ESXi 8 официально снят Broadcom в 2024 году). Лучший выбор для крупных энтерпрайз-кластеров с готовой командой VMware и SAN-СХД.
• Proxmox VE (KVM + LXC) — бесплатный Open Source (AGPLv3) с опциональной платной подпиской поддержки. Лучший выбор для СМБ, домашних лабораторий, хостинга и миграции с VMware.
• Microsoft Hyper-V — бесплатный (входит в роли Windows Server / Pro; автономный Hyper-V Server 2019). Лучший выбор для Windows-инфраструктуры (AD, 1С, RDS, MSSQL).
• XCP-ng (Xen) — бесплатный Open Source форк Citrix Hypervisor (платная поддержка опциональна). Отлично подходит для стабильных корпоративных пулов с Xen Orchestra.
• Nutanix AHV — платный гиперконвергентный (HCI) стек на базе KVM (Community Edition бесплатна для тестов).

2. Гипервизоры 2-го типа (Hosted, Type-2) — запускаются как программа внутри обычной ОС (Windows, Linux, macOS). Идеальны для разработчиков, тестов и обучения:
• VMware Workstation Pro / Fusion Pro — с 2024 года БЕСПЛАТНЫ для личного и коммерческого использования! Быстрый 3D, отличные снапшоты и сети.
• Oracle VirtualBox — базово бесплатный (GPL), но Extension Pack (USB 3.0, шифрование, VRDP) бесплатен только для дома; в компаниях требует платной лицензии (PUEL)!
• Parallels Desktop — платный (подписка/лицензия), эталон для macOS (особенно Apple Silicon M1–M4) для запуска Windows ARM.
• UTM — бесплатный Open Source для macOS/iOS (на базе QEMU + Apple Virtualization).

3. Виртуализация на уровне ОС (Контейнеры) — общее ядро Linux, запуск за миллисекунды:
• Docker Engine / Podman / LXC / Incus — бесплатные инструменты для микросервисов и плотной упаковки приложений (Docker Desktop платный для крупных компаний).

Аппаратные требования: в BIOS/UEFI обязательно должны быть включены Intel VT-x + VT-d (или AMD-V + AMD-Vi / IOMMU) для SLAT/EPT и проброса PCI-устройств (GPU, RAID-контроллер) напрямую в ВМ.`,
    practicalUsage: 'Выбор оптимальной платформы без переплат за ненужные лицензии и без риска нарушения юридических условий (например, PUEL в VirtualBox или корпоративный Docker Desktop).',
    commandsOrConfig: `# Проверка поддержки аппаратной виртуализации в Linux (VT-x / AMD-V)
lscpu | grep -i virtualization
egrep -c '(vmx|svm)' /proc/cpuinfo   # > 0 означает включенную виртуализацию

# Проверка поддержки аппаратной виртуализации в Windows (PowerShell / CMD)
systeminfo | findstr /I "Hyper-V"
coreinfo64.exe -v                    # Утилита Sysinternals (звездочка * на SLAT/EPT)

# Проверка наличия модуля KVM в ядре Linux
ls -l /dev/kvm && kvm-ok`,
    level: 'Junior',
    tags: ['Виртуализация', 'Type-1', 'Type-2', 'ESXi', 'Proxmox', 'Hyper-V', 'VirtualBox', 'Лицензии'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-vmware-esxi-vsphere',
    section: 'Виртуализация',
    category: 'VMware (Broadcom)',
    title: 'VMware vSphere / ESXi и vCenter Server: архитектура VMkernel, VMFS, vMotion и статус лицензий',
    shortSummary: 'Корпоративный bare-metal гипервизор от VMware: управление через vCenter, кластеры HA/DRS, форматы дисков VMDK и CLI esxcli.',
    description: `VMware ESXi — отраслевой стандарт корпоративной виртуализации уровня ЦОД. Собственное микроядро VMkernel напрямую управляет CPU, памятью и вводом-выводом. Доступ к серверу осуществляется через веб-клиент Host Client (HTML5), SSH или центральную консоль управления.

Ключевые компоненты экосистемы vSphere:
• ESXi Host — сам гипервизор (устанавливается на физический сервер, занимает ~1–2 ГБ на диске/M.2).
• vCenter Server Appliance (VCSA) — виртуальный модуль на базе Photon OS Linux для централизованного управления десятками/тысячами хостов ESXi.
• VMFS (Virtual Machine File System) — кластерная файловая система на блочных СХД (iSCSI, Fibre Channel), позволяющая нескольким хостам ESXi одновременно работать с одним LUN без повреждения данных.
• vMotion / Storage vMotion — живая миграция работающей ВМ между физическими серверами (или перенос дисков между СХД) без секунды простоя.
• vSphere HA (High Availability) — автоматический перезапуск ВМ на выживших узлах при падении сервера.
• vSphere DRS — автоматическая балансировка нагрузки ВМ по кластеру.

Политика лицензирования (после покупки Broadcom в 2023–2024):
• Бесплатный ESXi Hypervisor (vSphere Hypervisor Free) официально закрыт — новые сборки доступны только по платной подписке по числу ядер CPU (vSphere Standard, vSphere Foundation, VMware Cloud Foundation — минимум 16 ядер на сокет).
• Критичное правило эксплуатации: никогда не держите снапшоты (Snapshots) в продакшене дольше 24–72 часов — дельта-файлы (-delta.vmdk / -sesparse.vmdk) стремительно растут и деградируют производительность дисков.`,
    practicalUsage: 'Высоконагруженные дата-центры, кластеры банков, ERP/1С с единой SAN-СХД и максимальными требованиями к SLA, а также сопровождение действующего парка серверов ESXi 7.0 / 8.0.',
    commandsOrConfig: `# Основные CLI-команды в SSH-консоли хоста ESXi
esxcli system version get                 # Версия и билд ESXi
esxcli network nic list                   # Список физических сетевых карт (vmnic)
esxcli storage vmfs extent list           # Подключенные хранилища VMFS и LUN

# Управление виртуальными машинами через vim-cmd
vim-cmd vmsvc/getallvms                   # Список всех ВМ и их Vmid
vim-cmd vmsvc/power.getstate <Vmid>       # Статус питания ВМ
vim-cmd vmsvc/power.on <Vmid>             # Включение ВМ
vim-cmd vmsvc/snapshot.get <Vmid>         # Проверка висящих снапшотов

# Мониторинг производительности в реальном времени (CPU Ready %, диски, сеть)
esxtop`,
    level: 'Middle',
    tags: ['VMware', 'ESXi', 'vSphere', 'vCenter', 'vMotion', 'VMFS', 'esxcli', 'Broadcom'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-vmware-workstation-fusion',
    section: 'Виртуализация',
    category: 'VMware (Broadcom)',
    title: 'VMware Workstation Pro / Player и VMware Fusion: настольная виртуализация для Windows, Linux и macOS',
    shortSummary: 'Быстрые Type-2 гипервизоры для рабочих станций, бесплатные для всех пользователей с 2024 года, сети vmnet и Nested ESXi.',
    description: `VMware Workstation Pro (для Windows и Linux) и VMware Fusion Pro (для macOS Intel и Apple Silicon) — мощнейшие настольные гипервизоры 2-го типа. Важное изменение 2024 года: Broadcom сделала VMware Workstation Pro и Fusion Pro полностью БЕСПЛАТНЫМИ как для личного, так и для коммерческого использования (упразднив урезанный Player).

Ключевые возможности:
• Сетевая подсистема (Virtual Network Editor): vmnet0 (Bridged — прямой выход в локальную сеть офиса), vmnet1 (Host-Only — изолированная сеть с хостом), vmnet8 (NAT — доступ в интернет через IP хоста с пробросом портов).
• Клонирование: Full Clone (полная независимая копия ВМ) и Linked Clone (мгновенный клон на базе снапшота родительской ВМ — экономит до 90% SSD в тестовых стендах!).
• Вложенная виртуализация (Nested Virtualization): позволяет запустить гипервизоры ESXi, Proxmox или Hyper-V прямо внутри ВМ на ноутбуке для подготовки к сертификациям и тестирования кластеров.
• Поддержка DirectX 11 / OpenGL 4.3, Drag-and-Drop, Shared Folders и шифрование ВМ (TPM 2.0 эмуляция для Windows 11).

Лучше всего подходит для: системных администраторов и пентестеров на Windows/Linux/macOS, сборки многоузловых стендов (AD + pfSense + Linux) на одном ноутбуке и экспорта в OVF/OVA для загрузки на ESXi.`,
    practicalUsage: 'Развертывание локальных стендов Active Directory + Linux, безопасная песочница для проверки подозрительных файлов и подготовка OVA-шаблонов серверов.',
    commandsOrConfig: `# Автоматизация VMware Workstation через консольную утилиту vmrun
vmrun -T ws list                                  # Список запущенных ВМ
vmrun -T ws start "D:\\VMs\\WinServ22\\ws22.vmx" nogui
vmrun -T ws snapshot "D:\\VMs\\WinServ22\\ws22.vmx" "Clean_State"
vmrun -T ws revertToSnapshot "D:\\VMs\\WinServ22\\ws22.vmx" "Clean_State"
vmrun -T ws stop "D:\\VMs\\WinServ22\\ws22.vmx" soft

# Конвертация и импорт/экспорт OVA-шаблонов через OVF Tool
ovftool "D:\\VMs\\WebSrv\\WebSrv.vmx" "D:\\Templates\\WebSrv.ova"`,
    level: 'Junior',
    tags: ['VMware Workstation', 'VMware Fusion', 'Type-2', 'vmnet', 'vmrun', 'Linked Clone', 'Бесплатно'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-virtualbox',
    section: 'Виртуализация',
    category: 'Oracle VirtualBox & Настольные гипервизоры',
    title: 'Oracle VirtualBox: архитектура, Guest Additions, подводный камень лицензии Extension Pack (PUEL) и VBoxManage',
    shortSummary: 'Кроссплатформенный Type-2 гипервизор для Windows/Linux/macOS, форматы дисков VDI/VMDK и важные юридические ограничения для бизнеса.',
    description: `Oracle VM VirtualBox — популярный бесплатный кроссплатформенный гипервизор 2-го типа (работает на Windows, Linux, macOS x86/beta ARM, Solaris).

Важнейшая особенность лицензирования (о которой часто забывают на собеседованиях!):
• Базовый VirtualBox распространяется по свободной лицензии GPLv2/v3 — он 100% бесплатен везде, включая коммерческие компании.
• VirtualBox Extension Pack (добавляет поддержку USB 2.0/3.0, встроенный RDP-сервер VRDP, шифрование дисков AES и сетевую загрузку PXE Intel) распространяется по проприетарной лицензии PUEL! В организациях и коммерческой деятельности использование Extension Pack БЕЗ покупки дорогой корпоративной лицензии Oracle (per-user/socket) строго запрещено и часто проверяется при аудитах ПО! В качестве 100% бесплатной замены на ПК лучше брать VMware Workstation Pro или KVM/QEMU.

Технические особенности:
• Guest Additions — набор драйверов, устанавливаемых ВНУТРЬ гостевой ОС (общий буфер обмена, автоподгонка разрешения экрана, общие папки, синхронизация времени).
• Форматы дисков: VDI (родной), VMDK (VMware), VHD (Hyper-V).
• 6 режимов сети: NAT, NAT Network (общая подсеть для нескольких ВМ с доступом в интернет), Bridged Adapter, Internal Network, Host-Only, Generic.

Лучше всего подходит для: домашнего обучения Linux/Windows, запуска старых ОС и автоматизированных сред Vagrant.`,
    practicalUsage: 'Домашние и учебные лаборатории, кроссплатформенный запуск легковесных ВМ и headless-серверов через CLI VBoxManage.',
    commandsOrConfig: `# Управление VirtualBox из командной строки (VBoxManage)
VBoxManage list vms                               # Список всех ВМ
VBoxManage list runningvms                        # Список работающих ВМ
VBoxManage startvm "Ubuntu-Lab" --type headless   # Запуск ВМ в фоне без GUI

# Снимки (Snapshots) и безопасное клонирование
VBoxManage snapshot "Ubuntu-Lab" take "Before-Nginx"
VBoxManage snapshot "Ubuntu-Lab" restore "Before-Nginx"
VBoxManage clonevm "Ubuntu-Lab" --name "Ubuntu-Node2" --register

# Проброс порта SSH (2222 хоста -> 22 гостя) в режиме NAT
VBoxManage modifyvm "Ubuntu-Lab" --natpf1 "guestssh,tcp,,2222,,22"`,
    level: 'Junior',
    tags: ['VirtualBox', 'Oracle', 'PUEL', 'Extension Pack', 'VBoxManage', 'VDI', 'Type-2'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-kvm-qemu-libvirt',
    section: 'Виртуализация',
    category: 'KVM, QEMU и Proxmox VE',
    title: 'KVM + QEMU + libvirt (virt-manager / Cockpit): открытый стек виртуализации Linux',
    shortSummary: 'Нативный гипервизор ядра Linux (100% бесплатно и Open Source), форматы QCOW2/RAW, драйверы VirtIO и управление через virsh.',
    description: `KVM (Kernel-based Virtual Machine) — встроенный в ядро Linux модуль, превращающий сам Linux в высокопроизводительный гипервизор 1-го типа (Type-1). Это фундамент мировой облачной инфраструктуры (AWS, GCP, Яндекс Облако, OpenStack, Proxmox VE, oVirt).

Роли компонентов в стеке:
1. KVM (/dev/kvm) — берет на себя аппаратную виртуализацию CPU (Intel VT-x / AMD-V) и памяти.
2. QEMU — эмулирует материнскую плату (Q35), контроллеры, видеокарты, USB и диски, а при отсутствии KVM способен эмулировать даже чужую архитектуру (например, ARM64 на x86_64!).
3. VirtIO — паравиртуальные драйверы (virtio-net, virtio-blk, virtio-scsi) для работы сети и дисков на скорости, близкой к физическому железу (для Windows-гостей нужно подмонтировать ISO virtio-win).
4. libvirt (демон libvirtd) — единый API и слой управления (XML-конфигурации ВМ в /etc/libvirt/qemu/), поверх которого работают CLI-утилита virsh, десктопный GUI virt-manager и веб-интерфейс Cockpit Machines.

Форматы дисков: QCOW2 (тонкое выделение, встроенные снапшоты, сжатие, backing files) и RAW (максимальный IOPS без оверхеда). Лицензия: 100% бесплатно (GPLv2 / LGPL).`,
    practicalUsage: 'Развертывание кастомных серверов виртуализации на Debian/Ubuntu/AlmaLinux/РЕД ОС, создание быстрых облачных образов Cloud-Init и автоматизация через Terraform/Ansible.',
    commandsOrConfig: `# Установка полного стека KVM + libvirt на Ubuntu/Debian
sudo apt install -y qemu-kvm libvirt-daemon-system virtinst bridge-utils virt-manager

# Работа с виртуальными машинами через CLI virsh
virsh list --all                                  # Все ВМ (активные и выключенные)
virsh start web-srv-01                            # Запуск ВМ
virsh shutdown web-srv-01                         # Корректное ACPI-выключение
virsh console web-srv-01                          # Подключение к последовательной консоли
virsh autostart web-srv-01                        # Автозапуск ВМ при старте хоста

# Создание диска QCOW2 и изменение его размера
qemu-img create -f qcow2 /var/lib/libvirt/images/db.qcow2 50G
qemu-img resize /var/lib/libvirt/images/db.qcow2 +20G
qemu-img info /var/lib/libvirt/images/db.qcow2`,
    level: 'Middle',
    tags: ['KVM', 'QEMU', 'libvirt', 'virsh', 'QCOW2', 'VirtIO', 'Open Source'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-proxmox-ve',
    section: 'Виртуализация',
    category: 'KVM, QEMU и Proxmox VE',
    title: 'Proxmox VE (PVE): корпоративный кластер KVM + LXC, ZFS, Ceph и Proxmox Backup Server',
    shortSummary: 'Главная бесплатная альтернатива VMware vSphere: единый веб-интерфейс для ВМ и контейнеров, HA-кластер, Ceph HCI и дедупликация PBS.',
    description: `Proxmox Virtual Environment (PVE) — готовый дистрибутив на базе Debian Linux с модифицированным ядром Ubuntu LTS, объединяющий в одном веб-интерфейсе полную виртуализацию KVM и системные контейнеры LXC.

Лицензирование:
• Полностью бесплатен (AGPLv3) — НИКАКИЕ функции кластера, HA, Ceph, ZFS и живой миграции не заблокированы!
• Платная подписка (Enterprise Support, от ~110 EUR/сокет/год) покупается по желанию: дает доступ к стабильному репозиторию pve-enterprise (в бесплатном варианте подключается pve-no-subscription) и официальную поддержку.

Ключевые преимущества:
• Гиперконвергенция из коробки: встроенная поддержка программных RAID на ZFS (мгновенная репликация между 2–3 узлами без СХД!) и распределенного кластерного хранилища Ceph (от 3 узлов).
• Высокая доступность (HA Cluster) через corosync — требует нечетного числа голосов (Кворум, либо отдельный легковесный QDevice на Raspberry Pi для кластера из 2 серверов).
• Proxmox Backup Server (PBS) — отдельный бесплатный сервер резервного копирования с инкрементальной дедупликацией на уровне блоков, шифрованием и проверкой целостности.

Лучше всего подходит для: 90% задач малого, среднего и крупного бизнеса вместо дорогого VMware vSphere, построения надежных кластеров 1С/БД/веб-сервисов и хостинга.`,
    practicalUsage: 'Миграция корпоративной инфраструктуры с VMware ESXi (встроенный мастер импорта VMDK/ESXi в PVE 8.2+), отказоустойчивые кластеры с ZFS/Ceph и автоматическими бэкапами в PBS.',
    commandsOrConfig: `# Основные консольные утилиты Proxmox VE (вместо веб-интерфейса :8006)
qm list                                           # Список всех KVM виртуальных машин
qm start 101 && qm shutdown 101                   # Управление ВМ по ID
qm snapshot 101 before_upgrade --vmstate 1        # Снапшот с сохранением RAM
qm migrate 101 pve-node2 --online                 # Живая миграция ВМ на другой узел

pct list                                          # Список всех LXC-контейнеров
pct enter 201                                     # Вход внутрь консоли LXC без пароля

pvecm status                                      # Статус кластера и кворума (Quorate: Yes)
vzdump 101 --storage pbs-backup --mode snapshot   # Запуск бэкапа ВМ вручную`,
    level: 'Middle',
    tags: ['Proxmox VE', 'PVE', 'LXC', 'Ceph', 'ZFS', 'PBS', 'HA', 'Кластер'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-xen-xcpng-ovirt-nutanix-bhyve',
    section: 'Виртуализация',
    category: 'Альтернативные и Корпоративные гипервизоры',
    title: 'Другие промышленные гипервизоры: XCP-ng (Xen), Nutanix AHV, oVirt, FreeBSD bhyve и российские платформы',
    shortSummary: 'Обзор альтернативных Type-1 платформ: экосистема Xen/XCP-ng, HCI Nutanix, OpenStack/oVirt и отечественные решения импортозамещения.',
    description: `Помимо большой тройки (VMware, Proxmox, Hyper-V), в индустрии широко применяются следующие системы виртуализации:

1. XCP-ng + Xen Orchestra (Xen) — бесплатный Open Source форк платного Citrix Hypervisor (XenServer). Работает на архитектуре Xen (гипервизор + управляющий домен Dom0). Отличается феноменальной стабильностью, изоляцией и удобной панелью Xen Orchestra (XO). Плата берется только за готовую сборку XOA с поддержкой.
2. Nutanix AHV (Acropolis Hypervisor) — платная энтерпрайз-платформа гиперконвергентной инфраструктуры (HCI) на базе глубоко переработанного KVM с единой панелью Prism. Бесплатна только в редакции Community Edition (CE) для домашних стендов.
3. oVirt / OpenNebula / OpenStack — бесплатные Open Source системы управления облачными дата-центрами поверх KVM. oVirt исторически был upstream-проектом платного Red Hat Virtualization (RHV) и отлично масштабируется на сотни хостов с общими SAN/NFS СХД.
4. FreeBSD bhyve — встроенный бесплатный гипервизор BSD-систем (лицензия BSD), легкий и быстрый, нативно работающий с ZFS и сетевыми мостами/VNET.
5. Российские сертифицированные решения (импортозамещение, платные, на базе KVM/oVirt/OpenNebula): ПК СВ «Брест» (Astra Linux), zVirt (Orion soft), SpaceVM, ROSA Virtualization, РЕД Виртуализация, vStack.`,
    practicalUsage: 'Выбор альтернативы при жестких требованиях регуляторов (ФСТЭК), построении крупных частных облаков (OpenStack/oVirt) или эксплуатации парка Citrix/XenServer.',
    commandsOrConfig: `# Основные CLI-команды XCP-ng / XenServer (утилита xe)
xe vm-list                                        # Список всех ВМ на хосте/пуле
xe host-list                                      # Список хостов в пуле
xe vm-start name-label="APP-01"                   # Запуск ВМ по имени

# Быстрый запуск ВМ во FreeBSD через bhyve (с оберткой vm-bhyve)
pkg install vm-bhyve bhyve-firmware
vm init && vm switch create public && vm switch add public em0
vm create -t ubuntu -s 40G web01 && vm start web01`,
    level: 'Senior',
    tags: ['XCP-ng', 'Xen', 'Nutanix AHV', 'oVirt', 'OpenStack', 'bhyve', 'zVirt', 'Брест'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-desktop-mac-parallels-utm',
    section: 'Виртуализация',
    category: 'Oracle VirtualBox & Настольные гипервизоры',
    title: 'Десктопная виртуализация: Parallels Desktop, UTM, Windows Sandbox, Multipass и Vagrant',
    shortSummary: 'Лучшие решения для ноутбуков на Apple Silicon (M1–M4), одноразовых песочниц Windows и мгновенных CLI-стендов разработчиков.',
    description: `Для повседневных рабочих задач на ноутбуках и десктопах помимо VMware Workstation и VirtualBox применяются специализированные решения:

1. Parallels Desktop (macOS) — ПЛАТНЫЙ (годовая подписка или разовая лицензия). Абсолютный лидер по скорости, графике и интеграции на компьютерах Mac (особенно на процессорах Apple Silicon M1/M2/M3/M4, где умеет в 2 клика скачивать и запускать Windows 11 ARM с режимом Coherence — окна Windows прямо на рабочем столе macOS).
2. UTM (macOS / iOS) — БЕСПЛАТНЫЙ Open Source. Использует нативный Apple Virtualization.framework (быстро запускает Linux/Windows ARM) И одновременно движок QEMU для полноценной эмуляции x86_64 программ на ARM-Маках (медленнее, но спасает для старых образов).
3. Windows Sandbox (Песочница Windows) — БЕСПЛАТНАЯ встроенная функция Windows 10/11 Pro и Enterprise (использует облегченный Hyper-V). Одним кликом открывает чистую временную копию Windows; после закрытия окна все файлы и вирусы бесследно уничтожаются!
4. Canonical Multipass — БЕСПЛАТНЫЙ CLI-инструмент для Windows/macOS/Linux (поверх Hyper-V/QEMU/VirtualBox): за 10 секунд поднимает чистую Ubuntu VM одной командой.
5. HashiCorp Vagrant — декларативное описание тестовых ВМ (Vagrantfile) с автоматическим поднятием через VirtualBox/VMware/Hyper-V/Libvirt (бесплатный open-source/BSL).`,
    practicalUsage: 'Безопасный запуск подозрительных установщиков в Windows Sandbox, работа с корпоративным 1С/бухгалтерией на MacBook M-серии через Parallels, быстрое поднятие Ubuntu-стендов через Multipass.',
    commandsOrConfig: `# Включение Windows Sandbox через PowerShell (Windows 10/11 Pro/Enterprise)
Enable-WindowsOptionalFeature -FeatureName "Containers-DisposableClientVM" -All -Online

# Запуск чистой Ubuntu за 10 секунд через Canonical Multipass
multipass launch --name lab-ubuntu --cpus 2 --memory 2G --disk 15G
multipass shell lab-ubuntu
multipass delete --purge lab-ubuntu

# Поднятие стенда из Vagrantfile
vagrant init ubuntu/jammy64
vagrant up && vagrant ssh`,
    level: 'Junior',
    tags: ['Parallels', 'UTM', 'Windows Sandbox', 'Multipass', 'Vagrant', 'macOS', 'Apple Silicon'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
  {
    id: 'kb-virt-containers-docker-podman-lxc',
    section: 'Виртуализация',
    category: 'Контейнеризация (OS-Level Виртуализация)',
    title: 'Контейнеризация vs Гипервизоры: Docker, Podman, LXC / Incus и Kubernetes',
    shortSummary: 'Чем контейнеры (общее ядро, cgroups, namespaces) отличаются от классических ВМ, бесплатные аналоги Docker Desktop и выбор под задачи.',
    description: `Контейнеризация (OS-Level Virtualization) не эмулирует оборудование и не загружает отдельное гостевое ядро ОС. Все контейнеры используют ОДНО общее ядро хостового Linux, изолируясь друг от друга через механизмы ядра: Namespaces (PID, NET, MNT, USER — видимость) и cgroups v2 (лимиты CPU, RAM, IOPS). Это дает старт за миллисекунды и минимальный расход памяти.

Главные инструменты и их лицензии:
• Docker Engine + Docker Compose (Linux) — 100% БЕСПЛАТНО (Apache 2.0) для любых компаний на серверах Linux!
• Docker Desktop (Windows/macOS GUI) — бесплатен для личного пользования и малого бизнеса (<250 сотрудников и <$10M выручки); для крупных корпораций ТРЕБУЕТ ПЛАТНОЙ подписки!
• Podman / Podman Desktop — полностью БЕСПЛАТНАЯ (Apache 2.0) замена Docker без фонового root-демона (daemonless + rootless по умолчанию, совместимый CLI).
• LXC / Incus (форк LXD от оригинальной команды после перехода Canonical на проприетарную модель) — бесплатные «системные контейнеры»: ведут себя как полноценные ВМ с init/systemd/SSH внутри, но без оверхеда KVM (встроены в Proxmox VE!).
• Kubernetes (K8s / K3s) — бесплатный оркестратор для управления сотнями контейнеров на кластере серверов.

Когда ВМ лучше контейнеров: нужно запустить Windows-гостя на Linux (и наоборот), требуется строгая изоляция безопасности разных клиентов/тенантов или специфические модули ядра (VPN/файловые системы).`,
    practicalUsage: 'Развертывание микросервисов и веб-приложений в Docker Compose/Kubernetes на Linux, замена платного Docker Desktop на Podman/WSL2 в офисе, плотное размещение Linux-сервисов в LXC на Proxmox.',
    commandsOrConfig: `# Запуск стека Docker Compose в фоне и проверка ресурсов контейнеров
docker compose up -d --build
docker stats --no-stream

# Бесплатная бездемонная замена Docker в Linux/Windows/macOS — Podman
podman run -d --name nginx-test -p 8080:80 nginx:alpine
podman generate systemd --new --files --name nginx-test

# Работа с системными контейнерами LXC / Incus
incus launch images:ubuntu/24.04 web-container
incus exec web-container -- bash`,
    level: 'Middle',
    tags: ['Docker', 'Podman', 'LXC', 'Incus', 'Kubernetes', 'Контейнеры', 'cgroups', 'Namespaces'],
    createdAt: '2026-11-15',
    updatedAt: '2026-11-15',
  },
];
