import { defineTool } from "@usemcpkit/core";

export const ciJobArtifactsGetProjectsJobsArtifactsDownload = defineTool({
  name: "ci:job_artifacts:get_projects_jobs_artifacts_download",
  description:
    "Retrieve job artifacts. Retrieves the artifacts archive for the latest successful job on a specified branch or tag.",
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
      download_mode: {
        type: "string",
        enum: ["proxy", "direct"],
        description:
          "Requested download transfer mode (`proxy` or `direct`). Only honored when allowed by the object storage configuration.",
      },
    },
    required: ["id", "ref_name", "job"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/jobs/artifacts/{ref_name}/download",
    query: ["job", "job_token", "search_recent_successful_pipelines", "download_mode"],
  },
});
