import { defineTool } from '@usemcpkit/core';

export const agentsListOrgVariables = defineTool({
  name: 'agents:list_org_variables',
  description:
    'List organization variables. Lists all agent variables available in an organization. Returned variables include their values.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 10,
        description:
          'The number of results per page (max 30). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/agents/variables',
    query: ['per_page', 'page'],
  },
});
