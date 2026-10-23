import { createHash } from "node:crypto";
import type { Manifest } from "@usemcpkit/core";
import type { FakeRegistry } from "./create-registry-fetch";

const sha256Of = (text: string) => createHash("sha256").update(text).digest("hex");

/** Serves a server whose tools are split by their first name segment: a shell with part checksums plus one file per part. */
export const createSplitRegistryFetch = (registryUrl: string, manifest: Manifest) => {
  const routes = new Map<string, string>();
  const groups = [...new Set(manifest.tools.map((tool) => tool.name.split(":")[0] ?? ""))];
  const parts = groups.map((name) => {
    const text = `${JSON.stringify({ tools: manifest.tools.filter((tool) => tool.name.startsWith(`${name}:`)) })}\n`;
    const path = `${manifest.category}/${manifest.name}/${name}.json`;
    routes.set(`${registryUrl}/${path}`, text);
    return { name, url: path, sha256: sha256Of(text) };
  });
  const { tools, ...shell } = manifest;
  const shellText = `${JSON.stringify({ ...shell, parts })}\n`;
  routes.set(`${registryUrl}/${manifest.category}/${manifest.name}.json`, shellText);
  const server = {
    id: `${manifest.category}:${manifest.name}`,
    version: manifest.version,
    tools: tools.map((tool) => tool.name),
    url: `${manifest.category}/${manifest.name}.json`,
    sha256: sha256Of(shellText),
  };
  routes.set(`${registryUrl}/index.json`, JSON.stringify({ servers: [server] }));
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
