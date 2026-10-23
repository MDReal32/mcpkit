import { relative, resolve } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { compileServers } from './compile-servers';
import { DEFAULT_OUT_SUBDIR, DEFAULT_SERVERS_DIR, PLUGIN_NAME } from './const';
import { formatBuildSummary } from './format-build-summary';
import type { CompileResult } from './types/compile-result';
import type { ManifestsPluginOptions } from './types/manifests-plugin-options';
import { writeManifests } from './write-manifests';

/**
 * Compiles src/servers definitions into JSON manifests at build time and writes them to `<outDir>/manifests`,
 * the registry folder CI publishes. The CLI binary embeds none of them. Invalid definitions fail the build.
 */
export const mcpkitManifests = ({
  serversDir = DEFAULT_SERVERS_DIR,
  outSubdir = DEFAULT_OUT_SUBDIR,
  registryUrl,
}: ManifestsPluginOptions = {}) => {
  let resolvedConfig: ResolvedConfig | undefined;
  let compiling: Promise<CompileResult> | undefined;

  const readConfig = () => {
    if (!resolvedConfig) {
      throw new Error(`${PLUGIN_NAME}: config is not resolved yet`);
    }
    return resolvedConfig;
  };

  const compile = () => {
    compiling ??= compileServers(resolve(readConfig().root, serversDir));
    return compiling;
  };

  const plugin: Plugin = {
    name: PLUGIN_NAME,
    configResolved(config) {
      resolvedConfig = config;
    },
    async buildStart() {
      compiling = undefined;
      const { errors, dependencies } = await compile();
      for (const dependency of dependencies) {
        this.addWatchFile(dependency);
      }
      if (errors.length > 0) {
        this.error(`invalid server definition(s):\n  ${errors.join('\n  ')}`);
      }
    },
    watchChange() {
      compiling = undefined;
    },
    async writeBundle() {
      const config = readConfig();
      const { compiled } = await compile();
      const outDir = resolve(config.root, config.build.outDir, outSubdir);
      await writeManifests(compiled, outDir, registryUrl);
      config.logger.info(formatBuildSummary(compiled, relative(config.root, outDir)));
    },
  };
  return plugin;
};
