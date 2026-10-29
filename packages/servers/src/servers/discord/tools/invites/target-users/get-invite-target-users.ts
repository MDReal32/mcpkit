import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersGetInviteTargetUsers = defineTool({
  name: "invites:target_users:get_invite_target_users",
  description: ". Get the target users for an invite.",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
    },
    required: ["code"],
  },
  request: {
    method: "GET",
    path: "/invites/{code}/target-users",
  },
});
