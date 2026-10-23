import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesListGroupsMilestonesMergeRequests = defineTool({
  name: "issues:milestones:list_groups_milestones_merge_requests",
  description:
    "List all merge requests assigned to a single milestone. Lists all merge requests assigned to a specified group milestone.",
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
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id", "milestone_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/milestones/{milestone_id}/merge_requests",
    query: ["page", "per_page"],
  },
});
