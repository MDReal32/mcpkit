import { defineTool } from "@usemcpkit/core";

export const projectsTagsGetProjectsRepositoryTagsSignature = defineTool({
  name: "projects:tags:get_projects_repository_tags_signature",
  description:
    "Retrieve X.509 signature of a tag. Retrieves the X.509 signature from a signed tag. Unsigned tags return a `404 Not Found` response.",
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
    path: "/projects/{id}/repository/tags/{tag_name}/signature",
  },
});
