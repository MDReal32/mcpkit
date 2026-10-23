import { defineTool } from "@usemcpkit/core";

export const cloudUserCheckAccessByEmail = defineTool({
  name: "cloud:user:check_access_by_email",
  description:
    "[Cloud] Check site access for a list of emails. Returns the list of emails from the input list that do not have access to site.",
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
    path: "/wiki/api/v2/user/access/check-access-by-email",
    body: ["emails"],
  },
});
