import { defineTool } from '@usemcpkit/core';

export const reposReposGetReleaseByTag = defineTool({
  name: 'repos:repos:get_release_by_tag',
  description: 'Get a release by tag name. Get a published release with the specified tag.',
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
      tag: {
        type: 'string',
        description: 'tag parameter',
      },
    },
    required: ['owner', 'repo', 'tag'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/releases/tags/{tag}',
  },
});
