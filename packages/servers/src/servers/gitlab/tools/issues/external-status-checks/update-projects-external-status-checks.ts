import { defineTool } from '@usemcpkit/core';

export const issuesExternalStatusChecksUpdateProjectsExternalStatusChecks = defineTool({
  name: 'issues:external_status_checks:update_projects_external_status_checks',
  description: 'Update external status check service. Updates an existing external status check for a project.',
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
      name: {
        type: 'string',
        description: 'Display name of the external status check service.',
      },
      shared_secret: {
        type: 'string',
        description: 'HMAC secret for the external status check.',
      },
      external_url: {
        type: 'string',
        description: 'URL of the external status check service.',
      },
      protected_branch_ids: {
        type: 'array',
        description: 'IDs of protected branches to scope the rule by.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['id', 'check_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/external_status_checks/{check_id}',
    body: ['name', 'shared_secret', 'external_url', 'protected_branch_ids'],
  },
});
