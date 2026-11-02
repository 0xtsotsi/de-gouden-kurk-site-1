import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { categories, products } from "../products.js";

test("catalogus bevat unieke, volledige productrecords", () => {
  const identifiers = products.map((product) => product.id);
  assert.equal(new Set(identifiers).size, products.length);
  assert.equal(products.length, 12);

  for (const product of products) {
    assert.ok(product.name);
    assert.ok(product.imageAlt);
    assert.ok(existsSync(new URL(`../${product.image}`, import.meta.url)));
    assert.ok(product.credit.sourceUrl.startsWith("https://"));
    assert.ok(product.credit.licenseUrl.startsWith("https://"));
  }
});

test("catalogus is deterministisch op naam gesorteerd", () => {
  const names = products.map((product) => product.name);
  assert.deepEqual(names, [...names].sort((left, right) => left.localeCompare(right, "nl-NL")));
});

test("elke categorie komt overeen met ten minste één product", () => {
  for (const category of categories.filter((candidate) => candidate.id !== "all")) {
    assert.ok(products.some((product) => product.category === category.id), category.id);
  }
});

test("de interface gebruikt de gekozen lokale lettertypen", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(html, /bricolage-grotesque-latin\.woff2/);
  assert.match(html, /instrument-sans-latin\.woff2/);
  assert.match(css, /--font-display:\s*"Bricolage Grotesque"/);
  assert.match(css, /--font-body:\s*"Instrument Sans"/);
  assert.doesNotMatch(css, /Instrument Serif/);
});

test("de hero bevat één tijdgebonden schenkmoment met reduced-motion-route", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");

  const pourMoment = html.match(/<div class="pour-moment"[\s\S]*?<\/div>/)?.[0] || "";

  assert.equal((html.match(/class="pour-moment"/g) || []).length, 1);
  assert.match(pourMoment, /<svg/);
  assert.match(pourMoment, /pour-moment__bottle/);
  assert.match(pourMoment, /pour-moment__stream/);
  assert.match(pourMoment, /pour-moment__glass/);
  assert.doesNotMatch(pourMoment, /<img/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(script, /ageDialog\.addEventListener\("close", startPour/);
  assert.doesNotMatch(css, /animation-iteration-count:\s*infinite/);
});

test("micro-interacties zijn kort, doelgericht en hebben een reduced-motion-route", () => {
  const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");

  assert.match(css, /@keyframes cart-badge-pop/);
  assert.match(css, /@keyframes added-confirm/);
  assert.match(css, /@keyframes toast-in/);
  assert.match(css, /\.category-filters button\[aria-pressed="true"\]::after/);
  assert.match(script, /function pulseCartBadge\(\)/);
  assert.match(css, /\.toast,\s*\.cart-count\.is-updated,\s*\.product-card__buy \.button\.is-added/);
  assert.doesNotMatch(css, /transition\s*:\s*all/);
  assert.doesNotMatch(css, /animation-iteration-count:\s*infinite/);
});
