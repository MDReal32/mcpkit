import { defineTool } from "@usemcpkit/core";

export const softwareSprintCreateSprint = defineTool({
  name: "software:sprint:create_sprint",
  description:
    "Create sprint. Creates a future sprint. Sprint name and origin board id are required. Start date, end date, and goal are optional.",
  input: {
    type: "object",
    properties: {
      endDate: {
        type: "string",
      },
      goal: {
        type: "string",
      },
      name: {
        type: "string",
      },
      originBoardId: {
        type: "integer",
      },
      startDate: {
        type: "string",
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/agile/1.0/sprint",
    body: ["endDate", "goal", "name", "originBoardId", "startDate"],
  },
});
