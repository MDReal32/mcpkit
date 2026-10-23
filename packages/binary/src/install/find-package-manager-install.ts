import { HOMEBREW_CELLAR_PATTERN, HOMEBREW_UPGRADE_COMMAND, WINGET_PACKAGE_PATTERN } from '../const';
import type { PackageManagerInstall } from '../types/package-manager-install';

/** Maps the resolved path of a running binary to the stable path its package manager keeps up to date. */
export const findPackageManagerInstall = (realExecPath: string) => {
  const homebrewPrefix = HOMEBREW_CELLAR_PATTERN.exec(realExecPath)?.groups?.prefix;
  if (homebrewPrefix !== undefined) {
    const install: PackageManagerInstall = {
      manager: 'Homebrew',
      path: `${homebrewPrefix}/bin/mcpkit`,
      upgradeCommand: HOMEBREW_UPGRADE_COMMAND,
    };
    return install;
  }
  const wingetId = WINGET_PACKAGE_PATTERN.exec(realExecPath)?.groups?.id;
  if (wingetId !== undefined) {
    const install: PackageManagerInstall = {
      manager: 'winget',
      path: realExecPath,
      upgradeCommand: `winget upgrade --id ${wingetId}`,
    };
    return install;
  }
  return undefined;
};
