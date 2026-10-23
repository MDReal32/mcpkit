import { defineTool } from "@usemcpkit/core";

export const softwareBoardMoveIssuesToBoard = defineTool({
  name: "software:board:move_issues_to_board",
  description:
    "Move issues to board. Move issues from the backog to the board (if they are already in the backlog of that board). This operation either moves an issue(s) onto a board from the backlog (by adding it to the issueList for the board) Or transitions the issue(s) to the first column for a kanban board with backlog. At most 50 issues may be moved at once.",
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
    path: "/rest/agile/1.0/board/{boardId}/issue",
    body: ["issues", "rankAfterIssue", "rankBeforeIssue", "rankCustomFieldId"],
  },
});
