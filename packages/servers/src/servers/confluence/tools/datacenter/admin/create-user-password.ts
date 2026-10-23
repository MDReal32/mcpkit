import { defineTool } from "@usemcpkit/core";

export const datacenterAdminCreateUserPassword = defineTool({
  name: "datacenter:admin:create_user_password",
  description: "[Data Center] Change password. Change the password for the user identified by the username.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "the username identifying the given user",
      },
      password: {
        type: "string",
      },
    },
    required: ["username"],
  },
  request: {
    method: "POST",
    path: "/rest/api/admin/user/{username}/password",
    body: ["password"],
  },
});
