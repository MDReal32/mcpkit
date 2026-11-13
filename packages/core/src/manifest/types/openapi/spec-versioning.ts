import type { VersionList } from "./version-list";
import type { VersionProbe } from "./version-probe";

/** How the version of the user's server is found and which published document belongs to it. */
export interface SpecVersioning {
  probe: VersionProbe;
  /** Env var that pins the version instead of asking the server. */
  env?: string;
  /** Where the published versions are listed; without it (or `known`) only the exact version is tried. */
  list?: VersionList;
  /** Published versions by version, each with the text `{version}` is replaced by, for vendors without a listing. */
  known?: Readonly<Record<string, string>>;
}
