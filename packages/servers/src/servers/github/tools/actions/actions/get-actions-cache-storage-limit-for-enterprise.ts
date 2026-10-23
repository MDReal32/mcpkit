import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetActionsCacheStorageLimitForEnterprise = defineTool({
  name: 'actions:actions:get_actions_cache_storage_limit_for_enterprise',
  description:
    'Get GitHub Actions cache storage limit for an enterprise. Gets GitHub Actions cache storage limit for an enterprise. All organizations and repositories under this enterprise may not set a higher cache storage limit.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/actions/cache/storage-limit',
  },
});
