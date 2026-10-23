import { defineTool } from "@usemcpkit/core";

export const projectsProtectedTagsCreateProjectsProtectedTags = defineTool({
  name: "projects:protected_tags:create_projects_protected_tags",
  description: "Protect a repository tag. Protects a specified repository tag using a wildcard protected tag.",
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
      create_access_level: {
        type: "integer",
        description: "Access level allowed to create the protected tag. Defaults to `40` (Maintainer role).",
        enum: [30, 40, 60, 0],
      },
      allowed_to_create: {
        type: "array",
        description: "Array of users, groups, deploy keys, or access levels allowed to create protected branches",
        items: {
          type: "object",
        },
      },
    },
    required: ["id", "name"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/protected_tags",
    body: ["name", "create_access_level", "allowed_to_create"],
  },
});
