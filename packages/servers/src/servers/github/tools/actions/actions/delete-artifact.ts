import { defineTool } from '@usemcpkit/core';

export const actionsActionsDeleteArtifact = defineTool({
  name: 'actions:actions:delete_artifact',
  description:
    'Delete an artifact. Deletes an artifact for a workflow run. OAuth tokens and personal access tokens (classic) need the `repo` scope to use this endpoint.',
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
      artifact_id: {
        type: 'integer',
        description: 'The unique identifier of the artifact.',
      },
    },
    required: ['owner', 'repo', 'artifact_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/actions/artifacts/{artifact_id}',
  },
});
