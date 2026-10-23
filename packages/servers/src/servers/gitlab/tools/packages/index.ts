import { packagesContainerRegistryTools } from './container-registry';
import { packagesDependencyProxyTools } from './dependency-proxy';
import { packagesMlModelRegistryTools } from './ml-model-registry';
import { packagesMlopsTools } from './mlops';
import { packagesPackagesTools } from './packages';

export const packagesGroupTools = [
  ...packagesContainerRegistryTools,
  ...packagesDependencyProxyTools,
  ...packagesMlModelRegistryTools,
  ...packagesMlopsTools,
  ...packagesPackagesTools,
];
