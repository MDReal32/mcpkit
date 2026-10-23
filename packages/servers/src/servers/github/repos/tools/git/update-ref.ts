import { defineTool } from '@usemcpkit/core';

export const gitUpdateRef = defineTool({
  name: 'git:update_ref',
  description:
    'Update a reference. Updates the provided reference to point to a new SHA. For more information, see "Git References" in the Git documentation.',
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
        description: 'The Git reference. For more information, see "Git References" in the Git documentation.',
      },
      sha: {
        type: 'string',
        description: 'The SHA1 value to set this reference to',
      },
      force: {
        type: 'boolean',
        description:
          "Indicates whether to force the update or to make sure the update is a fast-forward update. Leaving this out or setting it to `false` will make sure you're not overwriting work.",
        default: false,
      },
    },
    required: ['owner', 'repo', 'ref', 'sha'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/git/refs/{ref}',
    body: ['sha', 'force'],
  },
});
