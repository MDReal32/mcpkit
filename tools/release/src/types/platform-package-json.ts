import type { PackagePublishConfig } from "./package-publish-config.ts";
import type { PackageRepository } from "./package-repository.ts";

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
