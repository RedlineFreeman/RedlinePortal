import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ipToInt,
  intToIp,
  calculateSubnet,
  calculateRaid,
  generatePortfolioMasterReadme,
  generateResumeMarkdown,
} from './calculator';
import { RoadmapStep } from '../types/sysadmin';

test('ipToInt and intToIp conversions are invertible', () => {
  const ips = ['192.168.1.1', '10.0.0.1', '172.16.254.1', '255.255.255.0'];
  for (const ip of ips) {
    const intVal = ipToInt(ip);
    const backToIp = intToIp(intVal);
    assert.equal(backToIp, ip, `Failed for IP ${ip}`);
  }
});

test('calculateSubnet handles standard /24 subnet correctly', () => {
  const result = calculateSubnet('192.168.1.55', 24);
  assert.ok(result !== null);
  assert.equal(result.netmask, '255.255.255.0');
  assert.equal(result.networkAddress, '192.168.1.0');
  assert.equal(result.broadcastAddress, '192.168.1.255');
  assert.equal(result.firstUsableIp, '192.168.1.1');
  assert.equal(result.lastUsableIp, '192.168.1.254');
  assert.equal(result.totalUsableHosts, 254);
  assert.equal(result.isPrivate, true);
});

test('calculateSubnet handles point-to-point /30 subnet', () => {
  const result = calculateSubnet('10.10.10.1', 30);
  assert.ok(result !== null);
  assert.equal(result.netmask, '255.255.255.252');
  assert.equal(result.networkAddress, '10.10.10.0');
  assert.equal(result.broadcastAddress, '10.10.10.3');
  assert.equal(result.firstUsableIp, '10.10.10.1');
  assert.equal(result.lastUsableIp, '10.10.10.2');
  assert.equal(result.totalUsableHosts, 2);
});

test('calculateSubnet returns null on invalid input', () => {
  assert.equal(calculateSubnet('999.999.1.1', 24), null);
  assert.equal(calculateSubnet('192.168.1.1', 35), null);
  assert.equal(calculateSubnet('invalid_ip', 24), null);
});

test('calculateRaid computes RAID 1 with 2 disks', () => {
  const res = calculateRaid('RAID 1', 2, 1000);
  assert.equal(res.rawCapacityGb, 2000);
  assert.equal(res.usableCapacityGb, 1000);
  assert.equal(res.faultToleranceDisks, 1);
  assert.equal(res.efficiencyPercent, 50);
});

test('calculateRaid computes RAID 5 with 4 disks of 2TB', () => {
  const res = calculateRaid('RAID 5', 4, 2000);
  assert.equal(res.rawCapacityGb, 8000);
  assert.equal(res.usableCapacityGb, 6000);
  assert.equal(res.faultToleranceDisks, 1);
  assert.equal(res.efficiencyPercent, 75);
});

test('calculateRaid computes RAID 10 with 4 disks of 1TB', () => {
  const res = calculateRaid('RAID 10', 4, 1000);
  assert.equal(res.rawCapacityGb, 4000);
  assert.equal(res.usableCapacityGb, 2000);
  assert.equal(res.efficiencyPercent, 50);
});

test('generatePortfolioMasterReadme produces structured markdown', () => {
  const mockStep = {
    id: 1,
    slug: 'step-1-linux',
    title: 'Linux Server',
    subtitle: 'Base',
    level: 'Junior Base',
    durationWeeks: '2',
    estimatedHours: 20,
    iconName: 'Server',
    keySkills: ['Linux', 'SSH'],
    theorySummary: 'Summary',
    coreConcepts: [],
    cheatSheets: [],
    lab: {
      id: 'lab-1',
      title: 'Lab 1',
      scenario: 'Scen',
      environment: 'Ubuntu',
      estimatedTime: '2h',
      prerequisites: [],
      steps: [],
      definitionOfDone: [],
      troubleshootingTips: [],
      portfolioArtifact: {
        title: 'Production Linux Server',
        repoName: 'linux-hardening',
        summary: 'Hardened Linux server with SSH keys and fail2ban',
        technologies: ['Ubuntu', 'SSH', 'UFW'],
        fileTree: ['README.md'],
        readmeMarkdown: '# Test',
        keyConfigSnippets: [],
      },
    },
    quiz: [],
    interviewQuestions: [],
  } as unknown as RoadmapStep;

  const markdown = generatePortfolioMasterReadme('Иван Иванов', 'https://github.com/ivan-admin', [mockStep]);
  assert.ok(markdown.includes('Иван Иванов'));
  assert.ok(markdown.includes('Production Linux Server'));
  assert.ok(markdown.includes('https://github.com/ivan-admin'));
});
