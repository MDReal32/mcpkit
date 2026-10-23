import { defineTool } from '@usemcpkit/core';

export const projectsReleasesListProjectsReleases = defineTool({
  name: 'projects:releases:list_projects_releases',
  description: 'List all releases in a project. Lists all releases for a specified project. Sorted by `released_at`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
      order_by: {
        type: 'string',
        default: 'released_at',
        enum: ['released_at', 'created_at'],
        description: 'Sort results by the specified field.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      include_html_description: {
        type: 'boolean',
        description: 'If `true`, the response includes HTML-rendered Markdown of the release description.',
      },
      updated_before: {
        type: 'string',
        description: 'Return releases updated on or before the specified time.',
      },
      updated_after: {
        type: 'string',
        description: 'Return releases updated on or after the specified time.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/releases',
    query: ['page', 'per_page', 'order_by', 'sort', 'include_html_description', 'updated_before', 'updated_after'],
  },
});
