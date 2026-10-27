import { defineTool } from "@usemcpkit/core";

export const channelsThreadsListMyPrivateArchivedThreads = defineTool({
  name: "channels:threads:list_my_private_archived_threads",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      before: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
    },
    required: ["channel_id"],
  },
  request: {
    method: "GET",
    path: "/channels/{channel_id}/users/@me/threads/archived/private",
    query: ["before", "limit"],
  },
});
