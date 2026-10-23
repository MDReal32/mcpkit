import { defineTool } from "@usemcpkit/core";

export const issuesPullsDeleteReviewComment = defineTool({
  name: "issues:pulls:delete_review_comment",
  description: "Delete a review comment for a pull request. Deletes a review comment.",
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
      comment_id: {
        type: "integer",
        description: "The unique identifier of the comment.",
      },
    },
    required: ["owner", "repo", "comment_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/pulls/comments/{comment_id}",
  },
});
