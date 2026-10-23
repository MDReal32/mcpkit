import type { Manifest } from '@usemcpkit/core';
import { describeError, isJsonObject, isValidManifest, validateManifest } from '@usemcpkit/core';
import type { ManifestFile } from '../types/manifest-file';
import type { RegistryServer } from '../types/registry-server';
import { parseManifestParts } from './parse-manifest-parts';

const checkIdentity = (server: RegistryServer, data: Pick<Manifest, 'category' | 'name'> | Record<string, unknown>) => {
  if (`${data.category}:${data.name}` !== server.id) {
    throw new Error(`${server.id}: the manifest is ${data.category}:${data.name}`);
  }
};

/** A whole manifest must be valid; a shell (a manifest with `parts` instead of tools) is validated once a part is merged in. */
export const parseManifestText = (server: RegistryServer, text: string) => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`${server.id}: invalid JSON: ${describeError(error)}`);
  }
  if (isJsonObject(data) && 'parts' in data) {
    const { parts, ...shell } = data;
    checkIdentity(server, shell);
    const file: ManifestFile = { shell, parts: parseManifestParts(parts) };
    return file;
  }
  if (!isValidManifest(data)) {
    throw new Error(`${server.id}: ${validateManifest(data).join('; ')}`);
  }
  checkIdentity(server, data);
  const file: ManifestFile = { manifest: data };
  return file;
};
