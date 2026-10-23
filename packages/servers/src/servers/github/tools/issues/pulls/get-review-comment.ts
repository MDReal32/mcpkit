import { defineTool } from "@usemcpkit/core";

export const issuesPullsGetReviewComment = defineTool({
  name: "issues:pulls:get_review_comment",
  description: "Get a review comment for a pull request. Provides details for a specified review comment.",
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
    method: "GET",
    path: "/repos/{owner}/{repo}/pulls/comments/{comment_id}",
  },
});
