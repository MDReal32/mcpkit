import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsGetProjectsSnippetsRaw = defineTool({
  name: "projects:snippets:get_projects_snippets_raw",
  description:
    "Retrieve a raw project snippet. Retrieves the raw contents of a specified project snippet as plain text",
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
    method: "GET",
    path: "/projects/{id}/snippets/{snippet_id}/raw",
  },
});
