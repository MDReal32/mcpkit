import { defineTool } from "@usemcpkit/core";

export const chatChatRetrieveMessageTaggedUsers = defineTool({
  name: "chat:chat:retrieve_message_tagged_users",
  description: "Retrieve message tagged users. This endpoint retrieves tagged users for a message.",
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
    },
    required: ["workspace_id", "message_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/chat/messages/{message_id}/tagged_users",
    query: ["cursor", "limit"],
  },
});
