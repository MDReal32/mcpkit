import { defineTool } from "@usemcpkit/core";

export const issuesIssuesArchiveIssuesAsync = defineTool({
  name: "issues:issues:archive_issues_async",
  description:
    "Archive issue(s) by JQL. Enables admins to archive up to 100,000 issues in a single request using JQL, returning the URL to check the status of the submitted request.",
  input: {
    type: "object",
    properties: {
      jql: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/archive",
    body: ["jql"],
  },
});
