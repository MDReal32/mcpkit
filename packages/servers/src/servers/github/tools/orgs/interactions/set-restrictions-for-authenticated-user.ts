import { defineTool } from '@usemcpkit/core';

export const orgsInteractionsSetRestrictionsForAuthenticatedUser = defineTool({
  name: 'orgs:interactions:set_restrictions_for_authenticated_user',
  description:
    'Set interaction restrictions for your public repositories. Temporarily restricts which type of GitHub user can interact with your public repositories. Setting the interaction limit at the user level will overwrite any interaction limits that are set for individual repositories owned by the user.',
  input: {
    type: 'object',
    properties: {
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
    required: ['limit'],
  },
  request: {
    method: 'PUT',
    path: '/user/interaction-limits',
    body: ['limit', 'expiry'],
  },
});
