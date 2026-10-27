import { isValidManifest, validateManifest } from "@usemcpkit/core";
import { TOOL_NAME_SEPARATOR } from "../const";
import { hashText } from "../ids/hash-text";
import { readCachedManifestText } from "../local/read-cached-manifest-text";
import { writeCachedIndex } from "../local/write-cached-index";
import { fetchRegistryIndex } from "../remote/fetch-registry-index";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { ChecksumMismatchError } from "./checksum-mismatch-error";
import { downloadManifest } from "./download-manifest";
import { loadPartTools } from "./load-part-tools";
import { parseManifestText } from "./parse-manifest-text";

const readManifestFile = async (server: RegistryServer, context: RegistryContext) => {
  const cached = await readCachedManifestText(context.dir, server.id);
  if (cached !== undefined && hashText(cached) === server.sha256) {
    return parseManifestText(server, cached);
  }
  return downloadManifest(server, context);
};

const loadManifestOnce = async (server: RegistryServer, context: RegistryContext, tool: string) => {
  const file = await readManifestFile(server, context);
  if ("manifest" in file) {
    return file.manifest;
  }
  const [group = ""] = tool.split(TOOL_NAME_SEPARATOR);
  const part = file.parts.find((candidate) => candidate.name === group);
  if (!part) {
    throw new Error(`${server.id} has no group "${group}"`);
  }
  const manifest = { ...file.shell, tools: await loadPartTools(server, part, context) };
  if (!isValidManifest(manifest)) {
    throw new Error(`${server.id}: ${validateManifest(manifest).join("; ")}`);
  }
  return manifest;
};

/**
 * The manifest holding `tool`: the cached copy when it still matches the index, otherwise a download that replaces it.
 * A server split into parts loads only the part of the tool's group. When the download does not match the index, the
 * cached index is older than the registry: it is refreshed once and the load retried with the new entry.
 */
export const loadManifest = async (server: RegistryServer, context: RegistryContext, tool: string) => {
  try {
    return await loadManifestOnce(server, context, tool);
  } catch (error) {
    if (!(error instanceof ChecksumMismatchError)) {
      throw error;
    }
    const index = await fetchRegistryIndex(context);
    await writeCachedIndex(context.dir, index);
    const fresh = index.servers.find((candidate) => candidate.id === server.id);
    if (!fresh || fresh.sha256 === server.sha256) {
      throw error;
    }
    return loadManifestOnce(fresh, context, tool);
  }
};
