import { defineTool } from "@usemcpkit/core";

export const datacenterAdminCreateUser = defineTool({
  name: "datacenter:admin:create_user",
  description: "[Data Center] Create user. One of the following options could be used:",
  input: {
    type: "object",
    properties: {
      userName: {
        type: "string",
      },
      fullName: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
      notifyViaEmail: {
        type: "boolean",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/admin/user",
    body: ["userName", "fullName", "email", "password", "notifyViaEmail"],
  },
});
