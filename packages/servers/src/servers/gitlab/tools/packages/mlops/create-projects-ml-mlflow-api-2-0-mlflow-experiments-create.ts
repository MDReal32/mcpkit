import { defineTool } from "@usemcpkit/core";

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowExperimentsCreate = defineTool({
  name: "packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_experiments_create",
  description: "Create experiment. https://www.mlflow.org/docs/2.19.0/rest-api.html#create-experiment",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the experiment.",
      },
      tags: {
        type: "array",
        description: "Tags containing metadata about the experiment.",
      },
      artifact_location: {
        type: "string",
        description: "Ignored. Accepted for MLflow API compatibility.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/create",
    body: ["name", "tags", "artifact_location"],
  },
});
