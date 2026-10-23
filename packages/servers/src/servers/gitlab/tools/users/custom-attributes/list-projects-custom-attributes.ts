import { defineTool } from "@usemcpkit/core";

export const usersCustomAttributesListProjectsCustomAttributes = defineTool({
  name: "users:custom_attributes:list_projects_custom_attributes",
  description: "List all custom attributes for a project. Lists all custom attributes for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/custom_attributes",
  },
});
