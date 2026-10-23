import { resolveSignedInAuth } from "../../../auth";
import type { InteractiveAuth, Manifest } from "../../../manifest";
import { describeAuthSpec } from "../../../manifest";
import type { CallContext } from "../../types/call-context";
import type { AuthCandidate } from "../types/auth-candidate";

export const toSignInCandidate = (auth: InteractiveAuth, index: number, manifest: Manifest, context: CallContext) => {
  const candidate: AuthCandidate = {
    label: `auth[${index}] ${describeAuthSpec(auth)} sign-in`,
    kind: "interactive",
    resolve: async () => ({ auth: await resolveSignedInAuth(manifest.name, auth, context), manifest }),
  };
  return candidate;
};
