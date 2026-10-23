import { defineTool } from '@usemcpkit/core';

export const packagesMlopsGetProjectsMlMlflowApi20MlflowArtifactsArtifacts = defineTool({
  name: 'packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_artifacts_artifacts',
  description: 'MLflow artifact API. MLflow artifacts mapping to GitLab artifacts',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      path: {
        type: 'string',
        description:
          'Model version ID, optionally followed by `/` and the path to the artifact, for example `15/MLmodel`.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/ml/mlflow/api/2.0/mlflow-artifacts/artifacts',
    query: ['path'],
  },
});
