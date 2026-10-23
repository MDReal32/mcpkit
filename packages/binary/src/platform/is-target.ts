import { TARGETS } from './const';
import type { Target } from './types/target';

export const isTarget = (value: string): value is Target => TARGETS.some((target) => target === value);
