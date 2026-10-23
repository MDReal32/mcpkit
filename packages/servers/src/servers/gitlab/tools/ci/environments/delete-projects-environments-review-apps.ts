import { defineTool } from '@usemcpkit/core';

export const ciEnvironmentsDeleteProjectsEnvironmentsReviewApps = defineTool({
  name: 'ci:environments:delete_projects_environments_review_apps',
  description:
    'Schedule multiple stopped review apps for deletion. Schedules multiple stopped review apps for deletion. The deletion is performed after 1 week. By default, only environments 30 days or older are deleted.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      before: {
        type: 'string',
        description: 'Date before which environments can be deleted. Defaults to 30 days ago.',
      },
      limit: {
        type: 'integer',
        default: 100,
        description: 'Maximum number of environments to delete.',
      },
      dry_run: {
        type: 'boolean',
        default: true,
        description:
          'If `true`, performs a dry run where no deletion is actually performed. If `false`, deletes the environment.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/environments/review_apps',
    query: ['before', 'limit', 'dry_run'],
  },
});
