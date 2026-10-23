import { defineTool } from "@usemcpkit/core";

export const softwareSprintGetSprint = defineTool({
  name: "software:sprint:get_sprint",
  description:
    "Get sprint. Returns the sprint for a given sprint ID. The sprint will only be returned if the user can view the board that the sprint was created on, or view at least one of the issues in the sprint.",
  input: {
    type: "object",
    properties: {
      sprintId: {
        type: "integer",
        description: "The ID of the requested sprint.",
      },
    },
    required: ["sprintId"],
  },
  request: {
    method: "GET",
    path: "/rest/agile/1.0/sprint/{sprintId}",
  },
});
