import { defineTool } from "@usemcpkit/core";

export const projectsKeysListUserKeys = defineTool({
  name: "projects:keys:list_user_keys",
  description: "List all SSH keys. Lists all SSH keys for the currently authenticated user.",
  input: {
    type: "object",
    properties: {
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
  },
  request: {
    method: "GET",
    path: "/user/keys",
    query: ["page", "per_page"],
  },
});
