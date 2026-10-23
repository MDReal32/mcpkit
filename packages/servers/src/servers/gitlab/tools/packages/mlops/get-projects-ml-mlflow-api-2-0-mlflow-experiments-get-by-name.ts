import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowExperimentsGetByName = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_experiments_get_by_name",
  description:
    "Fetch experiment by experiment_name. https://www.mlflow.org/docs/2.19.0/rest-api.html#get-experiment-by-name",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      experiment_name: {
        type: "string",
        default: "",
        description: "Name of the experiment.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/experiments/get-by-name",
    query: ["experiment_name"],
  },
});
