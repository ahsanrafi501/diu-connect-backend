import assert from 'node:assert/strict';
import { once } from 'node:events';
import { after, before, test } from 'node:test';
import { app } from '../dist/app.js';

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = 'http://127.0.0.1:' + server.address().port;
});

after(async () => {
  if (!server?.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('health reports that the HTTP server is responding', async () => {
  const response = await fetch(baseUrl + '/health');
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('unknown routes return a JSON error', async () => {
  const response = await fetch(baseUrl + '/missing');
  assert.equal(response.status, 404);
  assert.equal((await response.json()).error.code, 'NOT_FOUND');
});

for (const [label, body, status, code] of [
  ['malformed JSON', '{"incomplete":', 400, 'INVALID_JSON'],
  ['oversized JSON', JSON.stringify({ text: 'x'.repeat(65536) }), 413, 'PAYLOAD_TOO_LARGE'],
]) {
  test(label + ' is rejected before route handling', async () => {
    const response = await fetch(baseUrl + '/missing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    assert.equal(response.status, status);
    assert.equal((await response.json()).error.code, code);
  });
}
