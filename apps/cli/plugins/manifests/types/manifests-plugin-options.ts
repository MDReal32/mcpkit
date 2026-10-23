export interface ManifestsPluginOptions {
  /** Absolute path of the directory with one folder per server. */
  serversDir: string;
  /** Subfolder of build.outDir that receives the JSON manifests. */
  outSubdir?: string;
  /** Public base URL of the registry; index.json then lists absolute links instead of file names. */
  registryUrl?: string;
}
