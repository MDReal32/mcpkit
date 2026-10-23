import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsGetProjectsSnippetsDiscussions = defineTool({
  name: "issues:discussions:get_projects_snippets_discussions",
  description: "Retrieve a discussion for a snippet. Retrieves a specified discussion for a snippet.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the snippet.",
      },
    },
    required: ["id", "discussion_id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/snippets/{noteable_id}/discussions/{discussion_id}",
  },
});
