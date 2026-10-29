import { writeCachedIndex } from "../local/write-cached-index";
import { fetchRegistryIndex } from "../remote/fetch-registry-index";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { ChecksumMismatchError } from "./checksum-mismatch-error";

/**
 * Runs `load`; when the download does not match the index, the cached index is older than the registry: it is
 * refreshed once and `load` retried with the new entry of the server.
 */
export const retryWithFreshIndex = async <Result>(
  server: RegistryServer,
  context: RegistryContext,
  load: (current: RegistryServer) => Promise<Result>,
) => {
  try {
    return await load(server);
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
    return load(fresh);
  }
};
