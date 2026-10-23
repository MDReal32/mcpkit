import { defineTool } from '@usemcpkit/core';

export const orgsListMembershipsForAuthenticatedUser = defineTool({
  name: 'orgs:list_memberships_for_authenticated_user',
  description:
    "List organization memberships for the authenticated user. Lists all of the authenticated user's organization memberships.",
  input: {
    type: 'object',
    properties: {
      state: {
        type: 'string',
        enum: ['active', 'pending'],
        description:
          'Indicates the state of the memberships to return. If not specified, the API returns both active and pending memberships.',
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
  },
  request: {
    method: 'GET',
    path: '/user/memberships/orgs',
    query: ['state', 'per_page', 'page'],
  },
});
