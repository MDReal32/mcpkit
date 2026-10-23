import type { Manifest } from './types/manifest';
import { validateManifest } from './validation/validate-manifest';

export const isValidManifest = (value: unknown): value is Manifest => validateManifest(value).length === 0;
