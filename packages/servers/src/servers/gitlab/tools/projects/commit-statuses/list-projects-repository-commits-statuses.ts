import { defineTool } from '@usemcpkit/core';

export const projectsCommitStatusesListProjectsRepositoryCommitsStatuses = defineTool({
  name: 'projects:commit_statuses:list_projects_repository_commits_statuses',
  description: 'List all commit statuses. Lists all commit statuses for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      sha: {
        type: 'string',
        description: 'Commit SHA.',
      },
      ref: {
        type: 'string',
        description: 'Name of the branch or tag. Defaults to the default branch.',
      },
      stage: {
        type: 'string',
        description: 'Filter statuses by build stage. For example, `test`.',
      },
      name: {
        type: 'string',
        description: 'Filter statuses by job name.',
      },
      pipeline_id: {
        type: 'integer',
        description: 'Filter statuses by pipeline ID.',
      },
      all: {
        type: 'boolean',
        description: 'If `true`, includes all statuses instead of only the latest.',
      },
      order_by: {
        type: 'string',
        default: 'id',
        enum: ['id', 'pipeline_id'],
        description: 'Sort results by the specified field.',
      },
      sort: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'Sort statuses in ascending or descending order. Defaults to `asc`.',
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
    required: ['id', 'sha'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/repository/commits/{sha}/statuses',
    query: ['ref', 'stage', 'name', 'pipeline_id', 'all', 'order_by', 'sort', 'page', 'per_page'],
  },
});
