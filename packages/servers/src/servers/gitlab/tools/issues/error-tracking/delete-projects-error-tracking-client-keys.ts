import { defineTool } from '@usemcpkit/core';

export const issuesErrorTrackingDeleteProjectsErrorTrackingClientKeys = defineTool({
  name: 'issues:error_tracking:delete_projects_error_tracking_client_keys',
  description: 'Delete a client key. Deletes an integrated error tracking client key from a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      key_id: {
        type: 'integer',
        description: 'ID of the client key.',
      },
    },
    required: ['id', 'key_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/error_tracking/client_keys/{key_id}',
  },
});
