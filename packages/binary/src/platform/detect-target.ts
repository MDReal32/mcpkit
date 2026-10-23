import { isMusl } from './is-musl';
import { isTarget } from './is-target';

/** The binary target for this machine, or undefined when no binary is built for it. */
export const detectTarget = async (platform: NodeJS.Platform = process.platform, arch: string = process.arch) => {
  const system = platform === 'win32' ? 'windows' : platform;
  const suffix = platform === 'linux' && (await isMusl()) ? '-musl' : '';
  const name = `${system}-${arch}${suffix}`;
  return isTarget(name) ? name : undefined;
};
