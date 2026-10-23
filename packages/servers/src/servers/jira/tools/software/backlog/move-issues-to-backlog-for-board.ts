import { defineTool } from "@usemcpkit/core";

export const softwareBacklogMoveIssuesToBacklogForBoard = defineTool({
  name: "software:backlog:move_issues_to_backlog_for_board",
  description:
    "Move issues to backlog for board. Move issues to the backlog of a particular board (if they are already on that board). This operation is equivalent to remove future and active sprints from a given set of issues if the board has sprints If the board does not have sprints this will put the issues back into the backlog from the board. At most 50 issues may be moved at once.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
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
    required: ["boardId"],
  },
  request: {
    method: "POST",
    path: "/rest/agile/1.0/backlog/{boardId}/issue",
    body: ["issues", "rankAfterIssue", "rankBeforeIssue", "rankCustomFieldId"],
  },
});
