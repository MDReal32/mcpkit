import { createHash } from "node:crypto";
import type { Manifest } from "@usemcpkit/core";

export interface FakeRegistry {
  fetchImpl: typeof fetch;
  requests: string[];
}

/** Serves an index.json with matching checksums plus each manifest file, and records every requested URL. */
export const createRegistryFetch = (registryUrl: string, manifests: readonly Manifest[]) => {
  const routes = new Map<string, string>();
  const servers = manifests.map((manifest) => {
    const text = `${JSON.stringify(manifest)}\n`;
    const url = `${registryUrl}/${manifest.category}/${manifest.name}.json`;
    routes.set(url, text);
    return {
      id: `${manifest.category}:${manifest.name}`,
      version: manifest.version,
      description: manifest.description,
      url,
      sha256: createHash("sha256").update(text).digest("hex"),
    };
  });
  routes.set(`${registryUrl}/index.json`, JSON.stringify({ servers }));
  const requests: string[] = [];
  const fetchImpl: typeof fetch = async (request) => {
    const url = request instanceof Request ? request.url : String(request);
    requests.push(url);
    const body = routes.get(url);
    return new Response(body ?? "Not Found", { status: body === undefined ? 404 : 200 });
  };
  const registry: FakeRegistry = { fetchImpl, requests };
  return registry;
};
