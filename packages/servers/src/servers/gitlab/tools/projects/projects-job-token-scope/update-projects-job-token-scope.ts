import { defineTool } from "@usemcpkit/core";

export const projectsProjectsJobTokenScopeUpdateProjectsJobTokenScope = defineTool({
  name: "projects:projects_job_token_scope:update_projects_job_token_scope",
  description:
    "Update the CI/CD job token access settings for a project. Updates the **Authorized groups and projects** setting (job token scope) of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      enabled: {
        type: "boolean",
        description: "Indicates CI/CD job tokens generated in other projects have restricted access to this project.",
      },
    },
    required: ["id", "enabled"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/job_token_scope",
    body: ["enabled"],
  },
});
