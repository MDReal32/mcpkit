import { defineTool } from "@usemcpkit/core";

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsLogBatch = defineTool({
  name: "packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_log_batch",
  description: "Logs multiple parameters and metrics. https://www.mlflow.org/docs/2.19.0/rest-api.html#log-param",
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
      metrics: {
        type: "array",
        description: "Array of metrics to record for the run.",
        items: {
          type: "object",
          properties: {
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
          required: ["key", "value", "timestamp"],
        },
      },
      params: {
        type: "array",
        description: "Array of parameters to record for the run.",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Name of the parameter.",
            },
            value: {
              type: "string",
              description: "Value of the parameter.",
            },
          },
          required: ["key", "value"],
        },
      },
    },
    required: ["id", "run_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/log-batch",
    body: ["run_id", "metrics", "params"],
  },
});
