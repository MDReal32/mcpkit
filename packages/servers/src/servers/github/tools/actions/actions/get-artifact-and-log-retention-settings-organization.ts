import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetArtifactAndLogRetentionSettingsOrganization = defineTool({
  name: 'actions:actions:get_artifact_and_log_retention_settings_organization',
  description:
    'Get artifact and log retention settings for an organization. Gets retention settings for checks, workflow runs, commit statuses, artifacts, and logs for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/permissions/artifact-and-log-retention',
  },
});
