import { defineTool } from '@usemcpkit/core';

export const actionsGetArtifactAndLogRetentionSettingsRepository = defineTool({
  name: 'actions:get_artifact_and_log_retention_settings_repository',
  description:
    'Get artifact and log retention settings for a repository. Gets retention settings for checks, workflow runs, commit statuses, artifacts, and logs for a repository.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention',
  },
});
