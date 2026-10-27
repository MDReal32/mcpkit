import type { HttpUpstream } from "./http-upstream";
import type { StdioUpstream } from "./stdio-upstream";

export type UpstreamSpec = HttpUpstream | StdioUpstream;
