import { defineTool } from '@usemcpkit/core';

export const issuesProjectsListItemsForOrg = defineTool({
  name: 'issues:projects:list_items_for_org',
  description:
    'List items for an organization owned project. List all items for a specific organization-owned project accessible by the authenticated user.',
  input: {
    type: 'object',
    properties: {
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      q: {
        type: 'string',
        description: 'Search query to filter items, see Filtering projects for more information.',
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
    required: ['project_number', 'org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/projectsV2/{project_number}/items',
    query: ['q', 'fields', 'before', 'after', 'per_page'],
  },
});
