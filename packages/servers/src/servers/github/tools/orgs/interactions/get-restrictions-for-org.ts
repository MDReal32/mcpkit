import { defineTool } from '@usemcpkit/core';

export const orgsInteractionsGetRestrictionsForOrg = defineTool({
  name: 'orgs:interactions:get_restrictions_for_org',
  description:
    'Get interaction restrictions for an organization. Shows which type of GitHub user can interact with this organization and when the restriction expires. If there is no restrictions, you will see an empty response.',
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
    method: 'GET',
    path: '/orgs/{org}/interaction-limits',
  },
});
