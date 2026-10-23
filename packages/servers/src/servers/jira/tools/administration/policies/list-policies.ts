import { defineTool } from '@usemcpkit/core';

export const administrationPoliciesListPolicies = defineTool({
  name: 'administration:policies:list_policies',
  description:
    'Get all policies. Returns a paginated summary of all known policies, including their names, descriptions, and which projects each policy is assigned to.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'the index of the first item to return (0-based, default 0)',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'the maximum number of items to return per page (default 50, max 200)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/policies',
    query: ['startAt', 'maxResults'],
  },
});
