/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TechItem, SpecializationSummary, TechType } from '../types/techCatalog';

export const TECH_CATALOG_SUMMARY: SpecializationSummary[] = [
  {
    "specialization": "",
    "category": "Операционные системы",
    "highCount": 7,
    "mediumCount": 1,
    "lowCount": 8,
    "totalCount": 16
  },
  {
    "specialization": "",
    "category": "Системные утилиты и процессы",
    "highCount": 21,
    "mediumCount": 11,
    "lowCount": 6,
    "totalCount": 38
  },
  {
    "specialization": "",
    "category": "Диагностика железа и дисков",
    "highCount": 7,
    "mediumCount": 5,
    "lowCount": 1,
    "totalCount": 13
  },
  {
    "specialization": "",
    "category": "Сети, DNS, DHCP и диагностика",
    "highCount": 27,
    "mediumCount": 12,
    "lowCount": 13,
    "totalCount": 52
  },
  {
    "specialization": "",
    "category": "Сетевое оборудование",
    "highCount": 1,
    "mediumCount": 1,
    "lowCount": 1,
    "totalCount": 3
  },
  {
    "specialization": "",
    "category": "Веб-серверы и Reverse Proxy",
    "highCount": 6,
    "mediumCount": 3,
    "lowCount": 2,
    "totalCount": 11
  },
  {
    "specialization": "",
    "category": "Базы данных, кэш и брокеры",
    "highCount": 4,
    "mediumCount": 1,
    "lowCount": 3,
    "totalCount": 8
  },
  {
    "specialization": "",
    "category": "Серверы приложений",
    "highCount": 0,
    "mediumCount": 0,
    "lowCount": 2,
    "totalCount": 2
  },
  {
    "specialization": "",
    "category": "Виртуализация",
    "highCount": 6,
    "mediumCount": 3,
    "lowCount": 3,
    "totalCount": 12
  },
  {
    "specialization": "",
    "category": "Контейнеры и оркестрация",
    "highCount": 5,
    "mediumCount": 4,
    "lowCount": 9,
    "totalCount": 18
  },
  {
    "specialization": "",
    "category": "Автоматизация, IaC и CI/CD",
    "highCount": 7,
    "mediumCount": 5,
    "lowCount": 14,
    "totalCount": 26
  },
  {
    "specialization": "",
    "category": "Облачные инструменты",
    "highCount": 0,
    "mediumCount": 6,
    "lowCount": 6,
    "totalCount": 12
  },
  {
    "specialization": "",
    "category": "Языки скриптов и оболочки",
    "highCount": 7,
    "mediumCount": 5,
    "lowCount": 8,
    "totalCount": 20
  },
  {
    "specialization": "",
    "category": "Пакетные менеджеры",
    "highCount": 0,
    "mediumCount": 4,
    "lowCount": 6,
    "totalCount": 10
  },
  {
    "specialization": "",
    "category": "Мониторинг и Observability",
    "highCount": 6,
    "mediumCount": 3,
    "lowCount": 10,
    "totalCount": 19
  },
  {
    "specialization": "",
    "category": "Логирование",
    "highCount": 3,
    "mediumCount": 3,
    "lowCount": 2,
    "totalCount": 8
  },
  {
    "specialization": "",
    "category": "Почта и связанные сервисы",
    "highCount": 0,
    "mediumCount": 2,
    "lowCount": 8,
    "totalCount": 10
  },
  {
    "specialization": "",
    "category": "Безопасность, VPN и hardening",
    "highCount": 11,
    "mediumCount": 8,
    "lowCount": 10,
    "totalCount": 29
  },
  {
    "specialization": "",
    "category": "Идентификация и доступ (IAM)",
    "highCount": 8,
    "mediumCount": 6,
    "lowCount": 4,
    "totalCount": 18
  },
  {
    "specialization": "",
    "category": "Резервное копирование",
    "highCount": 4,
    "mediumCount": 5,
    "lowCount": 6,
    "totalCount": 15
  },
  {
    "specialization": "",
    "category": "Хранилища и файловые системы",
    "highCount": 8,
    "mediumCount": 8,
    "lowCount": 6,
    "totalCount": 22
  },
  {
    "specialization": "",
    "category": "Развёртывание и клонирование",
    "highCount": 1,
    "mediumCount": 1,
    "lowCount": 3,
    "totalCount": 5
  },
  {
    "specialization": "",
    "category": "Удалённый доступ",
    "highCount": 4,
    "mediumCount": 5,
    "lowCount": 7,
    "totalCount": 16
  },
  {
    "specialization": "",
    "category": "Редакторы и IDE",
    "highCount": 3,
    "mediumCount": 0,
    "lowCount": 1,
    "totalCount": 4
  },
  {
    "specialization": "",
    "category": "Тестирование и API",
    "highCount": 4,
    "mediumCount": 0,
    "lowCount": 0,
    "totalCount": 4
  },
  {
    "specialization": "",
    "category": "Прочие полезные инструменты",
    "highCount": 1,
    "mediumCount": 5,
    "lowCount": 14,
    "totalCount": 20
  }
];

export const ALL_SPECIALIZATIONS: string[] = [
  'Все специализации',
  'ОС и диагностика',
  'Сети и протоколы',
  'Веб-серверы и СУБД',
  'Виртуализация и контейнеры',
  'Автоматизация и DevOps',
  'Мониторинг и логи',
  'Почта и сервисы',
  'Безопасность и доступ',
  'Хранилища и бэкапы',
  'Удалённый доступ и прочее',
];

export const ALL_TECH_TYPES: string[] = [
  'Все типы',
  'Программа',
  'Технология',
  'Утилита',
  'ОС',
  'Платформа',
  'Язык',
  'Набор программ',
];

export const TECH_CATALOG: TechItem[] = [
  {
    "id": "tool-1-alpine-linux",
    "num": 1,
    "name": "Alpine Linux",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Alpine. Используется для расширения базового функционала системы.",
    "docUrl": "https://docs.alpinelinux.org/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать Alpine Linux в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y alpine || docker run -d alpine"
  },
  {
    "id": "tool-2-debian",
    "num": 2,
    "name": "Debian",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Debian. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.debian.org/doc/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать Debian в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y debian || docker run -d debian"
  },
  {
    "id": "tool-3-freebsd",
    "num": 3,
    "name": "FreeBSD",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории FreeBSD. Используется для расширения базового функционала системы.",
    "docUrl": "https://docs.freebsd.org/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать FreeBSD в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y freebsd || docker run -d freebsd"
  },
  {
    "id": "tool-4-rhel-almalinux-rocky",
    "num": 4,
    "name": "RHEL / AlmaLinux / Rocky",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Rocky. Используется для расширения базового функционала системы.",
    "docUrl": "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать RHEL / AlmaLinux / Rocky в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rhel || docker run -d rhel"
  },
  {
    "id": "tool-5-ubuntu-server",
    "num": 5,
    "name": "Ubuntu Server",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Ubuntu. Используется для расширения базового функционала системы.",
    "docUrl": "https://ubuntu.com/server/docs",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать Ubuntu Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ubuntu || docker run -d ubuntu"
  },
  {
    "id": "tool-6-windows-10-11",
    "num": 6,
    "name": "Windows 10/11",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Корпоративный десктоп, доменные машины",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Windows 10/11 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-7-windows-server-2022-2025",
    "num": 7,
    "name": "Windows Server 2022/2025",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Домен, файловые и терминальные серверы, Exchange",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Windows Server 2022/2025 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-8-macos",
    "num": 8,
    "name": "macOS",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "macOS"
    ],
    "osRaw": "macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Mac-парки в компаниях, MDM-управление",
    "docUrl": "https://support.apple.com/ru-ru/mac",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать macOS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "brew install macos"
  },
  {
    "id": "tool-9-arch-linux",
    "num": 9,
    "name": "Arch Linux",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Изучение системы «с нуля», rolling-release",
    "docUrl": "https://wiki.archlinux.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Arch Linux в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y arch || docker run -d arch"
  },
  {
    "id": "tool-10-centos-stream",
    "num": 10,
    "name": "CentOS Stream",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Наследник CentOS",
    "docUrl": "https://www.centos.org/centos-stream/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать CentOS Stream в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y centos || docker run -d centos"
  },
  {
    "id": "tool-11-fedora-server",
    "num": 11,
    "name": "Fedora Server",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Тестовый полигон новых технологий Red Hat",
    "docUrl": "https://docs.fedoraproject.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Fedora Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fedora || docker run -d fedora"
  },
  {
    "id": "tool-12-nixos",
    "num": 12,
    "name": "NixOS",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Декларативная конфигурация всей ОС",
    "docUrl": "https://nixos.org/manual/nixos/stable/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать NixOS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nixos || docker run -d nixos"
  },
  {
    "id": "tool-13-openbsd",
    "num": 13,
    "name": "OpenBSD",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Безопасность, firewall, аудиторский эталон",
    "docUrl": "https://www.openbsd.org/faq/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать OpenBSD в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openbsd || docker run -d openbsd"
  },
  {
    "id": "tool-14-openwrt",
    "num": 14,
    "name": "OpenWrt",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Сетевые роутеры, лабораторные шлюзы",
    "docUrl": "https://openwrt.org/docs/start",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать OpenWrt в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openwrt || docker run -d openwrt"
  },
  {
    "id": "tool-15-suse-linux-enterprise",
    "num": 15,
    "name": "SUSE Linux Enterprise",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Enterprise-сегмент в Европе",
    "docUrl": "https://documentation.suse.com/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать SUSE Linux Enterprise в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y suse || docker run -d suse"
  },
  {
    "id": "tool-16-vyos",
    "num": 16,
    "name": "VyOS",
    "type": "ОС",
    "specialization": "ОС и диагностика",
    "category": "Операционные системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Linux-роутер с CLI в стиле Cisco",
    "docUrl": "https://docs.vyos.io/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать VyOS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vyos || docker run -d vyos"
  },
  {
    "id": "tool-17-atop",
    "num": 17,
    "name": "atop",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории atop. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.atoptool.nl/downloadnetstat.php",
    "sources": "IT_Mega_Matrix, Tools_Roadmap",
    "testLab": "Развернуть и протестировать atop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y atop || docker run -d atop"
  },
  {
    "id": "tool-18-dmesg",
    "num": 18,
    "name": "dmesg",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Журнал ядра: железо, ошибки драйверов",
    "docUrl": "https://man7.org/linux/man-pages/man1/dmesg.1.html",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать dmesg в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dmesg || docker run -d dmesg"
  },
  {
    "id": "tool-19-dstat-vmstat-iostat",
    "num": 19,
    "name": "dstat / vmstat / iostat",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Классические утилиты статистики",
    "docUrl": "https://linux.die.net/man/1/vmstat",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать dstat / vmstat / iostat в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dstat || docker run -d dstat"
  },
  {
    "id": "tool-20-du-df",
    "num": 20,
    "name": "du / df",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории du. Используется для расширения базового функционала системы.",
    "docUrl": "https://man7.org/linux/man-pages/man1/df.1.html",
    "sources": "IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать du / df в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y du || docker run -d du"
  },
  {
    "id": "tool-21-event-viewer",
    "num": 21,
    "name": "Event Viewer",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Журналы событий Windows, первый инструмент расследования",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/win32/events/windows-event-log",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Event Viewer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install event || choco install event"
  },
  {
    "id": "tool-22-grep",
    "num": 22,
    "name": "grep",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории grep. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.gnu.org/software/grep/manual/grep.html",
    "sources": "IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать grep в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y grep || docker run -d grep"
  },
  {
    "id": "tool-23-htop",
    "num": 23,
    "name": "htop",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории htop. Используется для расширения базового функционала системы.",
    "docUrl": "https://htop.dev/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать htop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y htop || docker run -d htop"
  },
  {
    "id": "tool-24-lsof",
    "num": 24,
    "name": "lsof",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Выводит список всех открытых файлов, каталогов и сетевых сокетов, удерживаемых процессами операционной системы.",
    "docUrl": "https://man7.org/linux/man-pages/man8/lsof.8.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать lsof в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lsof || docker run -d lsof"
  },
  {
    "id": "tool-25-memtest86",
    "num": 25,
    "name": "MemTest86+",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Автономная загрузочная утилита (BIOS/UEFI) для аппаратного стресс-тестирования модулей оперативной памяти на наличие битых ячеек.",
    "docUrl": "https://www.memtest86.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать MemTest86+ в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y memtest86+ || docker run -d memtest86+"
  },
  {
    "id": "tool-26-ncdu",
    "num": 26,
    "name": "ncdu",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории ncdu. Используется для расширения базового функционала системы.",
    "docUrl": "https://dev.yorhel.nl/ncdu/man",
    "sources": "IT_Mega_Matrix, Tools_Roadmap",
    "testLab": "Развернуть и протестировать ncdu в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ncdu || docker run -d ncdu"
  },
  {
    "id": "tool-27-process-explorer",
    "num": 27,
    "name": "Process Explorer",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Продвинутая замена Диспетчера задач Windows. Показывает дерево процессов, удерживаемые файловые дескрипторы (Handles), библиотеки DLL и интеграцию с VirusTotal.",
    "docUrl": "https://learn.microsoft.com/ru-ru/sysinternals/downloads/process-explorer",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Process Explorer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install process || choco install process"
  },
  {
    "id": "tool-28-process-monitor",
    "num": 28,
    "name": "Process Monitor",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Трассировщик в реальном времени всех обращений процессов к файловой системе, реестру Windows, сети и системным вызовам.",
    "docUrl": "https://learn.microsoft.com/ru-ru/sysinternals/downloads/procmon",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Process Monitor в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install process || choco install process"
  },
  {
    "id": "tool-29-resource-monitor",
    "num": 29,
    "name": "Resource Monitor",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Штатный мониторинг процессов и ресурсов",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/performance-monitor-overview",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Resource Monitor в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install resource || choco install resource"
  },
  {
    "id": "tool-30-screen",
    "num": 30,
    "name": "screen",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории screen. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.gnu.org/software/screen/manual/screen.html",
    "sources": "IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать screen в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y screen || docker run -d screen"
  },
  {
    "id": "tool-31-sfc-dism",
    "num": 31,
    "name": "sfc / DISM",
    "type": "Технология",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Проверка и восстановление системных файлов Windows",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/windows-commands/sfc",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать sfc / DISM в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install sfc || choco install sfc"
  },
  {
    "id": "tool-32-ss-netstat",
    "num": 32,
    "name": "ss / netstat",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Открытые порты и сетевые соединения",
    "docUrl": "https://man7.org/linux/man-pages/man8/ss.8.html",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать ss / netstat в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ss || docker run -d ss"
  },
  {
    "id": "tool-33-sysinternals-suite",
    "num": 33,
    "name": "Sysinternals Suite",
    "type": "Набор программ",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Набор утилит от Microsoft (обязательно)",
    "docUrl": "https://learn.microsoft.com/ru-ru/sysinternals/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Sysinternals Suite в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install sysinternals || choco install sysinternals"
  },
  {
    "id": "tool-34-systemd",
    "num": 34,
    "name": "systemd",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории systemd. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.freedesktop.org/wiki/Software/systemd/",
    "sources": "IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать systemd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y systemd || docker run -d systemd"
  },
  {
    "id": "tool-35-tar",
    "num": 35,
    "name": "tar",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории tar. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.gnu.org/software/tar/manual/",
    "sources": "IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать tar в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tar || docker run -d tar"
  },
  {
    "id": "tool-36-tmux",
    "num": 36,
    "name": "tmux",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории tmux. Используется для расширения базового функционала системы.",
    "docUrl": "https://github.com/tmux/tmux/wiki",
    "sources": "IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать tmux в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tmux || docker run -d tmux"
  },
  {
    "id": "tool-37-top",
    "num": 37,
    "name": "top",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории top. Используется для расширения базового функционала системы.",
    "docUrl": "https://man7.org/linux/man-pages/man1/top.1.html",
    "sources": "IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать top в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y top || docker run -d top"
  },
  {
    "id": "tool-38-autoruns",
    "num": 38,
    "name": "Autoruns",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Управление автозагрузкой (Sysinternals)",
    "docUrl": "https://learn.microsoft.com/ru-ru/sysinternals/downloads/autoruns",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Autoruns в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install autoruns || choco install autoruns"
  },
  {
    "id": "tool-39-btop-bpytop",
    "num": 39,
    "name": "btop / bpytop",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Современный htop-подобный мониторинг",
    "docUrl": "https://github.com/aristocratos/btop",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать btop / bpytop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y btop || docker run -d btop"
  },
  {
    "id": "tool-40-cron-systemd-timers",
    "num": 40,
    "name": "cron / systemd timers",
    "type": "Технология",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Планировщики задач Linux: разовые (cron/at) и таймеры systemd.",
    "docUrl": "https://www.freedesktop.org/software/systemd/man/systemd.timer.html",
    "sources": "добавлено",
    "testLab": "Развернуть и протестировать cron / systemd timers в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cron || docker run -d cron"
  },
  {
    "id": "tool-41-dd",
    "num": 41,
    "name": "dd",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Побитовое копирование дисков",
    "docUrl": "https://man7.org/linux/man-pages/man1/dd.1.html",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать dd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dd || docker run -d dd"
  },
  {
    "id": "tool-42-hwinfo",
    "num": 42,
    "name": "HWiNFO",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Подробные датчики температуры, напряжения, частот",
    "docUrl": "https://www.hwinfo.com/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать HWiNFO в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install hwinfo || choco install hwinfo"
  },
  {
    "id": "tool-43-iftop-nethogs",
    "num": 43,
    "name": "iftop / nethogs",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Использование сети по процессам",
    "docUrl": "https://github.com/raboof/nethogs",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать iftop / nethogs в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iftop || docker run -d iftop"
  },
  {
    "id": "tool-44-iotop",
    "num": 44,
    "name": "iotop",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Мониторинг дисковой I/O по процессам",
    "docUrl": "https://github.com/Tomas-M/iotop",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать iotop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iotop || docker run -d iotop"
  },
  {
    "id": "tool-45-midnight-commander",
    "num": 45,
    "name": "Midnight Commander",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Файловый менеджер в консоли",
    "docUrl": "https://midnight-commander.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Midnight Commander в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y midnight || docker run -d midnight"
  },
  {
    "id": "tool-46-process-hacker",
    "num": 46,
    "name": "Process Hacker",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Альтернатива Process Explorer",
    "docUrl": "https://processhacker.sourceforge.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Process Hacker в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install process || choco install process"
  },
  {
    "id": "tool-47-strace",
    "num": 47,
    "name": "strace",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Трассировка системных вызовов процесса",
    "docUrl": "https://strace.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать strace в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y strace || docker run -d strace"
  },
  {
    "id": "tool-48-tcpview",
    "num": 48,
    "name": "TCPView",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Просмотр сетевых соединений (Sysinternals)",
    "docUrl": "https://learn.microsoft.com/ru-ru/sysinternals/downloads/tcpview",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать TCPView в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install tcpview || choco install tcpview"
  },
  {
    "id": "tool-49-aida64",
    "num": 49,
    "name": "AIDA64",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Полная информация о железе",
    "docUrl": "https://www.aida64.com/documentation",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать AIDA64 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y aida64 || docker run -d aida64"
  },
  {
    "id": "tool-50-bluescreenview",
    "num": 50,
    "name": "BlueScreenView",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Анализ дампов синего экрана (BSOD)",
    "docUrl": "https://www.nirsoft.net/utils/blue_screen_view.html",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать BlueScreenView в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install bluescreenview || choco install bluescreenview"
  },
  {
    "id": "tool-51-perf",
    "num": 51,
    "name": "perf",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Профилирование производительности",
    "docUrl": "https://perf.wiki.kernel.org/index.php/Main_Page",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать perf в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y perf || docker run -d perf"
  },
  {
    "id": "tool-52-ranger-nnn",
    "num": 52,
    "name": "ranger / nnn",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Консольные файловые менеджеры",
    "docUrl": "https://github.com/jarun/nnn",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать ranger / nnn в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ranger || docker run -d ranger"
  },
  {
    "id": "tool-53-reliability-monitor",
    "num": 53,
    "name": "Reliability Monitor",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "История сбоев системы по дням",
    "docUrl": "https://ru.wikipedia.org/wiki/Монитор_надёжности",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Reliability Monitor в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install reliability || choco install reliability"
  },
  {
    "id": "tool-54-sar-sysstat",
    "num": 54,
    "name": "sar / sysstat",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Системные утилиты и процессы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Историческая статистика системы",
    "docUrl": "https://github.com/sysstat/sysstat",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать sar / sysstat в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sar || docker run -d sar"
  },
  {
    "id": "tool-55-crystaldiskinfo",
    "num": 55,
    "name": "CrystalDiskInfo",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Утилита быстрого визуального мониторинга здоровья HDD/SSD/NVMe накопителей, температуры и процента остаточного ресурса ячеек.",
    "docUrl": "https://crystalmark.info/en/software/crystaldiskinfo/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать CrystalDiskInfo в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install crystaldiskinfo || choco install crystaldiskinfo"
  },
  {
    "id": "tool-56-dmidecode",
    "num": 56,
    "name": "dmidecode",
    "type": "Утилита",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Утилита чтения таблиц DMI/SMBIOS: извлечение точных сведений о модели материнской платы, планках памяти, слотах расширения и BIOS.",
    "docUrl": "https://man7.org/linux/man-pages/man8/dmidecode.8.html",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать dmidecode в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dmidecode || docker run -d dmidecode"
  },
  {
    "id": "tool-57-htop-btop",
    "num": 57,
    "name": "htop / btop",
    "type": "Утилита",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Интерактивные продвинутые текстовые мониторы процессов с визуализацией загрузки CPU по ядрам, памяти, SWAP, дисков и сети.",
    "docUrl": "https://github.com/aristocratos/btop",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать htop / btop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y htop || docker run -d htop"
  },
  {
    "id": "tool-58-lshw-dmidecode-inxi",
    "num": 58,
    "name": "lshw / dmidecode / inxi",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Информация о железе",
    "docUrl": "https://man7.org/linux/man-pages/man8/dmidecode.8.html",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать lshw / dmidecode / inxi в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lshw || docker run -d lshw"
  },
  {
    "id": "tool-59-smartmontools",
    "num": 59,
    "name": "smartmontools",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Главный консольный инструмент Unix для опроса атрибутов SMART, запуска самотестов накопителей и мониторинга аппаратного состояния дисков.",
    "docUrl": "https://www.smartmontools.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать smartmontools в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y smartmontools || docker run -d smartmontools"
  },
  {
    "id": "tool-60-stress-ng",
    "num": 60,
    "name": "stress-ng",
    "type": "Утилита",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Утилита для стресс-тестирования подсистем компьютера: CPU, памяти, дискового ввода-вывода (IOPS) и сетевых стеков.",
    "docUrl": "https://github.com/ColinIanKing/stress-ng",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать stress-ng в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y stress-ng || docker run -d stress-ng"
  },
  {
    "id": "tool-61-victoria-hdd-ssd",
    "num": 61,
    "name": "Victoria HDD/SSD",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Легендарная утилита для глубокого низкоуровневого тестирования поверхности дисков, карты задержек секторов и ремапа сбойных блоков (Bad-blocks).",
    "docUrl": "https://en.wikipedia.org/w/index.php?search=Victoria+HDD%2FSSD",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Victoria HDD/SSD в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install victoria || choco install victoria"
  },
  {
    "id": "tool-62-cpu-z-gpu-z-hwinfo",
    "num": 62,
    "name": "CPU-Z / GPU-Z / HWiNFO",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Информация о железе Windows",
    "docUrl": "https://www.hwinfo.com/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать CPU-Z / GPU-Z / HWiNFO в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install cpu-z || choco install cpu-z"
  },
  {
    "id": "tool-63-fio",
    "num": 63,
    "name": "fio",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Гибкий тест дисковой подсистемы",
    "docUrl": "https://fio.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать fio в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fio || docker run -d fio"
  },
  {
    "id": "tool-64-hddscan",
    "num": 64,
    "name": "HDDScan",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Диагностика дисков",
    "docUrl": "https://hddscan.com/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать HDDScan в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install hddscan || choco install hddscan"
  },
  {
    "id": "tool-65-hdparm",
    "num": 65,
    "name": "hdparm",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Управление и тест HDD/SSD",
    "docUrl": "https://man7.org/linux/man-pages/man8/hdparm.8.html",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать hdparm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y hdparm || docker run -d hdparm"
  },
  {
    "id": "tool-66-nvme-cli",
    "num": 66,
    "name": "nvme-cli",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Управление NVMe-дисками",
    "docUrl": "https://github.com/linux-nvme/nvme-cli",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать nvme-cli в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nvme-cli || docker run -d nvme-cli"
  },
  {
    "id": "tool-67-crystaldiskmark",
    "num": 67,
    "name": "CrystalDiskMark",
    "type": "Программа",
    "specialization": "ОС и диагностика",
    "category": "Диагностика железа и дисков",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Бенчмарк скорости дисков",
    "docUrl": "https://crystalmark.info/en/software/crystaldiskmark/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать CrystalDiskMark в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install crystaldiskmark || choco install crystaldiskmark"
  },
  {
    "id": "tool-68-bind9",
    "num": 68,
    "name": "BIND9",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Самый распространенный сервер DNS в интернете: авторитативные и кэширующие зоны, DNSSEC, Split-DNS (views).",
    "docUrl": "https://bind9.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать BIND9 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y bind9 || docker run -d bind9"
  },
  {
    "id": "tool-69-cisco-packet-tracer",
    "num": 69,
    "name": "Cisco Packet Tracer",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Cisco. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.netacad.com/courses/packet-tracer",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать Cisco Packet Tracer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cisco || docker run -d cisco"
  },
  {
    "id": "tool-70-curl",
    "num": 70,
    "name": "curl",
    "type": "Утилита",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Универсальная консольная утилита передачи данных по протоколам HTTP, HTTPS, FTP, SFTP. Главный инструмент проверки сетевых ответов.",
    "docUrl": "https://curl.se/docs/",
    "sources": "Admin_Full_Map, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать curl в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y curl || docker run -d curl"
  },
  {
    "id": "tool-71-dhcp",
    "num": 71,
    "name": "DHCP",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Автоматическая раздача адресов",
    "docUrl": "https://ru.wikipedia.org/wiki/DHCP",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать DHCP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dhcp || docker run -d dhcp"
  },
  {
    "id": "tool-72-dig",
    "num": 72,
    "name": "dig",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Диагностика DNS",
    "docUrl": "https://bind9.readthedocs.io/en/latest/reference/manpages/bind9/dig.html",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать dig в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dig || docker run -d dig"
  },
  {
    "id": "tool-73-dig-nslookup",
    "num": 73,
    "name": "dig / nslookup",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Проверка DNS-записей",
    "docUrl": "https://bind9.readthedocs.io/en/latest/reference/manpages/bind9/dig.html",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать dig / nslookup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dig || docker run -d dig"
  },
  {
    "id": "tool-74-dns",
    "num": 74,
    "name": "DNS",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Разрешение имён",
    "docUrl": "https://ru.wikipedia.org/wiki/DNS",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать DNS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dns || docker run -d dns"
  },
  {
    "id": "tool-75-dnsmasq",
    "num": 75,
    "name": "dnsmasq",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Лёгкие DNS+DHCP для локальных сетей и роутеров",
    "docUrl": "https://thekelleys.org.uk/dnsmasq/doc.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать dnsmasq в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dnsmasq || docker run -d dnsmasq"
  },
  {
    "id": "tool-76-frrouting-quagga",
    "num": 76,
    "name": "FRRouting / Quagga",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Стек протоколов динамической маршрутизации для Linux/FreeBSD (BGP, OSPF, IS-IS, RIP) с интерфейсом командной строки в стиле Cisco (vtysh).",
    "docUrl": "https://docs.frrouting.org/",
    "sources": "SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать FRRouting / Quagga в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y frrouting || docker run -d frrouting"
  },
  {
    "id": "tool-77-gns3-eve-ng",
    "num": 77,
    "name": "GNS3 / EVE-NG",
    "type": "Платформа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сетевые эмуляторы для моделирования сложных топологий на реальных образах Cisco IOS, MikroTik CHR, Arista, Juniper и Linux.",
    "docUrl": "https://docs.gns3.com/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, Technologies_Programs",
    "testLab": "Развернуть и протестировать GNS3 / EVE-NG в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y gns3 || docker run -d gns3"
  },
  {
    "id": "tool-78-iperf3",
    "num": 78,
    "name": "iperf3",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Эталонный инструмент измерения реальной скорости передачи данных в сети (TCP/UDP bandwidth, джиттер, потери пакетов).",
    "docUrl": "https://iperf.fr/iperf-doc.php",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать iperf3 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iperf3 || docker run -d iperf3"
  },
  {
    "id": "tool-79-iproute2",
    "num": 79,
    "name": "iproute2",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории iproute2. Используется для расширения базового функционала системы.",
    "docUrl": "https://man7.org/linux/man-pages/man8/ip.8.html",
    "sources": "IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать iproute2 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iproute2 || docker run -d iproute2"
  },
  {
    "id": "tool-80-iptables",
    "num": 80,
    "name": "iptables",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории iptables. Используется для расширения базового функционала системы.",
    "docUrl": "https://netfilter.org/documentation/",
    "sources": "IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать iptables в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iptables || docker run -d iptables"
  },
  {
    "id": "tool-81-mikrotik-winbox",
    "num": 81,
    "name": "MikroTik Winbox",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Графическая утилита быстрого подключения и настройки маршрутизаторов MikroTik RouterOS по MAC-адресу или IP.",
    "docUrl": "https://help.mikrotik.com/docs/display/ROS/Winbox",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать MikroTik Winbox в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mikrotik || docker run -d mikrotik"
  },
  {
    "id": "tool-82-mtr",
    "num": 82,
    "name": "MTR",
    "type": "Утилита",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сетевой трассировщик, объединяющий traceroute и ping: непрерывно отслеживает качество каждого промежуточного маршрутизатора.",
    "docUrl": "https://bitwizard.nl/mtr/",
    "sources": "Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать MTR в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mtr || docker run -d mtr"
  },
  {
    "id": "tool-83-netplan",
    "num": 83,
    "name": "Netplan",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Конфигурация сети в Ubuntu",
    "docUrl": "https://netplan.readthedocs.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Netplan в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y netplan || docker run -d netplan"
  },
  {
    "id": "tool-84-nftables",
    "num": 84,
    "name": "nftables",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории nftables. Используется для расширения базового функционала системы.",
    "docUrl": "https://netfilter.org/projects/nftables/",
    "sources": "IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать nftables в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nftables || docker run -d nftables"
  },
  {
    "id": "tool-85-nmap",
    "num": 85,
    "name": "Nmap",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сетевой сканер безопасности: инвентаризация активных хостов, аудит открытых портов, определение версий ОС и запуск проверок через скрипты NSE.",
    "docUrl": "https://nmap.org/book/man.html",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Nmap в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nmap || docker run -d nmap"
  },
  {
    "id": "tool-86-nslookup",
    "num": 86,
    "name": "nslookup",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Диагностика DNS (классика)",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/windows-commands/nslookup",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать nslookup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nslookup || docker run -d nslookup"
  },
  {
    "id": "tool-87-ntp",
    "num": 87,
    "name": "NTP",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Синхронизация времени",
    "docUrl": "https://ru.wikipedia.org/wiki/NTP",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать NTP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ntp || docker run -d ntp"
  },
  {
    "id": "tool-88-smtp-imap-pop3",
    "num": 88,
    "name": "SMTP / IMAP / POP3",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Почтовые протоколы",
    "docUrl": "https://ru.wikipedia.org/wiki/SMTP",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать SMTP / IMAP / POP3 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y smtp || docker run -d smtp"
  },
  {
    "id": "tool-89-tcpdump",
    "num": 89,
    "name": "tcpdump",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Консольный анализатор сетевых пакетов для серверов без GUI. Стандарт для сетевой диагностики на удаленных серверах по SSH.",
    "docUrl": "https://www.tcpdump.org/manpages/tcpdump.1.html",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать tcpdump в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tcpdump || docker run -d tcpdump"
  },
  {
    "id": "tool-90-tls-1-3-ssl",
    "num": 90,
    "name": "TLS 1.3 / SSL",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Шифрование трафика",
    "docUrl": "https://datatracker.ietf.org/doc/html/rfc8446",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать TLS 1.3 / SSL в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tls || docker run -d tls"
  },
  {
    "id": "tool-91-traceroute-mtr",
    "num": 91,
    "name": "traceroute / mtr",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Поиск места обрыва маршрута",
    "docUrl": "https://bitwizard.nl/mtr/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать traceroute / mtr в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y traceroute || docker run -d traceroute"
  },
  {
    "id": "tool-92-traceroute-tracert-mtr",
    "num": 92,
    "name": "traceroute / tracert / mtr",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Трассировка маршрута",
    "docUrl": "https://bitwizard.nl/mtr/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать traceroute / tracert / mtr в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y traceroute || docker run -d traceroute"
  },
  {
    "id": "tool-93-vlan",
    "num": 93,
    "name": "VLAN",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сегментация сети",
    "docUrl": "https://ru.wikipedia.org/wiki/VLAN",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать VLAN в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vlan || docker run -d vlan"
  },
  {
    "id": "tool-94-wireshark",
    "num": 94,
    "name": "Wireshark",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Самый мощный в мире графический анализатор сетевых пакетов (Sniffer). Позволяет исследовать трафик на всех уровнях модели OSI.",
    "docUrl": "https://www.wireshark.org/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Wireshark в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y wireshark || docker run -d wireshark"
  },
  {
    "id": "tool-95-bgp-ospf",
    "num": 95,
    "name": "BGP / OSPF",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Маршрутизация интернета и корпоративных сетей",
    "docUrl": "https://ru.wikipedia.org/wiki/BGP",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать BGP / OSPF в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y bgp || docker run -d bgp"
  },
  {
    "id": "tool-96-http-2-http-3",
    "num": 96,
    "name": "HTTP/2, HTTP/3",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Современные версии веб-протокола",
    "docUrl": "https://en.wikipedia.org/w/index.php?search=HTTP%2F2%2C+HTTP%2F3",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать HTTP/2, HTTP/3 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y http || docker run -d http"
  },
  {
    "id": "tool-97-isc-dhcp",
    "num": 97,
    "name": "ISC DHCP",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Классический DHCP-сервер",
    "docUrl": "https://www.isc.org/dhcp/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать ISC DHCP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y isc || docker run -d isc"
  },
  {
    "id": "tool-98-kea-dhcp",
    "num": 98,
    "name": "Kea DHCP",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Современный DHCP-сервер от ISC",
    "docUrl": "https://kea.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Kea DHCP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kea || docker run -d kea"
  },
  {
    "id": "tool-99-netcat-ncat",
    "num": 99,
    "name": "netcat / ncat",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Швейцарский нож для TCP/UDP",
    "docUrl": "https://nmap.org/ncat/guide/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать netcat / ncat в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y netcat || docker run -d netcat"
  },
  {
    "id": "tool-100-networkmanager",
    "num": 100,
    "name": "NetworkManager",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Управление сетью в Linux (особенно desktop)",
    "docUrl": "https://networkmanager.dev/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать NetworkManager в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y networkmanager || docker run -d networkmanager"
  },
  {
    "id": "tool-101-snmp",
    "num": 101,
    "name": "SNMP",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Опрос сетевого оборудования",
    "docUrl": "https://ru.wikipedia.org/wiki/SNMP",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать SNMP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y snmp || docker run -d snmp"
  },
  {
    "id": "tool-102-stp",
    "num": 102,
    "name": "STP",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Защита коммутаторов от петель",
    "docUrl": "https://ru.wikipedia.org/wiki/Spanning_Tree_Protocol",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать STP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y stp || docker run -d stp"
  },
  {
    "id": "tool-103-systemd-networkd",
    "num": 103,
    "name": "systemd-networkd",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Сетевой демон systemd",
    "docUrl": "https://www.freedesktop.org/software/systemd/man/systemd-networkd.html",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать systemd-networkd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y systemd-networkd || docker run -d systemd-networkd"
  },
  {
    "id": "tool-104-unbound",
    "num": 104,
    "name": "Unbound",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Резолвер DNS с валидацией DNSSEC",
    "docUrl": "https://unbound.docs.nlnetlabs.nl/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Unbound в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y unbound || docker run -d unbound"
  },
  {
    "id": "tool-105-windows-dhcp-server",
    "num": 105,
    "name": "Windows DHCP Server",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "DHCP в Windows Server",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/networking/technologies/dhcp/dhcp-top",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Windows DHCP Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-106-windows-dns-server",
    "num": 106,
    "name": "Windows DNS Server",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "DNS в Windows Server / AD",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/networking/dns/dns-top",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Windows DNS Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-107-advanced-ip-scanner",
    "num": 107,
    "name": "Advanced IP Scanner",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Быстрый сканер хостов и портов для Windows",
    "docUrl": "https://www.advanced-ip-scanner.com/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Advanced IP Scanner в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install advanced || choco install advanced"
  },
  {
    "id": "tool-108-angry-ip-scanner",
    "num": 108,
    "name": "Angry IP Scanner",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Простой сканер сети с GUI",
    "docUrl": "https://angryip.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Angry IP Scanner в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y angry || docker run -d angry"
  },
  {
    "id": "tool-109-bird",
    "num": 109,
    "name": "Bird",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Демон маршрутизации",
    "docUrl": "https://bird.network.cz/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Bird в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y bird || docker run -d bird"
  },
  {
    "id": "tool-110-coredns",
    "num": 110,
    "name": "CoreDNS",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "DNS в Kubernetes",
    "docUrl": "https://coredns.io/manual/toc/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать CoreDNS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y coredns || docker run -d coredns"
  },
  {
    "id": "tool-111-lldp-cdp",
    "num": 111,
    "name": "LLDP / CDP",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Обнаружение соседей в сети",
    "docUrl": "https://ru.wikipedia.org/wiki/LLDP",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать LLDP / CDP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lldp || docker run -d lldp"
  },
  {
    "id": "tool-112-masscan",
    "num": 112,
    "name": "Masscan",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Очень быстрый сканер портов",
    "docUrl": "https://github.com/robertdavidgraham/masscan",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Masscan в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y masscan || docker run -d masscan"
  },
  {
    "id": "tool-113-open-vswitch",
    "num": 113,
    "name": "Open vSwitch",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Программный коммутатор",
    "docUrl": "https://docs.openvswitch.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Open vSwitch в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y open || docker run -d open"
  },
  {
    "id": "tool-114-pi-hole",
    "num": 114,
    "name": "Pi-hole",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "DNS-уровень блокировки рекламы",
    "docUrl": "https://docs.pi-hole.net/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Pi-hole в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y pi-hole || docker run -d pi-hole"
  },
  {
    "id": "tool-115-poe",
    "num": 115,
    "name": "PoE",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Питание оборудования по витой паре",
    "docUrl": "https://ru.wikipedia.org/wiki/Power_over_Ethernet",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать PoE в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y poe || docker run -d poe"
  },
  {
    "id": "tool-116-powerdns",
    "num": 116,
    "name": "PowerDNS",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "DNS-сервер с хранением зон в БД",
    "docUrl": "https://doc.powerdns.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать PowerDNS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y powerdns || docker run -d powerdns"
  },
  {
    "id": "tool-117-radius-tacacs",
    "num": 117,
    "name": "RADIUS / TACACS+",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Централизованная аутентификация в сети",
    "docUrl": "https://ru.wikipedia.org/wiki/RADIUS",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать RADIUS / TACACS+ в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y radius || docker run -d radius"
  },
  {
    "id": "tool-118-softperfect-network-scanner",
    "num": 118,
    "name": "SoftPerfect Network Scanner",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Сканер сети",
    "docUrl": "https://www.softperfect.com/products/networkscan/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать SoftPerfect Network Scanner в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install softperfect || choco install softperfect"
  },
  {
    "id": "tool-119-tcpflow-tshark",
    "num": 119,
    "name": "tcpflow / tshark",
    "type": "Программа",
    "specialization": "Сети и протоколы",
    "category": "Сети, DNS, DHCP и диагностика",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Анализ трафика",
    "docUrl": "https://www.wireshark.org/docs/man-pages/tshark.html",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать tcpflow / tshark в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tcpflow || docker run -d tcpflow"
  },
  {
    "id": "tool-120-mikrotik-routeros",
    "num": 120,
    "name": "MikroTik RouterOS",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сетевое оборудование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории MikroTik. Используется для расширения базового функционала системы.",
    "docUrl": "https://help.mikrotik.com/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать MikroTik RouterOS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mikrotik || docker run -d mikrotik"
  },
  {
    "id": "tool-121-cisco-ios-nx-os",
    "num": 121,
    "name": "Cisco IOS / NX-OS",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сетевое оборудование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "CLI маршрутизаторов и коммутаторов Cisco",
    "docUrl": "https://www.cisco.com/c/en/us/support/ios-nx-os-software/index.html",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Cisco IOS / NX-OS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cisco || docker run -d cisco"
  },
  {
    "id": "tool-122-juniper-junos",
    "num": 122,
    "name": "Juniper JunOS",
    "type": "Технология",
    "specialization": "Сети и протоколы",
    "category": "Сетевое оборудование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Сетевой инженер"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Enterprise-сети Juniper",
    "docUrl": "https://www.juniper.net/documentation/product/en_US/junos-os",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Juniper JunOS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y juniper || docker run -d juniper"
  },
  {
    "id": "tool-123-apache-http-server",
    "num": 123,
    "name": "Apache HTTP Server",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Классический модульный веб-сервер с поддержкой децентрализованных файлов .htaccess, модулей mod_rewrite, mod_proxy и многопоточных MPM-воркеров.",
    "docUrl": "https://httpd.apache.org/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Apache HTTP Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y apache || docker run -d apache"
  },
  {
    "id": "tool-124-caddy",
    "num": 124,
    "name": "Caddy",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Современный высокопроизводительный веб-сервер на языке Go с автоматическим выпуском и бесшовным продлением TLS-сертификатов по умолчанию.",
    "docUrl": "https://caddyserver.com/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Caddy в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y caddy || docker run -d caddy"
  },
  {
    "id": "tool-125-haproxy",
    "num": 125,
    "name": "HAProxy",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Индустриальный стандарт высоконадежной балансировки нагрузки для TCP (L4) и HTTP (L7) соединений с задержками менее 1 мс.",
    "docUrl": "https://docs.haproxy.org/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать HAProxy в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y haproxy || docker run -d haproxy"
  },
  {
    "id": "tool-126-nginx",
    "num": 126,
    "name": "Nginx",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сверхбыстрый асинхронный веб-сервер, обратный прокси (Reverse Proxy), балансировщик HTTP/TCP нагрузки и терминатор SSL/TLS.",
    "docUrl": "https://nginx.org/ru/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Nginx в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nginx || docker run -d nginx"
  },
  {
    "id": "tool-127-squid",
    "num": 127,
    "name": "Squid",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Классический кэширующий Forward-прокси для фильтрации исходящего интернет-трафика сотрудников, авторизации и экономии полосы пропускания.",
    "docUrl": "http://www.squid-cache.org/Doc/",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать Squid в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y squid || docker run -d squid"
  },
  {
    "id": "tool-128-traefik",
    "num": 128,
    "name": "Traefik",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Edge-маршрутизатор и обратный прокси для микросервисов с автоматическим Service Discovery через Docker Labels и Kubernetes Ingress.",
    "docUrl": "https://doc.traefik.io/traefik/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Traefik в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y traefik || docker run -d traefik"
  },
  {
    "id": "tool-129-envoy",
    "num": 129,
    "name": "Envoy",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Высокопроизводительный C++ прокси для Cloud-Native архитектур и сервисных сеток (Service Mesh Istio, Consul).",
    "docUrl": "https://www.envoyproxy.io/docs/envoy/latest/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать Envoy в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y envoy || docker run -d envoy"
  },
  {
    "id": "tool-130-iis",
    "num": 130,
    "name": "IIS",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Веб-сервер Windows (Internet Information Services)",
    "docUrl": "https://learn.microsoft.com/ru-ru/iis/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать IIS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install iis || choco install iis"
  },
  {
    "id": "tool-131-nginx-proxy-manager",
    "num": 131,
    "name": "Nginx Proxy Manager",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Веб-интерфейс для управления Nginx Proxy",
    "docUrl": "https://nginxproxymanager.com/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Nginx Proxy Manager в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nginx || docker run -d nginx"
  },
  {
    "id": "tool-132-lighttpd",
    "num": 132,
    "name": "Lighttpd",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Лёгкий веб-сервер",
    "docUrl": "https://wiki.lighttpd.net/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Lighttpd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lighttpd || docker run -d lighttpd"
  },
  {
    "id": "tool-133-openresty",
    "num": 133,
    "name": "OpenResty",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Веб-серверы и Reverse Proxy",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Nginx + Lua-скриптинг",
    "docUrl": "https://openresty.org/en/#documentation",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать OpenResty в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openresty || docker run -d openresty"
  },
  {
    "id": "tool-134-apache-kafka",
    "num": 134,
    "name": "Apache Kafka",
    "type": "Технология",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Senior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Распределенная платформа потоковой передачи событий и брокер сообщений для построения событийно-ориентированных архитектур (Event-Driven).",
    "docUrl": "https://kafka.apache.org/documentation/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать Apache Kafka в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y apache || docker run -d apache"
  },
  {
    "id": "tool-135-clickhouse",
    "num": 135,
    "name": "ClickHouse",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Колоночная аналитическая СУБД (OLAP) для молниеносной обработки миллиардов строк структурированных логов и метрик.",
    "docUrl": "https://docs.clickhouse.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать ClickHouse в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y clickhouse || docker run -d clickhouse"
  },
  {
    "id": "tool-136-mysql",
    "num": 136,
    "name": "MySQL",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории MySQL. Используется для расширения базового функционала системы.",
    "docUrl": "https://dev.mysql.com/doc/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать MySQL в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mysql || docker run -d mysql"
  },
  {
    "id": "tool-137-rabbitmq",
    "num": 137,
    "name": "RabbitMQ",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Надежный брокер сообщений по протоколам AMQP, MQTT и STOMP с развитой маршрутизацией очередей (Exchange: Direct, Topic, Fanout).",
    "docUrl": "https://www.rabbitmq.com/docs",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать RabbitMQ в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rabbitmq || docker run -d rabbitmq"
  },
  {
    "id": "tool-138-memcached",
    "num": 138,
    "name": "Memcached",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Легковесная распределенная система кэширования объектов в оперативной памяти для снятия нагрузки с реляционных баз данных.",
    "docUrl": "https://memcached.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать Memcached в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y memcached || docker run -d memcached"
  },
  {
    "id": "tool-139-cassandra",
    "num": 139,
    "name": "Cassandra",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Распределённая БД больших масштабов",
    "docUrl": "https://cassandra.apache.org/doc/latest/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Cassandra в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cassandra || docker run -d cassandra"
  },
  {
    "id": "tool-140-etcd",
    "num": 140,
    "name": "etcd",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Ключ-значение, сердце Kubernetes",
    "docUrl": "https://etcd.io/docs/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать etcd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y etcd || docker run -d etcd"
  },
  {
    "id": "tool-141-oracle-database",
    "num": 141,
    "name": "Oracle Database",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Базы данных, кэш и брокеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Банки, госсектор, дорогая",
    "docUrl": "https://docs.oracle.com/en/database/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Oracle Database в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y oracle || docker run -d oracle"
  },
  {
    "id": "tool-142-apache-tomcat",
    "num": 142,
    "name": "Apache Tomcat",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Серверы приложений",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Java-контейнер сервлетов",
    "docUrl": "https://tomcat.apache.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Apache Tomcat в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y apache || docker run -d apache"
  },
  {
    "id": "tool-143-nginx-unit",
    "num": 143,
    "name": "Nginx Unit",
    "type": "Программа",
    "specialization": "Веб-серверы и СУБД",
    "category": "Серверы приложений",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Динамический app-сервер Nginx",
    "docUrl": "https://unit.nginx.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Nginx Unit в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nginx || docker run -d nginx"
  },
  {
    "id": "tool-144-hyper-v",
    "num": 144,
    "name": "Hyper-V",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Встроенный аппаратный гипервизор Microsoft для Windows Server и Windows 10/11 Pro/Enterprise.",
    "docUrl": "https://learn.microsoft.com/ru-ru/virtualization/hyper-v-on-windows/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Hyper-V в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install hyper-v || choco install hyper-v"
  },
  {
    "id": "tool-145-kvm-qemu",
    "num": 145,
    "name": "KVM / QEMU",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Виртуализация Linux, основа Proxmox",
    "docUrl": "https://www.linux-kvm.org/page/Documents",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать KVM / QEMU в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kvm || docker run -d kvm"
  },
  {
    "id": "tool-146-libvirt",
    "num": 146,
    "name": "libvirt",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "API и инструменты управления виртуализацией",
    "docUrl": "https://libvirt.org/docs.html",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать libvirt в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y libvirt || docker run -d libvirt"
  },
  {
    "id": "tool-147-proxmox-ve",
    "num": 147,
    "name": "Proxmox VE",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Корпоративная платформа виртуализации с открытым исходным кодом. Объединяет гипервизор KVM (ВМ) и контейнеры LXC в едином веб-интерфейсе.",
    "docUrl": "https://pve.proxmox.com/pve-docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Proxmox VE в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y proxmox || docker run -d proxmox"
  },
  {
    "id": "tool-148-virtualbox",
    "num": 148,
    "name": "VirtualBox",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Бесплатный гипервизор 2-го типа для настольных компьютеров. Основной инструмент для быстрого поднятия тестовых стендов на ноутбуке.",
    "docUrl": "https://www.virtualbox.org/wiki/Documentation",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать VirtualBox в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y virtualbox || docker run -d virtualbox"
  },
  {
    "id": "tool-149-vmware-esxi-vsphere-vcenter",
    "num": 149,
    "name": "VMware ESXi / vSphere / vCenter",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Промышленный гипервизор 1-го типа (Type-1 Bare-metal). Корпоративный стандарт виртуализации в банках, дата-центрах и энтерпрайзе.",
    "docUrl": "https://docs.vmware.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать VMware ESXi / vSphere / vCenter в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vmware || docker run -d vmware"
  },
  {
    "id": "tool-150-vagrant",
    "num": 150,
    "name": "Vagrant",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Код для автоматического развёртывания стендов",
    "docUrl": "https://developer.hashicorp.com/vagrant/docs",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Vagrant в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vagrant || docker run -d vagrant"
  },
  {
    "id": "tool-151-virt-manager",
    "num": 151,
    "name": "Virt-manager",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Графический интерфейс для libvirt/KVM",
    "docUrl": "https://virt-manager.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Virt-manager в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y virt-manager || docker run -d virt-manager"
  },
  {
    "id": "tool-152-vmware-workstation",
    "num": 152,
    "name": "VMware Workstation",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Мощная десктопная виртуализация",
    "docUrl": "https://docs.vmware.com/en/VMware-Workstation-Pro/index.html",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать VMware Workstation в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vmware || docker run -d vmware"
  },
  {
    "id": "tool-153-incus",
    "num": 153,
    "name": "Incus",
    "type": "Платформа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Форк LXD: контейнеры и ВМ из одной панели, развивается сообществом.",
    "docUrl": "https://linuxcontainers.org/incus/docs/main/",
    "sources": "добавлено",
    "testLab": "Развернуть и протестировать Incus в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y incus || docker run -d incus"
  },
  {
    "id": "tool-154-ovirt",
    "num": 154,
    "name": "oVirt",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Управление виртуализацией (форк RHEV)",
    "docUrl": "https://www.ovirt.org/documentation/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать oVirt в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ovirt || docker run -d ovirt"
  },
  {
    "id": "tool-155-xcp-ng-xen",
    "num": 155,
    "name": "XCP-ng / Xen",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Виртуализация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Открытая альтернатива ESXi",
    "docUrl": "https://docs.xcp-ng.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать XCP-ng / Xen в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y xcp-ng || docker run -d xcp-ng"
  },
  {
    "id": "tool-156-docker",
    "num": 156,
    "name": "Docker",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Технология легковесной контейнеризации на базе механизмов cgroups и namespaces ядра Linux для изоляции приложений со всеми зависимостями.",
    "docUrl": "https://docs.docker.com/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Docker в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y docker || docker run -d docker"
  },
  {
    "id": "tool-157-docker-compose",
    "num": 157,
    "name": "Docker Compose",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Docker. Используется для расширения базового функционала системы.",
    "docUrl": "https://docs.docker.com/compose/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Docker Compose в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y docker || docker run -d docker"
  },
  {
    "id": "tool-158-helm",
    "num": 158,
    "name": "Helm",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Helm. Используется для расширения базового функционала системы.",
    "docUrl": "https://helm.sh/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Helm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y helm || docker run -d helm"
  },
  {
    "id": "tool-159-k3s",
    "num": 159,
    "name": "K3s",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Легковесный сертифицированный дистрибутив Kubernetes от Rancher, потребляющий менее 512 МБ памяти. Идеален для Edge, IoT и домашних лабораторий.",
    "docUrl": "https://docs.k3s.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать K3s в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y k3s || docker run -d k3s"
  },
  {
    "id": "tool-160-kubernetes",
    "num": 160,
    "name": "Kubernetes",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Senior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Промышленный стандарт оркестрации контейнеров: автоматическое масштабирование, самовосстановление упавших подов, балансировка и Rolling Updates.",
    "docUrl": "https://kubernetes.io/ru/docs/home/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Kubernetes в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kubernetes || docker run -d kubernetes"
  },
  {
    "id": "tool-161-kind",
    "num": 161,
    "name": "kind",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Kubernetes в Docker для тестов",
    "docUrl": "https://kind.sigs.k8s.io/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать kind в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kind || docker run -d kind"
  },
  {
    "id": "tool-162-minikube",
    "num": 162,
    "name": "Minikube",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Локальный Kubernetes для обучения",
    "docUrl": "https://minikube.sigs.k8s.io/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Minikube в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y minikube || docker run -d minikube"
  },
  {
    "id": "tool-163-podman",
    "num": 163,
    "name": "Podman",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Контейнеры без демона, совместим с Docker",
    "docUrl": "https://docs.podman.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Podman в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y podman || docker run -d podman"
  },
  {
    "id": "tool-164-portainer",
    "num": 164,
    "name": "Portainer",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Веб-интерфейс для управления Docker/Kubernetes",
    "docUrl": "https://docs.portainer.io/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Portainer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y portainer || docker run -d portainer"
  },
  {
    "id": "tool-165-containerd",
    "num": 165,
    "name": "containerd",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Низкоуровневый рантайм контейнеров",
    "docUrl": "https://containerd.io/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать containerd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y containerd || docker run -d containerd"
  },
  {
    "id": "tool-166-cri-o",
    "num": 166,
    "name": "CRI-O",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Container runtime для Kubernetes",
    "docUrl": "https://cri-o.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать CRI-O в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cri-o || docker run -d cri-o"
  },
  {
    "id": "tool-167-docker-swarm",
    "num": 167,
    "name": "Docker Swarm",
    "type": "Технология",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Встроенная оркестрация Docker",
    "docUrl": "https://docs.docker.com/engine/swarm/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Docker Swarm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y docker || docker run -d docker"
  },
  {
    "id": "tool-168-harbor",
    "num": 168,
    "name": "Harbor",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Приватный реестр образов",
    "docUrl": "https://goharbor.io/docs/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Harbor в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y harbor || docker run -d harbor"
  },
  {
    "id": "tool-169-lens",
    "num": 169,
    "name": "Lens",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IDE для Kubernetes",
    "docUrl": "https://docs.k8slens.dev/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Lens в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lens || docker run -d lens"
  },
  {
    "id": "tool-170-lxc-lxd",
    "num": 170,
    "name": "LXC / LXD",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Системные контейнеры, «лёгкие ВМ»",
    "docUrl": "https://linuxcontainers.org/lxd/docs/latest/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать LXC / LXD в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lxc || docker run -d lxc"
  },
  {
    "id": "tool-171-nomad",
    "num": 171,
    "name": "Nomad",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Оркестратор HashiCorp, проще K8s",
    "docUrl": "https://developer.hashicorp.com/nomad/docs",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Nomad в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nomad || docker run -d nomad"
  },
  {
    "id": "tool-172-openshift",
    "num": 172,
    "name": "OpenShift",
    "type": "Платформа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Enterprise-Kubernetes от Red Hat",
    "docUrl": "https://docs.openshift.com/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать OpenShift в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openshift || docker run -d openshift"
  },
  {
    "id": "tool-173-watchtower",
    "num": 173,
    "name": "Watchtower",
    "type": "Программа",
    "specialization": "Виртуализация и контейнеры",
    "category": "Контейнеры и оркестрация",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Автоматическое обновление контейнеров",
    "docUrl": "https://containrrr.dev/watchtower/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Watchtower в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y watchtower || docker run -d watchtower"
  },
  {
    "id": "tool-174-ansible",
    "num": 174,
    "name": "Ansible",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Безагентная система управления конфигурациями (Configuration Management) и автоматизации развертывания серверов по SSH на базе YAML.",
    "docUrl": "https://docs.ansible.com/ansible/latest/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Ansible в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ansible || docker run -d ansible"
  },
  {
    "id": "tool-175-git",
    "num": 175,
    "name": "Git",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Распределенная система контроля версий. Основа хранения конфигураций серверов (GitOps), скриптов автоматизации и кода.",
    "docUrl": "https://git-scm.com/doc",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Git в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y git || docker run -d git"
  },
  {
    "id": "tool-176-github",
    "num": 176,
    "name": "GitHub",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Хостинг репозиториев + Actions",
    "docUrl": "https://docs.github.com/ru",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать GitHub в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y github || docker run -d github"
  },
  {
    "id": "tool-177-github-actions",
    "num": 177,
    "name": "GitHub Actions",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Платформы непрерывной интеграции и доставки (CI/CD). Автоматизируют тестирование, сборку Docker образов и деплой на серверы.",
    "docUrl": "https://docs.github.com/ru/actions",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать GitHub Actions в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y github || docker run -d github"
  },
  {
    "id": "tool-178-gitlab",
    "num": 178,
    "name": "GitLab",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории GitLab. Используется для расширения базового функционала системы.",
    "docUrl": "https://docs.gitlab.com/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать GitLab в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y gitlab || docker run -d gitlab"
  },
  {
    "id": "tool-179-jenkins",
    "num": 179,
    "name": "Jenkins",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Классический расширяемый сервер автоматизации с тысячами плагинов для оркестрации задач сборки и развертывания через Jenkinsfile.",
    "docUrl": "https://www.jenkins.io/doc/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Jenkins в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y jenkins || docker run -d jenkins"
  },
  {
    "id": "tool-180-terraform-opentofu",
    "num": 180,
    "name": "Terraform / OpenTofu",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Senior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Инструмент декларативного описания облачной и виртуальной инфраструктуры (Infrastructure as Code). Управляет ВМ в облаках и Proxmox.",
    "docUrl": "https://opentofu.org/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Terraform / OpenTofu в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y terraform || docker run -d terraform"
  },
  {
    "id": "tool-181-ansible-galaxy",
    "num": 181,
    "name": "Ansible Galaxy",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Облачный / веб",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Репозиторий ролей Ansible",
    "docUrl": "https://galaxy.ansible.com/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Ansible Galaxy в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ansible || docker run -d ansible"
  },
  {
    "id": "tool-182-awx-ansible-semaphore",
    "num": 182,
    "name": "AWX / Ansible Semaphore",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Веб-интерфейс для Ansible",
    "docUrl": "https://ansible.readthedocs.io/projects/awx/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать AWX / Ansible Semaphore в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y awx || docker run -d awx"
  },
  {
    "id": "tool-183-cloud-init",
    "num": 183,
    "name": "cloud-init",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Первичная настройка облачных ВМ при запуске",
    "docUrl": "https://cloudinit.readthedocs.io/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать cloud-init в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cloud-init || docker run -d cloud-init"
  },
  {
    "id": "tool-184-gitea",
    "num": 184,
    "name": "Gitea",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Собственный Git-сервер с CI/CD (self-hosted)",
    "docUrl": "https://docs.gitea.com/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Gitea в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y gitea || docker run -d gitea"
  },
  {
    "id": "tool-185-powershell-dsc",
    "num": 185,
    "name": "PowerShell DSC",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Desired State Configuration в Windows",
    "docUrl": "https://learn.microsoft.com/ru-ru/powershell/dsc/overview",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать PowerShell DSC в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install powershell || choco install powershell"
  },
  {
    "id": "tool-186-argo-cd",
    "num": 186,
    "name": "Argo CD",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Непрерывное развёртывание из Git",
    "docUrl": "https://argo-cd.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Argo CD в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y argo || docker run -d argo"
  },
  {
    "id": "tool-187-arm-templates-bicep",
    "num": 187,
    "name": "ARM Templates / Bicep",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IaC от Microsoft Azure",
    "docUrl": "https://learn.microsoft.com/ru-ru/azure/azure-resource-manager/bicep/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать ARM Templates / Bicep в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y arm || docker run -d arm"
  },
  {
    "id": "tool-188-azure-devops",
    "num": 188,
    "name": "Azure DevOps",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Pipeline'ы + репозитории Microsoft",
    "docUrl": "https://learn.microsoft.com/ru-ru/azure/devops/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Azure DevOps в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y azure || docker run -d azure"
  },
  {
    "id": "tool-189-bitbucket",
    "num": 189,
    "name": "Bitbucket",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Git от Atlassian",
    "docUrl": "https://support.atlassian.com/bitbucket-cloud/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Bitbucket в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y bitbucket || docker run -d bitbucket"
  },
  {
    "id": "tool-190-chef",
    "num": 190,
    "name": "Chef",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Управление конфигурациями через рецепты Ruby",
    "docUrl": "https://docs.chef.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Chef в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y chef || docker run -d chef"
  },
  {
    "id": "tool-191-cloudformation",
    "num": 191,
    "name": "CloudFormation",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Облачный / веб",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IaC от AWS",
    "docUrl": "https://docs.aws.amazon.com/cloudformation/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать CloudFormation в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cloudformation || docker run -d cloudformation"
  },
  {
    "id": "tool-192-crossplane",
    "num": 192,
    "name": "Crossplane",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IaC через Kubernetes",
    "docUrl": "https://docs.crossplane.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Crossplane в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y crossplane || docker run -d crossplane"
  },
  {
    "id": "tool-193-drone-ci",
    "num": 193,
    "name": "Drone CI",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Лёгкий CI/CD",
    "docUrl": "https://docs.drone.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Drone CI в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y drone || docker run -d drone"
  },
  {
    "id": "tool-194-fabric",
    "num": 194,
    "name": "Fabric",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Python-библиотека для удалённого выполнения",
    "docUrl": "https://www.fabfile.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Fabric в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fabric || docker run -d fabric"
  },
  {
    "id": "tool-195-packer",
    "num": 195,
    "name": "Packer",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Сборка образов машин для разных платформ",
    "docUrl": "https://developer.hashicorp.com/packer/docs",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Packer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y packer || docker run -d packer"
  },
  {
    "id": "tool-196-pulumi",
    "num": 196,
    "name": "Pulumi",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IaC с использованием обычных языков программирования",
    "docUrl": "https://www.pulumi.com/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Pulumi в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y pulumi || docker run -d pulumi"
  },
  {
    "id": "tool-197-puppet",
    "num": 197,
    "name": "Puppet",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Декларативное управление конфигурациями с агентами",
    "docUrl": "https://www.puppet.com/docs/puppet/8",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Puppet в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y puppet || docker run -d puppet"
  },
  {
    "id": "tool-198-saltstack",
    "num": 198,
    "name": "SaltStack",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Configuration Management и удалённое выполнение",
    "docUrl": "https://docs.saltproject.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать SaltStack в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y saltstack || docker run -d saltstack"
  },
  {
    "id": "tool-199-teamcity",
    "num": 199,
    "name": "TeamCity",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Автоматизация, IaC и CI/CD",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "CI/CD от JetBrains",
    "docUrl": "https://www.jetbrains.com/help/teamcity/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать TeamCity в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y teamcity || docker run -d teamcity"
  },
  {
    "id": "tool-200-amazon-web-services",
    "num": 200,
    "name": "Amazon Web Services",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Лидер облачного рынка",
    "docUrl": "https://docs.aws.amazon.com/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Amazon Web Services в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y amazon || docker run -d amazon"
  },
  {
    "id": "tool-201-aws-cli",
    "num": 201,
    "name": "AWS CLI",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Командная строка Amazon Web Services",
    "docUrl": "https://docs.aws.amazon.com/cli/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать AWS CLI в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y aws || docker run -d aws"
  },
  {
    "id": "tool-202-azure-cli",
    "num": 202,
    "name": "Azure CLI",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Командная строка Microsoft Azure",
    "docUrl": "https://learn.microsoft.com/ru-ru/cli/azure/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Azure CLI в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y azure || docker run -d azure"
  },
  {
    "id": "tool-203-cloudflare",
    "num": 203,
    "name": "Cloudflare",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "CDN, DNS, защита DDoS",
    "docUrl": "https://developers.cloudflare.com/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Cloudflare в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cloudflare || docker run -d cloudflare"
  },
  {
    "id": "tool-204-kubectl",
    "num": 204,
    "name": "kubectl",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Клиент Kubernetes",
    "docUrl": "https://kubernetes.io/ru/docs/reference/kubectl/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать kubectl в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kubectl || docker run -d kubectl"
  },
  {
    "id": "tool-205-microsoft-azure",
    "num": 205,
    "name": "Microsoft Azure",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Облако Microsoft, интеграция с AD",
    "docUrl": "https://learn.microsoft.com/ru-ru/azure/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Microsoft Azure в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y microsoft || docker run -d microsoft"
  },
  {
    "id": "tool-206-eksctl-kops",
    "num": 206,
    "name": "eksctl / kops",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Управление кластерами Kubernetes в облаке",
    "docUrl": "https://eksctl.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать eksctl / kops в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y eksctl || docker run -d eksctl"
  },
  {
    "id": "tool-207-google-cloud-gcloud",
    "num": 207,
    "name": "Google Cloud / gcloud",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Командная строка Google Cloud",
    "docUrl": "https://cloud.google.com/sdk/docs",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Google Cloud / gcloud в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y google || docker run -d google"
  },
  {
    "id": "tool-208-hetzner-cloud",
    "num": 208,
    "name": "Hetzner Cloud",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Дешёвый европейский хостинг",
    "docUrl": "https://docs.hetzner.cloud/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Hetzner Cloud в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y hetzner || docker run -d hetzner"
  },
  {
    "id": "tool-209-openstack",
    "num": 209,
    "name": "OpenStack",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Private cloud платформа",
    "docUrl": "https://docs.openstack.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать OpenStack в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openstack || docker run -d openstack"
  },
  {
    "id": "tool-210-vk-cloud",
    "num": 210,
    "name": "VK Cloud",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Российское облако",
    "docUrl": "https://cloud.vk.com/docs/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать VK Cloud в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vk || docker run -d vk"
  },
  {
    "id": "tool-211-yandex-cloud",
    "num": 211,
    "name": "Yandex Cloud",
    "type": "Платформа",
    "specialization": "Автоматизация и DevOps",
    "category": "Облачные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Российское облако",
    "docUrl": "https://yandex.cloud/ru/docs/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Yandex Cloud в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y yandex || docker run -d yandex"
  },
  {
    "id": "tool-212-bash",
    "num": 212,
    "name": "Bash",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Bash. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.gnu.org/software/bash/manual/bash.html",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Bash в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y bash || docker run -d bash"
  },
  {
    "id": "tool-213-powershell",
    "num": 213,
    "name": "PowerShell",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Скриптинг и автоматизация Windows (и кроссплатформенно)",
    "docUrl": "https://learn.microsoft.com/ru-ru/powershell/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать PowerShell в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y powershell || docker run -d powershell"
  },
  {
    "id": "tool-214-python",
    "num": 214,
    "name": "Python",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Универсальный язык автоматизации и скриптов",
    "docUrl": "https://docs.python.org/3/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Python в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y python || docker run -d python"
  },
  {
    "id": "tool-215-sed-awk",
    "num": 215,
    "name": "sed / awk",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории sed. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.gnu.org/software/sed/manual/sed.html",
    "sources": "IT_Mega_Matrix",
    "testLab": "Развернуть и протестировать sed / awk в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sed || docker run -d sed"
  },
  {
    "id": "tool-216-sql",
    "num": 216,
    "name": "SQL",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Работа с любыми СУБД",
    "docUrl": "https://www.w3schools.com/sql/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать SQL в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sql || docker run -d sql"
  },
  {
    "id": "tool-217-tmux-screen",
    "num": 217,
    "name": "tmux / screen",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Долгоживущие сессии терминала, защита от обрывов SSH",
    "docUrl": "https://www.gnu.org/software/screen/manual/screen.html",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать tmux / screen в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tmux || docker run -d tmux"
  },
  {
    "id": "tool-218-zsh",
    "num": 218,
    "name": "Zsh",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Zsh. Используется для расширения базового функционала системы.",
    "docUrl": "https://zsh.sourceforge.io/Doc/",
    "sources": "IT_Mega_Matrix, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Zsh в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y zsh || docker run -d zsh"
  },
  {
    "id": "tool-219-awk",
    "num": 219,
    "name": "AWK",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Обработка текста, логов в конвейере",
    "docUrl": "https://www.gnu.org/software/gawk/manual/gawk.html",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать AWK в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y awk || docker run -d awk"
  },
  {
    "id": "tool-220-cmd-exe-batch",
    "num": 220,
    "name": "cmd.exe / Batch",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Устаревший, но живой скриптинг Windows",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/windows-commands/windows-commands",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать cmd.exe / Batch в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install cmd.exe || choco install cmd.exe"
  },
  {
    "id": "tool-221-go",
    "num": 221,
    "name": "Go",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Большинство современных DevOps-инструментов (Docker, K8s)",
    "docUrl": "https://go.dev/doc/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Go в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y go || docker run -d go"
  },
  {
    "id": "tool-222-javascript-node-js",
    "num": 222,
    "name": "JavaScript / Node.js",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Веб-приложения, backend",
    "docUrl": "https://nodejs.org/docs/latest/api/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать JavaScript / Node.js в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y javascript || docker run -d javascript"
  },
  {
    "id": "tool-223-sed",
    "num": 223,
    "name": "sed",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Потоковое редактирование текста",
    "docUrl": "https://www.gnu.org/software/sed/manual/sed.html",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать sed в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sed || docker run -d sed"
  },
  {
    "id": "tool-224-c",
    "num": 224,
    "name": "C",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Понимание ядра ОС, системное программирование",
    "docUrl": "https://en.cppreference.com/w/c",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать C в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y c || docker run -d c"
  },
  {
    "id": "tool-225-c-net",
    "num": 225,
    "name": "C# / .NET",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows"
    ],
    "osRaw": "Linux, Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Windows-приложения, инструменты под AD",
    "docUrl": "https://learn.microsoft.com/ru-ru/dotnet/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать C# / .NET в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y c# || docker run -d c#"
  },
  {
    "id": "tool-226-fish",
    "num": 226,
    "name": "fish",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Дружелюбная оболочка",
    "docUrl": "https://fishshell.com/docs/current/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать fish в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fish || docker run -d fish"
  },
  {
    "id": "tool-227-java",
    "num": 227,
    "name": "Java",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Enterprise-приложения, Tomcat-инфраструктура",
    "docUrl": "https://docs.oracle.com/en/java/javase/21/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Java в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y java || docker run -d java"
  },
  {
    "id": "tool-228-lua",
    "num": 228,
    "name": "Lua",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Скрипты в nginx, embedded-системы",
    "docUrl": "https://www.lua.org/manual/5.4/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Lua в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lua || docker run -d lua"
  },
  {
    "id": "tool-229-perl",
    "num": 229,
    "name": "Perl",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Legacy-скрипты, однострочники",
    "docUrl": "https://perldoc.perl.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Perl в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y perl || docker run -d perl"
  },
  {
    "id": "tool-230-php",
    "num": 230,
    "name": "PHP",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Поддержка WordPress, legacy-приложений",
    "docUrl": "https://www.php.net/manual/ru/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать PHP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y php || docker run -d php"
  },
  {
    "id": "tool-231-rust",
    "num": 231,
    "name": "Rust",
    "type": "Язык",
    "specialization": "Автоматизация и DevOps",
    "category": "Языки скриптов и оболочки",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Системные утилиты нового поколения",
    "docUrl": "https://doc.rust-lang.org/book/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Rust в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rust || docker run -d rust"
  },
  {
    "id": "tool-232-chocolatey",
    "num": 232,
    "name": "Chocolatey",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Пакетный менеджер для Windows",
    "docUrl": "https://docs.chocolatey.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Chocolatey в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install chocolatey || choco install chocolatey"
  },
  {
    "id": "tool-233-pip-pipx",
    "num": 233,
    "name": "pip / pipx",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Пакеты Python",
    "docUrl": "https://pip.pypa.io/en/stable/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать pip / pipx в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y pip || docker run -d pip"
  },
  {
    "id": "tool-234-snap",
    "num": 234,
    "name": "snap",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Универсальные пакеты Canonical",
    "docUrl": "https://snapcraft.io/docs",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать snap в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y snap || docker run -d snap"
  },
  {
    "id": "tool-235-winget",
    "num": 235,
    "name": "Winget",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Официальный пакетный менеджер Microsoft",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/package-manager/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Winget в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install winget || choco install winget"
  },
  {
    "id": "tool-236-flatpak",
    "num": 236,
    "name": "flatpak",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Универсальные пакеты",
    "docUrl": "https://docs.flatpak.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать flatpak в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y flatpak || docker run -d flatpak"
  },
  {
    "id": "tool-237-homebrew",
    "num": 237,
    "name": "Homebrew",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Пакетный менеджер macOS (и Linux)",
    "docUrl": "https://docs.brew.sh/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Homebrew в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y homebrew || docker run -d homebrew"
  },
  {
    "id": "tool-238-npm-yarn-pnpm",
    "num": 238,
    "name": "npm / yarn / pnpm",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Пакеты Node.js",
    "docUrl": "https://docs.npmjs.com/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать npm / yarn / pnpm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y npm || docker run -d npm"
  },
  {
    "id": "tool-239-pacman",
    "num": 239,
    "name": "pacman",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Arch Linux",
    "docUrl": "https://wiki.archlinux.org/title/Pacman",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать pacman в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y pacman || docker run -d pacman"
  },
  {
    "id": "tool-240-scoop",
    "num": 240,
    "name": "Scoop",
    "type": "Программа",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Пакетный менеджер для Windows",
    "docUrl": "https://github.com/ScoopInstaller/Scoop#readme",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Scoop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install scoop || choco install scoop"
  },
  {
    "id": "tool-241-zypper",
    "num": 241,
    "name": "zypper",
    "type": "Технология",
    "specialization": "Автоматизация и DevOps",
    "category": "Пакетные менеджеры",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор",
      "DevOps / Программист"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "openSUSE / SLES",
    "docUrl": "https://en.opensuse.org/SDB:Zypper_manual_(plain)",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать zypper в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y zypper || docker run -d zypper"
  },
  {
    "id": "tool-242-grafana",
    "num": 242,
    "name": "Grafana",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории Grafana. Используется для расширения базового функционала системы.",
    "docUrl": "https://grafana.com/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Grafana в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y grafana || docker run -d grafana"
  },
  {
    "id": "tool-243-grafana-loki",
    "num": 243,
    "name": "Grafana Loki",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Легковесная система агрегации логов, индексирующая только метаданные (лейблы). Интегрируется с Grafana через язык запросов LogQL.",
    "docUrl": "https://grafana.com/docs/loki/latest/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Grafana Loki в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y grafana || docker run -d grafana"
  },
  {
    "id": "tool-244-node-exporter",
    "num": 244,
    "name": "Node Exporter",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Экспортёр метрик Linux для Prometheus",
    "docUrl": "https://github.com/prometheus/node_exporter",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Node Exporter в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y node || docker run -d node"
  },
  {
    "id": "tool-245-prometheus",
    "num": 245,
    "name": "Prometheus",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Индустриальная Time-Series база данных и система сбора метрик по Pull-модели через HTTP GET запросы к эндпоинтам экспортеров.",
    "docUrl": "https://prometheus.io/docs/introduction/overview/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Prometheus в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y prometheus || docker run -d prometheus"
  },
  {
    "id": "tool-246-uptime-kuma",
    "num": 246,
    "name": "Uptime Kuma",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Автономный инструмент мониторинга доступности сайтов, TCP-портов, DNS, SSL-сертификатов с красивыми публичными страницами статуса.",
    "docUrl": "https://github.com/louislam/uptime-kuma/wiki",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать Uptime Kuma в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y uptime || docker run -d uptime"
  },
  {
    "id": "tool-247-zabbix",
    "num": 247,
    "name": "Zabbix",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Комплексная классическая система мониторинга корпоративного уровня: серверы, коммутаторы (SNMP), принтеры, ИБП и виртуальные машины.",
    "docUrl": "https://www.zabbix.com/documentation/6.0/ru/manual",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Zabbix в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y zabbix || docker run -d zabbix"
  },
  {
    "id": "tool-248-nagios-icinga",
    "num": 248,
    "name": "Nagios / Icinga",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Одна из первых систем мониторинга, встречается на legacy",
    "docUrl": "https://icinga.com/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Nagios / Icinga в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nagios || docker run -d nagios"
  },
  {
    "id": "tool-249-netdata",
    "num": 249,
    "name": "Netdata",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Мониторинг в реальном времени с минимальной настройкой",
    "docUrl": "https://learn.netdata.cloud/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Netdata в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y netdata || docker run -d netdata"
  },
  {
    "id": "tool-250-windows-exporter",
    "num": 250,
    "name": "Windows Exporter",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Экспортёр метрик Windows для Prometheus",
    "docUrl": "https://github.com/prometheus-community/windows_exporter",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Windows Exporter в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-251-checkmk",
    "num": 251,
    "name": "Checkmk",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Мониторинг с автообнаружением сервисов",
    "docUrl": "https://docs.checkmk.com/latest/ru/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Checkmk в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y checkmk || docker run -d checkmk"
  },
  {
    "id": "tool-252-datadog",
    "num": 252,
    "name": "Datadog",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Облачная SaaS-платформа мониторинга",
    "docUrl": "https://docs.datadoghq.com/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Datadog в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y datadog || docker run -d datadog"
  },
  {
    "id": "tool-253-glances",
    "num": 253,
    "name": "Glances",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Кроссплатформенный мониторинг в терминале",
    "docUrl": "https://nicolargo.github.io/glances/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Glances в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y glances || docker run -d glances"
  },
  {
    "id": "tool-254-icinga",
    "num": 254,
    "name": "Icinga",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Форк Nagios",
    "docUrl": "https://icinga.com/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Icinga в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y icinga || docker run -d icinga"
  },
  {
    "id": "tool-255-influxdb",
    "num": 255,
    "name": "InfluxDB",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "База данных временных рядов для метрик",
    "docUrl": "https://docs.influxdata.com/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать InfluxDB в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y influxdb || docker run -d influxdb"
  },
  {
    "id": "tool-256-new-relic",
    "num": 256,
    "name": "New Relic",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Облачный / веб",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "APM и мониторинг",
    "docUrl": "https://docs.newrelic.com/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать New Relic в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y new || docker run -d new"
  },
  {
    "id": "tool-257-prtg",
    "num": 257,
    "name": "PRTG",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Коммерческий мониторинг сетей под Windows",
    "docUrl": "https://www.paessler.com/manuals/prtg",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать PRTG в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install prtg || choco install prtg"
  },
  {
    "id": "tool-258-telegraf",
    "num": 258,
    "name": "Telegraf",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Сборщик метрик",
    "docUrl": "https://docs.influxdata.com/telegraf/v1/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Telegraf в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y telegraf || docker run -d telegraf"
  },
  {
    "id": "tool-259-thanos",
    "num": 259,
    "name": "Thanos",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Долгосрочное хранение метрик Prometheus",
    "docUrl": "https://thanos.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Thanos в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y thanos || docker run -d thanos"
  },
  {
    "id": "tool-260-victoriametrics",
    "num": 260,
    "name": "VictoriaMetrics",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Мониторинг и Observability",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Быстрая и экономичная альтернатива Prometheus для метрик",
    "docUrl": "https://docs.victoriametrics.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать VictoriaMetrics в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y victoriametrics || docker run -d victoriametrics"
  },
  {
    "id": "tool-261-elastic-stack-elk-efk",
    "num": 261,
    "name": "Elastic Stack (ELK/EFK)",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Мощный аналитический комплекс полнотекстового поиска и глубокого расследования инцидентов безопасности в больших объемах логов.",
    "docUrl": "https://www.elastic.co/guide/index.html",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Elastic Stack (ELK/EFK) в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y elastic || docker run -d elastic"
  },
  {
    "id": "tool-262-journald-journalctl",
    "num": 262,
    "name": "journald / journalctl",
    "type": "Технология",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Журнал systemd, основной источник логов в Linux",
    "docUrl": "https://www.freedesktop.org/software/systemd/man/journalctl.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать journald / journalctl в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y journald || docker run -d journald"
  },
  {
    "id": "tool-263-rsyslog",
    "num": 263,
    "name": "rsyslog",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Центральный сбор системных логов по syslog",
    "docUrl": "https://www.rsyslog.com/doc/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать rsyslog в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rsyslog || docker run -d rsyslog"
  },
  {
    "id": "tool-264-elasticsearch",
    "num": 264,
    "name": "Elasticsearch",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Поиск и аналитика (часто как часть ELK)",
    "docUrl": "https://www.elastic.co/guide/index.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Elasticsearch в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y elasticsearch || docker run -d elasticsearch"
  },
  {
    "id": "tool-265-fluentd-fluent-bit",
    "num": 265,
    "name": "Fluentd / Fluent Bit",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Сбор и пересылка логов из контейнеров и систем",
    "docUrl": "https://docs.fluentbit.io/manual",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Fluentd / Fluent Bit в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fluentd || docker run -d fluentd"
  },
  {
    "id": "tool-266-syslog-ng",
    "num": 266,
    "name": "syslog-ng",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Продвинутая альтернатива rsyslog",
    "docUrl": "https://www.syslog-ng.com/technical-documents/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать syslog-ng в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y syslog-ng || docker run -d syslog-ng"
  },
  {
    "id": "tool-267-graylog",
    "num": 267,
    "name": "Graylog",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Централизованный сбор и поиск по логам",
    "docUrl": "https://go2docs.graylog.org/5-2/home.htm",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Graylog в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y graylog || docker run -d graylog"
  },
  {
    "id": "tool-268-vector",
    "num": 268,
    "name": "Vector",
    "type": "Программа",
    "specialization": "Мониторинг и логи",
    "category": "Логирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Современный сборщик логов и метрик (Datadog)",
    "docUrl": "https://vector.dev/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Vector в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vector || docker run -d vector"
  },
  {
    "id": "tool-269-dovecot",
    "num": 269,
    "name": "Dovecot",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "IMAP/POP3-сервер для приёма почты",
    "docUrl": "https://doc.dovecot.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Dovecot в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dovecot || docker run -d dovecot"
  },
  {
    "id": "tool-270-postfix",
    "num": 270,
    "name": "Postfix",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Почтовый сервер (MTA) Linux",
    "docUrl": "https://www.postfix.org/documentation.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Postfix в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y postfix || docker run -d postfix"
  },
  {
    "id": "tool-271-exim",
    "num": 271,
    "name": "Exim",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Альтернативный MTA",
    "docUrl": "https://www.exim.org/docs.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Exim в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y exim || docker run -d exim"
  },
  {
    "id": "tool-272-iredmail",
    "num": 272,
    "name": "iRedMail",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Готовое почтовое решение",
    "docUrl": "https://docs.iredmail.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать iRedMail в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iredmail || docker run -d iredmail"
  },
  {
    "id": "tool-273-mailcow",
    "num": 273,
    "name": "Mailcow",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Полный почтовый стек в Docker",
    "docUrl": "https://docs.mailcow.email/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Mailcow в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mailcow || docker run -d mailcow"
  },
  {
    "id": "tool-274-microsoft-exchange",
    "num": 274,
    "name": "Microsoft Exchange",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Корпоративная почта Microsoft",
    "docUrl": "https://learn.microsoft.com/ru-ru/exchange/exchange-server",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Microsoft Exchange в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install microsoft || choco install microsoft"
  },
  {
    "id": "tool-275-roundcube",
    "num": 275,
    "name": "Roundcube",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Веб-интерфейс почты",
    "docUrl": "https://roundcube.net/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Roundcube в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y roundcube || docker run -d roundcube"
  },
  {
    "id": "tool-276-rspamd-spamassassin",
    "num": 276,
    "name": "Rspamd / SpamAssassin",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Антиспам",
    "docUrl": "https://rspamd.com/doc/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Rspamd / SpamAssassin в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rspamd || docker run -d rspamd"
  },
  {
    "id": "tool-277-spamassassin",
    "num": 277,
    "name": "SpamAssassin",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Фильтрация спама",
    "docUrl": "https://spamassassin.apache.org/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать SpamAssassin в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y spamassassin || docker run -d spamassassin"
  },
  {
    "id": "tool-278-zimbra",
    "num": 278,
    "name": "Zimbra",
    "type": "Программа",
    "specialization": "Почта и сервисы",
    "category": "Почта и связанные сервисы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Комплексная почтовая платформа",
    "docUrl": "https://wiki.zimbra.com/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Zimbra в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y zimbra || docker run -d zimbra"
  },
  {
    "id": "tool-279-fail2ban",
    "num": 279,
    "name": "Fail2ban",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Служба защиты от брутфорс-атак: сканирует логи аутентификации и автоматически блокирует атакующие IP-адреса в фаерволе.",
    "docUrl": "https://fail2ban.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Fail2ban в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fail2ban || docker run -d fail2ban"
  },
  {
    "id": "tool-280-firewalld",
    "num": 280,
    "name": "firewalld",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Удобная оболочка для firewall в RHEL-семействе",
    "docUrl": "https://firewalld.org/documentation/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать firewalld в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y firewalld || docker run -d firewalld"
  },
  {
    "id": "tool-281-iptables-nftables",
    "num": 281,
    "name": "iptables / nftables",
    "type": "Утилита",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Низкоуровневые пакетные фильтры ядра Linux: управление входящим и исходящим трафиком, трансляция адресов NAT/PAT, защита от SYN-flood.",
    "docUrl": "https://netfilter.org/projects/nftables/",
    "sources": "Admin_Full_Map, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать iptables / nftables в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iptables || docker run -d iptables"
  },
  {
    "id": "tool-282-let-s-encrypt-certbot",
    "num": 282,
    "name": "Let's Encrypt / certbot",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Бесплатные SSL-сертификаты",
    "docUrl": "https://certbot.eff.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Let's Encrypt / certbot в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y let's || docker run -d let's"
  },
  {
    "id": "tool-283-lynis",
    "num": 283,
    "name": "Lynis",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Утилита аудита безопасности систем Linux/Unix по международным стандартам CIS Benchmark, HIPAA и ISO 27001.",
    "docUrl": "https://cisofy.com/documentation/lynis/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать Lynis в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lynis || docker run -d lynis"
  },
  {
    "id": "tool-284-openssl",
    "num": 284,
    "name": "OpenSSL",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Криптография и работа с сертификатами",
    "docUrl": "https://docs.openssl.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать OpenSSL в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openssl || docker run -d openssl"
  },
  {
    "id": "tool-285-openvpn",
    "num": 285,
    "name": "OpenVPN",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Проверенный временем протокол SSL-VPN с поддержкой работы поверх TCP порта 443 для обхода жестких файрволов провайдеров.",
    "docUrl": "https://openvpn.net/community-resources/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать OpenVPN в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openvpn || docker run -d openvpn"
  },
  {
    "id": "tool-286-pfsense-opnsense",
    "num": 286,
    "name": "pfSense / OPNsense",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Специализированная защищенная ОС межсетевого экрана и маршрутизатора на базе FreeBSD с полнофункциональным веб-интерфейсом.",
    "docUrl": "https://docs.netgate.com/pfsense/en/latest/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать pfSense / OPNsense в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y pfsense || docker run -d pfsense"
  },
  {
    "id": "tool-287-ufw",
    "num": 287,
    "name": "UFW",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Интуитивно понятная консольная надстройка над iptables в Ubuntu/Debian для быстрого и безопасного управления портами сервера.",
    "docUrl": "https://help.ubuntu.com/community/UFW",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать UFW в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ufw || docker run -d ufw"
  },
  {
    "id": "tool-288-windows-firewall",
    "num": 288,
    "name": "Windows Firewall",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Штатный межсетевой экран Windows",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/security/operating-system-security/network-security/windows-firewall/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Windows Firewall в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-289-wireguard",
    "num": 289,
    "name": "WireGuard",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Вспомогательный компонент / утилита из категории WireGuard. Используется для расширения базового функционала системы.",
    "docUrl": "https://www.wireguard.com/quickstart/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать WireGuard в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y wireguard || docker run -d wireguard"
  },
  {
    "id": "tool-290-apparmor",
    "num": 290,
    "name": "AppArmor",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Mandatory Access Control (Ubuntu/Debian)",
    "docUrl": "https://gitlab.com/apparmor/apparmor/-/wikis/home",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать AppArmor в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y apparmor || docker run -d apparmor"
  },
  {
    "id": "tool-291-clamav",
    "num": 291,
    "name": "ClamAV",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Свободный антивирус для Linux и почтовых шлюзов",
    "docUrl": "https://docs.clamav.net/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать ClamAV в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y clamav || docker run -d clamav"
  },
  {
    "id": "tool-292-crowdsec",
    "num": 292,
    "name": "CrowdSec",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Коллективная защита от ботов и брутфорса",
    "docUrl": "https://docs.crowdsec.net/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать CrowdSec в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y crowdsec || docker run -d crowdsec"
  },
  {
    "id": "tool-293-gnupg",
    "num": 293,
    "name": "GnuPG",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Шифрование и подписи",
    "docUrl": "https://www.gnupg.org/documentation/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать GnuPG в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y gnupg || docker run -d gnupg"
  },
  {
    "id": "tool-294-ipsec-strongswan",
    "num": 294,
    "name": "IPsec / strongSwan",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Стандарт VPN для site-to-site туннелей",
    "docUrl": "https://docs.strongswan.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать IPsec / strongSwan в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ipsec || docker run -d ipsec"
  },
  {
    "id": "tool-295-keepassxc-bitwarden",
    "num": 295,
    "name": "KeePassXC / Bitwarden",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Менеджер паролей",
    "docUrl": "https://bitwarden.com/help/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать KeePassXC / Bitwarden в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y keepassxc || docker run -d keepassxc"
  },
  {
    "id": "tool-296-selinux",
    "num": 296,
    "name": "SELinux",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Мандатное управление доступом в Linux",
    "docUrl": "https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/using_selinux",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать SELinux в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y selinux || docker run -d selinux"
  },
  {
    "id": "tool-297-wazuh",
    "num": 297,
    "name": "Wazuh",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "SIEM и мониторинг безопасности",
    "docUrl": "https://documentation.wazuh.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Wazuh в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y wazuh || docker run -d wazuh"
  },
  {
    "id": "tool-298-aide-tripwire",
    "num": 298,
    "name": "Aide / Tripwire",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Контроль целостности файлов",
    "docUrl": "https://aide.github.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Aide / Tripwire в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y aide || docker run -d aide"
  },
  {
    "id": "tool-299-chkrootkit-rkhunter",
    "num": 299,
    "name": "chkrootkit / rkhunter",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Поиск руткитов",
    "docUrl": "https://rkhunter.sourceforge.net/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать chkrootkit / rkhunter в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y chkrootkit || docker run -d chkrootkit"
  },
  {
    "id": "tool-300-hashicorp-vault",
    "num": 300,
    "name": "HashiCorp Vault",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Хранилище секретов и паролей",
    "docUrl": "https://developer.hashicorp.com/vault/docs",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать HashiCorp Vault в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y hashicorp || docker run -d hashicorp"
  },
  {
    "id": "tool-301-kali-linux",
    "num": 301,
    "name": "Kali Linux",
    "type": "ОС",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Дистрибутив для пентеста",
    "docUrl": "https://www.kali.org/docs/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Kali Linux в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kali || docker run -d kali"
  },
  {
    "id": "tool-302-metasploit",
    "num": 302,
    "name": "Metasploit",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Тестирование на проникновение",
    "docUrl": "https://docs.metasploit.com/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Metasploit в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y metasploit || docker run -d metasploit"
  },
  {
    "id": "tool-303-modsecurity",
    "num": 303,
    "name": "ModSecurity",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Web Application Firewall",
    "docUrl": "https://github.com/owasp-modsecurity/ModSecurity/wiki/Reference-Manual-(v2.x)",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать ModSecurity в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y modsecurity || docker run -d modsecurity"
  },
  {
    "id": "tool-304-openscap",
    "num": 304,
    "name": "OpenSCAP",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Проверка соответствия стандартам безопасности",
    "docUrl": "https://www.open-scap.org/documentation/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать OpenSCAP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openscap || docker run -d openscap"
  },
  {
    "id": "tool-305-ossec",
    "num": 305,
    "name": "OSSEC",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Host-based IDS",
    "docUrl": "https://www.ossec.net/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать OSSEC в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ossec || docker run -d ossec"
  },
  {
    "id": "tool-306-snort-suricata",
    "num": 306,
    "name": "Snort / Suricata",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Обнаружение вторжений (IDS/IPS)",
    "docUrl": "https://docs.suricata.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Snort / Suricata в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y snort || docker run -d snort"
  },
  {
    "id": "tool-307-tailscale-zerotier",
    "num": 307,
    "name": "Tailscale / ZeroTier",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Безопасность, VPN и hardening",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Mesh-VPN поверх WireGuard для связывания машин",
    "docUrl": "https://tailscale.com/kb",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Tailscale / ZeroTier в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tailscale || docker run -d tailscale"
  },
  {
    "id": "tool-308-active-directory",
    "num": 308,
    "name": "Active Directory",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux",
      "Windows"
    ],
    "osRaw": "Linux, Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Централизованная служба каталогов Microsoft: единая база учетных записей, компьютеров, аутентификация Kerberos и Single Sign-On (SSO).",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/identity/ad-ds/get-started-overview",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Active Directory в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y active || docker run -d active"
  },
  {
    "id": "tool-309-apt-dpkg",
    "num": 309,
    "name": "apt / dpkg",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Пакетные менеджеры Debian/Ubuntu",
    "docUrl": "https://manpages.debian.org/stable/apt/apt.8.en.html",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать apt / dpkg в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y apt || docker run -d apt"
  },
  {
    "id": "tool-310-dnf-yum-rpm",
    "num": 310,
    "name": "dnf / yum / rpm",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Пакетные менеджеры RHEL/CentOS/Alma/Rocky",
    "docUrl": "https://dnf.readthedocs.io/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать dnf / yum / rpm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dnf || docker run -d dnf"
  },
  {
    "id": "tool-311-group-policy",
    "num": 311,
    "name": "Group Policy",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Групповые политики для централизованной настройки параметров безопасности, реестра Windows, подключения сетевых дисков и установки ПО.",
    "docUrl": "https://learn.microsoft.com/ru-ru/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/hh831791(v=ws.11)",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Group Policy в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install group || choco install group"
  },
  {
    "id": "tool-312-remote-desktop-services",
    "num": 312,
    "name": "Remote Desktop Services",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Терминальный сервер Microsoft для одновременной многопользовательской работы сотрудников в 1С:Предприятие, офисных пакетах и базах данных.",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/remote/remote-desktop-services/welcome-to-rds",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать Remote Desktop Services в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install remote || choco install remote"
  },
  {
    "id": "tool-313-rsat",
    "num": 313,
    "name": "RSAT",
    "type": "Утилита",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Набор оснасток удаленного администрирования серверов Windows Server и Active Directory непосредственно с рабочего ПК администратора.",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/remote/remote-server-administration-tools",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать RSAT в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install rsat || choco install rsat"
  },
  {
    "id": "tool-314-windows-dns-dhcp",
    "num": 314,
    "name": "Windows DNS / DHCP",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сетевые роли Windows Server",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/networking/dns/dns-top",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Windows DNS / DHCP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-315-wsus",
    "num": 315,
    "name": "WSUS",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Локальный корпоративный сервер обновлений Microsoft: скачивает обновления один раз и централизованно раздает их на компьютеры компании.",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/windows-server-update-services/get-started/windows-server-update-services-wsus",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать WSUS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install wsus || choco install wsus"
  },
  {
    "id": "tool-316-cockpit",
    "num": 316,
    "name": "Cockpit",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Веб-интерфейс администрирования Linux-серверов",
    "docUrl": "https://cockpit-project.org/documentation.html",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Cockpit в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y cockpit || docker run -d cockpit"
  },
  {
    "id": "tool-317-freeipa",
    "num": 317,
    "name": "FreeIPA",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Идентификация для Linux (аналог AD)",
    "docUrl": "https://www.freeipa.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать FreeIPA в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y freeipa || docker run -d freeipa"
  },
  {
    "id": "tool-318-kerberos",
    "num": 318,
    "name": "Kerberos",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Протокол аутентификации",
    "docUrl": "https://ru.wikipedia.org/wiki/Kerberos",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Kerberos в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y kerberos || docker run -d kerberos"
  },
  {
    "id": "tool-319-openldap",
    "num": 319,
    "name": "OpenLDAP",
    "type": "Технология",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Служба каталогов",
    "docUrl": "https://www.openldap.org/doc/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать OpenLDAP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openldap || docker run -d openldap"
  },
  {
    "id": "tool-320-sssd",
    "num": 320,
    "name": "SSSD",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Подключение Linux к AD/LDAP",
    "docUrl": "https://sssd.io/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать SSSD в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sssd || docker run -d sssd"
  },
  {
    "id": "tool-321-winget-chocolatey",
    "num": 321,
    "name": "Winget / Chocolatey",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Пакетные менеджеры Windows для автоматизации установки",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/package-manager/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Winget / Chocolatey в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install winget || choco install winget"
  },
  {
    "id": "tool-322-keycloak",
    "num": 322,
    "name": "Keycloak",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Open-source Identity Provider",
    "docUrl": "https://www.keycloak.org/documentation",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Keycloak в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y keycloak || docker run -d keycloak"
  },
  {
    "id": "tool-323-microsoft-intune",
    "num": 323,
    "name": "Microsoft Intune",
    "type": "Платформа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Облачное MDM-управление устройствами",
    "docUrl": "https://learn.microsoft.com/ru-ru/mem/intune/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Microsoft Intune в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y microsoft || docker run -d microsoft"
  },
  {
    "id": "tool-324-sccm-mecm",
    "num": 324,
    "name": "SCCM / MECM",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Корпоративное управление ПК: развёртывание, обновления, инвентаризация",
    "docUrl": "https://learn.microsoft.com/ru-ru/mem/configmgr/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать SCCM / MECM в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install sccm || choco install sccm"
  },
  {
    "id": "tool-325-webmin",
    "num": 325,
    "name": "Webmin",
    "type": "Программа",
    "specialization": "Безопасность и доступ",
    "category": "Идентификация и доступ (IAM)",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Веб-панель для настройки Linux-серверов",
    "docUrl": "https://webmin.com/docs/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Webmin в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y webmin || docker run -d webmin"
  },
  {
    "id": "tool-326-borgbackup",
    "num": 326,
    "name": "BorgBackup",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Программа дедуплицирующего резервного копирования с шифрованием AES-256 и сжатием ZSTD. Золотой стандарт бэкапов Linux-серверов.",
    "docUrl": "https://borgbackup.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать BorgBackup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y borgbackup || docker run -d borgbackup"
  },
  {
    "id": "tool-327-restic",
    "num": 327,
    "name": "restic",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Быстрая и безопасная утилита бэкапа без внешних зависимостей. Поддерживает прямое сохранение снапшотов в облачные бакеты S3/MinIO.",
    "docUrl": "https://restic.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать restic в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y restic || docker run -d restic"
  },
  {
    "id": "tool-328-rsync",
    "num": 328,
    "name": "rsync",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Утилита инкрементальной передачи и синхронизации файлов поверх SSH с дельта-алгоритмом передачи только изменившихся блоков.",
    "docUrl": "https://download.samba.org/pub/rsync/rsync.html",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs",
    "testLab": "Развернуть и протестировать rsync в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rsync || docker run -d rsync"
  },
  {
    "id": "tool-329-veeam-backup-replication",
    "num": 329,
    "name": "Veeam Backup & Replication",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Промышленный стандарт резервного копирования виртуальных машин VMware vSphere, Hyper-V, Nutanix и физических серверов.",
    "docUrl": "https://www.veeam.com/ru/documentation.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Veeam Backup & Replication в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install veeam || choco install veeam"
  },
  {
    "id": "tool-330-duplicati",
    "num": 330,
    "name": "Duplicati",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Бэкап с шифрованием в облака через GUI",
    "docUrl": "https://duplicati.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Duplicati в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y duplicati || docker run -d duplicati"
  },
  {
    "id": "tool-331-proxmox-backup-server",
    "num": 331,
    "name": "Proxmox Backup Server",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Бэкапы виртуальных машин Proxmox",
    "docUrl": "https://pbs.proxmox.com/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Proxmox Backup Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y proxmox || docker run -d proxmox"
  },
  {
    "id": "tool-332-restic-borg",
    "num": 332,
    "name": "restic / Borg",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Быстрые шифрованные инкрементальные бэкапы",
    "docUrl": "https://restic.readthedocs.io/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать restic / Borg в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y restic || docker run -d restic"
  },
  {
    "id": "tool-333-velero",
    "num": 333,
    "name": "Velero",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Резервное копирование и восстановление ресурсов и данных Kubernetes.",
    "docUrl": "https://velero.io/docs/",
    "sources": "добавлено",
    "testLab": "Развернуть и протестировать Velero в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y velero || docker run -d velero"
  },
  {
    "id": "tool-334-windows-server-backup",
    "num": 334,
    "name": "Windows Server Backup",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Встроенный бэкап Windows Server",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/windows-commands/wbadmin",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Windows Server Backup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-335-acronis-true-image",
    "num": 335,
    "name": "Acronis True Image",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Коммерческие бэкапы и восстановление",
    "docUrl": "https://www.acronis.com/",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Acronis True Image в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y acronis || docker run -d acronis"
  },
  {
    "id": "tool-336-bacula-bareos",
    "num": 336,
    "name": "Bacula / Bareos",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Enterprise-система резервного копирования",
    "docUrl": "https://www.bareos.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Bacula / Bareos в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y bacula || docker run -d bacula"
  },
  {
    "id": "tool-337-deja-dup",
    "num": 337,
    "name": "Deja Dup",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Простой бэкап для Ubuntu",
    "docUrl": "https://apps.gnome.org/DejaDup/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Deja Dup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y deja || docker run -d deja"
  },
  {
    "id": "tool-338-rdiff-backup",
    "num": 338,
    "name": "rdiff-backup",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Инкрементальные бэкапы",
    "docUrl": "https://rdiff-backup.net/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать rdiff-backup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rdiff-backup || docker run -d rdiff-backup"
  },
  {
    "id": "tool-339-timeshift",
    "num": 339,
    "name": "Timeshift",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Снимки системы Linux (как restore points Windows)",
    "docUrl": "https://github.com/teejee2008/timeshift",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Timeshift в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y timeshift || docker run -d timeshift"
  },
  {
    "id": "tool-340-urbackup",
    "num": 340,
    "name": "UrBackup",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Резервное копирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Бэкап рабочих станций",
    "docUrl": "https://www.urbackup.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать UrBackup в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y urbackup || docker run -d urbackup"
  },
  {
    "id": "tool-341-ext4",
    "num": 341,
    "name": "ext4",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Стандартная ФС Linux",
    "docUrl": "https://ext4.wiki.kernel.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать ext4 в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ext4 || docker run -d ext4"
  },
  {
    "id": "tool-342-ext4-xfs",
    "num": 342,
    "name": "ext4 / XFS",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Основные ФС Linux",
    "docUrl": "https://ext4.wiki.kernel.org/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать ext4 / XFS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ext4 || docker run -d ext4"
  },
  {
    "id": "tool-343-lvm",
    "num": 343,
    "name": "LVM",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Логические тома, гибкое изменение размеров",
    "docUrl": "https://sourceware.org/lvm2/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать LVM в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lvm || docker run -d lvm"
  },
  {
    "id": "tool-344-mdadm",
    "num": 344,
    "name": "mdadm",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Программный RAID в Linux",
    "docUrl": "https://man7.org/linux/man-pages/man8/mdadm.8.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать mdadm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mdadm || docker run -d mdadm"
  },
  {
    "id": "tool-345-nfs",
    "num": 345,
    "name": "NFS",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сетевая файловая система для Unix-сред",
    "docUrl": "https://man7.org/linux/man-pages/man5/nfs.5.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать NFS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nfs || docker run -d nfs"
  },
  {
    "id": "tool-346-ntfs-refs",
    "num": 346,
    "name": "NTFS / ReFS",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "ФС Windows",
    "docUrl": "https://ru.wikipedia.org/wiki/NTFS",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать NTFS / ReFS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install ntfs || choco install ntfs"
  },
  {
    "id": "tool-347-samba",
    "num": 347,
    "name": "Samba",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Файловый сервер SMB для Windows-сетей на Linux",
    "docUrl": "https://wiki.samba.org/index.php/Main_Page",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Samba в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y samba || docker run -d samba"
  },
  {
    "id": "tool-348-truenas-freenas",
    "num": 348,
    "name": "TrueNAS / FreeNAS",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Специализированная сетевая ОС для хранилищ (NAS/SAN) на базе файловой системы ZFS с поддержкой RAID-Z, моментальных снимков и SMB/NFS/iSCSI.",
    "docUrl": "https://www.truenas.com/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать TrueNAS / FreeNAS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y truenas || docker run -d truenas"
  },
  {
    "id": "tool-349-btrfs",
    "num": 349,
    "name": "Btrfs",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Копирование при записи, снапшоты",
    "docUrl": "https://btrfs.readthedocs.io/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Btrfs в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y btrfs || docker run -d btrfs"
  },
  {
    "id": "tool-350-iscsi",
    "num": 350,
    "name": "iSCSI",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Сетевые блочные устройства SAN",
    "docUrl": "https://ru.wikipedia.org/wiki/ISCSI",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать iSCSI в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y iscsi || docker run -d iscsi"
  },
  {
    "id": "tool-351-minio",
    "num": 351,
    "name": "MinIO",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Собственное S3-совместимое объектное хранилище",
    "docUrl": "https://min.io/docs/minio/linux/index.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать MinIO в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y minio || docker run -d minio"
  },
  {
    "id": "tool-352-nextcloud-owncloud",
    "num": 352,
    "name": "Nextcloud / ownCloud",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Личное облако: файлы, календари, совместная работа",
    "docUrl": "https://docs.nextcloud.com/server/latest/admin_manual/contents.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Nextcloud / ownCloud в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nextcloud || docker run -d nextcloud"
  },
  {
    "id": "tool-353-rclone",
    "num": 353,
    "name": "rclone",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Синхронизация файлов с десятками облачных хранилищ",
    "docUrl": "https://rclone.org/docs/",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать rclone в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rclone || docker run -d rclone"
  },
  {
    "id": "tool-354-robocopy",
    "num": 354,
    "name": "robocopy",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Копирование и синхронизация папок в Windows",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows-server/administration/windows-commands/robocopy",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать robocopy в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install robocopy || choco install robocopy"
  },
  {
    "id": "tool-355-xfs",
    "num": 355,
    "name": "XFS",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Высокопроизводительная ФС",
    "docUrl": "https://xfs.org/index.php?title=XFS_FAQ",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать XFS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y xfs || docker run -d xfs"
  },
  {
    "id": "tool-356-zfs",
    "num": 356,
    "name": "ZFS",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Файловая система с RAID, снимками и самовосстановлением",
    "docUrl": "https://openzfs.github.io/openzfs-docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать ZFS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y zfs || docker run -d zfs"
  },
  {
    "id": "tool-357-ceph",
    "num": 357,
    "name": "Ceph",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Распределённое хранилище для кластеров",
    "docUrl": "https://docs.ceph.com/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Ceph в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ceph || docker run -d ceph"
  },
  {
    "id": "tool-358-freefilesync",
    "num": 358,
    "name": "FreeFileSync",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Синхронизация и бэкап папок с графическим интерфейсом",
    "docUrl": "https://freefilesync.org/manual.php",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать FreeFileSync в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y freefilesync || docker run -d freefilesync"
  },
  {
    "id": "tool-359-glusterfs",
    "num": 359,
    "name": "GlusterFS",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Распределённая сетевая ФС",
    "docUrl": "https://docs.gluster.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать GlusterFS в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y glusterfs || docker run -d glusterfs"
  },
  {
    "id": "tool-360-openmediavault",
    "num": 360,
    "name": "OpenMediaVault",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "NAS на базе Debian",
    "docUrl": "https://docs.openmediavault.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать OpenMediaVault в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openmediavault || docker run -d openmediavault"
  },
  {
    "id": "tool-361-syncthing",
    "num": 361,
    "name": "Syncthing",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Децентрализованная синхронизация папок между устройствами",
    "docUrl": "https://docs.syncthing.net/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Syncthing в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y syncthing || docker run -d syncthing"
  },
  {
    "id": "tool-362-vsftpd-proftpd",
    "num": 362,
    "name": "vsftpd / proftpd",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Хранилища и файловые системы",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "FTP-серверы",
    "docUrl": "https://security.appspot.com/vsftpd.html",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать vsftpd / proftpd в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vsftpd || docker run -d vsftpd"
  },
  {
    "id": "tool-363-rufus-ventoy-etcher",
    "num": 363,
    "name": "Rufus / Ventoy / Etcher",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Развёртывание и клонирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Создание загрузочных флешек",
    "docUrl": "https://rufus.ie/ru/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Rufus / Ventoy / Etcher в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rufus || docker run -d rufus"
  },
  {
    "id": "tool-364-clonezilla",
    "num": 364,
    "name": "Clonezilla",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Развёртывание и клонирование",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Клонирование и развёртывание дисков по сети",
    "docUrl": "https://clonezilla.org/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Clonezilla в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y clonezilla || docker run -d clonezilla"
  },
  {
    "id": "tool-365-fog-project",
    "num": 365,
    "name": "FOG Project",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Развёртывание и клонирование",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Свободное клонирование ПК по сети (PXE)",
    "docUrl": "https://fogproject.org/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать FOG Project в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y fog || docker run -d fog"
  },
  {
    "id": "tool-366-macrium-reflect",
    "num": 366,
    "name": "Macrium Reflect",
    "type": "Программа",
    "specialization": "Хранилища и бэкапы",
    "category": "Развёртывание и клонирование",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Образы дисков и клонирование в Windows",
    "docUrl": "https://knowledgebase.macrium.com/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Macrium Reflect в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install macrium || choco install macrium"
  },
  {
    "id": "tool-367-windows-deployment-services",
    "num": 367,
    "name": "Windows Deployment Services",
    "type": "Технология",
    "specialization": "Хранилища и бэкапы",
    "category": "Развёртывание и клонирование",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Сетевая установка Windows по PXE",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/deployment/windows-deployment",
    "sources": "Admin_Full_Map, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Windows Deployment Services в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-368-openssh",
    "num": 368,
    "name": "OpenSSH",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Мировой стандарт защищенного удаленного администрирования по протоколу SSHv2, проброса портов и туннелирования.",
    "docUrl": "https://www.openssh.com/manual.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать OpenSSH в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y openssh || docker run -d openssh"
  },
  {
    "id": "tool-369-putty-kitty",
    "num": 369,
    "name": "PuTTY / KiTTY",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows"
    ],
    "osRaw": "Linux, Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Популярный клиент SSH, Telnet и Serial (COM-порт) для Windows. Незаменим для подключения к консолям коммутаторов Cisco, MikroTik, Huawei.",
    "docUrl": "https://www.putty.org/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать PuTTY / KiTTY в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y putty || docker run -d putty"
  },
  {
    "id": "tool-370-rdp",
    "num": 370,
    "name": "RDP",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Удалённый рабочий стол Windows",
    "docUrl": "https://ru.wikipedia.org/wiki/RDP",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать RDP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rdp || docker run -d rdp"
  },
  {
    "id": "tool-371-windows-terminal",
    "num": 371,
    "name": "Windows Terminal",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Современный терминал Windows",
    "docUrl": "https://learn.microsoft.com/ru-ru/windows/terminal/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Windows Terminal в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install windows || choco install windows"
  },
  {
    "id": "tool-372-mobaxterm",
    "num": 372,
    "name": "MobaXterm",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Комбайн: SSH, SFTP, X11, туннели для Windows",
    "docUrl": "https://mobaxterm.mobatek.net/documentation.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать MobaXterm в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install mobaxterm || choco install mobaxterm"
  },
  {
    "id": "tool-373-tailscale-headscale",
    "num": 373,
    "name": "Tailscale / Headscale",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Mesh-VPN на базе WireGuard",
    "docUrl": "https://tailscale.com/kb",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Tailscale / Headscale в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y tailscale || docker run -d tailscale"
  },
  {
    "id": "tool-374-vnc",
    "num": 374,
    "name": "VNC",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Удалённый доступ к графическому столу",
    "docUrl": "https://ru.wikipedia.org/wiki/VNC",
    "sources": "SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать VNC в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vnc || docker run -d vnc"
  },
  {
    "id": "tool-375-winscp",
    "num": 375,
    "name": "WinSCP",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Windows"
    ],
    "osRaw": "Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Графическая передача файлов по SSH/SFTP из Windows",
    "docUrl": "https://winscp.net/eng/docs/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать WinSCP в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "winget install winscp || choco install winscp"
  },
  {
    "id": "tool-376-xrdp",
    "num": 376,
    "name": "xrdp",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "RDP-сервер для Linux",
    "docUrl": "https://github.com/neutrinolabs/xrdp",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать xrdp в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y xrdp || docker run -d xrdp"
  },
  {
    "id": "tool-377-anydesk-teamviewer",
    "num": 377,
    "name": "AnyDesk / TeamViewer",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Коммерческий удалённый доступ",
    "docUrl": "https://anydesk.com/en",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать AnyDesk / TeamViewer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y anydesk || docker run -d anydesk"
  },
  {
    "id": "tool-378-jumpserver-bastion",
    "num": 378,
    "name": "JumpServer / bastion",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "macOS"
    ],
    "osRaw": "Linux, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Контролируемый доступ к серверам",
    "docUrl": "https://docs.jumpserver.org/ru/v3/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать JumpServer / bastion в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y jumpserver || docker run -d jumpserver"
  },
  {
    "id": "tool-379-rustdesk",
    "num": 379,
    "name": "RustDesk",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Open-source альтернатива TeamViewer",
    "docUrl": "https://rustdesk.com/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать RustDesk в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rustdesk || docker run -d rustdesk"
  },
  {
    "id": "tool-380-rustdesk-anydesk",
    "num": 380,
    "name": "RustDesk / AnyDesk",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Удалённая поддержка рабочих мест",
    "docUrl": "https://rustdesk.com/docs/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать RustDesk / AnyDesk в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rustdesk || docker run -d rustdesk"
  },
  {
    "id": "tool-381-rustdesk-vnc",
    "num": 381,
    "name": "RustDesk / VNC",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Удалённое управление десктопами",
    "docUrl": "https://rustdesk.com/docs/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать RustDesk / VNC в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rustdesk || docker run -d rustdesk"
  },
  {
    "id": "tool-382-teamviewer",
    "num": 382,
    "name": "TeamViewer",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Проприетарный инструмент удалённого управления и поддержки.",
    "docUrl": "https://www.teamviewer.com/ru/",
    "sources": "добавлено",
    "testLab": "Развернуть и протестировать TeamViewer в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y teamviewer || docker run -d teamviewer"
  },
  {
    "id": "tool-383-termius",
    "num": 383,
    "name": "Termius",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Удалённый доступ",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Кроссплатформенный SSH-клиент",
    "docUrl": "https://termius.com/",
    "sources": "Tools_Roadmap",
    "testLab": "Развернуть и протестировать Termius в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y termius || docker run -d termius"
  },
  {
    "id": "tool-384-nano",
    "num": 384,
    "name": "nano",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Редакторы и IDE",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Простейший консольный редактор",
    "docUrl": "https://www.nano-editor.org/dist/v8/nano.html",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать nano в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y nano || docker run -d nano"
  },
  {
    "id": "tool-385-vim-neovim",
    "num": 385,
    "name": "Vim / Neovim",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Редакторы и IDE",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Правка файлов на серверах",
    "docUrl": "https://neovim.io/doc/user/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Vim / Neovim в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vim || docker run -d vim"
  },
  {
    "id": "tool-386-vs-code",
    "num": 386,
    "name": "VS Code",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Редакторы и IDE",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Универсальный редактор",
    "docUrl": "https://code.visualstudio.com/docs",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать VS Code в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y vs || docker run -d vs"
  },
  {
    "id": "tool-387-jetbrains",
    "num": 387,
    "name": "JetBrains",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Редакторы и IDE",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IDE для Java/Python",
    "docUrl": "https://www.jetbrains.com/help/",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать JetBrains в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y jetbrains || docker run -d jetbrains"
  },
  {
    "id": "tool-388-apache-jmeter",
    "num": 388,
    "name": "Apache JMeter",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Тестирование и API",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Тестировщик / QA",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Промышленный инструмент нагрузочного тестирования веб-сайтов, API, баз данных (JDBC) и измерения производительности под 1000+ RPS.",
    "docUrl": "https://jmeter.apache.org/usermanual/index.html",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать Apache JMeter в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y apache || docker run -d apache"
  },
  {
    "id": "tool-389-charles-proxy-fiddler",
    "num": 389,
    "name": "Charles Proxy / Fiddler",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Тестирование и API",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Тестировщик / QA",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "HTTP-прокси / сниффер для перехвата, модификации и анализа входящих и исходящих запросов мобильных и десктопных приложений.",
    "docUrl": "https://www.charlesproxy.com/documentation/",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать Charles Proxy / Fiddler в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y charles || docker run -d charles"
  },
  {
    "id": "tool-390-playwright",
    "num": 390,
    "name": "Playwright",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Тестирование и API",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Тестировщик / QA",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Современный фреймворк сквозного тестирования (End-to-End E2E) веб-приложений в браузерах Chromium, Firefox и WebKit.",
    "docUrl": "https://playwright.dev/docs/intro",
    "sources": "Technologies_Programs",
    "testLab": "Развернуть и протестировать Playwright в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y playwright || docker run -d playwright"
  },
  {
    "id": "tool-391-postman",
    "num": 391,
    "name": "Postman",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Тестирование и API",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор",
      "Тестировщик / QA",
      "DevOps / Программист"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Платформа тестирования и отладки REST, GraphQL и WebSocket API: отправка запросов, проверка статус-кодов, авторизация и автотесты.",
    "docUrl": "https://learning.postman.com/",
    "sources": "Admin_Full_Map, Technologies_Programs",
    "testLab": "Развернуть и протестировать Postman в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y postman || docker run -d postman"
  },
  {
    "id": "tool-392-curl-wget-httpie",
    "num": 392,
    "name": "curl / wget / httpie",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "HTTP-запросы из терминала",
    "docUrl": "https://curl.se/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать curl / wget / httpie в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y curl || docker run -d curl"
  },
  {
    "id": "tool-393-draw-io-diagrams-net",
    "num": 393,
    "name": "draw.io / diagrams.net",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Рисование схем инфраструктуры",
    "docUrl": "https://www.diagrams.net/doc/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать draw.io / diagrams.net в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y draw.io || docker run -d draw.io"
  },
  {
    "id": "tool-394-jq",
    "num": 394,
    "name": "jq",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Обработка JSON в командной строке",
    "docUrl": "https://jqlang.github.io/jq/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать jq в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y jq || docker run -d jq"
  },
  {
    "id": "tool-395-markdown-mkdocs-hugo",
    "num": 395,
    "name": "Markdown + MkDocs / Hugo",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Документация в виде статического сайта",
    "docUrl": "https://www.mkdocs.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Markdown + MkDocs / Hugo в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y markdown || docker run -d markdown"
  },
  {
    "id": "tool-396-obsidian-notion",
    "num": 396,
    "name": "Obsidian / Notion",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Ведение базы знаний и документации",
    "docUrl": "https://help.obsidian.md/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Obsidian / Notion в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y obsidian || docker run -d obsidian"
  },
  {
    "id": "tool-397-rsync-sshfs",
    "num": 397,
    "name": "rsync + sshfs",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Работа с удалёнными файлами",
    "docUrl": "https://github.com/libfuse/sshfs",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать rsync + sshfs в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y rsync || docker run -d rsync"
  },
  {
    "id": "tool-398-ajenti",
    "num": 398,
    "name": "Ajenti",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Веб-панель",
    "docUrl": "https://docs.ajenti.org/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Ajenti в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ajenti || docker run -d ajenti"
  },
  {
    "id": "tool-399-ansible-lint-yamllint",
    "num": 399,
    "name": "ansible-lint / yamllint",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Линтеры для Ansible и YAML",
    "docUrl": "https://ansible.readthedocs.io/projects/lint/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать ansible-lint / yamllint в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y ansible-lint || docker run -d ansible-lint"
  },
  {
    "id": "tool-400-dive",
    "num": 400,
    "name": "dive",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Анализ слоёв Docker-образа",
    "docUrl": "https://github.com/wagoodman/dive",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать dive в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y dive || docker run -d dive"
  },
  {
    "id": "tool-401-gatus",
    "num": 401,
    "name": "Gatus",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Мониторинг статуса сервисов",
    "docUrl": "https://gatus.io/docs",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Gatus в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y gatus || docker run -d gatus"
  },
  {
    "id": "tool-402-grafana-oncall-pagerduty",
    "num": 402,
    "name": "Grafana OnCall / PagerDuty",
    "type": "Технология",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Облачный / веб",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Управление дежурствами и инцидентами",
    "docUrl": "https://grafana.com/docs/grafana-cloud/alerting-and-irm/grafana-oncall/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Grafana OnCall / PagerDuty в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y grafana || docker run -d grafana"
  },
  {
    "id": "tool-403-hadolint",
    "num": 403,
    "name": "hadolint",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Линтер Dockerfile",
    "docUrl": "https://github.com/hadolint/hadolint",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать hadolint в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y hadolint || docker run -d hadolint"
  },
  {
    "id": "tool-404-jira-redmine",
    "num": 404,
    "name": "Jira / Redmine",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Трекинг задач и инцидентов",
    "docUrl": "https://www.redmine.org/projects/redmine/wiki",
    "sources": "Admin_Full_Map",
    "testLab": "Развернуть и протестировать Jira / Redmine в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y jira || docker run -d jira"
  },
  {
    "id": "tool-405-lazydocker-ctop",
    "num": 405,
    "name": "lazydocker / ctop",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "TUI для Docker",
    "docUrl": "https://github.com/jesseduffield/lazydocker",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать lazydocker / ctop в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y lazydocker || docker run -d lazydocker"
  },
  {
    "id": "tool-406-netbox",
    "num": 406,
    "name": "NetBox",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "IPAM и DCIM (документирование инфраструктуры)",
    "docUrl": "https://docs.netbox.dev/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать NetBox в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y netbox || docker run -d netbox"
  },
  {
    "id": "tool-407-phpipam",
    "num": 407,
    "name": "phpIPAM",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux"
    ],
    "osRaw": "Linux",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Управление IP-адресами",
    "docUrl": "https://phpipam.net/documents/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать phpIPAM в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y phpipam || docker run -d phpipam"
  },
  {
    "id": "tool-408-sentry",
    "num": 408,
    "name": "Sentry",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Облачный / веб",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Мониторинг ошибок приложений",
    "docUrl": "https://docs.sentry.io/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Sentry в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sentry || docker run -d sentry"
  },
  {
    "id": "tool-409-speedtest-cli-librespeed",
    "num": 409,
    "name": "Speedtest CLI / LibreSpeed",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Тест скорости интернета",
    "docUrl": "https://github.com/librespeed/librespeed",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать Speedtest CLI / LibreSpeed в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y speedtest || docker run -d speedtest"
  },
  {
    "id": "tool-410-trivy-grype",
    "num": 410,
    "name": "trivy / grype",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Сканирование уязвимостей контейнеров и ФС",
    "docUrl": "https://trivy.dev/latest/docs/",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать trivy / grype в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y trivy || docker run -d trivy"
  },
  {
    "id": "tool-411-yq",
    "num": 411,
    "name": "yq",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Прочие полезные инструменты",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "Кроссплатформенный",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Средняя",
    "priorityRaw": "🟢 Низкий",
    "purpose": "Обработка YAML в командной строке",
    "docUrl": "https://github.com/mikefarah/yq",
    "sources": "SysAdmin_Full_List",
    "testLab": "Развернуть и протестировать yq в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y yq || docker run -d yq"
  },
  {
    "id": "tool-412-mariadb",
    "num": 412,
    "name": "MariaDB",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Базы данных",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Самая распространенная в веб-разработке реляционная СУБД (движок InnoDB), основа CMS WordPress, 1С-Битрикс, Drupal.",
    "docUrl": "https://mariadb.org/documentation/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать MariaDB в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mariadb || docker run -d mariadb"
  },
  {
    "id": "tool-413-mongodb",
    "num": 413,
    "name": "MongoDB",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Базы данных",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS"
    ],
    "osRaw": "Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Документоориентированная NoSQL СУБД с гибкой схемой хранения данных в формате BSON/JSON, шардингом и репликацией Replica Set.",
    "docUrl": "https://www.mongodb.com/docs/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать MongoDB в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y mongodb || docker run -d mongodb"
  },
  {
    "id": "tool-414-postgresql",
    "num": 414,
    "name": "PostgreSQL",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Базы данных",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Передовая объектно-реляционная СУБД с полной поддержкой стандарта ACID, JSONB, полнотекстового поиска и потоковой репликации.",
    "docUrl": "https://www.postgresql.org/docs/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать PostgreSQL в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y postgresql || docker run -d postgresql"
  },
  {
    "id": "tool-415-redis",
    "num": 415,
    "name": "Redis",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Базы данных",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Сверхбыстрое сетевое хранилище данных в оперативной памяти (In-Memory Key-Value) для кэширования ответов, сессий и очередей.",
    "docUrl": "https://redis.io/docs/latest/",
    "sources": "Admin_Full_Map, IT_Mega_Matrix, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Redis в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y redis || docker run -d redis"
  },
  {
    "id": "tool-416-sqlite",
    "num": 416,
    "name": "SQLite",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Базы данных",
    "supportedOS": [
      "Linux",
      "Windows",
      "macOS",
      "FreeBSD"
    ],
    "osRaw": "FreeBSD, Linux, Windows, macOS",
    "roles": [
      "Системный администратор"
    ],
    "level": "Junior",
    "importance": "Критически важно",
    "priorityRaw": "🔴 Высокий",
    "purpose": "Компактная однофайловая встраиваемая СУБД. Широко используется во внутренних утилитах, мобильных приложениях и тестовых стендах.",
    "docUrl": "https://www.sqlite.org/docs.html",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Technologies_Programs, Tools_Roadmap",
    "testLab": "Развернуть и протестировать SQLite в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y sqlite || docker run -d sqlite"
  },
  {
    "id": "tool-417-microsoft-sql-server",
    "num": 417,
    "name": "Microsoft SQL Server",
    "type": "Программа",
    "specialization": "Удалённый доступ и прочее",
    "category": "Базы данных",
    "supportedOS": [
      "Linux",
      "Windows"
    ],
    "osRaw": "Linux, Windows",
    "roles": [
      "Системный администратор"
    ],
    "level": "Middle",
    "importance": "Высокая",
    "priorityRaw": "🟡 Средний",
    "purpose": "Корпоративная СУБД Microsoft, часто в доменных средах",
    "docUrl": "https://learn.microsoft.com/ru-ru/sql/sql-server/",
    "sources": "Admin_Full_Map, SysAdmin_Full_List, Tools_Roadmap",
    "testLab": "Развернуть и протестировать Microsoft SQL Server в тестовой среде (VirtualBox / Docker / VPS). Изучить конфигурационные файлы и подготовить краткий отчет с командами запуска для портфолио.",
    "quickCommandOrInstall": "sudo apt install -y microsoft || docker run -d microsoft"
  }
];
