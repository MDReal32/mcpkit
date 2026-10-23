import { defineTool } from "@usemcpkit/core";

export const projectsHooksListGroupsHooks = defineTool({
  name: "projects:hooks:list_groups_hooks",
  description: "List all group hooks. Lists all group hooks.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
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
    path: "/groups/{id}/hooks",
    query: ["page", "per_page"],
  },
});
