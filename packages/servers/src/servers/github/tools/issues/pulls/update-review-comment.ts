import { defineTool } from "@usemcpkit/core";

export const issuesPullsUpdateReviewComment = defineTool({
  name: "issues:pulls:update_review_comment",
  description: "Update a review comment for a pull request. Edits the content of a specified review comment.",
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
      body: {
        type: "string",
        description: "The text of the reply to the review comment.",
      },
    },
    required: ["owner", "repo", "comment_id", "body"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/pulls/comments/{comment_id}",
    body: ["body"],
  },
});
