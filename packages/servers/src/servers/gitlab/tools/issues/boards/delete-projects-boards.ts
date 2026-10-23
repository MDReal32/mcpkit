import { defineTool } from "@usemcpkit/core";

export const issuesBoardsDeleteProjectsBoards = defineTool({
  name: "issues:boards:delete_projects_boards",
  description: "Delete an issue board. Deletes a specified issue board in a project.",
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
    },
    required: ["id", "board_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/boards/{board_id}",
  },
});
