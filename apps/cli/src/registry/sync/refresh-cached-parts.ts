import { loadPartTools } from "../catalog/load-part-tools";
import { readManifestFile } from "../catalog/read-manifest-file";
import { hashText } from "../ids/hash-text";
import { readCachedPartText } from "../local/read-cached-part-text";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";

/**
 * Re-downloads the parts of a server that are already cached and no longer match their shell; a part nobody opened
 * is never downloaded. Returns `<id>/<part>` for each part it replaced.
 */
export const refreshCachedParts = async (server: RegistryServer, context: RegistryContext) => {
  const file = await readManifestFile(server, context);
  if ("manifest" in file) {
    return [];
  }
  const refreshed: string[] = [];
  for (const part of file.parts) {
    const cached = await readCachedPartText(context.dir, server.id, part.name);
    if (cached === undefined || hashText(cached) === part.sha256) {
      continue;
    }
    await loadPartTools(server, part, context);
    refreshed.push(`${server.id}/${part.name}`);
  }
  return refreshed;
};
