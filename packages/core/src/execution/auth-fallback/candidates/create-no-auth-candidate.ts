import type { AuthResolution } from "../../../auth";
import type { Manifest } from "../../../manifest";
import { NO_AUTH } from "../../const";
import type { AuthCandidate } from "../types/auth-candidate";

export const createNoAuthCandidate = (manifest: Manifest) => {
  const resolution: AuthResolution = { auth: NO_AUTH, manifest };
  const candidate: AuthCandidate = { label: "no auth", kind: "provided", resolve: async () => resolution };
  return candidate;
};
