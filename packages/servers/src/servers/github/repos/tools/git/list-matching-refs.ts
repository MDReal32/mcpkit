import { defineTool } from '@usemcpkit/core';

export const gitListMatchingRefs = defineTool({
  name: 'git:list_matching_refs',
  description:
    "List matching references. Returns an array of references from your Git database that match the supplied name. The `:ref` in the URL must be formatted as `heads/<branch name>` for branches and `tags/<tag name>` for tags. If the `:ref` doesn't exist in the repository, but existing refs start with `:ref`, they will be returned as an array.",
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
    },
    required: ['owner', 'repo', 'ref'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/git/matching-refs/{ref}',
  },
});
