import { defineTool } from '@usemcpkit/core';

export const issuesExternalStatusChecksDeleteProjectsExternalStatusChecks = defineTool({
  name: 'issues:external_status_checks:delete_projects_external_status_checks',
  description: 'Delete external status check service. Deletes a specified external status check service for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      check_id: {
        type: 'integer',
        description: 'ID of the external status check.',
      },
    },
    required: ['id', 'check_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/external_status_checks/{check_id}',
  },
});
