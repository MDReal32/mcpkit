import { defineTool } from "@usemcpkit/core";

export const groupsGroupsGetGroupsPlaceholderReassignments = defineTool({
  name: "groups:groups:get_groups_placeholder_reassignments",
  description:
    "Retrieve pending reassignments. Retrieves a CSV file with a list of pending reassignments. This feature was introduced in GitLab 17.10.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/placeholder_reassignments",
  },
});
