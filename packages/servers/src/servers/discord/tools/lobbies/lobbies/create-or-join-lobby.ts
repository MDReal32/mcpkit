import { defineTool } from "@usemcpkit/core";

export const lobbiesLobbiesCreateOrJoinLobby = defineTool({
  name: "lobbies:lobbies:create_or_join_lobby",
  description: "",
  input: {
    type: "object",
    properties: {
      idle_timeout_seconds: {
        type: "integer",
      },
      lobby_metadata: {
        type: "object",
      },
      member_metadata: {
        type: "object",
      },
      secret: {
        type: "string",
      },
      flags: {},
      name: {
        type: "string",
      },
    },
    required: ["secret"],
  },
  request: {
    method: "PUT",
    path: "/lobbies",
    body: ["idle_timeout_seconds", "lobby_metadata", "member_metadata", "secret", "flags", "name"],
  },
});
