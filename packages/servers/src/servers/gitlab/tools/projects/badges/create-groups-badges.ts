import { defineTool } from "@usemcpkit/core";

export const projectsBadgesCreateGroupsBadges = defineTool({
  name: "projects:badges:create_groups_badges",
  description: "Create a badge for a group. Creates a badge for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    required: ["id", "link_url", "image_url"],
  },
  request: {
    method: "POST",
    path: "/groups/{id}/badges",
    body: ["link_url", "image_url", "name"],
  },
});
