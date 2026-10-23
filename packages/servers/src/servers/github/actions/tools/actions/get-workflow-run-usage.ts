import { defineTool } from '@usemcpkit/core';

export const actionsGetWorkflowRunUsage = defineTool({
  name: 'actions:get_workflow_run_usage',
  description:
    'Get workflow run usage. > [!WARNING] > This endpoint is in the process of closing down. Refer to "Actions Get workflow usage and Get workflow run usage endpoints closing down" for more information.',
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
      run_id: {
        type: 'integer',
        description: 'The unique identifier of the workflow run.',
      },
    },
    required: ['owner', 'repo', 'run_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/runs/{run_id}/timing',
  },
});
