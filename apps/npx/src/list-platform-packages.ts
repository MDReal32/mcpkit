import { PLATFORM_PACKAGE_PREFIX } from "./const";

/**
 * The platform packages that may hold this machine's binary, in the order to try them. On Linux both the glibc and the
 * musl package are named: npm installs only the one whose `libc` matches, so the first that resolves is the right one.
 */
export const listPlatformPackages = (platform: NodeJS.Platform, arch: string) => {
  const system = platform === "win32" ? "windows" : platform;
  const target = `${system}-${arch}`;
  const targets = platform === "linux" ? [target, `${target}-musl`] : [target];
  return targets.map((name) => `${PLATFORM_PACKAGE_PREFIX}${name}`);
};
