import { defineTool } from "@usemcpkit/core";

export const softwareBoardDeleteBoardProperty = defineTool({
  name: "software:board:delete_board_property",
  description:
    "Delete board property. Removes the property from the board identified by the id. Ths user removing the property is required to have permissions to modify the board.",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "string",
        description: "the id of the board from which the property will be removed.",
      },
      propertyKey: {
        type: "string",
        description: "the key of the property to remove.",
      },
    },
    required: ["boardId", "propertyKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/agile/1.0/board/{boardId}/properties/{propertyKey}",
  },
});
