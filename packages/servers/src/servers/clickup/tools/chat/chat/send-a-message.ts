import { defineTool } from "@usemcpkit/core";

export const chatChatSendAMessage = defineTool({
  name: "chat:chat:send_a_message",
  description: "Send a message. This endpoint creates a top level message.",
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
      assignee: {
        type: "string",
        description: "The possible assignee of the message.",
      },
      group_assignee: {
        type: "string",
        description: "The possible group assignee of the message.",
      },
      triaged_action: {
        type: "number",
        description: "The triaged action applied to the message.",
        enum: [1, 2],
      },
      triaged_object_id: {
        type: "string",
        description: "The message triaged action object id.",
      },
      triaged_object_type: {
        type: "number",
        description: "The message triaged action object type.",
      },
      type: {
        type: "string",
        description: "The type of message.",
        enum: ["message", "post"],
      },
      content: {
        type: "string",
        description:
          "The full content of the message to be created. Note: Some code examples may display additional backslashes.",
      },
      reactions: {
        type: "array",
        description: "The reactions to the message that exist at creation time",
        items: {
          type: "object",
          properties: {
            date: {
              type: "number",
              description: "The date & time the reaction was created (Unix epoch milliseconds timestamp).",
            },
            reaction: {
              type: "string",
              description: "The reaction to the message.",
            },
            user_id: {
              type: "string",
              description: "The ID of the user who created the reaction.",
            },
          },
          required: ["date", "reaction", "user_id"],
        },
      },
      followers: {
        type: "array",
        description: "The ids of the followers of the message",
        items: {
          type: "string",
        },
      },
      content_format: {
        type: "string",
        description: "The format of the Chat Message content (Default: text/md)",
        default: "text/md",
        enum: ["text/md", "text/plain"],
      },
      post_data: {
        type: "object",
        description: "The data of the post message.",
        properties: {
          title: {
            type: "string",
            description: "The title of the chat post.",
          },
          subtype: {
            type: "object",
            description: "The subtype of the chat post.",
            properties: {
              id: {
                type: "string",
                description:
                  "The subtype ID of the chat post. You can retrieve the available subtypes for your Workspace using the Get Post Subtype IDs endpoint.",
              },
            },
            required: ["id"],
          },
        },
        required: ["title", "subtype"],
      },
    },
    required: ["workspace_id", "channel_id", "type", "content"],
  },
  request: {
    method: "POST",
    path: "/v3/workspaces/{workspace_id}/chat/channels/{channel_id}/messages",
    body: [
      "assignee",
      "group_assignee",
      "triaged_action",
      "triaged_object_id",
      "triaged_object_type",
      "type",
      "content",
      "reactions",
      "followers",
      "content_format",
      "post_data",
    ],
  },
});
