import type { ServerKey } from "../server-key";

/** The server, and the host of it, a stored secret belongs to. */
export interface SecretOwner extends ServerKey {
  domain?: string;
}
