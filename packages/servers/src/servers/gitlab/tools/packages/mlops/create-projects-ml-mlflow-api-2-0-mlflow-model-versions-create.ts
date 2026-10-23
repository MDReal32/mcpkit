import { defineTool } from '@usemcpkit/core';

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowModelVersionsCreate = defineTool({
  name: 'packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_model_versions_create',
  description:
    'Creates a Model Version. MLFlow Model Versions map to GitLab Model Versions. https://mlflow.org/docs/2.19.0/rest-api.html#create-modelversion',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the registered model to create the version for. Required.',
      },
      description: {
        type: 'string',
        description: 'Description of the model version.',
      },
      tags: {
        type: 'array',
        description: 'Additional metadata for a model version.',
      },
      run_id: {
        type: 'string',
        description: 'Run ID of the candidate to be promoted to a model version.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow/model-versions/create',
    body: ['name', 'description', 'tags', 'run_id'],
  },
});
