import { defineTool } from "@usemcpkit/core";

export const ciCiResourceGroupsUpdateProjectsResourceGroups = defineTool({
  name: "ci:ci_resource_groups:update_projects_resource_groups",
  description:
    "Update a resource group. Updates the properties for a specified resource group. It returns `200` if the resource group was successfully updated. In case of an error, a status code `400` is returned.",
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
      process_mode: {
        type: "string",
        description: "Process mode of the resource group. Read process modes for more information.",
        enum: ["unordered", "oldest_first", "newest_first", "newest_ready_first"],
      },
    },
    required: ["id", "key"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/resource_groups/{key}",
    body: ["process_mode"],
  },
});
