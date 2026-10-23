import { defineTool } from '@usemcpkit/core';

export const issuesErrorTrackingCreateProjectsErrorTrackingClientKeys = defineTool({
  name: 'issues:error_tracking:create_projects_error_tracking_client_keys',
  description:
    'Create a client key. Creates a client key for integrated error tracking in a specified project. The public key attribute is generated automatically.',
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
    method: 'POST',
    path: '/projects/{id}/error_tracking/client_keys',
  },
});
