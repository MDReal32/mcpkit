import { isJsonObject } from '@usemcpkit/core';
import { PART_NAME_PATTERN, SHA256_PATTERN } from '../const';
import type { ManifestPart } from '../types/manifest-part';

const parsePart = (entry: unknown, label: string) => {
  if (!isJsonObject(entry)) {
    throw new Error(`${label} must be an object`);
  }
  const { name, url, sha256 } = entry;
  if (typeof name !== 'string' || !PART_NAME_PATTERN.test(name)) {
    throw new Error(`${label}.name must match ${PART_NAME_PATTERN}`);
  }
  if (typeof url !== 'string') {
    throw new Error(`${label}.url must be a string`);
  }
  if (typeof sha256 !== 'string' || !SHA256_PATTERN.test(sha256)) {
    throw new Error(`${label}.sha256 must be a hex SHA-256`);
  }
  const part: ManifestPart = { name, url, sha256 };
  return part;
};

export const parseManifestParts = (parts: unknown) => {
  if (!Array.isArray(parts) || parts.length === 0) {
    throw new Error('"parts" must be a non-empty array');
  }
  return parts.map((part, position) => parsePart(part, `parts[${position}]`));
};
