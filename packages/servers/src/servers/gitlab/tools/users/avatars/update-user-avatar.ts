import { defineTool } from "@usemcpkit/core";

export const usersAvatarsUpdateUserAvatar = defineTool({
  name: "users:avatars:update_user_avatar",
  description:
    "Upload an avatar. Uploads an avatar for the currently authenticated user. This feature was introduced in GitLab 17.0.",
  input: {
    type: "object",
    properties: {
      avatar: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["avatar"],
  },
  request: {
    method: "PUT",
    path: "/user/avatar",
    body: ["avatar"],
    contentType: "multipart/form-data",
    fileArgs: ["avatar"],
  },
});
