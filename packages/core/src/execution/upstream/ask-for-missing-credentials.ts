import { AuthError } from "../../auth";
import type { Manifest, StdioUpstream } from "../../manifest";
import type { CallContext } from "../types/call-context";
import { requestForwardedCredentials } from "./request-forwarded-credentials";

/** The values the user enters for `missing`; without a form to ask in, the missing names are the error. */
export const askForMissingCredentials = (
  manifest: Manifest,
  upstream: StdioUpstream,
  missing: readonly string[],
  requestCredentials: CallContext["requestCredentials"],
) => {
  if (!requestCredentials) {
    throw new AuthError(
      `${manifest.name}: missing credential, set ${missing.join(", ")} in the client's env for mcpkit`,
    );
  }
  return requestForwardedCredentials(manifest, upstream, missing, requestCredentials);
};
