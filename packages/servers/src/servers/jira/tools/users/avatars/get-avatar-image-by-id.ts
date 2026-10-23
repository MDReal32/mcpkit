import { defineTool } from "@usemcpkit/core";

export const usersAvatarsGetAvatarImageById = defineTool({
  name: "users:avatars:get_avatar_image_by_id",
  description: "Get avatar image by ID. Returns a project, issue type or priority avatar image by ID.",
  input: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["issuetype", "project", "priority"],
        description: "The icon type of the avatar.",
      },
      id: {
        type: "integer",
        description: "The ID of the avatar.",
      },
      size: {
        type: "string",
        enum: ["xsmall", "small", "medium", "large", "xlarge"],
        description: "The size of the avatar image. If not provided the default size is returned.",
      },
      format: {
        type: "string",
        enum: ["png", "svg"],
        description:
          "The format to return the avatar image in. If not provided the original content format is returned.",
      },
    },
    required: ["type", "id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/universal_avatar/view/type/{type}/avatar/{id}",
    query: ["size", "format"],
  },
});
