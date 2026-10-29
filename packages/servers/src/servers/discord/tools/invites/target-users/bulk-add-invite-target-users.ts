import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersBulkAddInviteTargetUsers = defineTool({
  name: "invites:target_users:bulk_add_invite_target_users",
  description: ". Add multiple target users to an existing invite.",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
      user_ids: {
        type: "array",
        description: "The IDs of the users to target.",
        items: {
          type: "string",
        },
      },
    },
    required: ["code", "user_ids"],
  },
  request: {
    method: "POST",
    path: "/invites/{code}/target-users/bulk-add",
    body: ["user_ids"],
  },
});
