import { defineTool } from "@usemcpkit/core";

export const applicationsEmojisCreateApplicationEmoji = defineTool({
  name: "applications:emojis:create_application_emoji",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      image: {
        type: "string",
      },
    },
    required: ["application_id", "name", "image"],
  },
  request: {
    method: "POST",
    path: "/applications/{application_id}/emojis",
    body: ["name", "image"],
  },
});
