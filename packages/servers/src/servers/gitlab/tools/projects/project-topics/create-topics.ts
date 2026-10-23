import { defineTool } from "@usemcpkit/core";

export const projectsProjectTopicsCreateTopics = defineTool({
  name: "projects:project_topics:create_topics",
  description: "Create a project topic. Creates a project topic. Administrators only.",
  input: {
    type: "object",
    properties: {
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
      organization_id: {
        type: "integer",
        description: "The organization id for the topic",
      },
    },
    required: ["name", "title"],
  },
  request: {
    method: "POST",
    path: "/topics",
    body: ["name", "title", "description", "avatar", "organization_id"],
    contentType: "multipart/form-data",
    fileArgs: ["avatar"],
  },
});
