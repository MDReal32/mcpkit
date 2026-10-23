import { defineTool } from "@usemcpkit/core";

export const groupsMembersDeleteGroupsBillableMembers = defineTool({
  name: "groups:members:delete_groups_billable_members",
  description:
    "Remove a billable member from a group. Removes a specified billable member from a group and its subgroups and projects. The user does not need to be a group member to qualify for removal. For example, if the user was added directly to a project in the group, you can still remove them using this operation.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      user_id: {
        type: "integer",
        description: "ID of the user.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/billable_members/{user_id}",
  },
});
