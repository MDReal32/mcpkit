import { defineTool } from '@usemcpkit/core';

export const packagesMlopsUpdateProjectsMlMlflowApi20MlflowModelVersionsUpdate = defineTool({
  name: 'packages:mlops:update_projects_ml_mlflow_api_2_0_mlflow_model_versions_update',
  description: 'Updates a Model Version. https://mlflow.org/docs/2.19.0/rest-api.html#update-modelversion',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the registered model.',
      },
      description: {
        type: 'string',
        description: 'Description of the model version.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PATCH',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/model-versions/update',
    body: ['name', 'description'],
  },
});
