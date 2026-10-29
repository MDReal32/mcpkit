import { defineTool } from "@usemcpkit/core";

export const lobbiesMembersBulkUpdateLobbyMembers = defineTool({
  name: "lobbies:members:bulk_update_lobby_members",
  description: "",
  input: {
    type: "object",
    properties: {
      lobby_id: {
        type: "string",
      },
      body: {
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
            remove_member: {
              type: "boolean",
            },
          },
          required: ["id"],
        },
      },
    },
    required: ["lobby_id", "body"],
  },
  request: {
    method: "POST",
    path: "/lobbies/{lobby_id}/members/bulk",
    bodyArg: "body",
  },
});
