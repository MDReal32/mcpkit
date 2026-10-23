import { defineTool } from "@usemcpkit/core";

export const packagesMlopsCreateProjectsMlMlflowApi20MlflowRunsUpdate = defineTool({
  name: "packages:mlops:create_projects_ml_mlflow_api_2_0_mlflow_runs_update",
  description:
    "Updates a Run. MLFlow Runs map to GitLab Candidates. https://www.mlflow.org/docs/2.19.0/rest-api.html#update-run",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      run_id: {
        type: "string",
        description: "UUID of the candidate.",
      },
      status: {
        type: "string",
        description: 'Status of the run. Accepts: ["RUNNING", "SCHEDULED", "FINISHED", "FAILED", "KILLED"].',
        enum: ["RUNNING", "SCHEDULED", "FINISHED", "FAILED", "KILLED"],
      },
      end_time: {
        type: "integer",
        description: "Ending time of the run.",
      },
    },
    required: ["id", "run_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/update",
    body: ["run_id", "status", "end_time"],
  },
});
