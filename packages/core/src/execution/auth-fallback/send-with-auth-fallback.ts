import { AuthError, resolveDomain } from '../../auth';
import type { Manifest, ToolArgs, ToolSpec } from '../../manifest';
import type { CallContext } from '../types/call-context';
import { attemptAuth } from './attempt-auth';
import { buildAuthCandidates } from './candidates/build-auth-candidates';
import { orderAuthCandidates } from './candidates/order-auth-candidates';
import { preferredAuthLabels } from './candidates/preferred-auth-labels';

/** Tries the server's auth candidates in order and keeps the one the API accepts. */
export const sendWithAuthFallback = async (
  manifest: Manifest,
  tool: ToolSpec,
  args: ToolArgs,
  context: CallContext,
) => {
  const domain = await resolveDomain(manifest, context);
  const candidates = orderAuthCandidates(manifest.name, buildAuthCandidates(manifest, domain, context));
  const failures: string[] = [];
  for (const candidate of candidates) {
    const attempt = await attemptAuth(candidate, tool, args, context);
    if (attempt.accepted) {
      if (candidate.kind === 'provided') {
        preferredAuthLabels.set(manifest.name, candidate.label);
      }
      return attempt;
    }
    failures.push(`${candidate.label}: ${attempt.reason}`);
  }
  preferredAuthLabels.delete(manifest.name);
  throw new AuthError(`${manifest.name}: no auth option worked\n  ${failures.join('\n  ')}`);
};
