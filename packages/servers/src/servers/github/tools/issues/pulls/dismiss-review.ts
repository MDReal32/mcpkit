import { defineTool } from "@usemcpkit/core";

export const issuesPullsDismissReview = defineTool({
  name: "issues:pulls:dismiss_review",
  description: "Dismiss a review for a pull request. Dismisses a specified review on a pull request.",
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
      review_id: {
        type: "integer",
        description: "The unique identifier of the review.",
      },
      message: {
        type: "string",
        description: "The message for the pull request review dismissal",
      },
      event: {
        type: "string",
        enum: ["DISMISS"],
      },
    },
    required: ["owner", "repo", "pull_number", "review_id", "message"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals",
    body: ["message", "event"],
  },
});
