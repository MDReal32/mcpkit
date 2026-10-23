import { defineTool } from '@usemcpkit/core';

export const issuesErrorTrackingListProjectsErrorTrackingClientKeys = defineTool({
  name: 'issues:error_tracking:list_projects_error_tracking_client_keys',
  description: 'List all project client keys. Lists all integrated error tracking client keys for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/error_tracking/client_keys',
  },
});
