import { defineTool } from "@usemcpkit/core";

export const projectsTagsDeleteProjectsRepositoryTags = defineTool({
  name: "projects:tags:delete_projects_repository_tags",
  description: "Delete a tag. Deletes a specified repository tag.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      tag_name: {
        type: "string",
        description: "Name of the tag.",
      },
    },
    required: ["id", "tag_name"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/repository/tags/{tag_name}",
  },
});
