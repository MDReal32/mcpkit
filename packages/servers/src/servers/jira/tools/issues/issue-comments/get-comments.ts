import { defineTool } from "@usemcpkit/core";

export const issuesIssueCommentsGetComments = defineTool({
  name: "issues:issue_comments:get_comments",
  description: "Get comments. Returns all comments for an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 100,
        description: "The maximum number of items to return per page.",
      },
      orderBy: {
        type: "string",
        enum: ["created", "-created", "+created"],
        description: "Order the results by a field. Accepts *created* to sort comments by their created date.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}/comment",
    query: ["startAt", "maxResults", "orderBy", "expand"],
  },
});
