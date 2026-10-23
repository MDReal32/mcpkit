import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowRegisteredModelsAlias = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_registered_models_alias",
  description: "Gets a Model Version by alias. https://mlflow.org/docs/2.19.0/rest-api.html#get-model-version-by-alias",
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
      alias: {
        type: "string",
        description: "Alias of the model version, for example `1.0.0`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/alias",
    query: ["name", "alias"],
  },
});
