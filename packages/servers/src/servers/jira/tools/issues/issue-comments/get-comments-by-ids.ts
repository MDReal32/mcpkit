import { defineTool } from "@usemcpkit/core";

export const issuesIssueCommentsGetCommentsByIds = defineTool({
  name: "issues:issue_comments:get_comments_by_ids",
  description: "Get comments by IDs. Returns a paginated list of comments specified by a list of comment IDs.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about comments in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      ids: {
        type: "array",
        description: "The list of comment IDs. A maximum of 1000 IDs can be specified.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["ids"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/comment/list",
    query: ["expand"],
    body: ["ids"],
  },
});
