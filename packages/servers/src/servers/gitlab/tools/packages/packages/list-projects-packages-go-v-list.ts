import { defineTool } from "@usemcpkit/core";

export const packagesPackagesListProjectsPackagesGoVList = defineTool({
  name: "packages:packages:list_projects_packages_go_v_list",
  description:
    "List. Get all tagged versions for a given Go module.See `go help goproxy`, GET $GOPROXY/<module>/@v/list. This feature was introduced in GitLab 13.1.",
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
    },
    required: ["id", "module_name"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages/go/{module_name}/@v/list",
  },
});
