import { defineTool } from "@usemcpkit/core";

export const packagesMlopsListProjectsMlMlflowApi20MlflowExperimentsList = defineTool({
  name: "packages:mlops:list_projects_ml_mlflow_api_2_0_mlflow_experiments_list",
  description: "List experiments. https://www.mlflow.org/docs/2.19.0/rest-api.html#search-experiments",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/list",
  },
});
