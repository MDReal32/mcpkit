import { instanceCommunityPackagesGetInstalledPackages } from "./get-installed-packages";
import { instanceCommunityPackagesInstallPackage } from "./install-package";
import { instanceCommunityPackagesUninstallPackage } from "./uninstall-package";
import { instanceCommunityPackagesUpdatePackage } from "./update-package";

export const instanceCommunityPackagesTools = [
  instanceCommunityPackagesGetInstalledPackages,
  instanceCommunityPackagesInstallPackage,
  instanceCommunityPackagesUninstallPackage,
  instanceCommunityPackagesUpdatePackage,
];
