import { defineTool } from '@usemcpkit/core';

export const actionsCreateWorkflowDispatch = defineTool({
  name: 'actions:create_workflow_dispatch',
  description:
    'Create a workflow dispatch event. You can use this endpoint to manually trigger a GitHub Actions workflow run. You can replace `workflow_id` with the workflow file name. For example, you could use `main.yaml`.',
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
      ref: {
        type: 'string',
        description: 'The git reference for the workflow. The reference can be a branch or tag name.',
      },
      inputs: {
        type: 'object',
        description:
          'Input keys and values configured in the workflow file. The maximum number of properties is 25. Any default properties configured in the workflow file will be used when `inputs` are omitted.',
      },
      return_run_details: {
        type: 'boolean',
        description: 'Whether the response should include the workflow run ID and URLs.',
      },
    },
    required: ['owner', 'repo', 'workflow_id', 'ref'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    body: ['ref', 'inputs', 'return_run_details'],
  },
});
