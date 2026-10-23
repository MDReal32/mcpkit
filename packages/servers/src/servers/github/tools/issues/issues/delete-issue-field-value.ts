import { defineTool } from "@usemcpkit/core";

export const issuesIssuesDeleteIssueFieldValue = defineTool({
  name: "issues:issues:delete_issue_field_value",
  description: "Delete an issue field value from an issue. Remove a specific custom field value from an issue.",
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
      issue_field_id: {
        type: "integer",
        description: "The unique identifier of the issue field.",
      },
    },
    required: ["owner", "repo", "issue_number", "issue_field_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values/{issue_field_id}",
  },
});
