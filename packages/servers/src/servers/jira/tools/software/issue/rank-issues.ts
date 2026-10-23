import { defineTool } from "@usemcpkit/core";

export const softwareIssueRankIssues = defineTool({
  name: "software:issue:rank_issues",
  description:
    "Rank issues. Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once.",
  input: {
    type: "object",
    properties: {
      issues: {
        type: "array",
        items: {
          type: "string",
        },
      },
      rankAfterIssue: {
        type: "string",
      },
      rankBeforeIssue: {
        type: "string",
      },
      rankCustomFieldId: {
        type: "integer",
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/agile/1.0/issue/rank",
    body: ["issues", "rankAfterIssue", "rankBeforeIssue", "rankCustomFieldId"],
  },
});
