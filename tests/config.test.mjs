import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readConfig } from '../dist/config/env.js';

test('port defaults to 4000 and accepts an explicit decimal port', () => {
  assert.equal(readConfig({}).port, 4000);
  assert.equal(readConfig({ PORT: '8080' }).port, 8080);
});

test('invalid port settings fail before the server starts', () => {
  for (const PORT of ['', '0', '65536', '1.5', '0x10', ' 4000', 'abc']) {
    assert.throws(() => readConfig({ PORT }), /PORT must be an integer/, PORT);
  }
});
