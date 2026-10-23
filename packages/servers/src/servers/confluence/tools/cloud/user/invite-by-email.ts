import { defineTool } from "@usemcpkit/core";

export const cloudUserInviteByEmail = defineTool({
  name: "cloud:user:invite_by_email",
  description: "[Cloud] Invite a list of emails to the site. Invite a list of emails to the site.",
  input: {
    type: "object",
    properties: {
      emails: {
        type: "array",
        description: "List of emails to check access to site.",
        items: {
          type: "string",
        },
      },
    },
    required: ["emails"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/user/access/invite-by-email",
    body: ["emails"],
  },
});
