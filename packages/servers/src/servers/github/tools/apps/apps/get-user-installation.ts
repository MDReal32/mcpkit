import { defineTool } from "@usemcpkit/core";

export const appsAppsGetUserInstallation = defineTool({
  name: "apps:apps:get_user_installation",
  description:
    "Get a user installation for the authenticated app. Enables an authenticated GitHub App to find the user’s installation information.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/users/{username}/installation",
  },
});
