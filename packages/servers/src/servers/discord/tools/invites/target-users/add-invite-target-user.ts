import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersAddInviteTargetUser = defineTool({
  name: "invites:target_users:add_invite_target_user",
  description: ". Add a target user to an existing invite.",
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
    method: "PUT",
    path: "/invites/{code}/target-users/{user_id}",
  },
});
