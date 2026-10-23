import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsGetSnippetsRaw = defineTool({
  name: "projects:snippets:get_snippets_raw",
  description: "Retrieve a raw snippet. Retrieves the raw contents of a specified snippet as plain text",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the snippet.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/snippets/{id}/raw",
  },
});
