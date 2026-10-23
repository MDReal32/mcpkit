import { defineTool } from "@usemcpkit/core";

export const issuesIssuesCreateProjectsIssuesAddSpentTime = defineTool({
  name: "issues:issues:create_projects_issues_add_spent_time",
  description: "Add spent time for an issue. Adds spent time for a specified issue.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      issue_iid: {
        type: "integer",
        description: "The internal ID of the issue.",
      },
      duration: {
        type: "string",
        description: "Duration in human-readable format, for example `3h30m`.",
      },
    },
    required: ["id", "issue_iid", "duration"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/issues/{issue_iid}/add_spent_time",
    body: ["duration"],
  },
});
