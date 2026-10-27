import { defineTool } from "@usemcpkit/core";

export const usersUserGroupsGetGroups = defineTool({
  name: "users:user_groups:get_groups",
  description:
    "Get Groups. This endpoint is used to view User Groups in your Workspace.\\ \\ In our API documentation, `team_id` refers to the ID of a Workspace, and `group_id` refers to the ID of a User Group.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID. **Note**: For this endpoint, `team_id`` is a required query parameter.",
      },
      group_ids: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "Enter one or more User Group IDs to retrieve information about specific User Group(s).\\ \\ For example: \\ \\ `?team_id=12456&group_ids=ABC12345&group_ids=DEF98765`",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/group",
    query: ["team_id", "group_ids"],
  },
});
