import { defineTool } from "@usemcpkit/core";

export const issuesIssueWatchersRemoveWatcher = defineTool({
  name: "issues:issue_watchers:remove_watcher",
  description: "Delete watcher. Deletes a user as a watcher of an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      username: {
        type: "string",
        description: "This parameter is no longer available. See the deprecation notice for details.",
      },
      accountId: {
        type: "string",
        description:
          "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issue/{issueIdOrKey}/watchers",
    query: ["username", "accountId"],
  },
});
