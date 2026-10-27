import { AuthError, resolveDomain, UnauthorizedError } from "../../auth";
import { describeError } from "../../errors";
import type { Manifest } from "../../manifest";
import { applyDomain } from "../../manifest";
import { buildAuthCandidates } from "../auth-fallback/candidates/build-auth-candidates";
import { orderAuthCandidates } from "../auth-fallback/candidates/order-auth-candidates";
import { preferredAuthLabels } from "../auth-fallback/candidates/preferred-auth-labels";
import { DEFAULT_TIMEOUT_MS } from "../const";
import type { ExecuteOptions } from "../execute-options";
import type { CallContext } from "../types/call-context";
import { readForwardedEnv } from "./read-forwarded-env";
import type { UpstreamAccess } from "./upstream-access";

/**
 * Runs `run` with the access of an `upstream` manifest. A stdio upstream gets its forwarded credentials; an HTTP one
 * tries the manifest's auth options in order like an API call does, moving on when `run` throws UnauthorizedError.
 */
export const withUpstreamAccess = async <T>(
  manifest: Manifest,
  run: (access: UpstreamAccess) => Promise<T>,
  { fetchImpl = fetch, timeoutMs = DEFAULT_TIMEOUT_MS, env = process.env, ...hooks }: ExecuteOptions = {},
) => {
  const context: CallContext = { env, fetchImpl, timeoutMs, ...hooks };
  const domain = await resolveDomain(manifest, context);
  const target = applyDomain(manifest, domain);
  const upstream = target.upstream;
  if (!upstream) {
    throw new AuthError(`${manifest.name} has no upstream`);
  }
  if (upstream.type === "stdio") {
    return run({ upstream, headers: {}, env: await readForwardedEnv(manifest, upstream, domain, context) });
  }
  const failures: string[] = [];
  for (const candidate of orderAuthCandidates(manifest.name, buildAuthCandidates(manifest, domain, context))) {
    try {
      const resolution = await candidate.resolve();
      const result = await run({ upstream, headers: resolution.auth.headers, env: {} });
      await resolution.commit?.();
      if (candidate.kind === "provided") {
        preferredAuthLabels.set(manifest.name, candidate.label);
      }
      return result;
    } catch (error) {
      if (!(error instanceof AuthError || error instanceof UnauthorizedError)) {
        throw error;
      }
      failures.push(`${candidate.label}: ${describeError(error)}`);
    }
  }
  preferredAuthLabels.delete(manifest.name);
  throw new AuthError(`${manifest.name}: no auth option worked\n  ${failures.join("\n  ")}`);
};
