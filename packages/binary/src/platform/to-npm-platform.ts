import type { NpmPlatform } from './types/npm-platform';
import type { Target } from './types/target';

/** The `os`/`cpu`/`libc` fields npm uses to pick the package for a machine. */
export const toNpmPlatform = (target: Target) => {
  const [system = '', cpu = '', libc] = target.split('-');
  const linuxLibc = libc === 'musl' ? 'musl' : 'glibc';
  const platform: NpmPlatform = {
    os: system === 'windows' ? 'win32' : system,
    cpu,
    ...(system === 'linux' ? { libc: linuxLibc } : {}),
  };
  return platform;
};
