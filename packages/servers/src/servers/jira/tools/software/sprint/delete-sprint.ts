import { defineTool } from "@usemcpkit/core";

export const softwareSprintDeleteSprint = defineTool({
  name: "software:sprint:delete_sprint",
  description:
    "Delete sprint. Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog.",
  input: {
    type: "object",
    properties: {
      sprintId: {
        type: "integer",
        description: "The ID of the sprint to delete.",
      },
    },
    required: ["sprintId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/agile/1.0/sprint/{sprintId}",
  },
});
