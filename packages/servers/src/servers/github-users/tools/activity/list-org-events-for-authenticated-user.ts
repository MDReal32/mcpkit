import { defineTool } from '@usemcpkit/core';

export const activityListOrgEventsForAuthenticatedUser = defineTool({
  name: 'activity:list_org_events_for_authenticated_user',
  description:
    "List organization events for the authenticated user. This is the user's organization dashboard. You must be authenticated as the user to view this.",
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
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
    required: ['username', 'org'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/events/orgs/{org}',
    query: ['per_page', 'page'],
  },
});
