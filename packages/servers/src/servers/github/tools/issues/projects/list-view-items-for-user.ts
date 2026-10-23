import { defineTool } from '@usemcpkit/core';

export const issuesProjectsListViewItemsForUser = defineTool({
  name: 'issues:projects:list_view_items_for_user',
  description: "List items for a user project view. List items in a user project with the saved view's filter applied.",
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
      view_number: {
        type: 'integer',
        description: 'The number that identifies the project view.',
      },
      fields: {
        description:
          'Limit results to specific fields, by their IDs. If not specified, the title field will be returned.',
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
    required: ['project_number', 'username', 'view_number'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/projectsV2/{project_number}/views/{view_number}/items',
    query: ['fields', 'before', 'after', 'per_page'],
  },
});
