import { defineTool } from "@usemcpkit/core";

export const lobbiesLobbiesEditLobby = defineTool({
  name: "lobbies:lobbies:edit_lobby",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      idle_timeout_seconds: {
        type: "integer",
      },
      metadata: {
        type: "object",
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
      flags: {},
      override_event_webhooks_url: {
        type: "string",
      },
      name: {
        type: "string",
      },
    },
    required: ["lobby_id"],
  },
  request: {
    method: "PATCH",
    path: "/lobbies/{lobby_id}",
    body: ["idle_timeout_seconds", "metadata", "members", "flags", "override_event_webhooks_url", "name"],
  },
});
