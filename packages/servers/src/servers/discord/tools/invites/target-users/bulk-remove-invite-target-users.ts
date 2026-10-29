import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersBulkRemoveInviteTargetUsers = defineTool({
  name: "invites:target_users:bulk_remove_invite_target_users",
  description: ". Remove multiple target users from an existing invite.",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
      user_ids: {
        type: "array",
        description: "The IDs of the users to stop targeting.",
        items: {
          type: "string",
        },
      },
    },
    required: ["code", "user_ids"],
  },
  request: {
    method: "POST",
    path: "/invites/{code}/target-users/bulk-delete",
    body: ["user_ids"],
  },
});
