import { defineTool } from "@usemcpkit/core";

export const softwareBoardCreateBoard = defineTool({
  name: "software:board:create_board",
  description: "Create board. Creates a new board. Board name, type and filter ID is required.",
  input: {
    type: "object",
    properties: {
      filterId: {
        type: "integer",
      },
      location: {
        type: "object",
        properties: {
          projectKeyOrId: {
            type: "string",
          },
          type: {
            type: "string",
            enum: ["project", "user"],
          },
        },
      },
      name: {
        type: "string",
      },
      type: {
        type: "string",
        enum: ["kanban", "scrum", "agility"],
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/agile/1.0/board",
    body: ["filterId", "location", "name", "type"],
  },
});
