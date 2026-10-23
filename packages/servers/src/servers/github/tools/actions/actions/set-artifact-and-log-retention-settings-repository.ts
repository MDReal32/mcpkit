import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetArtifactAndLogRetentionSettingsRepository = defineTool({
  name: 'actions:actions:set_artifact_and_log_retention_settings_repository',
  description:
    'Set artifact and log retention settings for a repository. Sets retention settings for checks, workflow runs, commit statuses, artifacts, and logs for a repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      days: {
        type: 'integer',
        description: 'The number of days to retain checks, workflow runs, commit statuses, artifacts, and logs',
      },
    },
    required: ['owner', 'repo', 'days'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention',
    body: ['days'],
  },
});
