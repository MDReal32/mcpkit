import { defineTool } from "@usemcpkit/core";

export const issuesIssuesCheckUserCanBeAssignedToIssue = defineTool({
  name: "issues:issues:check_user_can_be_assigned_to_issue",
  description:
    "Check if a user can be assigned to a issue. Checks if a user has permission to be assigned to a specific issue.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      issue_number: {
        type: "integer",
        description: "The number that identifies the issue.",
      },
      assignee: {
        type: "string",
      },
    },
    required: ["owner", "repo", "issue_number", "assignee"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}",
  },
});
