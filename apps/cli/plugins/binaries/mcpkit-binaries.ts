import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { compileBinaries } from './compile-binaries';
import { DEFAULT_OUT_SUBDIR, NPM_OUT_SUBDIR, PLUGIN_NAME } from './const';
import { findEntryFile } from './find-entry-file';
import { formatBinariesSummary } from './format-binaries-summary';
import { selectTargets } from './select-targets';
import type { BinariesPluginOptions } from './types/binaries-plugin-options';
import { writePlatformPackage } from './write-platform-package';

/** After the bundle is written, compiles it into standalone binaries per target. Any failed target fails the build. */
export const mcpkitBinaries = ({ version, targets, outSubdir = DEFAULT_OUT_SUBDIR }: BinariesPluginOptions) => {
  const selected = selectTargets(targets);
  let resolvedConfig: ResolvedConfig | undefined;

  const readConfig = () => {
    if (!resolvedConfig) {
      throw new Error(`${PLUGIN_NAME}: config is not resolved yet`);
    }
    return resolvedConfig;
  };

  const plugin: Plugin = {
    name: PLUGIN_NAME,
    apply: 'build',
    configResolved(config) {
      resolvedConfig = config;
    },
    async writeBundle(_outputOptions, bundle) {
      const config = readConfig();
      const outDir = resolve(config.root, config.build.outDir);
      const binDir = join(outDir, outSubdir);
      await mkdir(binDir, { recursive: true });
      const results = await compileBinaries(join(outDir, findEntryFile(bundle)), binDir, selected);
      const failed = results.filter((result) => result.error !== undefined);
      if (failed.length > 0) {
        this.error(`failed to package:\n  ${failed.map(({ target, error }) => `${target}: ${error}`).join('\n  ')}`);
      }
      const npmDir = join(outDir, NPM_OUT_SUBDIR);
      for (const { target, outfile } of results) {
        await writePlatformPackage(npmDir, target, outfile, version);
      }
      config.logger.info(formatBinariesSummary(results, config.root));
    },
  };
  return plugin;
};
