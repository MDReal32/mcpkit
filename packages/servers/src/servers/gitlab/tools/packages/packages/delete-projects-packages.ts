import { defineTool } from "@usemcpkit/core";

export const packagesPackagesDeleteProjectsPackages = defineTool({
  name: "packages:packages:delete_projects_packages",
  description: "Delete a project package. Deletes a specified project package.",
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
    },
    required: ["id", "package_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/packages/{package_id}",
  },
});
