import { defineTool } from "@usemcpkit/core";

export const ciJobArtifactsGetProjectsJobsArtifactsRaw = defineTool({
  name: "ci:job_artifacts:get_projects_jobs_artifacts_raw",
  description: "Download a specific file from artifacts archive from a ref. This feature was introduced in GitLab 11.5",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      ref_name: {
        type: "string",
        description:
          "Branch or tag name in the repository. `HEAD` or SHA references are not supported. For merge request pipelines, use `refs/merge-requests/:iid/head` instead of the branch name.",
      },
      artifact_path: {
        type: "string",
        description: "Path to a file inside the artifacts archive.",
      },
      job: {
        type: "string",
        description: "Name of the job.",
      },
      job_token: {
        type: "string",
        description: "CI/CD job token for multi-project pipelines. Premium and Ultimate only.",
      },
      search_recent_successful_pipelines: {
        type: "boolean",
        default: false,
        description:
          "If `true`, searches across recent successful pipelines instead of just the latest one. Introduced in GitLab 18.7 with a feature flag named `ci_search_recent_successful_pipelines`. Disabled by default.",
      },
    },
    required: ["id", "ref_name", "artifact_path", "job"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/jobs/artifacts/{ref_name}/raw/{artifact_path}",
    query: ["job", "job_token", "search_recent_successful_pipelines"],
  },
});
