import { defineTool } from "@usemcpkit/core";

export const ciJobArtifactsGetProjectsJobsArtifactsGet = defineTool({
  name: "ci:job_artifacts:get_projects_jobs_artifacts_get",
  description: "Download a specific file from artifacts archive. This feature was introduced in GitLab 10.0",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      job_id: {
        type: "integer",
        description: "ID of the job.",
      },
      artifact_path: {
        type: "string",
        description: "Path to a file inside the artifacts archive.",
      },
      job_token: {
        type: "string",
        description: "CI/CD job token for multi-project pipelines. Premium and Ultimate only.",
      },
    },
    required: ["id", "job_id", "artifact_path"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/jobs/{job_id}/artifacts/{artifact_path}",
    query: ["job_token"],
  },
});
