import { defineTool } from "@usemcpkit/core";

export const ciCiJobsCreateProjectsJobsErase = defineTool({
  name: "ci:ci_jobs:create_projects_jobs_erase",
  description: "Erase a job. Erases a specified job in a project. This removes job artifacts and the job log.",
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
    method: "POST",
    path: "/projects/{id}/jobs/{job_id}/erase",
  },
});
