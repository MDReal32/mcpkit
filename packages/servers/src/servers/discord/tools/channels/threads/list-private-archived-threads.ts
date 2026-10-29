import { defineTool } from "@usemcpkit/core";

export const channelsThreadsListPrivateArchivedThreads = defineTool({
  name: "channels:threads:list_private_archived_threads",
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
    path: "/channels/{channel_id}/threads/archived/private",
    query: ["before", "limit"],
  },
});
