import { defineTool } from "@usemcpkit/core";

export const softwareSprintMoveIssuesToSprintAndRank = defineTool({
  name: "software:sprint:move_issues_to_sprint_and_rank",
  description:
    "Move issues to sprint and rank. Moves issues to a sprint, for a given sprint ID. Issues can only be moved to open or active sprints. The maximum number of issues that can be moved in one operation is 50.",
  input: {
    type: "object",
    properties: {
      sprintId: {
        type: "integer",
        description: "The ID of the sprint that you want to assign issues to.",
      },
      issues: {
        type: "array",
        items: {
          type: "string",
        },
      },
      rankAfterIssue: {
        type: "string",
      },
      rankBeforeIssue: {
        type: "string",
      },
      rankCustomFieldId: {
        type: "integer",
      },
    },
    required: ["sprintId"],
  },
  request: {
    method: "POST",
    path: "/rest/agile/1.0/sprint/{sprintId}/issue",
    body: ["issues", "rankAfterIssue", "rankBeforeIssue", "rankCustomFieldId"],
  },
});
