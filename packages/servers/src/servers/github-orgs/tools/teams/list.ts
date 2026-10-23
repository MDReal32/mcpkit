import { defineTool } from '@usemcpkit/core';

export const teamsList = defineTool({
  name: 'teams:list',
  description: 'List teams. Lists all teams in an organization that are visible to the authenticated user.',
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
      team_type: {
        type: 'string',
        default: 'all',
        enum: ['all', 'enterprise', 'organization'],
        description: 'Filter team results by their type. For more information, see "What kind of team should I use?"',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/teams',
    query: ['per_page', 'page', 'team_type'],
  },
});
