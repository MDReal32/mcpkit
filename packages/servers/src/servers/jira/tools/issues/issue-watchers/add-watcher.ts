import { defineTool } from "@usemcpkit/core";

export const issuesIssueWatchersAddWatcher = defineTool({
  name: "issues:issue_watchers:add_watcher",
  description:
    'Add watcher. Adds a user as a watcher of an issue by passing the account ID of the user. For example, `"5b10ac8d82e05b22cc7d4ef5"`. If no user is specified the calling user is added.',
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      body: {
        type: "string",
      },
    },
    required: ["issueIdOrKey", "body"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/{issueIdOrKey}/watchers",
    bodyArg: "body",
  },
});
