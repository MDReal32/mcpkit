import { defineTool } from "@usemcpkit/core";

export const aiActiveContextCreateAdminActiveContextDeadQueueReplay = defineTool({
  name: "ai:active_context:create_admin_active_context_dead_queue_replay",
  description:
    "Replay items from the dead queue into another queue. Enqueues a background task that replays dead queue items into the specified target queue.",
  input: {
    type: "object",
    properties: {
      queue: {
        type: "string",
        description:
          "Name of the target queue, for example `retry_queue`, `second_retry_queue`, `code`, or `code_backfill`.",
      },
    },
    required: ["queue"],
  },
  request: {
    method: "POST",
    path: "/admin/active_context/dead_queue/replay",
    body: ["queue"],
  },
});
