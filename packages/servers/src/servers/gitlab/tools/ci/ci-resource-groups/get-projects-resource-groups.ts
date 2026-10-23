import { defineTool } from "@usemcpkit/core";

export const ciCiResourceGroupsGetProjectsResourceGroups = defineTool({
  name: "ci:ci_resource_groups:get_projects_resource_groups",
  description: "Retrieve a resource group. Retrieves a specified resource group for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      key: {
        type: "string",
        description: "URL-encoded key of the resource group, for example `resource%5Fa` instead of `resource_a`.",
      },
    },
    required: ["id", "key"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/resource_groups/{key}",
  },
});
