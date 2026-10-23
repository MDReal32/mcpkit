import { defineTool } from "@usemcpkit/core";

export const cloudV1GroupGetGroupByGroupId = defineTool({
  name: "cloud_v1:group:get_group_by_group_id",
  description: "[Cloud v1] Get group. Returns a user group for a given group id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The id of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/group/by-id",
    query: ["id"],
  },
});
