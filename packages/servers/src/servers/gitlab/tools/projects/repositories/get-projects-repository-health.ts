import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesGetProjectsRepositoryHealth = defineTool({
  name: "projects:repositories:get_projects_repository_health",
  description:
    "Retrieve repository health statistics. Retrieves statistics related to the health of a project repository. This endpoint is rate-limited to 5 requests/hour per project when `generate` is `true`. Available only to users with push access to the repository.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      generate: {
        type: "boolean",
        default: false,
        description: "If `true`, generates a new health report. Set this if the endpoint returns `404`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/health",
    query: ["generate"],
  },
});
