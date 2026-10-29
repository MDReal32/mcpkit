import { isValidManifest, validateManifest } from "@usemcpkit/core";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { loadPartTools } from "./load-part-tools";
import { readManifestFile } from "./read-manifest-file";
import { retryWithFreshIndex } from "./retry-with-fresh-index";

const loadGroupOnce = async (server: RegistryServer, context: RegistryContext, group: string | undefined) => {
  const file = await readManifestFile(server, context);
  if ("manifest" in file) {
    return file.manifest;
  }
  const part = file.parts.find((candidate) => candidate.name === group);
  if (!part) {
    throw new Error(`${server.id} has no group "${group ?? ""}"`);
  }
  const manifest = { ...file.shell, tools: await loadPartTools(server, part, context) };
  if (!isValidManifest(manifest)) {
    throw new Error(`${server.id}: ${validateManifest(manifest).join("; ")}`);
  }
  return manifest;
};

/**
 * The manifest holding the tools of `group`: the cached copy when it still matches the index, otherwise a download
 * that replaces it. A server split into parts loads only that part; a whole manifest ignores `group`.
 */
export const loadGroupManifest = (server: RegistryServer, context: RegistryContext, group?: string) =>
  retryWithFreshIndex(server, context, (current) => loadGroupOnce(current, context, group));
