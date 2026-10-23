import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetActionsCacheRetentionLimitForEnterprise = defineTool({
  name: 'actions:actions:set_actions_cache_retention_limit_for_enterprise',
  description:
    'Set GitHub Actions cache retention limit for an enterprise. Sets GitHub Actions cache retention limit for an enterprise. All organizations and repositories under this enterprise may not set a higher cache retention limit.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      max_cache_retention_days: {
        type: 'integer',
        description:
          'For repositories & organizations in an enterprise, the maximum duration, in days, for which caches in a repository may be retained.',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'PUT',
    path: '/enterprises/{enterprise}/actions/cache/retention-limit',
    body: ['max_cache_retention_days'],
  },
});
