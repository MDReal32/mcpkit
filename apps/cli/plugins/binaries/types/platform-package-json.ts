import type { PackagePublishConfig } from "./package-publish-config";
import type { PackageRepository } from "./package-repository";

export interface PlatformPackageJson {
  name: string;
  version: string;
  description: string;
  license: string;
  repository: PackageRepository;
  publishConfig: PackagePublishConfig;
  files: readonly string[];
  os: readonly string[];
  cpu: readonly string[];
  libc?: readonly string[];
}
