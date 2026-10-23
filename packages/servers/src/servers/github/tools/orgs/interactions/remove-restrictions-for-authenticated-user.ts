import { defineTool } from '@usemcpkit/core';

export const orgsInteractionsRemoveRestrictionsForAuthenticatedUser = defineTool({
  name: 'orgs:interactions:remove_restrictions_for_authenticated_user',
  description:
    'Remove interaction restrictions from your public repositories. Removes any interaction restrictions from your public repositories.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/user/interaction-limits',
  },
});
