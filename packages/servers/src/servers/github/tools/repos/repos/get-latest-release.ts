import { defineTool } from '@usemcpkit/core';

export const reposReposGetLatestRelease = defineTool({
  name: 'repos:repos:get_latest_release',
  description: 'Get the latest release. View the latest published full release for the repository.',
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
    method: 'GET',
    path: '/repos/{owner}/{repo}/releases/latest',
  },
});
