import type { CompiledManifest } from "./compiled-manifest";

export interface ServerOutcome {
  dir: string;
  compiled?: CompiledManifest;
  errors: readonly string[];
  dependencies: readonly string[];
}
