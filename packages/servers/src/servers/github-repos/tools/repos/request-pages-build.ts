import { defineTool } from '@usemcpkit/core';

export const reposRequestPagesBuild = defineTool({
  name: 'repos:request_pages_build',
  description:
    'Request a GitHub Pages build. You can request that your site be built from the latest revision on the default branch. This has the same effect as pushing a commit to your default branch, but does not require an additional commit. Manually triggering page builds can be helpful when diagnosing build warnings and failures.',
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
    method: 'POST',
    path: '/repos/{owner}/{repo}/pages/builds',
  },
});
