/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Server,
  Download,
  Copy,
  Check,
  FileCode,
  ShieldCheck,
  Terminal,
  Cpu,
  HardDrive,
  Globe,
  ExternalLink,
  Layers,
  Sparkles,
  BookOpen,
  ArrowRight,
  Archive,
} from 'lucide-react';
import {
  DOCKERFILE_CONTENT,
  DOCKER_COMPOSE_CONTENT,
  NGINX_CONF_CONTENT,
  SYSTEMD_SERVICE_CONTENT,
  DEPLOY_SH_CONTENT,
  VPS_DEPLOY_README_CONTENT,
  generateOfflineHandbookHtml,
} from '../utils/vpsPackageExporter';
import { exportTechCatalogToExcel, exportTechCatalogToCsv } from '../utils/excelExporter';
import { TECH_CATALOG } from '../data/techCatalogData';

export const VpsDeploymentView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'docker' | 'nginx' | 'local' | 'security'>('docker');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadSingleFile = (filename: string, content: string, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullZip = async () => {
    try {
      setIsZipping(true);
      const zip = new JSZip();

      // Add deployment configs
      zip.file('Dockerfile', DOCKERFILE_CONTENT);
      zip.file('docker-compose.yml', DOCKER_COMPOSE_CONTENT);
      zip.file('nginx.conf', NGINX_CONF_CONTENT);
      zip.file('deploy.sh', DEPLOY_SH_CONTENT);
      zip.file('sysadmin-pro.service', SYSTEMD_SERVICE_CONTENT);
      zip.file('README-VPS.md', VPS_DEPLOY_README_CONTENT);
      zip.file('OFFLINE_SYSLAB.html', generateOfflineHandbookHtml());
      zip.file('ALL_TECHS_AND_TOOLS.csv', exportTechCatalogToCsv(TECH_CATALOG));

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sysadmin-pro-vps-bundle.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip:', err);
      alert('Не удалось сформировать ZIP архив. Попробуйте скачать отдельные файлы.');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Server className="w-3.5 h-3.5" />
              <span>Собственный сервер & Офлайн режим</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Развертывание на личном VPS & Скачивание для офлайна
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Вы можете запустить эту интерактивную платформу <strong className="text-cyan-300">на любом личном виртуальном сервере (VPS)</strong> под управлением Ubuntu/Debian, в закрытой корпоративной сети или изучать автономно на домашнем компьютере без интернета.
            </p>
          </div>

          {/* Big Action Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleDownloadFullZip}
              disabled={isZipping}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <Archive className="w-5 h-5" />
              <span>{isZipping ? 'Упаковка ZIP...' : 'Скачать весь проект (ZIP для VPS)'}</span>
            </button>
            <button
              onClick={() => handleDownloadSingleFile('OFFLINE_SYSLAB.html', generateOfflineHandbookHtml(), 'text/html')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Скачать Offline Handbook (HTML)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Download Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-5 space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              VPS / VDS
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Конфигурации для VPS</h3>
            <p className="text-xs text-slate-400 mt-1">
              Dockerfile, docker-compose.yml, nginx.conf, systemd юнит и скрипт деплоя в 1 команду.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Включает скрипт deploy.sh</span>
            <button
              onClick={handleDownloadFullZip}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Скачать ZIP</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-5 space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Без сети / Offline
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Автономный HTML</h3>
            <p className="text-xs text-slate-400 mt-1">
              Один файл со всеми 10 этапами, командами и шпаргалками. Открывается двойным кликом на любом ПК.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Вес ~25 КБ, без зависимостей</span>
            <button
              onClick={() => handleDownloadSingleFile('OFFLINE_SYSLAB.html', generateOfflineHandbookHtml(), 'text/html')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Скачать .html</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-xl p-5 space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileCode className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Таблицы & Данные
            </span>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">База софта (Excel / CSV)</h3>
            <p className="text-xs text-slate-400 mt-1">
              78 инструментов и технологий для Windows, Linux, macOS и FreeBSD с матрицей соответствия.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3 justify-end">
            <button
              onClick={() => exportTechCatalogToExcel(TECH_CATALOG)}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Excel (.xlsx)</span>
              <Download className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => {
                const csv = exportTechCatalogToCsv(TECH_CATALOG);
                handleDownloadSingleFile('Full_IT_Base_417_Technologies.csv', csv, 'text/csv');
              }}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>CSV</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Deployment Modes & Guides */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Sub-tabs header */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('docker')}
            className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
              activeSubTab === 'docker'
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1. Docker Compose на VPS (Рекомендуется)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('nginx')}
            className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
              activeSubTab === 'nginx'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>2. Чистый Nginx (Без Docker, 64 MB RAM)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('local')}
            className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
              activeSubTab === 'local'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>3. Локально на своем ПК (Dev / Source)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('security')}
            className={`flex items-center gap-2 px-5 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
              activeSubTab === 'security'
                ? 'border-purple-400 text-purple-300 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. Безопасность VPS & SSL Certbot</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-6">
          {/* TAB 1: DOCKER COMPOSE */}
          {activeSubTab === 'docker' && (
            <div className="space-y-6">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black">
                    1
                  </span>
                  Быстрый запуск в 3 команды на любом VPS (Ubuntu 22.04 / 24.04 / Debian 12):
                </h4>
                <div className="mt-3 relative group">
                  <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto">
{`# 1. Создаем каталог приложения
mkdir -p /opt/sysadmin-pro && cd /opt/sysadmin-pro

# 2. Распаковываем сюда скачанный архив и запускаем автодеплой:
chmod +x deploy.sh
sudo ./deploy.sh`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'quick-docker',
                        `mkdir -p /opt/sysadmin-pro && cd /opt/sysadmin-pro\nchmod +x deploy.sh\nsudo ./deploy.sh`
                      )
                    }
                    className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'quick-docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'quick-docker' ? 'Скопировано!' : 'Копировать'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Скрипт сам установит официальный Docker Engine, Docker Compose plugin, настроит фаервол UFW и запустит контейнер с автоперезапуском при ребуте VPS!
                </p>
              </div>

              {/* Code Views for Dockerfile & Compose */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* docker-compose.yml */}
                <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                      <FileCode className="w-4 h-4 text-cyan-400" />
                      <span>docker-compose.yml</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard('compose', DOCKER_COMPOSE_CONTENT)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Копировать"
                      >
                        {copiedKey === 'compose' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleDownloadSingleFile('docker-compose.yml', DOCKER_COMPOSE_CONTENT, 'text/yaml')}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Скачать файл"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-72">
                    {DOCKER_COMPOSE_CONTENT}
                  </pre>
                </div>

                {/* Dockerfile */}
                <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                      <FileCode className="w-4 h-4 text-cyan-400" />
                      <span>Dockerfile (Multi-Stage Build)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard('dockerfile', DOCKERFILE_CONTENT)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Копировать"
                      >
                        {copiedKey === 'dockerfile' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleDownloadSingleFile('Dockerfile', DOCKERFILE_CONTENT, 'text/plain')}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Скачать файл"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-72">
                    {DOCKERFILE_CONTENT}
                  </pre>
                </div>
              </div>

              {/* Useful docker commands */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
                <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Полезные команды управления контейнером:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-cyan-400">docker compose ps</span>
                    <span className="text-slate-500 font-sans text-[11px]">Статус контейнеров</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-cyan-400">docker compose logs -f</span>
                    <span className="text-slate-500 font-sans text-[11px]">Живые логи сервиса</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-cyan-400">docker compose restart</span>
                    <span className="text-slate-500 font-sans text-[11px]">Перезапуск приложения</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-cyan-400">docker compose down</span>
                    <span className="text-slate-500 font-sans text-[11px]">Корректная остановка</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NGINX NATIVE */}
          {activeSubTab === 'nginx' && (
            <div className="space-y-6">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-xs text-emerald-200">
                💡 <strong>Самый экономичный способ:</strong> Не требует Docker и потребляет менее 64 МБ оперативной памяти. Подходит даже для VPS с 512 МБ RAM.
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Инструкция по развертыванию на Nginx:</h4>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 relative group">
                    <p className="text-slate-400 mb-1.5 font-semibold">1. Установка Node.js 22 и веб-сервера Nginx:</p>
                    <pre className="font-mono text-emerald-400 whitespace-pre overflow-x-auto">
{`sudo apt update && sudo apt install -y curl nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'nginx-step1',
                          'sudo apt update && sudo apt install -y curl nginx\ncurl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -\nsudo apt install -y nodejs'
                        )
                      }
                      className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'nginx-step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 relative group">
                    <p className="text-slate-400 mb-1.5 font-semibold">2. Сборка статических файлов проекта:</p>
                    <pre className="font-mono text-emerald-400 whitespace-pre overflow-x-auto">
{`cd /opt/sysadmin-pro
npm install
npm run build`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard('nginx-step2', 'cd /opt/sysadmin-pro\nnpm install\nnpm run build')
                      }
                      className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'nginx-step2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 relative group">
                    <p className="text-slate-400 mb-1.5 font-semibold">3. Публикация в каталог веб-сервера:</p>
                    <pre className="font-mono text-emerald-400 whitespace-pre overflow-x-auto">
{`sudo cp -r dist/* /var/www/html/
sudo cp nginx.conf /etc/nginx/sites-available/sysadmin-pro
sudo ln -sf /etc/nginx/sites-available/sysadmin-pro /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'nginx-step3',
                          'sudo cp -r dist/* /var/www/html/\nsudo cp nginx.conf /etc/nginx/sites-available/sysadmin-pro\nsudo ln -sf /etc/nginx/sites-available/sysadmin-pro /etc/nginx/sites-enabled/\nsudo rm -f /etc/nginx/sites-enabled/default\nsudo nginx -t && sudo systemctl reload nginx'
                        )
                      }
                      className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedKey === 'nginx-step3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Nginx Conf viewer */}
              <div className="border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                    <FileCode className="w-4 h-4" />
                    <span>nginx.conf (Gzip + Security Headers + SPA routing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard('nginx-conf', NGINX_CONF_CONTENT)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Копировать"
                    >
                      {copiedKey === 'nginx-conf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDownloadSingleFile('nginx.conf', NGINX_CONF_CONTENT, 'text/plain')}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Скачать файл"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-72">
                  {NGINX_CONF_CONTENT}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: LOCAL PC */}
          {activeSubTab === 'local' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Method A: Node.js Dev */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                    <Terminal className="w-4 h-4" />
                    <span>Вариант А: Запуск в режиме разработки (Node.js)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Если вы хотите менять код, добавлять новые модули или тестировать локально:
                  </p>
                  <pre className="bg-slate-900 p-3 rounded font-mono text-xs text-slate-300 overflow-x-auto">
{`# 1. Установите зависимости
npm install

# 2. Запустите dev сервер
npm run dev

# Сервер запустится на http://localhost:3000`}
                  </pre>
                </div>

                {/* Method B: Standalone HTML */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Вариант Б: Полный Офлайн без серверов (HTML)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Не требует установки Node.js, Git или Docker. Открывается в любом браузере двойным кликом мыши:
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleDownloadSingleFile('OFFLINE_SYSLAB.html', generateOfflineHandbookHtml(), 'text/html')}
                      className="w-full py-2.5 px-4 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Скачать OFFLINE_SYSLAB.html</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Instructions for Windows vs Linux */}
              <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/60 text-xs space-y-2">
                <h5 className="font-bold text-white">Требования к вашей локальной ОС:</h5>
                <ul className="list-disc pl-5 text-slate-400 space-y-1">
                  <li><strong>Windows 10/11:</strong> Node.js v20+ (LTS с официального сайта nodejs.org) либо WSL2 (Ubuntu).</li>
                  <li><strong>macOS (Apple Silicon M1/M2/M3 / Intel):</strong> Node.js через <code className="text-cyan-300">brew install node</code>.</li>
                  <li><strong>Linux (Ubuntu/Debian/Fedora/Arch):</strong> Стандартный пакет nodejs и npm.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & SSL */}
          {activeSubTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* SSL Certbot */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
                    <Globe className="w-4 h-4" />
                    <span>Бесплатный SSL (HTTPS) через Certbot</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Если вы привязали к VPS доменное имя (например <code className="text-cyan-300">sysadmin.example.com</code>):
                  </p>
                  <pre className="bg-slate-900 p-3 rounded font-mono text-xs text-purple-300 overflow-x-auto">
{`# 1. Установка утилиты Certbot
sudo apt install -y certbot python3-certbot-nginx

# 2. Выпуск сертификата Let's Encrypt
sudo certbot --nginx -d your-domain.com

# 3. Автопродление проверяется командой:
sudo certbot renew --dry-run`}
                  </pre>
                </div>

                {/* Firewall & SSH */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-rose-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Защита VPS (Фаервол UFW + SSH ключи)</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Обязательный чеклист для любого системного администратора при сдаче сервера:
                  </p>
                  <pre className="bg-slate-900 p-3 rounded font-mono text-xs text-rose-300 overflow-x-auto">
{`# 1. Настройка фаервола UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable

# 2. Установка Fail2ban против подбора паролей
sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban`}
                  </pre>
                </div>
              </div>

              {/* Hosting Recommendations */}
              <div className="border border-slate-800 rounded-xl p-5 bg-slate-950">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <span>Где арендовать недорогой VPS для практики и портфолио:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-white">Timeweb Cloud / Selectel</div>
                    <div className="text-slate-400 mt-1">Оплата картами РФ / СБП. Быстрый аптайм в Москве и СПб. Тарифы от ~180 руб/мес.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-white">Hetzner Cloud / DigitalOcean</div>
                    <div className="text-slate-400 mt-1">Международные локации (Германия, Финляндия, США). Высокая пропускная способность.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="font-bold text-white">Aeza / FirstVDS / Beget</div>
                    <div className="text-slate-400 mt-1">Бюджетные VDS с защитой от DDoS и посуточной оплатой для тестов (от 5 руб/день).</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
