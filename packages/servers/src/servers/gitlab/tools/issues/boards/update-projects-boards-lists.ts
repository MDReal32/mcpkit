import { defineTool } from "@usemcpkit/core";

export const issuesBoardsUpdateProjectsBoardsLists = defineTool({
  name: "issues:boards:update_projects_boards_lists",
  description: "Update position of a board list. Updates the position of a specified list from an issue board.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
    path: "/projects/{id}/boards/{board_id}/lists/{list_id}",
    body: ["position"],
  },
});
