import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { basename, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const mimeTypes = Object.freeze({
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
});

const securityHeaders = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'self'",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY"
});

export function createStaticServer({ root = fileURLToPath(new URL(".", import.meta.url)) } = {}) {
  const resolvedRoot = resolve(root);

  return createServer(async (request, response) => {
    if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
      response.writeHead(405, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8", Allow: "GET, HEAD" });
      response.end("Method not allowed");
      return;
    }

    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
      response.writeHead(400, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8" });
      response.end("Bad request");
      return;
    }

    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.some((segment) => segment.startsWith("."))) {
      response.writeHead(404, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = resolve(resolvedRoot, relativePath);
    const fileExtension = extname(filePath).toLowerCase();
    const publicRootFiles = new Set(["index.html", "script.js", "products.js", "styles.css"]);
    const isPublicFile = publicRootFiles.has(basename(filePath)) || relativePath.startsWith("assets/");

    if ((filePath !== resolvedRoot && !filePath.startsWith(`${resolvedRoot}${sep}`)) || !mimeTypes[fileExtension] || !isPublicFile) {
      response.writeHead(404, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    try {
      const data = await readFile(filePath);
      response.writeHead(200, { ...securityHeaders, "Content-Type": mimeTypes[fileExtension] });
      response.end(request.method === "HEAD" ? undefined : data);
    } catch (error) {
      const status = error && error.code === "ENOENT" ? 404 : 500;
      response.writeHead(status, { ...securityHeaders, "Content-Type": "text/plain; charset=utf-8" });
      response.end(status === 404 ? "Not found" : "Server error");
    }
  });
}

export function startServer({ port = Number(process.env.PORT || 4173), root } = {}) {
  const server = createStaticServer({ root });
  server.listen(port, "127.0.0.1", () => {
    console.log(`De Gouden Kurk is beschikbaar op http://localhost:${port}`);
  });
  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
}
