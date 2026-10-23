import { defineTool } from "@usemcpkit/core";

export const issuesIssueRemoteLinksDeleteRemoteIssueLinkByGlobalId = defineTool({
  name: "issues:issue_remote_links:delete_remote_issue_link_by_global_id",
  description:
    "Delete remote issue link by global ID. Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http://www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      globalId: {
        type: "string",
        description: "The global ID of a remote issue link.",
      },
    },
    required: ["issueIdOrKey", "globalId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issue/{issueIdOrKey}/remotelink",
    query: ["globalId"],
  },
});
