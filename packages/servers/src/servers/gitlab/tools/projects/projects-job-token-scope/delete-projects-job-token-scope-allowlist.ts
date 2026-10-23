import { defineTool } from "@usemcpkit/core";

export const projectsProjectsJobTokenScopeDeleteProjectsJobTokenScopeAllowlist = defineTool({
  name: "projects:projects_job_token_scope:delete_projects_job_token_scope_allowlist",
  description:
    "Delete a project from a CI/CD job token allowlist. Deletes a project from the CI/CD job token allowlist of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the project.",
      },
      target_project_id: {
        type: "integer",
        description: "ID of the project to remove from the CI/CD job token inbound allowlist.",
      },
    },
    required: ["id", "target_project_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/job_token_scope/allowlist/{target_project_id}",
  },
});
