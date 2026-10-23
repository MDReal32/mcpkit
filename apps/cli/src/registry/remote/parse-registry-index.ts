import { isJsonObject } from '@usemcpkit/core';
import { SERVER_ID_PATTERN, SHA256_PATTERN } from '../const';
import type { RegistryIndex } from '../types/registry-index';
import type { RegistryServer } from '../types/registry-server';

const parseServer = (entry: unknown, position: number) => {
  const label = `registry index servers[${position}]`;
  if (!isJsonObject(entry)) {
    throw new Error(`${label} must be an object`);
  }
  const { id, version, description, tools, url, sha256 } = entry;
  if (typeof id !== 'string' || !SERVER_ID_PATTERN.test(id)) {
    throw new Error(`${label}.id must match ${SERVER_ID_PATTERN}`);
  }
  if (typeof version !== 'string' || typeof url !== 'string') {
    throw new Error(`${label} (${id}) needs string "version" and "url"`);
  }
  if (typeof sha256 !== 'string' || !SHA256_PATTERN.test(sha256)) {
    throw new Error(`${label} (${id}).sha256 must be a hex SHA-256`);
  }
  if (!Array.isArray(tools) || !tools.every((tool) => typeof tool === 'string')) {
    throw new Error(`${label} (${id}).tools must be an array of tool names`);
  }
  if (description !== undefined && typeof description !== 'string') {
    throw new Error(`${label} (${id}).description must be a string`);
  }
  const server: RegistryServer = {
    id,
    version,
    url,
    sha256,
    tools,
    ...(description === undefined ? {} : { description }),
  };
  return server;
};

export const parseRegistryIndex = (body: unknown) => {
  const servers = isJsonObject(body) ? body.servers : undefined;
  if (!Array.isArray(servers)) {
    throw new Error('registry index.json must contain a "servers" array');
  }
  const index: RegistryIndex = { servers: servers.map(parseServer) };
  return index;
};
