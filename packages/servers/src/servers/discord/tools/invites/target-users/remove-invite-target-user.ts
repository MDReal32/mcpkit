import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersRemoveInviteTargetUser = defineTool({
  name: "invites:target_users:remove_invite_target_user",
  description: ". Remove a target user from an existing invite.",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["code", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/invites/{code}/target-users/{user_id}",
  },
});
