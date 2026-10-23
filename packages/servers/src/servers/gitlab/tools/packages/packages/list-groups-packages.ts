import { defineTool } from "@usemcpkit/core";

export const packagesPackagesListGroupsPackages = defineTool({
  name: "packages:packages:list_groups_packages",
  description:
    "List all packages for a group. Lists all packages for a specified group. When accessed without authentication, only packages of public projects are returned. By default, packages with `default`, `deprecated`, and `error` status are returned. Use the `status` parameter to view other packages.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      exclude_subgroups: {
        type: "boolean",
        default: false,
        description: "If `true`, excludes packages from subgroup projects.",
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
        enum: ["created_at", "name", "version", "type", "project_path"],
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
    path: "/groups/{id}/packages",
    query: [
      "exclude_subgroups",
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
