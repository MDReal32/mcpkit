import { hashText } from "../ids/hash-text";
import { readCachedManifestText } from "../local/read-cached-manifest-text";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { downloadManifest } from "./download-manifest";
import { parseManifestText } from "./parse-manifest-text";

/** The cached manifest file when it still matches the index, otherwise a verified download that replaces it. */
export const readManifestFile = async (server: RegistryServer, context: RegistryContext) => {
  const cached = await readCachedManifestText(context.dir, server.id);
  if (cached !== undefined && hashText(cached) === server.sha256) {
    return parseManifestText(server, cached);
  }
  return downloadManifest(server, context);
};
