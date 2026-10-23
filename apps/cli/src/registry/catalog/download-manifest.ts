import { hashText } from "../ids/hash-text";
import { writeCachedManifest } from "../local/write-cached-manifest";
import { fetchText } from "../remote/fetch-text";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { parseManifestText } from "./parse-manifest-text";
import { resolveRegistryLink } from "./resolve-registry-link";

/** Nothing is cached unless it matches the index hash and validates. */
export const downloadManifest = async (server: RegistryServer, context: RegistryContext) => {
  const url = resolveRegistryLink(context, server.url);
  const text = await fetchText(url, context.fetchImpl);
  if (hashText(text) !== server.sha256) {
    throw new Error(`${server.id}: ${url} does not match the index checksum`);
  }
  const file = parseManifestText(server, text);
  await writeCachedManifest(context.dir, server.id, text);
  return file;
};
