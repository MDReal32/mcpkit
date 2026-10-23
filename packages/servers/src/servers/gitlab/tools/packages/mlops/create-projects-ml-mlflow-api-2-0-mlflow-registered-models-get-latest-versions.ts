import { defineTool } from "@usemcpkit/core";

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRegisteredModelsGetLatestVersions = defineTool({
  name: "packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_registered_models_get_latest_versions",
  description:
    "Fetch the latest Model Version for the given Registered Model Name. https://mlflow.org/docs/2.19.0/rest-api.html#get-latest-modelversions",
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
    method: "POST",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/registered-models/get-latest-versions",
    body: ["name"],
  },
});
