import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsCreate = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_create',
  description:
    'Creates a Run. MLFlow Runs map to GitLab Candidates. https://www.mlflow.org/docs/2.19.0/rest-api.html#create-run',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      experiment_id: {
        type: 'integer',
        description: 'ID of the experiment, relative to the project.',
      },
      start_time: {
        type: 'integer',
        description: 'Unix timestamp, in milliseconds, of when the run started.',
        default: 0,
      },
      user_id: {
        type: 'string',
        description: 'Any value provided is ignored.',
      },
      tags: {
        type: 'array',
        description: 'Tags to store with the run. Tags are stored but not displayed.',
      },
      run_name: {
        type: 'string',
        description: 'Name of the run.',
      },
    },
    required: ['id', 'experiment_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/create',
    body: ['experiment_id', 'start_time', 'user_id', 'tags', 'run_name'],
  },
});
