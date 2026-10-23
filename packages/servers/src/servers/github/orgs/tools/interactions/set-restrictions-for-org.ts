import { defineTool } from '@usemcpkit/core';

export const interactionsSetRestrictionsForOrg = defineTool({
  name: 'interactions:set_restrictions_for_org',
  description:
    'Set interaction restrictions for an organization. Temporarily restricts interactions to a certain type of GitHub user in any public repository in the given organization. You must be an organization owner to set these restrictions. Setting the interaction limit at the organization level will overwrite any interaction limits that are set for individual repositories owned by the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      limit: {
        type: 'string',
        description:
          'The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.',
        enum: ['existing_users', 'contributors_only', 'collaborators_only'],
      },
      expiry: {
        type: 'string',
        description: 'The duration of the interaction restriction. Default: `one_day`.',
        enum: ['one_day', 'three_days', 'one_week', 'one_month', 'six_months'],
      },
    },
    required: ['org', 'limit'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/interaction-limits',
    body: ['limit', 'expiry'],
  },
});
