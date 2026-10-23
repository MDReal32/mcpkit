import { defineTool } from "@usemcpkit/core";

export const ciJobArtifactsDeleteProjectsArtifacts = defineTool({
  name: "ci:job_artifacts:delete_projects_artifacts",
  description: "Delete all job artifacts in a project. Deletes job artifacts from all jobs in a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/artifacts",
  },
});
