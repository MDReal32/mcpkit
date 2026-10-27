import { defineTool } from "@usemcpkit/core";

export const chatChatRetrieveAChannel = defineTool({
  name: "chat:chat:retrieve_a_channel",
  description: "Retrieve a Channel. This endpoint retrieves a specific Channel given its ID.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      channel_id: {
        type: "string",
        description: "The ID of the specified Channel.",
      },
      description_format: {
        type: "string",
        enum: ["text/md", "text/plain"],
        description: "Format of the Channel description (Default: text/md).",
      },
    },
    required: ["workspace_id", "channel_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/chat/channels/{channel_id}",
    query: ["description_format"],
  },
});
