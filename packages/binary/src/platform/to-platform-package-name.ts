import { PLATFORM_PACKAGE_PREFIX } from './const';
import type { Target } from './types/target';

export const toPlatformPackageName = (target: Target) => `${PLATFORM_PACKAGE_PREFIX}${target}`;
