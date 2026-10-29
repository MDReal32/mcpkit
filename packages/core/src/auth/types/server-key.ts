import type { Manifest } from "../../manifest";

/** Where a server's settings live in the config: `servers.<category>.<name>`. */
export type ServerKey = Pick<Manifest, "name" | "category">;
