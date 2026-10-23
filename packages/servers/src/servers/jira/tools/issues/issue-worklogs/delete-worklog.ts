import { defineTool } from "@usemcpkit/core";

export const issuesIssueWorklogsDeleteWorklog = defineTool({
  name: "issues:issue_worklogs:delete_worklog",
  description: "Delete worklog. Deletes a worklog from an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      id: {
        type: "string",
        description: "The ID of the worklog.",
      },
      notifyUsers: {
        type: "boolean",
        default: true,
        description: "Whether users watching the issue are notified by email.",
      },
      adjustEstimate: {
        type: "string",
        default: "auto",
        enum: ["new", "leave", "manual", "auto"],
        description: "Defines how to update the issue's time estimate, the options are:",
      },
      newEstimate: {
        type: "string",
        description:
          "The value to set as the issue's remaining time estimate, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `new`.",
      },
      increaseBy: {
        type: "string",
        description:
          "The amount to increase the issue's remaining estimate by, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `manual`.",
      },
      overrideEditableFlag: {
        type: "boolean",
        default: false,
        description:
          "Whether the work log entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag.",
      },
    },
    required: ["issueIdOrKey", "id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issue/{issueIdOrKey}/worklog/{id}",
    query: ["notifyUsers", "adjustEstimate", "newEstimate", "increaseBy", "overrideEditableFlag"],
  },
});
