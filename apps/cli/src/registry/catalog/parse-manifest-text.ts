import { describeError, isValidManifest, validateManifest } from '@usemcpkit/core';
import type { RegistryServer } from '../types/registry-server';

/** The manifest must be valid and be the server the index says it is. */
export const parseManifestText = (server: RegistryServer, text: string) => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`${server.id}: invalid JSON: ${describeError(error)}`);
  }
  if (!isValidManifest(data)) {
    throw new Error(`${server.id}: ${validateManifest(data).join('; ')}`);
  }
  if (`${data.category}:${data.name}` !== server.id) {
    throw new Error(`${server.id}: the manifest is ${data.category}:${data.name}`);
  }
  return data;
};
