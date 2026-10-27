import { defineTool } from "@usemcpkit/core";

export const invitesTargetUsersUpdateInviteTargetUsers = defineTool({
  name: "invites:target_users:update_invite_target_users",
  description: ". Update the target users for an existing invite.",
  input: {
    type: "object",
    properties: {
      code: {
        type: "string",
      },
      target_users_file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["code", "target_users_file"],
  },
  request: {
    method: "PUT",
    path: "/invites/{code}/target-users",
    body: ["target_users_file"],
    contentType: "multipart/form-data",
    fileArgs: ["target_users_file"],
  },
});
