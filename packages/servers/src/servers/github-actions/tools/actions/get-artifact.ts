import { defineTool } from '@usemcpkit/core';

export const actionsGetArtifact = defineTool({
  name: 'actions:get_artifact',
  description: 'Get an artifact. Gets a specific artifact for a workflow run.',
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
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/artifacts/{artifact_id}',
  },
});
