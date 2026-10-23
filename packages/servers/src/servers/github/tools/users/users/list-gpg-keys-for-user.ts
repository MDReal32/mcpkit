import { defineTool } from "@usemcpkit/core";

export const usersUsersListGpgKeysForUser = defineTool({
  name: "users:users:list_gpg_keys_for_user",
  description: "List GPG keys for a user. Lists the GPG keys for a user. This information is accessible by anyone.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/users/{username}/gpg_keys",
    query: ["per_page", "page"],
  },
});
