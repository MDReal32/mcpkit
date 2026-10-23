import { readFile } from 'node:fs/promises';
import { downloadReleaseBinary } from '../release/download-release-binary';
import { fetchTargetRelease } from '../release/fetch-target-release';
import type { BinaryContext } from '../types/binary-context';
import type { BinarySource } from '../types/binary-source';
import { isCompiledBinary } from './is-compiled-binary';

/** An explicit path wins, then the running compiled binary, then the published release of `source.version`. */
export const readInstallSourceBytes = async (context: BinaryContext, source: BinarySource) => {
  if (source.path) {
    return readFile(source.path);
  }
  if (isCompiledBinary()) {
    return readFile(process.execPath);
  }
  const release = await fetchTargetRelease(context, source.version);
  return downloadReleaseBinary(release, context.target, context.fetchImpl);
};
