import { defineTool } from "@usemcpkit/core";

export const usersUsersGetAuthenticated = defineTool({
  name: "users:users:get_authenticated",
  description:
    "Get the authenticated user. OAuth app tokens and personal access tokens (classic) need the `read:user` scope, or the broader `user` scope, for this endpoint to return the private user response. The private user response includes additional fields such as `private_gists`, `total_private_repos`, `owned_private_repos`, `disk_usage`, `collaborators`, and `two_factor_authentication`. Tokens without these scopes receive the publi…",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/user",
  },
});
