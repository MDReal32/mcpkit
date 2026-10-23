import { defineTool } from '@usemcpkit/core';

export const packagesMlopsGetProjectsMlMlflowApi20MlflowModelVersionsGet = defineTool({
  name: 'packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_model_versions_get',
  description: 'Fetch model version by name and version. https://mlflow.org/docs/2.19.0/rest-api.html#get-modelversion',
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
      version: {
        type: 'string',
        description: 'Version of the model.',
      },
    },
    required: ['id', 'name', 'version'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/model-versions/get',
    query: ['name', 'version'],
  },
});
