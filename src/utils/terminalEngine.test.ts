import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialTerminalState, executeCommand } from './terminalEngine';
import { TROUBLESHOOTING_MISSIONS } from '../data/troubleshootingScenarios';

test('terminal engine boots with default status', () => {
  const state = createInitialTerminalState();
  const res = executeCommand('whoami', state);
  assert.equal(res.output, 'sysadmin');

  const resSudo = executeCommand('sudo whoami', state);
  assert.equal(resSudo.output, 'root');
});

test('terminal engine handles help and uname', () => {
  const state = createInitialTerminalState();
  const resHelp = executeCommand('help', state);
  assert.ok(resHelp.output.includes('systemctl'));

  const resUname = executeCommand('uname -a', state);
  assert.ok(resUname.output.includes('Linux'));
});

test('mission 1: solves Nginx 502 incident upon restarting app-backend', () => {
  const mission = TROUBLESHOOTING_MISSIONS[0]; // mission-nginx-502
  let state = createInitialTerminalState(mission);
  assert.equal(state.missionSolved, false);

  // curl returns 502
  const curlRes = executeCommand('curl http://localhost', state);
  assert.ok(curlRes.output.includes('502 Bad Gateway'));

  // restart backend
  const restartRes = executeCommand('sudo systemctl restart app-backend', state);
  state = restartRes.nextState;

  // Now mission is solved
  assert.equal(state.missionSolved, true);
  assert.ok(restartRes.output.includes('ИНЦИДЕНТ УСПЕШНО РЕШЕН'));
});

test('mission 2: solves Disk Full incident when truncated and postgres restarted', () => {
  const mission = TROUBLESHOOTING_MISSIONS[1]; // mission-disk-full
  let state = createInitialTerminalState(mission);
  assert.equal(state.missionSolved, false);

  // Before truncate, df shows 100%
  const dfRes = executeCommand('df -h', state);
  assert.ok(dfRes.output.includes('100%'));

  // Truncate file
  const truncRes = executeCommand('truncate -s 0 /var/log/debug_overflow.log', state);
  state = truncRes.nextState;

  // Restart postgres
  const restartRes = executeCommand('systemctl restart postgresql', state);
  state = restartRes.nextState;

  assert.equal(state.missionSolved, true);
});

test('mission 4: solves DNS resolver incident when nameserver updated', () => {
  const mission = TROUBLESHOOTING_MISSIONS[3]; // mission-dns-resolver
  let state = createInitialTerminalState(mission);
  assert.equal(state.missionSolved, false);

  // ping fails
  const pingFail = executeCommand('ping google.com', state);
  assert.ok(pingFail.output.includes('failure in name resolution'));

  // echo nameserver 8.8.8.8 > /etc/resolv.conf
  const echoRes = executeCommand('echo "nameserver 8.8.8.8" > /etc/resolv.conf', state);
  state = echoRes.nextState;

  assert.equal(state.missionSolved, true);
  assert.ok(echoRes.output.includes('ИНЦИДЕНТ УСПЕШНО РЕШЕН'));
});
