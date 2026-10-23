import { defineTool } from "@usemcpkit/core";

export const aiActiveContextUpdateAdminActiveContextCollections = defineTool({
  name: "ai:active_context:update_admin_active_context_collections",
  description:
    "Update collection options. Updates the queue shard count and/or queue shard limit for the specified collection.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Name or ID of the collection.",
      },
      queue_shard_count: {
        type: "integer",
        description:
          "Number of queue shards. At least one of `queue_shard_count`, `queue_shard_limit` must be provided.",
      },
      queue_shard_limit: {
        type: "integer",
        description:
          "Maximum number of queued items processed from each queue shard at a time. At least one of `queue_shard_count`, `queue_shard_limit` must be provided.",
      },
      connection_id: {
        type: "integer",
        description: "ID of the connection. If omitted, defaults to the active connection.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/admin/active_context/collections/{id}",
    body: ["queue_shard_count", "queue_shard_limit", "connection_id"],
  },
});
