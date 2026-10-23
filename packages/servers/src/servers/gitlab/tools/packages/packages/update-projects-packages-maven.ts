import { defineTool } from "@usemcpkit/core";

export const packagesPackagesUpdateProjectsPackagesMaven = defineTool({
  name: "packages:packages:update_projects_packages_maven",
  description: "Upload the maven package file. This feature was introduced in GitLab 11.3",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID or URL-encoded path of the project",
      },
      path: {
        type: "string",
        description: "Package path",
      },
      file_name: {
        type: "string",
        description: "Package file name",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "path", "file_name", "file"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/packages/maven/{path}/{file_name}",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
