import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsSetTag = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_set_tag',
  description: 'Sets a tag for a run. https://www.mlflow.org/docs/2.19.0/rest-api.html#set-tag',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      run_id: {
        type: 'string',
        description: 'UUID of the run.',
      },
      key: {
        type: 'string',
        description: 'Name of the tag.',
      },
      value: {
        type: 'string',
        description: 'Value of the tag.',
      },
    },
    required: ['id', 'run_id', 'key', 'value'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/set-tag',
    body: ['run_id', 'key', 'value'],
  },
});
