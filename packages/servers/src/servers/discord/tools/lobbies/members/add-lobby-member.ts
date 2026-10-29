import { defineTool } from "@usemcpkit/core";

export const lobbiesMembersAddLobbyMember = defineTool({
  name: "lobbies:members:add_lobby_member",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      user_id: {
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
    required: ["lobby_id", "user_id"],
  },
  request: {
    method: "PUT",
    path: "/lobbies/{lobby_id}/members/{user_id}",
    body: ["metadata", "flags", "additional_name"],
  },
});
