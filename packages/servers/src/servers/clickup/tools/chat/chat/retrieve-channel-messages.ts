import { defineTool } from "@usemcpkit/core";

export const chatChatRetrieveChannelMessages = defineTool({
  name: "chat:chat:retrieve_channel_messages",
  description: "Retrieve Channel messages. This endpoint retrieves messages for a specified Channel.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      channel_id: {
        type: "string",
        description: "The ID of the Channel where the messages live.",
      },
      cursor: {
        type: "string",
        description: "The cursor to use to fetch the next page of results.",
      },
      limit: {
        type: "integer",
        default: 50,
        description: "The maximum number of results to fetch for this page.",
      },
      content_format: {
        type: "string",
        default: "text/md",
        enum: ["text/md", "text/plain"],
        description: "Format of the message content (Default: text/md).",
      },
    },
    required: ["workspace_id", "channel_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/messages",
    query: ["cursor", "limit", "content_format"],
  },
});
