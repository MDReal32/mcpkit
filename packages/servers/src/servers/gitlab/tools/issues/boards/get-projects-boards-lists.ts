import { defineTool } from "@usemcpkit/core";

export const issuesBoardsGetProjectsBoardsLists = defineTool({
  name: "issues:boards:get_projects_boards_lists",
  description: "Retrieve a board list. Retrieves a specified list from an issue board.",
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
    },
    required: ["id", "board_id", "list_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/boards/{board_id}/lists/{list_id}",
  },
});
