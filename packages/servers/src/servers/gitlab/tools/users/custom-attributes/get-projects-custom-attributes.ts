import { defineTool } from "@usemcpkit/core";

export const usersCustomAttributesGetProjectsCustomAttributes = defineTool({
  name: "users:custom_attributes:get_projects_custom_attributes",
  description: "Retrieve a custom attribute for a project. Retrieves a specified custom attribute for a project.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "Key of the custom attribute.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["key", "id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/custom_attributes/{key}",
  },
});
