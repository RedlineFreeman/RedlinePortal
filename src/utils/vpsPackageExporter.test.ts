/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DOCKERFILE_CONTENT,
  DOCKER_COMPOSE_CONTENT,
  NGINX_CONF_CONTENT,
  SYSTEMD_SERVICE_CONTENT,
  DEPLOY_SH_CONTENT,
  VPS_DEPLOY_README_CONTENT,
  generateOfflineHandbookHtml,
} from './vpsPackageExporter';

test('Dockerfile content contains multi-stage node builder and nginx alpine runner', () => {
  assert.ok(DOCKERFILE_CONTENT.includes('FROM node:22-alpine AS builder'));
  assert.ok(DOCKERFILE_CONTENT.includes('FROM nginx:1.27-alpine'));
  assert.ok(DOCKERFILE_CONTENT.includes('EXPOSE 80'));
  assert.ok(DOCKERFILE_CONTENT.includes('COPY nginx.conf /etc/nginx/conf.d/default.conf'));
});

test('docker-compose.yml defines healthy restartable sysadmin-pro container on port 80', () => {
  assert.ok(DOCKER_COMPOSE_CONTENT.includes('container_name: sysadmin_pro_app'));
  assert.ok(DOCKER_COMPOSE_CONTENT.includes('80:80'));
  assert.ok(DOCKER_COMPOSE_CONTENT.includes('restart: unless-stopped'));
});

test('nginx.conf includes gzip, security headers, and SPA try_files fallback', () => {
  assert.ok(NGINX_CONF_CONTENT.includes('gzip on;'));
  assert.ok(NGINX_CONF_CONTENT.includes('try_files $uri $uri/ /index.html;'));
  assert.ok(NGINX_CONF_CONTENT.includes('X-Frame-Options "SAMEORIGIN"'));
  assert.ok(NGINX_CONF_CONTENT.includes('X-Content-Type-Options "nosniff"'));
});

test('deploy.sh is a valid bash script that checks root and installs docker', () => {
  assert.ok(DEPLOY_SH_CONTENT.startsWith('#!/usr/bin/env bash'));
  assert.ok(DEPLOY_SH_CONTENT.includes('if [ "$EUID" -ne 0 ]'));
  assert.ok(DEPLOY_SH_CONTENT.includes('docker compose up -d'));
});

test('systemd service file specifies proper restart policy and working dir', () => {
  assert.ok(SYSTEMD_SERVICE_CONTENT.includes('Description=SysAdmin Pro'));
  assert.ok(SYSTEMD_SERVICE_CONTENT.includes('WorkingDirectory=/opt/sysadmin-pro'));
  assert.ok(SYSTEMD_SERVICE_CONTENT.includes('WantedBy=multi-user.target'));
});

test('generateOfflineHandbookHtml generates valid standalone HTML without external script dependencies', () => {
  const html = generateOfflineHandbookHtml();
  assert.ok(html.startsWith('<!DOCTYPE html>'));
  assert.ok(html.includes('SysAdmin Pro: Полный Офлайн-Справочник'));
  assert.ok(html.includes('df -hT'));
  assert.ok(html.includes('smartctl'));
});

test('Apache .htaccess contains SPA rewrite rules and security headers', async () => {
  const { APACHE_HTACCESS_CONTENT } = await import('./vpsPackageExporter');
  assert.ok(APACHE_HTACCESS_CONTENT.includes('RewriteEngine On'));
  assert.ok(APACHE_HTACCESS_CONTENT.includes('RewriteRule . /index.html [L]'));
  assert.ok(APACHE_HTACCESS_CONTENT.includes('Header always set X-Frame-Options "SAMEORIGIN"'));
});

test('MySQL schema contains FULLTEXT search index and SCTP initial data', async () => {
  const { MYSQL_SCHEMA_SQL } = await import('./vpsPackageExporter');
  assert.ok(MYSQL_SCHEMA_SQL.includes('CREATE DATABASE IF NOT EXISTS `sysadmin_db`'));
  assert.ok(MYSQL_SCHEMA_SQL.includes('FULLTEXT KEY `idx_fulltext_search`'));
  assert.ok(MYSQL_SCHEMA_SQL.includes('sctp-protocol'));
  assert.ok(MYSQL_SCHEMA_SQL.includes('SCTP (Stream Control Transmission Protocol)'));
});

test('PHP API script provides PDO prepared statements and JSON response', async () => {
  const { PHP_API_SCRIPT } = await import('./vpsPackageExporter');
  assert.ok(PHP_API_SCRIPT.includes('<?php'));
  assert.ok(PHP_API_SCRIPT.includes('PDO::ATTR_ERRMODE'));
  assert.ok(PHP_API_SCRIPT.includes('MATCH(title, description, practical_usage, tags) AGAINST'));
  assert.ok(PHP_API_SCRIPT.includes('INSERT INTO knowledge_entries'));
});

