import { defineTool } from "@usemcpkit/core";

export const datacenterUserCreateCurrentPassword = defineTool({
  name: "datacenter:user:create_current_password",
  description: "[Data Center] Change password. Change the password for the current user.",
  input: {
    type: "object",
    properties: {
      oldPassword: {
        type: "string",
      },
      newPassword: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/user/current/password",
    body: ["oldPassword", "newPassword"],
  },
});
