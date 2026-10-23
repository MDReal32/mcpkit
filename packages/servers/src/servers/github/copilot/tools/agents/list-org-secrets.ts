import { defineTool } from '@usemcpkit/core';

export const agentsListOrgSecrets = defineTool({
  name: 'agents:list_org_secrets',
  description:
    'List organization secrets. Lists all secrets available in an organization without revealing their encrypted values.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
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
    path: '/orgs/{org}/agents/secrets',
    query: ['per_page', 'page'],
  },
});
