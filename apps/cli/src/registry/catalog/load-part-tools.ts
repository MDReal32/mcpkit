import { describeError, isJsonObject } from '@usemcpkit/core';
import { hashText } from '../ids/hash-text';
import { readCachedPartText } from '../local/read-cached-part-text';
import { writeCachedPart } from '../local/write-cached-part';
import { fetchText } from '../remote/fetch-text';
import type { ManifestPart } from '../types/manifest-part';
import type { RegistryContext } from '../types/registry-context';
import type { RegistryServer } from '../types/registry-server';
import { resolveRegistryLink } from './resolve-registry-link';

const parseTools = (server: RegistryServer, part: ManifestPart, text: string) => {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error(`${server.id}: part ${part.name}: invalid JSON: ${describeError(error)}`);
  }
  const tools = isJsonObject(data) ? data.tools : undefined;
  if (!Array.isArray(tools)) {
    throw new Error(`${server.id}: part ${part.name} must contain a "tools" array`);
  }
  return tools;
};

/** The cached part when it matches the checksum its shell lists, otherwise a verified download that replaces it. */
export const loadPartTools = async (server: RegistryServer, part: ManifestPart, context: RegistryContext) => {
  const cached = await readCachedPartText(context.dir, server.id, part.name);
  if (cached !== undefined && hashText(cached) === part.sha256) {
    return parseTools(server, part, cached);
  }
  const url = resolveRegistryLink(context, part.url);
  const text = await fetchText(url, context.fetchImpl);
  if (hashText(text) !== part.sha256) {
    throw new Error(`${server.id}: ${url} does not match the checksum in the manifest`);
  }
  const tools = parseTools(server, part, text);
  await writeCachedPart(context.dir, server.id, part.name, text);
  return tools;
};
