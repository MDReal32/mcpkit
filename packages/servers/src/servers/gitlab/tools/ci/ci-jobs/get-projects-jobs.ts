import { defineTool } from "@usemcpkit/core";

export const ciCiJobsGetProjectsJobs = defineTool({
  name: "ci:ci_jobs:get_projects_jobs",
  description: "Retrieve a job. Retrieves a job with the specified job ID.",
  input: {
    type: "object",
    properties: {
      job_id: {
        type: "integer",
        description: "ID of the job.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["job_id", "id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/jobs/{job_id}",
  },
});
