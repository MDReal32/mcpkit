import type { AuthSpec, Manifest } from '@usemcpkit/core';

export const createPingManifest = (version: string, description = '', name = 'demo', auth?: readonly AuthSpec[]) => {
  const manifest: Manifest = {
    name,
    category: 'test',
    version,
    description,
    baseUrl: 'https://api.example.com',
    auth,
    tools: [
      {
        name: 'ping',
        description: 'Ping',
        input: { type: 'object', properties: {} },
        request: { method: 'GET', path: '/ping' },
      },
    ],
  };
  return manifest;
};
