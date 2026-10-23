import { defineTool } from "@usemcpkit/core";

export const issuesIssueLinksDeleteIssueLink = defineTool({
  name: "issues:issue_links:delete_issue_link",
  description: "Delete issue link. Deletes an issue link.",
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
    method: "DELETE",
    path: "/rest/api/2/issueLink/{linkId}",
  },
});
