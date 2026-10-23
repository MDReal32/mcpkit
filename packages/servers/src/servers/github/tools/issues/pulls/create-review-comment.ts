import { defineTool } from "@usemcpkit/core";

export const issuesPullsCreateReviewComment = defineTool({
  name: "issues:pulls:create_review_comment",
  description:
    'Create a review comment for a pull request. Creates a review comment on the diff of a specified pull request. To add a regular comment to a pull request timeline, see "Create an issue comment."',
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
      body: {
        type: "string",
        description: "The text of the review comment.",
      },
      commit_id: {
        type: "string",
        description:
          "The SHA of the commit needing a comment. Not using the latest commit SHA may render your comment outdated if a subsequent commit modifies the line you specify as the `position`.",
      },
      path: {
        type: "string",
        description: "The relative path to the file that necessitates a comment.",
      },
      position: {
        type: "integer",
        description:
          '**This parameter is closing down. Use `line` instead**. The position in the diff where you want to add a review comment. Note this value is not the same as the line number in the file. The position value equals the number of lines down from the first "@@" hunk header in the file you want to add a comment. The line just below the "@@" line is position 1, the next line is position 2, and so on. The…',
      },
      side: {
        type: "string",
        description:
          "In a split diff view, the side of the diff that the pull request's changes appear on. Can be `LEFT` or `RIGHT`. Use `LEFT` for deletions that appear in red. Use `RIGHT` for additions that appear in green or unchanged lines that appear in white and are shown for context. For a multi-line comment, side represents whether the last line of the comment range is a deletion or addition. For more informa…",
        enum: ["LEFT", "RIGHT"],
      },
      line: {
        type: "integer",
        description:
          "**Required unless using `subject_type:file`**. The line of the blob in the pull request diff that the comment applies to. For a multi-line comment, the last line of the range that your comment applies to.",
      },
      start_line: {
        type: "integer",
        description:
          '**Required when using multi-line comments unless using `in_reply_to`**. The `start_line` is the first line in the pull request diff that your multi-line comment applies to. To learn more about multi-line comments, see "Commenting on a pull request" in the GitHub Help documentation.',
      },
      start_side: {
        type: "string",
        description:
          '**Required when using multi-line comments unless using `in_reply_to`**. The `start_side` is the starting side of the diff that the comment applies to. Can be `LEFT` or `RIGHT`. To learn more about multi-line comments, see "Commenting on a pull request" in the GitHub Help documentation. See `side` in this table for additional context.',
        enum: ["LEFT", "RIGHT", "side"],
      },
      in_reply_to: {
        type: "integer",
        description:
          'The ID of the review comment to reply to. To find the ID of a review comment with "List review comments on a pull request". When specified, all parameters other than `body` in the request body are ignored.',
      },
      subject_type: {
        type: "string",
        description: "The level at which the comment is targeted.",
        enum: ["line", "file"],
      },
    },
    required: ["owner", "repo", "pull_number", "body", "commit_id", "path"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/pulls/{pull_number}/comments",
    body: [
      "body",
      "commit_id",
      "path",
      "position",
      "side",
      "line",
      "start_line",
      "start_side",
      "in_reply_to",
      "subject_type",
    ],
  },
});
