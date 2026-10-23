import { METADATA_TIMEOUT_MS, NOT_FOUND_STATUS, NPM_METADATA_ACCEPT } from '../const';
import { readPackageRelease } from './read-package-release';

export const fetchPackageRelease = async (
  registry: string,
  packageName: string,
  versionOrTag: string,
  fetchImpl: typeof fetch,
) => {
  const url = `${registry}/${packageName.replace('/', '%2f')}`;
  const response = await fetchImpl(url, {
    headers: { Accept: NPM_METADATA_ACCEPT },
    signal: AbortSignal.timeout(METADATA_TIMEOUT_MS),
  });
  if (response.status === NOT_FOUND_STATUS) {
    throw new Error(`${packageName} is not published on ${registry}; install from a local build with --binary <path>`);
  }
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }
  return readPackageRelease(await response.json(), packageName, versionOrTag);
};
