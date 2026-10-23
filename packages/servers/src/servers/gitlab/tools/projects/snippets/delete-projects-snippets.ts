import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsDeleteProjectsSnippets = defineTool({
  name: "projects:snippets:delete_projects_snippets",
  description: "Delete a project snippet. Deletes a specified project snippet.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      snippet_id: {
        type: "integer",
        description: "ID of the snippet.",
      },
    },
    required: ["id", "snippet_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/snippets/{snippet_id}",
  },
});
