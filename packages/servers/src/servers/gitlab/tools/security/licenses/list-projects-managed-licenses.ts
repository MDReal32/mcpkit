import { defineTool } from "@usemcpkit/core";

export const securityLicensesListProjectsManagedLicenses = defineTool({
  name: "security:licenses:list_projects_managed_licenses",
  description: "List all software license policies. Lists all software license policies for a specified project.",
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
    path: "/projects/{id}/managed_licenses",
    query: ["page", "per_page"],
  },
});
