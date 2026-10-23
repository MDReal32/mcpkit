import { defineTool } from "@usemcpkit/core";

export const issuesIssueVotesRemoveVote = defineTool({
  name: "issues:issue_votes:remove_vote",
  description:
    "Delete vote. Deletes a user's vote from an issue. This is the equivalent of the user clicking *Unvote* on an issue in Jira.",
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
    method: "DELETE",
    path: "/rest/api/2/issue/{issueIdOrKey}/votes",
  },
});
