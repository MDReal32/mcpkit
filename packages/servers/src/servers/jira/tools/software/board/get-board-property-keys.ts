import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetBoardPropertyKeys = defineTool({
  name: "software:board:get_board_property_keys",
  description:
    "Get board property keys. Returns the keys of all properties for the board identified by the id. The user who retrieves the property keys is required to have permissions to view the board.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "string",
        description: "the ID of the board from which property keys will be returned.",
      },
    },
    required: ["boardId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}/properties",
  },
});
