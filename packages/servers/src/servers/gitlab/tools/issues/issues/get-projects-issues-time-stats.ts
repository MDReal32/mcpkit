import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetProjectsIssuesTimeStats = defineTool({
  name: "issues:issues:get_projects_issues_time_stats",
  description:
    "Retrieve time tracking stats for an issue. Retrieves time tracking stats for a specified issue, including time estimate and time spent in seconds and human-readable format (for example, `1h 30m`).",
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
    method: "GET",
    path: "/projects/{id}/issues/{issue_iid}/time_stats",
  },
});
