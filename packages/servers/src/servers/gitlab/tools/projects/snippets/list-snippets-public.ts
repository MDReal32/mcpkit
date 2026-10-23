import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsListSnippetsPublic = defineTool({
  name: "projects:snippets:list_snippets_public",
  description: "List all public snippets. Lists all public snippets accessible to the currently authenticated user.",
  input: {
    type: "object",
    properties: {
      created_after: {
        type: "string",
        description: "Return snippets created on or after the specified time.",
      },
      created_before: {
        type: "string",
        description: "Return snippets created on or before the specified time.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/snippets/public",
    query: ["created_after", "created_before", "page", "per_page"],
  },
});
