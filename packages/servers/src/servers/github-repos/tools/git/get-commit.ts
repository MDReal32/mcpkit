import { defineTool } from '@usemcpkit/core';

export const gitGetCommit = defineTool({
  name: 'git:get_commit',
  description: 'Get a commit object. Gets a Git commit object.',
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
      commit_sha: {
        type: 'string',
        description: 'The SHA of the commit.',
      },
    },
    required: ['owner', 'repo', 'commit_sha'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/git/commits/{commit_sha}',
  },
});
