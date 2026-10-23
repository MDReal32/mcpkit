import { defineTool } from '@usemcpkit/core';

export const ciCiJobsListProjectsJobs = defineTool({
  name: 'ci:ci_jobs:list_projects_jobs',
  description:
    'List all jobs for a project. Lists all jobs for a specified project. By default, this request returns 20 results at a time because the API results are paginated.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      scope: {
        type: 'string',
        description:
          'Filter jobs by status. Accepts a single value or an array of values. If omitted, returns all jobs. (comma-separated)',
      },
      ref: {
        type: 'string',
        description: 'Branch name (ref) to filter jobs by.',
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
    path: '/projects/{id}/jobs',
    query: ['scope', 'ref', 'page', 'per_page'],
  },
});
