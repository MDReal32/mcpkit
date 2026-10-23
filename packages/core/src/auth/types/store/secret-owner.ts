import type { Manifest } from "../../../manifest";

/** The server a stored secret belongs to. */
export type SecretOwner = Pick<Manifest, "name" | "category">;
