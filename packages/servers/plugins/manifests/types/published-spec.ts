import type { OpenApiSource } from "@usemcpkit/core";
import type { ManifestPartFile } from "./manifest-part-file";

export interface PublishedSpec {
  source: OpenApiSource;
  /** The document at its path in the registry, for a source of the server's folder. */
  file?: ManifestPartFile;
  /** The file the document was read from. */
  sourceFile?: string;
}
