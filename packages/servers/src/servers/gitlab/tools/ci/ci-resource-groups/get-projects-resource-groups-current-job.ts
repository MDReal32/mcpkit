import { defineTool } from "@usemcpkit/core";

export const ciCiResourceGroupsGetProjectsResourceGroupsCurrentJob = defineTool({
  name: "ci:ci_resource_groups:get_projects_resource_groups_current_job",
  description:
    "Retrieve current job for a resource group. Retrieves the current job for a specified resource group in a project.",
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
    path: "/projects/{id}/resource_groups/{key}/current_job",
  },
});
