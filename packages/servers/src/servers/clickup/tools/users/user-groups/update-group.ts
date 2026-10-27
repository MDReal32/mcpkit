import { defineTool } from "@usemcpkit/core";

export const usersUserGroupsUpdateGroup = defineTool({
  name: "users:user_groups:update_group",
  description:
    "Update Group. This endpoint is used to manage User Groups, which are groups of users within your Workspace.\\ \\ In our API, `team_id` in the path refers to the Workspace ID, and `group_id` refers to the ID of a User Group.\\ \\ **Note:** Adding a guest with view-only permissions to a User Group automatically converts them to a paid guest.\\ \\ If you don't have any paid guest seats available, a new member seat is a…",
  input: {
    type: "object",
    properties: {
      group_id: {
        type: "string",
        description: "User Group ID",
      },
      name: {
        type: "string",
      },
      handle: {
        type: "string",
      },
      members: {
        type: "object",
        properties: {
          add: {
            type: "array",
            items: {
              type: "integer",
            },
          },
          rem: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["add", "rem"],
      },
    },
    required: ["group_id"],
  },
  request: {
    method: "PUT",
    path: "/v2/group/{group_id}",
    body: ["name", "handle", "members"],
  },
});
