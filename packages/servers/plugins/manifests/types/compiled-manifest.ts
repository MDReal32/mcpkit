import type { Manifest } from "@usemcpkit/core";
import type { ManifestPartFile } from "./manifest-part-file";

export interface CompiledManifest {
  file: string;
  manifest: Manifest;
  json: string;
  /** Hand-written OpenAPI documents published next to the manifest. */
  specs: ManifestPartFile[];
}
