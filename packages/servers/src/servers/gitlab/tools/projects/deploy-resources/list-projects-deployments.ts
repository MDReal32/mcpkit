import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesListProjectsDeployments = defineTool({
  name: 'projects:deploy_resources:list_projects_deployments',
  description: 'List all project deployments. Lists all deployments in a project.',
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
        default: 'id',
        enum: ['id', 'iid', 'created_at', 'updated_at', 'finished_at'],
        description: 'Sort results by the specified field.',
      },
      sort: {
        type: 'string',
        default: 'asc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
      updated_after: {
        type: 'string',
        description:
          'Return deployments updated after the specified date. Expected in ISO 8601 format (`2019-03-15T08:00:00Z`)',
      },
      updated_before: {
        type: 'string',
        description:
          'Return deployments updated before the specified date. Expected in ISO 8601 format (`2019-03-15T08:00:00Z`)',
      },
      finished_after: {
        type: 'string',
        description:
          'Return deployments finished after the specified date. Expected in ISO 8601 format (`2019-03-15T08:00:00Z`)',
      },
      finished_before: {
        type: 'string',
        description:
          'Return deployments finished before the specified date. Expected in ISO 8601 format (`2019-03-15T08:00:00Z`)',
      },
      environment: {
        type: 'string',
        description: 'Name of the environment to filter deployments by.',
      },
      status: {
        type: 'string',
        enum: ['created', 'running', 'success', 'failed', 'canceled', 'skipped', 'blocked'],
        description: 'Filter deployments by status.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/deployments',
    query: [
      'page',
      'per_page',
      'order_by',
      'sort',
      'updated_after',
      'updated_before',
      'finished_after',
      'finished_before',
      'environment',
      'status',
    ],
  },
});
