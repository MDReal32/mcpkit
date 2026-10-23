import { defineTool } from "@usemcpkit/core";

export const cloudV1UserGetUser = defineTool({
  name: "cloud_v1:user:get_user",
  description:
    "[Cloud v1] Get user. Returns a user. This includes information about the user, such as the display name, account ID, profile picture, and more. The information returned may be restricted by the user's profile visibility settings.",
  input: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        description:
          "The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`.",
      },
      expand: {
        type: "string",
        description: "A multi-value parameter indicating which properties of the user to expand. (comma-separated)",
      },
    },
    required: ["accountId"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/user",
    query: ["accountId", "expand"],
  },
});
