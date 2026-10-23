import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesDeleteGroupsMilestones = defineTool({
  name: "issues:milestones:delete_groups_milestones",
  description: "Delete a group milestone. Deletes the specified group milestone.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      milestone_id: {
        type: "integer",
        description: "ID of the group milestone.",
      },
    },
    required: ["id", "milestone_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/milestones/{milestone_id}",
  },
});
