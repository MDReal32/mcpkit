import { defineTool } from "@usemcpkit/core";

export const issuesIssueSearchMatchIssues = defineTool({
  name: "issues:issue_search:match_issues",
  description:
    "Check issues against JQL. Checks whether one or more issues would be returned by one or more JQL queries. Up to 10 JQL queries can be specified and up to 50 issue IDs included in the request.",
  input: {
    type: "object",
    properties: {
      issueIds: {
        type: "array",
        description: "A list of up to 50 issue IDs.",
        items: {
          type: "integer",
          description: "A list of up to 50 issue IDs.",
        },
      },
      jqls: {
        type: "array",
        description: "A list of up to 10 JQL queries.",
        items: {
          type: "string",
          description: "A list of up to 10 JQL queries.",
        },
      },
    },
    required: ["issueIds", "jqls"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/jql/match",
    body: ["issueIds", "jqls"],
  },
});
