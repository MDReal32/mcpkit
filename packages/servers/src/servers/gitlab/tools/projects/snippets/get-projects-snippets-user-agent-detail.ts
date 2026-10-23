import { defineTool } from "@usemcpkit/core";

export const projectsSnippetsGetProjectsSnippetsUserAgentDetail = defineTool({
  name: "projects:snippets:get_projects_snippets_user_agent_detail",
  description:
    "Retrieve user agent details for a project snippet. Retrieves user agent details for a specified snippet. Available only for administrators.",
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
    path: "/projects/{id}/snippets/{snippet_id}/user_agent_detail",
  },
});
