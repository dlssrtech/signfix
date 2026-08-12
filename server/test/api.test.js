const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../index');

let server;
let baseUrl;
let customerToken;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}/api`;
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'customer@signfix.in', password: 'SignFix@123' }),
  });
  assert.equal(response.status, 200);
  customerToken = (await response.json()).token;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('health endpoint reports the active database mode', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.database.connected, true);
});

test('calculator distinguishes an estimate from a final quotation', async () => {
  const response = await fetch(`${baseUrl}/calculator`, {
    method: 'POST',
    headers: { authorization: `Bearer ${customerToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ product: 'LED Sign Board', length: 10, width: 3, quantity: 1, material: 'Acrylic', lighting: 'LED' }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.label, 'Estimated Price');
  assert.match(body.notice, /Final quotation/);
  assert.ok(body.estimatedPrice > 0);
});

test('protected routes reject anonymous calls', async () => {
  const response = await fetch(`${baseUrl}/orders`);
  assert.equal(response.status, 401);
});
