import { defineTool } from "@usemcpkit/core";

export const channelsThreadsListPublicArchivedThreads = defineTool({
  name: "channels:threads:list_public_archived_threads",
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
    path: "/channels/{channel_id}/threads/archived/public",
    query: ["before", "limit"],
  },
});
