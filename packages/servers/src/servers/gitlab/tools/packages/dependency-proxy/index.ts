import { packagesDependencyProxyDeleteGroupsDependencyProxyCache } from "./delete-groups-dependency-proxy-cache";
import { packagesDependencyProxyGetProjectsDependencyProxyPackagesMaven } from "./get-projects-dependency-proxy-packages-maven";
import { packagesDependencyProxyGetProjectsDependencyProxyPackagesNpm } from "./get-projects-dependency-proxy-packages-npm";

export const packagesDependencyProxyTools = [
  packagesDependencyProxyDeleteGroupsDependencyProxyCache,
  packagesDependencyProxyGetProjectsDependencyProxyPackagesMaven,
  packagesDependencyProxyGetProjectsDependencyProxyPackagesNpm,
];
