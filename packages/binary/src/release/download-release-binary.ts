import { gunzipSync } from 'node:zlib';
import { DOWNLOAD_TIMEOUT_MS, TARBALL_ROOT } from '../const';
import type { Target } from '../platform';
import { PLATFORM_PACKAGE_BIN_DIR, toBinaryFileName } from '../platform';
import { extractTarFile } from '../tar/extract-tar-file';
import type { PackageRelease } from '../types/package-release';
import { verifyIntegrity } from './verify-integrity';

export const downloadReleaseBinary = async (release: PackageRelease, target: Target, fetchImpl: typeof fetch) => {
  const response = await fetchImpl(release.tarball, { signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS) });
  if (!response.ok) {
    throw new Error(`GET ${release.tarball} failed: ${response.status}`);
  }
  const tarball = new Uint8Array(await response.arrayBuffer());
  verifyIntegrity(tarball, release.integrity, release.tarball);
  const entryPath = `${TARBALL_ROOT}/${PLATFORM_PACKAGE_BIN_DIR}/${toBinaryFileName(target)}`;
  return extractTarFile(gunzipSync(tarball), entryPath);
};
