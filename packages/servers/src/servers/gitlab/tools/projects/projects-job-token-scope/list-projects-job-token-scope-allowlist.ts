import { defineTool } from "@usemcpkit/core";

export const projectsProjectsJobTokenScopeListProjectsJobTokenScopeAllowlist = defineTool({
  name: "projects:projects_job_token_scope:list_projects_job_token_scope_allowlist",
  description:
    "List all projects in a CI/CD job token allowlist. Lists all projects in the CI/CD job token allowlist of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/job_token_scope/allowlist",
    query: ["page", "per_page"],
  },
});
