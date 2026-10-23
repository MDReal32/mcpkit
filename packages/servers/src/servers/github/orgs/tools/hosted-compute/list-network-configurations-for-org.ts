import { defineTool } from '@usemcpkit/core';

export const hostedComputeListNetworkConfigurationsForOrg = defineTool({
  name: 'hosted_compute:list_network_configurations_for_org',
  description:
    'List hosted compute network configurations for an organization. Lists all hosted compute network configurations configured in an organization.',
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
    path: '/orgs/{org}/settings/network-configurations',
    query: ['per_page', 'page'],
  },
});
