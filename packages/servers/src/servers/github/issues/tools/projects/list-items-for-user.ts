import { defineTool } from '@usemcpkit/core';

export const projectsListItemsForUser = defineTool({
  name: 'projects:list_items_for_user',
  description:
    'List items for a user owned project. List all items for a specific user-owned project accessible by the authenticated user.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
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
      q: {
        type: 'string',
        description: 'Search query to filter items, see Filtering projects for more information.',
      },
      fields: {
        description:
          'Limit results to specific fields, by their IDs. If not specified, the title field will be returned.',
      },
    },
    required: ['project_number', 'username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/projectsV2/{project_number}/items',
    query: ['before', 'after', 'per_page', 'q', 'fields'],
  },
});
