import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetWorkflowUsage = defineTool({
  name: 'actions:actions:get_workflow_usage',
  description:
    'Get workflow usage. > [!WARNING] > This endpoint is in the process of closing down. Refer to "Actions Get workflow usage and Get workflow run usage endpoints closing down" for more information.',
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
      workflow_id: {
        description: 'The ID of the workflow. You can also pass the workflow file name as a string.',
      },
    },
    required: ['owner', 'repo', 'workflow_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing',
  },
});
