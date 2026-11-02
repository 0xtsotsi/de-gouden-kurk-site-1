import assert from "node:assert/strict";
import { test } from "node:test";
import { createStaticServer } from "../server.js";

async function startTestServer(testContext) {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  testContext.after(() => new Promise((resolve) => server.close(resolve)));
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}

test("statische server levert de homepage en productmodule", async (testContext) => {
  const origin = await startTestServer(testContext);
  const homepage = await fetch(`${origin}/`);
  const module = await fetch(`${origin}/script.js`);

  assert.equal(homepage.status, 200);
  assert.match(homepage.headers.get("content-type"), /text\/html/);
  assert.match(await homepage.text(), /De Gouden Kurk/);
  assert.equal(module.status, 200);
  assert.match(module.headers.get("content-type"), /text\/javascript/);
});

test("statische server verbergt projectbestanden en verbiedt schrijfacties", async (testContext) => {
  const origin = await startTestServer(testContext);
  const hiddenFile = await fetch(`${origin}/.research/rodi.html`);
  const sourceFile = await fetch(`${origin}/package.json`);
  const serverSource = await fetch(`${origin}/server.js`);
  const post = await fetch(`${origin}/`, { method: "POST" });

  assert.equal(hiddenFile.status, 404);
  assert.equal(sourceFile.status, 404);
  assert.equal(serverSource.status, 404);
  assert.equal(post.status, 405);
});
