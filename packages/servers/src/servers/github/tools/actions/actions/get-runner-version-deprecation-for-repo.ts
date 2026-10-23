import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetRunnerVersionDeprecationForRepo = defineTool({
  name: 'actions:actions:get_runner_version_deprecation_for_repo',
  description:
    'Get runner version end-of-life schedule for a repository. Gets the end-of-life schedule for a specific runner version in a repository. Returns the runner version and the dates when registration and runtime support will end.',
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
      version: {
        type: 'string',
        description: 'The runner version to look up.',
      },
    },
    required: ['owner', 'repo', 'version'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runners/deprecations/{version}',
  },
});
