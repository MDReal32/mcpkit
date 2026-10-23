import { defineTool } from "@usemcpkit/core";

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsLogMetric = defineTool({
  name: "packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_log_metric",
  description: "Logs a metric to a run. https://www.mlflow.org/docs/1.28.0/rest-api.html#log-metric",
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
      key: {
        type: "string",
        description: "Name of the metric.",
      },
      value: {
        type: "number",
        description: "Value of the metric.",
      },
      timestamp: {
        type: "integer",
        description: "Unix timestamp, in milliseconds, when the metric was recorded.",
      },
      step: {
        type: "integer",
        description: "Step at which the metric was recorded.",
      },
    },
    required: ["id", "run_id", "key", "value", "timestamp"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/log-metric",
    body: ["run_id", "key", "value", "timestamp", "step"],
  },
});
