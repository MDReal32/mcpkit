import { defineTool } from "@usemcpkit/core";

export const invitesInvitesInviteRevoke = defineTool({
  name: "invites:invites:invite_revoke",
  description: "",
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
    method: "DELETE",
    path: "/invites/{code}",
  },
});
