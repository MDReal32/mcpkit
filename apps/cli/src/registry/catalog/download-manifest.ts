import { hashText } from '../ids/hash-text';
import { writeCachedManifest } from '../local/write-cached-manifest';
import { fetchText } from '../remote/fetch-text';
import type { RegistryContext } from '../types/registry-context';
import type { RegistryServer } from '../types/registry-server';
import { parseManifestText } from './parse-manifest-text';

/** Nothing is cached unless it matches the index hash and validates. */
export const downloadManifest = async (server: RegistryServer, { dir, registryUrl, fetchImpl }: RegistryContext) => {
  const url = new URL(server.url, `${registryUrl.replace(/\/$/, '')}/`).href;
  const text = await fetchText(url, fetchImpl);
  if (hashText(text) !== server.sha256) {
    throw new Error(`${server.id}: ${url} does not match the index checksum`);
  }
  const manifest = parseManifestText(server, text);
  await writeCachedManifest(dir, server.id, text);
  return manifest;
};
