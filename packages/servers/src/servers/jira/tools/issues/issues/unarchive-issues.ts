import { defineTool } from "@usemcpkit/core";

export const issuesIssuesUnarchiveIssues = defineTool({
  name: "issues:issues:unarchive_issues",
  description:
    "Unarchive issue(s) by issue keys/ID. Enables admins to unarchive up to 1000 issues in a single request using issue ID/key, returning details of the issue(s) unarchived in the process and the errors encountered, if any.",
  input: {
    type: "object",
    properties: {
      issueIdsOrKeys: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issue/unarchive",
    body: ["issueIdsOrKeys"],
  },
});
