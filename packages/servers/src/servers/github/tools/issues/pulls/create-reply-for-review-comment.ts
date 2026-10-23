import { defineTool } from "@usemcpkit/core";

export const issuesPullsCreateReplyForReviewComment = defineTool({
  name: "issues:pulls:create_reply_for_review_comment",
  description:
    "Create a reply for a review comment. Creates a reply to a review comment for a pull request. For the `comment_id`, provide the ID of the review comment you are replying to. This must be the ID of a _top-level review comment_, not a reply to that comment. Replies to replies are not supported.",
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
      pull_number: {
        type: "integer",
        description: "The number that identifies the pull request.",
      },
      comment_id: {
        type: "integer",
        description: "The unique identifier of the comment.",
      },
      body: {
        type: "string",
        description: "The text of the review comment.",
      },
    },
    required: ["owner", "repo", "pull_number", "comment_id", "body"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies",
    body: ["body"],
  },
});
