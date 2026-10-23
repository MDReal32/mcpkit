import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsListProjectsSnippetsDiscussions = defineTool({
  name: "issues:discussions:list_projects_snippets_discussions",
  description: "List all discussions for a snippet. Lists all discussions for a specified snippet.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the snippet.",
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
    required: ["id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/snippets/{noteable_id}/discussions",
    query: ["page", "per_page"],
  },
});
