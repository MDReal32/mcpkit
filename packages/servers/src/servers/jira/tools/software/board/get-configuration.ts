import { defineTool } from "@usemcpkit/core";

export const softwareBoardGetConfiguration = defineTool({
  name: "software:board:get_configuration",
  description: "Get configuration. Get the board configuration. The response contains the following fields:",
  input: {
    type: "object",
    properties: {
      boardId: {
        type: "integer",
        description: "The ID of the board for which configuration is requested.",
      },
    },
    required: ["boardId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/board/{boardId}/configuration",
  },
});
