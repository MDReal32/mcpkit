import { defineTool } from "@usemcpkit/core";

export const packagesPackagesUpdateProjectsPackagesGeneric = defineTool({
  name: "packages:packages:update_projects_packages_generic",
  description: "Upload package file. This feature was introduced in GitLab 13.5",
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
      status: {
        type: "string",
        description: "Package status",
        enum: ["default", "hidden"],
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      select: {
        type: "string",
        description:
          'Response format selector. If set to "package_file", returns the created package file object in the response',
        enum: ["package_file"],
      },
    },
    required: ["id", "package_name", "file_name", "package_version", "file"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/packages/generic/{package_name}/{package_version}/{file_name}",
    body: ["status", "file", "select"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
