import { defineTool } from '@usemcpkit/core';

export const teamsListChildLegacy = defineTool({
  name: 'teams:list_child_legacy',
  description:
    '[Deprecated] List child teams (Legacy). > [!WARNING] > **Endpoint closing down notice:** This endpoint route is closing down and will be removed from the Teams API. We recommend migrating your existing code to use the new `List child teams` endpoint.',
  input: {
    type: 'object',
    properties: {
      team_id: {
        type: 'integer',
        description: 'The unique identifier of the team.',
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
    required: ['team_id'],
  },
  request: {
    method: 'GET',
    path: '/teams/{team_id}/teams',
    query: ['per_page', 'page'],
  },
});
