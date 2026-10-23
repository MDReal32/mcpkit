import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowArtifactsArtifactsGet = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_artifacts_artifacts_get",
  description: "Get MLflow artifact file. Retrieves an MLflow artifact file",
  input: {
    type: "object",
    properties: {
      model_version: {
        type: "string",
        description: "The model version",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      file_path: {},
    },
    required: ["model_version", "id", "file_path"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow-artifacts/artifacts/{model_version}/{file_path}",
  },
});
