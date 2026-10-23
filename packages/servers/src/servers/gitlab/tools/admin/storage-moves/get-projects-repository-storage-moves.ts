import { defineTool } from "@usemcpkit/core";

export const adminStorageMovesGetProjectsRepositoryStorageMoves = defineTool({
  name: "admin:storage_moves:get_projects_repository_storage_moves",
  description:
    "Retrieve a repository storage move for a project. Retrieves a specified repository storage move for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      repository_storage_move_id: {
        type: "integer",
        description: "ID of the project repository storage move.",
      },
    },
    required: ["id", "repository_storage_move_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository_storage_moves/{repository_storage_move_id}",
  },
});
