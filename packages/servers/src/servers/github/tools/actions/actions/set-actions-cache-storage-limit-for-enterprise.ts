import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetActionsCacheStorageLimitForEnterprise = defineTool({
  name: 'actions:actions:set_actions_cache_storage_limit_for_enterprise',
  description:
    'Set GitHub Actions cache storage limit for an enterprise. Sets GitHub Actions cache storage limit for an enterprise. All organizations and repositories under this enterprise may not set a higher cache storage limit.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      max_cache_size_gb: {
        type: 'integer',
        description:
          'For repositories & organizations in an enterprise, the maximum size limit for the sum of all caches in a repository, in gigabytes.',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'PUT',
    path: '/enterprises/{enterprise}/actions/cache/storage-limit',
    body: ['max_cache_size_gb'],
  },
});
