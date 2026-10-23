import { defineTool } from "@usemcpkit/core";

export const packagesPackagesUpdateProjectsPackagesMavenAuthorize = defineTool({
  name: "packages:packages:update_projects_packages_maven_authorize",
  description: "Workhorse authorize the maven package file upload. This feature was introduced in GitLab 11.3",
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
    },
    required: ["id", "path", "file_name"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/packages/maven/{path}/{file_name}/authorize",
  },
});
