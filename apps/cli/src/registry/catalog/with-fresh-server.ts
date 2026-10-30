import { writeCachedIndex } from "../local/write-cached-index";
import { fetchRegistryIndex } from "../remote/fetch-registry-index";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { ChecksumMismatchError } from "./checksum-mismatch-error";
import { revalidateServer } from "./revalidate-server";

/**
 * Runs `load` with the server's entry in the freshest index; when the download still does not match it, the cached
 * index is older than the registry: it is refreshed once more and `load` retried with the new entry.
 */
export const withFreshServer = async <Result>(
  server: RegistryServer,
  context: RegistryContext,
  load: (current: RegistryServer) => Promise<Result>,
) => {
  const current = await revalidateServer(server, context);
  try {
    return await load(current);
  } catch (error) {
    if (!(error instanceof ChecksumMismatchError)) {
      throw error;
    }
    const index = await fetchRegistryIndex(context);
    await writeCachedIndex(context, index);
    const fresh = index.servers.find((candidate) => candidate.id === current.id);
    if (!fresh || fresh.sha256 === current.sha256) {
      throw error;
    }
    return load(fresh);
  }
};
