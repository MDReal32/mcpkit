import { defineTool } from "@usemcpkit/core";

export const projectsProtectedTagsGetProjectsProtectedTags = defineTool({
  name: "projects:protected_tags:get_projects_protected_tags",
  description:
    "Retrieve a protected tag or wildcard protected tag. Retrieves a specified protected tag or wildcard protected tag.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the tag or wildcard.",
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/protected_tags/{name}",
  },
});
