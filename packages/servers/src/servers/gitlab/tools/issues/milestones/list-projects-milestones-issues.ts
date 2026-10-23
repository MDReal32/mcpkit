import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesListProjectsMilestonesIssues = defineTool({
  name: "issues:milestones:list_projects_milestones_issues",
  description: "List all issues for a project milestone. Lists all issues assigned to a specified project milestone.",
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
    path: "/projects/{id}/milestones/{milestone_id}/issues",
    query: ["page", "per_page"],
  },
});
