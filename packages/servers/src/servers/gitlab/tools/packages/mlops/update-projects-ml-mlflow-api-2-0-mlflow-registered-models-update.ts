import { defineTool } from "@usemcpkit/core";

export const packagesMlopsUpdateProjectsMlMlflowApi20MlflowRegisteredModelsUpdate = defineTool({
  name: "packages:mlops:update_projects_ml_mlflow_api_2_0_mlflow_registered_models_update",
  description: "Update a Registered Model by Name. https://mlflow.org/docs/2.19.0/rest-api.html#update-registeredmodel",
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
      description: {
        type: "string",
        description: "Description of the registered model.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/update",
    body: ["name", "description"],
  },
});
