import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningGetScanHistory = defineTool({
  name: 'security:secret_scanning:get_scan_history',
  description:
    'Get secret scanning scan history for a repository. Lists the latest default incremental and backfill scans by type for a repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/secret-scanning/scan-history',
  },
});
