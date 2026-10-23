import { defineTool } from '@usemcpkit/core';

export const teamsListChildInOrg = defineTool({
  name: 'teams:list_child_in_org',
  description: 'List child teams. Lists the child teams of the team specified by `{team_slug}`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      team_slug: {
        type: 'string',
        description: 'The slug of the team name.',
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
    required: ['org', 'team_slug'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/teams/{team_slug}/teams',
    query: ['per_page', 'page'],
  },
});
