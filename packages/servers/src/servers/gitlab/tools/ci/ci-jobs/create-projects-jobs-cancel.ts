import { defineTool } from "@usemcpkit/core";

export const ciCiJobsCreateProjectsJobsCancel = defineTool({
  name: "ci:ci_jobs:create_projects_jobs_cancel",
  description: "Cancel a job. Cancels a specified job in a project.",
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
      force: {
        type: "boolean",
        description: "If `true`, forces cancellation of a job in `canceling` state.",
      },
    },
    required: ["job_id", "id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/jobs/{job_id}/cancel",
    body: ["force"],
  },
});
