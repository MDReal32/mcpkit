import { defineTool } from "@usemcpkit/core";

export const usersUsersUpdateAuthenticated = defineTool({
  name: "users:users:update_authenticated",
  description:
    "Update the authenticated user. **Note:** If your email is set to private and you send an `email` parameter as part of this request to update your profile, your privacy settings are still enforced: the email address will not be displayed on your public profile or via the API.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The new name of the user.",
      },
      email: {
        type: "string",
        description: "The publicly visible email address of the user.",
      },
      blog: {
        type: "string",
        description: "The new blog URL of the user.",
      },
      twitter_username: {
        type: "string",
        description: "The new Twitter username of the user.",
      },
      company: {
        type: "string",
        description: "The new company of the user.",
      },
      location: {
        type: "string",
        description: "The new location of the user.",
      },
      hireable: {
        type: "boolean",
        description: "The new hiring availability of the user.",
      },
      bio: {
        type: "string",
        description: "The new short biography of the user.",
      },
    },
  },
  request: {
    method: "PATCH",
    path: "/user",
    body: ["name", "email", "blog", "twitter_username", "company", "location", "hireable", "bio"],
  },
});
