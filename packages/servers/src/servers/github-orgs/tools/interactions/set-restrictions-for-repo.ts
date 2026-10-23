import { defineTool } from '@usemcpkit/core';

export const interactionsSetRestrictionsForRepo = defineTool({
  name: 'interactions:set_restrictions_for_repo',
  description:
    'Set interaction restrictions for a repository. Temporarily restricts interactions to a certain type of GitHub user within the given repository. You must have owner or admin access to set these restrictions. If an interaction limit is set for the user or organization that owns this repository, you will receive a `409 Conflict` response and will not be able to use this endpoint to change the interaction limit for a single repository.',
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
    required: ['owner', 'repo', 'limit'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/interaction-limits',
    body: ['limit', 'expiry'],
  },
});
