import { realpath } from 'node:fs/promises';
import { findPackageManagerInstall } from './find-package-manager-install';
import { isCompiledBinary } from './is-compiled-binary';

/** Resolves undefined unless this process is a binary that Homebrew or winget installed. */
export const detectPackageManagerInstall = async (execPath: string = process.execPath) => {
  if (!isCompiledBinary(execPath)) {
    return undefined;
  }
  return findPackageManagerInstall(await realpath(execPath));
};
