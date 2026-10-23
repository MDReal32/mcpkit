import { defineTool } from "@usemcpkit/core";

export const packagesPackagesGetProjectsPackages = defineTool({
  name: "packages:packages:get_projects_packages",
  description:
    "Retrieve a project package. Retrieves a specified project package. Only packages with status `default` or `deprecated` are returned.",
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
    method: "GET",
    path: "/projects/{id}/packages/{package_id}",
  },
});
