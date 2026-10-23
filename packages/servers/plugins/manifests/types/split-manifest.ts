import type { ManifestPartFile } from "./manifest-part-file";

export interface SplitManifest {
  shellJson: string;
  files: ManifestPartFile[];
}
