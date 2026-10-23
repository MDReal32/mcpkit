import { defineTool } from "@usemcpkit/core";

export const issuesIssueWorklogsBulkMoveWorklogs = defineTool({
  name: "issues:issue_worklogs:bulk_move_worklogs",
  description:
    "Bulk move worklogs. Moves a list of worklogs from one issue to another. This is an experimental API with several limitations:",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
      },
      adjustEstimate: {
        type: "string",
        default: "auto",
        enum: ["leave", "auto"],
        description: "Defines how to update the issues' time estimate, the options are:",
      },
      overrideEditableFlag: {
        type: "boolean",
        default: false,
        description:
          "Whether the work log entry should be moved to and from the issues even if the issues are not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag.",
      },
      ids: {
        type: "array",
        description: "A list of worklog IDs.",
        items: {
          type: "integer",
        },
      },
      body_issueIdOrKey: {
        type: "string",
        description: "The issue id or key of the destination issue",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/{issueIdOrKey}/worklog/move",
    query: ["adjustEstimate", "overrideEditableFlag"],
    body: {
      ids: "ids",
      issueIdOrKey: "body_issueIdOrKey",
    },
  },
});
