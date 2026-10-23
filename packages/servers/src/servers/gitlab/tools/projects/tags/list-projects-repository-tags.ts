import { defineTool } from '@usemcpkit/core';

export const projectsTagsListProjectsRepositoryTags = defineTool({
  name: 'projects:tags:list_projects_repository_tags',
  description:
    'List all project repository tags. Lists all repository tags from a project, sorted by update date and time in descending order.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      order_by: {
        type: 'string',
        default: 'updated',
        enum: ['name', 'updated', 'version'],
        description: 'Sort results by the specified field. Sorting by version uses the semantic version number.',
      },
      search: {
        type: 'string',
        description:
          'Return only tags matching the search criteria. Use `^term` to find tags that begin with `term`, and `term$` to find tags that end with `term`. No other regular expressions are supported.',
      },
      page_token: {
        type: 'string',
        description: 'Name of the tag to start the pagination from. Used for keyset pagination.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/tags',
    query: ['sort', 'order_by', 'search', 'page_token', 'page', 'per_page'],
  },
});
