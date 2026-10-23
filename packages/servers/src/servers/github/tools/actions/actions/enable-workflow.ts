import { defineTool } from '@usemcpkit/core';

export const actionsActionsEnableWorkflow = defineTool({
  name: 'actions:actions:enable_workflow',
  description:
    'Enable a workflow. Enables a workflow and sets the `state` of the workflow to `active`. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`.',
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
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable',
  },
});
