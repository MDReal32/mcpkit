import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesListGroupsMilestonesBurndownEvents = defineTool({
  name: "issues:milestones:list_groups_milestones_burndown_events",
  description:
    "List all burndown chart events for a milestone. Lists all burndown chart events for a specified milestone.",
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
    method: "GET",
    path: "/groups/{id}/milestones/{milestone_id}/burndown_events",
  },
});
