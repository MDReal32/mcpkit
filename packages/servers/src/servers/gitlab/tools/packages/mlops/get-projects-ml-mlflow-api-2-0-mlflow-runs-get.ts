import { defineTool } from "@usemcpkit/core";

export const packagesMlopsGetProjectsMlMlflowApi20MlflowRunsGet = defineTool({
  name: "packages:mlops:get_projects_ml_mlflow_api_2_0_mlflow_runs_get",
  description:
    "Gets an MLFlow Run, which maps to GitLab Candidates. https://www.mlflow.org/docs/1.28.0/rest-api.html#get-run",
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
      run_uuid: {
        type: "string",
        description: "Any value provided is ignored.",
      },
    },
    required: ["id", "run_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ml/mlflow/api/2.0/mlflow/runs/get",
    query: ["run_id", "run_uuid"],
  },
});
