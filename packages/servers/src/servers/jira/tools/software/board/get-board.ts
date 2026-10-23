import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetBoard = defineTool({
  name: "software:board:get_board",
  description:
    "Get board. Returns the board for the given board ID. This board will only be returned if the user has permission to view it. Admins without the view permission will see the board as a private one, so will see only a subset of the board's data (board location for instance).",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
        description: "The ID of the requested board.",
      },
    },
    required: ["boardId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}",
  },
});
