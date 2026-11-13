import type { Manifest } from "@usemcpkit/core";
import type { ManifestPartFile } from "./manifest-part-file";

export interface PublishedSpecs {
  manifest: Manifest;
  /** The documents of the server's folder, at their path in the registry. */
  files: ManifestPartFile[];
  /** The source files the documents were read from. */
  sources: string[];
}
