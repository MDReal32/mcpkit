import { defineTool } from "@usemcpkit/core";

export const usersAvatarsStoreAvatar = defineTool({
  name: "users:avatars:store_avatar",
  description: "Load avatar. Loads a custom avatar for a project, issue type or priority.",
  input: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["project", "issuetype", "priority"],
        description: "The avatar type.",
      },
      entityId: {
        type: "string",
        description: "The ID of the item the avatar is associated with.",
      },
      x: {
        type: "integer",
        default: 0,
        description: "The X coordinate of the top-left corner of the crop region.",
      },
      y: {
        type: "integer",
        default: 0,
        description: "The Y coordinate of the top-left corner of the crop region.",
      },
      size: {
        type: "integer",
        default: 0,
        description: "The length of each side of the crop region.",
      },
      body: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["type", "entityId", "size", "body"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/universal_avatar/type/{type}/owner/{entityId}",
    query: ["x", "y", "size"],
    bodyArg: "body",
    contentType: "application/octet-stream",
    fileArgs: ["body"],
  },
});
