import { defineTool } from "@usemcpkit/core";

export const issuesIssueLinksGetIssueLink = defineTool({
  name: "issues:issue_links:get_issue_link",
  description: "Get issue link. Returns an issue link.",
  input: {
    type: "object",
    properties: {
      linkId: {
        type: "string",
        description: "The ID of the issue link.",
      },
    },
    required: ["linkId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issueLink/{linkId}",
  },
});
