import type { FixedValue } from "../tool/fixed-value";

/** How endpoints become tools; every field falls back to its default when absent. */
export interface ConversionOptions {
  /** Object properties below this depth are dropped (3 by default). */
  maxDepth?: number;
  /** Puts the primitive `default` of a schema into the input (on by default). */
  includeDefaults?: boolean;
  /** Removes `**` from descriptions. */
  stripBold?: boolean;
  /** A oneOf/anyOf of mixed scalar types becomes `string` when one of them is a string. */
  widenMixedScalars?: boolean;
  /** An exploded query array of scalars stays an array argument; otherwise it is a comma-separated string. */
  keepsExplodedArrays?: boolean;
  /** Put before every tool description, for example `[Data Center]`. */
  descriptionPrefix?: string;
  /** Regexes over the path of GET endpoints whose answer is a file to save rather than read. */
  downloadPaths?: readonly string[];
  /** The form part a multipart body that is a bare file list is sent as. */
  filePartName?: string;
  /** Regexes over `"METHOD /path"` of endpoints left out. */
  skip?: readonly string[];
  /** Leaves out deprecated endpoints. */
  skipDeprecated?: boolean;
  /** Security schemes the manifest's auth satisfies; an endpoint whose `security` names only other schemes is left out. */
  security?: readonly string[];
  /** Query values sent on every call. */
  fixedQuery?: Readonly<Record<string, FixedValue>>;
}
