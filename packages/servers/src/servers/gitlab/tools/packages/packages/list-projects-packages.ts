import { defineTool } from "@usemcpkit/core";

export const packagesPackagesListProjectsPackages = defineTool({
  name: "packages:packages:list_projects_packages",
  description:
    "List all packages for a project. Lists all packages for a specified project. All package types are included in results. Unauthenticated requests return only packages of public projects. By default, packages with `default`, `deprecated`, and `error` status are returned. Use the `status` parameter to view other packages.",
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
      order_by: {
        type: "string",
        default: "created_at",
        enum: ["created_at", "name", "version", "type"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "asc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
      package_type: {
        type: "string",
        enum: [
          "maven",
          "npm",
          "conan",
          "nuget",
          "pypi",
          "composer",
          "generic",
          "golang",
          "debian",
          "rubygems",
          "helm",
          "terraform_module",
          "rpm",
          "ml_model",
          "cargo",
        ],
        description: "Filter packages by type.",
      },
      package_name: {
        type: "string",
        description: "Filter packages by name, using a fuzzy search.",
      },
      package_version: {
        type: "string",
        description:
          "Filter packages by version. When used together with `include_versionless`, versionless packages are not returned.",
      },
      include_versionless: {
        type: "boolean",
        description: "If `true`, includes versionless packages in the response.",
      },
      status: {
        type: "string",
        enum: ["default", "hidden", "processing", "error", "pending_destruction", "deprecated"],
        description: "Filter packages by status.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages",
    query: [
      "page",
      "per_page",
      "order_by",
      "sort",
      "package_type",
      "package_name",
      "package_version",
      "include_versionless",
      "status",
    ],
  },
});
