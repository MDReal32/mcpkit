import { defineTool } from '@usemcpkit/core';

export const reposReposEnableImmutableReleases = defineTool({
  name: 'repos:repos:enable_immutable_releases',
  description:
    'Enable immutable releases. Enables immutable releases for a repository. The authenticated user must have admin access to the repository.',
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
    method: 'PUT',
    path: '/repos/{owner}/{repo}/immutable-releases',
  },
});
