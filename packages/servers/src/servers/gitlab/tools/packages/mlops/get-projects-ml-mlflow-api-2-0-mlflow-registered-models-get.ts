import { defineTool } from '@usemcpkit/core';

export const packagesMlopsGetProjectsMlMlflowApi20MlflowRegisteredModelsGet = defineTool({
  name: 'packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_registered_models_get',
  description: 'Fetch a Registered Model by Name. https://www.mlflow.org/docs/2.19.0/rest-api.html#get-registeredmodel',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        default: '',
        description: 'Name of the registered model.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/get',
    query: ['name'],
  },
});
