import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { extname, resolve, sep } from "node:path";
import { BINARY_CONTENT_TYPE, JSON_CONTENT_TYPE, LOOPBACK_HOST } from "./const";
import type { RegistryServer } from "./types/registry-server";

/** Serves the built manifests over HTTP, since a registry link must be a URL and the client reads no plain folder. */
export const startRegistryServer = async (registryDir: string) => {
  const root = resolve(registryDir);
  const server = createServer(async (request, response) => {
    const requested = resolve(root, `.${decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname)}`);
    if (!requested.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(requested);
      const contentType = extname(requested) === ".json" ? JSON_CONTENT_TYPE : BINARY_CONTENT_TYPE;
      response.writeHead(200, { "content-type": contentType }).end(body);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") {
        response.writeHead(404).end();
        return;
      }
      response.writeHead(500).end(String(error));
    }
  });
  await new Promise<void>((resolveListening) => server.listen(0, LOOPBACK_HOST, resolveListening));
  const { port } = server.address() as AddressInfo;
  const registry: RegistryServer = {
    url: `http://${LOOPBACK_HOST}:${port}`,
    close: () => new Promise<void>((resolveClosed) => server.close(() => resolveClosed())),
  };
  return registry;
};
