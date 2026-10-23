import { defineTool } from "@usemcpkit/core";

export const datacenterUserUpdateCurrent = defineTool({
  name: "datacenter:user:update_current",
  description: "[Data Center] Update details of the current user. Change the current user's details.",
  input: {
    type: "object",
    properties: {
      fullName: {
        type: "string",
      },
      email: {
        type: "string",
      },
      currentPassword: {
        type: "string",
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/user/current",
    body: ["fullName", "email", "currentPassword"],
  },
});
