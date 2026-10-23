import { defineTool } from '@usemcpkit/core';

export const interactionsRemoveRestrictionsForRepo = defineTool({
  name: 'interactions:remove_restrictions_for_repo',
  description:
    'Remove interaction restrictions for a repository. Removes all interaction restrictions from the given repository. You must have owner or admin access to remove restrictions. If the interaction limit is set for the user or organization that owns this repository, you will receive a `409 Conflict` response and will not be able to use this endpoint to change the interaction limit for a single repository.',
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
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/interaction-limits',
  },
});
