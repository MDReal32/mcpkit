import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowMetricsGetHistory = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_metrics_get_history",
  description: "Gets metric history for a run. https://www.mlflow.org/docs/2.19.0/rest-api.html#get-metric-history",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      run_id: {
        type: "string",
        description: "UUID of the run.",
      },
      metric_key: {
        type: "string",
        description: "Name of the metric.",
      },
      max_results: {
        type: "integer",
        default: 1000,
        description: "Maximum number of metrics to return.",
      },
      page_token: {
        type: "string",
        description: "Token for pagination.",
      },
    },
    required: ["id", "run_id", "metric_key"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/metrics/get-history",
    query: ["run_id", "metric_key", "max_results", "page_token"],
  },
});
