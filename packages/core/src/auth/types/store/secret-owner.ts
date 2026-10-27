import type { Manifest } from "../../../manifest";

/** The server, and the host of it, a stored secret belongs to. */
export interface SecretOwner extends Pick<Manifest, "name" | "category"> {
  domain?: string;
}
