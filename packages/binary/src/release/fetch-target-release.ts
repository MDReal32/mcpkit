import { toPlatformPackageName } from '../platform';
import type { BinaryContext } from '../types/binary-context';
import { fetchPackageRelease } from './fetch-package-release';
import { resolveNpmRegistry } from './resolve-npm-registry';

export const fetchTargetRelease = (context: BinaryContext, versionOrTag: string) =>
  fetchPackageRelease(
    resolveNpmRegistry(context.env),
    toPlatformPackageName(context.target),
    versionOrTag,
    context.fetchImpl,
  );
