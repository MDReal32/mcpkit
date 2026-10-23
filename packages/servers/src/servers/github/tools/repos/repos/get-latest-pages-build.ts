import { defineTool } from '@usemcpkit/core';

export const reposReposGetLatestPagesBuild = defineTool({
  name: 'repos:repos:get_latest_pages_build',
  description: 'Get latest Pages build. Gets information about the single most recent build of a GitHub Pages site.',
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
    path: '/repos/{owner}/{repo}/pages/builds/latest',
  },
});
