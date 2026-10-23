import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetReportsForBoard = defineTool({
  name: "software:board:get_reports_for_board",
  description: "Get reports for board",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
      },
    },
    required: ["boardId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}/reports",
  },
});
