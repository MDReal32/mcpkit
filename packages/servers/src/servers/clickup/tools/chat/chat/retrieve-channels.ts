import { defineTool } from "@usemcpkit/core";

export const chatChatRetrieveChannels = defineTool({
  name: "chat:chat:retrieve_channels",
  description: "Retrieve Channels. This endpoint retrieves the Channels in a Workspace.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      description_format: {
        type: "string",
        enum: ["text/md", "text/plain"],
        description: "Format of the Channel description (Default: text/md).",
      },
      cursor: {
        type: "string",
        description: "Used to request the next page of results.",
      },
      limit: {
        type: "integer",
        default: 50,
        description: "The maximum number of results to fetch for this page.",
      },
      is_follower: {
        type: "boolean",
        default: false,
        description: "Only return Channels the user is following.",
      },
      include_closed: {
        type: "boolean",
        default: false,
        description: "Include DMs/Group DMs that have been explicitly closed.",
      },
      with_message_since: {
        type: "number",
        description: "Only return Channels with at least one message since the given timestamp.",
      },
      channel_types: {
        description: "Specify the types of Channels to return from the request.",
      },
    },
    required: ["workspace_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/chat/channels",
    query: [
      "description_format",
      "cursor",
      "limit",
      "is_follower",
      "include_closed",
      "with_message_since",
      "channel_types",
    ],
  },
});
