import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowExperimentsGet = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_experiments_get",
  description: "Fetch experiment by experiment_id. https://www.mlflow.org/docs/2.19.0/rest-api.html#get-experiment",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      experiment_id: {
        type: "string",
        default: "",
        description: "ID of the experiment, relative to the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/get",
    query: ["experiment_id"],
  },
});
