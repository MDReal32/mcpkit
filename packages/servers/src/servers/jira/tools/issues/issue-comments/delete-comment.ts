import { defineTool } from "@usemcpkit/core";

export const issuesIssueCommentsDeleteComment = defineTool({
  name: "issues:issue_comments:delete_comment",
  description: "Delete comment. Deletes a comment.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      id: {
        type: "string",
        description: "The ID of the comment.",
      },
    },
    required: ["issueIdOrKey", "id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issue/{issueIdOrKey}/comment/{id}",
  },
});
