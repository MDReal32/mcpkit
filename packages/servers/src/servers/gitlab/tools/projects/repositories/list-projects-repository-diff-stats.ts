import { defineTool } from '@usemcpkit/core';

export const projectsRepositoriesListProjectsRepositoryDiffStats = defineTool({
  name: 'projects:repositories:list_projects_repository_diff_stats',
  description:
    'Get diff statistics between two commits. Returns the number of added and deleted lines for every file that differs between two refs.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      from: {
        type: 'string',
        description: 'The commit SHA or branch/tag to compare from',
      },
      to: {
        type: 'string',
        description: 'The commit SHA or branch/tag to compare to',
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
    required: ['id', 'from', 'to'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/diff_stats',
    query: ['from', 'to', 'page', 'per_page'],
  },
});
