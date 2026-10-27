import { defineTool } from "@usemcpkit/core";

export const chatChatRetrieveMessageReplies = defineTool({
  name: "chat:chat:retrieve_message_replies",
  description: "Retrieve message replies. This endpoint retrieves the replies to a message.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      message_id: {
        type: "string",
        description: "The ID of the specified message.",
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
    required: ["workspace_id", "message_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/chat/messages/{message_id}/replies",
    query: ["cursor", "limit", "content_format"],
  },
});
