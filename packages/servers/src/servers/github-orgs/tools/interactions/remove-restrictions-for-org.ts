import { defineTool } from '@usemcpkit/core';

export const interactionsRemoveRestrictionsForOrg = defineTool({
  name: 'interactions:remove_restrictions_for_org',
  description:
    'Remove interaction restrictions for an organization. Removes all interaction restrictions from public repositories in the given organization. You must be an organization owner to remove restrictions.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/interaction-limits',
  },
});
