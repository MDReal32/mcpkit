import { defineTool } from "@usemcpkit/core";

export const groupsAccessRequestsUpdateGroupsAccessRequestsApprove = defineTool({
  name: "groups:access_requests:update_groups_access_requests_approve",
  description: "Approve an access request. Approves an access request for a specified user in a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      user_id: {
        type: "integer",
        description: "ID of the user requesting access.",
      },
      access_level: {
        type: "integer",
        description: "Access level to grant to the approved user. For a list of values, see roles.",
        default: 30,
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/access_requests/{user_id}/approve",
    body: ["access_level"],
  },
});
