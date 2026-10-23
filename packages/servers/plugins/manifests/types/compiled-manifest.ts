import type { Manifest } from "@usemcpkit/core";

export interface CompiledManifest {
  file: string;
  manifest: Manifest;
  json: string;
}
