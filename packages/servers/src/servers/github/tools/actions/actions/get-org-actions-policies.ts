import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetOrgActionsPolicies = defineTool({
  name: 'actions:actions:get_org_actions_policies',
  description: 'List organization Actions policies. List all Actions policies for an organization.',
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
      has_parents: {
        type: 'boolean',
        default: true,
        description: 'Include policies configured at higher levels that apply to this organization',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/policies',
    query: ['per_page', 'page', 'has_parents'],
  },
});
