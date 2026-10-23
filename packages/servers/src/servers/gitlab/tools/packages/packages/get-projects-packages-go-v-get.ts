import { defineTool } from "@usemcpkit/core";

export const packagesPackagesGetProjectsPackagesGoVGet = defineTool({
  name: "packages:packages:get_projects_packages_go_v_get",
  description:
    "Download module file. Get the module file of a given module version.See `go help goproxy`, GET $GOPROXY/<module>/@v/<version>.mod. This feature was introduced in GitLab 13.1.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The project ID or full path of a project",
      },
      module_name: {
        type: "string",
        description: "The name of the Go module",
      },
      module_version: {
        type: "string",
        description: "The version of the Go module",
      },
    },
    required: ["id", "module_name", "module_version"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages/go/{module_name}/@v/{module_version}.mod",
  },
});
