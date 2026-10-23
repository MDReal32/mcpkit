import { defineTool } from "@usemcpkit/core";

export const softwareBoardSetBoardProperty = defineTool({
  name: "software:board:set_board_property",
  description: "Set board property. Sets the value of the specified board's property.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "string",
        description: "the ID of the board on which the property will be set.",
      },
      propertyKey: {
        type: "string",
        description: "the key of the board's property. The maximum length of the key is 255 bytes.",
      },
      body: {},
    },
    required: ["boardId", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/agile/1.0/board/{boardId}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
