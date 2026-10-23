import { defineTool } from "@usemcpkit/core";

export const projectsProjectTopicsUpdateTopics = defineTool({
  name: "projects:project_topics:update_topics",
  description: "Update a project topic. Updates a specified project topic. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the project topic.",
      },
      name: {
        type: "string",
        description: "Slug (name)",
      },
      title: {
        type: "string",
        description: "Title",
      },
      description: {
        type: "string",
        description: "Description",
      },
      avatar: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/topics/{id}",
    body: ["name", "title", "description", "avatar"],
    contentType: "multipart/form-data",
    fileArgs: ["avatar"],
  },
});
