import { defineTool } from "@usemcpkit/core";

export const projectsBadgesUpdateGroupsBadges = defineTool({
  name: "projects:badges:update_groups_badges",
  description: "Update a badge for a group. Updates a specified badge for a group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      badge_id: {
        type: "integer",
        description: "ID of the badge.",
      },
      link_url: {
        type: "string",
        description: "URL of the badge link.",
      },
      image_url: {
        type: "string",
        description: "URL of the badge image.",
      },
      name: {
        type: "string",
        description: "Name of the badge.",
      },
    },
    required: ["id", "badge_id"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/badges/{badge_id}",
    body: ["link_url", "image_url", "name"],
  },
});
