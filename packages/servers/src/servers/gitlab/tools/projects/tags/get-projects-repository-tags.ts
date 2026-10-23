import { defineTool } from "@usemcpkit/core";

export const projectsTagsGetProjectsRepositoryTags = defineTool({
  name: "projects:tags:get_projects_repository_tags",
  description:
    "Retrieve a single repository tag. Retrieves a repository tag with a specified name. This endpoint can be accessed without authentication if the repository is publicly accessible.",
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
    method: "GET",
    path: "/projects/{id}/repository/tags/{tag_name}",
  },
});
