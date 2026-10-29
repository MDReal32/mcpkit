import { defineTool } from "@usemcpkit/core";

export const usersChannelsCreateDm = defineTool({
  name: "users:channels:create_dm",
  description: "",
  input: {
    type: "object",
    properties: {
      recipient_id: {},
      access_tokens: {
        type: "array",
        items: {
          type: "string",
        },
      },
      nicks: {
        type: "object",
      },
    },
  },
  request: {
    method: "POST",
    path: "/users/@me/channels",
    body: ["recipient_id", "access_tokens", "nicks"],
  },
});
