import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsDelete = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_delete',
  description: 'Delete a run. https://mlflow.org/docs/2.19.0/rest-api.html#delete-run',
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
    },
    required: ['id', 'run_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/delete',
    body: ['run_id'],
  },
});
