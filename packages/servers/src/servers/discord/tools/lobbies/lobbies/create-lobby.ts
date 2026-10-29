import { defineTool } from "@usemcpkit/core";

export const lobbiesLobbiesCreateLobby = defineTool({
  name: "lobbies:lobbies:create_lobby",
  description: "",
  input: {
    type: "object",
    properties: {
      idle_timeout_seconds: {
        type: "integer",
      },
      members: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            metadata: {
              type: "object",
            },
            flags: {},
            additional_name: {
              type: "string",
            },
          },
          required: ["id"],
        },
      },
      metadata: {
        type: "object",
      },
      flags: {},
      override_event_webhooks_url: {
        type: "string",
      },
      name: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/lobbies",
    body: ["idle_timeout_seconds", "members", "metadata", "flags", "override_event_webhooks_url", "name"],
  },
});
