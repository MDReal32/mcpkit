import { defineTool } from '@usemcpkit/core';

export const gitGetBlob = defineTool({
  name: 'git:get_blob',
  description: 'Get a blob. The `content` in the response will always be Base64 encoded.',
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
      file_sha: {
        type: 'string',
      },
    },
    required: ['owner', 'repo', 'file_sha'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/git/blobs/{file_sha}',
  },
});
