import { defineTool } from "@usemcpkit/core";

export const usersAvatarsGetAvatar = defineTool({
  name: "users:avatars:get_avatar",
  description:
    "Return avatar url for a user. Returns the Gravatar URL for the user with the given public email address.",
  input: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "Public email address of the user.",
      },
      size: {
        type: "integer",
        description:
          "Single pixel dimension for the avatar image. Only used for avatar lookups at Gravatar or a configured Libravatar server.",
      },
    },
    required: ["email"],
  },
  request: {
    method: "GET",
    path: "/avatar",
    query: ["email", "size"],
  },
});
