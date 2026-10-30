import { AUTO_UPDATE_ENV } from "@usemcpkit/binary";
import type { ExecuteOptions, Manifest } from "@usemcpkit/core";
import { withUpstreamAccess } from "@usemcpkit/core";
import type { UpstreamConnection } from "@usemcpkit/upstream";
import { connectUpstream } from "@usemcpkit/upstream";
import { VERSION } from "../version";
import { resolveRepoDir } from "./resolve-repo-dir";

export interface OpenedUpstream<T> {
  connection: UpstreamConnection;
  result: T;
}

/**
 * Connects with the manifest's auth and runs `use` on the connection. When it throws (a 401 moves on to the next auth
 * option), the connection is closed; otherwise the caller owns it.
 */
export const openUpstream = <T>(
  manifest: Manifest,
  options: ExecuteOptions,
  use: (connection: UpstreamConnection) => Promise<T>,
) =>
  withUpstreamAccess(
    manifest,
    async ({ upstream, headers, env }) => {
      const connection = await connectUpstream(upstream, {
        headers,
        env,
        repoDir: resolveRepoDir(manifest),
        checkRepo: (options.env ?? process.env)[AUTO_UPDATE_ENV] !== "0",
        fetchImpl: options.fetchImpl,
        clientVersion: VERSION,
      });
      try {
        const opened: OpenedUpstream<T> = { connection, result: await use(connection) };
        return opened;
      } catch (error) {
        await connection.close();
        throw error;
      }
    },
    options,
  );
