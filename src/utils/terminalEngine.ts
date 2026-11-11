import { TroubleshootingMission } from '../types/sysadmin';

export interface TerminalState {
  currentDir: string;
  isRoot: boolean;
  files: Record<string, string>;
  services: Record<string, { status: 'running' | 'failed' | 'stopped'; logs: string[] }>;
  iptablesInputPolicy: 'ACCEPT' | 'DROP';
  iptablesAllowedPorts: number[];
  commandHistory: string[];
  activeMission: TroubleshootingMission | null;
  missionSolved: boolean;
}

export function createInitialTerminalState(mission?: TroubleshootingMission | null): TerminalState {
  const baseFiles: Record<string, string> = {
    '/etc/os-release': 'NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu',
    '/etc/resolv.conf': 'nameserver 8.8.8.8\nnameserver 1.1.1.1\noptions edns0 trust-ad',
    '/var/log/syslog': 'Oct 31 10:00:01 srv-node01 systemd[1]: Started Daily apt upgrade and clean activities.\nOct 31 10:15:22 srv-node01 sshd[1240]: Accepted publickey for sysadmin from 192.168.1.10 port 52140 ssh2: ED25519',
    '/etc/nginx/nginx.conf': 'user www-data;\nworker_processes auto;\npid /run/nginx.pid;\nevents { worker_connections 1024; }',
    '/home/sysadmin/notes.txt': 'TODO: проверить репликацию бэкапов в S3 и обновить ядро.',
  };

  const baseServices: Record<string, { status: 'running' | 'failed' | 'stopped'; logs: string[] }> = {
    ssh: { status: 'running', logs: ['Server listening on 0.0.0.0 port 22'] },
    nginx: { status: 'running', logs: ['nginx service active and listening'] },
    cron: { status: 'running', logs: ['cron daemon started'] },
    'systemd-resolved': { status: 'running', logs: ['systemd-resolved active'] },
  };

  if (mission) {
    return {
      currentDir: '/home/sysadmin',
      isRoot: false,
      files: { ...baseFiles, ...mission.initialState.files },
      services: { ...baseServices, ...mission.initialState.services },
      iptablesInputPolicy: mission.id === 'mission-ssh-firewall' ? 'DROP' : 'ACCEPT',
      iptablesAllowedPorts: mission.id === 'mission-ssh-firewall' ? [] : [22, 80, 443],
      commandHistory: [],
      activeMission: mission,
      missionSolved: false,
    };
  }

  return {
    currentDir: '/home/sysadmin',
    isRoot: false,
    files: baseFiles,
    services: baseServices,
    iptablesInputPolicy: 'ACCEPT',
    iptablesAllowedPorts: [22, 80, 443],
    commandHistory: [],
    activeMission: null,
    missionSolved: false,
  };
}

export interface ExecutionResult {
  output: string;
  nextState: TerminalState;
  missionJustSolved?: boolean;
}

export function executeCommand(cmdLine: string, state: TerminalState): ExecutionResult {
  const trimmed = cmdLine.trim();
  if (!trimmed) {
    return { output: '', nextState: state };
  }

  const nextState: TerminalState = {
    ...state,
    commandHistory: [...state.commandHistory, trimmed],
  };

  // Check sudo
  let effectiveCmd = trimmed;
  let isSudo = state.isRoot;
  if (effectiveCmd.startsWith('sudo ')) {
    isSudo = true;
    effectiveCmd = effectiveCmd.replace(/^sudo\s+/, '').trim();
  }

  const parts = effectiveCmd.split(/\s+/);
  const bin = parts[0];
  const args = parts.slice(1);

  // Command handlers
  switch (bin) {
    case 'help': {
      return {
        output: `Доступные команды Linux в симуляторе SysAdmin Pro:
  • Навигация и файлы: ls, cd, pwd, cat, head, tail, truncate, touch, rm, df, du
  • Процессы и ресурсы: ps, top, htop, uptime, free, kill
  • Службы systemd: systemctl (status, start, stop, restart, reload, list-units)
  • Логирование: journalctl -u <service> -n 20, tail -f /var/log/syslog
  • Сети и фаервол: ip (addr, route), ping, ss -tulpn, netstat, curl, iptables, dig
  • Контейнеры: docker (ps, logs, restart), docker compose (up -d, ps, logs)
  • Прочее: uname -a, whoami, clear, history, sudo, echo`,
        nextState,
      };
    }

    case 'pwd': {
      return { output: nextState.currentDir, nextState };
    }

    case 'whoami': {
      return { output: isSudo ? 'root' : 'sysadmin', nextState };
    }

    case 'uname': {
      return {
        output: 'Linux srv-node01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
        nextState,
      };
    }

    case 'uptime': {
      return {
        output: ' 10:42:15 up 42 days,  3:18,  2 users,  load average: 0.18, 0.24, 0.31',
        nextState,
      };
    }

    case 'free': {
      const isM = args.includes('-m');
      if (isM) {
        return {
          output: `               total        used        free      shared  buff/cache   available
Mem:           16000        4210        8900         210        2890       11580
Swap:           4096           0        4096`,
          nextState,
        };
      }
      return {
        output: `               total        used        free      shared  buff/cache   available
Mem:            16Gi       4.1Gi       8.7Gi       210Mi       2.8Gi        11Gi
Swap:          4.0Gi          0B       4.0Gi`,
        nextState,
      };
    }

    case 'df': {
      const isDiskFullMission =
        nextState.activeMission?.id === 'mission-disk-full' &&
        nextState.files['/var/log/debug_overflow.log'] &&
        nextState.files['/var/log/debug_overflow.log'].length > 0;

      if (isDiskFullMission) {
        return {
          output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   50G     0 100% /
tmpfs           7.8G     0  7.8G   0% /dev/shm
/dev/sdb1       200G   24G  166G  13% /mnt/data`,
          nextState,
        };
      }

      return {
        output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   14G   34G  30% /
tmpfs           7.8G     0  7.8G   0% /dev/shm
/dev/sdb1       200G   24G  166G  13% /mnt/data`,
        nextState,
      };
    }

    case 'du': {
      if (args.some((a) => a.includes('/var/log'))) {
        const hasBigLog =
          nextState.files['/var/log/debug_overflow.log'] &&
          nextState.files['/var/log/debug_overflow.log'].length > 0;
        if (hasBigLog) {
          return {
            output: `4.0K    /var/log/auth.log
4.0K    /var/log/nginx
36G     /var/log/debug_overflow.log
36G     /var/log`,
            nextState,
          };
        }
        return {
          output: `4.0K    /var/log/auth.log
4.0K    /var/log/nginx
120K    /var/log/syslog
128K    /var/log`,
          nextState,
        };
      }
      return {
        output: `4.0K    ./notes.txt\n8.0K    .`,
        nextState,
      };
    }

    case 'truncate': {
      // e.g. truncate -s 0 /var/log/debug_overflow.log
      const targetIdx = args.findIndex((a) => a.startsWith('/'));
      if (targetIdx !== -1) {
        const path = args[targetIdx];
        if (path in nextState.files) {
          nextState.files[path] = '';
          return checkMissionProgress('Диск освобожден (truncate выполнен)', nextState);
        }
      }
      return { output: 'truncate: missing file operand', nextState };
    }

    case 'ls': {
      const targetDir = args[args.length - 1]?.startsWith('/')
        ? args[args.length - 1]
        : nextState.currentDir;

      // Filter files matching prefix
      const prefix = targetDir.endsWith('/') ? targetDir : `${targetDir}/`;
      const matches = Object.keys(nextState.files)
        .filter((k) => k.startsWith(prefix))
        .map((k) => k.replace(prefix, '').split('/')[0]);

      const unique = Array.from(new Set(matches));
      if (unique.length === 0) {
        return { output: 'total 0', nextState };
      }
      return { output: unique.join('   '), nextState };
    }

    case 'cd': {
      const target = args[0] || '/home/sysadmin';
      if (target === '..') {
        const partsDir = nextState.currentDir.split('/').filter(Boolean);
        partsDir.pop();
        nextState.currentDir = '/' + partsDir.join('/');
        if (nextState.currentDir === '//') nextState.currentDir = '/';
        return { output: '', nextState };
      }
      if (target.startsWith('/')) {
        nextState.currentDir = target;
      } else {
        nextState.currentDir = `${nextState.currentDir}/${target}`.replace('//', '/');
      }
      return { output: '', nextState };
    }

    case 'cat': {
      const target = args[0];
      if (!target) return { output: 'cat: missing file operand', nextState };
      const resolved = target.startsWith('/') ? target : `${nextState.currentDir}/${target}`.replace('//', '/');
      if (resolved in nextState.files) {
        return { output: nextState.files[resolved], nextState };
      }
      return { output: `cat: ${target}: No such file or directory`, nextState };
    }

    case 'echo': {
      // Handle echo "nameserver 8.8.8.8" > /etc/resolv.conf
      const line = effectiveCmd.replace(/^echo\s+/, '');
      if (line.includes('>')) {
        const [contentPart, filePart] = line.split('>');
        const cleanContent = contentPart.trim().replace(/^["']|["']$/g, '');
        const cleanFile = filePart.trim();
        const resolved = cleanFile.startsWith('/')
          ? cleanFile
          : `${nextState.currentDir}/${cleanFile}`.replace('//', '/');

        nextState.files[resolved] = cleanContent;
        return checkMissionProgress(`Файл ${cleanFile} успешно записан`, nextState);
      }
      return { output: line.replace(/^["']|["']$/g, ''), nextState };
    }

    case 'systemctl': {
      const sub = args[0];
      const serviceName = args[1]?.replace('.service', '');

      if (sub === 'status') {
        if (!serviceName) {
          return { output: 'systemctl: missing service name', nextState };
        }
        const svc = nextState.services[serviceName];
        if (!svc) {
          return {
            output: `Unit ${serviceName}.service could not be found.`,
            nextState,
          };
        }
        const stateColor = svc.status === 'running' ? 'active (running)' : svc.status === 'failed' ? 'failed' : 'inactive (dead)';
        const logsStr = svc.logs.slice(-5).map((l) => `   ${l}`).join('\n');
        return {
          output: `● ${serviceName}.service
   Loaded: loaded (/etc/systemd/system/${serviceName}.service; enabled)
   Active: ${stateColor} since Sat 2026-10-31 10:00:00 UTC
   Main PID: 1245 (${serviceName})
   Tasks: 4 (limit: 4915)
   Memory: 45.2M
   CGroup: /system.slice/${serviceName}.service

${logsStr}`,
          nextState,
        };
      }

      if (sub === 'start' || sub === 'restart') {
        if (!serviceName) return { output: 'systemctl: missing service name', nextState };
        if (serviceName in nextState.services) {
          // If disk full mission and disk not yet cleared:
          if (
            nextState.activeMission?.id === 'mission-disk-full' &&
            serviceName === 'postgresql' &&
            nextState.files['/var/log/debug_overflow.log'] &&
            nextState.files['/var/log/debug_overflow.log'].length > 0
          ) {
            return {
              output: `Job for postgresql.service failed because no space left on device. See "systemctl status postgresql.service" and "journalctl -xeu postgresql.service" for details.`,
              nextState,
            };
          }

          nextState.services[serviceName] = {
            status: 'running',
            logs: [...nextState.services[serviceName].logs, `Started ${serviceName}.service`],
          };

          return checkMissionProgress(`Служба ${serviceName}.service перезапущена`, nextState);
        }
        return { output: `Unit ${serviceName}.service not found.`, nextState };
      }

      if (sub === 'stop') {
        if (serviceName && serviceName in nextState.services) {
          nextState.services[serviceName].status = 'stopped';
          return { output: `Stopped ${serviceName}.service`, nextState };
        }
      }

      if (sub === 'list-units') {
        const failed = Object.entries(nextState.services)
          .filter(([_, s]) => s.status === 'failed')
          .map(([name]) => `  ${name}.service loaded failed failed Application daemon`);
        if (failed.length === 0) {
          return { output: '0 loaded units listed.', nextState };
        }
        return {
          output: `UNIT LOAD ACTIVE SUB DESCRIPTION\n${failed.join('\n')}\n\nLOAD = Reflects whether the unit definition was properly loaded.\nACTIVE = The high-level unit activation state.\nSUB = The low-level unit activation state.`,
          nextState,
        };
      }

      return { output: 'systemctl: syntax: systemctl [status|start|restart|stop] <unit>', nextState };
    }

    case 'journalctl': {
      const uIndex = args.indexOf('-u');
      const serviceName = uIndex !== -1 ? args[uIndex + 1]?.replace('.service', '') : null;
      if (serviceName && nextState.services[serviceName]) {
        return {
          output: nextState.services[serviceName].logs.map((l) => `Oct 31 10:14:02 srv-node01 ${serviceName}[1245]: ${l}`).join('\n'),
          nextState,
        };
      }
      return {
        output: `-- Logs begin at Sat 2026-10-31 08:00:00 UTC, end at Sat 2026-10-31 10:45:00 UTC. --\nOct 31 10:00:01 srv-node01 systemd[1]: Started Daily apt activities.`,
        nextState,
      };
    }

    case 'curl': {
      const url = args.find((a) => a.startsWith('http://') || a.startsWith('https://')) || 'http://localhost';
      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        const isNginx502Mission = nextState.activeMission?.id === 'mission-nginx-502';
        if (isNginx502Mission) {
          const backendUp = nextState.services['app-backend']?.status === 'running';
          if (!backendUp) {
            return {
              output: `HTTP/1.1 502 Bad Gateway
Server: nginx/1.24.0 (Ubuntu)
Date: Sat, 31 Oct 2026 10:45:12 GMT
Content-Type: text/html
Content-Length: 157
Connection: keep-alive

<html>
<head><title>502 Bad Gateway</title></head>
<body><center><h1>502 Bad Gateway</h1></center></body>
</html>`,
              nextState,
            };
          } else {
            return checkMissionProgress(
              `HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
Date: Sat, 31 Oct 2026 10:45:15 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 1240
Connection: keep-alive

<!DOCTYPE html><html><h1>Welcome to Internal Corporate Portal! All services operational.</h1></html>`,
              nextState
            );
          }
        }
        return {
          output: `HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
Content-Type: text/html

<!DOCTYPE html><html><h1>Server is operational</h1></html>`,
          nextState,
        };
      }
      return { output: `curl: Connected to ${url}. Status: 200 OK`, nextState };
    }

    case 'ss':
    case 'netstat': {
      return {
        output: `Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
tcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*     users:(("sshd",pid=1120,fd=3))
tcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*     users:(("nginx",pid=1420,fd=6))
${nextState.services['app-backend']?.status === 'running' ? 'tcp   LISTEN 0      128        127.0.0.1:8080       0.0.0.0:*     users:(("python3",pid=1890,fd=4))' : ''}
${nextState.services['postgresql']?.status === 'running' ? 'tcp   LISTEN 0      244        127.0.0.1:5432       0.0.0.0:*     users:(("postgres",pid=1550,fd=5))' : ''}`,
        nextState,
      };
    }

    case 'ip': {
      if (args[0] === 'a' || args[0] === 'addr') {
        return {
          output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    inet 192.168.1.150/24 brd 192.168.1.255 scope global eth0
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0`,
          nextState,
        };
      }
      if (args[0] === 'route') {
        return {
          output: `default via 192.168.1.1 dev eth0 proto static onlink\n172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.150`,
          nextState,
        };
      }
      return { output: 'Usage: ip [addr|route]', nextState };
    }

    case 'ping': {
      const host = args[args.length - 1];
      if (host === '8.8.8.8' || host === '1.1.1.1' || host === '127.0.0.1') {
        return {
          output: `PING ${host} (${host}) 56(84) bytes of data.
64 bytes from ${host}: icmp_seq=1 ttl=118 time=12.4 ms
64 bytes from ${host}: icmp_seq=2 ttl=118 time=11.9 ms
--- ${host} ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms`,
          nextState,
        };
      }

      // Check DNS resolution
      const resolvConf = nextState.files['/etc/resolv.conf'] || '';
      const hasWorkingDns = resolvConf.includes('8.8.8.8') || resolvConf.includes('1.1.1.1');

      if (!hasWorkingDns && nextState.activeMission?.id === 'mission-dns-resolver') {
        return {
          output: `ping: ${host}: Temporary failure in name resolution`,
          nextState,
        };
      }

      return checkMissionProgress(
        `PING ${host} (142.250.74.206) 56(84) bytes of data.
64 bytes from lhr48s27-in-f14.1e100.net (142.250.74.206): icmp_seq=1 ttl=116 time=14.1 ms
--- ${host} ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms`,
        nextState
      );
    }

    case 'iptables': {
      // Check for adding port 22 or switching policy
      const fullCmd = effectiveCmd;
      if (fullCmd.includes('-A INPUT') && fullCmd.includes('22')) {
        nextState.iptablesAllowedPorts.push(22);
        return checkMissionProgress('Rule added: ACCEPT tcp dport 22', nextState);
      }
      if (fullCmd.includes('-P INPUT ACCEPT')) {
        nextState.iptablesInputPolicy = 'ACCEPT';
        return checkMissionProgress('Default INPUT policy set to ACCEPT', nextState);
      }
      if (fullCmd.includes('-L')) {
        const policy = nextState.iptablesInputPolicy;
        const port22Allowed = nextState.iptablesAllowedPorts.includes(22);
        return {
          output: `Chain INPUT (policy ${policy})
target     prot opt source               destination
${port22Allowed ? 'ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:22' : ''}
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED

Chain FORWARD (policy DROP)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination`,
          nextState,
        };
      }
      return { output: 'iptables rule updated', nextState };
    }

    case 'docker': {
      if (args[0] === 'ps') {
        const isCrashing =
          nextState.activeMission?.id === 'mission-docker-crashloop' &&
          !nextState.files['/app/docker-compose.yml']?.includes('DB_PORT: 5432');

        if (isCrashing) {
          return {
            output: `CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS                         PORTS                    NAMES
a1b2c3d4e5f6   postgres:16           "docker-entrypoint.s…"   2 hours ago     Up 2 hours                     0.0.0.0:5432->5432/tcp   docker-db
9f8e7d6c5b4a   node-backend:latest   "node server.js"         10 minutes ago  Restarting (1) 3 seconds ago                            docker-web-app`,
            nextState,
          };
        }
        return {
          output: `CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                    NAMES
a1b2c3d4e5f6   postgres:16           "docker-entrypoint.s…"   2 hours ago     Up 2 hours     0.0.0.0:5432->5432/tcp   docker-db
9f8e7d6c5b4a   node-backend:latest   "node server.js"         2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp   docker-web-app`,
          nextState,
        };
      }

      if (args[0] === 'compose' && args[1] === 'up') {
        return checkMissionProgress(
          `[+] Running 2/2
 ✔ Container docker-db       Running
 ✔ Container docker-web-app  Started`,
          nextState
        );
      }

      if (args[0] === 'logs') {
        const isCrashing =
          nextState.activeMission?.id === 'mission-docker-crashloop' &&
          !nextState.files['/app/docker-compose.yml']?.includes('DB_PORT: 5432');

        if (isCrashing) {
          return {
            output: `Attempting connection to db:5433...
ECONNREFUSED: Connection refused to db:5433
Fatal: cannot start server without database connection. Retrying...`,
            nextState,
          };
        }
        return {
          output: `Connected to PostgreSQL on port 5432.
Database schema verified.
Server listening on http://0.0.0.0:3000`,
          nextState,
        };
      }

      return { output: 'docker [ps|logs|compose]', nextState };
    }

    case 'sed': {
      // Handle sed replace e.g. sed -i 's/5433/5432/' /app/docker-compose.yml
      const target = args[args.length - 1];
      if (target in nextState.files) {
        nextState.files[target] = nextState.files[target].replace('5433', '5432').replace('192.0.2.99', '8.8.8.8');
        return checkMissionProgress(`File ${target} updated`, nextState);
      }
      return { output: 'sed: executed', nextState };
    }

    case 'clear': {
      return { output: '__CLEAR__', nextState };
    }

    default: {
      return {
        output: `bash: ${bin}: command not found. Введите 'help' для просмотра доступных команд.`,
        nextState,
      };
    }
  }
}

function checkMissionProgress(message: string, state: TerminalState): ExecutionResult {
  const mission = state.activeMission;
  if (!mission || state.missionSolved) {
    return { output: message, nextState: state };
  }

  let solved = false;

  if (mission.id === 'mission-nginx-502') {
    if (state.services['app-backend']?.status === 'running') {
      solved = true;
    }
  } else if (mission.id === 'mission-disk-full') {
    const logFile = state.files['/var/log/debug_overflow.log'];
    const pgRunning = state.services['postgresql']?.status === 'running';
    if (logFile === '' && pgRunning) {
      solved = true;
    }
  } else if (mission.id === 'mission-ssh-firewall') {
    if (state.iptablesInputPolicy === 'ACCEPT' || state.iptablesAllowedPorts.includes(22)) {
      solved = true;
    }
  } else if (mission.id === 'mission-dns-resolver') {
    const resolvConf = state.files['/etc/resolv.conf'] || '';
    if (resolvConf.includes('8.8.8.8') || resolvConf.includes('1.1.1.1')) {
      solved = true;
    }
  } else if (mission.id === 'mission-docker-crashloop') {
    const composeContent = state.files['/app/docker-compose.yml'] || '';
    if (composeContent.includes('DB_PORT: 5432')) {
      solved = true;
    }
  }

  if (solved) {
    const updatedState: TerminalState = {
      ...state,
      missionSolved: true,
    };
    return {
      output: `${message}\n\n🏆 [СИСТЕМА]: ИНЦИДЕНТ УСПЕШНО РЕШЕН!\n${mission.title} — статус восстановлен в зеленую зону (Healthy). Запись добавлена в ваше портфолио в раздел Incident Response!`,
      nextState: updatedState,
      missionJustSolved: true,
    };
  }

  return { output: message, nextState: state };
}
