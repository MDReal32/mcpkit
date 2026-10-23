import { defineTool } from "@usemcpkit/core";

export const securityDependencyManagementListProjectsDependencies = defineTool({
  name: "security:dependency_management:list_projects_dependencies",
  description:
    "List all project dependencies. Lists all dependencies for a specified project. This operation partially mirrors the dependency list feature, which is available only for languages and package managers supported by Gemnasium. Responses are paginated and return 20 results by default.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      package_manager: {
        type: "string",
        description: "Filter results by the specified package manager. (comma-separated)",
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
    path: "/projects/{id}/dependencies",
    query: ["package_manager", "page", "per_page"],
    commaQuery: ["package_manager"],
  },
});
