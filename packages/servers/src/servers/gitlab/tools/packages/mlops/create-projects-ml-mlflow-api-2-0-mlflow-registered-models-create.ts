import { defineTool } from "@usemcpkit/core";

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRegisteredModelsCreate = defineTool({
  name: "packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_registered_models_create",
  description:
    "Creates a Registered Model. MLFlow Registered Models map to GitLab Models. https://mlflow.org/docs/2.19.0/rest-api.html#create-registeredmodel",
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
      tags: {
        type: "array",
        description: "Additional metadata for the registered model.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/create",
    body: ["name", "description", "tags"],
  },
});
