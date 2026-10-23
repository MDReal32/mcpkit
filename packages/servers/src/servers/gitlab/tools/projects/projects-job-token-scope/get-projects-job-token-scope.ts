import { defineTool } from "@usemcpkit/core";

export const projectsProjectsJobTokenScopeGetProjectsJobTokenScope = defineTool({
  name: "projects:projects_job_token_scope:get_projects_job_token_scope",
  description:
    "Retrieve the CI/CD job token access settings for a project. Retrieves the CI/CD job token access settings (job token scope) of a specified project.",
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
    method: "GET",
    path: "/projects/{id}/job_token_scope",
  },
});
