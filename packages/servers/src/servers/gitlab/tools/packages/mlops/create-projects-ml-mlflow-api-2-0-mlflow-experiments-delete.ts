import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowExperimentsDelete = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_experiments_delete',
  description: 'Delete an experiment. https://mlflow.org/docs/2.19.0/rest-api.html#delete-experiment',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      experiment_id: {
        type: 'string',
        description: 'ID of the experiment.',
      },
    },
    required: ['id', 'experiment_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/delete',
    body: ['experiment_id'],
  },
});
