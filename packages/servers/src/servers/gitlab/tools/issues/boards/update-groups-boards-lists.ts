import { defineTool } from "@usemcpkit/core";

export const issuesBoardsUpdateGroupsBoardsLists = defineTool({
  name: "issues:boards:update_groups_boards_lists",
  description:
    "Update a group issue board list. Updates a specified group issue board list. This call is used to change list position.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      board_id: {
        type: "integer",
        description: "ID of the board.",
      },
      list_id: {
        type: "integer",
        description: "ID of the board's list.",
      },
      position: {
        type: "integer",
        description: "Position of the list.",
      },
    },
    required: ["id", "board_id", "list_id", "position"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/boards/{board_id}/lists/{list_id}",
    body: ["position"],
  },
});
