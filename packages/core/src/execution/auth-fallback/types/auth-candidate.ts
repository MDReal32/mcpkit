import type { AuthResolution } from "../../../auth";
import type { AuthCandidateKind } from "./auth-candidate-kind";

export interface AuthCandidate {
  label: string;
  kind: AuthCandidateKind;
  resolve: () => Promise<AuthResolution>;
}
