import { defineTool } from "@usemcpkit/core";

export const projectsProjectTopicsDeleteTopics = defineTool({
  name: "projects:project_topics:delete_topics",
  description: "Delete a project topic. Deletes a specified project topic. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the project topic.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/topics/{id}",
  },
});
