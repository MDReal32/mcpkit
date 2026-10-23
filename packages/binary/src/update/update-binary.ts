import { compareVersions } from '@usemcpkit/core';
import { LATEST_TAG } from '../const';
import { writeBinaryFile } from '../install/write-binary-file';
import { downloadReleaseBinary } from '../release/download-release-binary';
import { fetchTargetRelease } from '../release/fetch-target-release';
import type { BinaryContext } from '../types/binary-context';
import type { BinaryUpdateResult } from '../types/binary-update-result';

/** Replaces the binary at `path` with the latest published release when it is newer than `currentVersion`. */
export const updateBinary = async (context: BinaryContext, path: string, currentVersion: string) => {
  const release = await fetchTargetRelease(context, LATEST_TAG);
  if (compareVersions(release.version, currentVersion) <= 0) {
    const upToDate: BinaryUpdateResult = { status: 'up-to-date', version: currentVersion };
    return upToDate;
  }
  await writeBinaryFile(path, await downloadReleaseBinary(release, context.target, context.fetchImpl));
  const updated: BinaryUpdateResult = { status: 'updated', from: currentVersion, to: release.version, path };
  return updated;
};
