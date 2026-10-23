import { defineTool } from "@usemcpkit/core";

export const issuesIssueWatchersGetIsWatchingIssueBulk = defineTool({
  name: "issues:issue_watchers:get_is_watching_issue_bulk",
  description:
    "Get is watching issue bulk. Returns, for the user, details of the watched status of issues from a list. If an issue ID is invalid, the returned watched status is `false`.",
  input: {
    type: "object",
    properties: {
      issueIds: {
        type: "array",
        description: "The list of issue IDs.",
        items: {
          type: "string",
        },
      },
    },
    required: ["issueIds"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/watching",
    body: ["issueIds"],
  },
});
