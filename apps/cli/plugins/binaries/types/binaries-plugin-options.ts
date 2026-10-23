export interface BinariesPluginOptions {
  /** Version written into each per-target npm package. */
  version: string;
  /** Target names such as `darwin-arm64`; all targets when empty or omitted. */
  targets?: readonly string[];
  /** Subfolder of build.outDir that receives the binaries. */
  outSubdir?: string;
}
