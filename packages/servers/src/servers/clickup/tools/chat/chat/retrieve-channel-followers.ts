import { defineTool } from "@usemcpkit/core";

export const chatChatRetrieveChannelFollowers = defineTool({
  name: "chat:chat:retrieve_channel_followers",
  description: "Retrieve Channel followers. This endpoint retrieves followers of a specific Channel given its ID.",
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
    required: ["workspace_id", "channel_id"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/followers",
    query: ["cursor", "limit"],
  },
});
