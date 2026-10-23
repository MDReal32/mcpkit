import { defineTool } from '@usemcpkit/core';

export const gitCreateRef = defineTool({
  name: 'git:create_ref',
  description:
    'Create a reference. Creates a reference for your repository. You are unable to create new references for empty repositories, even if the commit SHA-1 hash used exists. Empty repositories are repositories without branches.',
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
      ref: {
        type: 'string',
        description:
          "The name of the fully qualified reference (ie: `refs/heads/master`). If it doesn't start with 'refs' and have at least two slashes, it will be rejected.",
      },
      sha: {
        type: 'string',
        description: 'The SHA1 value for this reference.',
      },
    },
    required: ['owner', 'repo', 'ref', 'sha'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/git/refs',
    body: ['ref', 'sha'],
  },
});
