import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesGetProjectsMilestones = defineTool({
  name: "issues:milestones:get_projects_milestones",
  description: "Retrieve a project milestone. Retrieves a specified project milestone.",
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
    path: "/projects/{id}/milestones/{milestone_id}",
  },
});
