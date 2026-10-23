import { defineTool } from "@usemcpkit/core";

export const packagesMlopsDeleteProjectsMlMlflowApi20MlflowRegisteredModelsDelete = defineTool({
  name: "packages:mlops:delete_projects_ml_mlflow_api_2_0_mlflow_registered_models_delete",
  description: "Delete a Registered Model by Name. https://mlflow.org/docs/2.19.0/rest-api.html#delete-registeredmodel",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the registered model.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/delete",
    query: ["name"],
  },
});
