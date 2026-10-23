import { defineTool } from "@usemcpkit/core";

export const issuesIssueRemoteLinksGetRemoteIssueLinks = defineTool({
  name: "issues:issue_remote_links:get_remote_issue_links",
  description:
    "Get remote issue links. Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1…",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      globalId: {
        type: "string",
        description: "The global ID of the remote issue link.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}/remotelink",
    query: ["globalId"],
  },
});
