import { defineTool } from "@usemcpkit/core";

export const projectsTagsCreateProjectsRepositoryTags = defineTool({
  name: "projects:tags:create_projects_repository_tags",
  description: "Create a tag. Creates a tag in the repository that points to a specified reference.",
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
      ref: {
        type: "string",
        description: "Commit SHA or name of the branch or tag to create the tag from.",
      },
      message: {
        type: "string",
        description: "Message for the annotated tag. If specified, creates an annotated tag.",
      },
    },
    required: ["id", "tag_name", "ref"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/repository/tags",
    body: ["tag_name", "ref", "message"],
  },
});
