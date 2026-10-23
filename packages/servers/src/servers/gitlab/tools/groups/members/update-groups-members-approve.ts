import { defineTool } from "@usemcpkit/core";

export const groupsMembersUpdateGroupsMembersApprove = defineTool({
  name: "groups:members:update_groups_members_approve",
  description:
    "Approve a group member. Approves a specified pending user for a top-level group and any subgroups or projects.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      member_id: {
        type: "integer",
        description: "ID of the member.",
      },
    },
    required: ["id", "member_id"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/members/{member_id}/approve",
  },
});
