import { defineTool } from "@usemcpkit/core";

export const issuesMilestonesCreateProjectsMilestonesPromote = defineTool({
  name: "issues:milestones:create_projects_milestones_promote",
  description:
    "Promote a project milestone to a group milestone. Promotes a specified project milestone to a group milestone. Only for users with the Planner, Reporter, Developer, Maintainer, or Owner role for the group.",
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
    method: "POST",
    path: "/projects/{id}/milestones/{milestone_id}/promote",
  },
});
