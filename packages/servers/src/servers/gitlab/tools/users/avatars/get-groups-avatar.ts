import { defineTool } from "@usemcpkit/core";

export const usersAvatarsGetGroupsAvatar = defineTool({
  name: "users:avatars:get_groups_avatar",
  description: "Download a group avatar. Downloads a group avatar image.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/avatar",
  },
});
