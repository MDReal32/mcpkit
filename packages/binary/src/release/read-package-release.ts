import { isJsonObject } from '@usemcpkit/core';
import type { PackageRelease } from '../types/package-release';

/** Picks one version's dist info out of npm package metadata; `versionOrTag` may be a dist-tag such as `latest`. */
export const readPackageRelease = (metadata: unknown, packageName: string, versionOrTag: string) => {
  if (!isJsonObject(metadata) || !isJsonObject(metadata.versions)) {
    throw new Error(`${packageName}: the registry answered without a versions list`);
  }
  const tags = isJsonObject(metadata['dist-tags']) ? metadata['dist-tags'] : {};
  const tagged = tags[versionOrTag];
  const version = typeof tagged === 'string' ? tagged : versionOrTag;
  const entry = metadata.versions[version];
  const dist = isJsonObject(entry) ? entry.dist : undefined;
  if (!isJsonObject(dist) || typeof dist.tarball !== 'string' || typeof dist.integrity !== 'string') {
    throw new Error(`${packageName}@${version} is not published`);
  }
  const release: PackageRelease = { version, tarball: dist.tarball, integrity: dist.integrity };
  return release;
};
