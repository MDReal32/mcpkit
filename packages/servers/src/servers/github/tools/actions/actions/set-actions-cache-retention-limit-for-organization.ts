import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetActionsCacheRetentionLimitForOrganization = defineTool({
  name: 'actions:actions:set_actions_cache_retention_limit_for_organization',
  description:
    'Set GitHub Actions cache retention limit for an organization. Sets GitHub Actions cache retention limit for an organization. All repositories under this organization may not set a higher cache retention limit.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      max_cache_retention_days: {
        type: 'integer',
        description:
          'For repositories in this organization, the maximum duration, in days, for which caches in a repository may be retained.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'PUT',
    path: '/organizations/{org}/actions/cache/retention-limit',
    body: ['max_cache_retention_days'],
  },
});
