import { createHash } from "node:crypto";
import type { PkcePair } from "../../types/oauth/pkce-pair";
import { createRandomToken } from "./create-random-token";

/** RFC 7636 S256: the challenge is the base64url SHA-256 of the verifier. */
export const createPkcePair = () => {
  const verifier = createRandomToken();
  const pair: PkcePair = { verifier, challenge: createHash("sha256").update(verifier).digest("base64url") };
  return pair;
};
