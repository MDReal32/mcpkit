import { defineTool } from "@usemcpkit/core";

export const securityVulnerabilitiesListProjectsVulnerabilities = defineTool({
  name: "security:vulnerabilities:list_projects_vulnerabilities",
  description: "List all project vulnerabilities. Lists all vulnerabilities for a specified project.",
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
    path: "/projects/{id}/vulnerabilities",
    query: ["page", "per_page"],
  },
});
