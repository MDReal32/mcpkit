import { defineTool } from "@usemcpkit/core";

export const packagesPackagesListProjectsPackagesPackageFiles = defineTool({
  name: "packages:packages:list_projects_packages_package_files",
  description: "List all package files. Lists all package files for a specified package.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      package_id: {
        type: "integer",
        description: "ID of the package.",
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
      order_by: {
        type: "string",
        default: "id",
        enum: ["id", "created_at", "file_name"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "asc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
    },
    required: ["id", "package_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages/{package_id}/package_files",
    query: ["page", "per_page", "order_by", "sort"],
  },
});
