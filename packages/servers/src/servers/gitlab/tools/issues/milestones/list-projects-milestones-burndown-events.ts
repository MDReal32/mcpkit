import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesListProjectsMilestonesBurndownEvents = defineTool({
  name: "issues:milestones:list_projects_milestones_burndown_events",
  description:
    "List all burndown chart events for a milestone. Lists all burndown chart events for a specified milestone.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      milestone_id: {
        type: "integer",
        description: "ID of the project milestone.",
      },
    },
    required: ["id", "milestone_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/milestones/{milestone_id}/burndown_events",
  },
});
