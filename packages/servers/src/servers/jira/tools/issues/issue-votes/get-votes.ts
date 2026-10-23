import { defineTool } from "@usemcpkit/core";

export const issuesIssueVotesGetVotes = defineTool({
  name: "issues:issue_votes:get_votes",
  description: "Get votes. Returns details about the votes on an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}/votes",
  },
});
