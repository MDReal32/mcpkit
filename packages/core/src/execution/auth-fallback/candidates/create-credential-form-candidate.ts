import { resolveCredentialForm } from "../../../auth";
import type { Manifest } from "../../../manifest";
import type { CallContext } from "../../types/call-context";
import type { AuthCandidate } from "../types/auth-candidate";

export const createCredentialFormCandidate = (manifest: Manifest, domain: string | undefined, context: CallContext) => {
  const candidate: AuthCandidate = {
    label: "credentials form",
    kind: "interactive",
    resolve: () => resolveCredentialForm(manifest, domain, context),
  };
  return candidate;
};
