import { defineTool } from "@usemcpkit/core";

export const applicationsEmojisUpdateApplicationEmoji = defineTool({
  name: "applications:emojis:update_application_emoji",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      emoji_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
    },
    required: ["application_id", "emoji_id"],
  },
  request: {
    method: "PATCH",
    path: "/applications/{application_id}/emojis/{emoji_id}",
    body: ["name"],
  },
});
