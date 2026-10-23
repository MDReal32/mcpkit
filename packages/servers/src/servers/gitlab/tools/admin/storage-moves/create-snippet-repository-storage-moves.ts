import { defineTool } from "@usemcpkit/core";

export const adminStorageMovesCreateSnippetRepositoryStorageMoves = defineTool({
  name: "admin:storage_moves:create_snippet_repository_storage_moves",
  description:
    "Schedule repository storage moves for all snippets on a storage shard. Schedules repository storage moves for each snippet repository stored on the source storage shard. This endpoint migrates all snippets at once.",
  input: {
    type: "object",
    properties: {
      source_storage_name: {
        type: "string",
        description: "Name of the source storage shard.",
      },
      destination_storage_name: {
        type: "string",
        description:
          "Name of the destination storage shard. If not provided, the storage is selected automatically based on storage weights.",
      },
    },
    required: ["source_storage_name"],
  },
  request: {
    method: "POST",
    path: "/snippet_repository_storage_moves",
    body: ["source_storage_name", "destination_storage_name"],
  },
});
