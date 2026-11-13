import type { ConversionOptions } from "./conversion-options";
import type { SpecVersioning } from "./spec-versioning";

export interface OpenApiSource {
  /** Names the source in `applies`, for example `datacenter`. */
  name: string;
  /** What the credentials form calls the deployment, for example `Data Center`; the name when absent. */
  label?: string;
  /** Host suffixes such as `.atlassian.net`; absent, the source matches any host. */
  hosts?: readonly string[];
  /** The document, absolute or relative to the registry folder; `{version}` is replaced by the version picked. */
  url: string;
  /** Hex SHA-256 of the document a url without `{version}` must serve. */
  sha256?: string;
  version?: SpecVersioning;
  /** Put before every path of the document; the path of the document's first server (or Swagger `basePath`) when absent. */
  basePath?: string;
  options?: ConversionOptions;
}
