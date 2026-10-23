import { defineTool } from "@usemcpkit/core";

export const adminStorageMovesCreateGroupRepositoryStorageMoves = defineTool({
  name: "admin:storage_moves:create_group_repository_storage_moves",
  description:
    "Create group repository storage moves for a storage shard. Creates repository storage moves for all groups on a specified storage shard.",
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
          "Name of the destination storage shard. If omitted, the storage is selected automatically based on storage weights.",
      },
    },
    required: ["source_storage_name"],
  },
  request: {
    method: "POST",
    path: "/group_repository_storage_moves",
    body: ["source_storage_name", "destination_storage_name"],
  },
});
