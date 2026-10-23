import { defineTool } from "@usemcpkit/core";

export const datacenterPermissionsGetUser = defineTool({
  name: "datacenter:permissions:get_user",
  description: "[Data Center] Gets global permissions granted to a user. Returns list of permissions granted to user.",
  input: {
    type: "object",
    properties: {
      user: {
        type: "string",
        description: "the key or username of the user to look up.",
      },
    },
    required: ["user"],
  },
  request: {
    method: "GET",
    path: "/rest/api/permissions/user/{user}",
  },
});
