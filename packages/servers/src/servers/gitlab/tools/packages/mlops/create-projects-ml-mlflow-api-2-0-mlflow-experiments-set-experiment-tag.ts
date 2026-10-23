import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowExperimentsSetExperimentTag = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_experiments_set_experiment_tag',
  description: 'Sets a tag for an experiment. https://www.mlflow.org/docs/2.19.0/rest-api.html#set-experiment-tag',
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
      key: {
        type: 'string',
        description: 'Name of the tag.',
      },
      value: {
        type: 'string',
        description: 'Value of the tag.',
      },
    },
    required: ['id', 'experiment_id', 'key', 'value'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/set-experiment-tag',
    body: ['experiment_id', 'key', 'value'],
  },
});
