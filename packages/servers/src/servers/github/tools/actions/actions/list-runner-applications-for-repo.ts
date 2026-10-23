import { defineTool } from '@usemcpkit/core';

export const actionsActionsListRunnerApplicationsForRepo = defineTool({
  name: 'actions:actions:list_runner_applications_for_repo',
  description:
    'List runner applications for a repository. Lists binaries for the runner application that you can download and run.',
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
    path: '/repos/{owner}/{repo}/actions/runners/downloads',
  },
});
