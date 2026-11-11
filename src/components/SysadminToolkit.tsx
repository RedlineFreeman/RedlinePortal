import React, { useState } from 'react';
import { calculateSubnet, calculateRaid } from '../utils/calculator';
import {
  Wrench,
  Network,
  HardDrive,
  Shield,
  Copy,
  Check,
  Download,
  Info,
  Server,
  Terminal,
} from 'lucide-react';

export const SysadminToolkit: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'subnet' | 'raid' | 'generator'>('subnet');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Subnet state
  const [ipInput, setIpInput] = useState<string>('192.168.10.50');
  const [cidrInput, setCidrInput] = useState<number>(24);

  // RAID state
  const [raidType, setRaidType] = useState<'RAID 0' | 'RAID 1' | 'RAID 5' | 'RAID 6' | 'RAID 10'>('RAID 5');
  const [diskCount, setDiskCount] = useState<number>(4);
  const [diskSizeGb, setDiskSizeGb] = useState<number>(2000); // 2TB

  // Config generator state
  const [serverDomain, setServerDomain] = useState<string>('app.company.internal');
  const [sshPort, setSshPort] = useState<number>(2222);

  const subnetResult = calculateSubnet(ipInput, cidrInput);
  const raidResult = calculateRaid(raidType, diskCount, diskSizeGb);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const hardenedNginxConfig = `# Hardened Nginx SSL Configuration for ${serverDomain}
# Security Rating: A+ (SSLLabs)

upstream backend_nodes {
    least_conn;
    server 127.0.0.1:8080 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8081 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

# Redirect all HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name ${serverDomain};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${serverDomain};

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/${serverDomain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${serverDomain}/privkey.pem;

    # TLS Protocols & Ciphers (Modern TLS 1.2 & 1.3 only)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;

    # Security Headers (OWASP Top 10)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Buffer Limits against DoS
    client_body_buffer_size 128k;
    client_max_body_size 50M;

    location / {
        proxy_pass http://backend_nodes;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_next_upstream error timeout http_502 http_503;
    }
}`;

  const hardenedSshConfig = `# CIS Benchmark Hardened sshd_config
Port ${sshPort}
Protocol 2
AddressFamily inet
ListenAddress 0.0.0.0

# Authentication & Keys
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no
AuthenticationMethods publickey

# Modern Secure HostKey Algorithms (Ed25519 & RSA 4096)
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key

# Cryptographic Ciphers & MACs (Post-Quantum Ready)
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com

# Session Controls & Idle Timeout (Disconnect after 5 min)
ClientAliveInterval 300
ClientAliveCountMax 2
MaxAuthTries 3
MaxSessions 5
LoginGraceTime 30
X11Forwarding no
AllowTcpForwarding no
LogLevel VERBOSE`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
            <Wrench className="w-3.5 h-3.5" />
            Инженерные калькуляторы и генераторы
          </div>
          <h2 className="text-2xl font-extrabold text-white">Инструменты Системного Администратора</h2>
          <p className="text-sm text-slate-300">
            Расчет масок подсетей IPv4/CIDR, калькулятор полезной емкости и отказоустойчивости RAID,
            генератор защищенных конфигов Nginx и SSH.
          </p>
        </div>

        {/* Tool Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTool('subnet')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTool === 'subnet'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>IPv4 Подсети</span>
          </button>
          <button
            onClick={() => setActiveTool('raid')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTool === 'raid'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>RAID Массивы</span>
          </button>
          <button
            onClick={() => setActiveTool('generator')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTool === 'generator'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Генератор Конфигов</span>
          </button>
        </div>
      </div>

      {/* SUBNET CALCULATOR */}
      {activeTool === 'subnet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              Параметры IPv4 адреса
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">IPv4 Адрес хоста:</label>
                <input
                  type="text"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
                  placeholder="192.168.1.1"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-400">Префикс подсети (CIDR):</label>
                  <span className="font-mono font-bold text-cyan-400">/{cidrInput}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={cidrInput}
                  onChange={(e) => setCidrInput(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-2">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">
                  Часто используемые маски:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[30, 29, 28, 27, 26, 24, 23, 16, 8].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCidrInput(c)}
                      className={`px-2 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        cidrInput === c
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      /{c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Результаты расчета подсети:
            </h3>

            {subnetResult ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Адрес сети (Network)</span>
                  <div className="font-mono text-xs font-bold text-cyan-300">
                    {subnetResult.networkAddress}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Широковещательный (Broadcast)</span>
                  <div className="font-mono text-xs font-bold text-cyan-300">
                    {subnetResult.broadcastAddress}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Маска (Netmask)</span>
                  <div className="font-mono text-xs font-bold text-white">
                    {subnetResult.netmask}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Первый доступный хост</span>
                  <div className="font-mono text-xs font-bold text-emerald-400">
                    {subnetResult.firstUsableIp}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Последний доступный хост</span>
                  <div className="font-mono text-xs font-bold text-emerald-400">
                    {subnetResult.lastUsableIp}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Количество хостов</span>
                  <div className="font-mono text-xs font-extrabold text-cyan-400">
                    {subnetResult.totalUsableHosts.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Wildcard Маска</span>
                  <div className="font-mono text-xs text-slate-300">{subnetResult.wildcard}</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Класс IP</span>
                  <div className="font-mono text-xs text-slate-300">{subnetResult.ipClass}</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase">Тип IP (RFC 1918)</span>
                  <div
                    className={`font-mono text-xs font-bold ${
                      subnetResult.isPrivate ? 'text-amber-400' : 'text-blue-400'
                    }`}
                  >
                    {subnetResult.isPrivate ? 'Private (Серый)' : 'Public (Белый)'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-rose-400 p-4 bg-rose-500/10 rounded-lg border border-rose-500/20">
                Неверный формат IPv4 адреса. Введите корректный адрес, например 192.168.1.1.
              </div>
            )}
          </div>
        </div>
      )}

      {/* RAID CALCULATOR */}
      {activeTool === 'raid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              Конфигурация дискового массива
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1.5">Тип RAID массива:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['RAID 0', 'RAID 1', 'RAID 5', 'RAID 6', 'RAID 10'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRaidType(r)}
                      className={`p-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                        raidType === r
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-400">Количество дисков:</label>
                  <span className="font-mono font-bold text-cyan-400">{diskCount} шт.</span>
                </div>
                <input
                  type="range"
                  min={raidType === 'RAID 6' ? 4 : raidType === 'RAID 5' ? 3 : raidType === 'RAID 10' ? 4 : 2}
                  max="16"
                  value={diskCount}
                  onChange={(e) => setDiskCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5">Объем одного диска:</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: '500 GB', val: 500 },
                    { label: '1 TB', val: 1000 },
                    { label: '2 TB', val: 2000 },
                    { label: '4 TB', val: 4000 },
                    { label: '8 TB', val: 8000 },
                    { label: '12 TB', val: 12000 },
                    { label: '16 TB', val: 16000 },
                    { label: '20 TB', val: 20000 },
                  ].map((d) => (
                    <button
                      key={d.val}
                      onClick={() => setDiskSizeGb(d.val)}
                      className={`py-1.5 px-2 rounded text-xs font-mono transition-colors cursor-pointer ${
                        diskSizeGb === d.val
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Характеристики массива {raidType}:
            </h3>

            {/* Visual Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Эффективность хранения:</span>
                <span className="font-bold text-white">{raidResult.efficiencyPercent}%</span>
              </div>
              <div className="h-4 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${raidResult.efficiencyPercent}%` }}
                  title="Полезные данные"
                />
                <div
                  className="bg-rose-500/80 h-full"
                  style={{ width: `${100 - raidResult.efficiencyPercent}%` }}
                  title="Четность / Зеркалирование"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Полезный объем: {(raidResult.usableCapacityGb / 1000).toFixed(1)} TB
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Оверхед (Parity/Mirror):{' '}
                  {((raidResult.rawCapacityGb - raidResult.usableCapacityGb) / 1000).toFixed(1)} TB
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-500 uppercase">Отказоустойчивость</span>
                <div className="font-mono text-sm font-extrabold text-amber-400">
                  {raidResult.faultToleranceDisks} диск(а)
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-500 uppercase">Скорость чтения</span>
                <div className="font-mono text-sm font-extrabold text-cyan-400">
                  {raidResult.readSpeedMultiplier}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-[10px] text-slate-500 uppercase">Скорость записи</span>
                <div className="font-mono text-xs font-bold text-slate-300">
                  {raidResult.writeSpeedMultiplier}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
              <div>
                <strong className="text-emerald-400">Плюсы:</strong> {raidResult.pros.join(', ')}
              </div>
              <div>
                <strong className="text-rose-400">Минусы:</strong> {raidResult.cons.join(', ')}
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-400 text-[11px]">
                <strong className="text-white">Рекомендация:</strong> {raidResult.recommendation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIG GENERATOR */}
      {activeTool === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              Параметры безопасности
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Домен сайта (FQDN):</label>
                <input
                  type="text"
                  value={serverDomain}
                  onChange={(e) => setServerDomain(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Нестандартный SSH порт:</label>
                <input
                  type="number"
                  value={sshPort}
                  onChange={(e) => setSshPort(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Nginx Card */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    /etc/nginx/sites-available/{serverDomain}.conf
                  </span>
                  <p className="text-[11px] text-slate-400">
                    SSL A+ (HSTS, TLS 1.3, CSP, Least_conn balancing)
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(hardenedNginxConfig, 'nginx-conf')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedKey === 'nginx-conf' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === 'nginx-conf' ? 'Скопировано' : 'Копировать'}</span>
                </button>
              </div>
              <pre className="p-4 font-mono text-[11px] text-slate-200 overflow-x-auto bg-slate-950/40 leading-relaxed max-h-[300px]">
                {hardenedNginxConfig}
              </pre>
            </div>

            {/* SSH Card */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    /etc/ssh/sshd_config.d/99-hardening.conf
                  </span>
                  <p className="text-[11px] text-slate-400">
                    CIS Benchmark (Ed25519 only, no passwords, no root, idle timeout)
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(hardenedSshConfig, 'ssh-conf')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border border-slate-700"
                >
                  {copiedKey === 'ssh-conf' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === 'ssh-conf' ? 'Скопировано' : 'Копировать'}</span>
                </button>
              </div>
              <pre className="p-4 font-mono text-[11px] text-slate-200 overflow-x-auto bg-slate-950/40 leading-relaxed max-h-[260px]">
                {hardenedSshConfig}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
