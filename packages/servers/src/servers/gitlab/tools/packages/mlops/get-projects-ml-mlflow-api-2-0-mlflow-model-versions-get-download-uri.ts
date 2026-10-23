import { defineTool } from '@usemcpkit/core';

export const packagesMlopsGetProjectsMlMlflowApi20MlflowModelVersionsGetDownloadUri = defineTool({
  name: 'packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_model_versions_get_download_uri',
  description:
    'Fetch the download URI for the model version. Returns version in MLflow format "mlflow-artifacts:<version>" https://mlflow.org/docs/2.19.0/rest-api.html#get-download-uri-for-modelversion-artifacts',
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
        type: 'integer',
        description: 'ID of the model version.',
      },
    },
    required: ['id', 'name', 'version'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/model-versions/get-download-uri',
    query: ['name', 'version'],
  },
});
