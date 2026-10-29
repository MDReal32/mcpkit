import { defineTool } from "@usemcpkit/core";

export const chatChatCreateADirectMessage = defineTool({
  name: "chat:chat:create_a_direct_message",
  description:
    "Create a Direct Message. This endpoint creates a new Direct Message between up to 15 users. If a Direct Message between those users already exists it returns it.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "The ID of the Workspace.",
      },
      user_ids: {
        type: "array",
        description:
          "The unique user IDs of participants in the direct message Chat, up to 15. A Self DM is created when no user IDs are provided",
        items: {
          type: "string",
        },
      },
    },
    required: ["workspace_id"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/chat/channels/direct_message",
    body: ["user_ids"],
  },
});
