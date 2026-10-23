import { defineTool } from "@usemcpkit/core";

export const packagesPackagesDeleteProjectsPackagesPackageFiles = defineTool({
  name: "packages:packages:delete_projects_packages_package_files",
  description: "Delete a package file. Deletes a specified package file.",
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
      package_file_id: {
        type: "integer",
        description: "ID of the package file.",
      },
    },
    required: ["id", "package_id", "package_file_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/packages/{package_id}/package_files/{package_file_id}",
  },
});
