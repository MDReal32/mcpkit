import type { Manifest } from "../../../manifest";
import { isInteractiveAuth } from "../../../manifest";
import type { CallContext } from "../../types/call-context";
import { createNoAuthCandidate } from "./create-no-auth-candidate";
import { createStoredCandidate } from "./create-stored-candidate";
import { toFallbackCandidate } from "./to-fallback-candidate";

/** Auth that needs nothing from the user: the `tokens.json` token and fallbacks whose credentials are set or saved. */
export const listProvidedCandidates = (manifest: Manifest, context: CallContext) => {
  const auth = manifest.auth ?? [];
  if (auth.length === 0) {
    return [createNoAuthCandidate(manifest)];
  }
  const stored = auth.some(isInteractiveAuth) ? [createStoredCandidate(manifest, context)] : [];
  const fallbacks = auth.flatMap((entry, index) =>
    isInteractiveAuth(entry) ? [] : [toFallbackCandidate(entry, index, manifest, context)],
  );
  return [...stored, ...fallbacks];
};
