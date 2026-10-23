import { defineTool } from "@usemcpkit/core";

export const cloudV1UserGetCurrentUser = defineTool({
  name: "cloud_v1:user:get_current_user",
  description:
    "[Cloud v1] Get current user. Returns the currently logged-in user. This includes information about the user, like the display name, userKey, account ID, profile picture, and more.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the user to expand. (comma-separated)",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/user/current",
    query: ["expand"],
    commaQuery: ["expand"],
  },
});
