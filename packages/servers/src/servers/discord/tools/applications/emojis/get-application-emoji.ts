import { defineTool } from "@usemcpkit/core";

export const applicationsEmojisGetApplicationEmoji = defineTool({
  name: "applications:emojis:get_application_emoji",
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
    },
    required: ["application_id", "emoji_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/emojis/{emoji_id}",
  },
});
