import { AuthError } from "../../../auth";
import type { Manifest } from "../../../manifest";
import type { AuthCandidate } from "../types/auth-candidate";

export const createMissingDomainCandidate = (manifest: Manifest) => {
  const envHint = manifest.domain?.env ? `, set the ${manifest.domain.env} environment variable` : "";
  const candidate: AuthCandidate = {
    label: "domain",
    kind: "interactive",
    resolve: async () => {
      throw new AuthError(`no domain is set${envHint}`);
    },
  };
  return candidate;
};
