import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsLogParameter = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_log_parameter',
  description: 'Logs a parameter to a run. https://www.mlflow.org/docs/2.19.0/rest-api.html#log-param',
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
        description: 'Name of the parameter.',
      },
      value: {
        type: 'string',
        description: 'Value of the parameter.',
      },
    },
    required: ['id', 'run_id', 'key', 'value'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/log-parameter',
    body: ['run_id', 'key', 'value'],
  },
});
