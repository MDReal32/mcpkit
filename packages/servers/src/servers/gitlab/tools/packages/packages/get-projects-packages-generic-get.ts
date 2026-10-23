import { defineTool } from "@usemcpkit/core";

export const packagesPackagesGetProjectsPackagesGenericGet = defineTool({
  name: "packages:packages:get_projects_packages_generic_get",
  description: "Download package file. This feature was introduced in GitLab 13.5",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID or URL-encoded path of the project",
      },
      package_name: {
        type: "string",
        description: "Package name",
      },
      file_name: {
        type: "string",
        description: "Package file name",
      },
      package_version: {
        type: "string",
        description: "Package version",
      },
      path: {
        type: "string",
        description: "File directory path",
      },
      download_mode: {
        type: "string",
        enum: ["proxy", "direct"],
        description:
          "Requested download transfer mode (`proxy` or `direct`). Only honored when allowed by the object storage configuration.",
      },
    },
    required: ["id", "package_name", "file_name", "package_version", "path"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages/generic/{package_name}/{package_version}/{path}/{file_name}",
    query: ["download_mode"],
  },
});
