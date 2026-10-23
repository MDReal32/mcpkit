import { defineTool } from "@usemcpkit/core";

export const issuesIssuesCreateProjectsIssuesResetSpentTime = defineTool({
  name: "issues:issues:create_projects_issues_reset_spent_time",
  description: "Reset spent time for an issue. Resets the total spent time for a specified issue to `0` seconds.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of the issue",
      },
    },
    required: ["id", "issue_iid"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/reset_spent_time",
  },
});
