export interface ManifestsPluginOptions {
  /** Directory with one folder per server, relative to the Vite root. */
  serversDir?: string;
  /** Subfolder of build.outDir that receives the JSON manifests. */
  outSubdir?: string;
  /** Public base URL of the registry; index.json then lists absolute links instead of file names. */
  registryUrl?: string;
}
