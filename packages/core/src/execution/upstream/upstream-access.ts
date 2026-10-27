import type { UpstreamSpec } from "../../manifest";

/** Everything needed to open one upstream connection: where to go, how requests are signed, what the child gets. */
export interface UpstreamAccess {
  upstream: UpstreamSpec;
  headers: Readonly<Record<string, string>>;
  env: Readonly<Record<string, string>>;
}
