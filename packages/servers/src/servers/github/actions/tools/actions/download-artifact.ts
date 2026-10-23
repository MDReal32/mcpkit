import { defineTool } from '@usemcpkit/core';

export const actionsDownloadArtifact = defineTool({
  name: 'actions:download_artifact',
  description:
    'Download an artifact. Gets a redirect URL to download an archive for a repository. This URL expires after 1 minute. Look for `Location:` in the response header to find the URL for the download. The `:archive_format` must be `zip`.',
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
      archive_format: {
        type: 'string',
      },
    },
    required: ['owner', 'repo', 'artifact_id', 'archive_format'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}',
  },
});
