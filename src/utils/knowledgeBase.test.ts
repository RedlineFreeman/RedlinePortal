import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_KNOWLEDGE_ENTRIES } from '../data/initialKnowledgeBase';
import { KnowledgeEntry } from '../types/knowledgeBase';
import {
  deduplicateKnowledgeEntries,
  mergeKnowledgeEntries,
  filterKnowledgeEntries,
} from './knowledgeBaseHelper';

test('initial knowledge base contains SCTP with requested structure and description', () => {
  const sctp = INITIAL_KNOWLEDGE_ENTRIES.find((e) => e.title.includes('SCTP'));
  assert.ok(sctp, 'SCTP entry must exist in initial knowledge base');

  // Verify section and category hierarchy
  assert.equal(sctp.section, 'Сети');
  assert.equal(sctp.category, 'Протоколы');

  // Verify the exact content requested by the user
  assert.ok(
    sctp.description.toLowerCase().includes('протокол передачи управления потоком'),
    'Description must contain stream control transmission protocol definition'
  );
  assert.ok(
    sctp.description.includes('SCTP обеспечивает надежную последовательную передачу данных'),
    'Description must mention reliable sequential transmission'
  );
  assert.ok(
    sctp.description.includes('Поддерживает многоадресное соединение'),
    'Description must mention multi-homing support'
  );
  assert.ok(
    sctp.description.includes('преимущество протокола SCTP — в быстром переключении между интерфейсами'),
    'Description must explain fast failover advantages'
  );
});

test('knowledge entries have valid sections, categories, and levels with zero duplicates', () => {
  assert.ok(INITIAL_KNOWLEDGE_ENTRIES.length >= 80, `Expected >= 80 entries, got ${INITIAL_KNOWLEDGE_ENTRIES.length}`);

  const validLevels = ['Junior', 'Middle', 'Senior'];
  const seenIds = new Set<string>();
  const seenTitles = new Set<string>();

  for (const entry of INITIAL_KNOWLEDGE_ENTRIES) {
    assert.ok(entry.id.length > 0);
    assert.ok(entry.section.length > 0);
    assert.ok(entry.category.length > 0);
    assert.ok(entry.title.length > 0);
    assert.ok(entry.description.length > 0);
    assert.ok(validLevels.includes(entry.level), `Invalid level: ${entry.level}`);
    assert.ok(Array.isArray(entry.tags), 'Tags must be an array');

    const normId = entry.id.trim().toLowerCase();
    const normTitle = entry.title.trim().toLowerCase().replace(/\s+/g, ' ');
    assert.ok(!seenIds.has(normId), `Duplicate id detected: ${entry.id}`);
    assert.ok(!seenTitles.has(normTitle), `Duplicate title detected: ${entry.title}`);
    seenIds.add(normId);
    seenTitles.add(normTitle);
  }
});

test('all 16 requested knowledge topics are covered in INITIAL_KNOWLEDGE_ENTRIES', () => {
  const requiredTopicKeywords = [
    { name: '1С', pattern: /1с/i },
    { name: 'Bash', pattern: /\bbash\b/i },
    { name: 'Active Directory', pattern: /active directory/i },
    { name: 'Cisco', pattern: /cisco/i },
    { name: 'Excel', pattern: /excel/i },
    { name: 'FreeBSD', pattern: /freebsd/i },
    { name: 'Hyper-V', pattern: /hyper-v/i },
    { name: 'Linux', pattern: /linux/i },
    { name: 'Microsoft Office', pattern: /microsoft office|office deployment|outlook|word/i },
    { name: 'PowerShell', pattern: /powershell/i },
    { name: 'Sysinternals', pattern: /sysinternals|procmon|autoruns/i },
    { name: 'Windows Server', pattern: /windows server/i },
    { name: 'Unix', pattern: /\bunix\b/i },
    { name: 'Базы данных', pattern: /базы данных|postgresql|mysql|sqlite|redis/i },
    { name: 'Wireshark', pattern: /wireshark/i },
    { name: 'Сетевое администрирование', pattern: /сети|сетевое администрирование|osi|tcp|sctp|dns|dhcp/i },
  ];

  for (const topic of requiredTopicKeywords) {
    const matched = INITIAL_KNOWLEDGE_ENTRIES.some((entry) => {
      const searchable = [
        entry.section,
        entry.category,
        entry.title,
        entry.shortSummary,
        entry.description,
        ...entry.tags,
      ].join(' ');
      return topic.pattern.test(searchable);
    });
    assert.ok(matched, `Requested topic "${topic.name}" must be covered in INITIAL_KNOWLEDGE_ENTRIES`);
  }
});

test('deduplicateKnowledgeEntries removes repeated ids and normalized titles', () => {
  const sample: KnowledgeEntry[] = [
    INITIAL_KNOWLEDGE_ENTRIES[0],
    { ...INITIAL_KNOWLEDGE_ENTRIES[0] },
    {
      ...INITIAL_KNOWLEDGE_ENTRIES[1],
      id: 'duplicate-title-id',
      title: `  ${INITIAL_KNOWLEDGE_ENTRIES[0].title.toLowerCase()}  `,
    },
    INITIAL_KNOWLEDGE_ENTRIES[1],
  ];

  const deduped = deduplicateKnowledgeEntries(sample);
  assert.equal(deduped.length, 2);
});

test('mergeKnowledgeEntries preserves custom user entries and injects missing seed entries', () => {
  const customEntry: KnowledgeEntry = {
    id: 'kb-custom-test',
    section: 'Сети',
    category: 'Заметки',
    title: 'Моя корпоративная схема VLAN',
    shortSummary: 'Тестовая запись',
    description: 'Пользовательское описание внутренней сети.',
    level: 'Middle',
    tags: ['VLAN', 'Custom'],
    isCustom: true,
    createdAt: '2026-11-14',
    updatedAt: '2026-11-14',
  };

  // Simulate old localStorage containing only SCTP + 1 custom entry
  const oldSaved = [INITIAL_KNOWLEDGE_ENTRIES[0], customEntry];
  const merged = mergeKnowledgeEntries(oldSaved, INITIAL_KNOWLEDGE_ENTRIES);

  assert.equal(merged.length, INITIAL_KNOWLEDGE_ENTRIES.length + 1);
  assert.equal(merged[0].id, customEntry.id);
  assert.ok(merged.some((e) => e.section === '1С:Предприятие'));
  assert.ok(merged.some((e) => e.section === 'Cisco и Сетевое оборудование'));
});

test('filterKnowledgeEntries filters by query, section, and level', () => {
  const ciscoEntries = filterKnowledgeEntries(INITIAL_KNOWLEDGE_ENTRIES, {
    searchQuery: 'OSPF',
    selectedSection: 'Cisco и Сетевое оборудование',
    selectedCategory: 'all',
    selectedLevel: 'all',
  });
  assert.ok(ciscoEntries.length >= 1);
  assert.ok(ciscoEntries.every((e) => e.section === 'Cisco и Сетевое оборудование'));

  const seniorOnly = filterKnowledgeEntries(INITIAL_KNOWLEDGE_ENTRIES, {
    searchQuery: '',
    selectedSection: 'all',
    selectedCategory: 'all',
    selectedLevel: 'Senior',
  });
  assert.ok(seniorOnly.length >= 1);
  assert.ok(seniorOnly.every((e) => e.level === 'Senior'));
});

test('knowledge entries can be serialized and deserialized to JSON without loss', () => {
  const jsonStr = JSON.stringify(INITIAL_KNOWLEDGE_ENTRIES);
  const parsed: KnowledgeEntry[] = JSON.parse(jsonStr);

  assert.equal(parsed.length, INITIAL_KNOWLEDGE_ENTRIES.length);
  assert.equal(parsed[0].title, INITIAL_KNOWLEDGE_ENTRIES[0].title);
  assert.equal(parsed[0].section, INITIAL_KNOWLEDGE_ENTRIES[0].section);
});

test('databases section is richly populated without duplicates', () => {
  const dbEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Базы данных');
  assert.ok(dbEntries.length >= 20, `Expected >= 20 entries in Базы данных, got ${dbEntries.length}`);

  const expectedDbTopics = [
    /acid|cap/i,
    /изоляции транзакций|isolation/i,
    /нормальные формы|oltp|olap/i,
    /pgbouncer/i,
    /patroni/i,
    /блокировки|deadlock/i,
    /репликация бд/i,
    /партиционирование|sharding/i,
    /pgbackrest|xtrabackup/i,
    /mongodb/i,
    /clickhouse/i,
    /elasticsearch|opensearch/i,
    /миграции схем/i,
    /безопасность субд|row-level security/i,
  ];

  for (const pattern of expectedDbTopics) {
    assert.ok(
      dbEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.tags.join(' ')}`)),
      `Databases section must cover pattern ${pattern}`
    );
  }
});

test('protocols category contains comprehensive non-duplicate OSI L2-L7 and VPN coverage', () => {
  const protocolEntries = INITIAL_KNOWLEDGE_ENTRIES.filter(
    (e) => e.section === 'Сети' && e.category === 'Протоколы'
  );
  assert.ok(
    protocolEntries.length >= 50,
    `Expected >= 50 entries in Сети -> Протоколы, got ${protocolEntries.length}`
  );

  const requiredProtocols = [
    /sctp/i,
    /tcp/i,
    /udp/i,
    /quic|http\/3/i,
    /ethernet|802\.3/i,
    /lldp|cdp/i,
    /802\.1x/i,
    /pppoe|l2tp/i,
    /is-is|eigrp|rip/i,
    /\bgre\b|ipip/i,
    /vxlan|geneve/i,
    /mpls/i,
    /vrrp|carp/i,
    /igmp|pim/i,
    /dccp|rudp/i,
    /tls 1\.3|dtls/i,
    /socks5/i,
    /http\/1\.1|http\/2/i,
    /websocket/i,
    /grpc/i,
    /ssh|sftp/i,
    /rdp|vnc|spice/i,
    /telnet|rs-232/i,
    /smb|cifs/i,
    /\bnfs\b/i,
    /ftp|tftp/i,
    /iscsi|nvme-of|fibre channel/i,
    /webdav|s3 api/i,
    /smtp/i,
    /imap|pop3/i,
    /snmp/i,
    /syslog|netflow|sflow/i,
    /radius|tacacs\+/i,
    /ldap/i,
    /oauth 2\.0|oidc|saml/i,
    /mqtt|amqp/i,
    /coap/i,
    /sip|rtp|webrtc/i,
    /xmpp|matrix/i,
    /modbus|opc ua|bacnet/i,
    /mdns|llmnr/i,
    /\bbfd\b|\bptp\b/i,
    /wireguard|amneziawg/i,
    /ipsec|ikev2/i,
    /openvpn/i,
    /pptp|sstp/i,
    /openconnect|anyconnect|softether/i,
    /tailscale|zerotier/i,
    /shadowsocks|vless|trojan/i,
    /doh|dot|doq/i,
    /diameter/i,
    /evpn|rpki/i,
    /kerberos|ntlm/i,
    /wake-on-lan|pxe/i,
    /rsync/i,
    /bittorrent|ipfs|\btor\b/i,
  ];

  for (const pattern of requiredProtocols) {
    assert.ok(
      protocolEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.tags.join(' ')}`)),
      `Protocols category must cover pattern ${pattern}`
    );
  }
});

test('linux section contains comprehensive OS, FHS, filesystems, CLI tools, and all firewall types', () => {
  const linuxEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Linux & ОС');
  assert.ok(linuxEntries.length >= 25, `Expected >= 25 entries in Linux & ОС, got ${linuxEntries.length}`);

  const requiredLinuxTopics = [
    /kernel space|user space|syscalls/i,
    /fhs|\/etc|\/var|\/usr|\/opt/i,
    /\/proc|\/sys|\/etc\/passwd/i,
    /debian|ubuntu|almalinux|alpine|astra/i,
    /sudoers|visudo|pam|tty/i,
    /netplan|networkmanager|nmcli/i,
    /ext4|xfs/i,
    /btrfs/i,
    /zfs/i,
    /overlayfs|tmpfs|procfs/i,
    /fat32|exfat|ntfs3|f2fs|squashfs|fuse/i,
    /fstab|mdadm|luks/i,
    /lvm2/i,
    /ncdu|zstd|find/i,
    /htop|iostat|vmstat|iotop|sar/i,
    /lsof|strace|fuser/i,
    /tmux|vim|smartctl|chrony/i,
    /sysctl|auditd/i,
    /iptables|netfilter/i,
    /nftables/i,
    /ufw|docker-user/i,
    /firewalld|firewall-cmd/i,
    /fail2ban|sshd_config/i,
  ];

  for (const pattern of requiredLinuxTopics) {
    assert.ok(
      linuxEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Linux & ОС section must cover pattern ${pattern}`
    );
  }
});

test('office and analytics section covers VBA, macros, large tables, and internet data import', () => {
  const officeEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Офисные пакеты и Аналитика');
  assert.ok(officeEntries.length >= 17, `Expected >= 17 entries in Офисные пакеты и Аналитика, got ${officeEntries.length}`);

  const requiredOfficeTopics = [
    /option explicit|alt\+f11|vbe/i,
    /scripting\.dictionary|screenupdating|variant/i,
    /outlook\.application|udf|public function/i,
    /winhttp|xmlhttp|cbr\.ru/i,
    /selfcert|office scripts|цифровая подпись/i,
    /web\.contents|json\.document|html/i,
    /xlsb|1 048 576|летучие/i,
    /power pivot|vertipaq|dax/i,
    /importxml|importhtml|apps script/i,
  ];

  for (const pattern of requiredOfficeTopics) {
    assert.ok(
      officeEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Офисные пакеты и Аналитика section must cover pattern ${pattern}`
    );
  }
});

test('cisco section covers hardware lineup, OS families, physical connection, and engineer CLI commands', () => {
  const ciscoEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Cisco и Сетевое оборудование');
  assert.ok(ciscoEntries.length >= 16, `Expected >= 16 entries in Cisco и Сетевое оборудование, got ${ciscoEntries.length}`);

  const requiredCiscoTopics = [
    /catalyst|nexus|isr|asr|firepower/i,
    /ios-xe|nx-os|ios-xr/i,
    /rommon|nvram|0x2142|confreg/i,
    /9600|rollover|ttyusb|mgmt-vrf|console/i,
    /sfp|transceiver|tdr|stackwise/i,
    /show ip interface brief|show mac address-table|show cdp neighbors/i,
    /reload in|configure replace|archive|terminal length 0/i,
    /router bgp|df-bit|vrf|ip route/i,
    /ip nat inside|ip dhcp pool|logging host/i,
    /dhcp snooping|arp inspection|monitor session|monitor capture/i,
    /aaa new-model|tacacs|radius/i,
  ];

  for (const pattern of requiredCiscoTopics) {
    assert.ok(
      ciscoEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Cisco section must cover pattern ${pattern}`
    );
  }
});

test('freebsd and unix section covers architecture, filesystems, management commands, and base/userland software', () => {
  const bsdUnixEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'FreeBSD & Unix');
  assert.ok(bsdUnixEntries.length >= 18, `Expected >= 18 entries in FreeBSD & Unix, got ${bsdUnixEntries.length}`);

  const requiredBsdUnixTopics = [
    /geom|cam|kldload|vnet/i,
    /hier|rcng|smf|launchd/i,
    /ufs2|soft updates|gpart|newfs/i,
    /geli|gmirror|openzfs/i,
    /devfs|nullfs|apfs|jfs2|vxfs/i,
    /ifconfig|lagg|carp|drill|sockstat/i,
    /pw useradd|procstat|truss|gstat|systat/i,
    /doas|sed -i ''|aix|solaris/i,
    /dtrace|bhyve|periodic|clang/i,
    /poudriere|linuxulator|xorg|wayland/i,
  ];

  for (const pattern of requiredBsdUnixTopics) {
    assert.ok(
      bsdUnixEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `FreeBSD & Unix section must cover pattern ${pattern}`
    );
  }
});

test('windows and active directory section covers forests, trees, GPO details, Windows versions, sizes, LOC, and default features', () => {
  const winEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Windows & Active Directory');
  assert.ok(winEntries.length >= 17, `Expected >= 17 entries in Windows & Active Directory, got ${winEntries.length}`);

  const requiredWinTopics = [
    /install-addsforest|tree|trusts|довери/i,
    /sites|subnets|rodc|global catalog/i,
    /recycle bin|fgpp|new-aduser|search-adaccount/i,
    /preferences|central store|loopback|admx/i,
    /applocker|laps|bitlocker|llmnr/i,
    /строк кода|windows 7|windows 11|ltsc|tpm 2\.0/i,
    /server 2025|server core|desktop experience|datacenter/i,
    /smbv1|rsat|wsl 2|по умолчанию|optional/i,
  ];

  for (const pattern of requiredWinTopics) {
    assert.ok(
      winEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Windows & AD section must cover pattern ${pattern}`
    );
  }
});

test('virtualization section covers Type-1/2/containers, VMware, VirtualBox, Hyper-V, Proxmox, KVM, Xen, Parallels, UTM and licensing', () => {
  const virtEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Виртуализация');
  assert.ok(virtEntries.length >= 12, `Expected >= 12 entries in Виртуализация, got ${virtEntries.length}`);

  const requiredVirtTopics = [
    /type-1|type-2|vt-x|amd-v/i,
    /esxi|vsphere|vmotion|broadcom/i,
    /vmware workstation|vmware fusion|vmrun/i,
    /virtualbox|puel|vboxmanage|extension pack/i,
    /hyper-v|vhdx|vswitch/i,
    /kvm|qemu|libvirt|qcow2|virsh/i,
    /proxmox|pve|ceph|proxmox backup server/i,
    /xcp-ng|nutanix ahv|ovirt|bhyve/i,
    /parallels|utm|windows sandbox|multipass|vagrant/i,
    /docker|podman|lxc|incus|kubernetes/i,
  ];

  for (const pattern of requiredVirtTopics) {
    assert.ok(
      virtEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Виртуализация section must cover pattern ${pattern}`
    );
  }
});

test('system diagnostics section covers full Microsoft Sysinternals Suite categories and utilities', () => {
  const diagEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Системная диагностика');
  assert.ok(diagEntries.length >= 10, `Expected >= 10 entries in Системная диагностика, got ${diagEntries.length}`);

  const requiredSysinternalsTools = [
    /live\.sysinternals\.com|accepteula|sysinternals suite/i,
    /process explorer|procexp/i,
    /process monitor|procmon/i,
    /autoruns/i,
    /psexec|pslist|pskill|psinfo|psservice|psloggedon|psfile|pssuspend|psshutdown/i,
    /procdump|vmmap|rammap|handle|listdlls|debugview|livekd/i,
    /disk2vhd|sdelete|contig|streams|junction|pendmoves|pipelist/i,
    /tcpview|psping|adexplorer|adinsight|adrestore|shareenum|portmon/i,
    /sysmon|sigcheck|accesschk|accessenum|strings|autologon/i,
    /bginfo|zoomit|rdcman|coreinfo|winobj|regjump|clockres/i,
  ];

  for (const pattern of requiredSysinternalsTools) {
    assert.ok(
      diagEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Системная диагностика section must cover pattern ${pattern}`
    );
  }
});

test('automation section covers PowerShell, Bash, Bat/Cmd, POSIX Shell/Zsh/Expect, and Python', () => {
  const autoEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === 'Автоматизация и Скрипты');
  assert.ok(autoEntries.length >= 16, `Expected >= 16 entries in Автоматизация и Скрипты, got ${autoEntries.length}`);

  const requiredAutomationTopics = [
    /strict mode|pipefail/i,
    /getopts|parameter expansion|batchmode/i,
    /posix|\/bin\/sh|dash|zsh|fish|shellcheck|expect/i,
    /powershell 7|pwsh|invoke-restmethod|register-scheduledtask/i,
    /start-transcript|export-clixml|dpapi/i,
    /delayedexpansion|for \/f|errorlevel|%~dp0/i,
    /robocopy|forfiles|msiexec/i,
    /venv|pathlib|subprocess|shutil|argparse/i,
    /psutil|requests|paramiko|netmiko/i,
  ];

  for (const pattern of requiredAutomationTopics) {
    assert.ok(
      autoEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `Автоматизация и Скрипты section must cover pattern ${pattern}`
    );
  }
});

test('1C Enterprise section covers brief intro, 1C Accounting, other 1C apps, licensing, extensions, updates, and integrations', () => {
  const onecEntries = INITIAL_KNOWLEDGE_ENTRIES.filter((e) => e.section === '1С:Предприятие');
  assert.ok(onecEntries.length >= 12, `Expected >= 12 entries in 1С:Предприятие, got ${onecEntries.length}`);

  const requiredOnecTopics = [
    /ragent|rmngr|rphost/i,
    /1cv8\.1cd|chdbfl/i,
    /default\.vrd|webinst/i,
    /postgresql|postgrespro|vacuum/i,
    /rac|ras|технологический журнал/i,
    /платформа|конфигурация|7\.7|8\.3|такси|тонкий клиент/i,
    /1с:бухгалтерия|бп 3\.0|осно|усн|1с-отчётность|бгу/i,
    /зуп|ут 11|унф|розница|erp|документооборот|фреш/i,
    /hasp|nethasp|итс|лиценз|пин-код/i,
    /метаданных|расширения|\.cfe|\.epf|скд/i,
    /конфигуратор|\.cfu|\.dt|тии|updatedbcfg/i,
    /риб|enterprisedata|odata|54-фз|честный знак/i,
  ];

  for (const pattern of requiredOnecTopics) {
    assert.ok(
      onecEntries.some((e) => pattern.test(`${e.title} ${e.description} ${e.commandsOrConfig || ''} ${e.tags.join(' ')}`)),
      `1С:Предприятие section must cover pattern ${pattern}`
    );
  }
});





