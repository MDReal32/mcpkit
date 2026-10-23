import { defineTool } from "@usemcpkit/core";

export const projectsProjectTopicsGetTopics = defineTool({
  name: "projects:project_topics:get_topics",
  description: "Retrieve a topic. Retrieves a specified project topic.",
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
    method: "GET",
    path: "/topics/{id}",
  },
});
