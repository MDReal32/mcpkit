import { defineTool } from "@usemcpkit/core";

export const applicationsEmojisListApplicationEmojis = defineTool({
  name: "applications:emojis:list_application_emojis",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
    },
    required: ["application_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/emojis",
  },
});
