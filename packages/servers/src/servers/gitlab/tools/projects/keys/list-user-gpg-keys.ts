import { defineTool } from "@usemcpkit/core";

export const projectsKeysListUserGpgKeys = defineTool({
  name: "projects:keys:list_user_gpg_keys",
  description: "List all GPG keys. Lists all GPG keys for the currently authenticated user.",
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
    path: "/user/gpg_keys",
    query: ["page", "per_page"],
  },
});
