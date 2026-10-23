import { defineTool } from '@usemcpkit/core';

export const projectsListForUser = defineTool({
  name: 'projects:list_for_user',
  description:
    'List projects for user. List all projects owned by a specific user accessible by the authenticated user.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      q: {
        type: 'string',
        description: 'Limit results to projects of the specified type.',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/projectsV2',
    query: ['q', 'before', 'after', 'per_page'],
  },
});
