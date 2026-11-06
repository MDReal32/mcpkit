export interface ManifestsPluginOptions {
  /** Directory with one folder per server, relative to the Vite root. */
  serversDir?: string;
  /** Subfolder of build.outDir that receives the JSON manifests. */
  outSubdir?: string;
}
