import { defineTool } from "@usemcpkit/core";

export const projectsProjectsJobTokenScopeCreateProjectsJobTokenScopeAllowlist = defineTool({
  name: "projects:projects_job_token_scope:create_projects_job_token_scope_allowlist",
  description:
    "Add a project to a CI/CD job token allowlist. Adds a project to the CI/CD job token allowlist of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the project.",
      },
      target_project_id: {
        type: "integer",
        description: "ID of the project to add to the CI/CD job token inbound allowlist.",
      },
    },
    required: ["id", "target_project_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/job_token_scope/allowlist",
    body: ["target_project_id"],
  },
});
