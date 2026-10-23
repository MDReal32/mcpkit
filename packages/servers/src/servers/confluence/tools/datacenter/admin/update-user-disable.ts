import { defineTool } from "@usemcpkit/core";

export const datacenterAdminUpdateUserDisable = defineTool({
  name: "datacenter:admin:update_user_disable",
  description:
    "[Data Center] Disable user. Disables the given User identified by username. This method is idempotent i.e. if the user is already disabled then no action will be taken.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "the username identifying the given user",
      },
    },
    required: ["username"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/admin/user/{username}/disable",
  },
});
