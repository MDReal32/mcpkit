import { defineTool } from "@usemcpkit/core";

export const projectsBadgesGetProjectsBadges = defineTool({
  name: "projects:badges:get_projects_badges",
  description: "Retrieve a badge for a project. Retrieves a specified badge for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      badge_id: {
        type: "integer",
        description: "ID of the badge.",
      },
    },
    required: ["id", "badge_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/badges/{badge_id}",
  },
});
