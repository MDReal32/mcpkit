import { defineTool } from "@usemcpkit/core";

export const projectsKeysListUsersGpgKeys = defineTool({
  name: "projects:keys:list_users_gpg_keys",
  description:
    "List all GPG keys for a user. Lists all GPG keys for a specified user account. This endpoint does not require authentication.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the user.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/users/{id}/gpg_keys",
    query: ["page", "per_page"],
  },
});
