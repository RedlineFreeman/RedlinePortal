import { SubnetResult, RaidResult, ResumeData, RoadmapStep } from '../types/sysadmin';

/**
 * Converts dotted-decimal IPv4 to 32-bit unsigned integer
 */
export function ipToInt(ip: string): number {
  return ip
    .split('.')
    .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

/**
 * Converts 32-bit integer to dotted-decimal IPv4
 */
export function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join('.');
}

/**
 * Calculates IPv4 Subnet details
 */
export function calculateSubnet(ipStr: string, cidr: number): SubnetResult | null {
  const cleanIp = ipStr.trim();
  const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = cleanIp.match(ipRegex);
  if (!match) return null;

  const octets = [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
    parseInt(match[3], 10),
    parseInt(match[4], 10),
  ];
  if (octets.some((o) => o < 0 || o > 255)) return null;
  if (cidr < 0 || cidr > 32) return null;

  const ipInt = ipToInt(cleanIp);
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = ~maskInt >>> 0;

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  let totalUsableHosts = 0;
  let firstUsableInt = networkInt;
  let lastUsableInt = broadcastInt;

  if (cidr === 32) {
    totalUsableHosts = 1;
    firstUsableInt = networkInt;
    lastUsableInt = networkInt;
  } else if (cidr === 31) {
    // RFC 3021 Point-to-Point
    totalUsableHosts = 2;
    firstUsableInt = networkInt;
    lastUsableInt = broadcastInt;
  } else {
    totalUsableHosts = Math.max(0, Math.pow(2, 32 - cidr) - 2);
    firstUsableInt = (networkInt + 1) >>> 0;
    lastUsableInt = (broadcastInt - 1) >>> 0;
  }

  // Class detection
  const firstOctet = octets[0];
  let ipClass = 'Class A';
  if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
  else if (firstOctet >= 240) ipClass = 'Class E (Experimental)';

  // Private IP detection (RFC 1918)
  const isPrivate =
    firstOctet === 10 ||
    (firstOctet === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (firstOctet === 192 && octets[1] === 168);

  return {
    ip: cleanIp,
    cidr,
    netmask: intToIp(maskInt),
    wildcard: intToIp(wildcardInt),
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstUsableIp: intToIp(firstUsableInt),
    lastUsableIp: intToIp(lastUsableInt),
    totalUsableHosts,
    ipClass,
    isPrivate,
  };
}

/**
 * Calculates RAID array parameters
 */
export function calculateRaid(
  raidType: 'RAID 0' | 'RAID 1' | 'RAID 5' | 'RAID 6' | 'RAID 10',
  diskCount: number,
  diskSizeGb: number
): RaidResult {
  const rawCapacityGb = diskCount * diskSizeGb;
  let usableCapacityGb = 0;
  let faultToleranceDisks = 0;
  let readSpeedMultiplier = '1x';
  let writeSpeedMultiplier = '1x';
  let pros: string[] = [];
  let cons: string[] = [];
  let recommendation = '';

  switch (raidType) {
    case 'RAID 0': {
      usableCapacityGb = diskCount * diskSizeGb;
      faultToleranceDisks = 0;
      readSpeedMultiplier = `${diskCount}x`;
      writeSpeedMultiplier = `${diskCount}x`;
      pros = ['100% полезного объема', 'Максимальная скорость чтения и записи'];
      cons = ['Отказ любого диска приводит к полной потере всех данных!'];
      recommendation = 'Только для временных файлов, кэша или скратч-дисков. В продакшене без бэкапов запрещен!';
      break;
    }
    case 'RAID 1': {
      usableCapacityGb = diskSizeGb;
      faultToleranceDisks = Math.max(0, diskCount - 1);
      readSpeedMultiplier = `${diskCount}x`;
      writeSpeedMultiplier = '1x (ограничена самым медленным диском)';
      pros = ['Высокая надежность зеркалирования', 'Быстрое чтение', 'Простое восстановление'];
      cons = ['Низкая полезная емкость (только 1 диск из N, обычно 50% при 2 дисках)'];
      recommendation = 'Идеально для системного раздела ОС гипервизора или сервера базы данных.';
      break;
    }
    case 'RAID 5': {
      const minDisks = Math.max(3, diskCount);
      usableCapacityGb = (minDisks - 1) * diskSizeGb;
      faultToleranceDisks = 1;
      readSpeedMultiplier = `${minDisks - 1}x`;
      writeSpeedMultiplier = 'Снижена (штраф за вычисление четности parity write penalty 4 IOPS)';
      pros = ['Хороший баланс емкости и надежности', 'Выдерживает отказ 1 диска'];
      cons = ['Долгий rebuild', 'Высокий риск URE (Unrecoverable Read Error) при перестроении на дисках > 2TB'];
      recommendation = 'Подходит для файловых архивов и бэкапов при небольшом объеме дисков.';
      break;
    }
    case 'RAID 6': {
      const minDisks = Math.max(4, diskCount);
      usableCapacityGb = (minDisks - 2) * diskSizeGb;
      faultToleranceDisks = 2;
      readSpeedMultiplier = `${minDisks - 2}x`;
      writeSpeedMultiplier = 'Снижена (двойная четность, штраф 6 IOPS)';
      pros = ['Выдерживает одновременный отказ любых 2 дисков', 'Безопасный rebuild для больших HDD'];
      cons = ['Требует минимум 4 диска', 'Сниженная скорость случайной записи'];
      recommendation = 'Золотой стандарт для больших СХД и емких NAS с HDD от 4TB и выше.';
      break;
    }
    case 'RAID 10': {
      const evenDisks = diskCount % 2 === 0 ? diskCount : diskCount - 1;
      usableCapacityGb = (evenDisks / 2) * diskSizeGb;
      faultToleranceDisks = 1; // минимум 1 диск, до N/2 если в разных зеркалах
      readSpeedMultiplier = `${evenDisks}x`;
      writeSpeedMultiplier = `${evenDisks / 2}x`;
      pros = ['Отличная скорость записи и чтения без задержек на parity', 'Быстрый rebuild', 'Высокая надежность'];
      cons = ['Теряется 50% емкости под зеркалирование', 'Требует четное количество дисков (минимум 4)'];
      recommendation = 'Выбор №1 для высоконагруженных баз данных (PostgreSQL, MySQL, MS SQL) и виртуализации.';
      break;
    }
  }

  const efficiencyPercent = rawCapacityGb > 0 ? Math.round((usableCapacityGb / rawCapacityGb) * 100) : 0;

  return {
    raidType,
    diskCount,
    diskSizeGb,
    rawCapacityGb,
    usableCapacityGb,
    efficiencyPercent,
    faultToleranceDisks,
    readSpeedMultiplier,
    writeSpeedMultiplier,
    pros,
    cons,
    recommendation,
  };
}

/**
 * Generates an all-in-one Master Portfolio README for GitHub profile
 */
export function generatePortfolioMasterReadme(
  fullName: string,
  githubUrl: string,
  completedSteps: RoadmapStep[]
): string {
  const dateStr = new Date().toISOString().split('T')[0];
  const labsList = completedSteps
    .map(
      (s, idx) =>
        `### ${idx + 1}. [${s.lab.portfolioArtifact.title}](./labs/${s.slug})\n` +
        `- **Стек технологий:** ${s.lab.portfolioArtifact.technologies.join(', ')}\n` +
        `- **Описание:** ${s.lab.portfolioArtifact.summary}\n` +
        `- **Ключевой навык:** ${s.keySkills.slice(0, 4).join(', ')}\n`
    )
    .join('\n');

  return `# Sysadmin Portfolio & Infrastructure Labs

> **Автор:** ${fullName || 'Системный администратор'}  
> **GitHub:** ${githubUrl || 'https://github.com/sysadmin-pro'}  
> **Статус:** Ищу работу Junior / Middle System Administrator  
> **Обновлено:** ${dateStr}

---

## 🎯 Обо мне и инженерном подходе
Я системный администратор с практическим опытом развертывания отказоустойчивой инфраструктуры, автоматизации рутины через Bash и Ansible, настройки сетей (VLAN, VPN, Firewall), управления Linux/Windows серверами, контейнеризации (Docker) и мониторинга (Prometheus + Grafana / Zabbix).

Все проекты в данном портфолио развернуты и протестированы в реальной лабораторной среде (Proxmox VE / KVM / VPS), снабжены документацией (Runbooks) и конфигурационными файлами.

---

## 🛠 Технологический стек (Competency Matrix)
- **Операционные системы:** Ubuntu Server (20.04/22.04/24.04), Debian, Rocky Linux / RHEL, Windows Server 2022 (AD DS, GPO)
- **Сетевые технологии:** TCP/IP, DNS (BIND9, Unbound), DHCP, VLAN (802.1Q), NAT, WireGuard/OpenVPN, iptables/nftables, UFW, Wireshark
- **Web-стек & Базы данных:** Nginx (reverse proxy, load balancing, SSL/TLS Let's Encrypt), Apache, PostgreSQL, MySQL/MariaDB, Redis
- **Виртуализация & Контейнеры:** Proxmox VE, KVM/QEMU, Docker, Docker Compose, Portainer
- **Автоматизация & IaC:** Bash-скриптинг (logging, error handling), Ansible (roles, playbooks, inventory), PowerShell
- **Мониторинг & Логирование:** Prometheus, Node Exporter, Grafana, Zabbix 7.0, Loki, Alertmanager, journalctl, logrotate
- **Безопасность & Резервное копирование:** BorgBackup (3-2-1), Restic, SSH Hardening, Fail2ban, UFW, CIS Linux Benchmarks

---

## 📂 Практические проекты портфолио

${labsList}

---

## 🚀 Как развернуть лабораторную среду
Большинство проектов оформлены в виде декларативных Ansible плейбуков или Docker Compose файлов:
\`\`\`bash
git clone ${githubUrl || 'https://github.com/sysadmin-pro/infrastructure-labs.git'}
cd infrastructure-labs
# Следуйте инструкциям в README соответствующей директории
\`\`\`

---
*Связаться со мной можно через контакты в профиле GitHub или резюме.*
`;
}

/**
 * Generates structured CV / Resume in Russian ready for HH.ru / PDF / Markdown
 */
export function generateResumeMarkdown(resume: ResumeData, completedSteps: RoadmapStep[]): string {
  const skillsList = Array.from(
    new Set(completedSteps.flatMap((s) => s.keySkills))
  ).join(', ');

  const projectsSection = completedSteps
    .map(
      (s) =>
        `### ${s.lab.portfolioArtifact.title}\n` +
        `**Стек:** ${s.lab.portfolioArtifact.technologies.join(', ')}\n` +
        `- ${s.lab.portfolioArtifact.summary}\n` +
        `- Разработаны скрипты автоматизации и документация аварийного восстановления (Runbook).\n`
    )
    .join('\n');

  return `# Резюме: ${resume.fullName || 'Системный администратор'}
**Желаемая должность:** ${resume.role || 'Младший системный администратор (Junior / Middle Sysadmin)'}  
**Город / Формат работы:** ${resume.city || 'Удаленно / Гибрид'}  
**Контакты:** 
- Email: ${resume.email || 'sysadmin@example.com'}
- Телефон / Telegram: ${resume.phone || '+7 (999) 000-00-00'} | ${resume.telegram || '@sysadmin_pro'}
- GitHub с портфолио: ${resume.githubUrl || 'https://github.com/sysadmin-pro'}

---

## 💼 Профессиональная цель
${resume.aboutMe || 'Целеустремленный системный администратор с глубоким пониманием сетевых протоколов (TCP/IP, DNS, Routing), системного администрирования Linux (Ubuntu/Debian, Rocky Linux), Windows Server (Active Directory, GPO) и контейнеризации (Docker). Имею практический опыт настройки серверов, автоматизации задач через Bash и Ansible, настройки мониторинга Prometheus/Grafana и внедрения бэкапов.'}

---

## 🛠 Ключевые навыки
${skillsList || 'Linux (Ubuntu/Debian/RHEL), TCP/IP, DNS, DHCP, VLAN, Nginx, Docker, Ansible, Bash, PostgreSQL, Zabbix, Prometheus, Grafana, BorgBackup, Git'}

---

## 📁 Выполненные инфраструктурные проекты (Портфолио)
${projectsSection || 'Развернуты комплексные стенды виртуализации, веб-серверов, мониторинга и резервного копирования (см. репозитории на GitHub).'}

---

## 🎓 Образование и самообразование
- Практический трек подготовки системных администраторов (Linux, Networks, Security, DevOps basics)
- Лабораторные стенды на Proxmox VE, Docker и реальных VPS
- Постоянное изучение официальной документации (Red Hat docs, Ubuntu Server Guide, Debian Wiki, Nginx docs)
`;
}
